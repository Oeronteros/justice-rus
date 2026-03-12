# UI Refresh Plan

## TL;DR

> **Quick Summary**: Redesign participant prefix presentation across all relevant participant surfaces, overhaul the dashboard, and rebuild desktop/mobile navigation so the portal feels intentional instead of stitched together.
>
> **Deliverables**:
> - Unified prefix renderer applied everywhere relevant
> - Reworked dashboard layout and section composition
> - Redesigned desktop header/menu and mobile navigation sheet
> - Updated UI tests, Playwright coverage, and full validation pass
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 3 implementation waves + final verification
> **Critical Path**: Task 1 -> Task 6 -> Task 11 -> Task 12 -> F1-F4

---

## Context

### Original Request
1. Prefixes should look good for participants.
2. Dashboard is ugly.
3. Menu is ugly.

### Interview Summary
**Key Discussions**:
- Prefix styling must be improved everywhere relevant across the project, not only the profile view.
- Dashboard and menu may be changed freely, including strong composition/layout changes.
- This is a UI refresh/refactor, not a new product area.
- Existing Wuxia identity should remain the foundation unless a specific surface needs a stronger deviation.
- Automated tests should be updated after implementation rather than TDD-first.

**Research Findings**:
- Current prefix display is in `components/sections/profile/index.tsx`; source values are in `lib/schemas/registration.ts`.
- Dashboard is centered in `components/sections/dashboard/index.tsx` and routed from `app/(portal)/page.tsx`.
- Navigation is split across `components/shell/Header.tsx`, `components/shell/MobileNav.tsx`, and `components/shell/MainLayout.tsx`.
- Shared visual language comes from `app/globals.css`, `components/shared/SectionHero.tsx`, `components/WuxiaIcons.tsx`, and `lib/i18n.ts`.
- Test infrastructure already exists: Vitest, Testing Library, Playwright, and `npm run validate` in CI.

### Metis Review
**Identified Gaps** (addressed):
- Prefix rendering scope can easily sprawl, so the plan starts with an explicit inventory task and a shared renderer contract.
- Global CSS changes can regress unrelated pages, so styling work is constrained to tokens, component classes, and route-scoped updates instead of broad resets.
- Responsive and a11y regressions are likely during nav/dashboard redesign, so breakpoint screenshots and automated a11y checks are mandatory.
- Prefix logic must stay presentation-only, so participant data/API contracts remain untouched.

---

## Work Objectives

### Core Objective
Deliver a visually coherent portal refresh that improves participant identity display, turns the dashboard into a clear landing experience, and makes desktop/mobile navigation feel deliberate and usable.

### Concrete Deliverables
- Shared prefix presentation component/formatter used by every relevant participant-facing renderer
- Refactored dashboard composition with clearer hierarchy, spacing, and section grouping
- Refreshed desktop header navigation and mobile nav sheet/dock
- Updated i18n/copy hooks, unit tests, E2E checks, and validation coverage

### Definition of Done
- [ ] Relevant participant screens render a single unified prefix treatment with no ad-hoc prefix markup left behind
- [ ] Dashboard and menu are visually and structurally refreshed on desktop and mobile breakpoints
- [ ] Unit/E2E coverage is updated for changed UI behavior
- [ ] `npm run validate` passes

### Must Have
- Unified prefix rendering path
- Dashboard redesign that improves hierarchy, spacing, and scannability
- Both desktop and mobile navigation updated together
- Responsive behavior verified at small, medium, and desktop widths
- Accessibility basics preserved or improved

### Must NOT Have (Guardrails)
- No participant schema/API/data-shape changes
- No routing or permission-model redesign hidden inside the nav work
- No broad global CSS reset that changes unrelated sections by accident
- No ad-hoc prefix string concatenation outside the shared renderer/formatter
- No human-only verification steps

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

- **Frontend/UI**: Playwright for flows, screenshots, and breakpoint verification
- **Component/Module**: Vitest + Testing Library for render logic and structure
- **Accessibility**: Playwright or Lighthouse snapshot for key updated surfaces
- **Search/guardrail**: code search or test assertion proving shared prefix rendering is centralized

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start immediately - foundations + scoped discovery):
- T1 Prefix touchpoint inventory + shared rendering contract
- T2 Visual token and shared surface refresh
- T3 Dashboard composition split plan + shell scaffolding
- T4 Navigation data consolidation + IA guardrails
- T5 Baseline UI test target mapping

Wave 2 (After Wave 1 - core redesign in parallel):
- T6 Prefix component + integration across participant views
- T7 Dashboard hero and summary zone redesign
- T8 Dashboard task/feed/detail zone redesign
- T9 Desktop header/menu redesign
- T10 Mobile nav redesign

