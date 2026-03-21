# Learnings


## 2026-03-19 Vinext route-parity inventory
- Cutover source of truth is :  owns , , ;  and  own those plus , , , , ;  owns no routes.
-  injects  into , so matching cutover routes rewrite to  before normal app routing;  stays on Next.
- Root app route files exist for , , , , , , , , , , ,  under ; no  exists.
- Vinext route files exist for , , , , , , ,  under ; no Vinext page exists for , , , , or .
- Current parity gap against the requested route set: only , , , , , , ,  have both Next and Vinext route files; , , , ,  do not have Vinext equivalents.


## 2026-03-19 Vinext route-parity inventory
- Cutover source of truth is `lib/platform/vinext-cutover.ts`: `pilot` owns `/news`, `/help`, `/guides`; `wave2` and `all` own those plus `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`; `off` owns no routes.
- `next.config.ts` injects `buildVinextCutoverRewrites()` into `beforeFiles`, so matching cutover routes rewrite to `VINEXT_CUTOVER_ORIGIN` before normal app routing; `/api/:path*` stays on Next.
- Root app route files exist for `/`, `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`, `/analytics`, `/workflow`, `/integrations` under `app/(portal)/**`; no `app/**/about/page.tsx` exists.
- Vinext route files exist for `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar` under `apps/portal-vinext/app/(portal)/**`; no Vinext page exists for `/`, `/about`, `/analytics`, `/workflow`, or `/integrations`.
- Current parity gap against the requested route set: only `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar` have both Next and Vinext route files; `/`, `/about`, `/analytics`, `/workflow`, `/integrations` do not have Vinext equivalents.

- Note: lines 4-9 in this file came from a failed shell-escaped append attempt; use the corrected block at lines 12-17 as the authoritative route-parity inventory.

## 2026-03-19 Task 1 implementation notes
- Added a code-backed parity manifest in `lib/platform/vinext-cutover.ts` that enumerates `/`, `/about`, `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`, `/analytics`, `/workflow`, `/integrations` with section key, route file paths, status, blocker, and rollback scope.
- `VINEXT_CUTOVER_SCOPE=all` now means final ownership target map in docs and manifest, but rewrites remain parity-safe: only `ready` routes are rewritten; blocked routes (`/`, `/about`, `/analytics`, `/workflow`, `/integrations`) stay on Next.
- `scripts/verify-cutover-config.mjs` now prints `BLOCKED_ROUTES` and `PARITY_MANIFEST_ROUTES` in addition to existing scope/origin/rewrite evidence.
- Added Playwright lane `@route-parity` in `e2e/vinext-route-parity.spec.ts`; it validates manifest coverage and live route status on Vinext server, and writes `.sisyphus/evidence/task-1-route-parity.json`.

## 2026-03-19 Task 1 evidence semantics correction
- Updated `e2e/vinext-route-parity.spec.ts` to remove `observedOwner` from evidence rows because HTTP status alone cannot prove runtime ownership in combined cutover mode; evidence now records `expectedOwner`, `status`, and `expectedStatus` without fabricating owner inference.

## 2026-03-20 Task 2 StyleX probe consolidation
- Consolidated the Vinext theme-probe contract into shared StyleX primitives (`lib/stylex/primitives.stylex.ts`) and re-exported it from `components/shared/Ui.stylex.ts`, so the hidden QA probe now derives its primitive list and probe styles from the same shared source as the actual token-backed primitives.
- `apps/portal-vinext/app/layout.tsx` boot-time theme sync now updates `[data-testid="theme-primitives-probe"]` alongside the legacy `theme-wuxia` boundary and toggle harnesses; this closes a race where scripted theme switches updated the boundary/toggle before React effects reapplied probe readiness attributes.
- `components/theme/AppThemeBoundary.tsx` now retries probe attribute sync for a short window after mount/theme changes, which keeps the shared boundary compatible with Suspense-delayed Vinext probe markup without widening into shell/provider migration work.

## 2026-03-20 Task 2 final diff correction
- The corrected task-2 patch keeps the cutover asset rewrite fix, but also restores real shared theming work to the tracked diff by making `lib/stylex/primitives.stylex.ts` the source of probe entries (`themePrimitiveProbeEntries`) instead of leaving the probe node list hardcoded only in `apps/portal-vinext/app/layout.tsx`.
- `components/shared/Ui.stylex.ts` now re-exports the shared probe entries, and `components/theme/AppThemeBoundary.tsx` exposes a tiny optional `qaSlot` seam so Vinext can mount the hidden theme-primitives probe inside the real theme boundary without broad shell/provider refactors.
- `apps/portal-vinext/app/layout.tsx` now maps the shared probe entries into hidden probe nodes through that boundary seam, so the page/card/panel/button/input/overlay contract is shared code in the task diff rather than test-only or layout-inline behavior.

## 2026-03-20 Task 2 hydrated harness contract
- `components/theme/AppThemeBoundary.tsx` now treats the hidden `[data-testid="theme-toggle"]` harness as a post-hydration contract: the effect that installs `setThemeMode()` is also the only place that marks `data-theme-ready="true"`.
- The hidden harness now exposes `data-theme-current` as the concrete `resolvedTheme` and `data-theme-mode` as the raw selection mode, so QA can distinguish resolved light/dark state from persisted `system|dark|light` mode without reintroducing any pre-hydration DOM writes.
- `e2e/vinext-theme-primitives.spec.ts` now waits for both `data-theme-ready="true"` and a live harness setter before switching modes, which removes the startup race while keeping the hydration-safe path intact.

## 2026-03-20 Task 3 shell/provider/auth boundary notes
- `components/shell/PortalShell.tsx` now renders both unauthenticated and authenticated states under one stable root (`[data-testid="portal-shell"]`) with runtime/auth diagnostics on attributes: `data-runtime`, `data-auth-state`, and `data-auth-user-id`.
- Added a small runtime/auth probe node (`[data-testid="runtime-badge"]`) inside `PortalShell` so parity QA can assert runtime and auth boundary state transitions without depending on nav/header redesign work.
- `apps/portal-vinext/app/(portal)/layout.tsx` now passes `runtime="vinext"` into shared `PortalShell`, preserving shared contracts (`resolveSessionFromToken` -> `initialUser`) while making Vinext-vs-Next boundary assertions explicit.
- `lib/auth/context.tsx` now exports `useAuthState()` (`isAuthenticated`, `authState`, `user`) as a minimal shared auth-state diagnostics hook for downstream parity checks.

## 2026-03-21 Task 4 header regression test contract
- `tests/components/Header.test.tsx` must target the desktop grouped-nav contract now implemented in `components/shell/Header.tsx`: `Sections` is a `role="group"` rail label, not a single launcher button, and open desktop submenu panels expose group-specific labels like `Command navigation: Guild`.
- Meaningful header regression coverage still comes from opening real group triggers (`Core`, `Guild`, `Command`, `Tools`) and asserting actual grouped links/prefetch behavior, not from falling back to generic panel selectors.
