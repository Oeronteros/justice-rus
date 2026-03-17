# Vinext Shell Compatibility Guardrails

## Scope

This note constrains how the main portal shell can evolve without forcing an immediate vinext pilot rewrite. It is a guardrail map, not an implementation plan.

## Main-Portal Only

- `components/shell/Header.tsx` desktop immersive menu choreography, compact header behavior, and toolbar composition can evolve in the main portal first.
- `components/shell/MobileNav.tsx` dock/sheet interaction details can evolve in the main portal first as long as route reachability stays stable.
- `components/shell/Shell.stylex.ts` may keep main-portal-specific layout density, motion, and decorative shell framing while vinext is still path-cutover based.
- Dashboard-first chrome optimizations remain main-portal-only until vinext adopts the same shell contract.

## Portable Shared Foundations

- `lib/nav.ts` remains the single source of truth for route grouping, primary/secondary ordering, and section reachability.
- `lib/stylex/tokens.stylex.ts` contains portable visual tokens that vinext-adjacent work should reuse instead of redefining colors or surface tiers.
- `components/shared/Ui.stylex.ts` contains portable shared primitives for cards, buttons, chips, notices, inputs, and panels.
- `lib/i18n/copy.ts` and section label sources should remain canonical so cutover routes do not drift by locale.
- Shell-facing callbacks and boundaries in `components/shell/MainLayout.tsx` should stay explicit because they define what future shell parity must preserve: route resolution, nav prefetch, refresh, logout, language switching, and header visibility.

## Follow-Up For Future Vinext Adoption

- Recreate or consume the same nav grouping contract for cutover routes covered by `VINEXT_CUTOVER_SCOPE=pilot` (`/news`, `/help`, `/guides`).
- Extend parity to `wave2` routes (`/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`) only after main-portal shell seams stabilize.
- Mirror shell accessibility expectations already covered by main portal tests before claiming parity.
- Keep cutover verification aligned with `playwright.config.ts` dual-runtime projects and README cutover commands.

## Reuse Rules

- Reuse shared tokens and shared primitives first.
- Reuse route grouping and labels from canonical sources.
- Do not duplicate shell copy, nav metadata, or visual token constants inside vinext pilot code.
- Do not treat main-portal-only motion/layout experiments as required vinext parity until explicitly promoted.

## Current Risk Watchlist

- Path-based cutover means shell drift can hide behind route rewrites unless nav metadata stays centralized.
- Pilot and wave2 route sets differ, so shell parity claims must name which scope they cover.
- Validation already runs separate Playwright projects; future shell work should keep that split intact.
