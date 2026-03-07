# Clan Editing, PvP Polish, and Role Clarity

## TL;DR

> **Quick Summary**: Replace the current prompt-based clan editing flow with a structured guild-field UX, clarify current role capabilities without changing the permission model, and harden/finish PvP across queue flow, confirmation/disputes, rating behavior, anti-abuse, and test coverage.
>
> **Deliverables**:
> - Structured clan editing flow for participant records
> - User-facing role explainer sourced from current auth rules
> - PvP UX and API polish across queue, confirmation, rating, and abuse handling
> - Vitest coverage for touched registration, PvP, and role surfaces
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 3 waves + final verification
> **Critical Path**: Task 1 -> Task 6 -> Task 9 -> Task 12 -> Final verification

---

## Context

### Original Request
1. How to set clan on participants
2. Bring PvP to a finished state
3. Explain the differences between all roles

### Interview Summary
**Key Discussions**:
- Clan is currently the `guild` field and is edited via a prompt-driven members-table action.
- PvP scope must include UX/result confirmation, matchmaking, rating, and permissions/anti-abuse.
- Non-PvP scope must include clan UX improvement plus a role explainer, but not a role-permission redesign.
- Automated tests should be added after implementation using the existing Vitest setup.

**Research Findings**:
- Clan data exists through schema, API, and DB read/write layers in the registration stack.
- Profile UI exposes some self-service profile stats, but not guild editing today.
- PvP already has queue, active match, result reporting, and rating update paths, but no obvious focused test coverage.
- Roles are enforced through `lib/authz.ts` and consumed by admin/help/guide/registration surfaces.

### Metis Review
**Identified Gaps** (addressed):
- Guardrails added to prevent role-permission redesign and guild-management scope creep.
- Acceptance criteria expanded to include deterministic route tests, authorization checks, and QA for duplicate/contradictory PvP actions.
- Defaults applied: keep current permissions intact, keep `guild` as a plain string, and place the role explainer in-product near profile/admin context.

---

## Work Objectives

### Core Objective
Ship one coherent improvement pass that makes guild/clan editing understandable and usable, explains the current role system clearly, and turns PvP into a more reliable, test-backed feature without changing the existing role hierarchy.

### Concrete Deliverables
- Structured guild/clan edit UI built on the existing registration update path
- In-product role explainer covering `guest`, `member`, `officer`, `head`, and `sysadmin`
- Hardened PvP route behavior for queue, confirmation/disputes, rating invariants, and anti-abuse edge handling
- Vitest coverage for guild editing, role visibility, and PvP route/UI behavior

### Definition of Done
- [ ] Guild updates no longer rely on browser `prompt()` interactions
- [ ] Role explainer reflects current auth behavior without changing permission gates
- [ ] PvP handles duplicate, conflicting, and incomplete result flows predictably
- [ ] `npm test` passes with new coverage for touched areas

### Must Have
- Preserve the existing role order and authorization logic in `lib/authz.ts`
- Keep `guild` as the existing participant string field; no guild management subsystem
- Add agent-executable QA scenarios for every task

### Must NOT Have (Guardrails)
- No permission-model redesign for roles
- No expansion into guild creation/invites/moderation system
- No silent PvP formula/semantics changes without explicit test coverage and UI communication
- No collection of new sensitive anti-abuse identifiers such as device fingerprints or persistent IP tracking

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - all verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after
- **Framework**: Vitest via `npm test`

### QA Policy
Every task includes agent-executed QA scenarios with evidence under `.sisyphus/evidence/`.

- **Frontend/UI**: Playwright for registration/profile/PvP flows
- **API/Backend**: Bash with `npm test` and targeted route tests
- **Hooks/Modules**: Vitest for deterministic logic, mutations, and state invalidation

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately - scope-safe foundations):
- Task 1: Registration guild edit contract and normalization rules
- Task 2: Role capability source map and explainer content contract
- Task 3: PvP rules audit extracted into deterministic acceptance matrix
- Task 4: PvP anti-abuse/error-state specification in route-facing terms
- Task 5: Test scaffolding for registration/PvP/role coverage

Wave 2 (After Wave 1 - main feature work):
- Task 6: Structured guild edit UI in registration table
- Task 7: Profile/admin visibility updates for guild + role clarity
- Task 8: Role explainer UI wired to current permissions
- Task 9: PvP route hardening for report confirmation/disputes/idempotency
- Task 10: PvP queue/matchmaking polish and queue-state UX

Wave 3 (After Wave 2 - rating/UI/test integration):
- Task 11: PvP rating + leaderboard invariants and messaging
- Task 12: PvP UI polish for loading/error/dispute/confirmed states
- Task 13: Vitest coverage for registration guild + role explainer surfaces
- Task 14: Vitest coverage for PvP route, hooks, and critical UI behavior

Wave FINAL (After ALL tasks - independent review):
- F1: Plan compliance audit
- F2: Code quality review
- F3: Real QA execution
- F4: Scope fidelity check

Critical Path: Task 1 -> Task 6 -> Task 9 -> Task 12 -> Task 14 -> Final verification
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5

### Dependency Matrix

- **1**: None -> 6, 7, 13
- **2**: None -> 8, 13
- **3**: None -> 9, 10, 11, 12, 14
- **4**: None -> 9, 10, 11, 12, 14
- **5**: None -> 13, 14
- **6**: 1 -> 7, 13
- **7**: 1, 6 -> 13
- **8**: 2 -> 13
- **9**: 3, 4 -> 11, 12, 14
- **10**: 3, 4 -> 12, 14
- **11**: 3, 4, 9 -> 12, 14
- **12**: 9, 10, 11 -> 14
- **13**: 1, 2, 5, 6, 7, 8 -> Final
- **14**: 3, 4, 5, 9, 10, 11, 12 -> Final

### Agent Dispatch Summary

