# Learnings

## 2026-03-12 T4
- `components/shell/Header.tsx` and `components/shell/MobileNav.tsx` had byte-for-byte duplicated `NavItem` shape and identical 14-item `navItems` arrays.
- `lib/i18n.ts` already owns section labels, so the safest shared extraction is metadata only: section, href, icon.
- Mobile navigation depends on current array order because it derives primary items from the shared list.

## 2026-03-12 T1
- Prefix is currently rendered directly only in `components/sections/profile/index.tsx` and textually in `components/sections/dashboard/index.tsx`.
- `components/sections/registration/RegistrationTable.tsx` and `components/sections/pvp/index.tsx` are the main in-scope participant surfaces that still show nickname without prefix.
- `components/ClassIcon.tsx` provides the closest reusable identity badge pattern for a future shared prefix component.

## 2026-03-12 T3
- `components/sections/dashboard/index.tsx` now has explicit composition boundaries: `DashboardHeroRegion` for the top command/station area and `DashboardPrimaryRegion` for the lower card stack.
- Existing hook ownership, derived snapshots, loading gate, and error gate remain in `DashboardSectionContent`, which keeps behavior stable while enabling later region redesigns.

## 2026-03-12 T6
- A shared `components/PrefixBadge.tsx` now owns the visual prefix treatment instead of inline badge markup.
- `profile` and `registration` can consume prefix data immediately because they already have `user.prefix` / `registration.prefix` in their local schemas.
- PvP needed a real contract extension: queue entries, leaderboard rows, and match participants now carry `prefix`, so the same badge can render there too.

## 2026-03-12 T2/T7/T8/T9/T10
- Shared CSS can drive major visual improvement without route logic changes because header, mobile nav, dashboard hero, and dashboard cards already expose stable class hooks.
- The existing dashboard file had dormant signal-strip styles, so wiring those into the hero region produced a stronger above-the-fold hierarchy with minimal behavioral risk.
- Header and mobile nav kept their accessibility labels and route behavior while gaining stronger shell wrappers for visual redesign.
- Desktop browser QA confirmed the new dashboard hierarchy, header shell, and shared prefix badge on the personal station render together after mocked auth login.
