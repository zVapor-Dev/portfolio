# zVapor portfolio

Personal portfolio built with Next.js App Router, Payload CMS, Tailwind CSS, and
Three.js. The public site renders CMS-managed content when a Postgres database is
configured and falls back to checked-in content when the CMS is unavailable.

## Architecture at a glance

- `src/app/(frontend)/page.tsx` renders the single-page portfolio and always
  fetches content dynamically.
- `src/lib/content.ts` reads the Payload global and collections, then maps them
  into the component-friendly types in `src/lib/types.ts`.
- `src/lib/fallbacks.ts` provides safe public content when `DATABASE_URL` and
  `POSTGRES_URL` are missing, the CMS has no data, or a Payload read fails.
- `src/app/(payload)` mounts the Payload admin UI and REST API under `/admin`
  and `/api/[...slug]`.
- `src/app/api/contact/route.ts` handles contact form submissions with SMTP via
  `src/lib/email.ts`.

## Local setup

Requires Node.js `>=20.9.0`.

```bash
npm ci
cp .env.example .env
npm run dev
```

For CMS-backed content, set either `DATABASE_URL` or `POSTGRES_URL` to a
Postgres connection string and set `PAYLOAD_SECRET`. Without a database URL the
frontend still renders from fallback content, but `/admin` and Payload writes are
not useful.

## Environment variables

See `.env.example` for the full list.

| Variable | Required for | Notes |
| --- | --- | --- |
| `DATABASE_URL` or `POSTGRES_URL` | Payload CMS | Postgres connection string used by `@payloadcms/db-postgres`. |
| `PAYLOAD_SECRET` | Payload CMS | Use a strong secret outside local throwaway builds. |
| `PREVIEW_SECRET` | Live preview | Required by `/next/preview?previewSecret=...`. |
| `NEXT_PUBLIC_SERVER_URL` | Metadata and preview URLs | Defaults to Vercel URL values or `http://localhost:3000`. |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO` | Contact form | If these are incomplete, `/api/contact` returns `503`. |

## Public routes and calls to action

- `/` is the public portfolio.
- The hero section has one primary CTA: `Get in touch`, which anchors to
  `#contact`.
- The admin login link is intentionally kept in the navbar as `Login` and points
  to `/admin` on both desktop and mobile navigation.
- `/admin` is the Payload admin UI for authenticated CMS users.
- `/api/contact` accepts `POST` requests with `name`, `email`, and `message`.

## Common commands

```bash
npm run dev            # Next.js development server
npm run build          # Payload type generation, then Next.js build
npm run start          # Start a built Next.js app
npm run payload -- --help
npm run generate:types
npm run seed           # Replaces CMS seed-managed content; see docs/cms.md
```

The production Payload config disables automatic schema push with
`push: process.env.NODE_ENV !== 'production'`, so production database changes
need a planned schema/migration workflow.

## More documentation

- [Payload CMS content workflow](docs/cms.md)
