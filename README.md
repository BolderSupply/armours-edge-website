# Armours Edge website

Website for Armours Edge Landscape Construction Inc. (armoursedge.ca), built with Next.js and Sanity.

- **Website:** Next.js (App Router), TypeScript, Tailwind CSS
- **Content (projects):** Sanity, edited in the Studio at `/studio`
- **Hosting:** Vercel (deploys from the `main` branch of this repo)

## Run it on your computer

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Studio (where you add projects): http://localhost:3000/studio

### First time only: allow the Studio to talk to Sanity

1. Go to [sanity.io/manage](https://www.sanity.io/manage), open the **Armour's Edge** project, then **API**, then **CORS origins**.
2. Add `http://localhost:3000` and turn on **Allow credentials**.
3. Later, add the Vercel address and `https://www.armoursedge.ca` the same way.

Then open `/studio` and sign in with your Sanity login.

## Adding a project

1. Open `/studio` and choose **Project**, then **Create**.
2. Fill in the title, town, service type and a short summary.
3. Write **The brief** (what the client wanted) and **The solution** (what we built).
4. Add a cover photo, then on the "Before & after, process" tab add before/after pairs and the build stages (each with 1 to 4 photos). Extra finished photos go under "More photos". The project page is rendered by `src/components/project/ProjectShowcase.tsx`.
5. Tick **Show on the home page** for up to three favourites.
6. Click **Publish**. The site picks it up within about a minute.

Use the town or city only, never a client's street address. The dataset is public, so don't store private information in Sanity.

## Where things live

| What | Where |
| --- | --- |
| Pages | `src/app/(site)/` |
| Quote form email | `src/app/api/quote/route.ts` |
| Project fields in Sanity | `src/sanity/schemaTypes/project.ts` |
| Service list and wording | `src/lib/services.ts` |
| Site name, email, Instagram | `src/lib/site.ts` |
| Colours and fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Studio setup | `sanity.config.ts` |

## Settings (environment variables)

Copy `.env.example` to `.env.local` to change anything. Nothing is required to run locally.

- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` default to the Armour's Edge project.
- `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` turn on email delivery for the quote form. Until `RESEND_API_KEY` is set, the form shows a message asking visitors to email directly. On Vercel, add these under **Project Settings, Environment Variables**.
- `NEXT_PUBLIC_SITE_URL` is the public address (defaults to `https://www.armoursedge.ca`).

Never commit `.env.local`; it is ignored by Git.

## Before launch checklist

- Add real project photos and write up the first projects in the Studio
- Swap the placeholder logo mark (src/components/Logo.tsx) for the real logo file
- In Studio, open Site settings and add the hero photo, the banner photo, phone number and address. The home page shows them straight away; without photos it shows an animated paver pattern
- Connect quote form email (Resend) and send a test request
- Add the production domains to Sanity CORS origins
- Record every existing DNS record for armoursedge.ca, especially the Google Workspace mail records (MX, SPF, DKIM, DMARC), before changing DNS
- Add 301 redirects for any old Squarespace URLs that have search traffic
- Point the domain at Vercel only after the above, leaving the mail records untouched
