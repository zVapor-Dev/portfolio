# Payload CMS runbook

This app uses Payload CMS as the editing layer for the public portfolio. The CMS
configuration lives in `src/payload.config.ts`, collection schemas live in
`src/collections/*`, and the editable site-wide content lives in
`src/globals/Site.ts`.

## Architecture

- `src/payload.config.ts` registers the `users`, `projects`, `technologies`,
  and `experience` collections plus the `site` global.
- `src/app/(payload)/admin/[[...segments]]/page.tsx` serves the Payload admin at
  `/admin`.
- `src/app/(payload)/api/[...slug]/route.ts` exposes Payload's REST/GraphQL
  handlers under `/api`.
- `src/lib/content.ts` reads published CMS content for the public home page and
  falls back to `src/lib/fallbacks.ts` if no database is configured or a CMS read
  fails.
- `src/app/(frontend)/next/preview/route.ts` enables Next.js draft mode after
  validating `PREVIEW_SECRET` and authenticating a Payload user.

The home page is marked `dynamic = 'force-dynamic'`, so it reads the CMS at
request time instead of relying on static generation.

## Secret and environment policy

Payload requires a stable `PAYLOAD_SECRET` to sign and verify authentication
state. This repository intentionally has no hardcoded runtime fallback.

Generate one for every developer and deployment environment:

```sh
openssl rand -base64 48
```

Then set it in `.env.local` or the deployment environment:

```env
PAYLOAD_SECRET=<generated-value>
```

Current behavior from `getPayloadSecret()` in `src/payload.config.ts`:

| Runtime | Missing `PAYLOAD_SECRET` behavior |
| --- | --- |
| `npm run dev` | Throws with instructions to add the variable to `.env.local`. |
| Vercel preview or production (`VERCEL_ENV=preview` or `production`) | Throws with instructions to generate a secret. |
| Production server runtime (`NODE_ENV=production` outside the build phase) | Throws with instructions to generate a secret. |
| Local Next.js build phase (`NEXT_PHASE=phase-production-build`) | Uses a build-only placeholder so a direct local Next.js build phase can compile without creating a runtime secret. |

The build-only placeholder is not a deployable secret. The repository's
`npm run build` command runs `payload generate:types` before `next build`, and
that Payload CLI step is not a Next.js build phase, so the normal project build
still requires `PAYLOAD_SECRET`. Set the secret before building, starting the
app, using `/admin`, authenticating preview requests, or running seed workflows.

## Database configuration

Payload uses PostgreSQL through `@payloadcms/db-postgres`.

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
# or
POSTGRES_URL=postgresql://user:password@host/dbname?sslmode=require
```

`DATABASE_URL` takes precedence over `POSTGRES_URL`. If neither is present:

- `src/lib/content.ts` returns fallback public portfolio content.
- `npm run seed` exits before touching Payload.
- CMS/admin functionality cannot persist content.

Payload schema push is enabled only when `NODE_ENV !== 'production'`. Production
deployments should use a database whose schema already matches the checked-in
Payload configuration, because this repository does not currently include
Payload migration files.

## Collections and public content

| Source | Purpose | Public read access |
| --- | --- | --- |
| `site` global | Hero, about, contact copy, socials | Yes |
| `projects` | Portfolio cards, tags, links, image URL, sort order, published flag | Yes |
| `technologies` | Stack entries grouped by category | Yes |
| `experience` | Timeline entries and bullet points | Yes |
| `users` | Payload admin users | No public read access configured |

The public home page only includes projects where `published` is true. All
content lists sort by the `order` field.

## Live preview

Live preview URLs are configured in the Payload admin metadata for the `site`
global and content collections:

- Site and projects preview the root path.
- Technologies preview `#stack`.
- Experience previews `#experience`.

The preview route requires both:

1. `previewSecret` query parameter equal to `PREVIEW_SECRET`.
2. A valid authenticated Payload user on the request.

Failed checks return `403`. Successful checks enable draft mode and redirect to
the requested `path` query parameter, defaulting to `/`.

Example:

```text
/next/preview?previewSecret=<PREVIEW_SECRET>&path=/#experience
```

## Seeding content

There are two seed entry points:

- `npm run seed` uses `src/seed/run.ts` from the command line.
- `POST /next/seed` uses `src/app/(frontend)/next/seed/route.ts` and requires an
  authenticated Payload user.

Both workflows update the `site` global, delete existing documents from
`projects`, `technologies`, and `experience`, then recreate them from
`src/seed/data.ts`. Treat both as destructive for those collections.

## Contact form

`POST /api/contact` validates `name`, `email`, and `message`, then sends mail
through Nodemailer. The route returns `503` until all required SMTP values are
configured:

```env
SMTP_HOST=mail.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@example.com
SMTP_PASSWORD=<password>
SMTP_FROM=noreply@example.com
CONTACT_TO=contact@example.com
```

## Troubleshooting

- **`PAYLOAD_SECRET environment variable is required`**: generate a secret and
  add it to `.env.local` or the deployment environment. The normal
  `npm run build` path also needs it because it runs Payload type generation
  before `next build`.
- **Public page shows fallback content**: check `DATABASE_URL` or `POSTGRES_URL`
  and confirm the database has `site` content plus at least one project,
  technology, or experience record.
- **Preview returns `403`**: verify the `previewSecret` query parameter matches
  `PREVIEW_SECRET` and that the browser request is authenticated in Payload.
- **Contact form returns `503`**: configure `SMTP_HOST`, `SMTP_USER`,
  `SMTP_PASSWORD`, and `CONTACT_TO`.
- **Production CMS schema mismatch**: production disables Payload schema push.
  Apply schema changes before deploying code that expects them.
