# Silent Moonfall Core Refresh Hybrid Stack

## TL;DR
> **Summary**: Refresh the Silent Moonfall core portal as a section-scoped redesign that preserves the current Next + StyleX architecture, adds narrow Styled Components support only for named leaf islands, and keeps vinext compatibility as an explicit guardrail instead of a migration driver.
> **Deliverables**:
> - Core portal shell refresh for desktop and mobile without route or auth drift
> - Redesigned dashboard plus refreshed `news`, `guides`, `schedule`, `help`, and `profile`
> - Hybrid styling rules, Next App Router Styled Components readiness, and shared token parity
> - Updated Vitest, Playwright, cutover verification, and `validate` evidence
> **Effort**: XL
> **Parallel**: YES - 3 implementation waves
> **Critical Path**: 1 -> 2 -> 3 -> 4/5 -> 6/7/8/9/10/11/12 -> 13 -> 14 -> 15 -> 16 -> F1-F4

## Context
### Original Request
Use `D:\Desktop\plan.txt` as the planning brief for modernizing the Silent Moonfall guild portal.

### Interview Summary
- Scope is locked to a **core portal refresh**, not a full product expansion.
- Library direction should honor the brief, but architecture stays grounded in the current repo.
- Testing strategy is **tests-after** using the existing Vitest + Playwright + CI stack.
- Styling is **hybrid by area**: keep StyleX as the foundation and allow Styled Components only in explicitly named leaf surfaces.
- A fresh plan artifact is required; the prior plan at `.sisyphus/plans/silent-moonfall-core-portal-redesign.md` remains historical context.

### Metis Review (gaps addressed)
- Converted the mixed StyleX/Styled Components request into an explicit rule: StyleX remains default, Styled Components is leaf-only and never mixed on the same subtree.
- Tightened scope to exclude platform-expansion items from `D:\Desktop\plan.txt` such as chat, Discord sync rollout, recommendation engines, new automation, and new analytics modules.
- Replaced descriptive goals with command-executable acceptance criteria and route-specific QA expectations.
- Switched commit strategy from broad wave commits to one green commit per task-sized slice.

### Oracle Review (architecture guardrails applied)
- `app/layout.tsx:60`, `app/(portal)/layout.tsx:6`, `components/shell/PortalShell.tsx:19`, and `components/shell/MainLayout.tsx:97` are stable platform boundaries and must not become feature-specific state containers.
- `lib/nav.ts:17`, `lib/i18n/copy.ts:4`, `lib/stylex/tokens.stylex.ts:3`, and `components/shared/Ui.stylex.ts:4` are canonical shared foundations; route metadata, labels, and semantic tokens must stay centralized there.
- `lib/platform/vinext-cutover.ts:3` and `docs/vinext-shell-compatibility-guardrails.md:14` make `/news`, `/help`, `/guides`, `/profile`, `/schedule`, and `/calendar` cutover-sensitive; redesign work must preserve shared-shell compatibility.

## Work Objectives
### Core Objective
Deliver a premium, responsive Wuxia-flavored refresh of the Silent Moonfall core portal while preserving current routes, auth/session behavior, i18n contracts, data layering, and vinext cutover compatibility.

### Deliverables
- Updated desktop and mobile shell that keep current route reachability and session controls intact
- Refreshed dashboard, `news`, `guides`, `schedule`, `help`, and `profile` route surfaces
- Hybrid styling foundation with narrow Styled Components support for approved leaf islands only
- Unified async/empty/error/CTA language and theme cohesion across in-scope routes
- Refreshed unit/component/browser/a11y/cutover verification evidence under `.sisyphus/evidence/`

### Definition of Done (verifiable)
- [ ] Core routes remain reachable and correctly grouped via `npx vitest run tests/lib/nav.test.ts tests/components/Header.test.tsx`
- [ ] Dashboard and in-scope modules render without auth/shell regression via `npx playwright test e2e/core-route-regression.spec.ts --project=chromium`
- [ ] Mobile shell and overflow navigation remain stable via `npx playwright test e2e/mobile-dashboard-nav.spec.ts --project=chromium`
- [ ] Accessibility smoke passes for portal entry and refreshed pages via `npx playwright test e2e/a11y.spec.ts --project=chromium`
- [ ] Cutover metadata remains valid via `npm run cutover:verify`
- [ ] Full repo gate passes via `npm run validate`

### Must Have
- Core-portal-only execution: dashboard, shell, `news`, `guides`, `schedule`, `help`, `profile`
- StyleX-first foundation with leaf-only Styled Components adoption
- One styling owner per component subtree
- Responsive verification at 390px, 768px, and 1280px+
- RU/EN/ZH shell and navigation stability
- Zero-human-intervention QA evidence for every task

### Must NOT Have
- No full styling-system migration away from StyleX
- No backend, schema, API-contract, auth-model, or permission-model changes
- No route renames/removals or duplicate nav registries outside `lib/nav.ts`
- No scope expansion into `/members`, `/absences`, `/pvp`, `/analytics`, `/workflow`, `/integrations`, or `/calculator` beyond shell-consistency smoke
- No rollout of chat, push infrastructure, Discord sync expansion, recommendation engines, or new automation from `D:\Desktop\plan.txt`
- No Styled Components usage in `components/shell/*`, `components/shared/*`, `lib/stylex/*`, `app/layout.tsx`, `app/(portal)/layout.tsx`, `app/api/*`, or `lib/server/*`

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.

- Test decision: `tests-after` with existing Vitest + Playwright + axe tooling
- QA policy: every task includes one happy-path and one edge/failure scenario with saved evidence
- Evidence path: `.sisyphus/evidence/task-{N}-{slug}.{ext}`
- Styled Components exception policy: any task that introduces Styled Components must also prove SSR insertion, hydration stability, and token parity

## Execution Strategy
### Parallel Execution Waves
Wave 1: `1-5` foundations, styling boundaries, and shell contracts

Wave 2: `6-12` route-surface redesign slices for dashboard and core modules

Wave 3: `13-16` shared-state polish, responsive/i18n/cutover hardening, and automated regression gates