- **Wave 1**: 5 tasks - T1 `quick`, T2 `writing`, T3 `deep`, T4 `deep`, T5 `quick`
- **Wave 2**: 5 tasks - T6 `visual-engineering`, T7 `quick`, T8 `writing`, T9 `deep`, T10 `visual-engineering`
- **Wave 3**: 4 tasks - T11 `deep`, T12 `visual-engineering`, T13 `quick`, T14 `deep`
- **FINAL**: 4 tasks - F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] 1. Registration guild edit contract and normalization rules

  **What to do**:
  - Lock the exact behavior for editing `guild`: trimmed string, allowed empty value, preserved max length, and unchanged permission boundaries.
  - Centralize the registration-update contract so UI work reuses the existing PATCH payload/validation path instead of inventing a parallel flow.
  - Add focused tests for normalization and authorization expectations around self-edit vs officer-edit behavior.

  **Must NOT do**:
  - Do not introduce a guild registry/table.
  - Do not widen who can edit beyond current server rules.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small contract-shaping task around existing schema/API files.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful for validation/test syntax if needed.
  - **Skills Evaluated but Omitted**:
    - `modal-patterns`: No UI built yet.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: 6, 7, 13
  - **Blocked By**: None

  **References**:
  - `lib/api/registrations.ts:8` - Current client payload contract for `guild` updates.
  - `lib/server/registration/contracts.ts:3` - Server-side payload validation to keep aligned with client rules.
  - `lib/server/registration/write.ts:99` - Existing authorization and persistence path for registration edits.
  - `lib/server/registration/read.ts:109` - Read model that must reflect the saved guild value back to UI.
  - `lib/schemas/registration.ts:11` - Canonical shape for returned registration rows.
  - `tests/hooks/useGuides.test.tsx:1` - Existing Vitest style for hook/module testing conventions.

  **Acceptance Criteria**:
  - [ ] Guild edits still use the existing registration PATCH pipeline.
  - [ ] Whitespace-only guild input is normalized deterministically.
  - [ ] Editing another user still requires existing elevated permissions.
  - [ ] A targeted Vitest file for guild contract rules passes.

  **QA Scenarios**:
  ```
  Scenario: Officer-normalized guild update
    Tool: Bash (npm test)
    Preconditions: Test fixture includes one officer actor and one target registration record.
    Steps:
      1. Run the targeted registration contract test file covering payload `{ nickname: "Target", guild: "  Moonfall  " }`.
      2. Assert the saved/read value equals `"Moonfall"` and not the padded input.
      3. Save test output to evidence.
    Expected Result: Test passes and proves trimming/round-trip behavior.
    Failure Indicators: Raw whitespace survives; unauthorized error thrown; read path returns stale value.
    Evidence: .sisyphus/evidence/task-1-guild-contract.txt

  Scenario: Unauthorized cross-user guild edit rejected
    Tool: Bash (npm test)
    Preconditions: Test fixture includes a non-officer actor editing a different nickname.
    Steps:
      1. Run the negative authorization test for guild update.
      2. Assert the result rejects with `Forbidden` / 403 semantics.
    Expected Result: Unauthorized cross-user update is rejected.
    Failure Indicators: Update succeeds or rejects with the wrong error.
    Evidence: .sisyphus/evidence/task-1-guild-auth-error.txt
  ```

  **Evidence to Capture:**
  - [ ] Targeted test log for normalization
  - [ ] Targeted test log for authorization rejection

  **Commit**: YES
  - Message: `refactor(registration): formalize guild update contract`
  - Files: `lib/api/registrations.ts`, `lib/server/registration/contracts.ts`, related tests
  - Pre-commit: `npm test`

- [ ] 2. Role capability source map and explainer contract

  **What to do**:
  - Enumerate current role capabilities from existing authz helpers and API guards.
  - Define a single source for role explainer content so UI copy matches actual behavior.
  - Add tests that fail if the explainer drifts from the current role ordering/capability map.

  **Must NOT do**:
  - Do not change `lib/authz.ts` semantics.
  - Do not invent permissions that are not backed by code.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: This is primarily clarity/spec copy grounded in code behavior.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful for content/schema conventions if component docs are needed.
  - **Skills Evaluated but Omitted**:
    - `visual-design-system`: UI layout is deferred to Task 8.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: 8, 13
  - **Blocked By**: None

  **References**:
  - `lib/authz.ts:3` - Canonical role order and helper-based capability boundaries.
  - `app/api/admin/accounts/route.ts:24` - Officer+ account-management guard and head+ role assignment guard.
  - `app/api/help/route.ts:220` - Officer-only status-management behavior.
  - `app/api/guide/[id]/route.ts:118` - Head+ moderation/delete behavior.
  - `components/sections/profile/index.tsx:50` - Existing role labels already shown to users.

  **Acceptance Criteria**:
  - [ ] One canonical explainer source exists for all five roles.
  - [ ] Explainer content matches actual code-backed capabilities.
  - [ ] A targeted test fails if role order/capability mapping drifts unexpectedly.

  **QA Scenarios**:
  ```
  Scenario: Role explainer matches authz map
    Tool: Bash (npm test)
    Preconditions: Targeted role explainer test file exists.
    Steps:
      1. Run the role explainer/unit test.
      2. Assert all five roles are present in order: guest, member, officer, head, sysadmin.
      3. Assert officer/head/sysadmin capability descriptions map to the existing guards.
    Expected Result: Test passes with no undocumented or missing roles.
    Failure Indicators: Missing role, wrong order, or capability text mismatches guard logic.
    Evidence: .sisyphus/evidence/task-2-role-map.txt

  Scenario: Permission redesign accidentally introduced
    Tool: Bash (npm test)
    Preconditions: Negative assertion test checks current helper outputs.
    Steps:
      1. Run a test asserting `canAssignRoles('officer') === false` and `canManageAccounts('member') === false`.
      2. Record the result.
    Expected Result: Existing permission boundaries remain intact.
    Failure Indicators: Any widened permission boundary.
    Evidence: .sisyphus/evidence/task-2-role-boundary-error.txt
  ```

  **Evidence to Capture:**
  - [ ] Role capability test log
  - [ ] Boundary regression test log

  **Commit**: YES
  - Message: `docs(profile): codify role capability explainer`
  - Files: explainer source + tests
  - Pre-commit: `npm test`

