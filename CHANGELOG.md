# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- Upgraded Payload CMS and all `@payloadcms/*` packages from 3.31.0 to 3.91.0, fixing the open Payload advisories (including the critical GHSA-f7hx-52q9-hcrf, GHSA-66wr-7vmr-p5jq, GHSA-vc4h-q48j-5hcx, GHSA-v49j-62m6-pgrr and GHSA-hp5w-3hxx-vmwf).
- Upgraded Next.js from 15.5 to 16.4 (Payload 3.91 does not support Next 15.5; Next 16.4 also clears the open Next 15.5 advisories), React to 19.2 and `sharp` to 0.35.

### Added

- Animated space ship (`src/components/SpaceShip.tsx`): an SVG/CSS ship that flies across the background every 40 seconds and shoots a star with a laser on the way. It sits behind content, ignores pointer events and is hidden when `prefers-reduced-motion` is set.
- Easter egg: clicking the navbar logo five times in quick succession sends an extra ship across the page with a barrel roll (`src/lib/shipEasterEgg.ts`).
- `docs/cms.md` (Payload runtime map, content model, `PAYLOAD_SECRET` behaviour, migrations, preview, troubleshooting) and `docs/SECURITY.md` (contact form, preview redirects, CMS URL validation, operational pitfalls).

### Changed

- New migration `20261028_042424_payload_3_91_upgrade` adds the `users_sessions` and `payload_kv` tables and `users.reset_password_requested_at` that Payload 3.91 needs. It runs automatically through `payload migrate` in `npm run build`.
- `next.config.ts` is now `next.config.mjs` (Next 16 can't load a TypeScript config in this ESM package).
- `npm run lint` uses the ESLint CLI with `eslint.config.mjs`, because Next 16 removed `next lint`.
- Hosting moved from Vercel to a Node.js server on the Pterodactyl panel behind Cloudflare, and the CMS database from Neon to self-hosted PostgreSQL. README, `.env.example`, `docs/` and the privacy notice on `/legal` describe the new setup.
- The contact form rate limiter reads the visitor address from `cf-connecting-ip` first.
- `package-lock.json` regenerated so `npm ci` works again.
- Consolidated operator docs (supersedes draft docs PRs #10, #13, #14, #16, #18, #20, #21, #23, #25): README setup order (migrate before dev), contact check order (503 → 400 → 429 → send), new Admin access section; `docs/SEED.md` documents pruning for both seed paths and that seed never creates users; `.env.example` notes `ADMIN_EMAIL`/`ADMIN_PASSWORD` are for the reset script only.

### Removed

- Vercel Web Analytics and Speed Insights (added in [#24](https://github.com/zVapor-Dev/portfolio/pull/24)), `vercel.json` and the `VERCEL_*` URL and secret fallbacks.

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
