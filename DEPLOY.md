# Zeemaa – Your Launch Checklist
Everything you do yourself. Shaijal's only job is one DNS record.

---

## PART 1 — Add files to GitHub
Do this at github.com/echogrids/zeemaax_web (no code editor needed).

Upload each file from the zip into its exact folder path.
Use the "Add file → Upload files" button in each folder.

Files that REPLACE existing ones:
  app/layout.js
  app/page.js

Files that are NEW (just add them):
  components/HomeClient.js
  lib/tracking.js
  lib/store.js
  data/store.json
  app/api/contact/route.js
  app/api/demo/route.js
  app/api/admin/route.js
  app/thank-you/page.js
  app/gallery/page.js
  app/admin/page.js
  app/admin/dashboard/page.js
  app/sitemap.js
  app/robots.js
  .env.example  ← reference only, do NOT commit .env.local

One edit to package.json (open the file on GitHub, click the pencil icon):
  Under "dependencies", add:
    "nodemailer": "^6.9.0"
  Vercel will install it automatically on next deploy.

---

## PART 2 — Environment variables in Vercel
Go to: vercel.com → your project → Settings → Environment Variables
Add every variable below. Set environment to "Production" for all.

  NEXT_PUBLIC_GA4_ID          your GA4 Measurement ID (G-XXXXXXXXXX)
  NEXT_PUBLIC_GADS_ID         your Google Ads account tag (AW-XXXXXXXXX)
  NEXT_PUBLIC_GADS_CONV_DEMO  demo form conversion ID (AW-XXXXXXXXX/XXXXXXXXX)
  NEXT_PUBLIC_GADS_CONV_CONTACT contact form conversion ID (AW-XXXXXXXXX/XXXXXXXXX)
  NEXT_PUBLIC_META_PIXEL_ID   leave blank for now
  SMTP_HOST                   smtp.gmail.com
  SMTP_PORT                   587
  SMTP_USER                   hello@zeemaa.com
  SMTP_PASS                   your Gmail App Password (see note below)
  ADMIN_PASSWORD              pick a strong password for /admin
  SESSION_SECRET              any random 32-character string

Gmail App Password note:
  hello@zeemaa.com must have 2-Step Verification enabled.
  Then go to Google Account → Security → App Passwords → create one for "Mail".
  Paste that 16-character code as SMTP_PASS.

---

## PART 3 — Domain in Vercel
Go to: vercel.com → your project → Settings → Domains
  - Add zeemaa.com as the production domain
  - Add www.zeemaa.com and set it to redirect to zeemaa.com
  - Vercel will show you a TXT record or CNAME to verify ownership

Send that record to Shaijal and ask him to add it in Namecheap DNS.
That is the only thing Shaijal needs to do.

Set zeemaax.com as a redirect to zeemaa.com (not the production domain).
  In Vercel Domains, add zeemaax.com → set redirect to https://zeemaa.com

---

## PART 4 — Deploy
After adding the files and env vars, trigger a deploy:
  Vercel dashboard → your project → Deployments → Redeploy
  Or push any commit to the repo — Vercel auto-deploys.

Confirm the build passes. If it fails, the build log will show the exact line.
Most common issue: a missing env var. Check the log first.

---

## PART 5 — Google Search Console
Go to: search.google.com/search-console
  1. Add property: zeemaa.com
  2. Choose "DNS record" verification
  3. Google gives you a TXT record → send to Shaijal to add in Namecheap
  4. Click Verify
  5. Go to Sitemaps → submit: https://zeemaa.com/sitemap.xml
  6. Go to URL Inspection → enter https://zeemaa.com → Request Indexing

This fixes the corrupted Google cache (old "Zeemaa Systems" content).
Google will re-crawl and replace it within a few days of indexing.

---

## PART 6 — Google Ads IDs (fill in when your account is ready)
You need two things from Google Ads:

A. The global site tag ID:
   Google Ads → Tools → Google Tag → copy the AW-XXXXXXXXX number
   → paste as NEXT_PUBLIC_GADS_ID in Vercel env vars

B. Two conversion action IDs (one per form):
   Google Ads → Goals → Conversions → New conversion action → Website
   Create one called "Demo Request" and one called "Contact Form"
   Each gives you a string like AW-XXXXXXXXX/XXXXXXXXX
   → paste as NEXT_PUBLIC_GADS_CONV_DEMO and NEXT_PUBLIC_GADS_CONV_CONTACT

After adding these, redeploy. Conversions will attribute from that moment forward.
The /thank-you page fires both the GA4 and Ads conversion on every form submission.

---

## PART 7 — Admin console
URL: https://zeemaa.com/admin
Password: whatever you set as ADMIN_PASSWORD in Vercel

From the dashboard:
  Visibility tab   → toggle sections and pages on/off
  Testimonials tab → add real client quotes when they come in
  Gallery tab      → paste image URLs to build the gallery
  FAQ tab          → add, edit, or remove questions
  Stats tab        → update the hero bar numbers
  Site tab         → update phone, email, social links

Everything updates live. No code changes needed.

---

## PART 8 — Data persistence (done — Redis connected)
The admin console saves data to data/store.json. On Vercel's serverless
infrastructure, file writes do not persist between deploys, so lib/store.js
now supports Redis as a persistent backend and falls back to the local file
automatically when no Redis is connected (this is what keeps local dev working
exactly as before, with zero setup).

To turn this on in production:
  1. Vercel dashboard → your project → Storage → Marketplace Database Providers
  2. Add "Upstash" → choose Redis → connect it to your project
     (Vercel KV is deprecated; Upstash Redis is the current replacement)
  3. Vercel auto-injects the connection env vars (KV_REST_API_URL /
     KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN —
     lib/store.js checks for either naming). Nothing else to configure.
  4. Redeploy. The first request seeds Redis from the bundled data/store.json,
     and every admin console change after that persists across deploys.

Until Redis is connected, admin console changes still only survive until the
next deploy — fine for the launch period, but connect Redis before you expect
editors to rely on it.
