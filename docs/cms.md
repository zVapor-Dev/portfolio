# Payload CMS operations

Payload CMS 3 runs inside the Next.js App Router and manages all portfolio
content. The public page reads from Payload when a database is configured and
falls back to static content otherwise.

## Runtime map

| Path | Source | Notes |
|------|--------|-------|
| `/` | `src/app/(frontend)/page.tsx` | `dynamic = 'force-dynamic'`; reads the CMS on every request via `getPortfolioContent()` in `src/lib/content.ts` |
| `/admin` | `src/app/(payload)/admin/[[...segments]]/page.tsx` | Payload admin UI |
| `/api/*` | `src/app/(payload)/api/[...slug]/route.ts` | Payload REST/GraphQL handlers |
| `POST /api/contact` | `src/app/api/contact/route.ts` | Contact form (see [SECURITY.md](./SECURITY.md)) |
| `GET /next/preview` | `src/app/(frontend)/next/preview/route.ts` | Enables Next.js draft mode (see [Preview](#preview)) |
| `POST /next/seed` | `src/app/(frontend)/next/seed/route.ts` | Authenticated seed (see [SEED.md](./SEED.md)) |

Configuration lives in `src/payload.config.ts`, collections in
`src/collections/*`, the `site` global in `src/globals/Site.ts`.

`getPortfolioContent()` returns `src/lib/fallbacks.ts` when:

- neither `DATABASE_URL` nor `POSTGRES_URL` is set,
- Payload throws while loading content, or
- the `site` global has no `name`, or all of `projects`, `technologies` and
  `experience` are empty.

## Content model

| Source | Purpose | Public read |
|--------|---------|-------------|
| `site` global | Hero, about, section headings, nav links, contact/social copy | Yes |
| `projects` | Portfolio cards (tags, links, image URL, `order`, `published`) | Only `published: true` for anonymous requests |
| `technologies` | Stack entries grouped by category | Yes |
| `experience` | Timeline entries and bullet points | Yes |
| `users` | Payload admin accounts (`auth: true`) | Payload default (authenticated only) |

- Lists are sorted by `order`. The public page only shows projects with
  `published` checked, even in draft mode.
- No collection or global enables Payload versions/drafts; `published` is a
  plain checkbox.
- `projects`, `technologies` and `experience` each have a required, unique
  `seedKey` used by the seed (see [SEED.md](./SEED.md)).
- Users: the first user is created on Payload's create-first-user screen at
  `/admin`; nothing in the repo creates users. Password reset is documented in
  the README ([Admin access](../README.md#admin-access)).

## `PAYLOAD_SECRET`

Generate once per environment and keep it stable:

```sh
openssl rand -base64 48
```

The code only checks that the variable is non-empty. Behaviour of
`getPayloadSecret()` in `src/payload.config.ts` when it is **missing**:

| Context | Result |
|---------|--------|
| `NODE_ENV=production` outside the Next.js build phase (e.g. `npm run start`) | Throws |
| `NEXT_PHASE=phase-production-build` (a bare `next build`) | Uses a build-only placeholder |
| Everything else (`npm run dev`, Payload CLI commands, `npm run seed`, scripts) | Throws |

The placeholder does not apply to `npm run build` locally, because that script runs
`payload migrate` (a CLI command) before `next build`. In practice every
environment needs a real secret.

## Migrations

- Migration files live in `src/migrations/` and are registered in
  `src/migrations/index.ts`.
- The Postgres adapter sets `push: process.env.NODE_ENV === 'development'`, so
  automatic schema push happens **only** under `npm run dev`. Pushed changes are
  not recorded as migrations.
- `npm run build` runs `payload migrate && payload generate:types && next build`,
  so every server start applies pending migrations before building. A missing
  database URL, missing `PAYLOAD_SECRET`, or failing migration stops the start.

Changing a collection or global:

1. Edit `src/collections/*` or `src/globals/*`.
2. Create a migration: `npm run payload -- migrate:create <name>`.
3. Check that the new file is in `src/migrations/` **and** listed in
   `src/migrations/index.ts`; commit both.
4. `npm run generate:types` and commit `src/payload-types.ts`.
5. Review the generated SQL (including `down`) before merging.

Other commands: `npm run migrate` (apply pending), `npm run migrate:status`.
Payload CLI commands load `src/payload.config.ts`, so they need
`PAYLOAD_SECRET` and a database URL in the environment.

Do not run `migrate:down`/reset or seed against production unless the data loss
is intended.

## Preview

Payload live preview is configured for `projects`, `technologies`,
`experience` and the `site` global. The iframe URL is `NEXT_PUBLIC_SERVER_URL`
(or the current request host if unset), plus `#stack` for technologies and
`#experience` for experience.

The public layout only mounts the live-preview refresh listener when Next.js
draft mode is on. Draft mode is enabled by `GET /next/preview`, which requires
**all** of:

1. `path` (default `/`) is a strict site-relative path: letters, digits, `/`,
   `_`, `-` only. No `%`, query, hash, backslash or `//`. Otherwise **400**.
2. `previewSecret` query parameter equals `PREVIEW_SECRET`. Otherwise **403**.
3. The request carries a valid Payload login (admin session cookie). Otherwise
   **403**.

On success it enables draft mode and redirects to `path`.

```text
/next/preview?previewSecret=<PREVIEW_SECRET>&path=/
```

## Troubleshooting

| Symptom | Check |
|---------|-------|
| `PAYLOAD_SECRET environment variable is required…` | Set `PAYLOAD_SECRET` in `.env.local`, your shell (CLI/scripts), or the production server's `.env`. |
| Server start fails in `payload migrate` | Build env has `DATABASE_URL`/`POSTGRES_URL` and `PAYLOAD_SECRET`; database reachable; migration SQL valid. |
| Schema mismatch in production | Production never pushes schema. Create and commit a migration; the next restart applies it. |
| Public page shows fallback content | Database URL set; `npm run migrate:status`; `site` has a name and at least one project/technology/experience exists. |
| Project missing on the public page | `published` is checked. |
| Preview returns 400 | `path` contains a disallowed character (e.g. `#`, `?`, `%`). |
| Preview returns 403 | `previewSecret` matches `PREVIEW_SECRET` and you are logged into `/admin` on the same origin. |
| Contact form returns 503 | `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO` all set. |
