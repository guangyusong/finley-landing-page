import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: Record<string, unknown> = {};
    if (contentType.includes("application/json")) {
      data = (await req.json()) as Record<string, unknown>;
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      data = Object.fromEntries(form.entries()) as Record<string, unknown>;
    } else {
      return NextResponse.json({ ok: false, error: "Unsupported content type" }, { status: 400 });
    }

    const get = (k: string) => String((data as Record<string, unknown>)[k] ?? "").trim();
    const firstName = get("firstName");
    const lastName = get("lastName");
    const email = get("email");
    const phone = get("phone");
    const loanAmount = get("loanAmount");
    const message = get("message");
    const company = get("company"); // honeypot

    // Honeypot: if filled, treat as OK but drop
    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!firstName || !lastName || !email || !phone || !loanAmount) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Minimal format checks + length caps (no dependencies; keep it lean)
    if (firstName.length > 100 || lastName.length > 100) {
      return NextResponse.json({ ok: false, error: "Name too long" }, { status: 400 });
    }
    if (email.length > 254) {
      return NextResponse.json({ ok: false, error: "Email too long" }, { status: 400 });
    }
    if (phone.length > 30) {
      return NextResponse.json({ ok: false, error: "Phone too long" }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ ok: false, error: "Message too long" }, { status: 400 });
    }
    if (!/.+@.+\..+/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return NextResponse.json({ ok: false, error: "Invalid phone" }, { status: 400 });
    }
    const allowedLoanAmounts = new Set([
      "under-200k",
      "200k-400k",
      "400k-600k",
      "600k-800k",
      "over-800k",
    ]);
    if (!allowedLoanAmounts.has(loanAmount)) {
      return NextResponse.json({ ok: false, error: "Invalid loan amount" }, { status: 400 });
    }

    // Forward to HubSpot Forms API
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    let formId = process.env.HUBSPOT_FORM_ID;
    const envHint = process.env.HUBSPOT_ENV || (process.env.NODE_ENV !== "production" ? "dev" : undefined);
    if ((envHint === "dev" || process.env.NODE_ENV !== "production") && process.env.HUBSPOT_FORM_ID_DEV) {
      formId = process.env.HUBSPOT_FORM_ID_DEV;
    }
    if (!portalId || !formId) {
      return NextResponse.json({ ok: false, error: "HubSpot not configured" }, { status: 500 });
    }

    const cookieStore = cookies();
    const hutk = cookieStore.get("hubspotutk")?.value;
    const referer = req.headers.get("referer") || undefined;
    const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const ipAddress = ipHeader.split(",")[0]?.trim() || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const fields: { name: string; value: string }[] = [];
    const push = (name: string, value?: string) => {
      const val = (value ?? "").toString().trim();
      if (val) fields.push({ name, value: val });
    };
    push("email", email);
    push("firstname", firstName);
    push("lastname", lastName);
    push("phone", phone);
    push("loan_amount", loanAmount);
    push("message", message);
    push("contact_message", message);
    push("lead_source", "Website Contact");
    const envTag = process.env.HUBSPOT_ENV || get("environment");
    push("environment", envTag);

    const payload = {
      submittedAt: Date.now(),
      fields,
      context: {
        hutk,
        pageUri: referer,
        pageName: "Website Contact",
        ipAddress,
        userAgent,
      },
    };

    const hsRes = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}` as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // HubSpot Forms API does not require auth
    });
    const hsBody = await hsRes.json().catch(() => ({} as unknown));
    if (!hsRes.ok) {
      // Don’t leak HS error, but log for diagnostics
      console.error("HubSpot submit failed", hsRes.status, hsBody);
      return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