### Dependency Matrix
- `1` blocks `2-16`
- `2` blocks `6-13` where Styled Components leaf islands are used
- `3` blocks `4`, `5`, `14`, `15`, `16`
- `4` blocks `13`, `14`, `15`, `16`
- `5` blocks `13`, `14`, `15`, `16`
- `6` blocks `13`, `14`, `15`, `16`
- `7` blocks `13`, `14`, `15`, `16`
- `8` blocks `13`, `14`, `15`, `16`
- `9` blocks `13`, `14`, `15`, `16`
- `10` blocks `13`, `14`, `15`, `16`
- `11` blocks `13`, `14`, `15`, `16`
- `12` blocks `13`, `14`, `15`, `16`
- `13` blocks `14`, `15`, `16`
- `14` blocks `15`, `16`
- `15` blocks `16`, `F1-F4`
- `16` blocks `F1-F4`

### Agent Dispatch Summary
- Wave 1: `1 deep`, `2 unspecified-high`, `3 deep`, `4 visual-engineering`, `5 visual-engineering`
- Wave 2: `6 visual-engineering`, `7 visual-engineering`, `8 visual-engineering`, `9 visual-engineering`, `10 visual-engineering`, `11 visual-engineering`, `12 visual-engineering`
- Wave 3: `13 quick`, `14 unspecified-high`, `15 unspecified-high`, `16 unspecified-high`
- Final: `F1 oracle`, `F2 unspecified-high`, `F3 unspecified-high`, `F4 deep`

## TODOs
> Implementation + Test = ONE task. Never separate.
> EVERY task MUST have: Agent Profile + Parallelization + QA Scenarios.

- [x] 1. Lock core refresh route ownership and styling allowlist

  **What to do**: Encode the execution contract for this refresh in repo-visible artifacts before UI work starts. Update the core-module scope note and add a small route/styling ownership matrix that names in-scope routes, out-of-scope routes, vinext-owned routes, shell-owned files, and the exact leaf areas where Styled Components is permitted.
  **Must NOT do**: Do not expand scope, do not introduce new routes, and do not classify any shell/shared/provider file as Styled Components-eligible.

  **Recommended Agent Profile**:
  - Category: `deep` — this task freezes the architectural contract that every later slice depends on.
  - Skills: `[]` — repo facts are already known and no special UX skill is required.
  - Omitted: `frontend-design` — this is contract definition, not visual implementation.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `2-16` | Blocked By: none

  **References**:
  - Pattern: `docs/core-module-inventory.md:5` — current in-scope route set for the redesign.
  - Pattern: `docs/vinext-shell-compatibility-guardrails.md:14` — portable shared foundations that must remain stable.
  - Pattern: `lib/platform/vinext-cutover.ts:3` — pilot and wave2 vinext-owned routes that constrain redesign work.
  - API/Type: `lib/nav.ts:17` — canonical section-to-route metadata.
  - API/Type: `package.json:35` — current dependency baseline proving Styled Components is not yet installed.

  **Acceptance Criteria**:
  - [ ] One repo-visible contract explicitly lists IN scope: `/`, `/news`, `/guides`, `/schedule`, `/help`, `/profile`.
  - [ ] The same contract explicitly lists OUT scope shell-smoke-only routes: `/members`, `/absences`, `/pvp`, `/analytics`, `/workflow`, `/integrations`, `/calculator`.
  - [ ] The contract names `components/shell/*`, `components/shared/*`, `lib/stylex/*`, `app/layout.tsx`, and `app/(portal)/layout.tsx` as StyleX-only zones.
  - [ ] The contract names only route-local leaf presentation subcomponents under `components/sections/*` as Styled Components candidates.

  **QA Scenarios**:
  ```text
  Scenario: Route contract matches canonical nav and cutover metadata
    Tool: Bash
    Steps: Run `npx vitest run tests/lib/nav.test.ts`
    Expected: Nav contract test passes with the documented in-scope/out-of-scope route map.
    Evidence: .sisyphus/evidence/task-1-core-contract.txt

  Scenario: Contract does not break cutover ownership assumptions
    Tool: Bash
    Steps: Run `npm run cutover:verify`
    Expected: Cutover verification succeeds with no route ownership conflicts.
    Evidence: .sisyphus/evidence/task-1-cutover-check.txt
  ```

  **Commit**: YES | Message: `docs(portal): lock core refresh contract` | Files: `docs/core-module-inventory.md`, `docs/vinext-shell-compatibility-guardrails.md`, any new scope-note file under `docs/`

- [x] 2. Enable Styled Components readiness for approved leaf islands only

  **What to do**: Add the minimum Next-side infrastructure required for leaf-only Styled Components usage: dependency install, `compiler.styledComponents` enablement, App Router style registry, and token-bridge rules so Styled Components consumes existing semantic values instead of inventing a parallel theme. Wire this without changing provider order or shell ownership.
  **Must NOT do**: Do not migrate existing shell/shared components to Styled Components. Do not introduce a second global theme runtime. Do not wrap only part of the root tree in a way that changes auth/i18n/query/theme boundaries.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — dependency/config + SSR/hydration work crosses build/runtime boundaries.
  - Skills: `[]` — implementation should follow framework docs directly.
  - Omitted: `frontend-design` — this is infrastructure, not look-and-feel work.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `6-13` where Styled Components is used | Blocked By: `1`

  **References**:
  - Pattern: `package.json:35` — current dependencies include StyleX, React Query, Motion, and Chart.js but no Styled Components.
  - Pattern: `next.config.ts:56` — current compiler config location where `styledComponents: true` must be added.
  - Pattern: `app/layout.tsx:65` — root layout/provider order that must remain stable when the registry is inserted.
  - Pattern: `lib/stylex/tokens.stylex.ts:3` — semantic tokens Styled Components leaves must consume.
  - Pattern: `components/shared/Ui.stylex.ts:4` — shared primitive vocabulary that must stay visually canonical.
  - External: `https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/02-guides/css-in-js.mdx` — Next 16 App Router Styled Components compiler + registry guidance.

  **Acceptance Criteria**:
  - [ ] `styled-components` support is added with explicit Next compiler enablement and an App Router registry.
  - [ ] `app/layout.tsx` provider order remains `ThemeProvider -> AppThemeBoundary -> QueryProvider -> I18nProvider` with the registry inserted without changing those semantics.
  - [ ] A token bridge exists so Styled Components leaves consume existing semantic colors/spacing/typography values rather than ad hoc literals.
  - [ ] No file under `components/shell/`, `components/shared/`, `lib/stylex/`, `app/api/`, or `lib/server/` is converted to Styled Components.

  **QA Scenarios**:
  ```text
  Scenario: Styled Components registry builds and server-renders cleanly
    Tool: Bash
    Steps: Run `npm run build`
    Expected: Production build succeeds with no Styled Components SSR/compiler errors.
    Evidence: .sisyphus/evidence/task-2-build.txt

  Scenario: No hydration regression at portal entry after registry insertion
    Tool: Playwright
    Steps: Open `/news`, log in with the existing smoke credentials, watch browser console during first render, and assert no hydration/styling mismatch errors appear.
    Expected: Login flow succeeds and the page shows styled UI without hydration warnings.
    Evidence: .sisyphus/evidence/task-2-hydration.txt
  ```

  **Commit**: YES | Message: `feat(styling): enable leaf styled-components bridge` | Files: `package.json`, `next.config.ts`, new registry file under `app/` or `lib/`, token-bridge helper files only

