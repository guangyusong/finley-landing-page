import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Garrison Capital (Ontario, Canada)",
  description:
    "Garrison Capital's Terms and Conditions for Ontario, Canada. Website terms, eligibility, disclaimers, liability limits, and governing law (Ontario).",
};

export default function TermsPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative pt-28 pb-14 px-6 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Terms and Conditions
            </span>
          </h1>
          <p className="text-slate-600 text-lg">
            Last updated: October 24, 2025
          </p>
        </div>
      </section>

      <section className="py-6 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-10 text-slate-700 leading-relaxed">
          <p>
            These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the website and
            related services provided by Garrison Capital (&quot;Garrison&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a
            mortgage brokerage operating in Ontario, Canada. By using our website, you agree to these
            Terms. If you do not agree, please do not use the site.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Eligibility and Scope</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Our services are intended for residents of Ontario, Canada.</li>
              <li>You must be the age of majority in Ontario to apply for mortgage services.</li>
              <li>Use of this site does not guarantee approval or an offer of credit.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">2. No Financial or Legal Advice</h2>
            <p>
              Content on this site is for informational purposes only and does not constitute
              financial, legal, or tax advice. You should obtain advice from qualified professionals
              tailored to your circumstances.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Application and E‑Signatures</h2>
            <p className="mb-3">
              By submitting an application or inquiry, you represent that the information you provide
              is accurate and complete. You consent to the use of electronic signatures and
              electronic records where permitted by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Privacy</h2>
            <p>
              Your use of our services is also governed by our
              {" "}
              <Link href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</Link>
              , which explains how we collect, use, and protect your personal information in
              compliance with PIPEDA and applicable Ontario rules.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Communications and Consent</h2>
            <p>
              By providing your contact details, you consent to us contacting you about your
              application and related services. With your express consent under Canada’s Anti‑Spam
              Legislation (CASL), we may send marketing communications, which you can opt out of at
              any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Intellectual Property</h2>
            <p>
              The site’s content, design, and trademarks are owned by or licensed to Garrison and
              are protected by applicable laws. You may not copy, modify, distribute, or create
              derivative works without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Third‑Party Links</h2>
            <p>
              Our website may link to third‑party sites we do not control. We are not responsible for
              their content, policies, or practices. Accessing third‑party sites is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">8. Disclaimers</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Services are provided on an “as is” and “as available” basis.</li>
              <li>We do not warrant uninterrupted or error‑free operation of the site.</li>
              <li>Rates, terms, and product availability are subject to change without notice.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Garrison is not liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or
              revenues, arising from your use of the site or services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">10. Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of the Province of Ontario and the federal laws of
              Canada applicable therein. You agree to the exclusive jurisdiction of the courts of
              Ontario for any disputes related to these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">11. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The “Last updated” date will indicate the
              most recent revision. Continued use of the site after changes means you accept the
              updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">12. Contact Us</h2>
            <p>
              Questions about these Terms can be sent to
              {" "}
              <a href="mailto:mortgages@garrisonco.ca" className="text-orange-600 hover:underline">
                mortgages@garrisonco.ca
              </a>
              .
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Phone: <a href="tel:+16475582300" className="hover:underline text-slate-600">647 558 2300</a>
            </p>
            <p className="text-sm text-slate-500">
              Brokerage License #13362 • Ontario, Canada
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
