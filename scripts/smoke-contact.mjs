// Simple smoke test for the contact API: origin allowlist and rate limiting
// Usage: BASE_URL=http://localhost:3000 node scripts/smoke-contact.mjs

const BASE = process.env.BASE_URL || 'http://localhost:3000';

async function post(json, headers = {}) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(json),
  });
  let body;
  try { body = await res.json(); } catch { body = null; }
  return { status: res.status, body };
}

async function testOriginAllowlist() {
  const payload = {
    company: 'bot', // honeypot to bypass HubSpot config
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '647-555-0000',
    loanAmount: 'under-200k',
  };
  const { status } = await post(payload, { origin: 'https://bad.example' });
  return status === 403;
}

async function testRateLimit() {
  const payload = {
    company: 'bot',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '647-555-0000',
    loanAmount: 'under-200k',
  };
  let got429 = false;
  for (let i = 0; i < 12; i++) {
    const { status } = await post(payload, {
      origin: 'http://localhost:3000',
      referer: 'http://localhost:3000/',
    });
    if (status === 429) got429 = true;
  }
  return got429;
}

(async () => {
  const res1 = await testOriginAllowlist();
  const res2 = await testRateLimit();
  const ok = res1 && res2;
  console.log(`Origin allowlist: ${res1 ? 'PASS' : 'FAIL'}`);
  console.log(`Rate limiting:    ${res2 ? 'PASS' : 'FAIL'}`);
  process.exit(ok ? 0 : 1);
})();

