# Security and operations runbook

This portfolio is a Next.js App Router app backed by Payload CMS. The controls
below are verified against the current source and cover the public surfaces most
likely to fail open if configuration drifts.

## Contact form (`POST /api/contact`)

The contact route accepts JSON from `src/components/Contact.tsx`, validates it
with `src/lib/contactSchema.ts`, rate-limits it, and sends mail through
Nodemailer in `src/lib/email.ts`.

### Required SMTP configuration

The API returns `503` until all required SMTP variables are set:

| Variable | Used for |
| --- | --- |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_USER` | SMTP authentication username |
| `SMTP_PASSWORD` | SMTP authentication password |
| `CONTACT_TO` | Final recipient for contact messages |

Optional mail variables:

- `SMTP_PORT` defaults to `587`.
- `SMTP_SECURE=true` enables a secure SMTP connection.
- `SMTP_FROM` defaults to `SMTP_USER` when unset.

### Validation and escaping

- `name`: trimmed, required, maximum 200 characters.
- `email`: trimmed, required, valid email, maximum 320 characters.
- `message`: trimmed, required, maximum 5000 characters.
- `replyTo` and the email subject strip CR/LF characters to prevent SMTP header
  injection.
- HTML email output escapes user-provided values and converts message newlines
  to `<br>`. Plain-text email output preserves the submitted text.

### Rate limiting

`src/lib/rateLimit.ts` checks both client IP and normalized email address. All
keys must pass before mail is sent.

| Variable | Default | Notes |
| --- | --- | --- |
| `CONTACT_RATE_LIMIT_MAX` | `5` | Requests allowed per key |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | `3600000` | Sliding window length |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | unset | Enables shared Upstash Redis-backed limits |

When Upstash is configured, the limiter uses `@upstash/ratelimit` with the
`portfolio-contact` prefix. Without Upstash it falls back to an in-memory sliding
window per warm serverless instance, which is useful locally but approximate on
multi-instance deployments.

Responses include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and
`X-RateLimit-Reset`. `429` responses also include `Retry-After`.

Example local checks:

```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  --data '{"name":"Alice","email":"alice@example.com","message":"Hello"}'

curl -i -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  --data '{"name":"Alice","email":"not-an-email","message":"Hello"}'
```

Expect `503` when SMTP is intentionally unconfigured, `400` for invalid payloads,
`429` after the configured limit, and `200` only when validation, rate limiting,
and SMTP delivery all succeed.

## Payload preview redirects (`GET /next/preview`)

The preview endpoint in `src/app/(frontend)/next/preview/route.ts` enables
Next.js draft mode only after all of these checks pass:

1. `path` is a strict same-site relative path accepted by
   `src/lib/safeRedirect.ts`.
2. `previewSecret` exactly matches `PREVIEW_SECRET`.
3. Payload authentication finds an active admin user from the request headers.

Allowed preview paths:

- Must start with `/`.
- May contain only letters, numbers, `/`, `_`, and `-`.
- May be `/`.

Rejected preview paths include protocol-relative URLs (`//example.com`), absolute
URLs, paths containing `%`, query strings, hashes, backslashes, CR/LF characters,
or encoded bypass attempts such as `/%2f%2fevil.com`.

Example rejected-path check:

```bash
curl -i 'http://localhost:3000/next/preview?previewSecret=local-placeholder&path=/%2f%2fevil.com'
```

This should return `400 Invalid preview path` before the secret or admin-session
checks matter.

## CMS URL fields and read access

`src/lib/validateUrl.ts` is used by CMS fields that render outbound links or
image URLs:

- `Site`: `website`, `github`, `twitter`
- `Projects`: link URLs and `imageUrl`
- `Experience`: `iconUrl`

Allowed values are empty, a site-relative path beginning with `/` that is not
protocol-relative and contains no CR/LF characters, or an absolute `http://` or
`https://` URL. Other schemes are rejected.

Current collection read rules:

- `Projects`: unauthenticated reads only return documents where `published` is
  `true`; authenticated Payload users may read unpublished documents.
- `Site`, `Technologies`, and `Experience`: public read access.
- The frontend content loader still queries projects with
  `published: { equals: true }`, even while draft mode is enabled.

## Operational pitfalls

- Keep `PREVIEW_SECRET` out of client-side code and rotate it if a preview URL is
  shared outside trusted admin users.
- Configure Upstash Redis in production if contact form rate limits must be
  consistent across Vercel instances.
- Changing rate-limit or Upstash environment variables requires a process
  restart or redeploy because the limiter configuration is initialized in module
  scope.
- The authenticated HTTP seed endpoint and the CLI seed both use the seed logic
  documented in `docs/SEED.md`; review its destructive wipe warning before
  seeding a live database.