- [x] 3. Consolidate shell and nav contracts before visual refreshes

  **What to do**: Remove or centralize route-mapping drift between `lib/nav.ts` and `components/shell/MainLayout.tsx` so active-section resolution, prefetch routing, and shell tone selection stay consistent. Preserve the existing auth/session shell boundary while making the navigation contract reusable by both desktop and mobile shell work.
  **Must NOT do**: Do not move auth/session logic out of `app/(portal)/layout.tsx` or `components/shell/PortalShell.tsx`. Do not bypass the current page -> hooks -> api -> server layering.

  **Recommended Agent Profile**:
  - Category: `deep` — this touches canonical route metadata and shell orchestration.
  - Skills: `[]` — architecture consistency matters more than UI patterns here.
  - Omitted: `frontend-design` — no visual restyling yet.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `4`, `5`, `14`, `15`, `16` | Blocked By: `1`

  **References**:
  - Pattern: `lib/nav.ts:17` — canonical route and section group definitions.
  - Pattern: `components/shell/MainLayout.tsx:27` — duplicated `pathToSection` contract that must be consolidated.
  - Pattern: `components/shell/MainLayout.tsx:147` — navigation/session contracts that must stay explicit.
  - Pattern: `app/(portal)/layout.tsx:6` — authenticated shell entrypoint that must remain the auth gate.
  - Pattern: `components/shell/PortalShell.tsx:19` — shell orchestration for pin screen, notifications, auth provider, and logout flow.
  - Test: `tests/components/Header.test.tsx` — existing header contract coverage to extend rather than replace.

  **Acceptance Criteria**:
  - [ ] Active-section resolution is derived from one canonical route source instead of manually drifting copies.
  - [ ] `PortalShell` still owns login/logout and `app/(portal)/layout.tsx` still owns session resolution.
  - [ ] Desktop/mobile shell consumers use the same current-section and prefetch contract.
  - [ ] Route grouping remains sourced from `lib/nav.ts` and not duplicated in new registries.

  **QA Scenarios**:
  ```text
  Scenario: Nav contract remains green after route-resolution consolidation
    Tool: Bash
    Steps: Run `npx vitest run tests/lib/nav.test.ts tests/components/Header.test.tsx`
    Expected: Both suites pass and prove active-route and header expectations still hold.
    Evidence: .sisyphus/evidence/task-3-nav-tests.txt

  Scenario: Shared shell metadata still passes cutover verification
    Tool: Bash
    Steps: Run `npm run cutover:verify`
    Expected: No cutover rewrite mismatch is introduced by the new resolver path.
    Evidence: .sisyphus/evidence/task-3-cutover.txt
  ```

  **Commit**: YES | Message: `refactor(shell): consolidate nav contracts` | Files: `lib/nav.ts`, `components/shell/MainLayout.tsx`, supporting shell/nav helpers, related tests

- [x] 4. Refresh the desktop shell header and primary command rail

  **What to do**: Redesign the desktop shell using the existing StyleX shell foundation only. Keep the brand block, section signal, quick-access tray, primary rail, and immersive secondary menu, but improve hierarchy, spacing, motion, and command clarity for 1280px+ and 1024px widths. Preserve language switch, theme switch, refresh, profile, calendar, and logout affordances.
  **Must NOT do**: Do not move shell styling into Styled Components. Do not remove compact-header behavior, nav prefetch hooks, or the immersive secondary menu entry point.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — this is a shell-focused UX redesign with high visual leverage.
  - Skills: [`navigation-patterns`, `frontend-design`, `interaction-patterns`] — desktop IA, strong visual hierarchy, and purposeful motion.
  - Omitted: `mobile-responsive-ux` — mobile work is isolated in task 5.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `3`

  **References**:
  - Pattern: `components/shell/Header.tsx:25` — current desktop shell composition and preserved controls.
  - Pattern: `components/shell/Header.tsx:209` — primary navigation and immersive menu structure.
  - Pattern: `components/shell/MainLayout.tsx:152` — shell mounting location and header visibility translation behavior.
  - Pattern: `lib/nav.ts:40` — desktop primary and secondary section ordering.
  - API/Type: `lib/i18n/copy.ts:55` — localized header labels that must remain canonical.
  - Test: `e2e/core-route-regression.spec.ts:134` — existing desktop route smoke to extend.

  **Acceptance Criteria**:
  - [ ] Desktop primary rail still exposes `about`, `news`, `schedule`, `help`, and `profile` from `lib/nav.ts`.
  - [ ] Secondary menu still exposes the grouped routes from canonical nav metadata with localized labels.
  - [ ] Theme, language, refresh, profile, calendar, and logout controls remain visible and operable in desktop widths.
  - [ ] Compact-header behavior still responds to scroll without layout shift or clipped content.

  **QA Scenarios**:
  ```text
  Scenario: Desktop shell reaches core routes and keeps utility actions intact
    Tool: Playwright
    Steps: Run `npx playwright test e2e/core-route-regression.spec.ts --project=chromium`
    Expected: Login succeeds, desktop navigation is visible, and News -> Help -> Profile traversal still works.
    Evidence: .sisyphus/evidence/task-4-desktop-shell.txt

  Scenario: Locale switching does not overflow or hide desktop nav labels
    Tool: Playwright
    Steps: At 1280px, log in, switch RU -> EN -> ZH through the shell language control, and assert primary links plus the immersive-menu trigger remain visible and clickable after each change.
    Expected: No clipped labels, collapsed controls, or unreachable desktop commands.
    Evidence: .sisyphus/evidence/task-4-desktop-locales.png
  ```

  **Commit**: YES | Message: `feat(shell): refresh desktop header rail` | Files: `components/shell/Header.tsx`, `components/shell/Shell.stylex.ts`, related tests/specs only

