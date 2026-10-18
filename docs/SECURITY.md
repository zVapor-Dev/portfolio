# Security and operations runbook

This portfolio is a Next.js App Router app backed by Payload CMS. The controls
below are verified against the current source and cover the public surfaces most
likely to fail open if configuration drifts.

## Contact form (`POST /api/contact`)

The route (`src/app/api/contact/route.ts`) accepts JSON from
`src/components/Contact.tsx`, validates it with `src/lib/contactSchema.ts`,
rate-limits it with `src/lib/rateLimit.ts`, and sends mail through Nodemailer in
`src/lib/email.ts`.

### Check order

| Step | Condition | Response |
|------|-----------|----------|
| 1 | Any of `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO` missing | **503** — nothing else runs, no rate-limit counted |
| 2 | Body fails Zod validation (or is not JSON) | **400** (validation) / **500** (unparseable JSON) — no rate-limit counted |
| 3 | IP or email key over the limit | **429** with `Retry-After` and `X-RateLimit-*` |
| 4 | Nodemailer send fails | **500** |
| — | Success | **200** with `X-RateLimit-*` |

A request that reaches step 3 counts against the limit even if sending then
fails.

### SMTP configuration

| Variable | Used for |
|----------|----------|
| `SMTP_HOST` | SMTP server hostname (required) |
| `SMTP_USER` | SMTP username (required) |
| `SMTP_PASSWORD` | SMTP password (required) |
| `CONTACT_TO` | Recipient inbox (required) |
| `SMTP_PORT` | Optional, default `587` |
| `SMTP_SECURE` | Optional, `true` for TLS on connect |
| `SMTP_FROM` | Optional, defaults to `SMTP_USER` |

### Validation and escaping

- `name`: trimmed, required, max 200 characters.
- `email`: trimmed, required, valid email, max 320 characters.
- `message`: trimmed, required, max 5000 characters.
- `replyTo` and the subject have CR/LF replaced to prevent SMTP header
  injection.
- The HTML body escapes user values and converts message newlines to `<br>`;
  the plain-text body contains the submitted text as-is.

### Rate limiting

Both the client IP (first `x-forwarded-for` entry, else `x-real-ip`) and the
lower-cased email are checked; all keys must pass.

| Variable | Default | Notes |
|----------|---------|-------|
| `CONTACT_RATE_LIMIT_MAX` | `5` | Requests allowed per key per window |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | `3600000` | Window length (1 hour) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | unset | Enables shared Upstash Redis limits |

- With Upstash configured, `@upstash/ratelimit` uses a sliding window with the
  `portfolio-contact` prefix, shared across Vercel instances.
- Without Upstash, an in-memory sliding window is kept per warm serverless
  instance — fine locally, approximate in production.
- `CONTACT_RATE_LIMIT_MAX` and `CONTACT_RATE_LIMIT_WINDOW_MS` are read **once at
  module load**, and the Upstash client is created once per instance. **Redeploy**
  (or restart the server) after changing any of these variables.

Local checks (with SMTP intentionally unset, both return **503**; with SMTP
set, the second returns **400**):

```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  --data '{"name":"Alice","email":"alice@example.com","message":"Hello"}'

curl -i -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  --data '{"name":"Alice","email":"not-an-email","message":"Hello"}'
```

With SMTP configured, valid requests send real mail — test the 429 path against
a throwaway inbox, not production.

## Preview redirects (`GET /next/preview`)

`src/app/(frontend)/next/preview/route.ts` enables Next.js draft mode only
after all checks pass, in this order:

1. `path` (default `/`) is accepted by `isSafeRedirectPath()` in
   `src/lib/safeRedirect.ts` → otherwise **400** `Invalid preview path`.
2. `previewSecret` exactly matches `PREVIEW_SECRET` → otherwise **403**.
3. Payload authentication finds a logged-in user → otherwise **403** (and
   draft mode is disabled).

Allowed paths start with `/` and contain only letters, digits, `/`, `_` and
`-`. Rejected: protocol-relative URLs (`//example.com`), absolute URLs, `%`
(any percent-encoding, e.g. `/%2f%2fevil.com`), query strings, hashes,
backslashes, and control characters.

```bash
curl -i 'http://localhost:3000/next/preview?previewSecret=local-placeholder&path=/%2f%2fevil.com'
# → 400 Invalid preview path (before the secret or session is checked)
```

## CMS URL fields and read access

`validateAllowedUrl()` in `src/lib/validateUrl.ts` guards fields that render
links or images:

- `site`: `website`, `github`, `twitter`
- `projects`: link `url`s and `imageUrl`
- `experience`: `iconUrl`

Allowed: empty, a site-relative path starting with `/` (not `//`, no
CR/LF/NUL), or an absolute `http://` / `https://` URL.

Read access:

- `projects`: anonymous reads only return `published: true`; logged-in users
  see all.
- `site`, `technologies`, `experience`: public read.
- `users`: Payload default (logged-in users only).
- The public page always queries projects with `published: true`, even in draft
  mode.

## Admin accounts

- The first admin is created on Payload's create-first-user screen at `/admin`.
  No script or seed creates users.
- `scripts/reset-admin-password.ts` resets an existing user's password using
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the shell environment. Never commit
  those values or add them to the deployment environment.

## Operational pitfalls

- Keep `PREVIEW_SECRET` server-side and rotate it if a preview URL leaks outside
  trusted admins.
- Configure Upstash in production if rate limits must hold across instances.
- Redeploy after changing `CONTACT_RATE_LIMIT_*` or Upstash variables.
- `npm run seed` and `POST /next/seed` both **delete** CMS rows not in
  `src/seed/data.ts` — read [SEED.md](./SEED.md) before seeding a live database.
- Never commit secrets: use `.env.local` locally and Vercel environment
  variables in production.
