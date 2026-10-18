# Seeding the CMS

The portfolio ships with a source-controlled CMS seed in `src/seed/data.ts`.
`src/seed/upsert.ts` uses that data to upsert the **Site** global and sync the
homepage collections (projects, technologies, experience).

> **⚠️ DESTRUCTIVE — read before seeding a live database**
>
> **Both** seed paths — `npm run seed` and `POST /next/seed` — **delete every
> document** in **Projects**, **Technologies**, and **Experience** whose
> `seedKey` is **not** present in `src/seed/data.ts`. Entries you added only in
> the admin panel are **permanently removed** on the next seed run. The `site`
> global is overwritten with the seed values.
>
> Back up or export anything you need first.

The seed never creates, changes or deletes **users**. Create the first admin on
Payload's create-first-user screen at `/admin` (see the README's
[Admin access](../README.md#admin-access)).

## What the seed owns

| CMS area | Source | Public usage |
|----------|--------|--------------|
| **Site Content** global | `seedSite` | Hero, about, section headings, nav links, contact/social copy |
| **Projects** | `seedProjects` | Selected Work cards, ordered by `order`, filtered to `published: true` |
| **Technologies** | `seedTechnologies` | Stack section, ordered by `order` |
| **Experience** | `seedExperience` | Experience timeline, ordered by `order` |

`src/lib/content.ts` reads these through Payload's Local API. The public site
falls back to `src/lib/fallbacks.ts` only when no database URL is configured,
Payload throws, or the Site global has no name and none of the three
collections has entries.

## Required environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` (or `POSTGRES_URL`) | Neon Postgres connection string (pooled URL recommended) |
| `PAYLOAD_SECRET` | Required to load the Payload config. Any non-empty value works for the CLI seed; reusing the environment's own value is simplest. |
| `NEXT_PUBLIC_SERVER_URL` | Optional — used for live preview and the admin "View live site" link |

## Local / CI

```bash
export DATABASE_URL="postgresql://..."
export PAYLOAD_SECRET="..."
export NEXT_PUBLIC_SERVER_URL="http://localhost:3000"   # optional locally

npm run migrate
npm run seed
```

`npm run seed` runs `src/seed/run.ts`, which calls the same
`seedPortfolioContent()` as the HTTP route.

## Idempotency and pruning

Once every row has a `seedKey`, re-running the seed with unchanged
`src/seed/data.ts` produces the same content and keeps document IDs. For each of the three collections it:

1. Loads existing documents (up to 1000) and matches them by `seedKey`.
2. For legacy documents without a `seedKey`, matches by title (projects,
   experience) or name (technologies) and backfills the `seedKey`.
3. Updates matched documents and creates missing ones.
4. **Deletes** every document whose `seedKey` was not in the seed data when it
   was loaded — including documents that had no `seedKey`.

> **Known quirk:** step 4 checks the `seedKey` as it was *loaded*, so a legacy
> document backfilled in step 2 is still deleted in the same run. Its seed item
> is missing until the seed runs again (the second run creates it). Run the seed
> twice if the database still has rows without a `seedKey`.

Consequences:

- Only run the seed when `src/seed/data.ts` is meant to be the source of truth
  for those collections.
- To keep a CMS-authored entry, add it to `src/seed/data.ts` with a stable,
  unique `seedKey` first.
- Renaming a title/name is safe if the `seedKey` stays the same; changing a
  `seedKey` creates a new document and deletes the old one.

## Production (Neon)

1. Ensure migrations are applied (the Vercel build runs `payload migrate` on
   every deploy).
2. From a trusted machine with network access to Neon:

```bash
export DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
export PAYLOAD_SECRET="<any non-empty value; the production value is fine>"
export NEXT_PUBLIC_SERVER_URL="https://www.zvapor.xyz"

npm run migrate   # only needed if deploying schema changes before Vercel build
npm run seed
```

3. Open `https://www.zvapor.xyz/admin` — **Site Content**, **Projects**,
   **Technologies**, and **Experience** should be populated.

## Authenticated HTTP seed

A logged-in Payload user can trigger the same seed over HTTP:

```bash
curl -X POST https://www.zvapor.xyz/next/seed \
  -H "Cookie: <your-admin-session-cookie>"
```

Without a valid session the route returns **403**. It runs the same upsert and
**pruning** logic as `npm run seed`.

## Notes

- Seed data lives in `src/seed/data.ts`. Update that file, then re-run seed.
- `seedKey` is required and unique in the Payload schema; the
  `20260913_030100_add_seed_keys_and_site_sections` migration adds the columns.
- `PAYLOAD_SECRET` is fail-closed: seed commands must provide it explicitly.
- Preview, contact-form, CMS URL validation, and rate-limit controls are
  documented in [SECURITY.md](./SECURITY.md).
