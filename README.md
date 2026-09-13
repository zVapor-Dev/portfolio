# zVapor portfolio

Next.js portfolio site with a dark vapor aesthetic, Payload CMS-backed content,
and a small contact API for SMTP email delivery.

## Stack

- Next.js App Router and React 19 for the public site.
- Payload CMS 3 with the Postgres adapter for editable portfolio content.
- Tailwind CSS, Framer Motion, and React Three Fiber for the interface.
- Nodemailer for `/api/contact` email delivery.

## Local setup

1. Use Node 22, or any Node version supported by `package.json` (`>=20.9.0`).
   ```bash
   nvm use
   ```
2. Install dependencies.
   ```bash
   npm ci
   ```
3. Copy the environment template and fill in local values.
   ```bash
   cp .env.example .env
   ```
4. Start the app.
   ```bash
   npm run dev
   ```

The public page can render fallback portfolio content without a database URL.
Payload CMS, admin login, seeding, and persisted content require
`DATABASE_URL` or `POSTGRES_URL`.

## Required configuration

| Variable | Required for | Notes |
| --- | --- | --- |
| `DATABASE_URL` or `POSTGRES_URL` | Payload CMS, admin, seed data | Postgres connection string. The example uses Neon, but any compatible Postgres URL can work. |
| `PAYLOAD_SECRET` | Payload auth and sessions | Use a strong secret; `.env.example` recommends at least 32 characters. |
| `PREVIEW_SECRET` | Draft/live preview route | Must match the `previewSecret` query param for `/next/preview`. |
| `NEXT_PUBLIC_SERVER_URL` | Metadata and live preview | Usually `http://localhost:3000` locally and the deployed site URL in production. |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO` | Contact form delivery | If any of these are missing, `/api/contact` returns 503 and the UI tells visitors to email directly. |

## Common commands

```bash
npm run dev                # Start Next.js locally.
npm run build              # Generate Payload types, then build Next.js.
npm run start              # Serve a production build.
npm run generate:types     # Regenerate src/payload-types.ts from Payload config.
npm run generate:importmap # Regenerate the Payload admin import map.
npm run seed               # Replace CMS seedable content with src/seed/data.ts.
```

`npm run seed` deletes existing `projects`, `technologies`, and `experience`
documents before recreating seed records. Only run it against an empty,
throwaway, or intentionally reset database.

## Content workflow

- Visit `/admin` to sign in to Payload and edit site content.
- Public content is defined by the `site` global plus `projects`,
  `technologies`, and `experience` collections.
- The home page reads CMS data through `src/lib/content.ts`.
- If there is no database URL, a CMS query fails, or the CMS has no meaningful
  site data yet, the site falls back to `src/lib/fallbacks.ts`.
- Projects must be marked `published` to show on the normal public page.
  Draft preview can include draft content when preview mode is enabled.

See [docs/cms.md](docs/cms.md) for the source-verified CMS runbook.

## API routes

- `POST /api/contact` accepts JSON with `name`, `email`, and `message`.
  It returns `400` for missing fields, `503` when SMTP is unconfigured, and
  `200` with `{ "success": true }` after a successful send.
- Payload's REST API is mounted under `/api/[...slug]`, with the specific
  `/api/contact` route handling contact submissions.
- `GET /next/preview?previewSecret=<secret>&path=/` enables draft mode only
  when the secret matches `PREVIEW_SECRET` and the request authenticates as a
  Payload user.
- `POST /next/seed` reseeds content for an authenticated Payload user. It is
  destructive for seed-managed collections, so do not expose or automate it for
  production resets.

## Deployment notes

`vercel.json` configures Vercel to run `npm ci` and `npm run build` using the
Next.js framework preset. In `src/payload.config.ts`, the Postgres adapter uses
`push: process.env.NODE_ENV !== 'production'`: development can push schema
changes automatically, while production expects the database schema to already
be managed safely before deploy.