Wave 3 (After Wave 2 - integration + quality):
- T11 Copy/i18n/responsive polish across refreshed surfaces
- T12 Unit/component tests for prefixes, dashboard, and nav
- T13 Playwright regression + accessibility coverage

Wave FINAL (After all implementation tasks - independent review, 4 parallel):
- F1 Plan compliance audit
- F2 Code quality review
- F3 Real QA execution
- F4 Scope fidelity check

### Dependency Matrix
- **T1**: none -> T6, T12
- **T2**: none -> T6, T7, T8, T9, T10, T11
- **T3**: none -> T7, T8
- **T4**: none -> T9, T10, T11
- **T5**: none -> T12, T13
- **T6**: T1, T2 -> T11, T12, T13
- **T7**: T2, T3 -> T11, T12, T13
- **T8**: T2, T3 -> T11, T12, T13
- **T9**: T2, T4 -> T11, T12, T13
- **T10**: T2, T4 -> T11, T12, T13
- **T11**: T6, T7, T8, T9, T10 -> T12, T13, F1-F4
- **T12**: T5, T6, T7, T8, T9, T10, T11 -> F2, F3
- **T13**: T5, T6, T7, T8, T9, T10, T11 -> F1, F3

### Agent Dispatch Summary
- **Wave 1**: T1 `quick`, T2 `visual-engineering`, T3 `deep`, T4 `quick`, T5 `quick`
- **Wave 2**: T6 `quick`, T7 `visual-engineering`, T8 `visual-engineering`, T9 `visual-engineering`, T10 `visual-engineering`
- **Wave 3**: T11 `quick`, T12 `unspecified-high`, T13 `unspecified-high`
- **Final**: F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] T1. Prefix touchpoint inventory + shared rendering contract

  **What to do**:
  - Search the repo for every participant/user-facing name renderer that can legitimately show a prefix.
  - Define one shared prefix renderer/formatter contract and identify all current ad-hoc prefix markup to replace.
  - Write down explicit in-scope vs out-of-scope prefix surfaces before implementation starts.

  **Must NOT do**:
  - Do not change participant schemas, registration values, or API contracts.
  - Do not expand into notifications, exports, or non-UI channels unless a current portal screen already renders them.

  **Recommended Agent Profile**:
  - **Category**: `quick` - inventory and contract definition across a small set of UI files
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T6, T12
  - **Blocked By**: None

  **References**:
  - `components/sections/profile/index.tsx` - current inline prefix badge implementation to replace
  - `lib/schemas/registration.ts` - canonical prefix option source; presentation must not alter these values
  - `components/shell/MainLayout.tsx` - portal shell map for identifying nearby participant-facing surfaces
  - `lib/i18n.ts` - verify whether any prefix-adjacent labels are locale-sensitive

  **Acceptance Criteria**:
  - [ ] Plan notes list all relevant prefix touchpoints before implementation begins
  - [ ] One shared renderer/formatter target is chosen; no multiple competing patterns remain in scope
  - [ ] Out-of-scope areas are explicitly documented for the executor

  **QA Scenarios**:
  ```text
  Scenario: Prefix touchpoints are fully inventoried
    Tool: Bash (search)
    Preconditions: Clean repo checkout
    Steps:
      1. Search for `prefix`, nickname renderers, and current profile prefix markup.
      2. Compare results against the planned touchpoint list.
      3. Assert each UI surface in scope is named in the task notes.
    Expected Result: No discovered participant-facing prefix surface is missing from the implementation plan.
    Failure Indicators: A renderer with prefix data exists but is not accounted for.
    Evidence: .sisyphus/evidence/task-t1-prefix-inventory.txt

  Scenario: Guardrail excludes non-portal channels
    Tool: Bash (search)
    Preconditions: Search results collected
    Steps:
      1. Review any additional matches outside portal UI.
      2. Assert exports/notifications/non-visual flows are marked out of scope unless already rendered in portal UI.
    Expected Result: Prefix scope is bounded to relevant portal surfaces.
    Evidence: .sisyphus/evidence/task-t1-scope-check.txt
  ```

  **Commit**: NO

