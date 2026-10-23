@AGENTS.md

# Armours Edge website

Next.js 16 (App Router) site with the Sanity Studio embedded at `/studio`. Read `README.md` first for the layout of the project.

- Keep `cacheComponents` off (see `next.config.ts`); pages use `export const revalidate = 60` and `src/sanity/queries.ts`.
- Services are defined in `src/lib/services.ts`; the Sanity "service type" dropdown is built from the same list.
- Sanity project ID `7wy8vn2a`, dataset `production`. The dataset is public: never store private client details there.
- Do not touch the separate TLR Landscaping repository.
- Do not change DNS or email records for armoursedge.ca without the owner's go-ahead. Google Workspace email runs on this domain.
