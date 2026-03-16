# Silent Moonfall Core Portal Redesign

## TL;DR

> **Quick Summary**: Redesign the Silent Moonfall portal into a more cinematic, high-clarity Wuxia guild experience by rebuilding the shell, navigation, dashboard, and core high-traffic modules on top of the existing StyleX system.
>
> **Deliverables**:
> - Reworked portal shell and menu architecture for desktop and mobile
> - Redesigned dashboard plus refreshed core modules: news, schedule, guides, help, and profile
> - Unified empty/loading/error interaction language across refreshed pages
> - Updated component tests, Playwright smoke/a11y coverage, and validation gate evidence
>
> **Estimated Effort**: XL
> **Parallel Execution**: YES - 3 implementation waves + final verification
> **Critical Path**: T1 -> T3 -> T7/T8 -> T14 -> T16/T17 -> F1-F4

---

## Context

### Original Request
Переосмыслить UX/UI веб-приложения гильдии Silent Moonfall для MMO RPG/Wuxia, сделать красиво и с wow-эффектом, разрешена реструктуризация меню.

### Interview Summary
**Key Discussions**:
- First delivery scope is **Core Portal**, not every page in the product.
- Menu restructuring is explicitly allowed.
- Visual direction defaults to **cinematic Wuxia / premium guild portal**, unless changed later.
- Scope includes UI/UX, information architecture, navigation, and selective flow polish.
- Scope excludes a full content rewrite and net-new product features.
- Test strategy is **Tests After** using the existing Vitest + Playwright setup.

**Research Findings**:
- Portal shell is centered on `components/shell/PortalShell.tsx`, `components/shell/MainLayout.tsx`, `components/shell/Header.tsx`, and `components/shell/MobileNav.tsx`.
- Navigation source of truth lives in `lib/nav.ts`; localized labels and hero copy live in `lib/i18n/copy.ts`.
- Shared styling is already centralized in `lib/stylex/tokens.stylex.ts`, `components/shared/Ui.stylex.ts`, `components/shell/Shell.stylex.ts`, and `app/globals.css`.
- Dashboard is a major redesign hotspot routed from `app/(portal)/page.tsx` into `components/sections/dashboard/index.tsx`.
- Test infrastructure exists (`vitest`, `@testing-library/react`, `@playwright/test`, `npm run validate`), but main portal E2E coverage is thinner than vinext pilot route coverage.
- There is an older redesign plan in `.sisyphus/plans/ui-refresh.md` that already identified shell/dashboard/nav risk zones.

### Metis Review
**Identified Gaps** (addressed):
- Metis consultation was attempted twice but timed out, so guardrails below are synthesized from repo evidence, prior plan history, and current frontend structure review.
- Scope creep risk is highest around route changes, copy rewrites, and cross-runtime divergence between the main portal and `apps/portal-vinext`.
- Responsive and multi-locale behavior must be first-class acceptance criteria, not end-of-project cleanup.
- Shell redesign must preserve auth/logout/refresh/language affordances and current route destinations.

---

## Work Objectives

### Core Objective
Deliver a visually distinctive Wuxia-themed core portal that feels premium and intentional, while keeping current data contracts, routes, and operational behavior stable.

### Concrete Deliverables
- Refreshed desktop and mobile shell/navigation built from the existing StyleX system
- Dashboard redesign with clearer hierarchy, stronger first-screen signal, and calmer density below the fold
- Refreshed core modules for `news`, `schedule`, `guides`, `help`, and `profile`
- Unified interaction states for loading, empty, error, and CTA surfaces across refreshed pages
- Updated Vitest and Playwright coverage for changed shell and module flows

### Definition of Done
- [ ] Desktop and mobile navigation are restructured without changing route destinations or auth behavior
- [ ] Dashboard and selected core modules look and behave as one coherent system on mobile, tablet, and desktop breakpoints
- [ ] Shared state patterns (loading/empty/error/CTA) are visually unified across refreshed pages
- [ ] Automated test coverage is updated and `npm run validate` passes

### Must Have
- Cinematic Wuxia visual language with higher clarity and stronger hierarchy
- Desktop and mobile shell redesigned together
- Dashboard redesigned as the primary landing experience
- Core module refresh for `news`, `schedule`, `guides`, `help`, and `profile`
- Multi-locale and responsive stability at 375px, 768px, and 1280px+
- Zero-human-intervention QA evidence for all implementation tasks

### Must NOT Have (Guardrails)
- No route renames, removals, or permission-model changes hidden inside the redesign
- No backend/API/schema changes for dashboard, news, schedule, guides, help, profile, or auth
- No separate theme runtime or parallel design system that duplicates existing StyleX foundations
- No broad global reset in `app/globals.css` that unintentionally restyles untouched routes
- No full copy rewrite beyond labels, hierarchy text, and CTA wording needed for the redesign
- No divergence where the main portal shell and vinext pilot become visually incompatible without an explicit compatibility note

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - all verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after
- **Framework**: Vitest + Testing Library + Playwright
- **Validation gate**: `npm run validate`

### QA Policy
Every task must produce agent-executed evidence in `.sisyphus/evidence/`.

- **Frontend/UI**: Playwright for route flows, screenshots, breakpoints, and state checks
- **Component/module**: Vitest + Testing Library for shell, module structure, and semantics
- **Accessibility**: Playwright/axe-based checks for shell and refreshed high-traffic pages
- **Cross-runtime safety**: scripted checks for cutover-sensitive routes and `vinext` shell compatibility where relevant

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start immediately - foundations, IA, and compatibility mapping):
- T1 Core portal IA and menu architecture contract
- T2 StyleX token and shared-surface refresh brief
- T3 Shell layout and behavior seam mapping
- T4 Dashboard region split and content-priority map
- T5 Core module redesign inventory (`news`, `schedule`, `guides`, `help`, `profile`)
- T6 Test target and breakpoint matrix
- T7 Next/vinext shell compatibility guardrail map

Wave 2 (After Wave 1 - major redesign surfaces in parallel):
- T8 Desktop header and command menu redesign
- T9 Mobile dock and overflow-sheet redesign
- T10 Dashboard hero, summary, and first-screen actions redesign
- T11 Dashboard dense content zones redesign
- T12 News and guides module refresh
- T13 Schedule and help module refresh
- T14 Profile module refresh + shell cohesion pass

Wave 3 (After Wave 2 - integration, states, and quality):
- T15 Shared loading/empty/error/CTA language unification
- T16 Copy, i18n, responsive, and overflow polish
- T17 Unit/component coverage for shell + core modules
- T18 Playwright regression, a11y, and breakpoint evidence
- T19 Validation and cutover smoke verification

Wave FINAL (After all implementation tasks - independent review, 4 parallel):
- F1 Plan compliance audit
- F2 Code quality review
- F3 Real QA execution
- F4 Scope fidelity check

