# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Animated space ship (`src/components/SpaceShip.tsx`): an SVG/CSS ship that flies across the background every 40 seconds and shoots a star with a laser on the way. It sits behind content, ignores pointer events and is hidden when `prefers-reduced-motion` is set.
- Easter egg: clicking the navbar logo five times in quick succession sends an extra ship across the page with a barrel roll (`src/lib/shipEasterEgg.ts`).
- Vercel Web Analytics (`@vercel/analytics`) and Speed Insights (`@vercel/speed-insights`) mounted in the public layout `src/app/(frontend)/layout.tsx` ([#24](https://github.com/zVapor-Dev/portfolio/pull/24)).
- `docs/cms.md` (Payload runtime map, content model, `PAYLOAD_SECRET` behaviour, migrations, preview, troubleshooting) and `docs/SECURITY.md` (contact form, preview redirects, CMS URL validation, operational pitfalls).

### Changed

- The site names its owner as zVapor / zVapor_ instead of a personal name: meta description, legal page, footers, and the seed/fallback `site.name` and About text ([#29](https://github.com/zVapor-Dev/portfolio/pull/29)). The live hero and About text come from the Payload `site` global and need the same edit in the admin.
- Consolidated operator docs (supersedes draft docs PRs #10, #13, #14, #16, #18, #20, #21, #23, #25): README setup order (migrate before dev), contact check order (503 → 400 → 429 → send), new Admin access and Telemetry sections; `docs/SEED.md` documents pruning for both seed paths and that seed never creates users; `.env.example` notes `ADMIN_EMAIL`/`ADMIN_PASSWORD` are for the reset script only.

## [3.0.1] - 2026-09-13

### Security

- Contact form: Zod validation, HTML-escaped email body, sanitized SMTP headers (`subject`, `replyTo`).
- Contact API: sliding-window rate limit (default **5/hour**) per IP and per email; **429** with `Retry-After` / `X-RateLimit-*`. Uses **Upstash Redis** when `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` are set; otherwise in-memory fallback per warm instance.
- Preview route: open-redirect hardening via path allowlist (`getSafeRedirectPath`).
- CMS: anonymous `projects` reads limited to `published: true`; URL fields validate `http(s)` or site-relative `/` paths.

### Added

- Optional env vars: `CONTACT_RATE_LIMIT_MAX`, `CONTACT_RATE_LIMIT_WINDOW_MS`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (documented in `.env.example` and README).

### Changed

- Louder destructive-wipe warning in `docs/SEED.md`.

## [3.0.0] - 2026-09-13

### Added

- Full redesign migrated from Vite/React to **Next.js 15** (App Router) with **Payload CMS 3** at `/admin`.
- **Neon Postgres** backing store via `@payloadcms/db-postgres`.
- CMS collections: `projects`, `technologies`, `experience`; global: `site` (hero, about, contact, socials).
- CMS **live preview** for editable collections and the `site` global.
- Idempotent content **seed** via `npm run seed` or authenticated `POST /next/seed` (see `docs/SEED.md`). Seed syncs repo defaults and **removes collection rows not in the seed file**.
- **SMTP contact form** (`POST /api/contact`) using Nodemailer, replacing EmailJS.
- Dark **vapor** visual theme: deep black base, cyan/violet accents, Space Grotesk + Inter + JetBrains Mono.
- Lightweight **VaporScene** Three.js particle accent and star-field background in the hero.
- **Login** link in the navbar linking to `/admin`.
- Environment template in `.env.example` for database, Payload, preview, and SMTP settings.

### Changed

- Section flow: Hero → About → Experience → Stack → Selected Work → Contact.
- Portfolio content is CMS-driven with static fallbacks when the database is unavailable.
- Production builds run `payload migrate` before `next build`.
- Package version bumped to `3.0.0` to reflect the major stack migration.

### Removed

- Legacy Vite + static-constants portfolio implementation.

[3.0.1]: https://github.com/zVapor-Dev/portfolio/pull/19
[3.0.0]: https://github.com/zVapor-Dev/portfolio/pull/8
