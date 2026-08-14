# Investigation: unread indicators missing in dark mode

## Symptom

Reported after a theme-related bug: in dark mode the notification center
shows no unread dots, and the bell has no badge. Light mode looks correct.
Comparing against `design/reference/lab1-notification-center-dark.png`, the
dots should be near-white in dark mode; on the current build they are not
visible at all.

## Deterministic check

`scripts/check-token-drift.sh` reports DRIFT DETECTED (11 findings across 6
lines; hex literals are flagged by two rules each):

- `components/notification-center.tsx:57` - `bg-[#0f172a]`
- `components/notification-center.tsx:65` - `py-[14px]`
- `components/notification-item.tsx:22` - `bg-[#0f172a]`
- `components/notification-item.tsx:33` - `text-[#64748b]`
- `components/ui/card.tsx:53` - `text-[#64748b]`
- `components/post-item.tsx:23` - `text-[#64748b]`

## Archaeology

`git log --oneline -- components/` puts two recent style commits on top.
`git show` identifies the regression commit: `d762c68` ("style: tighten
spacing and contrast on card surfaces"). It shows
token references replaced with literals: `bg-primary` became `bg-[#0f172a]`,
`text-muted-foreground` became `text-[#64748b]`, `py-3` became `py-[14px]`.
The preceding commit ("set explicit button types") is clean.

## Hypothesis, confirmed

`#0f172a` and `#64748b` are the hex equivalents of the LIGHT theme values of
`--primary` and `--muted-foreground`. Hardcoding them freezes the light
theme: in dark mode the tokens flip (primary becomes near-white) but the
literals do not, so dark-colored dots vanish against the dark popover and
the muted text renders at the wrong contrast.

## Fix plan

Restore the token utilities (`bg-primary`, `text-muted-foreground`, `py-3`),
verify both themes against the reference captures, run the drift checker
clean, then add a guard so this class of change cannot land silently again.
