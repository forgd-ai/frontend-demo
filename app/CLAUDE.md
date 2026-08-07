# app/CLAUDE.md

Route structure and conventions for the Next.js 13 App Router tree.

## Route groups

- `(marketing)` public pages: landing (`page.tsx`), `/pricing`, `/blog`, and
  MDX pages via the `[...slug]` catch-all (`/privacy`, `/terms`).
- `(auth)` `/login` and `/register`. Redirects to `/dashboard` when already
  signed in.
- `(dashboard)` `/dashboard` (posts list), `/dashboard/billing`,
  `/dashboard/settings`. Requires auth.
- `(editor)` `/editor/{postId}`, the block editor for a post. Requires auth.
- `(docs)` `/docs/...` and `/guides/...`, rendered from `content/` by
  Contentlayer.
- `api/` route handlers: `api/posts` (create), `api/posts/{postId}` (update,
  delete), `api/users/plan` (local plan toggle), `api/og` (social image
  generation), `api/auth/[...nextauth]`.

## Conventions

- Pages are server components by default. Interactive pieces live in
  `components/` as `"use client"` components and are composed in.
- Auth: `middleware.ts` guards `/dashboard/*` and `/editor/*` and redirects
  to `/login`. In server components, get the user with `getCurrentUser()`
  from `lib/session.ts`; redirect to login when absent (see
  `(dashboard)/dashboard/page.tsx` for the pattern).
- API routes authenticate with `getServerSession(authOptions)` and return
  403 when there is no session; input is validated with `zod` schemas from
  `lib/validations/`.
- Data access goes through `db` from `lib/db.ts` (Prisma). No raw SQL, no
  fetch calls to external services.
- Navigation is config-driven: sidebar and nav items live in
  `config/dashboard.ts`, `config/marketing.ts`, and `config/docs.ts`. A new
  dashboard page needs both its route directory and a `config/dashboard.ts`
  entry.
- Metadata: pages export `metadata` (see any dashboard page). The root
  `app/layout.tsx` derives site-wide metadata from `config/site.ts`.
- Loading states use `loading.tsx` files with skeleton components (see
  `(dashboard)/dashboard/loading.tsx`).

## Adding a feature

The usual shape of a new dashboard feature:

1. Route directory under `app/(dashboard)/dashboard/<feature>/` with
   `page.tsx` (server component) and `loading.tsx`.
2. Interactive components in `components/`, composed into the page. Follow
   `components/CLAUDE.md` for all styling.
3. API route under `app/api/` if the feature mutates data, following the
   session + zod pattern above.
4. Nav entry in `config/dashboard.ts`.
