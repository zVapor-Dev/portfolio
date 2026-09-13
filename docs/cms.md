# Payload CMS runbook

This site moved from static constants to Payload CMS-backed portfolio content.
Use this note when changing the content model, troubleshooting missing content,
or operating preview and seed workflows.

## Route map

| Route | Purpose | Source |
| --- | --- | --- |
| `/` | Public portfolio page. | `src/app/(frontend)/page.tsx` |
| `/admin` | Payload admin UI and user login. | `src/app/(payload)/admin/[[...segments]]/page.tsx` |
| `/api/[...slug]` | Payload REST endpoints. | `src/app/(payload)/api/[...slug]/route.ts` |
| `/api/contact` | Contact form email endpoint. | `src/app/api/contact/route.ts` |
| `/next/preview` | Authenticated draft preview entry point. | `src/app/(frontend)/next/preview/route.ts` |
| `/next/seed` | Authenticated CMS reseed endpoint. | `src/app/(frontend)/next/seed/route.ts` |

## Content architecture

The public page calls `getPortfolioContent()` from `src/lib/content.ts`.
That function:

1. Returns `fallbackContent` immediately when neither `DATABASE_URL` nor
   `POSTGRES_URL` is configured.
2. Reads the `site` global and the `projects`, `technologies`, and `experience`
   collections through `getPayload()`.
3. Passes the current Next.js draft mode state into Payload queries.
4. Shows only projects where `published` is `true` outside draft preview.
5. Falls back to `src/lib/fallbacks.ts` if CMS data is unavailable or the CMS
   does not yet have enough site and collection data to render the page.

Navigation links are still code-defined in `fallbackContent.navLinks`; editors
manage section content, projects, technologies, experience, and social links in
Payload.

## Content model

### `site` global

The `site` global stores hero copy, about copy, contact copy, and social links.
Important fields include:

- `name`, `handle`, `title`, `location`
- `headline`, `headlineAccent`, `heroDescription`
- `aboutParagraphs[]` and `highlights[]`
- `email`, `website`, `github`, `twitter`

The global has public read access so the public page can render published site
content without a logged-in user.

### `projects`

Projects power the work section.

- Required: `title`, `description`, `imageUrl`
- Optional arrays: `tags[]`, `links[]`
- Sidebar fields: `order`, `published`
- Public rendering sorts by `order` and filters to `published: true` unless
  draft preview is active.

### `technologies`

Technologies power the stack section.

- Required: `name`, `category`
- `category` must be one of `language`, `frontend`, `backend`, `database`, or
  `platform`.
- Public rendering sorts by `order`.

### `experience`

Experience entries power the experience section.

- Required: `title`, `company`, `date`
- Optional: `iconUrl`, `iconBg`, `points[]`
- Defaults: `iconUrl` is `/discord.png`; `iconBg` is `#5865F2`.
- Public rendering sorts by `order`.

## Preview workflow

Payload live preview is configured for the `site` global and all three content
collections. The preview URL resolves from `NEXT_PUBLIC_SERVER_URL` when set,
otherwise from the incoming request host.

To enter preview mode manually:

```text
/next/preview?previewSecret=<PREVIEW_SECRET>&path=/
```

The route returns `403` unless both conditions are true:

1. `previewSecret` matches `process.env.PREVIEW_SECRET`.
2. The request authenticates as a Payload user.

When both checks pass, the route enables Next.js draft mode and redirects to the
requested `path`.

## Seed workflow

Seed data lives in `src/seed/data.ts`.

CLI seeding:

```bash
npm run seed
```

Authenticated route seeding:

```bash
curl -X POST http://localhost:3000/next/seed
```

The route version requires a logged-in Payload user. Both seed paths update the
`site` global, delete all existing documents in `projects`, `technologies`, and
`experience`, then recreate the seed records.

Treat seeding as destructive. Do not run it against production or a shared CMS
database unless the goal is to replace those collections with the checked-in
seed data.

## Contact form troubleshooting

The contact form posts JSON to `/api/contact`:

```json
{
  "name": "Jane Developer",
  "email": "jane@example.com",
  "message": "Hello from the portfolio"
}
```

Expected responses:

- `200` with `{ "success": true }` when SMTP sends successfully.
- `400` when any required field is missing.
- `503` when SMTP is not configured.
- `500` when parsing or email delivery fails after configuration checks pass.

`SMTP_SECURE` must be the string `true` to enable a secure SMTP connection.
Any other value uses a non-secure connection on the configured `SMTP_PORT`
or port `587` by default.

## Production schema note

The Payload Postgres adapter is configured with
`push: process.env.NODE_ENV !== 'production'`. Development can push schema
changes from the config automatically, but production does not. This repository
currently has no checked-in Payload migration files, so production deployments
need a deliberate database schema update process before relying on new or
changed CMS fields.
