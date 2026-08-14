# frontend-demo

A staged Next.js application used for hands-on Claude Code workshop labs on
design systems and design tokens. Some branches intentionally carry defects
the labs investigate; the app runs locally with no accounts and no .env
(see WORKSHOP_SETUP.md).

## Overview

This is a fork of [shadcn/taxonomy](https://github.com/shadcn/taxonomy), a
Next.js 13 App Router application with Tailwind CSS and Radix UI, restaged to
run locally with zero configuration: SQLite instead of a hosted database,
credential-free sign-in instead of OAuth and transactional email, and no
billing provider. The upstream project is archived, which keeps this codebase
stable underneath the labs.

## Setup

Requires Node 20 or later.

```sh
npm install
npm run dev
```

No `.env` file is needed. `npm install` creates the local SQLite database.
Open http://localhost:3000 and sign in with any email address.

## Usage

- `/` marketing pages
- `/login` sign in with any email, no password
- `/dashboard` posts, settings, billing
- `/editor/{id}` block editor for a post
- `/docs` and `/blog` MDX content rendered with Contentlayer

## Layout

- `app/` routes in groups: `(marketing)`, `(auth)`, `(dashboard)`, `(editor)`, `(docs)`
- `components/` feature components; `components/ui/` is the primitive library
- `styles/globals.css` design tokens as CSS custom properties, light and dark
- `design/` committed design fixtures: token export and reference designs
- `scripts/` verification scripts, including the token drift checker
- `content/` MDX source for docs and blog
- `prisma/` schema and the local SQLite database

## Workshop notes

Checkpoint branches exist for lab use; the lab documents distributed with your
session explain when to pull them. Complete the setup checklist before the
session.

## License

MIT, inherited from the upstream project. See [LICENSE.md](LICENSE.md).
