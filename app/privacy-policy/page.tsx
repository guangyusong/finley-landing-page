import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Garrison Capital (Ontario, Canada)",
  description:
    "Garrison Capital's Privacy Policy for Ontario, Canada. How we collect, use, disclose, and protect personal information in compliance with PIPEDA and applicable Ontario rules.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative pt-28 pb-14 px-6 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Privacy Policy
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
            This Privacy Policy explains how Garrison Capital ("Garrison", "we", "us", or "our")
            collects, uses, discloses, and safeguards personal information in connection with our
            mortgage brokerage services in Ontario, Canada. We comply with Canada’s Personal
            Information Protection and Electronic Documents Act (PIPEDA) and applicable Ontario
            requirements under the Mortgage Brokerages, Lenders and Administrators Act, 2006 (MBLAA)
            and the Financial Services Regulatory Authority of Ontario (FSRA) guidance.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Who We Are</h2>
            <p>
              Garrison Capital is a mortgage brokerage operating in Ontario, Canada. Brokerage
              License #13362.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Personal Information We Collect</h2>
            <p className="mb-3">We collect information necessary to assess and arrange mortgage financing, such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identification and contact details (name, address, email, phone)</li>
              <li>Financial information (income, assets, liabilities, credit information)</li>
              <li>Property details and transaction information</li>
              <li>Communications and preferences (including consent records)</li>
              <li>Technical data (IP, device/browser type, usage analytics and cookies)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">3. How We Use Personal Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To review your application, assess eligibility, and arrange mortgage solutions</li>
              <li>To communicate with you about your application and related services</li>
              <li>To verify identity and prevent fraud</li>
              <li>To meet legal, regulatory, and reporting obligations (including FSRA compliance)</li>
              <li>To improve our website, products, and customer experience</li>
              <li>With your consent, to send updates or marketing per Canada’s Anti‑Spam Legislation (CASL)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Sharing and Disclosure</h2>
            <p className="mb-3">
              We may share your information with lenders, insurers, credit reporting agencies, and
              service providers who assist in delivering our services. We require these parties to
              safeguard your information and use it only for the intended purposes. We may also
              share information if required by law, regulation, court order, or to protect our
              legal rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">5. International Transfers</h2>
            <p>
              Some service providers or data processors may be located outside Ontario or Canada.
              When personal information is processed in other jurisdictions, it may be subject to
              local laws. We take reasonable steps to ensure comparable protections when using
              third‑party providers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Retention</h2>
            <p>
              We retain personal information as required to fulfill the purposes above and to meet
              legal and regulatory obligations. We apply secure disposal or anonymization when data
              is no longer needed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
            <p className="mb-3">
              Subject to applicable law, you may request access to, or correction of, your personal
              information. You may withdraw consent for non‑essential processing (such as marketing)
              at any time. To exercise these rights, contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">8. Cookies and Analytics</h2>
            <p className="mb-3">
              We use cookies and similar technologies to operate the site, analyze usage, and
              improve performance. You may control cookies through your browser settings; however,
              disabling some cookies may affect site functionality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">9. Security</h2>
            <p>
              We implement administrative, technical, and physical safeguards designed to protect
              personal information against loss, theft, unauthorized access, disclosure, or misuse.
              No method of transmission or storage is 100% secure; we continuously improve our
              safeguards in line with industry standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">10. Children’s Privacy</h2>
            <p>
              Our services are intended for individuals who have reached the age of majority in
              Ontario. We do not knowingly collect personal information from children under 18.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">11. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in our practices or legal
              requirements. The “Last updated” date will indicate the most recent revision. Material
              changes will be communicated as appropriate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">12. Contact Us</h2>
            <p>
              Questions or requests about this policy can be sent to
              {" "}
              <a href="mailto:mortgages@garrison.co" className="text-orange-600 hover:underline">
                mortgages@garrison.co
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