- [ ] 5. Refresh the mobile dock and overflow navigation sheet

  **What to do**: Rework the thumb-reach mobile shell using the existing StyleX shell layer. Keep the four-item quick dock plus `More` entry pattern, but improve information scent, overflow-sheet hierarchy, body-scroll locking, motion, and active-state clarity for 390px and small-tablet widths.
  **Must NOT do**: Do not move mobile shell chrome into Styled Components. Do not remove the overflow scrim, grouped secondary navigation, or prefetch callbacks.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — this is mobile-first shell interaction work.
  - Skills: [`mobile-responsive-ux`, `navigation-patterns`, `interaction-patterns`] — thumb-reach navigation, overflow-sheet behavior, and motion polish.
  - Omitted: `frontend-design` — layout direction is constrained by the existing shell contract.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `3`

  **References**:
  - Pattern: `components/shell/MobileNav.tsx:20` — current mobile dock and overflow-sheet behavior.
  - Pattern: `components/shell/MobileNav.tsx:143` — quick-dock structure and `More` trigger.
  - Pattern: `lib/nav.ts:42` — mobile primary and secondary route ordering.
  - API/Type: `lib/i18n/copy.ts:4` — localized section labels that must stay canonical.
  - Test: `e2e/mobile-dashboard-nav.spec.ts:217` — existing mobile smoke flow to extend.

  **Acceptance Criteria**:
  - [ ] The quick dock still exposes `about`, `news`, `schedule`, and `help`, with `More` covering the remaining routes.
  - [ ] Opening the overflow sheet locks body scroll and preserves accessible active-state and label semantics.
  - [ ] The mobile shell remains readable and tappable in RU, EN, and ZH at 390px.
  - [ ] Secondary grouped routes remain sourced from canonical nav metadata.

  **QA Scenarios**:
  ```text
  Scenario: Mobile shell opens the overflow sheet and reaches a secondary route
    Tool: Playwright
    Steps: Run `npx playwright test e2e/mobile-dashboard-nav.spec.ts --project=chromium`
    Expected: Login succeeds at 390px, the More sheet opens, and navigation to a secondary route still works.
    Evidence: .sisyphus/evidence/task-5-mobile-shell.txt

  Scenario: Mobile overflow remains stable across locales
    Tool: Playwright
    Steps: At 390px, log in, open the More sheet, switch RU -> EN -> ZH, and assert grouped links remain visible inside the sheet without clipped text or untappable items.
    Expected: Overflow navigation remains usable and body scroll unlocks correctly after close.
    Evidence: .sisyphus/evidence/task-5-mobile-locales.png
  ```

  **Commit**: YES | Message: `feat(shell): refresh mobile dock` | Files: `components/shell/MobileNav.tsx`, `components/shell/Shell.stylex.ts`, related tests/specs only

- [ ] 6. Refresh the dashboard hero and first-screen command surface

  **What to do**: Redesign the above-the-fold dashboard so it immediately communicates guild status, next actions, and member context. Preserve existing data hooks and signal-strip content, but reorganize the first screen into a clearer narrative hero, action deck, and optional micro-visuals using existing `motion` and existing chart packages only if current dashboard data already supports them.
  **Must NOT do**: Do not add new backend data dependencies. Do not turn the dashboard route into a cross-module data rewrite. Do not use Styled Components on the outer section shell if StyleX already owns that subtree.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — the dashboard is the highest-leverage first-screen redesign.
  - Skills: [`page-structure-patterns`, `data-density-patterns`, `frontend-design`] — strong first-screen hierarchy and dense operational UI.
  - Omitted: `comparison-patterns` — not relevant to the dashboard slice.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `2`, `4`, `5`

  **References**:
  - Pattern: `components/sections/dashboard/index.tsx` — route implementation to restructure without changing data contracts.
  - Pattern: `tests/components/DashboardSection.test.tsx:40` — current signal-strip and prefix assertions to preserve.
  - Pattern: `lib/i18n/copy.ts:112` — portal hero copy source for any shell-adjacent text updates.
  - Test: `e2e/mobile-dashboard-nav.spec.ts:217` — dashboard mobile smoke expectations already used in browser coverage.
  - API/Type: `package.json:45` — existing `chart.js` and `react-chartjs-2` availability; use only if current route data can drive a real micro-visual.

  **Acceptance Criteria**:
  - [ ] The first screen exposes a clear status narrative, primary actions, and member context without hiding the existing signal content.
  - [ ] Any motion stays respectful of reduced-motion behavior already used in the shell.
  - [ ] Any visualized metric uses existing installed chart packages only and consumes existing dashboard data, not new endpoints.
  - [ ] The dashboard still renders shared prefix/status content verified by component tests.

  **QA Scenarios**:
  ```text
  Scenario: Dashboard hero still renders the expected signal content
    Tool: Bash
    Steps: Run `npx vitest run tests/components/DashboardSection.test.tsx`
    Expected: The suite passes and still finds the signal strip plus shared prefix content.
    Evidence: .sisyphus/evidence/task-6-dashboard-test.txt

  Scenario: Mobile first-screen dashboard remains readable after redesign
    Tool: Playwright
    Steps: Run `npx playwright test e2e/mobile-dashboard-nav.spec.ts --project=chromium`
    Expected: The first screen loads at 390px with visible dashboard summary content and no blocked navigation.
    Evidence: .sisyphus/evidence/task-6-dashboard-mobile.png
  ```

  **Commit**: YES | Message: `feat(dashboard): refresh hero surface` | Files: `components/sections/dashboard/index.tsx`, route-local subcomponents/styles, related tests/specs only

