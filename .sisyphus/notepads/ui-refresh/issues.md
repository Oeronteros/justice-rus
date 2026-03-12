# Issues

## 2026-03-12 T4
- Mobile primary-vs-secondary grouping is still hardcoded in `components/shell/MobileNav.tsx`; later redesign must preserve current route reachability or intentionally replace this grouping logic.

## 2026-03-12 T1
- Compact layouts will need a smaller prefix treatment in roster and PvP surfaces to avoid nickname wrapping pressure.
- `dashboard` currently shows prefix as plain text, so later redesign must decide whether to keep text treatment or unify on badge styling there too.

## 2026-03-12 T3
- No standalone dashboard empty-state variants for individual regions were extracted yet; later redesign must preserve the current top-level loading/error gate and inline card-empty states.
