# Issues

## 2026-03-12 T4
- Mobile primary-vs-secondary grouping is still hardcoded in `components/shell/MobileNav.tsx`; later redesign must preserve current route reachability or intentionally replace this grouping logic.

## 2026-03-12 T1
- Compact layouts will need a smaller prefix treatment in roster and PvP surfaces to avoid nickname wrapping pressure.
- `dashboard` currently shows prefix as plain text, so later redesign must decide whether to keep text treatment or unify on badge styling there too.

## 2026-03-12 T3
- No standalone dashboard empty-state variants for individual regions were extracted yet; later redesign must preserve the current top-level loading/error gate and inline card-empty states.

## 2026-03-12 T6
- Resolved: PvP now carries `prefix` through schema/service/UI, so shared prefix rendering is no longer blocked there.

## 2026-03-12 T2/T7/T8/T9/T10
- Browser QA on webpack dev server is stable enough for a desktop dashboard/header pass, but detached dev processes are flaky in this environment; mobile visual verification is less reliable and should be backed by Playwright specs later.
- `tsc` depends on `.next/dev/types/**`, so verification must regenerate dev types before running plain `npm run type-check` if no dev server is active.
- A webpack dev server works around the Turbopack cache corruption seen during manual QA in this environment.
