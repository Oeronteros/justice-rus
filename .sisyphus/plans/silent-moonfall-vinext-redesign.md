# Silent Moonfall Vinext Redesign And Expansion

## TL;DR
> **Summary**: Rebuild the Silent Moonfall portal on the Vinext pilot runtime, replace the mixed legacy styling stack with StyleX-first primitives, migrate every portal route behind a redesigned responsive shell, and add first-version charts, notifications, chat, Discord bridge, reminders, and personalization without changing the core validation toolchain.
> **Deliverables**:
> - Vinext-first portal shell with responsive hybrid navigation, theme toggle, and animated transitions
> - Migrated and redesigned route families with route-parity tracking and cutover readiness
> - Production-ready first versions of charts, notification preferences, guild signal center, portal chat, Discord bridge, reminder flows, and profile personalization
> - Legacy style/runtime removal for the portal surface and cutover scaffolding after parity is proven
> - Agent-executable verification via existing Vitest, Playwright, build, and CI gates
> **Effort**: XL
> **Parallel**: YES - 4 waves
> **Critical Path**: 1 -> 2 -> 3 -> 4 -> 6 -> 8 -> 10 -> 12 -> 13 -> 14

## Context
### Original Request
Redesign and improve the Silent Moonfall guild website so it feels modern, responsive, animated, and feature-rich after the migration away from the older React/Next/Tailwind implementation. The requested scope includes Vinext + StyleX cleanup, theme switching, charts, notifications, guild signals, chat + Discord sync, external integrations/reminders, profile personalization, and performance upgrades.

### Interview Summary
- Release target: `apps/portal-vinext` is the first-release runtime target.
- Milestone one scope: include all requested extras, not just redesign-only work.
- Legacy cleanup: full removal now, interpreted as portal-surface and cutover-related legacy layers rather than unrelated repo-wide cleanup.
- Test strategy: minimal net-new automation, but every risky seam still gets executable agent QA.

### Metis Review (gaps addressed)
- Treat the work as a migration program with explicit route parity, rollback, and deletion gates.
- Sequence shell/tokens/navigation before route migration and integrations.
- Separate redesign-safe UI work from logic-fragile domains such as notifications, reminders, Discord bridge, and chat.
- Define concrete selectors, evidence files, and failure scenarios instead of visual-only acceptance.
- Do not remove legacy styling or cutover artifacts until Vinext parity is proven for the affected route families.

## Work Objectives
### Core Objective
Deliver a Vinext-hosted Silent Moonfall portal that fully replaces the current portal experience for targeted route families, preserves the current information architecture where possible, modernizes the visual system around StyleX, and ships first-version communication/integration features with bounded risk.

### Deliverables
- Vinext app shell, auth/session boundary, provider composition, section registry, and route family ownership
- StyleX token/theme system with light/dark themes and reusable design primitives
- Responsive horizontal/vertical navigation with motion, tooltips, and submenu behavior
- Migrated route families for dashboard/about, news, help, guides, profile, absences, pvp, schedule, calendar, analytics, workflow, integrations, and notifications surfaces
- Chart-driven analytics panels using `Chart.js`, lazy loaded by route
- Browser notifications + web-push-ready notification center with user preferences and guild signal feed
- Portal-owned chat with Discord bridge, delivery dedupe, and failure handling
- External integration adapter layer for Discord, calendar reminders, and a gated game/platform adapter path
- Portal-surface legacy CSS/styled-components/tailwind-compat removal and cutover simplification

### Definition of Done (verifiable conditions with commands)
- `npm --prefix apps/portal-vinext run build` exits `0`.
- `npx playwright test -c playwright.vinext.config.ts` exits `0` for the migrated route set.
- `npm run test` exits `0`.
- `npm run type-check` exits `0`.
- `npm run cutover:verify` exits `0` for the final Vinext route scope.
- `npm run validate` exits `0` after the migration and legacy cleanup wave.

### Must Have
- Vinext remains the runtime target for all portal-facing redesigned routes.
- Existing route/section naming conventions from `lib/nav.ts` and `types/index.ts` remain the baseline unless the plan explicitly changes them.
- StyleX becomes the only approved styling mechanism for new portal UI in Vinext.
- Charts use `Chart.js` rather than `D3.js` to minimize custom rendering overhead.
- Existing React Query patterns remain the default client data layer; `Zustand` is not introduced.
- Personalization means profile classes, titles, prefixes, interests, notification preferences, and heuristic recommendations based on tagged content/events, not ML ranking.
- Chat source of truth is the portal datastore/API; Discord is an asynchronous bridge, not the canonical primary store.
- External game/platform integration is implemented through a provider adapter boundary; if no stable game API is available during execution, ship the adapter scaffold and keep that provider feature-flagged while still shipping reminders and Discord/calendar integrations.

### Must NOT Have (guardrails, AI slop patterns, scope boundaries)
- No simultaneous redesign of root Next app and Vinext app as equal first-class targets.
- No new core test framework, state library, or styling library.
- No full repo-wide cleanup unrelated to portal runtime, portal styles, or cutover ownership.
- No business-critical behavior changes to existing domain rules without explicit route-level migration tasks.
- No placeholder selectors, vague QA steps, or human-only visual signoff.

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- Test decision: minimal additions on top of existing `Vitest` + `Playwright` + `axe` + lint/typecheck/build gates
- QA policy: every task includes one happy-path and one failure/edge scenario with exact selectors/commands
- Evidence: `.sisyphus/evidence/task-{N}-{slug}.{ext}`

## Execution Strategy
### Parallel Execution Waves
> Target: 5-8 tasks per wave. Shared infrastructure is extracted into Wave 1 for maximum safe parallelism.

Wave 1: foundation and migration controls (`1`, `2`, `3`, `4`, `5`)
Wave 2: route-family migration and redesign (`6`, `7`, `8`, `9`)
Wave 3: communication and integration features (`10`, `11`, `12`)
Wave 4: optimization, deletion, release hardening (`13`, `14`)