- [ ] 7. Refresh the dashboard dense operational zones below the fold

  **What to do**: Reorganize the dashboard's lower monitoring and action-heavy regions into clearer modules with explicit action rows, readable density, and stable module seams. Preserve current hook usage and operational data blocks while improving scanability for officer-heavy and member-heavy views.
  **Must NOT do**: Do not merge unrelated actions into generic cards. Do not move route logic into shell code. Do not introduce new data ownership outside the existing dashboard section tree.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — this is dense information design with operational constraints.
  - Skills: [`data-density-patterns`, `detail-page-patterns`, `interaction-patterns`] — grouping, progressive emphasis, and action clarity.
  - Omitted: `mobile-responsive-ux` — responsive hardening comes later in task 14.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `2`, `6`

  **References**:
  - Pattern: `components/sections/dashboard/index.tsx` — dense dashboard modules that must be reorganized without contract drift.
  - Pattern: `docs/core-module-inventory.md:118` — guidance to alter route composition before changing shared data contracts.
  - Test: `tests/components/DashboardSection.test.tsx:50` — baseline assertions that should remain true after restructuring.
  - Test: `e2e/mobile-dashboard-nav.spec.ts:226` — browser proof for dashboard route visibility on mobile.

  **Acceptance Criteria**:
  - [ ] Below-the-fold dashboard regions are grouped into explicit operational blocks with visible next actions.
  - [ ] Existing hook/data contracts remain in the dashboard section layer.
  - [ ] Officer-heavy and member-heavy content remains readable without layout collapse at desktop widths.
  - [ ] Mobile route smoke still reaches and renders the dashboard after the restructure.

  **QA Scenarios**:
  ```text
  Scenario: Dashboard lower-zone restructure preserves baseline render contract
    Tool: Bash
    Steps: Run `npx vitest run tests/components/DashboardSection.test.tsx`
    Expected: Dashboard component tests remain green after the lower-zone redesign.
    Evidence: .sisyphus/evidence/task-7-dashboard-zones.txt

  Scenario: Dense dashboard still works in the mobile portal flow
    Tool: Playwright
    Steps: Run `npx playwright test e2e/mobile-dashboard-nav.spec.ts --project=chromium`
    Expected: Dashboard loads, summary content remains visible, and the flow can still continue into secondary navigation.
    Evidence: .sisyphus/evidence/task-7-dashboard-zones-mobile.png
  ```

  **Commit**: YES | Message: `feat(dashboard): refresh dense operations` | Files: `components/sections/dashboard/index.tsx`, route-local subcomponents/styles, related tests/specs only

- [ ] 8. Refresh the news route as an editorial command surface

  **What to do**: Redesign `/news` into a clearer editorial surface with stronger featured-vs-list distinction, cleaner officer action handling, and improved content hierarchy. If Styled Components is used, confine it to route-local presentation leaves such as featured cards or editorial rails while keeping outer shells on StyleX/token foundations.
  **Must NOT do**: Do not change mutation behavior, Discord message URLs, pin/delete semantics, or the route's existing data-loading path.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — editorial hierarchy and action clarity are the primary concerns.
  - Skills: [`detail-page-patterns`, `interaction-patterns`, `frontend-design`] — featured/list distinction and operational controls.
  - Omitted: `modal-patterns` — the route is not modal-led.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `2`, `4`, `5`

  **References**:
  - Pattern: `components/sections/news/index.tsx` — route implementation to refresh.
  - Pattern: `docs/core-module-inventory.md:14` — protected actions and UX hotspots for `/news`.
  - Test: `tests/components/NewsSection.test.tsx` — existing component coverage to extend.
  - Test: `e2e/core-route-regression.spec.ts:148` — browser proof that News remains reachable from the shell.

  **Acceptance Criteria**:
  - [ ] Featured and non-featured news items remain visually distinct and operationally clear.
  - [ ] Officer actions keep their current mutation behavior and remain visibly separated from reading actions.
  - [ ] Any Styled Components usage stays inside route-local leaf presentation components only.
  - [ ] Shell navigation still reaches `/news` and the page still renders a visible article heading in browser smoke coverage.

  **QA Scenarios**:
  ```text
  Scenario: News component contract remains green after the editorial refresh
    Tool: Bash
    Steps: Run `npx vitest run tests/components/NewsSection.test.tsx`
    Expected: News component tests pass with the refreshed layout.
    Evidence: .sisyphus/evidence/task-8-news-test.txt

  Scenario: Desktop shell still reaches the refreshed News page
    Tool: Playwright
    Steps: Run `npx playwright test e2e/core-route-regression.spec.ts --project=chromium`
    Expected: The News link remains reachable from the shell and a news headline becomes visible after login.
    Evidence: .sisyphus/evidence/task-8-news-route.png
  ```

  **Commit**: YES | Message: `feat(news): refresh editorial surface` | Files: `components/sections/news/index.tsx`, route-local subcomponents/styles, related tests/specs only

- [ ] 9. Refresh guides browse, detail, and editor chrome without breaking header coupling

  **What to do**: Redesign `/guides` as a cleaner browse-plus-detail experience while preserving its modal/editor interaction model and query-param driven detail flow. Improve the browse hero, card hierarchy, detail modal framing, and editor chrome, but keep the route's header-hide behavior intentional and testable.
  **Must NOT do**: Do not flatten the route into a generic page flow. Do not break slug/query syncing. Do not detach modal/editor state from the header visibility context.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — this is a modal-driven content UX refresh.
  - Skills: [`modal-patterns`, `detail-page-patterns`, `frontend-design`] — browse/detail/editor cohesion with accessible modal behavior.
  - Omitted: `data-density-patterns` — the route is modal-centric, not dashboard-dense.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `2`, `4`, `5`

  **References**:
  - Pattern: `components/sections/guides/index.tsx` — route implementation and editor/detail orchestration.
  - Pattern: `docs/core-module-inventory.md:51` — protected actions and header-visibility coupling for `/guides`.
  - Test: `tests/components/GuidesList.test.tsx` — current guides coverage to extend.
  - Test: `e2e/core-route-regression.spec.ts:148` — shell route traversal pattern that should be expanded if guides is added to browser smoke.

  **Acceptance Criteria**:
  - [ ] Browse, detail modal, and editor remain distinct interaction surfaces.
  - [ ] Query-param and slug-based detail entry still works.
  - [ ] Header visibility still changes intentionally when the modal/editor state requires it.
  - [ ] Any Styled Components usage remains inside route-local presentation leaves only.

  **QA Scenarios**:
  ```text
  Scenario: Guides component coverage remains green after the refresh
    Tool: Bash
    Steps: Run `npx vitest run tests/components/GuidesList.test.tsx`
    Expected: Guides component tests pass with the refreshed browse/detail/editor chrome.
    Evidence: .sisyphus/evidence/task-9-guides-test.txt

  Scenario: Guides modal/editor still cooperates with shell header visibility
    Tool: Playwright
    Steps: Log in, open `/guides`, trigger guide detail and editor states, and assert the shell header hides/shows at the same moments as before while query params stay in sync.
    Expected: Modal/editor flow remains intact and no shell overlap occurs.
    Evidence: .sisyphus/evidence/task-9-guides-modal.png
  ```

  **Commit**: YES | Message: `feat(guides): refresh browse modal chrome` | Files: `components/sections/guides/index.tsx`, guide subcomponents/styles, related tests/specs only

- [ ] 10. Refresh the schedule route as a clearer action surface

  **What to do**: Redesign `/schedule` around faster scanability for event context, RSVP state, and officer edit actions. Keep the current timeline/list, recurrence handling, and editor flows, but surface urgency, time context, and primary actions more clearly.
  **Must NOT do**: Do not change schedule parsing, recurrence logic, RSVP semantics, or editor validation behavior. Do not move schedule logic out of the route section tree.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — schedule mixes dense information with primary actions.
  - Skills: [`detail-page-patterns`, `interaction-patterns`, `frontend-design`] — operational clarity without changing behavior.
  - Omitted: `modal-patterns` — the route is action-heavy but not modal-led.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `2`, `4`, `5`

  **References**:
  - Pattern: `components/sections/schedule/index.tsx` — route implementation to refresh.
  - Pattern: `docs/core-module-inventory.md:33` — protected actions and hotspot notes for `/schedule`.
  - Test: `tests/components/ScheduleHelpSection.test.tsx:39` — current shared schedule/help empty-state coverage.
  - Test: `e2e/core-route-regression.spec.ts:105` — mocked schedule payload already used in browser smoke.

  **Acceptance Criteria**:
  - [ ] Event context, RSVP state, and officer actions become visually clearer without changing route behavior.
  - [ ] Schedule time parsing, recurrence labeling, and editor flows remain intact.
  - [ ] Shared empty/error state primitives are preserved or improved, not route-specific one-offs.
  - [ ] The route continues to consume the existing schedule data path and browser mock payload.

  **QA Scenarios**:
  ```text
  Scenario: Schedule empty-state contract remains green after the refresh
    Tool: Bash
    Steps: Run `npx vitest run tests/components/ScheduleHelpSection.test.tsx`
    Expected: The shared schedule/help component test file passes and still verifies schedule empty-state behavior.
    Evidence: .sisyphus/evidence/task-10-schedule-test.txt

  Scenario: Schedule route still renders inside the authenticated portal shell
    Tool: Playwright
    Steps: Log in, navigate to `/schedule`, and assert the refreshed route shows event content plus reachable RSVP/editor actions using the mocked payload.
    Expected: The page renders the schedule content without shell or data-flow regressions.
    Evidence: .sisyphus/evidence/task-10-schedule-route.png
  ```

  **Commit**: YES | Message: `feat(schedule): refresh action surface` | Files: `components/sections/schedule/index.tsx`, schedule subcomponents/styles, related tests/specs only

- [ ] 11. Refresh the help route as an operational support board

  **What to do**: Redesign `/help` so creation, filtering, and responder actions are easier to scan under heavy action density. Keep the composer, status chips, responder actions, and metadata intact while improving grouping, urgency cues, and action discoverability.
  **Must NOT do**: Do not change help-request mutations, RSVP semantics, status transitions, or delete behavior. Do not flatten the route into a generic list that hides operator actions.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — action density and state clarity drive the redesign.
  - Skills: [`detail-page-patterns`, `interaction-patterns`, `frontend-design`] — action grouping, status visibility, and readable density.
  - Omitted: `form-patterns` — composer behavior already exists and is not being reinvented.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `2`, `4`, `5`

  **References**:
  - Pattern: `components/sections/help/index.tsx` — route implementation to refresh.
  - Pattern: `docs/core-module-inventory.md:67` — protected actions and high-density notes for `/help`.
  - Test: `tests/components/ScheduleHelpSection.test.tsx:70` — current shared help empty-state coverage.
  - Test: `e2e/core-route-regression.spec.ts:151` — browser proof that Help remains reachable from the shell.

  **Acceptance Criteria**:
  - [ ] Request creation, filter state, and responder actions remain explicit and visible.
  - [ ] High-density action groups are still separated, not collapsed into ambiguous generic cards.
  - [ ] Shared empty/error state language remains aligned with schedule and later shared-state work.
  - [ ] The Help route remains reachable from the shell and displays a mocked request title in browser smoke coverage.

  **QA Scenarios**:
  ```text
  Scenario: Help empty-state contract remains green after the refresh
    Tool: Bash
    Steps: Run `npx vitest run tests/components/ScheduleHelpSection.test.tsx`
    Expected: The shared schedule/help test file passes and still verifies help empty-state behavior.
    Evidence: .sisyphus/evidence/task-11-help-test.txt

  Scenario: Desktop shell still reaches the refreshed Help page
    Tool: Playwright
    Steps: Run `npx playwright test e2e/core-route-regression.spec.ts --project=chromium`
    Expected: The Help link remains reachable and the mocked request title becomes visible after login.
    Evidence: .sisyphus/evidence/task-11-help-route.png
  ```

  **Commit**: YES | Message: `feat(help): refresh support board surface` | Files: `components/sections/help/index.tsx`, help subcomponents/styles, related tests/specs only

