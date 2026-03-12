# Decisions

## 2026-03-12 T4
- Added `lib/nav.ts` as the single source of truth for shared portal navigation metadata.
- Kept route mapping, ordering, icons, language labels, refresh/logout actions, and prefetch behavior unchanged.

## 2026-03-12 T1
- Future prefix rendering will be centralized in one presentational component, likely `PrefixBadge`.
- The shared contract should accept `prefix: string | null | undefined` and support at least `default` and `compact` variants.
- Empty handling stays inside the shared renderer so consumers stop hand-rolling null checks and ad-hoc badge/text output.

## 2026-03-12 T3
- Kept all data hooks and snapshot derivation inside `DashboardSectionContent` and extracted only presentational regions first.
- Split the rendered dashboard into `DashboardHeroRegion` and `DashboardPrimaryRegion` so later redesign work can target top-vs-lower sections independently.
