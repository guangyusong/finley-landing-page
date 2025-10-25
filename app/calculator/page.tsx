import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Garrison Capital (Ontario, Canada)",
  description:
    "Estimate your mortgage payments by price, down payment, interest rate, amortization and payment frequency. For illustration only.",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
