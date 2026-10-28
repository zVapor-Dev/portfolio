# zVapor Portfolio

Personal portfolio site for [zvapor.xyz](https://www.zvapor.xyz), built with Next.js and Payload CMS. Content is managed in the admin panel; the public site uses a dark vapor aesthetic with a lightweight Three.js hero accent.

**Production:** https://www.zvapor.xyz  
**Admin:** https://www.zvapor.xyz/admin

## Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| CMS | [Payload 3](https://payloadcms.com/) at `/admin` |
| Database | PostgreSQL via `@payloadcms/db-postgres` (self-hosted in production) |
| Contact form | [Nodemailer](https://nodemailer.com/) SMTP (`POST /api/contact`) |
| Rate limiting | [Upstash](https://upstash.com/) Redis (optional) + in-memory fallback |
| 3D accent | Three.js / React Three Fiber (hero scene) |
| Styling | Tailwind CSS |

## Requirements

- Node.js **≥ 20.18.1** (22 recommended) (see `.nvmrc` / `.node-version`)
- A PostgreSQL database
- SMTP credentials for the contact form (optional for local dev / builds)
- Optional: Upstash Redis REST credentials so contact rate limits survive restarts

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
   | `DATABASE_URL` | Postgres connection string |
   | `PAYLOAD_SECRET` | Random secret (required; generate with `openssl rand -base64 48`) |
   | `PREVIEW_SECRET` | Secret for CMS live preview |
   | `NEXT_PUBLIC_SERVER_URL` | Public site URL (`http://localhost:3000` locally) |

   `POSTGRES_URL` is accepted as an alias for `DATABASE_URL` (`DATABASE_URL` wins if both are set).

3. **Apply database migrations** (first run and after pulling schema changes)

   ```bash
   npm run migrate
   ```

   Run this **before** `npm run dev`. In development (`NODE_ENV=development`) Payload also auto-pushes schema changes to the database, but those pushes are not recorded as migrations. Applying the committed migrations first keeps your database in step with what production builds run (`payload migrate`). Never point a dev server at the production database.

4. **Start the dev server**

   ```bash
   npm run dev
   ```

   - Site: http://localhost:3000  
   - Admin: http://localhost:3000/admin

5. **Create an admin user**

   On first visit to `/admin`, Payload shows its create-first-user screen. See [Admin access](#admin-access).

6. **Seed demo content** (optional)

   ```bash
   npm run seed
   ```

   See **[docs/SEED.md](./docs/SEED.md)** for local, CI, and production seeding steps (including authenticated `POST /next/seed`).

   > **Warning — seed can delete CMS-only content.**  
   > `npm run seed` (and the authenticated `POST /next/seed`) upserts the `site` global and syncs `projects`, `technologies`, and `experience` from `src/seed/data.ts`. Rows in those collections that are **not** represented in the seed file (no matching `seedKey`) are **removed**. Content you added only in the admin panel may be lost. Do not run seed against production unless you intend to reset featured content to the repo defaults.

## CMS content model

| Type | Slug | Description |
|------|------|-------------|
| Global | `site` | Hero, about, contact copy, and social links |
| Collection | `projects` | Selected work / portfolio projects |
| Collection | `technologies` | Stack / tech icons |
| Collection | `experience` | Work history entries |
| Collection | `users` | Admin accounts (Payload auth) |

Live preview is enabled for the collections and `site` global. Preview URLs use `NEXT_PUBLIC_SERVER_URL` and require `PREVIEW_SECRET`. Preview `path` values are allowlisted (site-relative paths only) to prevent open redirects.

The navbar **Login** button links to `/admin` (desktop and mobile menu).

Anonymous REST reads of `projects` only return entries with `published` checked; authenticated admins also see unpublished entries. The public page always filters to published projects.

See **[docs/cms.md](./docs/cms.md)** for the runtime map, migrations workflow, preview requirements, and troubleshooting.

## Admin access

- **First user:** there is no script or seed that creates users. Open `/admin` on a database with no users and Payload shows its create-first-user screen. After that, additional users can only be created by a logged-in admin.
- **Password reset:** `scripts/reset-admin-password.ts` updates the password of an **existing** user; it never creates one. Set these environment variables in your shell for the single run (do not commit them):

  | Variable | Purpose |
  |----------|---------|
  | `DATABASE_URL` or `POSTGRES_URL` | Database containing the user |
  | `PAYLOAD_SECRET` | Required to load the Payload config |
  | `ADMIN_EMAIL` | Email of the existing user |
  | `ADMIN_PASSWORD` | New password |

  ```bash
  npx tsx scripts/reset-admin-password.ts
  ```

  The script exits with an error if any variable is missing or no user has that email.

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

### Abuse protection (rate limit)

`POST /api/contact` runs its checks in this order:

1. **SMTP configured?** If `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, or `CONTACT_TO` is missing → **503** (nothing else runs).
2. **Validation** (Zod) → **400** on an invalid body. Invalid requests do not count against the rate limit.
3. **Rate limit** — sliding window (default **5 requests / hour**) per client IP **and** per normalized email → **429** with `Retry-After` and `X-RateLimit-*` headers.
4. **Send** via Nodemailer → **200**, or **500** if sending fails.

| Variable | Description |
|----------|-------------|
| `CONTACT_RATE_LIMIT_MAX` | Max submissions per window (default `5`) |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Window length in ms (default `3600000` = 1 hour) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL (optional) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

When Upstash is unset, the limiter falls back to an **in-memory** sliding window in the server process (reset on restart).

Input is Zod-validated and HTML-escaped in the email body; SMTP header fields (`subject`, `replyTo`) are sanitized.

**Notes for operators:**

- `npm run build` succeeds without `SMTP_PASSWORD`. The contact form returns **503** until SMTP is fully configured.
- Set production SMTP and (optional) Upstash values in the server's environment, not in the repo.
- Never commit secrets; use `.env.local` locally and platform env vars in production.
- `CONTACT_RATE_LIMIT_*` are read when the module loads; redeploy (or restart) after changing them.

More detail: **[docs/SECURITY.md](./docs/SECURITY.md)**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Run `payload migrate`, generate types, then `next build` |
| `npm run migrate` | Apply Payload database migrations |
| `npm run migrate:status` | Show migration status |
| `npm run start` | Run production server |
| `npm run seed` | Upsert CMS content from `src/seed/data.ts` (see [docs/SEED.md](./docs/SEED.md)) |
| `npm run generate:types` | Regenerate `src/payload-types.ts` |
| `npm run lint` | Run ESLint (flat config in `eslint.config.mjs`) |

## Deployment

The site runs as a Node.js server on a Pterodactyl panel behind Cloudflare. On every start the server pulls `master`, then runs `npm ci`, `npm run build` and `npm run start -- -p <port> -H 0.0.0.0`. The build runs **`payload migrate`** before `next build`, so `DATABASE_URL` and `PAYLOAD_SECRET` must be in the server's `.env`. Set `NEXT_PUBLIC_SERVER_URL` to `https://www.zvapor.xyz` in production. Restarting the server deploys the latest `master`.

## Documentation

- [docs/cms.md](./docs/cms.md) — Payload runtime map, content model, `PAYLOAD_SECRET` behaviour, migrations, preview, troubleshooting
- [docs/SEED.md](./docs/SEED.md) — seeding (destructive pruning — read first)
- [docs/SECURITY.md](./docs/SECURITY.md) — contact form, preview redirects, CMS URL validation, operational pitfalls

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