### Dependency Matrix
- **T1**: none -> T8, T9, T16
- **T2**: none -> T8, T9, T10, T11, T12, T13, T14, T15, T16
- **T3**: none -> T8, T9, T15, T16, T18, T19
- **T4**: none -> T10, T11, T15, T17, T18
- **T5**: none -> T12, T13, T14, T15, T17, T18
- **T6**: none -> T17, T18, T19
- **T7**: none -> T16, T18, T19
- **T8**: T1, T2, T3 -> T15, T16, T17, T18, T19
- **T9**: T1, T2, T3 -> T15, T16, T17, T18, T19
- **T10**: T2, T4 -> T15, T16, T17, T18
- **T11**: T2, T4 -> T15, T16, T17, T18
- **T12**: T2, T5 -> T15, T16, T17, T18
- **T13**: T2, T5 -> T15, T16, T17, T18
- **T14**: T2, T5 -> T15, T16, T17, T18
- **T15**: T2, T3, T4, T5, T8, T9, T10, T11, T12, T13, T14 -> T16, T17, T18, T19
- **T16**: T1, T2, T3, T7, T8, T9, T10, T11, T12, T13, T14, T15 -> T17, T18, T19
- **T17**: T4, T5, T6, T8, T9, T10, T11, T12, T13, T14, T15, T16 -> F2, F3
- **T18**: T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16 -> F1, F3
- **T19**: T3, T6, T7, T8, T9, T15, T16, T18 -> F1, F2, F3, F4

