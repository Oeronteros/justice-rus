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
