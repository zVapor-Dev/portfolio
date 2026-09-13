# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[3.0.0]: https://github.com/zVapor-Dev/portfolio/pull/8
