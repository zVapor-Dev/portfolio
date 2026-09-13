# zVapor Portfolio

Next.js App Router portfolio backed by Payload CMS and PostgreSQL. The public
site can render built-in fallback content when no database URL is configured,
while the CMS, live preview, and seeding workflows require the Payload runtime.

## Stack

- Next.js 15 with React 19 and Tailwind CSS for the public portfolio.
- Payload CMS 3 with the Postgres adapter for editable portfolio content.
- Three.js / React Three Fiber for canvas visuals.
- Nodemailer for the contact form.

## Local setup

1. Use Node.js 20.9 or newer. The project includes `.nvmrc` and
   `.node-version` with Node 22.
2. Install dependencies:

   ```sh
   npm ci
   ```

3. Copy `.env.example` to `.env.local` and fill in the required secrets:

   ```sh
   cp .env.example .env.local
   openssl rand -base64 48
   ```

4. Start development:

   ```sh
   npm run dev
   ```

The portfolio page is available at `http://localhost:3000`. Payload admin is
available at `http://localhost:3000/admin`.

## Required environment

| Variable | Required for | Notes |
| --- | --- | --- |
| `PAYLOAD_SECRET` | Payload runtime, admin, API, preview, seeding, `npm run build`, deployed builds | Generate a stable random value with `openssl rand -base64 48`. Do not rely on a checked-in fallback. |
| `DATABASE_URL` or `POSTGRES_URL` | CMS-backed content and seeding | Payload uses the first non-empty value. Without either value, the public page falls back to static content. |
| `PREVIEW_SECRET` | Live preview route | Must match the `previewSecret` query parameter and the request must authenticate as a Payload user. |
| `NEXT_PUBLIC_SERVER_URL` | Live preview and canonical site URLs | Defaults to the current request host in Payload preview contexts and Vercel URLs in app helpers. |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO` | Contact form email delivery | The contact API returns `503` until SMTP is configured. |

## Common commands

```sh
npm run dev                # Next.js development server
npm run build              # Generate Payload types, then build Next.js; requires PAYLOAD_SECRET
npm run start              # Start the production Next.js server
npm run generate:types     # Regenerate src/payload-types.ts
npm run generate:importmap # Regenerate Payload admin import map
npm run seed               # Replace CMS portfolio data with seed data
```

`npm run seed` clears and recreates the `projects`, `technologies`, and
`experience` collections, then updates the `site` global. Run it only against a
database you intend to overwrite.

## Documentation

- [`docs/cms.md`](docs/cms.md) documents the Payload CMS architecture,
  environment requirements, live preview, seeding, and troubleshooting notes.
