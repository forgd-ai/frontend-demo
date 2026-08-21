# components/CLAUDE.md

Design system rules for all UI work in this repo. These are binding: a change
that violates them is not done, even if it renders correctly on your screen.

## The token system

All visual values come from the design tokens defined in
`styles/globals.css` and mapped to utilities in `tailwind.config.js`. Tokens
are CSS custom properties with a light value on `:root` and a dark value on
`.dark`. Components that use tokens get dark mode for free; components that
hardcode values break silently in the other theme.

### Color

Nineteen semantic color tokens, referenced only through their Tailwind
utilities:

| Token pair | Utilities | Use for |
|---|---|---|
| `background` / `foreground` | `bg-background`, `text-foreground` | page surfaces and default text |
| `card` / `card-foreground` | `bg-card`, `text-card-foreground` | card surfaces |
| `popover` / `popover-foreground` | `bg-popover`, `text-popover-foreground` | floating surfaces |
| `primary` / `primary-foreground` | `bg-primary`, `text-primary-foreground` | primary actions |
| `secondary` / `secondary-foreground` | `bg-secondary`, `text-secondary-foreground` | secondary actions |
| `muted` / `muted-foreground` | `bg-muted`, `text-muted-foreground` | subdued surfaces and text |
| `accent` / `accent-foreground` | `hover:bg-accent`, `hover:text-accent-foreground` | hover and highlight states |
| `destructive` / `destructive-foreground` | `bg-destructive`, `text-destructive` | errors and destructive actions |
| `border`, `input`, `ring` | `border-border`, `border-input`, `ring-ring` | borders, input borders, focus rings |

Opacity modifiers on tokens are fine: `bg-muted/50`, `bg-destructive/10`.

### Radius

Derived from the `--radius` token: use `rounded-sm`, `rounded-md`, or
`rounded-lg` only. Never `rounded-[6px]`.

### Spacing and typography

Use the Tailwind scale (`p-4`, `gap-2`, `text-sm`, `font-medium`) and the
font tokens (`font-sans`, `font-heading`). Do not introduce arbitrary pixel
values for spacing or type.

## Prohibited

- Literal colors anywhere in a component: hex (`#1a1a1a`), `rgb()`, `hsl()`
  with raw numbers, or arbitrary color classes (`bg-[#0f172a]`).
- Raw Tailwind palette classes (`text-red-600`, `bg-slate-50`). Use the
  semantic token instead; errors are `text-destructive`, not red.
- Inline `style` attributes carrying color, spacing, or radius values.
- Values that are "close enough" to a token. If a design calls for a value no
  token provides, that is a design system conversation, not a hardcode.

Known exceptions, and the only ones, matching the allowlist in
`scripts/check-token-drift.sh` (which exempts whole files, so keep these
files small): `app/api/og/route.tsx` (image generation cannot read CSS
variables), `components/tailwind-indicator.tsx` (dev-only breakpoint
overlay), `components/callout.tsx` (its `warning` variant; the token set
has no warning color yet), and `components/mdx-components.tsx` (the code
block surface pairs with the github-dark syntax theme, whose colors do not
flip with the app theme). Do not add new exceptions silently.

Run `scripts/check-token-drift.sh` before calling any UI change done.

## Component conventions

- `components/ui/` holds the primitive library: small, unopinionated pieces
  (button, card, dialog, input...) built on Radix UI where interactive
  behavior is involved.
- Primitives define their variants with `cva` and export both the component
  and its variant function (see `ui/button.tsx`: `buttonVariants` +
  `VariantProps`). Variant styling uses semantic tokens exclusively.
- Feature components live in `components/` and compose primitives. They pass
  classes through `cn()` from `lib/utils` so callers can extend styling.
- **Compose before creating.** Reach for an existing primitive (or a
  composition of primitives) first. Write a new component only when no
  composition expresses it, and if it is a new primitive, it goes in
  `components/ui/` following the `cva` convention.
- Client components declare `"use client"` and are kept as small as the
  interactivity allows; pages stay server components and compose them.

## Accessibility

Every interactive element must be:

- **Keyboard operable.** Real `<button>`/`<a>` elements or Radix primitives,
  never a `div` with an `onClick`.
- **Focus visible.** The shared ring pattern:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  focus-visible:ring-offset-2`.
- **Named.** Icon-only controls carry an accessible name via a
  `<span className="sr-only">` label (see `mode-toggle.tsx`) or `aria-label`.

## Verifying UI work

1. Check the change in light mode and dark mode. The toggle is in the site
   footer. If it only looks right in one theme, a token is being bypassed.
2. Run `scripts/check-token-drift.sh`. It must report `NO DRIFT DETECTED`.
3. Check keyboard navigation reaches and operates the change.

## Floating surfaces

Conventions set down ahead of the notification center build, so the
implementation conforms by default; they apply to any popover, dropdown,
or menu-like surface.

- Popover content uses `p-0`; internal sections manage their own padding
  (`px-4 py-3`) and are divided by `Separator`, with a header row first.
- Lists inside a floating surface scroll in a fixed-height `ScrollArea`
  (`h-80`); a popover never grows unbounded with its content.
- Use `align="end"` when the trigger sits near the viewport edge.
- Icon-button triggers are ghost buttons (`h-9 w-9 px-0`) with an `sr-only`
  label that includes state, e.g. "Open notifications, 3 unread".
- Status dots are `h-2 w-2 rounded-full bg-primary`; when inactive they keep
  their box (`bg-transparent`) so the layout does not shift.
