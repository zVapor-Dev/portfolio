# Payload CMS operations

This app uses Payload CMS inside the Next.js App Router to manage portfolio
content. The public page reads from Payload when a database is configured and
falls back to static content when the CMS is unreachable.

## Runtime architecture

- Payload configuration lives in `src/payload.config.ts`.
- The admin UI is mounted under `/admin` by the Payload route group.
- Payload API routes are mounted under `/api/[...slug]`.
- Public page rendering calls `getPortfolioContent()` in `src/lib/content.ts`.
  It reads the `site` global plus `projects`, `technologies`, and `experience`
  collections, sorted by each document's `order` field.
- If `DATABASE_URL` and `POSTGRES_URL` are both missing, or Payload throws while
  loading content, the public page uses `src/lib/fallbacks.ts`.

## Required environment

The CMS requires Postgres and a Payload secret in every deployed environment.

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
# POSTGRES_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
PAYLOAD_SECRET=<openssl rand -base64 48>
PREVIEW_SECRET=<shared preview secret>
NEXT_PUBLIC_SERVER_URL=https://www.example.com
```

`DATABASE_URL` takes precedence over `POSTGRES_URL`. Vercel builds also need the
database URL and `PAYLOAD_SECRET` because `npm run build` runs migrations before
building the Next.js app.

## Migrations and deploys

Schema changes are shipped through committed Payload migrations:

- Migration files live in `src/migrations/`.
- `src/migrations/index.ts` registers migrations for Payload.
- `payload.config.ts` points the Postgres adapter at that directory with
  `migrationDir`.
- `push` is enabled only when `NODE_ENV === 'development'`; deployed
  environments rely on migrations instead of automatic schema pushes.
- `npm run build` executes:

```sh
payload migrate && payload generate:types && next build
```

This means production and preview deploys fail fast when a required migration,
database URL, or `PAYLOAD_SECRET` is missing.

Useful commands:

```sh
npm run payload -- migrate:create <name> # create a migration after schema edits
npm run migrate        # apply pending Payload migrations
npm run migrate:status # inspect migration state
npm run generate:types # refresh src/payload-types.ts after schema changes
```

When changing Payload collections or globals:

1. Update the config in `src/collections/*` or `src/globals/*`.
2. Generate and commit a Payload migration into `src/migrations/`.
3. Confirm `src/migrations/index.ts` includes the new migration.
4. Regenerate Payload types.
5. Review the migration SQL before deploy, especially `down` migrations.

Payload CLI commands load `src/payload.config.ts`, so local migration and type
commands also need `PAYLOAD_SECRET` set.

Do not run reset, down, or seed commands against production data unless the
operator has explicitly approved the data loss.

## Seeding and preview

Two seed paths exist:

- `npm run seed` runs `src/seed/run.ts`.
- Authenticated users can POST to `/next/seed`.

Both seed paths update the `site` global, delete existing `projects`,
`technologies`, and `experience` documents, then recreate seed data from
`src/seed/data.ts`.

Draft preview is enabled through `/next/preview`. It requires:

- `previewSecret` query parameter matching `PREVIEW_SECRET`.
- An authenticated Payload user.

## Contact form troubleshooting

`/api/contact` returns `503` until SMTP is configured. The route requires
`SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, and `CONTACT_TO`; `SMTP_PORT`,
`SMTP_SECURE`, and `SMTP_FROM` customize delivery.

## Common deployment failures

- **Build cannot connect to Postgres**: confirm the build environment has
  `DATABASE_URL` or `POSTGRES_URL` and that the database accepts the connection.
- **Payload secret error**: set `PAYLOAD_SECRET` in Vercel production and
  preview environments. For local CLI work, add it to `.env.local` or export it
  before running Payload commands.
- **Schema drift after editing collections**: create and commit a migration;
  production does not use automatic `push`.
- **Public page shows fallback content**: verify the database URL, migration
  status, and that CMS collections contain published data.