- [ ] T2. Visual token and shared surface refresh

  **What to do**:
  - Refine shared color, spacing, card, and badge tokens needed by the new dashboard/menu/prefix language.
  - Update reusable classes so the redesign has consistent surfaces instead of one-off styling.
  - Preserve the Wuxia base while increasing clarity, contrast, and visual hierarchy.

  **Must NOT do**:
  - Do not introduce broad element resets or unrelated global redesign changes.
  - Do not replace iconography or typography systems unless necessary for consistency.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - shared UI foundations and visual-system work
  - **Skills**: [`visual-design-system`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T6, T7, T8, T9, T10, T11
  - **Blocked By**: None

  **References**:
  - `app/globals.css` - primary token/class source; keep changes constrained here and component scopes
  - `components/shared/SectionHero.tsx` - existing hero pattern that should inform refreshed hierarchy
  - `components/WuxiaIcons.tsx` - preserve icon language while updating surrounding presentation

  **Acceptance Criteria**:
  - [ ] Shared tokens/classes exist for updated surfaces, badges, and nav states
  - [ ] Existing Wuxia identity remains recognizable after the refresh
  - [ ] No unrelated sections require fixes due to global CSS fallout

  **QA Scenarios**:
  ```text
  Scenario: Shared token updates render correctly on core surfaces
    Tool: Playwright
    Preconditions: Local app running
    Steps:
      1. Open `/`, `/profile`, and a menu-heavy route at 1280x800.
      2. Capture screenshots of cards, hero areas, and navigation states.
      3. Assert updated tokens/classes appear consistently across all refreshed surfaces.
    Expected Result: Shared styling looks consistent without route-specific patchwork.
    Failure Indicators: One page uses old card/badge/nav styling or has contrast regressions.
    Evidence: .sisyphus/evidence/task-t2-shared-surfaces.png

  Scenario: Global CSS changes do not break unrelated layout
    Tool: Playwright
    Preconditions: Local app running
    Steps:
      1. Open one untouched route such as `/news` or `/guides`.
      2. Capture a screenshot and inspect spacing, headings, and buttons.
      3. Assert no major layout collapse or unreadable contrast is introduced.
    Expected Result: Untouched routes remain stable.
    Evidence: .sisyphus/evidence/task-t2-regression-unrelated.png
  ```

  **Commit**: YES
  - Message: `refactor(ui): refresh shared portal surface tokens`

- [ ] T3. Dashboard composition split plan + shell scaffolding

  **What to do**:
  - Break the current oversized dashboard section into clear composition boundaries before visual redesign.
  - Establish which dashboard areas become subcomponents/regions so parallel redesign work stays isolated.
  - Preserve existing data flow while preparing a better visual hierarchy.

  **Must NOT do**:
  - Do not change dashboard business logic or backend data sources.
  - Do not remove existing states such as loading/empty/error without equivalent replacements.

  **Recommended Agent Profile**:
  - **Category**: `deep` - restructuring a large UI surface without changing behavior
  - **Skills**: [`page-structure-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T7, T8
  - **Blocked By**: None

  **References**:
  - `components/sections/dashboard/index.tsx` - current monolithic dashboard implementation to split by concern
  - `app/(portal)/page.tsx` - route entrypoint that should stay stable while dashboard internals change
  - `components/shared/EmptyState.tsx` - preserve empty-state handling patterns
  - `components/shared/LoadingState.tsx` - preserve loading-state handling patterns

  **Acceptance Criteria**:
  - [ ] Dashboard regions are explicitly separated into implementation-friendly boundaries
  - [ ] Existing data dependencies and states are mapped to the new composition
  - [ ] Follow-on dashboard tasks can work on different regions with minimal overlap

  **QA Scenarios**:
  ```text
  Scenario: Dashboard composition stays behaviorally intact after split
    Tool: Playwright
    Preconditions: Local app seeded with normal dashboard data
    Steps:
      1. Open `/` at 1280x800.
      2. Assert all current major content zones still appear after structural refactor.
      3. Capture screenshot for baseline before visual redesign.
    Expected Result: No dashboard data disappears during structural split.
    Failure Indicators: Missing section, broken loading state, or console-rendered empty space.
    Evidence: .sisyphus/evidence/task-t3-dashboard-structure.png

  Scenario: Empty/loading states remain reachable
    Tool: Playwright
    Preconditions: Mock or seed a loading/empty dashboard state
    Steps:
      1. Open `/` in loading state and capture result.
      2. Open `/` in empty/no-data state and capture result.
      3. Assert both states still render distinct UI.
    Expected Result: Structural refactor does not remove fallback states.
    Evidence: .sisyphus/evidence/task-t3-dashboard-states.png
  ```

  **Commit**: YES
  - Message: `refactor(dashboard): prepare composable layout regions`

- [ ] T4. Navigation data consolidation + IA guardrails

  **What to do**:
  - Consolidate shared nav item definitions/metadata so desktop and mobile menus redesign from one source of truth.
  - Document current route list, active-state behavior, and any role/auth constraints that must remain unchanged.
  - Separate visual reorganization from route/permission logic.

  **Must NOT do**:
  - Do not add, remove, or rename routes as part of this task.
  - Do not change auth/logout/refresh behavior.

  **Recommended Agent Profile**:
  - **Category**: `quick` - shared navigation metadata cleanup
  - **Skills**: [`navigation-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T9, T10, T11
  - **Blocked By**: None

  **References**:
  - `components/shell/Header.tsx` - current desktop nav structure and utility actions
  - `components/shell/MobileNav.tsx` - current mobile dock/sheet structure
  - `components/shell/MainLayout.tsx` - route-to-section wiring that must remain consistent
  - `types/index.ts` - section typing contract
  - `lib/i18n.ts` - localized section labels

  **Acceptance Criteria**:
  - [ ] Desktop and mobile nav share one authoritative item definition path
  - [ ] Route mapping and auth actions are unchanged
  - [ ] Later nav redesign tasks can focus on layout/styling rather than duplicate data fixes

  **QA Scenarios**:
  ```text
  Scenario: Desktop and mobile nav read from one source
    Tool: Bash (search)
    Preconditions: Navigation metadata refactor complete
    Steps:
      1. Search for duplicated `navItems` definitions.
      2. Assert only one authoritative definition remains for shared entries.
      3. Save search results.
    Expected Result: No duplicated desktop/mobile nav item arrays remain.
    Evidence: .sisyphus/evidence/task-t4-nav-source.txt

  Scenario: Route mapping behavior remains stable
    Tool: Playwright
    Preconditions: Local app running with authenticated shell
    Steps:
      1. Navigate through at least 4 menu routes on desktop.
      2. Assert active state follows the current route each time.
      3. Repeat on mobile sheet/dock.
    Expected Result: Visual refactor groundwork does not break navigation behavior.
    Evidence: .sisyphus/evidence/task-t4-nav-routing.png
  ```

  **Commit**: YES
  - Message: `refactor(nav): unify shared menu metadata`

- [ ] T5. Baseline UI test target mapping

  **What to do**:
  - Identify which existing unit and Playwright tests cover profile, dashboard, header, and nav behavior.
  - Map gaps created by the redesign so later test tasks target the right files and flows.
  - Define canonical breakpoints and screenshot targets for verification.

  **Must NOT do**:
  - Do not write final assertions here; this task is a coverage map and target definition.
  - Do not duplicate existing tests unnecessarily.

  **Recommended Agent Profile**:
  - **Category**: `quick` - targeted test inventory and gap mapping
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T12, T13
  - **Blocked By**: None

  **References**:
  - `tests/components/ProfileSection.test.tsx` - current participant/profile coverage pattern
  - `tests/components/Header.test.tsx` - current desktop nav test pattern
  - `e2e/auth.spec.ts` - existing Playwright structure and fixture style
  - `e2e/a11y.spec.ts` - existing accessibility automation entrypoint
  - `playwright.config.ts` - viewport/project setup for screenshot coverage

  **Acceptance Criteria**:
  - [ ] Existing relevant tests and gaps are enumerated
  - [ ] Canonical breakpoints include mobile, tablet, and desktop
  - [ ] Later test tasks have explicit target files and scenarios to update

  **QA Scenarios**:
  ```text
  Scenario: Test coverage map matches current repo
    Tool: Bash (search)
    Preconditions: Repository tests indexed
    Steps:
      1. Search `tests/` and `e2e/` for profile, dashboard, header, and nav coverage.
      2. Compare against the coverage map.
      3. Assert no existing relevant test file is omitted.
    Expected Result: Test update scope is complete before implementation finishes.
    Evidence: .sisyphus/evidence/task-t5-test-map.txt

  Scenario: Breakpoint matrix is executable
    Tool: Playwright
    Preconditions: Local app running
    Steps:
      1. Open the app at 375x800, 768x900, and 1280x800.
      2. Capture one baseline screenshot per breakpoint.
      3. Assert all target surfaces are reachable at those sizes.
    Expected Result: Later regression screenshots have fixed, repeatable targets.
    Evidence: .sisyphus/evidence/task-t5-breakpoints.png
  ```

  **Commit**: NO

- [ ] T6. Shared prefix component + integration across participant views

  **What to do**:
  - Implement the shared prefix renderer/formatter identified in T1.
  - Replace inline/ad-hoc prefix rendering in every in-scope participant surface.
  - Handle empty, unknown, and already-prefixed values safely so names never double-prefix.

  **Must NOT do**:
  - Do not change prefix source data or create new persistence logic.
  - Do not leave mixed old/new prefix patterns in different participant views.

  **Recommended Agent Profile**:
  - **Category**: `quick` - focused shared-component integration across a small file set per surface
  - **Skills**: [`react-ux-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T12, T13
  - **Blocked By**: T1, T2

  **References**:
  - `components/sections/profile/index.tsx` - current prefix usage that becomes a consumer of the shared renderer
  - `lib/schemas/registration.ts` - prefix values and expected raw inputs
  - `lib/i18n.ts` - locale-aware label/ordering if display text needs formatting support
  - `components/ClassIcon.tsx` - adjacent identity UI treatment to keep prefix visually compatible

  **Acceptance Criteria**:
  - [ ] All in-scope participant views use one shared prefix rendering path
  - [ ] Empty/unknown prefixes render gracefully without layout damage
  - [ ] No direct prefix concatenation remains outside the shared renderer/formatter

  **QA Scenarios**:
  ```text
  Scenario: Valid prefix renders consistently everywhere
    Tool: Playwright
    Preconditions: Seed a participant with prefix `Raid Lead`
    Steps:
      1. Open `/profile` and every additional in-scope participant view at 1280x800.
      2. Assert the same prefix treatment appears in each location.
      3. Capture screenshots of each surface.
    Expected Result: Prefix styling and spacing are consistent across all in-scope views.
    Failure Indicators: Different badge styles, missing prefix, or duplicated prefix text.
    Evidence: .sisyphus/evidence/task-t6-prefix-happy.png

  Scenario: Missing or already-prefixed names fail safely
    Tool: Playwright
    Preconditions: Seed one participant without prefix and one with prefix already embedded in display name
    Steps:
      1. Open the same views.
      2. Assert missing prefix does not leave empty badge chrome.
      3. Assert embedded prefix does not render twice.
    Expected Result: Graceful handling of empty and duplicate-like inputs.
    Evidence: .sisyphus/evidence/task-t6-prefix-edge.png
  ```

  **Commit**: YES
  - Message: `feat(profile): unify participant prefix rendering`

- [ ] T7. Dashboard hero and summary zone redesign

  **What to do**:
  - Redesign the top-of-dashboard experience: hero, summary cards, key signals, and first-glance actions.
  - Improve hierarchy so the page communicates status and priorities within one screenful.
  - Keep data content intact while changing layout, visual density, and emphasis.

  **Must NOT do**:
  - Do not remove required actions or key status indicators.
  - Do not depend on new backend fields.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - high-impact landing-page redesign
  - **Skills**: [`detail-page-patterns`, `visual-design-system`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T12, T13
  - **Blocked By**: T2, T3

  **References**:
  - `components/sections/dashboard/index.tsx` - current hero/summary implementation and data bindings
  - `components/shared/SectionHero.tsx` - reusable title/chip/action pattern to adapt or extend
  - `lib/i18n.ts` - dashboard copy used in hero and summary labels

  **Acceptance Criteria**:
  - [ ] Dashboard top area has clearer visual hierarchy than the current implementation
  - [ ] Primary status and actions are visible without hunting through stacked cards
  - [ ] Desktop and tablet layouts remain readable without overflow

  **QA Scenarios**:
  ```text
  Scenario: Dashboard first screen communicates status clearly
    Tool: Playwright
    Preconditions: Local app running with representative dashboard data
    Steps:
      1. Open `/` at 1280x800 and 768x900.
      2. Capture above-the-fold screenshots.
      3. Assert key summary items and primary actions are visible without scrolling.
    Expected Result: Dashboard top section is scannable and visually structured.
    Evidence: .sisyphus/evidence/task-t7-dashboard-hero.png

  Scenario: Long labels do not break hero layout
    Tool: Playwright
    Preconditions: Seed long section titles/metrics if possible
    Steps:
      1. Open `/` with long localized content.
      2. Assert cards/chips wrap or truncate cleanly.
      3. Capture screenshot.
    Expected Result: No overlap or broken hero layout under long content.
    Evidence: .sisyphus/evidence/task-t7-dashboard-hero-long.png
  ```

  **Commit**: YES
  - Message: `feat(dashboard): redesign hero and summary zones`

- [ ] T8. Dashboard task/feed/detail zone redesign

  **What to do**:
  - Redesign the remaining dashboard regions such as action center, officer actions, and activity feed.
  - Group related information more intentionally and reduce the current visual clutter.
  - Preserve loading, empty, and high-activity states while improving readability.

  **Must NOT do**:
  - Do not delete workflow-critical information hidden in lower sections.
  - Do not create dead-end interactions or inaccessible scroll traps.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - dense information redesign with responsive constraints
  - **Skills**: [`data-density-patterns`, `list-page-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T12, T13
  - **Blocked By**: T2, T3

  **References**:
  - `components/sections/dashboard/index.tsx` - current action/feed/officer blocks and data dependencies
  - `components/shared/EmptyState.tsx` - empty-state fallback conventions
  - `components/shared/LoadingState.tsx` - loading treatment conventions

  **Acceptance Criteria**:
  - [ ] Lower dashboard regions are visually calmer and easier to scan
  - [ ] Activity/action sections still expose all critical controls and information
  - [ ] Empty/loading/high-density states remain supported

  **QA Scenarios**:
  ```text
  Scenario: Action and feed regions remain readable under heavy data
    Tool: Playwright
    Preconditions: Seed dashboard with many activity items/tasks
    Steps:
      1. Open `/` at 1280x800.
      2. Scroll through redesigned lower sections.
      3. Assert rows/cards remain legible, aligned, and actionable.
    Expected Result: High-density sections do not collapse into clutter.
    Evidence: .sisyphus/evidence/task-t8-dashboard-density.png

  Scenario: Empty states stay intentional after redesign
    Tool: Playwright
    Preconditions: Seed no pending actions and no recent activity
    Steps:
      1. Open `/` in empty state.
      2. Assert empty-state copy and affordances render in redesigned containers.
      3. Capture screenshot.
    Expected Result: Empty dashboard sections still feel designed rather than broken.
    Evidence: .sisyphus/evidence/task-t8-dashboard-empty.png
  ```

  **Commit**: YES
  - Message: `feat(dashboard): redesign activity and task regions`

- [ ] T9. Desktop header/menu redesign

  **What to do**:
  - Redesign desktop navigation, brand block, action controls, and active-state treatment.
  - Improve information scent and reduce the current generic/hard-to-scan menu feel.
  - Ensure refresh/logout/language controls stay visible and usable.

  **Must NOT do**:
  - Do not change route destinations or shell behavior.
  - Do not bury utility actions behind unclear affordances.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - navigation redesign with strong branding and usability constraints
  - **Skills**: [`navigation-patterns`, `interaction-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T12, T13
  - **Blocked By**: T2, T4

  **References**:
  - `components/shell/Header.tsx` - desktop nav layout and utility actions
  - `components/shell/MainLayout.tsx` - surrounding shell spacing and placement context
  - `lib/i18n.ts` - nav labels and utility copy
  - `components/WuxiaIcons.tsx` - iconography to keep consistent with the refreshed menu

  **Acceptance Criteria**:
  - [ ] Desktop nav has a clearer visual hierarchy and active route treatment
  - [ ] Brand, language switcher, refresh, and logout controls remain accessible
  - [ ] Long label or multi-locale text does not break the header layout

  **QA Scenarios**:
  ```text
  Scenario: Desktop menu is readable and actionable
    Tool: Playwright
    Preconditions: Authenticated shell, viewport 1280x800
    Steps:
      1. Open `/`.
      2. Capture header screenshot in default and hovered/active states.
      3. Click at least 4 menu items and assert navigation succeeds.
    Expected Result: Desktop nav feels intentional and route changes remain reliable.
    Evidence: .sisyphus/evidence/task-t9-desktop-nav.png

  Scenario: Utility controls survive redesign
    Tool: Playwright
    Preconditions: Authenticated shell
    Steps:
      1. Trigger language switcher.
      2. Trigger refresh action if available.
      3. Assert controls remain reachable and visibly distinct.
    Expected Result: Utility controls are not lost in the redesign.
    Evidence: .sisyphus/evidence/task-t9-desktop-controls.png
  ```

  **Commit**: YES
  - Message: `feat(nav): redesign desktop header menu`

- [ ] T10. Mobile nav redesign

  **What to do**:
  - Redesign the bottom dock and overflow sheet so mobile navigation feels intentional and touch-friendly.
  - Improve grouping, active-state clarity, spacing, and overflow behavior for many routes.
  - Keep parity with the shared nav source from T4.

  **Must NOT do**:
  - Do not create tiny touch targets or hidden routes.
  - Do not rely on hover-only interactions or desktop assumptions.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering` - mobile-first navigation redesign
  - **Skills**: [`mobile-responsive-ux`, `navigation-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: T11, T12, T13
  - **Blocked By**: T2, T4

  **References**:
  - `components/shell/MobileNav.tsx` - current dock/sheet interaction model
  - `components/shell/MainLayout.tsx` - shell positioning constraints around mobile nav
  - `lib/i18n.ts` - localized route labels that may expand on mobile

  **Acceptance Criteria**:
  - [ ] Mobile nav has clear primary vs overflow behavior
  - [ ] Touch targets remain usable at 375px width
  - [ ] All routes remain reachable without visual confusion

  **QA Scenarios**:
  ```text
  Scenario: Mobile nav works at phone breakpoint
    Tool: Playwright
    Preconditions: Authenticated shell, viewport 375x800
    Steps:
      1. Open `/`.
      2. Tap primary dock items and overflow menu entry.
      3. Assert active state and navigation remain correct for each route.
    Expected Result: Mobile nav is touch-friendly and complete.
    Evidence: .sisyphus/evidence/task-t10-mobile-nav.png

  Scenario: Overflow content handles long labels cleanly
    Tool: Playwright
    Preconditions: 375x800 with long localized labels
    Steps:
      1. Open mobile overflow menu.
      2. Assert rows do not overlap, clip incorrectly, or become untappable.
      3. Capture screenshot.
    Expected Result: Overflow sheet remains readable under long labels.
    Evidence: .sisyphus/evidence/task-t10-mobile-nav-long.png
  ```

  **Commit**: YES
  - Message: `feat(nav): redesign mobile navigation`

- [ ] T11. Copy, i18n, and responsive polish

  **What to do**:
  - Reconcile label/copy changes caused by the redesign across desktop, mobile, and dashboard surfaces.
  - Adjust responsive behavior, spacing, and overflow handling so the refreshed UI holds together across key breakpoints.
  - Ensure the final visual language feels like one system instead of three separate redesigns.

  **Must NOT do**:
  - Do not introduce a localization rewrite beyond strings/layout support needed by the redesign.
  - Do not mask unresolved layout bugs with breakpoint-specific hacks where a shared fix exists.

  **Recommended Agent Profile**:
  - **Category**: `quick` - cross-surface polish and consistency pass
  - **Skills**: [`mobile-responsive-ux`, `visual-design-system`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential after Wave 2
  - **Blocks**: T12, T13
  - **Blocked By**: T6, T7, T8, T9, T10

  **References**:
  - `lib/i18n.ts` - localized labels and dashboard/menu copy
  - `components/shell/Header.tsx` - desktop label overflow and control spacing
  - `components/shell/MobileNav.tsx` - mobile label grouping and overflow layout
  - `components/sections/dashboard/index.tsx` - dashboard copy density and responsive behavior

  **Acceptance Criteria**:
  - [ ] RU/EN/ZH labels still render coherently on refreshed surfaces
  - [ ] 375px, 768px, and 1280px layouts all remain readable
  - [ ] Prefix, dashboard, and nav styling feel visually unified

  **QA Scenarios**:
  ```text
  Scenario: Multi-locale layouts remain intact
    Tool: Playwright
    Preconditions: App supports locale switching
    Steps:
      1. Open `/` and `/profile` in RU and EN at 1280x800.
      2. If ZH is available in the shell, repeat for ZH.
      3. Assert labels do not overlap, clip badly, or break alignment.
    Expected Result: Refreshed layouts survive locale changes cleanly.
    Evidence: .sisyphus/evidence/task-t11-i18n-layouts.png

  Scenario: Responsive polish covers all required breakpoints
    Tool: Playwright
    Preconditions: Local app running
    Steps:
      1. Capture `/`, `/profile`, and one secondary route at 375x800, 768x900, and 1280x800.
      2. Compare spacing, readability, and overflow behavior.
      3. Assert no surface has clipped text or inaccessible controls.
    Expected Result: Refreshed UI is stable across required breakpoints.
    Evidence: .sisyphus/evidence/task-t11-responsive-matrix.png
  ```

  **Commit**: YES
  - Message: `refactor(ui): polish responsive and localized portal surfaces`

- [ ] T12. Unit/component tests for refreshed surfaces

  **What to do**:
  - Update or add Vitest/Testing Library tests for shared prefix rendering, dashboard structure, and desktop nav behavior.
  - Add assertions that enforce prefix centralization and protect key UI states introduced by the redesign.
  - Keep tests resilient to layout updates while still checking the right semantics.

  **Must NOT do**:
  - Do not write snapshot-only tests with no behavioral assertions.
  - Do not leave stale tests asserting removed legacy structure.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - broad frontend test updates spanning several surfaces
  - **Skills**: [`react-ux-patterns`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: F2, F3
  - **Blocked By**: T1, T5, T6, T7, T8, T9, T10, T11

  **References**:
  - `tests/components/ProfileSection.test.tsx` - current profile component testing style
  - `tests/components/Header.test.tsx` - current nav test structure
  - `tests/components/RegistrationSection.test.tsx` - additional component assertion patterns
  - `vitest.config.ts` - test environment/config conventions

  **Acceptance Criteria**:
  - [ ] Prefix tests cover normal, empty, and duplicate-like prefix cases
  - [ ] Dashboard tests verify presence of redesigned priority regions and preserved states
  - [ ] Nav tests verify active-state behavior and visible utility controls

  **QA Scenarios**:
  ```text
  Scenario: Updated unit/component tests pass
    Tool: Bash
    Preconditions: Test files updated
    Steps:
      1. Run targeted Vitest suites for profile, dashboard, and header/nav tests.
      2. Save terminal output.
      3. Assert zero failures.
    Expected Result: Component-level behavior is covered and green.
    Evidence: .sisyphus/evidence/task-t12-vitest.txt

  Scenario: Prefix centralization is enforced
    Tool: Bash (search)
    Preconditions: Shared prefix renderer implemented
    Steps:
      1. Search for direct prefix concatenation or legacy inline prefix badge markup.
      2. Assert remaining matches are limited to the shared renderer tests/implementation.
    Expected Result: No stray direct prefix rendering remains in UI consumers.
    Evidence: .sisyphus/evidence/task-t12-prefix-search.txt
  ```

  **Commit**: YES
  - Message: `test(ui): cover refreshed prefixes dashboard and desktop nav`

- [ ] T13. Playwright regression and accessibility coverage

  **What to do**:
  - Update or add Playwright coverage for dashboard, desktop header, mobile nav, and prefix presentation at required breakpoints.
  - Add automated accessibility verification for the refreshed portal shell and dashboard.
  - Capture screenshot evidence for the final visual state.

  **Must NOT do**:
  - Do not rely on manual visual inspection without saved evidence.
  - Do not cover only happy paths; include at least one failure/edge state.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - E2E regression and accessibility verification work
  - **Skills**: [`playwright`, `wcag-accessibility`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: F1, F3
  - **Blocked By**: T5, T6, T7, T8, T9, T10, T11

  **References**:
  - `e2e/auth.spec.ts` - existing authenticated flow setup
  - `e2e/a11y.spec.ts` - existing accessibility test entrypoint
  - `playwright.config.ts` - project/viewport configuration
  - `components/shell/Header.tsx` - selectors and interactions for desktop nav
  - `components/shell/MobileNav.tsx` - selectors and interactions for mobile nav
  - `components/sections/dashboard/index.tsx` - selectors and regions for dashboard assertions

  **Acceptance Criteria**:
  - [ ] Playwright covers desktop, tablet, and mobile screenshots for refreshed surfaces
  - [ ] Accessibility automation runs on at least dashboard and one nav surface with no critical violations
  - [ ] Edge scenarios cover missing prefix state or empty dashboard/nav overflow behavior

  **QA Scenarios**:
  ```text
  Scenario: Breakpoint regression suite passes
    Tool: Playwright
    Preconditions: App running with test data
    Steps:
      1. Run regression specs for `/`, `/profile`, and nav flows at 375x800, 768x900, and 1280x800.
      2. Save screenshots and test output.
      3. Assert no navigation, overflow, or visibility failures occur.
    Expected Result: Refreshed surfaces are stable across key breakpoints.
    Evidence: .sisyphus/evidence/task-t13-playwright.txt

  Scenario: Accessibility checks pass on refreshed shell
    Tool: Playwright
    Preconditions: Accessibility spec configured
    Steps:
      1. Run accessibility checks on `/` and one route with the refreshed shell.
      2. Save report output.
      3. Assert no critical violations remain.
    Expected Result: Dashboard and shell meet baseline a11y requirements.
    Evidence: .sisyphus/evidence/task-t13-a11y.txt
  ```

  **Commit**: YES
  - Message: `test(e2e): verify refreshed portal responsiveness and accessibility`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Verify every deliverable in this plan exists, every guardrail still holds, and evidence files for task-level QA are present.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT`

- [ ] F2. **Code Quality Review** - `unspecified-high`
  Run `npm run lint`, `npm run type-check`, and targeted test suites. Review changed files for dead styles, duplicated nav data, brittle selectors, and unscoped CSS fallout.
  Output: `Lint [PASS/FAIL] | Typecheck [PASS/FAIL] | Tests [PASS/FAIL] | VERDICT`

- [ ] F3. **Real QA Execution** - `unspecified-high`
  Execute all task QA scenarios, including breakpoint screenshots for dashboard/header/mobile nav and failure-state checks for missing prefixes or loading states.
  Output: `Scenarios [N/N] | Responsive [PASS/FAIL] | A11y [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** - `deep`
  Compare final diff against this plan. Reject if the work changed routing, permissions, participant data contracts, or unrelated sections outside approved styling touchpoints.
  Output: `Tasks [N/N] | Scope creep [NONE/N issues] | VERDICT`

---

## Commit Strategy

- **Wave 1 foundation**: `refactor(ui): prepare shared refresh foundations`
- **Wave 2 redesign**: `feat(ui): refresh dashboard navigation and prefix presentation`
- **Wave 3 verification**: `test(ui): cover refreshed portal surfaces`

## Success Criteria

### Verification Commands
```bash
npm run test
npm run test:e2e
npm run validate
```

### Final Checklist
- [ ] All relevant participant surfaces use the shared prefix renderer
- [ ] Dashboard feels intentionally regrouped and visually clearer on desktop/mobile
- [ ] Desktop and mobile nav reflect one coherent design direction
- [ ] i18n labels still render correctly after layout/content changes
- [ ] Validation and QA evidence are complete
