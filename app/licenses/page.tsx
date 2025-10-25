import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licenses | Garrison Capital (Ontario, Canada)",
  description: "Regulatory information for Garrison Capital, a licensed Ontario mortgage brokerage (License #13362) regulated by FSRA under the MBLAA.",
};

export default function LicensesPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative pt-28 pb-14 px-6 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Licenses & Regulatory Info
            </span>
          </h1>
          <p className="text-slate-600 text-lg">Ontario, Canada</p>
        </div>
      </section>

      <section className="py-6 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Brokerage</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Legal Name: Garrison Capital</li>
              <li>Jurisdiction: Ontario, Canada</li>
              <li>Brokerage License: #13362</li>
              <li>Regulator: Financial Services Regulatory Authority of Ontario (FSRA)</li>
              <li>Governing Act: Mortgage Brokerages, Lenders and Administrators Act, 2006 (MBLAA)</li>
            </ul>
          </div>

          <div className="text-sm text-slate-500">
            <p>
              Contact: <a href="mailto:mortgages@garrisonco.ca" className="text-orange-600 hover:underline">mortgages@garrisonco.ca</a>
            </p>
            <p>
              Phone: <a href="tel:+16475582300" className="hover:underline text-slate-600">647 558 2300</a>
            </p>
            <p className="mt-2">
              Note: FSRA does not endorse or guarantee the products or services offered. All
              approvals are subject to lender underwriting and applicable laws.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
