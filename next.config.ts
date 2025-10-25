import type { NextConfig } from "next";

const isProd = (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";

// Build a pragmatic CSP that works with Next and optional HubSpot tracking.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  // Fonts/images/styles
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline'",
  // Disallow plugins/objects
  "object-src 'none'",
  // Scripts (allow HubSpot)
  "script-src " + (isProd ? "'self' 'unsafe-inline'" : "'self' 'unsafe-inline' 'unsafe-eval'") +
    " https://js.hs-scripts.com https://js.hsleadflows.net https://js.hscollectedforms.net https://static.hsappstatic.net https://js.hs-analytics.net",
  // Network calls (your app + HubSpot endpoints)
  "connect-src 'self' https://api.hsforms.com https://js.hs-scripts.com https://*.hubspot.com https://*.hsforms.com https://js.hs-analytics.net",
  // Allow embedding of HubSpot frames only (if any)
  "frame-src 'self' https://*.hubspot.com",
  // Restrict where forms can POST
  "form-action 'self' https://api.hsforms.com",
  // Clickjacking protections via CSP (supplements X-Frame-Options)
  "frame-ancestors 'none'",
  // Only in production; the header is harmless in dev but omit for localhost clarity
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig: NextConfig = {
  // Silence workspace root inference warnings in monorepo-like environments
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          ...(isProd
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
