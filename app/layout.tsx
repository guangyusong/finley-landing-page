import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Garrison - Fast Mortgage Approvals in Days",
  description: "Get your mortgage approved in days, not weeks. Streamlined process, transparent pricing, and personalized support. Join thousands of happy homeowners.",
  keywords: ["mortgage", "home loans", "fast approval", "mortgage rates", "home financing"],
  authors: [{ name: "Garrison" }],
  metadataBase: new URL('https://garrison.mortgage'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://garrison.mortgage",
    title: "Garrison - Fast Mortgage Approvals in Days",
    description: "Get your mortgage approved in days, not weeks. Streamlined process, transparent pricing, and personalized support.",
    siteName: "Garrison",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Garrison - Fast Mortgage Approvals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garrison - Fast Mortgage Approvals in Days",
    description: "Get your mortgage approved in days, not weeks. Streamlined process, transparent pricing, and personalized support.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#ea580c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
