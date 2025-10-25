This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Configuration

- Set `NEXT_PUBLIC_SITE_URL` to your canonical domain (e.g. `https://garrisonco.ca`) so Open Graph, sitemap, and robots.txt use the correct absolute URLs.

## HubSpot lead capture

The contact form posts to a Next.js API route (`app/api/contact/route.ts`) which forwards submissions to HubSpot's Forms Submission API. The HubSpot tracking script is loaded if `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is set.

Environment variables

- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` — loads HubSpot tracking script
- `HUBSPOT_PORTAL_ID` — HubSpot portal ID (server-side)
- `HUBSPOT_FORM_ID` — production form ID (GUID)
- `HUBSPOT_FORM_ID_DEV` — dev/preview/local form ID (optional; if set it is used when not in production)
- `HUBSPOT_ENV` — tag contacts with an environment label (e.g., `dev` or `prod`)

Notes

- HubSpot forms API submissions do not require auth tokens.
- The API route includes hutk (if present), pageUri, pageName, ipAddress, and userAgent for better attribution, and maps `loanAmount -> loan_amount` and `message -> contact_message`.
- See `.env.local.example` for placeholders. On Vercel, env vars are already set for this project (preview uses the dev form, production uses the prod form).
