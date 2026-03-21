# Issues

## 2026-03-19 Shell/provider research
- Provider order: `app/layout.tsx` composes `StyledComponentsRegistry -> ThemeProvider -> AppThemeBoundary -> QueryProvider -> I18nProvider -> Suspense(children)`; `AppTelemetry` sits after that provider stack.
- Auth/session handoff: `app/(portal)/layout.tsx` reads `auth_token`, calls `resolveSessionFromToken`, and passes `session.valid ? session.user : null` into `PortalShell.initialUser`.
- Auth boundary: `components/shell/PortalShell.tsx` gates on local `user` state; unauthenticated users render `BackgroundEffects` + `PinScreen`; authenticated users render `AuthProvider -> NotificationsProvider -> PortalVisualEffects -> ToastContainer -> MainLayout`.
- Shell/navigation contract: `components/shell/MainLayout.tsx` derives `currentSection` via `resolveSectionFromPath(usePathname())`, wraps content in `HeaderProvider`, mounts `Header`, `main#portal-main`, `MissionControl`, animated `motion.div` page shell, and `MobileNav`.
- Nav registry baseline: `types/index.ts` defines sections `about, news, registration, schedule, calendar, analytics, workflow, integrations, pvp, guides, help, absences, calculator, profile`; `lib/nav.ts` defines desktop/mobile primary+secondary arrays and grouped keys `core, guild, command, tools`.
- Reusable selector evidence: no `data-testid` matches repo-wide in `*.ts`/`*.tsx`; existing stable hooks are semantic selectors like `main#portal-main`, mobile nav aria labels (`Быстрая навигация`, `Дополнительная навигация`, `Еще`, `Текущий`) in `components/shell/MobileNav.tsx`, and header nav/button aria labels in `components/shell/Header.tsx`.

## 2026-03-19 Task 1 gotchas
- Plan QA text referenced `[data-testid="runtime-badge"]` and `[data-testid="section-key"]`, but those hooks are not present yet and this task is constrained from broad shell instrumentation; used route-status parity checks plus manifest evidence file output instead.
- `grep` tool scanning root hit a Windows `nul` filesystem error; repository searches were completed with `git grep` for exact token evidence (`VINEXT_CUTOVER_SCOPE`, `cutover:verify`, `buildVinextCutoverRewrites`, `runtime-badge|section-key`).

## 2026-03-19 Vinext task 2 surface findings
-  is a thin Vinext runtime shell: only , , and config files live locally; TS path alias  means Vinext renders shared root , , and  rather than a separate local shell stack.
- Vinext already consumes the shared root shell/theme path:  uses , , , and ;  uses shared , which then mounts shared , , , and shared section components.
- Theme primitives already exist repo-wide in shared StyleX files (, , , , ), so task 2 should treat Vinext as a consumer/integration surface, not invent a second Vinext-only token layer.
- Vinext gaps versus root app:  does not import , does not use , does not apply root font variables from , and does not use  fallback/content wrappers; this is the main Vinext-local shell/theme seam to inspect first for cross-theme parity.
- Theme toggle already mounts for authenticated portal routes through shared ; no separate Vinext-only mount is needed for signed-in pages. If a later task wants theme control on the unauthenticated PIN screen, that belongs in shared  /  work, which should wait for task 3.
- Likely task 2 first-touch files: , , , , , ; likely wait for task 3: , , , route pages under  unless a page exposes a missing primitive.


- Note: the Vinext task 2 block above lost inline path text during a failed shell-escaped append attempt; use the corrected block below as authoritative.