### Dependency Matrix (full, all tasks)
| Task | Depends On | Unlocks |
|---|---|---|
| 1 | none | 2, 3, 6, 7, 8, 9, 14 |
| 2 | 1 | 3, 4, 6, 7, 8, 9, 13 |
| 3 | 1, 2 | 4, 5, 6, 7, 8, 9, 10, 11 |
| 4 | 2, 3 | 6, 7, 8, 9 |
| 5 | 3 | 6, 7, 8, 9 |
| 6 | 1, 2, 3, 4, 5 | 13, 14 |
| 7 | 1, 2, 3, 4, 5 | 10, 12, 13, 14 |
| 8 | 1, 2, 3, 4, 5 | 10, 11, 12, 13, 14 |
| 9 | 1, 2, 3, 4, 5 | 12, 13, 14 |
| 10 | 3, 7, 8 | 12, 13, 14 |
| 11 | 3, 8 | 12, 13, 14 |
| 12 | 7, 8, 9, 10, 11 | 13, 14 |
| 13 | 2, 6, 7, 8, 9, 10, 11, 12 | 14 |
| 14 | 1, 6, 7, 8, 9, 10, 11, 12, 13 | F1-F4 |

### Agent Dispatch Summary (wave → task count → categories)
- Wave 1 -> 5 tasks -> `deep`, `visual-engineering`, `unspecified-high`
- Wave 2 -> 4 tasks -> `visual-engineering`, `deep`, `unspecified-high`
- Wave 3 -> 3 tasks -> `deep`, `unspecified-high`
- Wave 4 -> 2 tasks -> `deep`, `unspecified-high`

## TODOs
> Implementation + Test = ONE task. Never separate.
> EVERY task MUST have: Agent Profile + Parallelization + QA Scenarios.