- [ ] 3. PvP rules audit and deterministic acceptance matrix

  **What to do**:
  - Break the current PvP route into named behavior cases: queue join, auto-match, report submit, dispute, confirm, and rating update.
  - Define the accepted before/after rules for contradictory reports, repeated submissions, stale active matches, and queue transitions.
  - Add route-level test scaffolding or helper extraction so later PvP work can be verified deterministically.

  **Must NOT do**:
  - Do not yet redesign the UI.
  - Do not change rating math without documenting the invariant being preserved or updated.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires untangling route behavior into explicit state transitions.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful for test/runtime references around route behavior.
  - **Skills Evaluated but Omitted**:
    - `interaction-patterns`: Pure UI work comes later.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: 9, 10, 11, 12, 14
  - **Blocked By**: None

  **References**:
  - `app/api/pvp/route.ts:67` - Current rating calculation logic.
  - `app/api/pvp/route.ts:72` - Schema/bootstrap behavior for PvP tables.
  - `app/api/pvp/route.ts:279` - State-loading logic that drives queue, recent matches, and active match.
  - `app/api/pvp/route.ts:424` - Queue join flow and auto-match creation.
  - `app/api/pvp/route.ts:541` - Result submission and confirmation merge logic.
  - `lib/schemas/pvp.ts:18` - Exposed state model and confirmation statuses consumed by UI.

  **Acceptance Criteria**:
  - [ ] PvP state transitions are explicitly covered by tests or helper assertions.
  - [ ] Duplicate/conflicting report behavior is documented in executable tests.
  - [ ] A deterministic acceptance matrix exists for later PvP tasks.

  **QA Scenarios**:
  ```
  Scenario: Deterministic queue-to-match transition
    Tool: Bash (npm test)
    Preconditions: Two fixture players, clean in-memory or mocked DB state.
    Steps:
      1. Run the targeted PvP route test for two sequential queue joins.
      2. Assert the second join creates one pending match and removes both queue rows.
      3. Save the resulting assertion log.
    Expected Result: FIFO queue transition is deterministic and reproducible.
    Failure Indicators: Two queue rows remain; no match is created; duplicate match rows appear.
    Evidence: .sisyphus/evidence/task-3-pvp-matrix.txt

  Scenario: Contradictory reports remain disputed
    Tool: Bash (npm test)
    Preconditions: Existing pending match with two players.
    Steps:
      1. Run a route test where player one reports win and player two reports win for themselves.
      2. Assert match status stays pending and confirmation status is `disputed`.
    Expected Result: Conflicting reports do not auto-complete the match.
    Failure Indicators: Match completes or rating updates despite disagreement.
    Evidence: .sisyphus/evidence/task-3-pvp-dispute.txt
  ```

  **Evidence to Capture:**
  - [ ] Queue/match transition test log
  - [ ] Dispute-path test log

  **Commit**: YES
  - Message: `test(pvp): capture route behavior matrix`
  - Files: `app/api/pvp/route.ts`, PvP tests/helpers
  - Pre-commit: `npm test`

- [ ] 4. PvP anti-abuse and error-state specification

  **What to do**:
  - Define and implement bounded behavior for queue spam, duplicate result submissions, stale active matches, and mismatched reports.
  - Ensure route responses are explicit enough for the UI to render correct blocked/error states.
  - Add negative tests for the selected anti-abuse/error cases without introducing new sensitive tracking.

  **Must NOT do**:
  - Do not add IP/device fingerprinting.
  - Do not create moderator tooling outside the current PvP/player-facing flow.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Defensive server behavior and error semantics need careful reasoning.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful for HTTP error/test semantics if needed.
  - **Skills Evaluated but Omitted**:
    - `modal-patterns`: Not relevant yet.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: 9, 10, 11, 12, 14
  - **Blocked By**: None

  **References**:
  - `app/api/pvp/route.ts:447` - Existing protection against joining with an active match.
  - `app/api/pvp/route.ts:569` - Upsert-style confirmation write path where duplicate submission handling belongs.
  - `components/sections/pvp/index.tsx:115` - Error/empty state rendering that must consume route errors clearly.
  - `lib/hooks/usePvp.ts:18` - Mutation invalidation flow that reacts to errors and state changes.

  **Acceptance Criteria**:
  - [ ] Duplicate result submissions are idempotent or clearly rejected.
  - [ ] Queue spam / stale active-match cases return stable, user-consumable errors.
  - [ ] Negative tests cover the chosen abuse/error scenarios.

  **QA Scenarios**:
  ```
  Scenario: Duplicate report submission handled safely
    Tool: Bash (npm test)
    Preconditions: One pending match and one reporting player.
    Steps:
      1. Run the targeted test that submits the same result twice.
      2. Assert no duplicate confirmation rows or double rating updates occur.
    Expected Result: Second submission is safe and non-destructive.
    Failure Indicators: Extra confirmation rows, extra rating change, or crash.
    Evidence: .sisyphus/evidence/task-4-pvp-idempotency.txt

  Scenario: Queue join rejected while active match exists
    Tool: Bash (npm test)
    Preconditions: Fixture player already has a pending match.
    Steps:
      1. Run the test that calls the queue-join route for that player.
      2. Assert the route returns the active-match conflict response.
    Expected Result: Join is blocked with a stable conflict error.
    Failure Indicators: Player re-enters queue or route returns a generic 500.
    Evidence: .sisyphus/evidence/task-4-pvp-conflict.txt
  ```

  **Evidence to Capture:**
  - [ ] Idempotency test log
  - [ ] Active-match conflict test log

  **Commit**: YES
  - Message: `fix(pvp): define anti-abuse error paths`
  - Files: `app/api/pvp/route.ts`, PvP tests
  - Pre-commit: `npm test`

- [ ] 5. Test scaffolding for registration, role, and PvP coverage

  **What to do**:
  - Establish the shared Vitest helpers/fixtures needed for registration writes, role mapping checks, and PvP route cases.
  - Reuse existing query/test conventions so later tasks add coverage quickly instead of duplicating setup.
  - Validate the repo test command and any required environment stubs for touched modules.

  **Must NOT do**:
  - Do not switch test frameworks.
  - Do not overbuild full E2E infrastructure for this package.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small but important scaffolding around the existing Vitest setup.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Helpful for current Vitest config/reference if needed.
  - **Skills Evaluated but Omitted**:
    - `playwright`: Browser QA is for task verification, not test scaffolding.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: 13, 14
  - **Blocked By**: None

  **References**:
  - `package.json:6` - Source of truth for `npm test` and `npm run type-check` commands.
  - `vitest.config.ts:1` - Existing Vitest config that new tests must follow.
  - `tests/setup.ts:1` - Shared test bootstrap.
  - `tests/hooks/useGuides.test.tsx:1` - Established testing style for hooks and query-driven modules.

  **Acceptance Criteria**:
  - [ ] Shared test helpers exist for touched domains.
  - [ ] `npm test` runs successfully with the new scaffolding in place.
  - [ ] Later registration/PvP tests can reuse fixtures rather than copy setup.

  **QA Scenarios**:
  ```
  Scenario: Shared test scaffolding boots cleanly
    Tool: Bash (npm test)
    Preconditions: New helper files are referenced by at least one smoke test.
    Steps:
      1. Run the smallest smoke suite using the shared fixtures.
      2. Assert no missing-env or setup-import failures occur.
    Expected Result: Test helpers initialize cleanly under the repo's Vitest config.
    Failure Indicators: Module-resolution failure, missing DOM/test setup, or env crash.
    Evidence: .sisyphus/evidence/task-5-test-scaffold.txt

  Scenario: Type-check remains green after scaffolding
    Tool: Bash
    Preconditions: Test helper typings added.
    Steps:
      1. Run `npm run type-check`.
      2. Save the output.
    Expected Result: Added test helpers do not introduce TypeScript errors.
    Failure Indicators: New helper types break compile.
    Evidence: .sisyphus/evidence/task-5-typecheck.txt
  ```

  **Evidence to Capture:**
  - [ ] Test scaffold smoke log
  - [ ] Type-check log

  **Commit**: YES
  - Message: `test(repo): add shared fixtures for registration and pvp`
  - Files: `tests/setup.ts`, new shared test helpers
  - Pre-commit: `npm test && npm run type-check`

---

- [ ] 6. Replace prompt-based guild editing in the registration table

  **What to do**:
  - Replace the browser `prompt()` sequence with a structured edit flow for class/guild and adjacent stats in the members table.
  - Keep the current officer+ access boundary while making the guild field explicit, validated, and recoverable on error.
  - Add UI-level tests for the new interaction path and its success/error states.

  **Must NOT do**:
  - Do not leave `prompt()` as the primary edit flow.
  - Do not expose editing controls to roles that currently cannot use them.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Main work is replacing a brittle UX flow with a usable in-app editor.
  - **Skills**: [`react-ux-patterns`, `form-patterns`, `modal-patterns`]
    - `react-ux-patterns`: State and mutation coordination with existing hooks.
    - `form-patterns`: Validation, save/cancel, and error feedback behavior.
    - `modal-patterns`: If the editor uses a modal or drawer rather than inline prompts.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Preserve current app language rather than redesigning the section.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)
  - **Blocks**: 7, 13
  - **Blocked By**: 1

  **References**:
  - `components/sections/registration/RegistrationTable.tsx:95` - Current prompt-based edit flow that must be replaced.
  - `components/sections/registration/index.tsx:118` - Parent section shell and refetch integration.
  - `lib/hooks/useRegistrations.ts:18` - Existing mutation hook to reuse.
  - `lib/api/registrations.ts:50` - PATCH client used by the editor.
  - `lib/server/registration/write.ts:129` - Server behavior for class/guild updates.

  **Acceptance Criteria**:
  - [ ] Registration table exposes a structured edit control instead of `prompt()`.
  - [ ] Guild field supports save/cancel and error feedback.
  - [ ] Officer+ flow updates the row and refreshes the table successfully.
  - [ ] UI test covers success and mutation-failure states.

  **QA Scenarios**:
  ```
  Scenario: Officer updates participant guild in-app
    Tool: Playwright
    Preconditions: Logged in as officer+; registration table loaded with a visible target row.
    Steps:
      1. Open `/members` and locate the target row by nickname text.
      2. Click the row's edit action, enter `Moonfall East` in the guild field, and save.
      3. Assert the editor closes, no alert/prompt is used, and the row now displays `Moonfall East`.
    Expected Result: Guild update succeeds through the structured UI.
    Failure Indicators: Browser prompt appears; save silently fails; table does not refresh.
    Evidence: .sisyphus/evidence/task-6-guild-ui.png

  Scenario: Save failure keeps editor state visible
    Tool: Playwright
    Preconditions: Mutation endpoint mocked or forced to return an error.
    Steps:
      1. Open the guild editor for a row.
      2. Submit a valid value while the API returns an error.
      3. Assert an inline error is shown and the entered value is not lost unexpectedly.
    Expected Result: Error is visible and recoverable without browser alerts.
    Failure Indicators: Editor closes with no feedback or resets irreversibly.
    Evidence: .sisyphus/evidence/task-6-guild-ui-error.png
  ```

  **Evidence to Capture:**
  - [ ] Success-path screenshot
  - [ ] Failure-path screenshot

  **Commit**: YES
  - Message: `feat(registration): replace prompt guild editor`
  - Files: `components/sections/registration/RegistrationTable.tsx`, nearby UI/tests
  - Pre-commit: `npm test`

- [ ] 7. Add profile/admin visibility for guild state without changing permissions

  **What to do**:
  - Surface the current guild value clearly in the profile/admin area so users understand where their clan data lives.
  - Keep permissions unchanged: visibility may expand, edit rights stay aligned with current server/UI guardrails.
  - Add a small regression test proving the chosen surface renders the guild state correctly.

  **Must NOT do**:
  - Do not turn this into a new self-service permission model.
  - Do not duplicate guild logic outside the existing registration source of truth.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Focused presentation work around existing profile/admin components.
  - **Skills**: [`react-ux-patterns`]
    - `react-ux-patterns`: Helps integrate existing query data into profile/admin surfaces cleanly.
  - **Skills Evaluated but Omitted**:
    - `modal-patterns`: No new modal is required here.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10)
  - **Blocks**: 13
  - **Blocked By**: 1, 6

  **References**:
  - `components/sections/profile/index.tsx:152` - Existing profile section where role/class/status are already shown.
  - `lib/server/registration/read.ts:202` - Source for guild data included in registration rows.
  - `types/index.ts:36` - Registration shape used by UI surfaces.

  **Acceptance Criteria**:
  - [ ] Guild value is visible in the selected profile/admin surface.
  - [ ] No new edit action is exposed where permissions should remain unchanged.
  - [ ] Regression test confirms the rendered guild state.

  **QA Scenarios**:
  ```
  Scenario: Profile surface shows current guild value
    Tool: Playwright
    Preconditions: Logged in as a user whose registration row has `guild = "Moonfall East"`.
    Steps:
      1. Open `/profile`.
      2. Locate the profile summary/stats surface.
      3. Assert the guild value `Moonfall East` is visible in the selected location.
    Expected Result: User can see their current guild/clan state without guessing.
    Failure Indicators: Guild is absent or mismatched with registration data.
    Evidence: .sisyphus/evidence/task-7-profile-guild.png

  Scenario: Non-elevated user does not gain hidden admin edit control
    Tool: Playwright
    Preconditions: Logged in as `member`.
    Steps:
      1. Open `/profile`.
      2. Assert no officer-only guild-edit control from the registration table appears here.
    Expected Result: Visibility improves without permission drift.
    Failure Indicators: Member sees an edit affordance that bypasses the intended flow.
    Evidence: .sisyphus/evidence/task-7-profile-guild-noedit.png
  ```

  **Evidence to Capture:**
  - [ ] Profile visibility screenshot
  - [ ] Permission-boundary screenshot

  **Commit**: YES
  - Message: `feat(profile): surface current guild state`
  - Files: `components/sections/profile/index.tsx`, related tests
  - Pre-commit: `npm test`

- [ ] 8. Add in-product role explainer UI

  **What to do**:
  - Render the role explainer in a user-facing place near profile/account context.
  - Present concrete differences among `guest`, `member`, `officer`, `head`, and `sysadmin` based on current code-backed capabilities only.
  - Add rendering/content tests to keep UI copy aligned with the source map from Task 2.

  **Must NOT do**:
  - Do not imply permissions the code does not grant.
  - Do not bury the explainer in an admin-only area if regular users need it.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Clear capability communication is the main user-facing value.
  - **Skills**: [`react-ux-patterns`, `detail-page-patterns`]
    - `react-ux-patterns`: Keeps the explainer integrated with profile/account UX.
    - `detail-page-patterns`: Useful for presenting concise capability cards/rows.
  - **Skills Evaluated but Omitted**:
    - `navigation-patterns`: This should live inside an existing section, not add new IA.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10)
  - **Blocks**: 13
  - **Blocked By**: 2

  **References**:
  - `components/sections/profile/index.tsx:162` - Existing account/profile layout for placement.
  - `lib/authz.ts:10` - Helper semantics that the explainer must reflect.
  - `app/api/admin/accounts/route.ts:81` - Role-assignment boundary for `head+`.
  - `app/api/help/route.ts:220` - Officer-only moderation status behavior.
  - `app/api/guide/[id]/route.ts:210` - Head+ delete/moderation behavior.

  **Acceptance Criteria**:
  - [ ] The role explainer is visible in-product.
  - [ ] Each role has a distinct, accurate description.
  - [ ] Rendering/content tests cover the explainer.

  **QA Scenarios**:
  ```
  Scenario: User can compare all roles on the profile surface
    Tool: Playwright
    Preconditions: Logged in as any authenticated user.
    Steps:
      1. Open `/profile`.
      2. Scroll to the role explainer block.
      3. Assert all five roles are visible with distinct descriptions.
    Expected Result: Role differences are legible and complete.
    Failure Indicators: Missing roles, duplicate descriptions, or hidden explainer.
    Evidence: .sisyphus/evidence/task-8-role-explainer.png

  Scenario: Explainer does not promise unauthorized actions
    Tool: Playwright
    Preconditions: Role explainer rendered.
    Steps:
      1. Inspect the officer/head/sysadmin descriptions in the UI.
      2. Assert officer text does not say officers can assign roles, and head/sysadmin text does.
    Expected Result: UI wording matches actual permission boundaries.
    Failure Indicators: Wording contradicts `lib/authz.ts` behavior.
    Evidence: .sisyphus/evidence/task-8-role-explainer-boundary.png
  ```

  **Evidence to Capture:**
  - [ ] Full explainer screenshot
  - [ ] Boundary wording screenshot

  **Commit**: YES
  - Message: `feat(profile): add role capability explainer`
  - Files: profile/explainer source + tests
  - Pre-commit: `npm test`

- [ ] 9. Harden PvP report confirmation, dispute handling, and idempotency

  **What to do**:
  - Make result reporting safe under repeated submissions and contradictory reports.
  - Keep match completion/rating updates gated behind the agreed confirmation rules.
  - Add route tests for confirm, dispute, stale-report, and replay/idempotent cases.

  **Must NOT do**:
  - Do not let a single unverified report complete a match.
  - Do not update ratings twice for the same match.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Server-state correctness is the core risk in PvP.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful for route/test reference patterns.
  - **Skills Evaluated but Omitted**:
    - `visual-design-system`: Not relevant to route correctness.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10)
  - **Blocks**: 11, 12, 14
  - **Blocked By**: 3, 4

  **References**:
  - `app/api/pvp/route.ts:541` - Core report submission path.
  - `app/api/pvp/route.ts:324` - Match completion and rating update transaction.
  - `lib/schemas/pvp.ts:18` - Match and confirmation status contract consumed by UI.

  **Acceptance Criteria**:
  - [ ] Duplicate report submissions are safe.
  - [ ] Conflicting reports stay disputed/pending until resolved by existing rules.
  - [ ] Ratings update once and only once for a completed match.
  - [ ] Route tests cover the above cases.

  **QA Scenarios**:
  ```
  Scenario: Matching reports complete a match exactly once
    Tool: Bash (npm test)
    Preconditions: One pending match with two fixture players.
    Steps:
      1. Run the route test where both players report the same winner.
      2. Assert match status becomes completed and ratings change once.
      3. Assert re-running the same report does not change ratings again.
    Expected Result: Completion is transactional and idempotent.
    Failure Indicators: Double rating delta, duplicate completion timestamp, or crash.
    Evidence: .sisyphus/evidence/task-9-pvp-confirm.txt

  Scenario: Conflicting reports do not finalize the match
    Tool: Bash (npm test)
    Preconditions: One pending match with two fixture players.
    Steps:
      1. Run the conflicting-report test.
      2. Assert `confirmationStatus` remains disputed/waiting and no final winner is stored.
    Expected Result: Conflict is preserved for UI handling.
    Failure Indicators: Winner saved or ratings changed despite disagreement.
    Evidence: .sisyphus/evidence/task-9-pvp-dispute.txt
  ```

  **Evidence to Capture:**
  - [ ] Confirmation test log
  - [ ] Dispute test log

  **Commit**: YES
  - Message: `fix(pvp): harden confirmation flow`
  - Files: `app/api/pvp/route.ts`, PvP tests
  - Pre-commit: `npm test`

- [ ] 10. Improve PvP queue and matchmaking UX around the current rules

  **What to do**:
  - Make queue/matchmaking states easier to understand in the PvP UI: ready, queued, matched, disputed, and blocked conditions.
  - Align UI messaging with the hardened route behavior so users know why an action is disabled or rejected.
  - Add component/hook tests for queue-state rendering and mutation error handling.

  **Must NOT do**:
  - Do not invent a new matchmaking algorithm unless supported by the route changes.
  - Do not hide route errors behind generic copy.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Primary output is better state communication and UX clarity.
  - **Skills**: [`react-ux-patterns`, `interaction-patterns`, `toast-notification-patterns`]
    - `react-ux-patterns`: State-driven rendering across query/mutation updates.
    - `interaction-patterns`: Clear disabled/loading/error states.
    - `toast-notification-patterns`: Useful if mutation feedback needs structured messaging.
  - **Skills Evaluated but Omitted**:
    - `navigation-patterns`: No nav change is needed.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9)
  - **Blocks**: 12, 14
  - **Blocked By**: 3, 4

  **References**:
  - `components/sections/pvp/index.tsx:127` - Main PvP section state rendering.
  - `lib/hooks/usePvp.ts:10` - Query/mutation lifecycle that drives queue UI.
  - `lib/api/pvp.ts:4` - Client API methods whose errors/states must be surfaced correctly.

  **Acceptance Criteria**:
  - [ ] PvP UI distinguishes queued, matched, disputed, and blocked states clearly.
  - [ ] Mutation failures show actionable feedback.
  - [ ] Queue-related component/hook tests pass.

  **QA Scenarios**:
  ```
  Scenario: Queue state transitions are visible in UI
    Tool: Playwright
    Preconditions: Logged in user with PvP page available.
    Steps:
      1. Open `/pvp` and confirm initial `Готов к подбору` state.
      2. Click `Встать в очередь`.
      3. Assert the status changes to queued and the leave action becomes available.
    Expected Result: User sees immediate, correct queue-state feedback.
    Failure Indicators: Status text does not change or wrong action remains enabled.
    Evidence: .sisyphus/evidence/task-10-pvp-queue.png

  Scenario: Active-match conflict error is shown cleanly
    Tool: Playwright
    Preconditions: Backend mocked or seeded so the user already has an active match.
    Steps:
      1. Attempt to queue again.
      2. Assert the UI surfaces a clear conflict message instead of a generic failure.
    Expected Result: Blocked action is understandable and recoverable.
    Failure Indicators: Silent failure, generic crash, or contradictory button state.
    Evidence: .sisyphus/evidence/task-10-pvp-queue-error.png
  ```

  **Evidence to Capture:**
  - [ ] Queue transition screenshot
  - [ ] Queue conflict screenshot

  **Commit**: YES
  - Message: `feat(pvp): clarify queue and matchmaking states`
  - Files: `components/sections/pvp/index.tsx`, PvP UI tests
  - Pre-commit: `npm test`

- [ ] 11. Stabilize PvP rating and leaderboard invariants

  **What to do**:
  - Make the rating/leaderboard behavior explicit and test-backed under the selected confirmation rules.
  - Ensure the leaderboard remains consistent after completed matches and unchanged after disputed ones.
  - Update user-facing messaging so the rating model is understandable without changing the broader role system.

  **Must NOT do**:
  - Do not silently change ratings for disputed/unconfirmed matches.
  - Do not introduce seasons/history systems in this package.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires careful numeric/state invariants across match completion.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful for deterministic testing/math references if needed.
  - **Skills Evaluated but Omitted**:
    - `visual-design-system`: Data correctness comes first.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14)
  - **Blocks**: 12, 14
  - **Blocked By**: 3, 4, 9

  **References**:
  - `app/api/pvp/route.ts:67` - Rating formula currently in use.
  - `app/api/pvp/route.ts:282` - Leaderboard loading query and ordering.
  - `components/sections/pvp/index.tsx:223` - Leaderboard presentation contract.

  **Acceptance Criteria**:
  - [ ] Completed matches update leaderboard deterministically.
  - [ ] Disputed/unconfirmed matches leave ratings unchanged.
  - [ ] Rating/leaderboard tests cover both cases.

  **QA Scenarios**:
  ```
  Scenario: Completed match changes leaderboard predictably
    Tool: Bash (npm test)
    Preconditions: Two players with known initial ratings.
    Steps:
      1. Run the rating-invariant test for a confirmed match result.
      2. Assert both players' ratings change once and leaderboard order updates accordingly.
    Expected Result: Rating math and leaderboard ordering remain internally consistent.
    Failure Indicators: Only one rating changes, order is stale, or repeated completion changes values again.
    Evidence: .sisyphus/evidence/task-11-pvp-rating.txt

  Scenario: Disputed match leaves leaderboard unchanged
    Tool: Bash (npm test)
    Preconditions: Pending match with conflicting reports.
    Steps:
      1. Run the disputed-match rating test.
      2. Assert no leaderboard delta occurs.
    Expected Result: Disputes do not affect ratings.
    Failure Indicators: Rating or leaderboard changes despite dispute.
    Evidence: .sisyphus/evidence/task-11-pvp-rating-dispute.txt
  ```

  **Evidence to Capture:**
  - [ ] Rating invariant test log
  - [ ] Dispute/no-change test log

  **Commit**: YES
  - Message: `fix(pvp): stabilize rating and leaderboard behavior`
  - Files: PvP route/leaderboard tests and messaging
  - Pre-commit: `npm test`

- [ ] 12. Polish PvP match UI for confirmation, dispute, loading, and recovery states

  **What to do**:
  - Update the active-match and recent-match surfaces so confirmation/dispute/loading/error states are obvious.
  - Ensure the UI reflects the hardened backend rules from Tasks 9-11 with explicit labels and actions.
  - Add UI tests for confirmed, waiting, disputed, and unavailable PvP states.

  **Must NOT do**:
  - Do not add unrelated PvP features such as brackets, replays, or moderation panels.
  - Do not leave contradictory UI labels versus backend state.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: This is the user-facing finishing pass for PvP clarity.
  - **Skills**: [`react-ux-patterns`, `interaction-patterns`, `status-visualization-patterns`]
    - `react-ux-patterns`: State-driven React rendering.
    - `interaction-patterns`: Recovery/error/loading handling.
    - `status-visualization-patterns`: Clear visual differences between waiting/disputed/confirmed.
  - **Skills Evaluated but Omitted**:
    - `drag-drop-patterns`: Not relevant.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 13, 14)
  - **Blocks**: 14
  - **Blocked By**: 9, 10, 11

  **References**:
  - `components/sections/pvp/index.tsx:28` - Match card UI and current report controls.
  - `components/sections/pvp/index.tsx:115` - Error/empty state handling.
  - `lib/schemas/pvp.ts:35` - `yourReport`, `opponentReport`, and `confirmationStatus` fields the UI must honor.

  **Acceptance Criteria**:
  - [ ] Match card clearly distinguishes waiting, disputed, and confirmed outcomes.
  - [ ] Empty/error/loading PvP states are explicit and actionable.
  - [ ] UI tests cover the major state variants.

  **QA Scenarios**:
  ```
  Scenario: Disputed active match is obvious in UI
    Tool: Playwright
    Preconditions: PvP state fixture with one active disputed match.
    Steps:
      1. Open `/pvp`.
      2. Assert the match card displays the dispute state and both player report statuses.
      3. Capture the screen.
    Expected Result: Users can tell the match is disputed and not finalized.
    Failure Indicators: Match looks confirmed/normal or hides report mismatch.
    Evidence: .sisyphus/evidence/task-12-pvp-dispute-ui.png

  Scenario: PvP unavailable state remains recoverable
    Tool: Playwright
    Preconditions: PvP API mocked to fail once.
    Steps:
      1. Open `/pvp`.
      2. Assert the error state appears with a retry action.
      3. Trigger retry and verify the page recovers when the API succeeds.
    Expected Result: Failure path is understandable and recoverable.
    Failure Indicators: Blank screen, endless spinner, or no retry option.
    Evidence: .sisyphus/evidence/task-12-pvp-error-ui.png
  ```

  **Evidence to Capture:**
  - [ ] Dispute-state screenshot
  - [ ] Error/retry screenshot

  **Commit**: YES
  - Message: `feat(pvp): polish match and recovery states`
  - Files: `components/sections/pvp/index.tsx`, related tests
  - Pre-commit: `npm test`

