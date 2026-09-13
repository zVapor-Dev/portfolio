# Payload CMS content workflow

This app uses Payload CMS as the editing surface for the public portfolio. The
frontend is designed to keep rendering even when the CMS is not configured, so
local development can start before a database exists.

## Content model

Payload is configured in `src/payload.config.ts`.

| Source | Slug | Public use |
| --- | --- | --- |
| Global | `site` | Hero copy, about copy, contact text, email, website, GitHub, and Twitter links. |
| Collection | `projects` | Cards in the `#work` section. Only documents where `published` is `true` are shown. |
| Collection | `technologies` | Grouped stack badges in the `#stack` section. |
| Collection | `experience` | Timeline entries in the `#experience` section. |
| Collection | `users` | Payload authentication users for `/admin`. |

All content collections and the `site` global have public read access in their
collection/global config. Admin writes still require an authenticated Payload
user.

## Frontend rendering path

`src/app/(frontend)/page.tsx` calls `getPortfolioContent()` from
`src/lib/content.ts`, then renders:

1. `Navbar`
2. `Hero`
3. `About`
4. `Experience`
5. `Tech`
6. `Works`
7. `Contact`

`getPortfolioContent()` first checks for `DATABASE_URL` or `POSTGRES_URL`.
If neither is present, it returns `fallbackContent`. If Payload throws or the CMS
does not yet contain the required site/global data plus at least one content
collection item, it also returns `fallbackContent`.

The home page exports `dynamic = 'force-dynamic'`, so content is fetched per
request instead of being statically baked into the build.

## Navigation and admin access

The public hero section has a single primary CTA: `Get in touch`, which links to
the contact section. The `Login` link for editors is not part of the hero; it is
available in `src/components/Navbar.tsx` and points to `/admin` in both desktop
and mobile navigation.

Use `/admin` to sign in to Payload and manage content. Payload's generated REST
API is mounted at `/api/[...slug]` by `src/app/(payload)/api/[...slug]/route.ts`.

## Live preview

Live preview is configured for the `site` global and the content collections.
The preview URL is based on `NEXT_PUBLIC_SERVER_URL` when it is set, otherwise
the request protocol and host are used.

`/next/preview` enables Next.js draft mode only when both checks pass:

1. The `previewSecret` query parameter equals `PREVIEW_SECRET`.
2. Payload authenticates a user from the request headers.

If either check fails, the route returns `403`.

Example:

```text
/next/preview?previewSecret=<PREVIEW_SECRET>&path=/#work
```

## Contact form

The contact section posts JSON to `/api/contact`:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "Let's build something."
}
```

The route requires `name`, `email`, and `message`. SMTP delivery is attempted
only when `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, and `CONTACT_TO` are set.
When SMTP is incomplete, the route returns `503` and the UI tells visitors to
email directly.

## Seeding content

Seed data lives in `src/seed/data.ts`.

There are two seed paths:

- `npm run seed` runs `src/seed/run.ts` from the command line.
- `POST /next/seed` runs the same seed content through an authenticated Payload
  request.

Both seed paths update the `site` global, delete existing `projects`,
`technologies`, and `experience` documents, then recreate those documents from
seed data. Treat seeding as a destructive content replacement workflow and use
it only with explicit approval for the target database.

## Production schema constraint

Payload's Postgres adapter is configured with:

```ts
push: process.env.NODE_ENV !== 'production'
```

That means non-production runs may let Payload push schema changes automatically,
but production will not. Before deploying collection or global schema changes,
plan how the production Postgres schema will be updated.
