# zVapor Portfolio

Personal portfolio site for [zvapor.xyz](https://www.zvapor.xyz), built with Next.js and Payload CMS. Content is managed in the admin panel; the public site uses a dark vapor aesthetic with a lightweight Three.js hero accent.

**Production:** https://www.zvapor.xyz  
**Admin:** https://www.zvapor.xyz/admin

## Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| CMS | [Payload 3](https://payloadcms.com/) at `/admin` |
| Database | [Neon](https://neon.tech/) Postgres via `@payloadcms/db-postgres` |
| Contact form | [Nodemailer](https://nodemailer.com/) SMTP (`POST /api/contact`) |
| 3D accent | Three.js / React Three Fiber (hero scene) |
| Styling | Tailwind CSS |

## Requirements

- Node.js **≥ 20.9** (see `.nvmrc` / `.node-version`)
- A Neon Postgres database (or compatible Postgres)
- SMTP credentials for the contact form (optional for local dev / builds)

## Local setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set at minimum:

   | Variable | Purpose |
   |----------|---------|
   | `DATABASE_URL` | Neon Postgres connection string (pooled URL recommended) |
   | `PAYLOAD_SECRET` | Random secret, at least 32 characters |
   | `PREVIEW_SECRET` | Secret for CMS live preview |
   | `NEXT_PUBLIC_SERVER_URL` | Public site URL (`http://localhost:3000` locally) |

   `POSTGRES_URL` is accepted as an alias for `DATABASE_URL`.

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   - Site: http://localhost:3000  
   - Admin: http://localhost:3000/admin

4. **Create an admin user**

   On first visit to `/admin`, Payload prompts you to create the initial user account. This account is required for CMS editing and the authenticated HTTP seed route.

5. **Seed demo content** (optional)

   ```bash
   npm run seed
   ```

   This populates the `site` global and the `projects`, `technologies`, and `experience` collections. It clears and replaces existing documents in those collections.

   Authenticated admins can also seed via `POST /next/seed` while logged in.

## CMS content model

| Type | Slug | Description |
|------|------|-------------|
| Global | `site` | Hero, about, contact copy, and social links |
| Collection | `projects` | Selected work / portfolio projects |
| Collection | `technologies` | Stack / tech icons |
| Collection | `experience` | Work history entries |
| Collection | `users` | Admin accounts (Payload auth) |

Live preview is enabled for the collections and `site` global. Preview URLs use `NEXT_PUBLIC_SERVER_URL` and require `PREVIEW_SECRET`.

The navbar **Login** button and hero CTA link to `/admin`.

For schema-change workflow, seeding constraints, preview behavior, and production database notes, see [docs/cms.md](./docs/cms.md).

## Contact form (SMTP)

The contact form submits to `POST /api/contact`. Outbound mail is sent with Nodemailer using the SMTP variables in `.env.example`:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | Mail server hostname |
| `SMTP_PORT` | Port (default `587`) |
| `SMTP_SECURE` | `true` for TLS on connect; `false` for STARTTLS |
| `SMTP_USER` | SMTP username |
| `SMTP_PASSWORD` | SMTP password |
| `SMTP_FROM` | From address (falls back to `SMTP_USER`) |
| `CONTACT_TO` | Inbox that receives form submissions |

**Notes for operators:**

- `npm run build` succeeds without `SMTP_PASSWORD`. The contact form returns **503** until SMTP is fully configured.
- Set production SMTP values in your deployment environment (e.g. Vercel project settings), not in the repo.
- Never commit secrets; use `.env.local` locally and platform env vars in production.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Generate Payload types and production build |
| `npm run start` | Run production server |
| `npm run seed` | Seed CMS content via Payload local API (requires database) |
| `npm run generate:types` | Regenerate `src/payload-types.ts` |
| `npm run lint` | Run Next.js ESLint |

## Deployment

The site is deployed on Vercel (`vercel.json` uses `npm ci` and `npm run build`). Ensure all required environment variables from `.env.example` are set in the Vercel project. Set `NEXT_PUBLIC_SERVER_URL` to `https://www.zvapor.xyz` in production.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
