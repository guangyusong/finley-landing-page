"use client";

import { useMemo, useState } from "react";

function formatMoney(value: number) {
  if (!isFinite(value)) return "$0";
  return "$" + Math.round(value).toLocaleString("en-CA");
}

type Frequency = "Monthly" | "Bi-Weekly" | "Weekly";

export default function CalculatorClient() {
  const [price, setPrice] = useState<number>(800_000);
  const [downPct, setDownPct] = useState<number>(20);
  const [rate, setRate] = useState<number>(5.49); // annual percent
  const [years, setYears] = useState<number>(25);
  const [freq, setFreq] = useState<Frequency>("Monthly");
  const [taxAnnual, setTaxAnnual] = useState<number>(3600);
  const [insMonthly, setInsMonthly] = useState<number>(80);
  const [condoMonthly, setCondoMonthly] = useState<number>(0);

  const periodsPerYear = useMemo(() => {
    if (freq === "Weekly") return 52;
    if (freq === "Bi-Weekly") return 26;
    return 12;
  }, [freq]);

  const downPayment = useMemo(() => Math.max(0, (price * (downPct || 0)) / 100), [price, downPct]);
  const loanAmount = useMemo(() => Math.max(0, price - downPayment), [price, downPayment]);

  const { paymentPerPeriod, monthlyEquivalent, totalInterest } = useMemo(() => {
    const n = Math.max(1, years * periodsPerYear);
    const r = (rate / 100) / periodsPerYear;

    let pmt: number;
    if (r === 0) {
      pmt = loanAmount / n;
    } else {
      const factor = Math.pow(1 + r, n);
      pmt = (loanAmount * r * factor) / (factor - 1);
    }

    const perYear = pmt * periodsPerYear;
    const monthly = perYear / 12;
    const totalPaid = pmt * n;
    const interest = Math.max(0, totalPaid - loanAmount);
    return { paymentPerPeriod: pmt, monthlyEquivalent: monthly, totalInterest: interest };
  }, [loanAmount, years, periodsPerYear, rate]);

  const monthlyCarrying = useMemo(() => {
    const tax = (taxAnnual || 0) / 12;
    const extra = (insMonthly || 0) + (condoMonthly || 0);
    return monthlyEquivalent + tax + extra;
  }, [monthlyEquivalent, taxAnnual, insMonthly, condoMonthly]);

  return (
    <div className="bg-white text-slate-900">
      <section className="relative pt-28 pb-10 px-6 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Mortgage Calculator
            </span>
          </h1>
          <p className="text-slate-600 text-lg">Quickly estimate payments and carrying costs.</p>
        </div>
      </section>

      <section className="py-8 pb-24 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="space-y-5 bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">Home Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input
                  id="price"
                  type="number"
                  min={0}
                  step="1000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className="w-full pl-7 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="downPct" className="block text-sm font-semibold text-slate-700 mb-2">Down Payment</label>
                <div className="relative">
                  <input
                    id="downPct"
                    type="number"
                    min={0}
                    max={100}
                    step="0.1"
                    value={downPct}
                    onChange={(e) => setDownPct(Number(e.target.value) || 0)}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Down Payment Amount</label>
                <div className="px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-700">
                  {formatMoney(downPayment)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rate" className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate (annual)</label>
                <div className="relative">
                  <input
                    id="rate"
                    type="number"
                    min={0}
                    max={99}
                    step="0.01"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
              </div>
              <div>
                <label htmlFor="years" className="block text-sm font-semibold text-slate-700 mb-2">Amortization (years)</label>
                <input
                  id="years"
                  type="number"
                  min={1}
                  max={35}
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="freq" className="block text-sm font-semibold text-slate-700 mb-2">Payment Frequency</label>
                <select
                  id="freq"
                  value={freq}
                  onChange={(e) => setFreq(e.target.value as Frequency)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                >
                  <option>Monthly</option>
                  <option>Bi-Weekly</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Amount</label>
                <div className="px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-700">
                  {formatMoney(loanAmount)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="taxAnnual" className="block text-sm font-semibold text-slate-700 mb-2">Property Tax (annual)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    id="taxAnnual"
                    type="number"
                    min={0}
                    step="50"
                    value={taxAnnual}
                    onChange={(e) => setTaxAnnual(Number(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="insMonthly" className="block text-sm font-semibold text-slate-700 mb-2">Home Insurance (monthly)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    id="insMonthly"
                    type="number"
                    min={0}
                    step="5"
                    value={insMonthly}
                    onChange={(e) => setInsMonthly(Number(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="condoMonthly" className="block text-sm font-semibold text-slate-700 mb-2">Condo Fees (monthly)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    id="condoMonthly"
                    type="number"
                    min={0}
                    step="5"
                    value={condoMonthly}
                    onChange={(e) => setCondoMonthly(Number(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6 border-2 border-orange-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Results</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-slate-800">
                <div className="rounded-2xl bg-white/70 border border-orange-200/70 p-4">
                  <div className="text-sm text-slate-500">Payment ({freq})</div>
                  <div className="text-2xl font-bold">{formatMoney(paymentPerPeriod)}</div>
                </div>
                <div className="rounded-2xl bg-white/70 border border-orange-200/70 p-4">
                  <div className="text-sm text-slate-500">Estimated Monthly Carrying</div>
                  <div className="text-2xl font-bold">{formatMoney(monthlyCarrying)}</div>
                </div>
                <div className="rounded-2xl bg-white/70 border border-orange-200/70 p-4">
                  <div className="text-sm text-slate-500">Total Interest (life of mortgage)</div>
                  <div className="text-2xl font-bold">{formatMoney(totalInterest)}</div>
                </div>
                <div className="rounded-2xl bg-white/70 border border-orange-200/70 p-4">
                  <div className="text-sm text-slate-500">Loan Amount</div>
                  <div className="text-2xl font-bold">{formatMoney(loanAmount)}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Estimates for illustration only. Actual payments vary based on product, rate compounding, lender, and underwriting. Not financial advice.
              </p>
            </div>

            <a href="#contact" className="inline-block px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-600/25 transition-all">
              Start Your Application
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

