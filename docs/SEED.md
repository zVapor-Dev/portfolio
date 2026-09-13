# Seeding the CMS

The portfolio ships with a source-controlled CMS seed in `src/seed/data.ts`.
`src/seed/upsert.ts` uses that data to upsert the **Site** global and the
homepage collections that render on `/`.

## What the seed owns

| CMS area | Source | Public usage |
|----------|--------|--------------|
| **Site Content** global | `seedSite` | Hero, about, section headings, nav links, contact/social copy |
| **Projects** | `seedProjects` | `Works` cards, ordered by `order`, filtered to `published: true` |
| **Technologies** | `seedTechnologies` | Stack section, ordered by `order` |
| **Experience** | `seedExperience` | Experience timeline, ordered by `order` |

`src/lib/content.ts` reads these records through Payload's Local API. The public
site falls back to `src/lib/fallbacks.ts` only when no database URL is configured,
Payload cannot be loaded, or the Site global plus at least one homepage collection
are not populated.

## Required environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon Postgres connection string (pooled URL recommended) |
| `PAYLOAD_SECRET` | Payload signing secret (must match production) |
| `NEXT_PUBLIC_SERVER_URL` | Optional but recommended - used for live preview and the admin "View live site" link |

## Local / CI

```bash
export DATABASE_URL="postgresql://..."
export PAYLOAD_SECRET="..."
export NEXT_PUBLIC_SERVER_URL="http://localhost:3000"   # optional locally

npm run migrate
npm run seed
```

`npm run seed` runs `src/seed/run.ts`, which upserts content by stable `seedKey`
values. Re-running seed is deterministic for the source-controlled dataset:
existing keyed rows are updated, stale rows are removed, and document IDs are
preserved when possible.

## Idempotency and pruning

The seed is idempotent for source-controlled content, but it is intentionally
authoritative for the homepage collections:

1. Existing seeded rows are matched by `seedKey`.
2. Legacy rows without `seedKey` are matched once by title/name and backfilled
   with the matching seed key.
3. Current seed rows are updated or created.
4. Collection rows without a known current `seedKey` are deleted from
   **Projects**, **Technologies**, and **Experience**.

Because of step 4, only run the seed when `src/seed/data.ts` is the intended
source of truth for those collections. To keep manually-authored CMS rows, add
them to `src/seed/data.ts` with stable unique `seedKey` values before running the
seed. Renaming a title/name is safe when the `seedKey` stays the same; changing a
`seedKey` creates a new row and prunes the old one.

## Production (Neon)

1. Ensure migrations are applied (Vercel build runs `payload migrate` automatically on deploy).
2. From a trusted machine with network access to Neon:

```bash
export DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
export PAYLOAD_SECRET="<same value configured in Vercel>"
export NEXT_PUBLIC_SERVER_URL="https://www.zvapor.xyz"

npm run migrate   # only needed if deploying schema changes before Vercel build
npm run seed
```

3. Open `https://www.zvapor.xyz/admin` — **Site Content**, **Projects**, **Technologies**, and **Experience** should be populated.

## Authenticated HTTP seed (production admin)

While logged into `/admin`, an authenticated user can also trigger seed via:

```bash
curl -X POST https://www.zvapor.xyz/next/seed \
  -H "Cookie: <your-admin-session-cookie>"
```

This uses the same upsert logic as `npm run seed` and requires an active Payload admin session.

## Admin live-site and preview URLs

The admin sidebar includes a custom **View live site** link from
`src/components/admin/ViewSiteLink.tsx`.

- `NEXT_PUBLIC_SERVER_URL` is used by the admin link, Payload live preview, and
  collection/global preview URLs. Set it to `http://localhost:3000` for local
  admin testing and to the canonical production URL in deployed environments.
- If `NEXT_PUBLIC_SERVER_URL` is missing, Payload preview URLs use the current
  request host, but the sidebar link falls back to `https://www.zvapor.xyz`.
- The helper trims a trailing slash, so either `https://www.zvapor.xyz` or
  `https://www.zvapor.xyz/` is acceptable.

## Notes

- Seed data lives in `src/seed/data.ts`. Update that file, then re-run seed.
- Seed keys are required and unique in the Payload schema; migrations add the
  backing `seed_key` columns and indexes for the three seeded collections.
- `PAYLOAD_SECRET` remains fail-closed in production — seed commands must provide it explicitly.
