export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://garrisonco.ca';
  const isProd = (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === 'production';

  // In non-production environments, prevent indexing entirely.
  if (!isProd) {
    const disallow = `User-agent: *\nDisallow: /`;
    return new Response(disallow, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = `User-agent: *\nAllow: /\nSitemap: ${base.replace(/\/$/, '')}/sitemap.xml`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