- [ ] 12. Refresh the profile route as a command-center surface

  **What to do**: Redesign `/profile` so member identity, class/role context, notification settings, and admin account management feel like one coherent command center. Preserve the existing member/admin split, desktop notification flow, activity toggles, and account actions.
  **Must NOT do**: Do not change role/permission behavior, account mutation semantics, notification-permission requests, or the admin/non-admin boundary. Do not hide admin actions behind decorative chrome.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — the route mixes self-service and admin operations with strong hierarchy needs.
  - Skills: [`detail-page-patterns`, `form-patterns`, `frontend-design`] — settings hierarchy, action grouping, and accessible controls.
  - Omitted: `comparison-patterns` — not needed here.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14`, `15`, `16` | Blocked By: `1`, `2`, `4`, `5`

  **References**:
  - Pattern: `components/sections/profile/index.tsx` — route implementation to refresh.
  - Pattern: `docs/core-module-inventory.md:86` — protected actions and admin/member split for `/profile`.
  - Test: `tests/components/ProfileSection.test.tsx:64` — current role explainer, activity switch, and prefix assertions.
  - Test: `e2e/core-route-regression.spec.ts:154` — browser proof that Profile remains reachable from the shell.

  **Acceptance Criteria**:
  - [ ] Member overview, notifications, role access, activity toggles, and account-management areas remain distinct.
  - [ ] Desktop notification permission flow and account actions remain present where previously available.
  - [ ] Admin vs non-admin responsibilities remain visually separated instead of flattened.
  - [ ] The shell still reaches `/profile` and the route continues to show shared prefix/identity content in tests.

  **QA Scenarios**:
  ```text
  Scenario: Profile role and activity controls remain green after the refresh
    Tool: Bash
    Steps: Run `npx vitest run tests/components/ProfileSection.test.tsx`
    Expected: Profile component tests pass, including role explainer and activity-switch assertions.
    Evidence: .sisyphus/evidence/task-12-profile-test.txt

  Scenario: Desktop shell still reaches the refreshed Profile page
    Tool: Playwright
    Steps: Run `npx playwright test e2e/core-route-regression.spec.ts --project=chromium`
    Expected: The Profile link remains reachable and shared identity content appears after login.
    Evidence: .sisyphus/evidence/task-12-profile-route.png
  ```

  **Commit**: YES | Message: `feat(profile): refresh command center` | Files: `components/sections/profile/index.tsx`, profile subcomponents/styles, related tests/specs only

- [ ] 13. Unify async states, CTA language, and theme cohesion across refreshed routes

  **What to do**: Normalize loading, empty, error, and CTA presentation across the refreshed dashboard and core modules. Keep the existing theme provider and mode-switch behavior, but ensure both StyleX-owned surfaces and any approved Styled Components leaves render the same semantic tokens, spacing scale, and action emphasis in light/dark/system modes.
  **Must NOT do**: Do not introduce a second theme context. Do not hardcode route-specific fallback chrome when shared primitives can express the state. Do not restyle out-of-scope routes globally through a broad reset.

  **Recommended Agent Profile**:
  - Category: `quick` — this is a focused cross-route harmonization pass on already-refreshed slices.
  - Skills: [`interaction-patterns`, `toast-notification-patterns`] — consistent system feedback and CTA language.
  - Omitted: `frontend-design` — major visual direction is already set by earlier tasks.

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: `14`, `15`, `16` | Blocked By: `2`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`

  **References**:
  - Pattern: `components/shared/Ui.stylex.ts:253` — shared notice and status vocabulary to reuse.
  - Pattern: `lib/stylex/tokens.stylex.ts:3` — semantic tokens that both styling engines must share.
  - Pattern: `app/layout.tsx:58` — theme boot script and root theme state behavior that must remain stable.
  - Test: `tests/components/ScheduleHelpSection.test.tsx:59` — existing shared empty-state assertions.
  - Test: `tests/components/ProfileSection.test.tsx:98` — interactive control expectations that must survive theme polish.

  **Acceptance Criteria**:
  - [ ] Refreshed routes use a common loading/empty/error/CTA language instead of bespoke fallback chrome.
  - [ ] Light, dark, and system mode continue to resolve through the existing root theme mechanism.
  - [ ] Styled Components leaves, if present, consume the same semantic tokens and spacing scales as adjacent StyleX surfaces.
  - [ ] Out-of-scope routes are not visually regressed by this harmonization pass.

  **QA Scenarios**:
  ```text
  Scenario: Shared empty-state contracts remain green after cross-route harmonization
    Tool: Bash
    Steps: Run `npx vitest run tests/components/ScheduleHelpSection.test.tsx tests/components/ProfileSection.test.tsx`
    Expected: Existing empty-state and interactive-control tests pass after the shared-state pass.
    Evidence: .sisyphus/evidence/task-13-shared-states.txt

  Scenario: Theme-mode switching remains stable after token harmonization
    Tool: Playwright
    Steps: Log in, toggle light/dark/system from the shell theme switch, and assert a refreshed route keeps readable surfaces with no flash of mismatched chrome during reload.
    Expected: Theme changes remain consistent across StyleX surfaces and any approved Styled Components leaves.
    Evidence: .sisyphus/evidence/task-13-theme.png
  ```

  **Commit**: YES | Message: `refactor(ui): unify states and theme polish` | Files: refreshed route UI files, shared state primitives, related tests/specs only

- [ ] 14. Finish responsive, locale, and vinext-compatibility hardening

  **What to do**: Run a focused polish pass across all refreshed slices to eliminate overflow, clipping, layout collapse, and locale drift at 390px, 768px, and 1280px+. Keep shell/nav copy sourced from canonical i18n files, confirm cutover-sensitive routes still align with shared foundations, and ensure out-of-scope routes touched by shell changes still look coherent.
  **Must NOT do**: Do not broaden this into content rewrites or new feature work. Do not duplicate labels in route-local files. Do not claim vinext parity beyond the documented shared foundations and smoke coverage.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — this is a broad but bounded hardening pass across multiple completed slices.
  - Skills: [`mobile-responsive-ux`, `wcag-accessibility`] — breakpoint resilience and readable, accessible shell/content behavior.
  - Omitted: `frontend-design` — this is polish, not a new design direction.

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: `15`, `16` | Blocked By: `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`

  **References**:
  - Pattern: `lib/i18n/copy.ts:4` — canonical section labels and shell copy sources.
  - Pattern: `docs/vinext-shell-compatibility-guardrails.md:24` — pilot and wave2 parity expectations.
  - Pattern: `playwright.config.ts:18` — dual-runtime Playwright projects that must stay meaningful.
  - Pattern: `lib/platform/vinext-cutover.ts:19` — vinext-owned route resolution rules.
  - Test: `e2e/mobile-dashboard-nav.spec.ts:3` — mobile viewport baseline already used by browser coverage.

  **Acceptance Criteria**:
  - [ ] Refreshed routes remain readable and tappable at 390px, 768px, and 1280px+.
  - [ ] RU/EN/ZH label and CTA lengths do not break shell or route layouts.
  - [ ] Shell-related changes remain compatible with cutover-sensitive route ownership and shared foundations.
  - [ ] Out-of-scope routes touched only by shell consistency still mount and navigate correctly.

  **QA Scenarios**:
  ```text
  Scenario: Mobile and desktop portal flows remain stable across breakpoints
    Tool: Playwright
    Steps: Run `npx playwright test e2e/mobile-dashboard-nav.spec.ts e2e/core-route-regression.spec.ts --project=chromium`
    Expected: Core navigation and dashboard flows remain green on both desktop and mobile smoke paths.
    Evidence: .sisyphus/evidence/task-14-responsive.txt

  Scenario: Cutover-sensitive routes still satisfy shared metadata expectations
    Tool: Bash
    Steps: Run `npm run cutover:verify`
    Expected: Cutover verification passes after responsive and locale polish.
    Evidence: .sisyphus/evidence/task-14-cutover.txt
  ```

  **Commit**: YES | Message: `refactor(portal): harden locale responsive polish` | Files: refreshed route files, i18n copy updates, responsive style adjustments, related specs only

