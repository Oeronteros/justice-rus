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
