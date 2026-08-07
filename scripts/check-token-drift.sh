#!/usr/bin/env bash
# Description: Scans component and route source for styling that bypasses the
# Description: design token system: literal colors, raw palette classes, and off-scale values.
#
# Usage: scripts/check-token-drift.sh
# Exits 0 and prints NO DRIFT DETECTED when clean.
# Exits 1 and prints DRIFT DETECTED (n violations) with path:line detail otherwise.

set -uo pipefail

cd "$(dirname "$0")/.."

# Files that may legitimately contain literal values. Keep this list short and
# justified: OG image generation cannot read CSS variables; the tailwind
# breakpoint indicator is dev-only tooling; the callout warning variant is the
# documented exception until a warning token exists.
ALLOWLIST=(
  "app/api/og/route.tsx"
  "components/tailwind-indicator.tsx"
  "components/callout.tsx"
)

SCAN_DIRS=(app components)

is_allowed() {
  local file="$1"
  for allowed in "${ALLOWLIST[@]}"; do
    if [ "$file" = "$allowed" ]; then
      return 0
    fi
  done
  return 1
}

VIOLATIONS=0

scan() {
  local pattern="$1"
  local hint="$2"
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    local file="${line%%:*}"
    if is_allowed "$file"; then
      continue
    fi
    local rest="${line#*:}"
    local lineno="${rest%%:*}"
    local content="${rest#*:}"
    local match
    match=$(printf '%s' "$content" | grep -oE "$pattern" | head -1)
    printf '%s:%s: %s  -> %s\n' "$file" "$lineno" "$match" "$hint"
    VIOLATIONS=$((VIOLATIONS + 1))
  done < <(grep -rnE --include="*.tsx" --include="*.ts" "$pattern" "${SCAN_DIRS[@]}" 2>/dev/null || true)
}

# Literal hex colors (#fff, #1a1a1a). The trailing guard keeps route anchors
# like href="#features" from matching.
scan '#[0-9a-fA-F]{3,8}([^0-9a-zA-Z_-]|$)' \
  "use a semantic token utility (see components/CLAUDE.md)"

# Color functions with raw values. hsl(var(--token)) is the legal form and
# does not match.
scan 'rgba?\( *[0-9]|hsla?\( *[0-9]' \
  "use hsl(var(--token))"

# Arbitrary color classes (bg-[#0f172a], text-[rgb(...)]).
scan '(bg|text|border|ring|fill|stroke|from|via|to)-\[(#|rgb|hsl)[^]]*\]' \
  "use the semantic token utility"

# Raw Tailwind palette classes (text-red-600, bg-slate-50).
scan '(bg|text|border|ring-offset|ring|fill|stroke|divide|from|via|to)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-[0-9]{2,3}' \
  "map to a semantic token (errors: destructive; subdued: muted)"

# Arbitrary numeric radius values (rounded-[6px]). Non-numeric arbitrary
# values like rounded-[inherit] are not literals and pass.
scan 'rounded(-(t|b|l|r|tl|tr|bl|br))?-\[[0-9][^]]*\]' \
  "use rounded-sm, rounded-md, or rounded-lg from the radius token"

# Pixel-valued arbitrary spacing (p-[14px], mt-[7px]).
scan '(^|[^a-zA-Z-])(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-\[[0-9.]+px\]' \
  "use the Tailwind spacing scale"

# Inline style attributes carrying color or pixel values.
scan 'style=\{\{[^}]*(#[0-9a-fA-F]{3,8}|[0-9]+px|rgba?\(|hsla?\()' \
  "move to token-based classes"

echo ""
if [ "$VIOLATIONS" -gt 0 ]; then
  echo "DRIFT DETECTED ($VIOLATIONS violations)"
  exit 1
fi

echo "NO DRIFT DETECTED"
exit 0
