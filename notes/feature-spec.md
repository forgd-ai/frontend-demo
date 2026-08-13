# Feature spec: notification center

Derived from `design/reference/lab1-notification-center.png` (light, the
working default) and `lab1-notification-center-dark.png`, against
`design/tokens.json`.

## Goal

A notification center in the dashboard header: a bell button to the left of
the user avatar opens a popover listing notifications.

## Data

No backend. A typed fixture module in `config/` with id, title, body, a
fixed ISO `createdAt`, and a `read` flag; the type lives in
`types/index.d.ts`. Read state is client state only.

## Composition plan

Compose existing primitives: `Popover` + `PopoverTrigger` + `PopoverContent`,
`buttonVariants` ghost for the trigger, `ScrollArea` for the list,
`Separator` under the header row. One new client component
`components/notification-center.tsx`, mounted in the dashboard layout header
inside a flex group with `UserAccountNav`. Add a `bell` icon to
`components/icons.tsx` following its lucide wrapper convention.

## Behavior

- Bell shows a `bg-primary` dot at its top-right while anything is unread.
- Popover header: "Notifications" and a "Mark all as read" action that only
  renders while something is unread.
- Each item: unread dot, title, two-line-clamped body, formatted date
  (use `formatDate` from `lib/utils`; fixed timestamps, never computed at
  module load, to avoid a server/client hydration mismatch).
- Clicking an item marks it read; the dot becomes transparent but keeps its
  box so nothing shifts.
- Empty state: centered bell icon and "You are all caught up."

## Tokens

Colors only through semantic utilities (`bg-primary`, `text-muted-foreground`,
`hover:bg-muted/50`); spacing on the scale (`px-4 py-3`, `gap-3`); radius
`rounded-full` for dots; type scale `text-sm`/`text-xs`.
`scripts/check-token-drift.sh` must stay clean.

## Accessibility

Real buttons throughout, `sr-only` trigger label including the unread count,
`aria-hidden` on decorative dots and icons, `focus-visible` treatments on
every interactive element.

## Acceptance

1. Drift checker clean; `npx tsc --noEmit` clean; `npm run build` passes.
2. Popover matches the reference in light mode and survives the dark-mode
   toggle with no component-level theme code.
3. Keyboard-only operation works end to end.
