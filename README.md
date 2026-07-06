# Phill Contracting — Website

A modern, responsive marketing website for a home remodeling & construction
company, built with **Next.js 15 (App Router)**, **TypeScript**, and
**Tailwind CSS v4**. Designed to be hosted for free on **Vercel**.

## Features

- Single-page scrolling layout with sticky header and smooth-scroll navigation
- Sections: Hero, Services, About, Projects gallery (with filter + lightbox),
  Testimonials, and a Contact / quote-request form
- Fully responsive with a mobile menu
- Accessible, SEO-optimized (metadata, Open Graph, sitemap, robots,
  `LocalBusiness` JSON-LD structured data)
- Working contact form with client + server validation (Zod), spam honeypot,
  basic rate limiting, and email delivery via [Resend](https://resend.com)

## Getting started

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Customizing content

All placeholder content lives in `src/data/` and is marked with `TODO`:

| File | What to edit |
| --- | --- |
| `src/data/siteConfig.ts` | Company name, phone, email, address, hours, service area, license, social links, and site URL |
| `src/data/services.ts` | The list of services offered |
| `src/data/projects.ts` | Portfolio images and captions (replace Unsplash URLs with photos in `public/projects/`) |
| `src/data/testimonials.ts` | Customer reviews |

Brand colors and fonts are defined in `src/app/globals.css` (the `@theme` block).

### Images

The starter uses remote Unsplash placeholder images. Replace them with your own
photos by placing files in the `public/` folder and updating the `src` paths
(e.g. `/projects/kitchen-1.jpg`). You can then remove the `remotePatterns`
entry in `next.config.ts`.

## Contact form email (Resend)

The form works out of the box — submissions are validated and accepted — but to
actually **receive** emails:

1. Create a free account at [resend.com](https://resend.com).
2. Add and verify your domain (or use `onboarding@resend.dev` for testing).
3. Create an API key.
4. Copy `.env.example` to `.env.local` and fill in the values:

   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=you@example.com
   CONTACT_FROM_EMAIL=quotes@yourdomain.com
   ```

## Deploying to Vercel (free)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), click **Add New → Project**, and import the repo.
3. Vercel auto-detects Next.js — no build config needed. Click **Deploy**.
4. In **Project → Settings → Environment Variables**, add the three
   `RESEND_*` / `CONTACT_*` variables from above so the form can send email.
5. (Optional) Add a custom domain in **Settings → Domains**.

Your site will be live at `https://<project>.vercel.app`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |
