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

## 2026-03-12 T6
- Introduced `PrefixBadge` with `default` and `compact` variants as the single shared prefix presentation primitive.
- Replaced profile inline badge markup and added compact prefix rendering to both mobile and desktop participant views in `RegistrationTable`.

## 2026-03-12 T2/T7/T8/T9/T10
- Strengthened the shared shell aesthetic through additive CSS overrides at the end of `app/globals.css` instead of rewriting existing foundations.
- Upgraded dashboard hierarchy by adding a visible signal strip and badge-based prefix treatment in the personal station.
- Upgraded header/mobile nav presentation via wrapper classes and shell framing while keeping existing nav structure, labels, and actions intact.
