import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import MotionProvider from "./MotionProvider";
import { cookies } from "next/headers";
import ConsentBanner from "./ConsentBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garrisonco.ca';

export const metadata: Metadata = {
  title: "Garrison Capital - Fast Mortgage Approvals in Toronto, Canada",
  description: "Get your mortgage approved in days, not weeks — serving Toronto and the Greater Toronto Area (GTA). Streamlined process, transparent pricing, and personalized support.",
  keywords: ["mortgage", "home loans", "fast approval", "mortgage rates", "home financing", "Toronto", "Ontario", "Canada", "GTA"],
  authors: [{ name: "Garrison Capital" }],
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    title: "Garrison Capital - Fast Mortgage Approvals in Toronto, Canada",
    description: "Get your mortgage approved in days, not weeks — serving Toronto and the GTA. Streamlined process, transparent pricing, and personalized support.",
    siteName: "Garrison Capital",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Garrison Capital - Fast Mortgage Approvals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garrison Capital - Fast Mortgage Approvals in Toronto, Canada",
    description: "Get your mortgage approved in days, not weeks — serving Toronto and the GTA. Streamlined process, transparent pricing, and personalized support.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ea580c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-slate-900 p-2 rounded">
          Skip to content
        </a>
        <main id="main">
          <MotionProvider>{children}</MotionProvider>
        </main>
        {/* LocalBusiness / FinancialService JSON-LD for rich results */}
        {(() => {
          const logoUrl = new URL('/garrison-logo-light.png', siteUrl).toString();
          const imageUrl = new URL('/og-image.webp', siteUrl).toString();
          const orgJsonLd = {
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "@id": `${siteUrl}/#organization`,
            name: "Garrison Capital",
            url: siteUrl,
            telephone: "+1-647-558-2300",
            logo: logoUrl,
            image: imageUrl,
            areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
            address: {
              "@type": "PostalAddress",
              addressRegion: "ON",
              addressCountry: "CA",
            },
            priceRange: "$$",
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                telephone: "+1-647-558-2300",
                areaServed: "CA-ON",
                availableLanguage: ["en"],
              },
            ],
          } as const;
          return (
            <Script
              id="jsonld-localbusiness"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
            />
          );
        })()}
        {(() => {
          const consent = cookies().get('marketingConsent')?.value;
          const ok = consent === 'yes' && process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
          return ok ? (
          <Script
            id="hs-script-loader"
            strategy="afterInteractive"
            src={`https://js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
          />
          ) : null;
        })()}
        <ConsentBanner />
      </body>
    </html>
  );
}
