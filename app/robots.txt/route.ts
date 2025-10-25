export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://garrisonco.ca';
  const body = `User-agent: *
Allow: /
Sitemap: ${base.replace(/\/$/, '')}/sitemap.xml`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