- [x] 1. Establish Vinext route-parity and cutover manifest

  **What to do**: Create `docs/vinext-route-parity.md` as the implementation inventory that maps every current portal route, owning section key, auth requirement, data dependencies, target Vinext route, and deletion gate. Formalize the final release scope as `VINEXT_CUTOVER_SCOPE=all` with an explicit parity checklist for `/`, `/about`, `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`, `/analytics`, `/workflow`, and `/integrations`. Add a rollback section using the existing cutover commands so execution agents never guess rollout order.
  **Must NOT do**: Do not migrate UI yet; do not delete any legacy route or rewrite until parity artifacts are complete.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: this task fixes the migration contract that every later task depends on.
  - Skills: [`aif-best-practices`] — document exact ownership, guards, and rollback criteria without ambiguity.
  - Omitted: [`frontend-design`] — no visual work is required here.

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: `2`, `3`, `6`, `7`, `8`, `9`, `14` | Blocked By: none

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `README.md` — existing cutover wave definitions and rollback commands to preserve.
  - Pattern: `lib/platform/vinext-cutover.ts` — current path-based cutover scaffold that defines runtime ownership.
  - Pattern: `lib/nav.ts` — current route-to-section registry baseline.
  - API/Type: `types/index.ts` — `Section` naming contract for route parity.
  - Pattern: `app/(portal)/page.tsx` — canonical route wrapper pattern.
  - Test: `playwright.vinext.config.ts` — Vinext-specific verification lane.

  **Acceptance Criteria** (agent-executable only):
  - [ ] `docs/vinext-route-parity.md` exists and enumerates every target route listed in this task, with cutover owner, blockers, and rollback command for each route family.
  - [ ] `npm run cutover:verify` exits `0` when configured for the final target scope and matches the new parity artifact.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@route-parity"` exits `0` and produces `.sisyphus/evidence/task-1-route-parity.json`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path route parity audit
    Tool: Playwright
    Steps: Launch the vinext cutover scope defined by the artifact; visit `/news`, `/guides`, `/profile`, and `/schedule`; assert `[data-testid="runtime-badge"]` shows `vinext`; assert `[data-testid="section-key"]` matches `news`, `guides`, `profile`, and `schedule`.
    Expected: Every sampled route resolves to Vinext and exposes the expected section key without redirect loops.
    Evidence: .sisyphus/evidence/task-1-route-parity.json

  Scenario: Failure path rollback audit
    Tool: Bash
    Steps: Simulate a failed parity check by running the documented rollback command; re-run route verification for `/news` and `/schedule`.
    Expected: Routes return to the documented fallback runtime without broken responses, and the rollback command is copy-paste valid.
    Evidence: .sisyphus/evidence/task-1-route-parity-rollback.txt
  ```

  **Commit**: YES | Message: `chore(cutover): define vinext parity manifest` | Files: `README.md`, `docs/vinext-staging-cutover.md`, `docs/vinext-route-parity.md`, `lib/platform/vinext-cutover.ts`

- [x] 2. Build StyleX token system and cross-theme primitives for Vinext

  **What to do**: Consolidate the visual system for the Vinext app around StyleX tokens, two first-class themes, and reusable primitives for page chrome, cards, buttons, panels, forms, and overlays. Port only the portal-surface design language needed for the migration and define exact design tokens for color, typography, spacing, elevation, motion, and state styles. Every new Vinext screen must consume these primitives rather than ad-hoc CSS.
  **Must NOT do**: Do not keep styled-components or Tailwind-compat patterns alive inside Vinext; do not rely on `app/globals.css` for new component styling.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: this task establishes the visual and theming foundation for every migrated route.
  - Skills: [`frontend-design`, `visual-design-system`, `mobile-responsive-ux`] — needed for non-generic tokens, component primitives, and responsive baselines.
  - Omitted: [`toast-notification-patterns`] — notifications are not in scope for this foundation layer.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `3`, `4`, `6`, `7`, `8`, `9`, `13` | Blocked By: `1`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `lib/stylex/tokens.stylex.ts` — existing token source to evolve, not bypass.
  - Pattern: `components/theme/AppThemeBoundary.tsx` — current theme application boundary.
  - Pattern: `app/layout.stylex.ts` — root StyleX layout style patterns.
  - Pattern: `app/globals.css` — legacy visual behaviors that must be consciously ported or removed.
  - Pattern: `app/tailwind-compat.css` — compatibility layer to retire after replacement parity.
  - Test: `e2e/a11y.spec.ts` — accessibility expectations to preserve in themed components.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Vinext build output uses StyleX-backed tokens for both `light` and `dark` themes and exposes a working `[data-testid="theme-toggle"]` control.
  - [ ] `npm --prefix apps/portal-vinext run build` exits `0` after removing new portal dependencies on legacy style layers.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@theme-primitives"` exits `0` and captures `.sisyphus/evidence/task-2-theme-primitives.html`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path theme switch
    Tool: Playwright
    Steps: Open the Vinext shell, click `[data-testid="theme-toggle"]`, inspect `[data-testid="portal-shell"]` and `[data-testid="surface-card"]`.
    Expected: `data-theme` changes from `dark` to `light`, surfaces update without layout shift, and contrast assertions pass through the existing axe helper.
    Evidence: .sisyphus/evidence/task-2-theme-primitives.html

  Scenario: Failure path legacy style leak
    Tool: Playwright
    Steps: Visit `/news` and `/profile` in Vinext, read the computed styles for `[data-testid="portal-shell"]` and `[data-testid="primary-button"]`, and verify no class names from the Tailwind compatibility layer are present.
    Expected: The inspected nodes are StyleX-driven only and do not inherit deprecated compatibility classes.
    Evidence: .sisyphus/evidence/task-2-theme-primitives-error.json
  ```

  **Commit**: YES | Message: `feat(stylex): establish vinext themes and primitives` | Files: `apps/portal-vinext`, `lib/stylex/tokens.stylex.ts`, `lib/stylex/primitives.stylex.ts`, `components/theme/AppThemeBoundary.tsx`

- [ ] 3. Port provider, auth, and shell boundaries into the Vinext app

  **What to do**: Recreate the portal runtime boundary inside Vinext by porting the provider stack, auth/session bootstrap, shell mount points, and runtime diagnostics needed for parity checks. The Vinext shell must provide `ThemeProvider`, `QueryProvider`, i18n, auth context, runtime badge, and a stable root element for every downstream page.
  **Must NOT do**: Do not fork business logic; reuse shared auth/query/i18n contracts where possible instead of duplicating server/client state code.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: this task touches runtime composition, auth/session flow, and shared providers.
  - Skills: [`react-ux-patterns`, `page-structure-patterns`] — needed for provider composition and shell structure without regressions.
  - Omitted: [`frontend-design`] — visual specifics are already handled by task `2`.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11` | Blocked By: `1`, `2`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `app/layout.tsx` — provider composition and root bootstrapping.
  - Pattern: `app/(portal)/layout.tsx` — authenticated portal boundary and initial user hydration.
  - Pattern: `components/shell/PortalShell.tsx` — current auth gate and shell orchestration.
  - Pattern: `lib/providers/QueryProvider.tsx` — React Query singleton and cache policy.
  - Pattern: `lib/auth/context.tsx` — client auth contract.
  - Pattern: `lib/i18n/copy.ts` — centralized copy source the shell must continue using.

  **Acceptance Criteria** (agent-executable only):
  - [ ] All Vinext portal routes render under a single `[data-testid="portal-shell"]` root with active auth, query, theme, and i18n providers.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@shell-auth"` exits `0` and proves authenticated and unauthenticated states are handled in Vinext.
  - [ ] `npx vitest run tests/components/Header.test.tsx tests/components/PinScreen.test.tsx --reporter=dot` exits `0` for provider/auth boundary coverage.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path authenticated shell
    Tool: Playwright
    Steps: Start Vinext with a seeded authenticated session; open `/news`; assert `[data-testid="portal-shell"]`, `[data-testid="runtime-badge"]`, `[data-testid="auth-user-menu"]`, and `[data-testid="portal-nav"]` are visible.
    Expected: The route loads under Vinext with the authenticated shell and no redirect to legacy runtime.
    Evidence: .sisyphus/evidence/task-3-shell-auth.png

  Scenario: Failure path expired session
    Tool: Playwright
    Steps: Clear auth storage/cookies; open `/profile`; inspect `[data-testid="pin-screen"]` and `[data-testid="auth-error"]`.
    Expected: Vinext shows the unauthenticated boundary gracefully and does not crash or expose stale account data.
    Evidence: .sisyphus/evidence/task-3-shell-auth-error.png
  ```

  **Commit**: YES | Message: `feat(vinext): port shell provider boundaries` | Files: `apps/portal-vinext`, `lib/providers/QueryProvider.tsx`, `lib/auth/context.tsx`, `lib/i18n/copy.ts`

- [ ] 4. Implement hybrid navigation, motion system, and shell responsiveness in Vinext

  **What to do**: Build the redesigned navigation shell in Vinext using the current section registry as the source of truth. Desktop must render a horizontal top navigation with icons, grouped submenus, and tooltips; mobile must render a vertical drawer or stacked nav with the same information architecture. Add route transitions and section-level motion using `Framer Motion`, but keep durations bounded and disable non-essential animation for reduced-motion users.
  **Must NOT do**: Do not rename routes or section keys unless task `1` explicitly called for it; do not create a second navigation registry.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: this is a shell UX and responsive interaction task.
  - Skills: [`navigation-patterns`, `interaction-patterns`, `mobile-responsive-ux`, `keyboard-shortcuts-patterns`] — needed for multi-device nav quality and accessibility.
  - Omitted: [`detail-page-patterns`] — feature-page composition is not the goal here.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `6`, `7`, `8`, `9` | Blocked By: `2`, `3`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `components/shell/MainLayout.tsx` — existing nav/layout orchestration, shell tones, and motion hooks.
  - Pattern: `lib/nav.ts` — desktop/mobile groupings and aliases that must remain canonical.
  - API/Type: `types/index.ts` — section-key contract.
  - Pattern: `lib/i18n/copy.ts` — shell labels and tooltips.
  - Test: `e2e/mobile-dashboard-nav.spec.ts` — current mobile nav expectations to exceed, not regress.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Desktop Vinext shell renders `[data-testid="nav-horizontal"]` with grouped submenu triggers and icon-bearing links for every section group.
  - [ ] Mobile Vinext shell renders `[data-testid="nav-mobile-drawer"]` with keyboard and pointer-operable disclosure controls.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@vinext-nav"` exits `0` and records `.sisyphus/evidence/task-4-vinext-nav.html`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path desktop and mobile navigation
    Tool: Playwright
    Steps: Open `/news` at desktop width and assert `[data-testid="nav-horizontal"]`; hover `[data-testid="nav-group-community"]`; confirm `[data-testid="submenu-community"]` opens with links to `/news`, `/help`, and `/guides`; switch to mobile width, tap `[data-testid="mobile-nav-toggle"]`, and assert `[data-testid="nav-mobile-drawer"]` shows the same destinations.
    Expected: Both breakpoints expose the same IA, tooltips, and icons without overlap or clipped focus states.
    Evidence: .sisyphus/evidence/task-4-vinext-nav.html

  Scenario: Failure path reduced-motion and focus management
    Tool: Playwright
    Steps: Emulate `prefers-reduced-motion`; navigate from `/news` to `/guides`; tab through `[data-testid="nav-horizontal"]` and the mobile drawer controls.
    Expected: Motion-heavy transitions are suppressed, focus remains visible, and submenu disclosure state is fully keyboard-operable.
    Evidence: .sisyphus/evidence/task-4-vinext-nav-error.json
  ```

  **Commit**: YES | Message: `feat(shell): add vinext hybrid navigation` | Files: `apps/portal-vinext`, `lib/nav.ts`, `lib/i18n/copy.ts`, `e2e/mobile-dashboard-nav.spec.ts`

- [ ] 5. Port shared feature adapters and server contracts for Vinext consumption

  **What to do**: Create the shared adapter layer that allows Vinext routes to consume existing query hooks, client API wrappers, schemas, and server route contracts without cloning business logic. Normalize section-level data loading, optimistic mutations, permission checks, and read-model access so all later route migrations plug into one shared pattern.
  **Must NOT do**: Do not duplicate `lib/server/*` domain rules inside Vinext; do not bypass existing route helpers or invent a second API envelope.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: this task stabilizes how Vinext talks to existing domain logic.
  - Skills: [`react-ux-patterns`, `aif-best-practices`] — needed to preserve React Query and API-layer conventions.
  - Omitted: [`frontend-design`] — this is a data-contract task, not a visual task.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: `6`, `7`, `8`, `9` | Blocked By: `3`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `lib/news/hooks.ts` — representative query-key, mutation, and prefetch pattern.
  - Pattern: `lib/api/news.ts` — client API wrapper conventions.
  - Pattern: `app/api/news/route.ts` — thin transport-layer route shape.
  - Pattern: `lib/server/route-helpers.ts` — shared validation/error/permission envelope.
  - Pattern: `lib/server/news/service.ts` — domain service boundary to reuse.
  - Pattern: `ARCHITECTURE.md` — repo-level data flow and read-model expectations.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Vinext route modules use one shared adapter pattern for queries/mutations and do not duplicate domain services.
  - [ ] `npx vitest run tests/api tests/lib --reporter=dot` exits `0` after adapter extraction or reuse changes.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@vinext-data-adapter"` exits `0` and writes `.sisyphus/evidence/task-5-vinext-adapter.txt`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path shared adapter fetch and mutate
    Tool: Playwright
    Steps: Open `/news`; assert `[data-testid="news-list"]` renders; create a test draft via `[data-testid="news-create-button"]`; confirm `[data-testid="toast-region"]` contains `Saved` and the new row appears.
    Expected: The Vinext route uses the shared query/mutation contract and updates UI without a full reload.
    Evidence: .sisyphus/evidence/task-5-vinext-adapter.txt

  Scenario: Failure path permission envelope
    Tool: Playwright
    Steps: Log in as a non-officer test user; open `/analytics` or attempt an officer-only mutation from `/news`; inspect `[data-testid="permission-error"]`.
    Expected: The Vinext UI surfaces the existing permission envelope cleanly and does not expose a raw server error.
    Evidence: .sisyphus/evidence/task-5-vinext-adapter-error.txt
  ```

  **Commit**: YES | Message: `refactor(vinext): share feature data adapters` | Files: `apps/portal-vinext`, `lib/api`, `lib/server`, `lib/news/hooks.ts`, `tests/api/schedule-route.test.ts`

- [ ] 6. Migrate and redesign the content routes for about, news, help, and guides

  **What to do**: Rebuild the high-visibility content routes on Vinext using the new shell and StyleX primitives. The redesign should keep the current content model and role-based actions intact while modernizing hero treatment, list/detail transitions, empty states, mobile layout, and editorial affordances. Include `/`, `/about`, `/news`, `/help`, and `/guides` as one coherent content family.
  **Must NOT do**: Do not change news/help/guides business rules, moderation permissions, or data contracts beyond what task `5` already standardized.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: this is a route-family UI rebuild with responsive editorial layouts.
  - Skills: [`frontend-design`, `detail-page-patterns`, `list-page-patterns`, `wcag-accessibility`] — needed for polished list/detail UX and accessibility.
  - Omitted: [`toast-notification-patterns`] — notification center work is handled later.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14` | Blocked By: `1`, `2`, `3`, `4`, `5`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `components/sections/news/index.tsx` — current news section behavior and role-based actions.
  - Pattern: `components/sections/guides/index.tsx` — current guides route behavior.
  - Pattern: `app/(portal)/news/page.tsx` — route wrapper convention.
  - Pattern: `lib/i18n/copy.ts` — route labels and copy sourcing.
  - Test: `e2e/core-route-regression.spec.ts` — current route smoke structure.

  **Acceptance Criteria** (agent-executable only):
  - [ ] `/`, `/about`, `/news`, `/help`, and `/guides` all render in Vinext with responsive list/detail layouts and no legacy runtime fallback.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@content-routes"` exits `0` and captures `.sisyphus/evidence/task-6-content-routes.html`.
  - [ ] `npm --prefix apps/portal-vinext run build` exits `0` after these routes are migrated.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path content route family
    Tool: Playwright
    Steps: Visit `/news`; assert `[data-testid="news-hero"]`, `[data-testid="news-list"]`, and `[data-testid="news-detail-panel"]`; open `/guides`; assert `[data-testid="guides-grid"]`; open `/help`; assert `[data-testid="help-request-list"]`; open `/about`; assert `[data-testid="about-guild-overview"]`.
    Expected: Every route renders in Vinext with responsive layouts and stable navigation breadcrumbs.
    Evidence: .sisyphus/evidence/task-6-content-routes.html

  Scenario: Failure path empty and missing content states
    Tool: Playwright
    Steps: Seed empty data for guides and help; open `/guides` and `/help`; inspect `[data-testid="empty-state"]` and `[data-testid="create-first-item"]`.
    Expected: Empty states are intentional, themed, and actionable instead of blank pages or server errors.
    Evidence: .sisyphus/evidence/task-6-content-routes-error.html
  ```

  **Commit**: YES | Message: `feat(vinext): migrate content route family` | Files: `apps/portal-vinext`, `components/sections/news/index.tsx`, `components/sections/guides/index.tsx`, `e2e/core-route-regression.spec.ts`

- [ ] 7. Migrate member routes for profile, absences, and pvp with first-version personalization

  **What to do**: Rebuild `/profile`, `/absences`, and `/pvp` in Vinext with the new design system and add the agreed first-version personalization model: editable titles, prefixes, class selection, interests, notification defaults, and recommendation tags. Recommendations must remain heuristic and tag-based, derived from profile interests and event/content metadata, not machine-learning or opaque ranking.
  **Must NOT do**: Do not invent new account roles, ranking formulas, or irreversible schema changes outside the existing account/profile domain contracts.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: this combines profile UX, forms, domain constraints, and responsive redesign.
  - Skills: [`form-patterns`, `detail-page-patterns`, `mobile-responsive-ux`] — needed for settings-heavy views and profile editing ergonomics.
  - Omitted: [`comparison-patterns`] — no side-by-side comparison UI is needed.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `10`, `12`, `13`, `14` | Blocked By: `1`, `2`, `3`, `4`, `5`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `components/sections/profile/index.tsx` — existing profile UX and field contracts.
  - Pattern: `components/sections/absences/index.tsx` — absence-request flows to preserve.
  - Pattern: `components/sections/pvp/index.tsx` — PVP registration/statistics behavior to preserve.
  - Pattern: `lib/auth/context.tsx` — current user/session state exposure.
  - Test: `tests/components/ProfileSection.test.tsx` — existing profile interaction testing style.
  - Test: `tests/components/PvpSection.test.tsx` — existing PVP interaction testing style.

  **Acceptance Criteria** (agent-executable only):
  - [ ] `/profile`, `/absences`, and `/pvp` render in Vinext and preserve existing role/permission behavior.
  - [ ] Profile personalization fields persist successfully and drive recommendation tags visible in the profile dashboard.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@member-routes"` exits `0` and writes `.sisyphus/evidence/task-7-member-routes.json`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path profile personalization
    Tool: Playwright
    Steps: Open `/profile`; set `[data-testid="profile-title-input"]` to `Moonblade`, `[data-testid="profile-prefix-input"]` to `SM`, select classes in `[data-testid="class-multiselect"]`, and save via `[data-testid="profile-save"]`.
    Expected: A success toast appears in `[data-testid="toast-region"]`, saved values persist after reload, and `[data-testid="recommendation-chip-list"]` shows tags derived from the selected interests/classes.
    Evidence: .sisyphus/evidence/task-7-member-routes.json

  Scenario: Failure path invalid profile update
    Tool: Playwright
    Steps: Submit `/profile` with an overlong prefix or an empty required class selection; inspect `[data-testid="field-error-prefix"]` and `[data-testid="form-error-summary"]`.
    Expected: Validation blocks submission with clear inline and summary errors, and no partial save occurs.
    Evidence: .sisyphus/evidence/task-7-member-routes-error.json
  ```

  **Commit**: YES | Message: `feat(vinext): migrate member routes and personalization` | Files: profile/absences/pvp Vinext routes, related shared profile logic, tests

- [ ] 8. Migrate schedule, calendar, dashboard, and analytics surfaces with lazy-loaded charts

  **What to do**: Rebuild `/schedule`, `/calendar`, `/dashboard`, and `/analytics` in Vinext with responsive density-aware layouts and first-version charting using `Chart.js`. Keep existing schedule and analytics semantics, but modernize information hierarchy, event cards, hero summaries, and chart affordances. Charts must be lazy loaded, empty-state aware, and bounded to known datasets from existing read-models.
  **Must NOT do**: Do not introduce `D3.js`, custom SVG chart engines, or unbounded client-side data fetching.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: this is a data-dense route family with chart UX, responsive layout, and performance constraints.
  - Skills: [`data-density-patterns`, `frontend-design`, `detail-page-patterns`, `mobile-responsive-ux`] — needed for dense dashboards that still work on mobile.
  - Omitted: [`editor-workspace-patterns`] — no multi-document editor UI is required.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `10`, `11`, `12`, `13`, `14` | Blocked By: `1`, `2`, `3`, `4`, `5`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `components/sections/schedule/index.tsx` — schedule interaction and state expectations.
  - Pattern: `components/sections/dashboard/index.tsx` — dashboard composition baseline.
  - Pattern: `lib/server/read-models/schedule.ts` — schedule data/read-model boundary.
  - Pattern: `ARCHITECTURE.md` — read-model and cache expectations for analytics-heavy views.
  - Test: `docs/test-target-breakpoint-matrix.md` — breakpoint coverage gaps to close in this route family.

  **Acceptance Criteria** (agent-executable only):
  - [ ] `/schedule`, `/calendar`, `/dashboard`, and `/analytics` run in Vinext with lazy-loaded chart modules and responsive layouts at mobile and desktop widths.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@ops-routes"` exits `0` and writes `.sisyphus/evidence/task-8-ops-routes.html`.
  - [ ] `npx vitest run tests/components/DashboardSection.test.tsx tests/components/ScheduleHelpSection.test.tsx --reporter=dot` exits `0` for chart/data route coverage.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path schedule and charts
    Tool: Playwright
    Steps: Open `/dashboard`; assert `[data-testid="dashboard-chart-attendance"]` is visible only after `[data-testid="chart-loading"]` resolves; open `/schedule`; assert `[data-testid="event-list"]`; open `/analytics`; assert `[data-testid="analytics-chart-pvp"]` and `[data-testid="analytics-chart-attendance"]`.
    Expected: Charts lazy load without blocking shell render, data cards remain readable on mobile, and route transitions stay smooth.
    Evidence: .sisyphus/evidence/task-8-ops-routes.html

  Scenario: Failure path empty/error chart state
    Tool: Playwright
    Steps: Stub an empty analytics dataset and a failed schedule read; open `/analytics` and `/schedule`; inspect `[data-testid="chart-empty-state"]` and `[data-testid="schedule-error-banner"]`.
    Expected: Empty datasets render intentional fallback UI, failed fetches show recoverable errors, and the shell remains interactive.
    Evidence: .sisyphus/evidence/task-8-ops-routes-error.html
  ```

  **Commit**: YES | Message: `feat(vinext): migrate schedule dashboard analytics` | Files: dashboard/schedule/calendar/analytics Vinext routes, chart components, targeted tests

- [ ] 9. Migrate officer operations routes for workflow, integrations, and command surfaces

  **What to do**: Rebuild the officer-facing operational surfaces in Vinext for `/workflow` and `/integrations`, and expose a consistent command surface for alerts, automations, and integration health within the redesigned shell. Use the new design system and shared adapters, but keep the current admin-only boundaries and command semantics intact.
  **Must NOT do**: Do not introduce new officer roles, approval rules, or automation logic beyond what is needed to render and manage the existing operational surfaces.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: these screens mix dense operations UI, permissions, and system-state presentation.
  - Skills: [`page-structure-patterns`, `detail-page-patterns`, `data-density-patterns`] — needed for admin-heavy views without clutter.
  - Omitted: [`frontend-design`] — visual primitives already exist from earlier tasks.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: `13`, `14` | Blocked By: `1`, `2`, `3`, `4`, `5`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `app/(portal)/workflow/page.tsx` — current route presence to preserve in Vinext.
  - Pattern: `app/(portal)/integrations/page.tsx` — integration route baseline.
  - Pattern: `components/shell/MissionControl.tsx` — current shell-level operations affordance to reuse or replace intentionally.
  - Pattern: `components/sections/dashboard/GuildOperationsDeck.tsx` — existing officer operations UX concepts.
  - Pattern: `docs/core-module-inventory.md` — module responsibility inventory to preserve.

  **Acceptance Criteria** (agent-executable only):
  - [ ] `/workflow` and `/integrations` render in Vinext with admin-only access and system-state panels for automation/integration health.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@ops-admin-routes"` exits `0` and writes `.sisyphus/evidence/task-9-ops-admin.html`.
  - [ ] Non-officer access is rejected gracefully and consistently with the shared permission envelope.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path officer operations surface
    Tool: Playwright
    Steps: Log in as an officer; open `/workflow`; assert `[data-testid="workflow-automation-grid"]`; open `/integrations`; assert `[data-testid="integration-health-list"]` and `[data-testid="integration-discord-status"]`.
    Expected: Officer-only routes render actionable status panels and remain consistent with the Vinext shell.
    Evidence: .sisyphus/evidence/task-9-ops-admin.html

  Scenario: Failure path unauthorized access
    Tool: Playwright
    Steps: Log in as a normal member; open `/workflow` and `/integrations`; inspect `[data-testid="permission-error"]`.
    Expected: Access is denied without exposing operational details or crashing the route.
    Evidence: .sisyphus/evidence/task-9-ops-admin-error.html
  ```

  **Commit**: YES | Message: `feat(vinext): migrate officer operations routes` | Files: workflow/integrations Vinext routes, mission-control shell pieces, tests

- [ ] 10. Build notification center, guild signal feed, and browser delivery preferences

  **What to do**: Implement a Vinext notification center that combines in-app toasts, persistent preference controls, guild status signals, and browser notification delivery. Use the browser Notifications API plus a web-push-ready service worker boundary, but keep delivery semantics explicit: toast + center are immediate UI surfaces, browser notifications respect saved preferences, and guild signals are categorized feeds for events such as help requests, PvP activity, and officer alerts.
  **Must NOT do**: Do not assume every environment supports browser notifications or push; degraded mode must keep the notification center usable without service-worker delivery.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: this task spans UI, preference state, browser capability checks, and failure handling.
  - Skills: [`toast-notification-patterns`, `interaction-patterns`, `form-patterns`] — needed for feedback surfaces and preference UX.
  - Omitted: [`frontend-design`] — foundational visuals are already defined.

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: `12`, `13`, `14` | Blocked By: `3`, `7`, `8`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `lib/notifications/context.tsx` — current notification state and hook boundary.
  - Pattern: `components/notifications/ToastContainer.tsx` — current toast rendering pattern.
  - Pattern: `components/notifications/Toast.tsx` — current toast message composition.
  - Pattern: `components/shell/MissionControl.tsx` — existing shell-level operational feedback surface.
  - Pattern: `README.md` — current notification and operations expectations.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Vinext exposes `[data-testid="notification-center"]`, `[data-testid="guild-signal-feed"]`, and `[data-testid="notification-preferences-form"]` on authenticated routes.
  - [ ] Browser notification permission requests are gated behind `[data-testid="enable-browser-notifications"]` and respect saved user preferences.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@notifications"` exits `0` and captures `.sisyphus/evidence/task-10-notifications.html`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path notification preferences and signal delivery
    Tool: Playwright
    Steps: Open `/profile`; set preferences in `[data-testid="notification-preferences-form"]` to enable `help` and `pvp` but disable `officer`; trigger a seeded help event; inspect `[data-testid="toast-region"]`, `[data-testid="notification-center"]`, and the browser notification permission state.
    Expected: The help event appears in the toast region and center, browser delivery only triggers if permission was granted, and disabled categories remain muted.
    Evidence: .sisyphus/evidence/task-10-notifications.html

  Scenario: Failure path unsupported notifications
    Tool: Playwright
    Steps: Stub the browser without Notifications support; open the preferences UI and trigger a seeded PvP event.
    Expected: `[data-testid="notification-capability-warning"]` appears, the center still records the event, and no uncaught error occurs.
    Evidence: .sisyphus/evidence/task-10-notifications-error.html
  ```

  **Commit**: YES | Message: `feat(notifications): add guild signals and preferences` | Files: notification center UI, preference storage, browser delivery boundary, tests

- [ ] 11. Implement portal chat and asynchronous Discord bridge semantics

  **What to do**: Add a first-version portal chat experience inside Vinext with message list, composer, delivery state, unread indicators, and Discord bridge status. The portal remains the canonical message source; Discord sync is implemented as an asynchronous bridge with dedupe, delivery status, retry visibility, and explicit degraded-mode messaging when the Discord API is unavailable.
  **Must NOT do**: Do not make Discord the canonical chat source, do not require perfect bi-directional parity in the first release, and do not hide delivery failures.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: this is a logic-fragile real-time/integration task with state and outage handling.
  - Skills: [`interaction-patterns`, `toast-notification-patterns`, `aif-best-practices`] — needed for chat feedback and bridge correctness.
  - Omitted: [`comparison-patterns`] — no diff UI is needed.

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: `12`, `13`, `14` | Blocked By: `3`, `8`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `docs/discord-bot-integration.md` — integration contract and bot/API trust boundary.
  - Pattern: `lib/discord/api.ts` — current Discord API wrapper conventions.
  - Pattern: `lib/discord/hooks.ts` — client-side integration hook conventions.
  - Pattern: `ARCHITECTURE.md` — hybrid app/bot/data architecture to preserve.
  - Pattern: `README.md` — Discord bot and hybrid portal notes relevant to bridge semantics.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Vinext exposes `[data-testid="guild-chat-thread"]`, `[data-testid="chat-composer"]`, and `[data-testid="discord-bridge-status"]` on the chat surface.
  - [ ] Sending a message creates a portal message immediately and reflects Discord bridge status asynchronously without duplicate deliveries.
  - [ ] `npx vitest run tests/lib --reporter=dot` includes bridge dedupe/outage tests and exits `0`; `npx playwright test -c playwright.vinext.config.ts --grep "@chat-discord"` exits `0`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path portal-owned chat with bridge success
    Tool: Playwright
    Steps: Open the chat route; type `raid check in 15` into `[data-testid="chat-composer-input"]`; submit with `[data-testid="chat-send"]`; inspect `[data-testid="guild-chat-thread"]` and `[data-testid="discord-bridge-status"]`.
    Expected: The message appears instantly with a `sent` portal status, then transitions to `discord-synced` without duplication.
    Evidence: .sisyphus/evidence/task-11-chat-discord.html

  Scenario: Failure path Discord outage and retry
    Tool: Playwright
    Steps: Stub the Discord API as unavailable; send a message; inspect `[data-testid="discord-bridge-status"]` and `[data-testid="chat-delivery-error"]`; trigger retry via `[data-testid="chat-retry-send"]`.
    Expected: The portal message remains visible, the user sees a retryable degraded-state warning, and retries do not create duplicate portal rows.
    Evidence: .sisyphus/evidence/task-11-chat-discord-error.html
  ```

  **Commit**: YES | Message: `feat(chat): add portal chat with discord bridge` | Files: chat route/components, Discord bridge adapters, tests

- [ ] 12. Add external integration adapters, reminder delivery, and recommendation wiring

  **What to do**: Build the adapter boundary for external platforms and reminder delivery. Ship production-ready reminders for schedule/calendar events through in-app center plus browser/email/webhook-capable channels where supported, preserve existing Google/Outlook export expectations, and add a feature-flagged game/platform adapter slot. Recommendation wiring must consume the profile interests/tags from task `7` and schedule/news metadata from tasks `6` and `8`, surfacing deterministic recommendation cards instead of opaque ranking.
  **Must NOT do**: Do not hardcode a game-specific API contract unless a concrete documented endpoint is present during execution; do not block release on unavailable third-party credentials.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: this task coordinates integrations, scheduling logic, and deterministic recommendation rules.
  - Skills: [`react-ux-patterns`, `form-patterns`, `aif-best-practices`] — needed for adapter boundaries and deterministic preference-driven UX.
  - Omitted: [`frontend-design`] — presentation is secondary to contract and delivery correctness.

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: `13`, `14` | Blocked By: `7`, `8`, `9`, `10`, `11`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `README.md` — current Google/Outlook and integration roadmap expectations.
  - Pattern: `docs/discord-bot-integration.md` — external integration trust boundary reference.
  - Pattern: `app/(portal)/calendar/page.tsx` — calendar route baseline for reminder UX.
  - Pattern: `components/sections/profile/index.tsx` — source of personalization inputs.
  - Pattern: `lib/server/read-models/schedule.ts` — event metadata source for reminders and deterministic recommendations.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Reminder preferences, next-event reminders, and deterministic recommendation cards render in Vinext and respect saved profile interests.
  - [ ] External provider adapters are isolated behind explicit interfaces, and the game/platform adapter path is feature-flagged when no live provider is configured.
  - [ ] `npx vitest run tests/lib tests/api --reporter=dot` exits `0` for reminder scheduling, dedupe, and recommendation rules; `npx playwright test -c playwright.vinext.config.ts --grep "@reminders-recommendations"` exits `0`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path reminders and recommendations
    Tool: Playwright
    Steps: Open `/calendar`; enable `[data-testid="reminder-channel-browser"]` and `[data-testid="reminder-channel-email"]`; create or seed an upcoming event; open `/profile`; inspect `[data-testid="recommendation-card-list"]`.
    Expected: The event appears in `[data-testid="next-reminders-list"]`, delivery preferences persist, and recommendations match the user's saved interests and classes.
    Evidence: .sisyphus/evidence/task-12-reminders-recommendations.html

  Scenario: Failure path missing provider and timezone edge case
    Tool: Playwright
    Steps: Disable the external provider configuration; set a reminder in `Europe/Moscow` near a DST boundary equivalent test fixture; inspect `[data-testid="provider-warning"]` and `[data-testid="reminder-schedule-preview"]`.
    Expected: The provider adapter degrades gracefully behind a feature flag, reminder preview remains deterministic, and no duplicate or shifted delivery time is shown.
    Evidence: .sisyphus/evidence/task-12-reminders-recommendations-error.html
  ```

  **Commit**: YES | Message: `feat(integrations): add reminders adapters and recommendations` | Files: integration adapters, calendar/reminder UI, recommendation wiring, tests

- [ ] 13. Optimize Vinext performance, assets, and motion budgets for the migrated portal

  **What to do**: Apply the performance pass after route and feature parity exists. Convert portal imagery to WebP where beneficial, prefer SVG icons, lazy load heavy charts and chat panes, preload only the fonts used by the new shell, and cap transition durations so the shell feels polished without blocking interaction. Record explicit route-level budgets for shell render, chart hydration, and route transitions.
  **Must NOT do**: Do not perform speculative micro-optimizations before parity exists; do not preload unused assets or keep large chart bundles in the initial shell payload.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: this task mixes frontend runtime tuning, asset strategy, and route-level verification.
  - Skills: [`interaction-patterns`, `mobile-responsive-ux`, `frontend-design`] — needed for motion tuning and mobile-safe performance.
  - Omitted: [`toast-notification-patterns`] — notification UX is already implemented.

  **Parallelization**: Can Parallel: YES | Wave 4 | Blocks: `14` | Blocked By: `2`, `6`, `7`, `8`, `9`, `10`, `11`, `12`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `PERFORMANCE.md` — current performance strategy baseline.
  - Pattern: `next.config.ts` — image/runtime configuration baseline.
  - Pattern: `README.md` — stated performance goals and current build workflow.
  - Test: `playwright.vinext.config.ts` — final Vinext route verification lane.
  - Test: `docs/test-target-breakpoint-matrix.md` — breakpoint coverage to keep while tuning performance.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Heavy chart and chat bundles are lazy loaded and do not block `[data-testid="portal-shell"]` first render.
  - [ ] Route transitions remain under the plan-defined motion budget and assets load without layout jank on mobile and desktop.
  - [ ] `npm --prefix apps/portal-vinext run build` exits `0`, and `npx playwright test -c playwright.vinext.config.ts --grep "@performance-budget"` exits `0` with evidence.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path shell-first performance
    Tool: Playwright
    Steps: Open `/dashboard`; record the time until `[data-testid="portal-shell"]` is visible and separately until `[data-testid="dashboard-chart-attendance"]` is visible.
    Expected: The shell appears before chart hydration, and the measured values stay within the numeric budgets declared by the task implementation.
    Evidence: .sisyphus/evidence/task-13-performance-budget.json

  Scenario: Failure path mobile slow-network behavior
    Tool: Playwright
    Steps: Emulate a mobile viewport and constrained network; open `/news` then `/analytics`; inspect `[data-testid="route-transition-progress"]` and `[data-testid="chart-loading"]`.
    Expected: Progress/loading states remain usable, navigation does not freeze, and there is no cumulative layout shift that hides primary controls.
    Evidence: .sisyphus/evidence/task-13-performance-budget-error.json
  ```

  **Commit**: YES | Message: `perf(vinext): optimize assets and route budgets` | Files: Vinext routes/components, asset pipeline config, tests

- [ ] 14. Remove portal-surface legacy styling/runtime layers and finalize cutover

  **What to do**: After parity, integrations, and performance gates pass, remove the portal-surface legacy layers that are now superseded by Vinext and StyleX. This includes deleting obsolete dependencies on `app/globals.css`, `app/styled-components-registry.tsx`, and `app/tailwind-compat.css` for migrated portal surfaces, simplifying cutover rules so the Vinext runtime owns the planned routes, and removing any no-longer-needed bridge code that only existed to support the dual-runtime portal shell.
  **Must NOT do**: Do not delete shared code still required by non-portal or non-migrated surfaces; do not remove rollback instructions until final verification passes.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: this task is destructive cleanup with migration risk and requires proof-based deletion.
  - Skills: [`aif-best-practices`] — needed for safe deletion discipline and dependency cleanup.
  - Omitted: [`frontend-design`] — no new UI is introduced here.

  **Parallelization**: Can Parallel: NO | Wave 4 | Blocks: `F1`, `F2`, `F3`, `F4` | Blocked By: `1`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `app/globals.css` — legacy global style layer to retire for migrated portal surfaces.
  - Pattern: `app/styled-components-registry.tsx` — mixed styling/runtime artifact to remove when no longer needed.
  - Pattern: `app/tailwind-compat.css` — compatibility layer to delete after replacement parity.
  - Pattern: `lib/platform/vinext-cutover.ts` — final runtime ownership after cleanup.
  - Pattern: `README.md` — cutover commands and rollback documentation that must stay accurate.

  **Acceptance Criteria** (agent-executable only):
  - [ ] Migrated portal routes no longer rely on the legacy global style/runtime layers listed above.
  - [ ] `npm run validate` exits `0` after cleanup, and `npm run cutover:verify` exits `0` for the final ownership map.
  - [ ] `npx playwright test -c playwright.vinext.config.ts --grep "@legacy-cleanup"` exits `0` and writes `.sisyphus/evidence/task-14-legacy-cleanup.html`.

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```text
  Scenario: Happy path post-cleanup parity
    Tool: Playwright
    Steps: Open `/news`, `/profile`, `/schedule`, and `/integrations`; inspect `[data-testid="runtime-badge"]`, `[data-testid="portal-shell"]`, and a representative action button on each route.
    Expected: Every route stays on Vinext, styles remain intact without legacy leakage, and core actions still work.
    Evidence: .sisyphus/evidence/task-14-legacy-cleanup.html

  Scenario: Failure path rollback after cleanup candidate
    Tool: Bash
    Steps: Run the documented rollback command for the final cutover state and re-run the scoped route verification.
    Expected: Rollback instructions are still valid and documented even after cleanup, and no route becomes unreachable.
    Evidence: .sisyphus/evidence/task-14-legacy-cleanup-rollback.txt
  ```

  **Commit**: YES | Message: `chore(vinext): remove legacy portal runtime layers` | Files: legacy style/runtime files, cutover config, docs, final regression tests

## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.
- [ ] F1. Plan Compliance Audit — oracle
- [ ] F2. Code Quality Review — unspecified-high
- [ ] F3. Real Manual QA — unspecified-high (+ playwright if UI)
- [ ] F4. Scope Fidelity Check — deep

## Commit Strategy
- One atomic commit per numbered task unless a task explicitly requires two commits for migration + cleanup.
- Keep route-family commits isolated so cutover rollback stays possible.
- Do not combine legacy deletion with unrelated feature delivery in the same commit.

## Success Criteria
- Vinext becomes the effective portal runtime for the planned route families with verified route parity.
- The portal shell, theming, navigation, and responsive behavior feel consistent across desktop and mobile and are covered by executable Playwright scenarios.
- Charts, notifications, chat, Discord bridge, reminders, and personalization ship in bounded first versions with happy-path and failure-path coverage.
- Portal-surface legacy style/runtime layers are removed only after replacement parity is proven and final validation passes.