- [ ] 13. Add regression coverage for guild editing and role explainer surfaces

  **What to do**:
  - Add Vitest coverage for the structured guild editor, profile/admin guild visibility, and role explainer rendering.
  - Cover permission-sensitive cases so future refactors do not accidentally widen access or drift copy from authz behavior.
  - Keep tests aligned with the shared fixtures from Task 5.

  **Must NOT do**:
  - Do not duplicate fixture setup already created in Task 5.
  - Do not rely solely on manual/browser verification for these surfaces.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Focused regression coverage for completed UI work.
  - **Skills**: [`react-ux-patterns`]
    - `react-ux-patterns`: Useful for component/render-state tests.
  - **Skills Evaluated but Omitted**:
    - `playwright`: Browser QA already exists as task verification; this task is Vitest regression coverage.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 14)
  - **Blocks**: Final
  - **Blocked By**: 1, 2, 5, 6, 7, 8

  **References**:
  - `components/sections/registration/RegistrationTable.tsx:91` - Main editable registration table surface.
  - `components/sections/profile/index.tsx:152` - Profile surface where guild/role clarity lives.
  - `tests/hooks/useGuides.test.tsx:47` - Existing React Query + Vitest wrapper pattern.

  **Acceptance Criteria**:
  - [ ] Guild editor has regression coverage for render, submit, and failure state.
  - [ ] Profile/admin guild visibility has regression coverage.
  - [ ] Role explainer rendering/content has regression coverage.

  **QA Scenarios**:
  ```
  Scenario: Guild and role UI regression suite passes
    Tool: Bash (npm test)
    Preconditions: Component tests created for registration/profile surfaces.
    Steps:
      1. Run the targeted regression suite for registration/profile UI.
      2. Assert all guild-edit and role-explainer tests pass.
    Expected Result: UI regressions are covered automatically.
    Failure Indicators: Missing render path, broken submit flow, or incorrect explainer content.
    Evidence: .sisyphus/evidence/task-13-ui-regression.txt

  Scenario: Permission-sensitive rendering remains intact
    Tool: Bash (npm test)
    Preconditions: Tests render surfaces under `member` and `officer/head` roles.
    Steps:
      1. Run permission-sensitive UI assertions.
      2. Assert members cannot see officer-only editing controls and all users can read the role explainer.
    Expected Result: Visibility and edit affordances stay correctly bounded.
    Failure Indicators: Permission drift in rendered UI.
    Evidence: .sisyphus/evidence/task-13-ui-boundaries.txt
  ```

  **Evidence to Capture:**
  - [ ] UI regression test log
  - [ ] Permission-boundary test log

  **Commit**: YES
  - Message: `test(ui): cover guild editing and role explainer`
  - Files: registration/profile tests
  - Pre-commit: `npm test`

- [ ] 14. Add end-to-end Vitest coverage for PvP route, hooks, and critical state rendering

  **What to do**:
  - Add final regression coverage that spans PvP route behavior, hook invalidation, and critical UI state rendering.
  - Ensure the suite covers queue join/leave, match creation, report confirm/dispute, leaderboard stability, and visible state changes.
  - Use deterministic fixtures so future work cannot regress PvP silently.

  **Must NOT do**:
  - Do not leave PvP validation split across ad hoc manual checks only.
  - Do not add flaky timing-dependent assertions without stable fixtures.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Broad regression coverage across backend + hooks + UI state.
  - **Skills**: [`react-ux-patterns`, `documentation-lookup`]
    - `react-ux-patterns`: Hook/UI state assertions.
    - `documentation-lookup`: Helpful for any route/test harness references.
  - **Skills Evaluated but Omitted**:
    - `playwright`: This task is deterministic regression coverage, not browser QA.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13)
  - **Blocks**: Final
  - **Blocked By**: 3, 4, 5, 9, 10, 11, 12

  **References**:
  - `app/api/pvp/route.ts:406` - GET/POST/DELETE/PATCH route surface to cover.
  - `lib/hooks/usePvp.ts:10` - Query/mutation invalidation contract.
  - `components/sections/pvp/index.tsx:98` - Primary UI state consumer.
  - `lib/api/pvp.ts:4` - Client API boundary used by hooks.

  **Acceptance Criteria**:
  - [ ] PvP route regression tests cover queue, match, report, conflict, dispute, and completion paths.
  - [ ] Hook tests cover invalidation after join/leave/report mutations.
  - [ ] Component tests cover critical visible states.
  - [ ] Full PvP regression suite passes under `npm test`.

  **QA Scenarios**:
  ```
  Scenario: Full PvP regression suite passes
    Tool: Bash (npm test)
    Preconditions: PvP route/hook/component tests exist with deterministic fixtures.
    Steps:
      1. Run the targeted PvP regression suite.
      2. Assert all queue, report, dispute, and leaderboard tests pass.
      3. Save the output log.
    Expected Result: PvP behavior is covered end-to-end within Vitest.
    Failure Indicators: Any regression in route transitions, invalidation, or rendered states.
    Evidence: .sisyphus/evidence/task-14-pvp-regression.txt

  Scenario: Mutation invalidation refreshes visible PvP state
    Tool: Bash (npm test)
    Preconditions: Hook/component test with mocked `pvpApi` and QueryClient.
    Steps:
      1. Run the hook invalidation test after `joinQueue`, `leaveQueue`, and `reportResult` mutations.
      2. Assert the PvP query key is invalidated each time.
    Expected Result: UI can refresh reliably after PvP actions.
    Failure Indicators: Mutation succeeds without invalidating state.
    Evidence: .sisyphus/evidence/task-14-pvp-hooks.txt
  ```

  **Evidence to Capture:**
  - [ ] Full PvP regression log
  - [ ] Hook invalidation log

  **Commit**: YES
  - Message: `test(pvp): add full route and ui regression coverage`
  - Files: PvP route/hook/component tests
  - Pre-commit: `npm test`

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Verify every must-have, must-not-have, task deliverable, and evidence artifact against the final implementation.

- [ ] F2. **Code Quality Review** - `unspecified-high`
  Run `npm run type-check`, `npm test`, and lint-equivalent project checks. Review touched files for unsafe casts, dead paths, console noise, and over-scoped changes.

- [ ] F3. **Real QA** - `unspecified-high`
  Execute every task QA scenario, capture screenshots/responses/logs, and verify cross-task behavior from a clean state.

- [ ] F4. **Scope Fidelity Check** - `deep`
  Compare implemented diffs against task scopes and reject any permission-model drift, guild-management expansion, or unplanned PvP feature creep.

---

## Commit Strategy

- Group by wave where safe; avoid mixing registration/role work with PvP route work unless required for integration.
- Prefer commits such as `feat(registration): replace prompt clan editor`, `feat(profile): add role explainer`, `fix(pvp): harden confirmation flow`, `test(pvp): cover queue and dispute cases`.

---

## Success Criteria

### Verification Commands
```bash
npm test
npm run type-check
```

### Final Checklist
- [ ] Clan editing is structured and no longer prompt-based
- [ ] Role explainer is visible and matches current authorization behavior
- [ ] PvP queue/report/rating flows handle happy-path and conflict cases
- [ ] New tests cover touched guild, role, and PvP behavior
