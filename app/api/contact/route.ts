import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Basic in-memory rate limiting (best-effort; per-process)
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 10; // max submissions per IP per window
const rateMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string | undefined) {
  const key = ip || "unknown";
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true } as const;
  }
  entry.count += 1;
  if (entry.count > RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) } as const;
  }
  return { ok: true } as const;
}

function allowedHostnames(): Set<string> {
  const set = new Set<string>();
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) {
    try { set.add(new URL(site).hostname); } catch {}
  }
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    try { set.add(new URL(`https://${vercel}`).hostname); } catch {}
  }
  set.add("localhost");
  set.add("127.0.0.1");
  return set;
}

function isOriginAllowed(req: Request) {
  const allowed = allowedHostnames();
  const origin = req.headers.get("origin") || undefined;
  const referer = req.headers.get("referer") || undefined;
  const candidates = [origin, referer].filter(Boolean) as string[];
  if (candidates.length === 0) return true; // allow if no headers present (e.g., curl/internal)
  for (const u of candidates) {
    try {
      const h = new URL(u).hostname;
      if (allowed.has(h)) return true;
    } catch {}
  }
  return false;
}

export async function POST(req: Request) {
  try {
    // Origin allowlist
    if (!isOriginAllowed(req)) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    // IP rate limiting
    const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const ipAddrEarly = ipHeader.split(",")[0]?.trim() || undefined;
    const rl = rateLimit(ipAddrEarly);
    if (!rl.ok) {
      const headers = new Headers();
      headers.set("Retry-After", String(rl.retryAfter));
      return new NextResponse(JSON.stringify({ ok: false, error: "Too many requests" }), { status: 429, headers });
    }

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
