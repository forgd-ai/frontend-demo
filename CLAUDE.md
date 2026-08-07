# CLAUDE.md

Next.js 13 App Router application with Tailwind CSS, Radix UI primitives, and
a CSS-custom-property design token system. Runs entirely locally: SQLite,
credential-free sign-in, no external services.

## Running

```sh
npm install    # also generates the Prisma client and creates prisma/dev.db
npm run dev    # http://localhost:3000
```

No `.env` file is required. Sign in with any email address. Node 20+.

## Structure

- `app/` routes, organized in route groups. See `app/CLAUDE.md`.
- `components/` React components. `components/ui/` is the primitive library.
  Design system rules live in `components/CLAUDE.md` and are binding for all
  UI work.
- `styles/globals.css` the design token definitions (CSS custom properties for
  light and dark themes). This file is the single source of truth for tokens.
- `tailwind.config.js` maps the tokens into Tailwind utilities.
- `config/` typed site, navigation, and plan configuration.
- `lib/` server utilities: `db.ts` (Prisma), `session.ts` (current user),
  `auth.ts` (NextAuth options), `utils.ts` (`cn` class merging).
- `content/` MDX for docs and blog, compiled by Contentlayer.
- `prisma/` schema and the local SQLite database (`dev.db`, gitignored).
- `design/` committed design fixtures: the token export and reference designs
  that feature work is built against.
- `scripts/` verification scripts. `scripts/check-token-drift.sh` scans for
  styling that bypasses the token system; run it before committing UI changes.
- `notes/` working directory for specs, findings, and rationale during labs.

## Rules that apply repo-wide

- Components reference design tokens, never literal color, spacing, or radius
  values. The full policy with examples is in `components/CLAUDE.md`.
- Both themes must work. Verify UI changes in light and dark mode; the theme
  toggle is in the site footer.
- `scripts/check-token-drift.sh` must pass before a change is done.

## Workshop notes

- The preflight review plugin is bundled: run `bash tools/install-preflight.sh`
  once (see WORKSHOP_SETUP.md), restart Claude Code, and `/preflight` reviews
  a change before committing.
- Checkpoint branches (`checkpoint/...`) exist so lab participants can catch
  up; the lab documents explain when to use them.
- `docs/` contains facilitator material; participants should work from the lab
  documents instead.