### Agent Dispatch Summary
- **Wave 1**: T1 `deep`, T2 `visual-engineering`, T3 `deep`, T4 `deep`, T5 `quick`, T6 `quick`, T7 `unspecified-high`
- **Wave 2**: T8 `visual-engineering`, T9 `visual-engineering`, T10 `visual-engineering`, T11 `visual-engineering`, T12 `visual-engineering`, T13 `visual-engineering`, T14 `visual-engineering`
- **Wave 3**: T15 `quick`, T16 `quick`, T17 `unspecified-high`, T18 `unspecified-high`, T19 `unspecified-high`
- **Final**: F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] T1. Core portal IA and menu architecture contract

  **What to do**:
  - Define the new top-level portal information architecture for the Core Portal scope only.
  - Decide the desktop primary rail, desktop secondary groups, mobile primary dock, and mobile overflow grouping.
  - Preserve route destinations while improving section priority and information scent.

  **Must NOT do**:
  - Do not rename or remove routes.
  - Do not hide critical routes behind ambiguous labels.

  **Recommended Agent Profile**:
  - **Category**: `deep` - IA changes affect every shell surface and all later nav work.
  - **Skills**: [`navigation-patterns`, `page-structure-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T8, T9, T16
  - **Blocked By**: None

  **References**:
  - `lib/nav.ts` - current nav source of truth to regroup without changing destinations.
  - `components/shell/MainLayout.tsx` - route-to-section mapping that must stay behaviorally stable.
  - `lib/i18n/copy.ts` - section labels across RU/EN/ZH that influence grouping and label length.
  - `components/shell/Header.tsx` - current desktop primary vs immersive menu split.
  - `components/shell/MobileNav.tsx` - current mobile dock vs overflow model.

  **Acceptance Criteria**:
  - [ ] One explicit IA contract exists for desktop and mobile navigation.
  - [ ] Every current core route remains reachable from the new IA.
  - [ ] Primary vs overflow placement is justified, not ad hoc.

  **QA Scenarios**:
  ```text
  Scenario: New IA covers all required core routes
    Tool: Bash (search)
    Preconditions: IA contract documented in task notes or implementation doc
    Steps:
      1. Enumerate routes from `lib/nav.ts` and `components/shell/MainLayout.tsx`.
      2. Compare them with the redesigned desktop/mobile IA map.
      3. Assert every in-scope route appears exactly once in the navigation structure.
    Expected Result: No core route is lost or duplicated.
    Evidence: .sisyphus/evidence/task-t1-ia-map.txt

  Scenario: Label strategy survives locale expansion
    Tool: Bash (review) + Playwright
    Preconditions: Candidate IA labels defined
    Steps:
      1. Cross-check new labels against RU/EN/ZH values in `lib/i18n/copy.ts`.
      2. Open a mock or implemented shell at desktop and mobile widths.
      3. Assert long labels do not require hidden fallback routes.
    Expected Result: IA remains readable across locales.
    Evidence: .sisyphus/evidence/task-t1-ia-locales.png
  ```

  **Commit**: NO

- [ ] T2. StyleX token and shared-surface refresh brief

  **What to do**:
  - Extend the existing StyleX visual system for the redesign: surfaces, states, accent depth, hierarchy, and shell affordances.
  - Refresh shared tokens/primitives without creating a second theme runtime.
  - Define the visual rules that dashboard, shell, and module refreshes must reuse.

  **Must NOT do**:
  - Do not create a parallel design system outside existing StyleX/shared UI files.
  - Do not introduce broad resets that restyle untouched routes accidentally.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - this is the visual foundation for all redesign tasks.
  - **Skills**: [`visual-design-system`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T8, T9, T10, T11, T12, T13, T14, T15, T16
  - **Blocked By**: None

  **References**:
  - `lib/stylex/tokens.stylex.ts` - canonical color, typography, and radius vars to extend.
  - `components/shared/Ui.stylex.ts` - shared cards, buttons, badges, chips, inputs, and modal patterns.
  - `components/shell/Shell.stylex.ts` - shell-specific styles that will consume the refreshed tokens.
  - `app/globals.css` - existing Wuxia global effects; keep changes scoped and intentional.
  - `components/WuxiaIcons.tsx` - preserve icon language while upgrading surrounding presentation.

  **Acceptance Criteria**:
  - [ ] Shared visual primitives exist for shell, dashboard, and module redesign work.
  - [ ] The redesign remains recognizably Wuxia without looking muddy or over-ornamented.
  - [ ] Untouched routes do not require cleanup due to token/global fallout.

  **QA Scenarios**:
  ```text
  Scenario: Shared primitives render consistently across multiple refreshed surfaces
    Tool: Playwright
    Preconditions: Local app running with shared token changes applied
    Steps:
      1. Open `/`, `/news`, and `/profile` at 1280x800.
      2. Capture screenshots of cards, buttons, badges, and nav states.
      3. Assert surfaces share the same hierarchy, accents, and interaction language.
    Expected Result: Visual consistency comes from shared primitives, not route-specific patchwork.
    Evidence: .sisyphus/evidence/task-t2-shared-primitives.png

  Scenario: Token refresh does not regress untouched pages
    Tool: Playwright
    Preconditions: Local app running
    Steps:
      1. Open one less-touched route such as `/pvp` or `/absences`.
      2. Capture a screenshot and inspect core layout, typography, and button readability.
      3. Assert there is no catastrophic layout or contrast regression.
    Expected Result: Shared updates are safe outside the refreshed scope.
    Evidence: .sisyphus/evidence/task-t2-regression-safe.png
  ```

  **Commit**: YES
  - Message: `refactor(ui): extend shared wuxia surface system`

- [ ] T3. Shell layout and behavior seam mapping

  **What to do**:
  - Isolate shell responsibilities so desktop header, mobile nav, and page chrome can be redesigned without touching auth/session logic.
  - Map shell behaviors that must survive intact: route transitions, header hide/show, prefetching, language switch, refresh, logout.
  - Prepare implementation seams so shell redesign tasks stay small and parallelizable.

  **Must NOT do**:
  - Do not change auth/session behavior.
  - Do not remove prefetch hooks, page transitions, or utility actions without replacement.

  **Recommended Agent Profile**:
  - **Category**: `deep` - behavior-preserving seam work across shell internals.
  - **Skills**: [`react-ux-patterns`, `page-structure-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T8, T9, T15, T16, T18, T19
  - **Blocked By**: None

  **References**:
  - `components/shell/PortalShell.tsx` - root authenticated shell boundary.
  - `components/shell/MainLayout.tsx` - current shell orchestration, route mapping, motion, and prefetch behavior.
  - `components/shell/Header.tsx` - desktop shell behavior and utility controls.
  - `components/shell/MobileNav.tsx` - mobile shell behavior and overflow interactions.

  **Acceptance Criteria**:
  - [ ] Shell behavior contract is explicit before visual restructuring begins.
  - [ ] Desktop and mobile redesign tasks can work without touching auth/session concerns.
  - [ ] Prefetch, refresh, logout, language switch, and route animations remain accounted for.

  **QA Scenarios**:
  ```text
  Scenario: Shell seam refactor preserves current behaviors
    Tool: Playwright
    Preconditions: Authenticated shell running
    Steps:
      1. Open `/` and navigate to `/news`, `/schedule`, and `/profile`.
      2. Assert route transitions still occur and active state updates correctly.
      3. Trigger refresh and language switch affordances if present.
    Expected Result: Shell behavior remains intact while structure becomes easier to redesign.
    Evidence: .sisyphus/evidence/task-t3-shell-behavior.png

  Scenario: Header hide/show and mobile overflow still function after seam prep
    Tool: Playwright
    Preconditions: Desktop and mobile viewports available
    Steps:
      1. Scroll on desktop to trigger header compact/hidden states.
      2. Open mobile overflow at phone width.
      3. Assert no dead controls or broken body-scroll state appear.
    Expected Result: Structural prep does not break shell mechanics.
    Evidence: .sisyphus/evidence/task-t3-shell-mechanics.png
  ```

  **Commit**: YES
  - Message: `refactor(shell): prepare behavior-safe redesign seams`

- [ ] T4. Dashboard region split and content-priority map

  **What to do**:
  - Break the current dashboard into stable redesign regions: hero/status, summary/actions, and dense lower-content zones.
  - Document which signals must remain above the fold and which can move lower.
  - Preserve existing loading/empty/error data states while making dashboard work parallelizable.

  **Must NOT do**:
  - Do not change dashboard server data or hook contracts.
  - Do not silently drop low-visibility but operationally important blocks.

  **Recommended Agent Profile**:
  - **Category**: `deep` - large page decomposition with strict behavior preservation.
  - **Skills**: [`detail-page-patterns`, `data-density-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T10, T11, T15, T17, T18
  - **Blocked By**: None

  **References**:
  - `app/(portal)/page.tsx` - route entrypoint that must stay stable.
  - `components/sections/dashboard/index.tsx` - monolithic dashboard implementation to decompose.
  - `components/shared/SectionHero.tsx` - reusable hero framing pattern.
  - `components/shared/LoadingState.tsx` - loading state behavior to preserve.
  - `components/shared/EmptyState.tsx` - empty-state handling to preserve.

  **Acceptance Criteria**:
  - [ ] Dashboard redesign is split into independently implementable regions.
  - [ ] Above-the-fold priorities are explicit before visual redesign begins.
  - [ ] Loading, empty, and error/fallback states remain mapped for every region.

  **QA Scenarios**:
  ```text
  Scenario: Dashboard region map covers all existing major zones
    Tool: Bash (review) + Playwright
    Preconditions: Region map documented
    Steps:
      1. Compare the region map against `components/sections/dashboard/index.tsx`.
      2. Open `/` and capture the current major zones.
      3. Assert every live zone is accounted for as keep/move/merge.
    Expected Result: No critical dashboard region is forgotten.
    Evidence: .sisyphus/evidence/task-t4-dashboard-map.txt

  Scenario: Fallback states remain reachable after decomposition
    Tool: Playwright
    Preconditions: Mock loading and empty states
    Steps:
      1. Open `/` in loading state and capture output.
      2. Open `/` in empty or reduced-data state.
      3. Assert each redesigned region still has a defined fallback behavior.
    Expected Result: Dashboard decomposition preserves operational states.
    Evidence: .sisyphus/evidence/task-t4-dashboard-fallbacks.png
  ```

  **Commit**: YES
  - Message: `refactor(dashboard): map redesign regions and priorities`

- [ ] T5. Core module redesign inventory (`news`, `schedule`, `guides`, `help`, `profile`)

  **What to do**:
  - Inventory the exact page sections, key actions, critical data blocks, and obvious UX pain points for each in-scope module.
  - Mark which modules are primarily content-heavy, action-heavy, or mixed so redesign tasks can be specialized.
  - Lock the module scope so adjacent pages like `members`, `pvp`, and `absences` stay out unless needed for shell consistency.

  **Must NOT do**:
  - Do not expand the redesign to every portal module.
  - Do not change backend capabilities or invent new product flows.

  **Recommended Agent Profile**:
  - **Category**: `quick` - targeted scope inventory across a fixed page set.
  - **Skills**: [`list-page-patterns`, `detail-page-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T12, T13, T14, T15, T17, T18
  - **Blocked By**: None

  **References**:
  - `components/sections/news/index.tsx` - current news information density and CTA rhythm.
  - `components/sections/schedule/index.tsx` - schedule/event interaction model to preserve.
  - `components/sections/guides/index.tsx` - knowledge-base presentation patterns.
  - `components/sections/help/index.tsx` - request/respond workflow surface.
  - `components/sections/profile/index.tsx` - personal cabinet surface and identity/status patterns.

  **Acceptance Criteria**:
  - [ ] Each in-scope module has a redesign brief with critical blocks and protected actions.
  - [ ] Out-of-scope modules are explicitly excluded.
  - [ ] Module tasks can proceed independently with minimal file overlap.

  **QA Scenarios**:
  ```text
  Scenario: Module inventory matches the selected scope
    Tool: Bash (review)
    Preconditions: Inventory document or task notes completed
    Steps:
      1. Enumerate in-scope modules from the plan.
      2. Compare against current section component files.
      3. Assert every in-scope module has a redesign brief and every out-of-scope module is named.
    Expected Result: Module scope is fully locked before implementation.
    Evidence: .sisyphus/evidence/task-t5-module-scope.txt

  Scenario: Critical actions are preserved in the module briefs
    Tool: Playwright
    Preconditions: Local app running on current UI or redesign draft
    Steps:
      1. Visit `/news`, `/schedule`, `/guides`, `/help`, and `/profile`.
      2. Record current primary actions and critical blocks.
      3. Assert each one is represented in the redesign notes as keep/merge/restyle.
    Expected Result: No important module affordance is lost in planning.
    Evidence: .sisyphus/evidence/task-t5-module-actions.png
  ```

  **Commit**: NO

- [ ] T6. Test target and breakpoint matrix

  **What to do**:
  - Map existing component and Playwright coverage for the shell, dashboard, and in-scope modules.
  - Define the canonical breakpoints and test routes that all redesign verification must use.
  - Identify main-portal gaps that need new smoke or a11y checks.

  **Must NOT do**:
  - Do not duplicate tests already covering the same semantics.
  - Do not leave breakpoint validation implicit.

  **Recommended Agent Profile**:
  - **Category**: `quick` - repo-level test inventory and coverage targeting.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T17, T18, T19
  - **Blocked By**: None

  **References**:
  - `tests/components/Header.test.tsx` - current shell accessibility test style.
  - `tests/components/DashboardSection.test.tsx` - current dashboard component coverage to extend.
  - `e2e/mobile-dashboard-nav.spec.ts` - existing mobile shell/dashboard flow and selector style.
  - `e2e/a11y.spec.ts` - accessibility automation entrypoint.
  - `playwright.config.ts` - baseline projects and viewport setup.

  **Acceptance Criteria**:
  - [ ] A route-by-route test target matrix exists for shell, dashboard, and in-scope modules.
  - [ ] Breakpoints are fixed at minimum mobile, tablet, and desktop widths.
  - [ ] Main-portal gaps are explicit so Wave 3 test tasks are deterministic.

  **QA Scenarios**:
  ```text
  Scenario: Coverage map matches the current repo
    Tool: Bash (search)
    Preconditions: Coverage matrix prepared
    Steps:
      1. Search `tests/` and `e2e/` for shell, dashboard, news, schedule, guides, help, and profile coverage.
      2. Compare results against the matrix.
      3. Assert no existing relevant test file is omitted.
    Expected Result: Test planning reflects the actual repo state.
    Evidence: .sisyphus/evidence/task-t6-test-map.txt

  Scenario: Breakpoint matrix is executable in Playwright
    Tool: Playwright
    Preconditions: Local app running
    Steps:
      1. Open `/`, `/news`, and `/profile` at 375x800, 768x900, and 1280x800.
      2. Capture one screenshot per route and breakpoint.
      3. Assert all target surfaces are reachable with the chosen matrix.
    Expected Result: The chosen breakpoints are realistic and reusable for regression work.
    Evidence: .sisyphus/evidence/task-t6-breakpoints.png
  ```

  **Commit**: NO

- [ ] T7. Next/vinext shell compatibility guardrail map

  **What to do**:
  - Identify which redesign decisions must remain portable to the vinext pilot shell and which are main-portal-only.
  - Document shared shell primitives/selectors that future cutover work should reuse.
  - Prevent accidental visual divergence between the main portal and `apps/portal-vinext`.

  **Must NOT do**:
  - Do not pull vinext pilot pages into full redesign scope.
  - Do not block the main redesign on feature parity work outside the shell contract.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - cross-runtime compatibility mapping with risk-control focus.
  - **Skills**: [`react-ux-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T16, T18, T19
  - **Blocked By**: None

  **References**:
  - `apps/portal-vinext/package.json` - confirms separate runtime/build context.
  - `README.md` - cutover and vinext pilot route strategy.
  - `components/shell/MainLayout.tsx` - shell behavior expected to remain portable.
  - `lib/stylex/tokens.stylex.ts` - shared token source to avoid split-brain styling.

  **Acceptance Criteria**:
  - [ ] The plan distinguishes main-portal redesign scope from vinext compatibility guardrails.
  - [ ] Shared shell primitives/selectors are identified for future reuse.
  - [ ] No redesign task implicitly requires a vinext rewrite to be considered done.

  **QA Scenarios**:
  ```text
  Scenario: Compatibility guardrails are explicit
    Tool: Bash (review)
    Preconditions: Guardrail map prepared
    Steps:
      1. Review shell-related tasks and the guardrail map.
      2. Assert each shared shell decision is marked as main-only, portable, or follow-up.
      3. Save the resulting matrix.
    Expected Result: Cross-runtime expectations are explicit, not implied.
    Evidence: .sisyphus/evidence/task-t7-cutover-map.txt

  Scenario: Shared shell primitives remain reusable
    Tool: Bash (search)
    Preconditions: Shell primitives/selectors proposed
    Steps:
      1. Search for shell primitives/tokens referenced by redesign tasks.
      2. Assert they live in shared or portable layers rather than route-only hacks.
      3. Save evidence.
    Expected Result: Future vinext adoption is not blocked by one-off shell hacks.
    Evidence: .sisyphus/evidence/task-t7-portable-primitives.txt
  ```

  **Commit**: NO

- [ ] T8. Desktop header and command menu redesign

  **What to do**:
  - Redesign the desktop header, brand block, primary navigation rail, and secondary command menu.
  - Improve hierarchy, scannability, and action discoverability while preserving utility controls.
  - Align the desktop shell with the new cinematic Wuxia direction without sacrificing clarity.

  **Must NOT do**:
  - Do not change route destinations or utility-action behavior.
  - Do not hide refresh, logout, language switch, or profile/calendar access behind low-visibility affordances.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - high-impact desktop shell redesign with strong UX constraints.
  - **Skills**: [`navigation-patterns`, `interaction-patterns`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T15, T16, T17, T18, T19
  - **Blocked By**: T1, T2, T3

  **References**:
  - `components/shell/Header.tsx` - current desktop brand, toolbar, core rail, and immersive menu.
  - `components/shell/MainLayout.tsx` - shell spacing and placement context.
  - `lib/nav.ts` - nav item structure and grouping source.
  - `lib/i18n/copy.ts` - localized labels and brand metadata that affect layout.
  - `tests/components/Header.test.tsx` - current accessibility contract that must remain true after redesign.

  **Acceptance Criteria**:
  - [ ] Desktop nav has a stronger primary/secondary hierarchy than the current shell.
  - [ ] Utility controls remain visible, accessible, and clearly distinct.
  - [ ] Long locale labels do not break desktop header layout.

  **QA Scenarios**:
  ```text
  Scenario: Desktop header remains readable and actionable
    Tool: Playwright
    Preconditions: Authenticated shell at 1280x800
    Steps:
      1. Open `/` and capture the header in default state.
      2. Hover/focus key nav items and open the secondary command menu.
      3. Click at least 4 routes and assert navigation plus active state are correct.
    Expected Result: Desktop nav feels intentional and fully usable.
    Evidence: .sisyphus/evidence/task-t8-desktop-nav.png

  Scenario: Utility controls survive the redesign
    Tool: Playwright
    Preconditions: Authenticated shell
    Steps:
      1. Trigger language switcher, calendar link, profile link, and refresh action.
      2. Assert each control is reachable and visibly differentiated.
      3. Capture screenshot evidence.
    Expected Result: High-use utility actions are not buried or broken.
    Evidence: .sisyphus/evidence/task-t8-desktop-controls.png
  ```

  **Commit**: YES
  - Message: `feat(shell): redesign desktop header and command menu`

- [ ] T9. Mobile dock and overflow-sheet redesign

  **What to do**:
  - Redesign the mobile bottom dock and overflow sheet for clearer grouping, larger touch targets, and better route discoverability.
  - Preserve parity with the IA contract and shared nav metadata.
  - Make the mobile shell feel premium rather than compressed desktop leftovers.

  **Must NOT do**:
  - Do not create untappable targets or hover-only interactions.
  - Do not hide routes behind visually ambiguous affordances.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - mobile-first nav redesign with dense route constraints.
  - **Skills**: [`mobile-responsive-ux`, `navigation-patterns`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T15, T16, T17, T18, T19
  - **Blocked By**: T1, T2, T3

  **References**:
  - `components/shell/MobileNav.tsx` - current dock, overflow sheet, and active-state mechanics.
  - `components/shell/MainLayout.tsx` - mobile shell placement and page padding constraints.
  - `lib/nav.ts` - shared nav metadata and primary/secondary split.
  - `e2e/mobile-dashboard-nav.spec.ts` - existing mobile flow and selector expectations.

  **Acceptance Criteria**:
  - [ ] Mobile primary vs overflow behavior is immediately understandable.
  - [ ] All core routes remain reachable at phone width.
  - [ ] Touch targets and label treatment remain usable in RU/EN/ZH.

  **QA Scenarios**:
  ```text
  Scenario: Mobile nav works end to end at phone breakpoint
    Tool: Playwright
    Preconditions: Authenticated shell at 390x844 or 375x800
    Steps:
      1. Open `/` and tap every primary dock item.
      2. Open the overflow sheet and navigate to at least 3 secondary routes.
      3. Assert active state and route transitions remain correct.
    Expected Result: Mobile nav is complete, legible, and touch-friendly.
    Evidence: .sisyphus/evidence/task-t9-mobile-nav.png

  Scenario: Overflow handles long labels cleanly
    Tool: Playwright
    Preconditions: Long localized labels available
    Steps:
      1. Open the mobile overflow sheet in RU, EN, and ZH.
      2. Assert rows do not overlap, clip badly, or become untappable.
      3. Capture screenshot evidence.
    Expected Result: Locale expansion does not break the overflow menu.
    Evidence: .sisyphus/evidence/task-t9-mobile-nav-locales.png
  ```

  **Commit**: YES
  - Message: `feat(shell): redesign mobile dock and overflow nav`

- [ ] T10. Dashboard hero, summary, and first-screen actions redesign

  **What to do**:
  - Redesign the top dashboard experience so guild status, readiness, key actions, and first-glance signals are visible and compelling.
  - Improve above-the-fold hierarchy and create a stronger landing moment.
  - Reuse the shared StyleX/system language from T2.

  **Must NOT do**:
  - Do not remove critical actions or status indicators.
  - Do not depend on new backend fields.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - high-visibility landing experience redesign.
  - **Skills**: [`detail-page-patterns`, `visual-design-system`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T15, T16, T17, T18
  - **Blocked By**: T2, T4

  **References**:
  - `components/sections/dashboard/index.tsx` - current hero, summary, and CTA composition.
  - `components/shared/SectionHero.tsx` - existing hero composition patterns to adapt.
  - `lib/i18n/copy.ts` - hero copy and section label content that affects density.

  **Acceptance Criteria**:
  - [ ] Above-the-fold dashboard communicates guild status and next actions more clearly than the current version.
  - [ ] Primary actions remain visible without hunting through stacked cards.
  - [ ] Desktop and tablet layouts remain visually clean without overflow.

  **QA Scenarios**:
  ```text
  Scenario: Dashboard first screen is visually clear and actionable
    Tool: Playwright
    Preconditions: Representative dashboard data available
    Steps:
      1. Open `/` at 1280x800 and 768x900.
      2. Capture above-the-fold screenshots.
      3. Assert key summary items and primary actions are visible without scrolling.
    Expected Result: The dashboard landing moment is strong and readable.
    Evidence: .sisyphus/evidence/task-t10-dashboard-hero.png

  Scenario: Long metrics and labels do not break the redesigned hero
    Tool: Playwright
    Preconditions: Long localized content or mocked long metrics
    Steps:
      1. Open `/` with long labels enabled.
      2. Assert cards, chips, and badges wrap or truncate cleanly.
      3. Capture screenshot evidence.
    Expected Result: Hero layout survives dense or long content gracefully.
    Evidence: .sisyphus/evidence/task-t10-dashboard-hero-long.png
  ```

  **Commit**: YES
  - Message: `feat(dashboard): redesign hero and first-screen actions`

- [ ] T11. Dashboard dense content zones redesign

  **What to do**:
  - Redesign lower dashboard regions such as action center, officer-focused areas, and activity feeds.
  - Reduce clutter while preserving operational information and actionability.
  - Keep high-density, empty, and loading states visually intentional.

  **Must NOT do**:
  - Do not hide workflow-critical information below confusing accordions or dead-end tabs.
  - Do not introduce scroll traps or inaccessible nested scrolling.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - dense information redesign with strong usability constraints.
  - **Skills**: [`data-density-patterns`, `list-page-patterns`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T15, T16, T17, T18
  - **Blocked By**: T2, T4

  **References**:
  - `components/sections/dashboard/index.tsx` - current dense lower dashboard blocks.
  - `components/shared/EmptyState.tsx` - empty-state treatment conventions.
  - `components/shared/LoadingState.tsx` - loading treatment conventions.
  - `components/shared/Ui.stylex.ts` - shared card/table/chip patterns for dense content.

  **Acceptance Criteria**:
  - [ ] Dense dashboard regions are calmer and easier to scan than the current design.
  - [ ] Critical actions and data remain visible and operable.
  - [ ] High-density and empty/loading states all remain supported.

  **QA Scenarios**:
  ```text
  Scenario: Dense dashboard content remains readable under heavy data
    Tool: Playwright
    Preconditions: Dashboard seeded with many tasks/items/activity entries
    Steps:
      1. Open `/` at desktop width.
      2. Scroll through redesigned lower sections.
      3. Assert rows/cards remain aligned, legible, and actionable.
    Expected Result: The lower dashboard is information-rich but not chaotic.
    Evidence: .sisyphus/evidence/task-t11-dashboard-density.png

  Scenario: Empty dashboard sections still look intentional
    Tool: Playwright
    Preconditions: Dashboard seeded with minimal or empty lower-section data
    Steps:
      1. Open `/` in empty/reduced state.
      2. Assert empty-state copy and affordances render inside designed containers.
      3. Capture screenshot evidence.
    Expected Result: Empty sections feel designed rather than broken.
    Evidence: .sisyphus/evidence/task-t11-dashboard-empty.png
  ```

  **Commit**: YES
  - Message: `feat(dashboard): redesign dense content zones`

- [ ] T12. News and guides module refresh

  **What to do**:
  - Refresh the presentation of `news` and `guides` so they feel editorial, premium, and easier to scan.
  - Improve hierarchy for headlines, metadata, chips, actions, and content cards.
  - Preserve existing reading and navigation flows while elevating visual quality.

  **Must NOT do**:
  - Do not rewrite all editorial copy.
  - Do not change guide/news data contracts or markdown/content behavior.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - content-heavy module redesign with strong hierarchy needs.
  - **Skills**: [`list-page-patterns`, `detail-page-patterns`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T15, T16, T17, T18
  - **Blocked By**: T2, T5

  **References**:
  - `components/sections/news/index.tsx` - news feed, cards, and metadata treatment.
  - `components/sections/guides/index.tsx` - guides browsing and knowledge-base layout.
  - `components/shared/Ui.stylex.ts` - shared card/badge/button primitives.
  - `lib/i18n/copy.ts` - copy and label density constraints.

  **Acceptance Criteria**:
  - [ ] News and guides feel more editorial and intentional than the current list/card treatment.
  - [ ] Metadata and actions remain easy to find.
  - [ ] Long titles and mixed-content lengths do not break layout.

  **QA Scenarios**:
  ```text
  Scenario: News and guides are more scannable with real content lengths
    Tool: Playwright
    Preconditions: Local app running with representative content
    Steps:
      1. Open `/news` and `/guides` at desktop and tablet widths.
      2. Capture screenshots of list/grid/detail areas.
      3. Assert title hierarchy, metadata, and primary actions are visually clear.
    Expected Result: Both modules feel premium and readable.
    Evidence: .sisyphus/evidence/task-t12-news-guides.png

  Scenario: Long titles and sparse content fail gracefully
    Tool: Playwright
    Preconditions: Use long/short content variants if available
    Steps:
      1. Open one long-title item and one sparse-content item in each module.
      2. Assert cards/rows do not collapse or overlap.
      3. Capture screenshot evidence.
    Expected Result: Layout survives content variability cleanly.
    Evidence: .sisyphus/evidence/task-t12-news-guides-edge.png
  ```

  **Commit**: YES
  - Message: `feat(portal): refresh news and guides surfaces`

- [ ] T13. Schedule and help module refresh

  **What to do**:
  - Refresh `schedule` and `help` so time-sensitive actions, statuses, and response flows are easier to scan and complete.
  - Clarify event/request cards, state badges, CTAs, and context blocks.
  - Preserve all existing user actions and list/detail behavior.

  **Must NOT do**:
  - Do not change RSVP/help backend workflows.
  - Do not hide time-critical actions below decorative content.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - action-heavy workflow module redesign.
  - **Skills**: [`list-page-patterns`, `form-patterns`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T15, T16, T17, T18
  - **Blocked By**: T2, T5

  **References**:
  - `components/sections/schedule/index.tsx` - event list/detail and RSVP interaction model.
  - `components/sections/help/index.tsx` - request/respond flow and status handling.
  - `components/shared/Ui.stylex.ts` - shared button, badge, notice, and card primitives.
  - `lib/i18n/copy.ts` - label density and locale-sensitive strings.

  **Acceptance Criteria**:
  - [ ] Schedule and help make primary actions more obvious than the current UI.
  - [ ] Status, timing, and urgency signals remain prominent.
  - [ ] List/detail layouts stay usable at mobile and desktop breakpoints.

  **QA Scenarios**:
  ```text
  Scenario: Schedule and help highlight the right actions
    Tool: Playwright
    Preconditions: Local app running with representative events/help items
    Steps:
      1. Open `/schedule` and `/help` at desktop and mobile widths.
      2. Capture screenshots of list/detail/action areas.
      3. Assert primary actions and status chips are visible without hunting.
    Expected Result: Action-heavy modules become clearer and faster to read.
    Evidence: .sisyphus/evidence/task-t13-schedule-help.png

  Scenario: Empty or low-activity states still feel intentional
    Tool: Playwright
    Preconditions: Use empty/help-light and schedule-light data states
    Steps:
      1. Open `/schedule` and `/help` in reduced-data states.
      2. Assert empty-state messaging and CTA affordances remain visible.
      3. Capture screenshots.
    Expected Result: Low-activity states do not look broken or abandoned.
    Evidence: .sisyphus/evidence/task-t13-schedule-help-empty.png
  ```

  **Commit**: YES
  - Message: `feat(portal): refresh schedule and help surfaces`

- [ ] T14. Profile module refresh and shell cohesion pass

  **What to do**:
  - Refresh the `profile` surface so identity, status, and personal actions align with the redesigned shell.
  - Ensure profile feels like the player’s command center inside the new portal language.
  - Use this task to tighten visual continuity between module surfaces and shell chrome.

  **Must NOT do**:
  - Do not change account/auth business rules.
  - Do not introduce new profile capabilities or schema changes.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - identity-centric module redesign with shell continuity goals.
  - **Skills**: [`detail-page-patterns`, `react-ux-patterns`, `frontend-design`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T15, T16, T17, T18
  - **Blocked By**: T2, T5

  **References**:
  - `components/sections/profile/index.tsx` - current profile composition and identity/status areas.
  - `components/shell/Header.tsx` - shell-adjacent identity affordances to stay visually compatible.
  - `components/shared/Ui.stylex.ts` - shared badges/cards/button states.
  - `lib/i18n/copy.ts` - localized labels used by the shell and profile.

  **Acceptance Criteria**:
  - [ ] Profile feels cohesive with the redesigned shell rather than a separate visual era.
  - [ ] Identity/status blocks are clearer and more premium.
  - [ ] Existing profile actions remain reachable and understandable.

  **QA Scenarios**:
  ```text
  Scenario: Profile reads as a premium command-center surface
    Tool: Playwright
    Preconditions: Local app running with profile data
    Steps:
      1. Open `/profile` at desktop and mobile widths.
      2. Capture screenshots of identity, status, and action areas.
      3. Assert the profile shares visual language with the shell and dashboard.
    Expected Result: Profile feels integrated into the redesign.
    Evidence: .sisyphus/evidence/task-t14-profile-shell.png

  Scenario: Profile actions remain discoverable after refresh
    Tool: Playwright
    Preconditions: Interactive profile controls available
    Steps:
      1. Open `/profile`.
      2. Interact with visible controls or action groups.
      3. Assert no important action is hidden or visually de-emphasized to the point of confusion.
    Expected Result: Profile remains functional, not just prettier.
    Evidence: .sisyphus/evidence/task-t14-profile-actions.png
  ```

  **Commit**: YES
  - Message: `feat(profile): refresh profile shell cohesion`

- [ ] T15. Shared loading, empty, error, and CTA language unification

  **What to do**:
  - Unify state presentation across shell/dashboard/core modules so loading, empty, error, and primary CTA patterns look like one system.
  - Normalize fallback density, spacing, messaging hierarchy, and recovery affordances.
  - Apply the shared language only to in-scope surfaces.

  **Must NOT do**:
  - Do not invent new product behavior to fix state UX.
  - Do not leave module-specific one-off state chrome when a shared pattern fits.

  **Recommended Agent Profile**:
  - **Category**: `quick` - cross-surface consistency pass after major redesign work.
  - **Skills**: [`interaction-patterns`, `page-structure-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential after Wave 2
  - **Blocks**: T16, T17, T18, T19
  - **Blocked By**: T2, T3, T4, T5, T8, T9, T10, T11, T12, T13, T14

  **References**:
  - `components/shared/LoadingState.tsx` - baseline loading treatment.
  - `components/shared/EmptyState.tsx` - baseline empty-state treatment.
  - `components/shared/Ui.stylex.ts` - shared notice/button/card primitives for fallback states.
  - `components/sections/dashboard/index.tsx` - dense state handling patterns to normalize.
  - `components/sections/help/index.tsx` - action-heavy state messaging to align.

  **Acceptance Criteria**:
  - [ ] In-scope pages share recognizable loading/empty/error/CTA patterns.
  - [ ] Recovery actions are visually obvious where applicable.
  - [ ] State chrome no longer looks stitched together from unrelated modules.

  **QA Scenarios**:
  ```text
  Scenario: Shared state language appears across all refreshed modules
    Tool: Playwright
    Preconditions: Trigger loading/empty/error states where available
    Steps:
      1. Visit `/`, `/news`, `/schedule`, `/help`, and `/profile` in at least one fallback state each.
      2. Capture screenshots of the state UI.
      3. Assert spacing, hierarchy, and CTA treatment are visibly consistent.
    Expected Result: State UX looks like a single system across the redesigned scope.
    Evidence: .sisyphus/evidence/task-t15-states.png

  Scenario: Recovery affordances remain obvious
    Tool: Playwright
    Preconditions: Error/retry or empty/CTA states available
    Steps:
      1. Open at least two pages with retry or recovery affordances.
      2. Assert the relevant CTA is visible and clearly actionable.
      3. Capture screenshot evidence.
    Expected Result: Users are never stranded in fallback states.
    Evidence: .sisyphus/evidence/task-t15-recovery.png
  ```

  **Commit**: YES
  - Message: `refactor(ui): unify state and CTA language`

- [ ] T16. Copy, i18n, responsive, and overflow polish

  **What to do**:
  - Polish final labels, section text, spacing, overflow handling, and breakpoint behavior across the redesigned shell and modules.
  - Reconcile RU/EN/ZH label expansion with the new IA and layouts.
  - Apply defaults already chosen in planning: selective copy polish, not a full rewrite.

  **Must NOT do**:
  - Do not turn this into a localization rewrite.
  - Do not fix layout problems with route-specific hacks where a shared solution exists.

  **Recommended Agent Profile**:
  - **Category**: `quick` - cross-surface consistency and overflow hardening.
  - **Skills**: [`mobile-responsive-ux`, `visual-design-system`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential after T15
  - **Blocks**: T17, T18, T19
  - **Blocked By**: T1, T2, T3, T7, T8, T9, T10, T11, T12, T13, T14, T15

  **References**:
  - `lib/i18n/copy.ts` - shell/module labels and hero copy.
  - `components/shell/Header.tsx` - desktop overflow and utility-control spacing.
  - `components/shell/MobileNav.tsx` - mobile label density and sheet layout.
  - `components/sections/dashboard/index.tsx` - dashboard text density and responsive layout.
  - `README.md` - vinext cutover context that informs portable naming/selector choices.

  **Acceptance Criteria**:
  - [ ] RU/EN/ZH labels render cleanly on the redesigned shell and core pages.
  - [ ] 375px, 768px, and 1280px+ layouts remain readable and unclipped.
  - [ ] Final copy polish supports the visual direction without drifting into a full rewrite.

  **QA Scenarios**:
  ```text
  Scenario: Multi-locale layouts remain intact
    Tool: Playwright
    Preconditions: Locale switching available
    Steps:
      1. Open `/`, `/schedule`, and `/profile` in RU and EN; include ZH where supported.
      2. Capture screenshots at desktop and mobile widths.
      3. Assert no clipped labels, overlaps, or untappable controls appear.
    Expected Result: The redesign survives locale changes cleanly.
    Evidence: .sisyphus/evidence/task-t16-i18n-layouts.png

  Scenario: Responsive polish covers the full breakpoint matrix
    Tool: Playwright
    Preconditions: Local app running
    Steps:
      1. Capture `/`, `/news`, `/schedule`, `/help`, and `/profile` at 375x800, 768x900, and 1280x800.
      2. Compare spacing, overflow, readability, and CTA visibility.
      3. Assert no layout collapse remains.
    Expected Result: Refreshed surfaces stay stable at all required breakpoints.
    Evidence: .sisyphus/evidence/task-t16-responsive-matrix.png
  ```

  **Commit**: YES
  - Message: `refactor(portal): polish copy locales and responsive behavior`

- [ ] T17. Unit/component coverage for shell and core modules

  **What to do**:
  - Update or add Vitest/Testing Library coverage for redesigned shell surfaces, dashboard regions, and in-scope modules.
  - Protect IA behavior, utility-control visibility, state rendering, and critical module semantics.
  - Keep tests resilient to layout changes while still checking the right outcomes.

  **Must NOT do**:
  - Do not rely on snapshot-only tests with no semantic assertions.
  - Do not leave stale tests asserting removed legacy structure.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - broad frontend test update spanning multiple redesigned surfaces.
  - **Skills**: [`react-ux-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: F2, F3
  - **Blocked By**: T4, T5, T6, T8, T9, T10, T11, T12, T13, T14, T15, T16

  **References**:
  - `tests/components/Header.test.tsx` - current shell accessibility expectations.
  - `tests/components/DashboardSection.test.tsx` - dashboard testing style to expand.
  - `tests/components/ProfileSection.test.tsx` - profile component testing patterns.
  - `vitest.config.ts` - shared test environment setup.

  **Acceptance Criteria**:
  - [ ] Shell tests verify nav hierarchy, active state, and visible utility controls.
  - [ ] Dashboard tests verify redesigned priority regions plus preserved fallback states.
  - [ ] Module tests cover at least one happy path and one fallback/pathological state per refreshed module group.

  **QA Scenarios**:
  ```text
  Scenario: Updated Vitest suites pass for redesigned surfaces
    Tool: Bash
    Preconditions: Test files updated
    Steps:
      1. Run targeted Vitest suites for header, dashboard, profile, and any added module tests.
      2. Save terminal output.
      3. Assert zero failures.
    Expected Result: Component-level behavior is protected and green.
    Evidence: .sisyphus/evidence/task-t17-vitest.txt

  Scenario: Stale legacy assertions are removed
    Tool: Bash (search)
    Preconditions: Tests updated
    Steps:
      1. Search for selectors/text that reference removed legacy shell or dashboard structures.
      2. Assert remaining matches belong only to intentionally retained UI.
      3. Save search results.
    Expected Result: Tests target the redesigned UI, not obsolete markup.
    Evidence: .sisyphus/evidence/task-t17-legacy-search.txt
  ```

  **Commit**: YES
  - Message: `test(portal): cover redesigned shell dashboard and modules`

- [ ] T18. Playwright regression, accessibility, and breakpoint evidence

  **What to do**:
  - Update or add Playwright coverage for shell, dashboard, and in-scope modules at the agreed breakpoint matrix.
  - Add accessibility checks for the redesigned shell and at least key landing/core-module routes.
  - Capture final screenshot evidence for desktop, tablet, and mobile.

  **Must NOT do**:
  - Do not rely on manual visual review without saved evidence.
  - Do not cover only happy paths; include fallback/edge states from T15 and T16.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - broad E2E and a11y verification across refreshed routes.
  - **Skills**: [`playwright`, `wcag-accessibility`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: F1, F3, T19
  - **Blocked By**: T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16

  **References**:
  - `e2e/mobile-dashboard-nav.spec.ts` - current mobile shell flow and mock structure.
  - `e2e/a11y.spec.ts` - accessibility automation entrypoint.
  - `playwright.config.ts` - projects, viewports, and browser config.
  - `components/shell/Header.tsx` - shell selectors/interactions for desktop checks.
  - `components/shell/MobileNav.tsx` - mobile nav selectors/interactions.
  - `components/sections/dashboard/index.tsx` - dashboard regions for screenshot assertions.

  **Acceptance Criteria**:
  - [ ] Playwright covers shell plus refreshed core routes across mobile, tablet, and desktop.
  - [ ] Accessibility automation passes on shell/dashboard and at least one content-heavy plus one action-heavy module route.
  - [ ] Screenshot evidence exists for happy and fallback states.

  **QA Scenarios**:
  ```text
  Scenario: Breakpoint regression suite passes on refreshed routes
    Tool: Playwright
    Preconditions: App running with representative data
    Steps:
      1. Run specs for `/`, `/news`, `/schedule`, `/help`, and `/profile` at 375x800, 768x900, and 1280x800.
      2. Save screenshots and terminal output.
      3. Assert no nav, overflow, visibility, or fatal interaction failures occur.
    Expected Result: The redesign is stable across the required breakpoint matrix.
    Evidence: .sisyphus/evidence/task-t18-playwright.txt

  Scenario: Accessibility checks pass on refreshed shell and modules
    Tool: Playwright
    Preconditions: Accessibility spec configured
    Steps:
      1. Run a11y checks on `/`, `/news`, and `/help` or `/schedule`.
      2. Save report output.
      3. Assert no critical accessibility violations remain.
    Expected Result: Core refreshed surfaces meet baseline accessibility expectations.
    Evidence: .sisyphus/evidence/task-t18-a11y.txt
  ```

  **Commit**: YES
  - Message: `test(e2e): verify redesigned portal shell and core flows`

- [ ] T19. Validation and cutover smoke verification

  **What to do**:
  - Run the full validation gate and a focused cutover-aware smoke check so the redesign does not quietly break the vinext transition path.
  - Verify that the main portal redesign still fits the repo’s build/test discipline and does not introduce obvious cross-runtime styling hazards.
  - Capture final command output as evidence.

  **Must NOT do**:
  - Do not stop at partial test success; the full validation gate must be executed.
  - Do not treat cutover compatibility as implicit if the shell or selectors changed significantly.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - repo-wide validation plus cutover-risk verification.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential after T18
  - **Blocks**: F1, F2, F3, F4
  - **Blocked By**: T3, T6, T7, T8, T9, T15, T16, T18

  **References**:
  - `package.json` - `validate`, `test:e2e`, and cutover-related scripts.
  - `README.md` - cutover modes and runtime expectations.
  - `apps/portal-vinext/package.json` - vinext runtime entrypoints.

  **Acceptance Criteria**:
  - [ ] `npm run validate` passes.
  - [ ] If shell-sensitive selectors or portable primitives changed, a cutover-aware smoke note/evidence exists.
  - [ ] Final validation evidence is saved for later review agents.

  **QA Scenarios**:
  ```text
  Scenario: Full validation gate passes
    Tool: Bash
    Preconditions: Implementation complete
    Steps:
      1. Run `npm run validate`.
      2. Save terminal output.
      3. Assert exit code 0.
    Expected Result: Lint, tests, E2E, build, and type-check all pass.
    Evidence: .sisyphus/evidence/task-t19-validate.txt

  Scenario: Cutover-sensitive shell behavior is not obviously broken
    Tool: Bash + Playwright
    Preconditions: Shell redesign changed shared primitives or selectors
    Steps:
      1. Review cutover guardrails from T7.
      2. Run a targeted smoke pass or script against the affected shell-sensitive routes.
      3. Save outputs/screenshots showing no immediate cross-runtime blocker.
    Expected Result: The redesign remains compatible with the repo’s cutover strategy.
    Evidence: .sisyphus/evidence/task-t19-cutover-smoke.txt
  ```

  **Commit**: YES
  - Message: `chore(portal): validate redesigned core portal`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Verify every deliverable in this plan exists, every guardrail still holds, and evidence files for task-level QA are present.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT`

- [ ] F2. **Code Quality Review** - `unspecified-high`
  Run `npm run lint`, `npm run type-check`, targeted Vitest suites, and changed Playwright specs. Review changed files for duplicated nav metadata, brittle selectors, dead styles, and unscoped global CSS fallout.
  Output: `Lint [PASS/FAIL] | Typecheck [PASS/FAIL] | Tests [PASS/FAIL] | VERDICT`

- [ ] F3. **Real QA Execution** - `unspecified-high`
  Execute all task QA scenarios, including desktop/mobile nav flows, dashboard breakpoints, module empty/error states, and accessibility checks. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N] | Responsive [PASS/FAIL] | A11y [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** - `deep`
  Compare the final diff against this plan. Reject if the work changed routes, permissions, server contracts, or untouched modules beyond approved styling/system touchpoints.
  Output: `Tasks [N/N] | Scope creep [NONE/N issues] | VERDICT`

---

## Commit Strategy

- **Wave 1 foundations**: `refactor(ui): prepare core portal redesign foundations`
- **Wave 2 redesign**: `feat(portal): redesign shell dashboard and core modules`
- **Wave 3 quality**: `test(portal): cover redesigned shell and core modules`

## Success Criteria

### Verification Commands
```bash
npm run test
npm run test:e2e
npm run validate
```

### Final Checklist
- [ ] Shell and navigation feel intentionally restructured on desktop and mobile
- [ ] Dashboard presents clearer priorities above the fold and calmer density below it
- [ ] `news`, `schedule`, `guides`, `help`, and `profile` look like one coherent system
- [ ] Multi-locale labels remain stable in RU/EN/ZH across refreshed surfaces
- [ ] Evidence and validation prove the redesign without manual-only signoff
