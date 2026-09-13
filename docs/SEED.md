# Seeding the CMS

The portfolio ships with an idempotent seed that upserts the **Site** global and all featured collections (projects, technologies, experience) from `src/seed/data.ts`.

## Required environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon Postgres connection string (pooled URL recommended) |
| `PAYLOAD_SECRET` | Payload signing secret (must match production) |
| `NEXT_PUBLIC_SERVER_URL` | Optional but recommended — used for live preview and the admin “View live site” link |

## Local / CI

```bash
export DATABASE_URL="postgresql://..."
export PAYLOAD_SECRET="..."
export NEXT_PUBLIC_SERVER_URL="http://localhost:3000"   # optional locally

npm run migrate
npm run seed
```

`npm run seed` runs `src/seed/run.ts`, which upserts content by stable `seedKey` values. Re-running seed is safe for **seeded** rows: existing matches are updated and document IDs are preserved when possible.

> **⚠️ DESTRUCTIVE WIPE — read before seeding production**
>
> The seed sync **deletes every document** in **Projects**, **Technologies**, and **Experience** whose `seedKey` is **not** present in `src/seed/data.ts`. Custom CMS entries you added manually (or rows missing a `seedKey`) are **permanently removed** on the next seed run.
>
> Back up or export anything you need before `npm run seed` or `POST /next/seed` on a live database.

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

## Notes

- Seed data lives in `src/seed/data.ts`. Update that file, then re-run seed.
- The public site reads from Payload via the Local API and only falls back to `src/lib/fallbacks.ts` when the database is unavailable or empty.
- `PAYLOAD_SECRET` remains fail-closed in production — seed commands must provide it explicitly.
- Preview, contact-form, CMS URL validation, and production rate-limit controls are documented in `docs/SECURITY.md`.