- [ ] 15. Refresh Vitest coverage for shell and core-route contracts

  **What to do**: Update and extend unit/component tests so each refreshed slice has stable route-contract proof. Prioritize nav ownership, shell controls, dashboard render contracts, news/guides/schedule/help/profile behavior, and any Styled Components leaf-specific token/SSR boundary tests that can be exercised in Vitest.
  **Must NOT do**: Do not snapshot broad full pages without intent. Do not add brittle assertions tied only to decorative layout. Do not skip tests for any route that changed meaningfully.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — this is cross-slice test design and stabilization work.
  - Skills: `[]` — existing repo test patterns are sufficient.
  - Omitted: `frontend-design` — purely verification-focused.

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: `16`, `F1-F4` | Blocked By: `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`

  **References**:
  - Test: `tests/components/Header.test.tsx` — shell control and nav contract baseline.
  - Test: `tests/components/DashboardSection.test.tsx:40` — dashboard signal/content baseline.
  - Test: `tests/components/NewsSection.test.tsx` — news baseline to extend.
  - Test: `tests/components/GuidesList.test.tsx` — guides coverage baseline.
  - Test: `tests/components/ScheduleHelpSection.test.tsx:39` — schedule/help shared-state baseline.
  - Test: `tests/components/ProfileSection.test.tsx:64` — profile behavior baseline.

  **Acceptance Criteria**:
  - [ ] Every materially refreshed route has at least one maintained component/contract test file.
  - [ ] Shell/nav tests cover canonical route mapping, controls, and primary/secondary reachability.
  - [ ] Shared empty/error/CTA language is asserted where route fallbacks changed.
  - [ ] Test coverage stays implementation-resilient by checking behavior and semantics rather than decorative DOM shape.

  **QA Scenarios**:
  ```text
  Scenario: Updated component and shell suites all pass together
    Tool: Bash
    Steps: Run `npx vitest run tests/components/Header.test.tsx tests/components/DashboardSection.test.tsx tests/components/NewsSection.test.tsx tests/components/GuidesList.test.tsx tests/components/ScheduleHelpSection.test.tsx tests/components/ProfileSection.test.tsx`
    Expected: All targeted component suites pass for the refreshed portal slices.
    Evidence: .sisyphus/evidence/task-15-vitest.txt

  Scenario: Nav ownership assertions remain green after all route refreshes
    Tool: Bash
    Steps: Run `npx vitest run tests/lib/nav.test.ts`
    Expected: Canonical nav contract assertions still pass after all route-level changes.
    Evidence: .sisyphus/evidence/task-15-nav.txt
  ```

  **Commit**: YES | Message: `test(portal): refresh route contracts` | Files: `tests/components/*`, `tests/lib/nav.test.ts`, any route-local test helpers only

- [ ] 16. Refresh Playwright regressions, cutover smoke, and full validation gate

  **What to do**: Update browser-level regression coverage to reflect the refreshed shell and routes, then run the repo quality gate. Ensure desktop core-route smoke, mobile shell smoke, accessibility smoke, and vinext pilot smoke still prove the shared-shell contract after the redesign.
  **Must NOT do**: Do not rely on manual QA in place of browser automation. Do not stop at targeted spec success; this task is incomplete until the final repo gate is recorded.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — this is the end-to-end verification and stabilization gate.
  - Skills: [`wcag-accessibility`] — browser a11y expectations are part of the gate.
  - Omitted: `frontend-design` — verification only.

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: `F1-F4` | Blocked By: `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`

  **References**:
  - Test: `e2e/core-route-regression.spec.ts:134` — desktop authenticated shell route smoke.
  - Test: `e2e/mobile-dashboard-nav.spec.ts:217` — mobile dashboard + overflow navigation smoke.
  - Test: `e2e/a11y.spec.ts:58` — portal accessibility smoke including PinScreen and logged-in routes.
  - Pattern: `playwright.config.ts:18` — dual `chromium` and `vinext-chromium` project split.
  - API/Type: `package.json:22` — final `validate` command that must be recorded as the closing gate.

  **Acceptance Criteria**:
  - [ ] Desktop core-route browser smoke reflects the refreshed shell and still passes.
  - [ ] Mobile dashboard/nav smoke reflects the refreshed mobile shell and still passes.
  - [ ] Accessibility smoke passes for portal entry and refreshed authenticated routes.
  - [ ] Vinext pilot smoke and the full `npm run validate` gate complete successfully with saved evidence.

  **QA Scenarios**:
  ```text
  Scenario: Browser regression suite passes for desktop, mobile, and accessibility paths
    Tool: Bash
    Steps: Run `npx playwright test e2e/core-route-regression.spec.ts e2e/mobile-dashboard-nav.spec.ts e2e/a11y.spec.ts --project=chromium`
    Expected: All selected Chromium browser specs pass for the refreshed portal.
    Evidence: .sisyphus/evidence/task-16-playwright.txt

  Scenario: Vinext smoke and full validation remain green after the refresh
    Tool: Bash
    Steps: Run `npx playwright test e2e/vinext-pilot.spec.ts e2e/vinext-pilot-a11y.spec.ts --project=vinext-chromium && npm run validate`
    Expected: Vinext pilot smoke passes and the repo-wide validation gate completes successfully.
    Evidence: .sisyphus/evidence/task-16-validate.txt
  ```

  **Commit**: YES | Message: `test(e2e): refresh portal regression gate` | Files: `e2e/*.spec.ts`, `playwright.config.ts` if needed, evidence docs only

## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> Do NOT auto-proceed after verification. Wait for the user's explicit approval before marking work complete.
> Never mark F1-F4 as checked before getting user's okay. Rejection or feedback -> fix -> re-run -> present again -> wait for okay.
- [ ] F1. Plan Compliance Audit — oracle
- [ ] F2. Code Quality Review — unspecified-high
- [ ] F3. Real Manual QA — unspecified-high (+ Playwright if UI)
- [ ] F4. Scope Fidelity Check — deep

## Commit Strategy
- Use one green commit per numbered task; do not batch by wave.
- Commit only after the task's targeted tests/evidence pass.
- Keep commit scopes route- or concern-specific so rollback does not unwind unrelated refresh work.

## Success Criteria
- The refreshed portal is visibly upgraded without changing the product's behavioral contracts.
- Shell, session, nav, i18n, and cutover metadata remain stable.
- Hybrid styling stays intentional: StyleX foundation, Styled Components exceptions, no subtree ownership conflicts.
- All in-scope routes have executable evidence and the repo-level validation gate passes.