## 2026-03-19 Vinext task 2 surface findings (corrected)
- apps/portal-vinext is a thin Vinext runtime shell: only app/**, vite.config.ts, and config files live locally; apps/portal-vinext/tsconfig.json maps @/* to ../../*, so Vinext renders shared root components/**, lib/**, and types/** rather than a separate local shell stack.
- Vinext already consumes the shared root shell/theme path: apps/portal-vinext/app/layout.tsx uses ThemeProvider, AppThemeBoundary, QueryProvider, and I18nProvider; apps/portal-vinext/app/(portal)/layout.tsx uses shared PortalShell, which then mounts shared MainLayout, Header, MobileNav, and shared section components.
- Theme primitives already exist repo-wide in shared StyleX files (lib/stylex/tokens.stylex.ts, lib/stylex/theme.stylex.ts, lib/stylex/primitives.stylex.ts, components/shared/Ui.stylex.ts, components/shell/Shell.stylex.ts), so task 2 should treat Vinext as a consumer/integration surface, not invent a second Vinext-only token layer.
- Vinext gaps versus root app: apps/portal-vinext/app/layout.tsx does not import app/stylex.css, does not use app/styled-components-registry, does not apply root font variables from next/font, and does not use rootLayoutStyles fallback/content wrappers from app/layout.stylex.ts; this is the main Vinext-local shell/theme seam to inspect first for cross-theme parity.
- Theme toggle already mounts for authenticated portal routes through components/shell/Header.tsx -> components/shell/ThemeModeSwitch.tsx; no separate Vinext-only mount is needed for signed-in pages. If a later task wants theme control on the unauthenticated PIN screen, that belongs in shared PortalShell / PinScreen work and should wait for task 3.
- Likely task 2 first-touch files: apps/portal-vinext/app/layout.tsx, apps/portal-vinext/vite.config.ts, lib/stylex/tokens.stylex.ts, lib/stylex/theme.stylex.ts, lib/stylex/primitives.stylex.ts, components/shared/Ui.stylex.ts; likely wait for task 3: components/shell/PortalShell.tsx, components/shell/MainLayout.tsx, components/shell/Header.tsx, route pages under apps/portal-vinext/app/(portal)/** unless a page exposes a missing primitive.

## 2026-03-20 Task 2 cutover asset regression
- The hidden theme/probe work was not the direct runtime break: live `http://127.0.0.1:3000/news` already failed on load because Vinext dev RSC modules emitted root-relative `/node_modules/...` requests (for example `/node_modules/vite/dist/client/env.mjs` and `/node_modules/@vitejs/plugin-rsc/dist/browser.js`), while `buildVinextCutoverRewrites()` only proxied route paths plus `/:path((?:@).*)`.
- Fix was kept inside task 2 scope by extending `lib/platform/vinext-cutover.ts` with a `/node_modules/:path*` rewrite to `VINEXT_CUTOVER_ORIGIN`, which restores the live cutover asset chain without changing the shared theme probe/toggle contract.
- Strengthened `e2e/vinext-theme-primitives.spec.ts` so the lane now fails if `/news` cannot fetch the exact Node/Vite asset URLs or if matching dynamic-import `/node_modules/` console errors appear; this closes the gap where the DOM-only probe assertions passed while the page still logged runtime asset failures.

## 2026-03-20 Task 2 hydration/runtime cleanup
- The hydration mismatch came from `apps/portal-vinext/app/layout.tsx` mutating React-owned subtree nodes (`[data-testid="theme-boundary"]`, hidden/visual theme toggles, and `[data-testid="theme-primitives-probe"]`) before hydration; the safe fix was to reduce the boot script back to html/body `data-theme` and `data-theme-mode` only, and add `suppressHydrationWarning` on Vinext `<html>` and `<body>`.
- After the hydration warning was removed, the remaining `/app/(portal)/news/page.tsx` 404 proved to be a cutover dev-source fetch rather than a broken page route; `lib/platform/vinext-cutover.ts` now also proxies `/app/:path*` to `VINEXT_CUTOVER_ORIGIN`, which clears that browser error without touching the shared theme-boundary/probe ownership.
- `e2e/vinext-theme-primitives.spec.ts` now uses the React-owned hidden theme-toggle buttons for mode switching and explicitly fails on both the hydration-mismatch warning and `/app/(portal)/news/page.tsx` console error, so this exact live regression is covered.

## 2026-03-20 Task 3 verification gotcha
- Existing Vinext login flow in `e2e/vinext-pilot.spec.ts` remains unstable for authenticated transitions (legacy `fixme` tests already reflected this), so the new `@shell-auth` lane is intentionally scoped to stable unauthenticated shell-boundary assertions (`portal-shell` + `runtime-badge`) while keeping broader authenticated browser flows outside this focused gate.

## 2026-03-21 Task 5 adapter lane wait-strategy fix
- `e2e/vinext-data-adapter.spec.ts` was flaky because `waitForPortalShell()` coupled route readiness to `page.goto('/news', { waitUntil: 'networkidle' })`; in cutover dev runtime, background requests can keep network activity alive even when the shell is already rendered and authenticated.
- Replaced the helper with a bounded DOM-state gate: navigate with `waitUntil: 'domcontentloaded'`, wait for `[data-testid="portal-shell"]` visibility, then poll `data-auth-state === authenticated`; route assertions remain unchanged (`news-list`, create mutation path, member permission path).

## 2026-03-21 Task 5 stale NewsSection hooks mock
- `tests/components/NewsSection.test.tsx` mocked `@/lib/news/hooks` without `newsKeys` (and `usePrefetchNews`), which became stale once `lib/news/adapter.ts` imported those exports for the shared adapter contract.
- Fixed only the test-side contract by extending the hooks mock shape (including `newsKeys` and `usePrefetchNews`) so adapter-driven imports resolve in test runtime without altering production adapter code.
