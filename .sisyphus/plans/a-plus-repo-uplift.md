# A+ Repo Uplift Plan

## TL;DR

> **Quick Summary**: Converge the repository onto an app-owned-DB architecture, close unintended public surfaces, remove runtime schema mutation from request paths, repair the broken quality gate workflow, and finish the missing i18n/accessibility/product-quality work needed to move the repo from mixed `C/B` grades to `A+`/`S`.
>
> **Deliverables**:
> - Consistent backend architecture and matching docs
> - Authenticated-by-default read surface with explicit public allowlist
> - Migration/startup strategy replacing request-time `ensure*Schema` calls
> - Working `lint/type-check/test/build` quality gate and CI workflow
> - Completed i18n/a11y uplift for the critical portal flows
>
> **Estimated Effort**: XL
> **Parallel Execution**: YES - 3 implementation waves + final verification
> **Critical Path**: Task 3 -> Task 9 -> Task 10 -> Task 11 -> Task 12 -> Task 13/14

---

## Context

### Original Request
Raise the entire repository to `A+` or `S` quality across architecture, code quality, DX, security, testing, accessibility, i18n, and related engineering dimensions.

### Interview Summary
**Key Discussions**:
- The uplift is repo-wide, not a narrow fix.
- Data reads should require auth by default unless they are explicitly public.
- The work should be TDD-first.
- The target architecture is `app owns DB`; the Discord bot becomes an integration/adapter, not the primary system boundary.

**Research Findings**:
- The runtime architecture no longer matches the bot-proxy-only docs in `ARCHITECTURE.md` and `README.md`.
- Several request handlers still perform schema DDL through `ensure*Schema` helpers.
- The repo health baseline is mixed: `test`, `type-check`, and `build` pass; `lint` is misconfigured and direct ESLint still reports active issues.
- i18n and accessibility have solid partial foundations but are incomplete at the product layer.

### Metis Review
**Identified Gaps** (addressed):
- Public/private surface area must be explicitly allowlisted, not implied.
- Request-path DDL must be banned as a hard guardrail, not treated as an optional cleanup.
- The plan must constrain scope so i18n/a11y/docs improvements do not balloon into redesign or unrelated feature work.
- Acceptance criteria must explicitly cover: quality gates, auth defaults, zero request-path DDL, locale behavior, and docs alignment.

---

## Work Objectives

### Core Objective
Make the repository internally consistent, operationally safer, and auditable enough to justify `A+`/`S` grades: one backend story, one security posture, one migration story, working quality gates, and complete enough product-level i18n/accessibility coverage for the main portal flows.

### Concrete Deliverables
- Updated architecture and contributor documentation in `ARCHITECTURE.md`, `README.md`, and migration runbooks
- Explicit route access matrix and authenticated-by-default read policy
- Removal of request-time schema mutation from route handlers
- Passing `npm run lint`, `npm run type-check`, `npm run test`, and `npm run build`
- Dynamic locale handling and removal of high-impact hardcoded portal strings
- Accessibility improvements for navigation, filters, forms, and modal flows

### Definition of Done
- [ ] `npm run lint` exits `0`
- [ ] `npm run type-check` exits `0`
- [ ] `npm run test` exits `0`
- [ ] `npm run build` exits `0`
- [ ] Non-allowlisted read routes reject unauthenticated access
- [ ] No request handler contains runtime schema DDL or `ensure*Schema` invocation
- [ ] Docs match the live architecture and security model

### Must Have
- App-owned-DB architecture made explicit in code and docs
- Protected-by-default route policy with tests
- TDD-first implementation for risky backend/security changes
- Agent-executed QA for every task and final verification wave
- Scope control: no unrelated feature delivery

### Must NOT Have (Guardrails)
- No new product features unrelated to the audit dimensions
- No runtime DDL in request paths after the uplift
- No undocumented public data endpoints
- No cosmetic-only redesign work beyond a11y/i18n/clarity needs
- No silent fallback behavior that converts backend failure into false success

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: TDD
- **Framework**: `vitest` (+ Playwright for browser QA if added during execution)
- **If TDD**: Each risky task follows RED -> GREEN -> REFACTOR

### QA Policy
Every task must include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (`curl`) — assert status codes, response shapes, auth boundaries
- **Library/Module**: Use Bash (`npm run test -- <target>` / `node -e`) — verify exports and behavior
- **Repo quality gates**: Use Bash — `npm run lint`, `npm run type-check`, `npm run test`, `npm run build`

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately — foundations + constraints):
├── Task 1: Repair lint workflow and quality gate baseline [quick]
├── Task 2: Rewrite architecture docs and publish route access matrix [writing]
├── Task 3: Introduce migration/startup boundary and ban request-path DDL [deep]
├── Task 4: Centralize auth/error/allowlist route policy primitives [unspecified-high]
└── Task 5: Establish i18n/a11y platform defaults [visual-engineering]

Wave 2 (After Wave 1 — backend convergence, max parallel):
├── Task 6: Secure and harden schedule route [unspecified-high]
├── Task 7: Secure and harden rules route [unspecified-high]
├── Task 8: Secure and harden PvP read surface [deep]
├── Task 9: Remove auth/account request-time schema bootstrapping [deep]
├── Task 10: Remove guide/help request-time schema bootstrapping [deep]
└── Task 11: Realign discord-proxy surfaces to app-owned DB architecture [deep]

Wave 3 (After Wave 2 — frontend correctness + product polish):
├── Task 12: Fix current ESLint/React correctness violations [quick]
├── Task 13: Complete i18n coverage and dynamic locale application [visual-engineering]
├── Task 14: Complete accessibility remediation for navigation, forms, and modal flows [visual-engineering]
└── Task 15: Add CI/automation and final contributor runbooks [writing]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: 3 -> 9 -> 10 -> 11 -> 12 -> 13/14 -> 15 -> F1-F4
Parallel Speedup: ~60-70% faster than sequential execution
Max Concurrent: 6

### Dependency Matrix

- **1**: none -> 12, 15
- **2**: none -> 11, 15
- **3**: none -> 8, 9, 10, 11
- **4**: none -> 6, 7, 8, 11
- **5**: none -> 13, 14
- **6**: 4 -> 15
- **7**: 4 -> 15
- **8**: 3, 4 -> 15
- **9**: 3 -> 15
- **10**: 3 -> 15
- **11**: 2, 3, 4 -> 15
- **12**: 1 -> 13, 14, 15
- **13**: 5, 12 -> 15
- **14**: 5, 12 -> 15
- **15**: 1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14 -> F1, F2, F3, F4

### Agent Dispatch Summary

- **1**: **5** — T1 `quick`, T2 `writing`, T3 `deep`, T4 `unspecified-high`, T5 `visual-engineering`
- **2**: **6** — T6 `unspecified-high`, T7 `unspecified-high`, T8 `deep`, T9 `deep`, T10 `deep`, T11 `deep`
- **3**: **4** — T12 `quick`, T13 `visual-engineering`, T14 `visual-engineering`, T15 `writing`
- **FINAL**: **4** — F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] 1. Repair lint workflow and quality gate baseline

  **What to do**:
  - Replace the broken Next 16 `next lint` script with ESLint CLI usage and collapse repo lint config to one source of truth.
  - Add a single documented quality-gate command flow covering `lint`, `type-check`, `test`, and `build`.
  - Capture the current ESLint failures as the baseline to be burned down by later tasks.

  **Must NOT do**:
  - Do not weaken lint rules just to get a green run.
  - Do not keep both legacy and flat ESLint paths active.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: mostly config/script repair with limited file spread.
  - **Skills**: [`documentation-lookup`, `git-master`]
    - `documentation-lookup`: verify Next.js 16 lint migration details.
    - `git-master`: keep config changes atomic and reviewable.
  - **Skills Evaluated but Omitted**:
    - `playwright`: no browser work in this task.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-5)
  - **Blocks**: 12, 15
  - **Blocked By**: None

  **References**:
  - `package.json:6` - current scripts, including the broken `lint` entry.
  - `.eslintrc.json:1` - legacy config still present.
  - `eslint.config.js:1` - flat config already exists; this should become the single source of truth.
  - `next.config.ts:1` - confirm there is no lingering removed Next.js lint config.
  - Official docs: `https://nextjs.org/docs/app/guides/upgrading/version-16` - `next lint` removal in Next 16.

  **Acceptance Criteria**:
  - [ ] `npm run lint` executes ESLint directly and exits with a real lint result.
  - [ ] There is one authoritative ESLint config path, not two competing ones.
  - [ ] Contributor docs or scripts clearly show the repo quality-gate sequence.

  **QA Scenarios**:
  ```
  Scenario: Lint command works from package script
    Tool: Bash
    Preconditions: Repository dependencies installed
    Steps:
      1. Run `npm run lint` from repo root.
      2. Confirm the command invokes ESLint CLI rather than `next lint`.
      3. Capture the exit code and output.
    Expected Result: Script runs the correct tool and returns a truthful lint result.
    Failure Indicators: Output contains `next lint`, `Invalid project directory`, or script cannot start.
    Evidence: .sisyphus/evidence/task-1-lint-command.txt

  Scenario: Quality gate commands are documented consistently
    Tool: Bash
    Preconditions: Updated docs/scripts committed in working tree
    Steps:
      1. Read `package.json` and the updated contributor docs.
      2. Verify the sequence `lint -> type-check -> test -> build` is present and consistent.
    Expected Result: Script names and docs align exactly.
    Failure Indicators: Docs reference obsolete commands or omit required gates.
    Evidence: .sisyphus/evidence/task-1-quality-gates.txt
  ```

  **Commit**: YES
  - Message: `chore(dx): repair lint workflow baseline`
  - Files: `package.json`, `eslint.config.js`, `.eslintrc.json`, docs if touched
  - Pre-commit: `npm run lint`

- [ ] 2. Rewrite architecture docs and publish route access matrix

  **What to do**:
  - Rewrite architecture docs to reflect the chosen target model: app-owned DB, bot as integration/adapter.
  - Add an explicit route access matrix covering public vs authenticated vs role-gated endpoints.
  - Add a migration/runbook section describing the new source of truth for schema changes.

  **Must NOT do**:
  - Do not leave any “bot-proxy-only” claims in the docs.
  - Do not document public endpoints implicitly; every exception must be explicit.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: this is documentation architecture work grounded in repo reality.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: keep framework/runtime statements current.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: not a UI implementation task.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-5)
  - **Blocks**: 11, 15
  - **Blocked By**: None

  **References**:
  - `ARCHITECTURE.md:49` - outdated bot-proxy architecture claims to replace.
  - `README.md:52` - public-facing setup/runtime statements that must match reality.
  - `app/api/news/route.ts:19` - direct DB route evidence.
  - `app/api/help/route.ts:50` - direct DB route evidence.
  - `app/api/schedule/route.ts:105` - route behavior and current public read surface.
  - `app/api/rules/route.ts:57` - public rules read surface.
  - `app/api/pvp/route.ts:450` - anonymous PvP GET behavior.

  **Acceptance Criteria**:
  - [ ] `ARCHITECTURE.md` and `README.md` describe the same backend model.
  - [ ] Docs contain a public API allowlist / route access matrix.
  - [ ] Docs contain a migration/runbook section explaining how schema changes are applied.

  **QA Scenarios**:
  ```
  Scenario: Architecture docs match chosen runtime model
    Tool: Bash
    Preconditions: Updated docs saved
    Steps:
      1. Read `ARCHITECTURE.md` and `README.md`.
      2. Search for `bot-proxy-only`, `DB not directly accessible`, and similar obsolete claims.
      3. Confirm both docs state that the app owns DB access for portal data.
    Expected Result: No stale architecture claims remain; both docs match the chosen model.
    Failure Indicators: Contradictory architecture statements or missing DB ownership clarification.
    Evidence: .sisyphus/evidence/task-2-architecture-docs.txt

  Scenario: Route access matrix is explicit
    Tool: Bash
    Preconditions: Access matrix added to docs
    Steps:
      1. Verify docs enumerate schedule, rules, PvP, auth, guide, help, and admin surfaces.
      2. Confirm each route is marked as public, authenticated, or role-gated.
    Expected Result: No ambiguous endpoint exposure remains in documentation.
    Failure Indicators: Missing routes or undocumented exceptions.
    Evidence: .sisyphus/evidence/task-2-route-matrix.txt
  ```

  **Commit**: YES
  - Message: `docs(architecture): align docs with live backend model`
  - Files: `ARCHITECTURE.md`, `README.md`, migration/security docs
  - Pre-commit: doc consistency review

- [ ] 3. Introduce migration/startup boundary and ban request-path DDL

  **What to do**:
  - Define the single mechanism for schema creation/migration outside request handlers.
  - Establish the repo rule that route handlers cannot invoke `ensure*Schema` or execute DDL.
  - Add detection/checks that fail when request handlers reintroduce runtime schema mutation.

  **Must NOT do**:
  - Do not leave process-local `runServerTaskOnce` as the long-term migration safety story.
  - Do not split migration ownership between multiple ad hoc systems.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: architecture and data-lifecycle decision with repo-wide impact.
  - **Skills**: [`documentation-lookup`, `git-master`]
    - `documentation-lookup`: confirm the chosen migration tool/setup pattern.
    - `git-master`: keep foundational changes staged coherently.
  - **Skills Evaluated but Omitted**:
    - `playwright`: no browser interaction needed.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: 8, 9, 10, 11
  - **Blocked By**: None

  **References**:
  - `lib/server/db-cache.ts:3` - current in-memory once/coalescing behavior; insufficient as migration control.
  - `app/api/pvp/route.ts:106` - request-time schema bootstrapping example.
  - `app/api/rules/route.ts:13` - request-time rules table creation.
  - `lib/guides/schema.ts:4` - guide schema helper currently called from request paths.
  - `lib/auth/accounts.ts:22` - accounts schema helper currently called from auth handlers.
  - `MIGRATION_DB.md:1` - existing migration notes to either adopt or supersede.

  **Acceptance Criteria**:
  - [ ] A single migration/startup mechanism exists and is documented.
  - [ ] Route handlers no longer own schema DDL policy.
  - [ ] A repo check exists to catch `ensure*Schema` usage inside request handlers.

  **QA Scenarios**:
  ```
  Scenario: Request handlers are free of schema bootstrap calls
    Tool: Bash
    Preconditions: Migration boundary implemented
    Steps:
      1. Search `app/api/**/*.ts` for `ensure` schema calls and DDL statements.
      2. Verify results are zero or limited to non-handler bootstrapping code outside request paths.
    Expected Result: No request handler performs schema creation or alteration.
    Failure Indicators: Any `ensure*Schema` call or `CREATE/ALTER TABLE` remains under `app/api` request handlers.
    Evidence: .sisyphus/evidence/task-3-no-request-ddl.txt

  Scenario: Migration mechanism is runnable and documented
    Tool: Bash
    Preconditions: Migration tool or script added
    Steps:
      1. Run the documented migration/status command.
      2. Confirm it exits successfully and matches the runbook.
    Expected Result: Migrations are executed by an explicit mechanism outside request handling.
    Failure Indicators: No runnable migration command or undocumented manual steps.
    Evidence: .sisyphus/evidence/task-3-migration-run.txt
  ```

  **Commit**: YES
  - Message: `refactor(db): move schema changes out of request paths`
  - Files: migration files/tooling, affected schema helpers, docs
  - Pre-commit: migration/status command + search check

- [ ] 4. Centralize auth, error, and route allowlist policy primitives

  **What to do**:
  - Create one shared policy layer for route auth defaults, public allowlist exceptions, and consistent 401/403 behavior.
  - Standardize JSON error shape and no-store behavior where appropriate.
  - Provide a reusable test pattern for route auth boundary coverage.

  **Must NOT do**:
  - Do not leave each route to implement auth defaults independently.
  - Do not mix inconsistent unauthorized/forbidden semantics across equivalent endpoints.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: cross-cutting backend policy with moderate breadth.
  - **Skills**: [`git-master`]
    - `git-master`: helps keep shared-policy refactors isolated and traceable.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: this is primarily internal consistency work.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-3, 5)
  - **Blocks**: 6, 7, 8, 11
  - **Blocked By**: None

  **References**:
  - `lib/auth/request.ts:11` - token extraction, cookie clearing, same-origin helper.
  - `app/api/verify-auth/route.ts:7` - good pattern for no-store auth verification response handling.
  - `lib/authz.ts:1` - role checks already exist and should plug into the shared route policy.
  - `tests/lib/authz.test.ts:1` - existing test style for authz behavior.
  - `app/api/logout/route.ts:5` - same-origin mutation protection example.

  **Acceptance Criteria**:
  - [ ] A single shared route-policy mechanism exists for public/authenticated/role-gated reads.
  - [ ] 401 vs 403 behavior is consistent across route handlers.
  - [ ] Error responses follow one documented JSON shape.

  **QA Scenarios**:
  ```
  Scenario: Shared route guard enforces protected-by-default behavior
    Tool: Bash
    Preconditions: Shared route policy wired into at least one protected endpoint
    Steps:
      1. Call a protected GET endpoint without auth.
      2. Call the same endpoint with a valid auth cookie or bearer token.
      3. Compare returned status codes and error shape.
    Expected Result: Unauthenticated access returns 401/403; authenticated access succeeds; error shape is consistent.
    Failure Indicators: Protected route still leaks data anonymously or returns inconsistent JSON errors.
    Evidence: .sisyphus/evidence/task-4-route-guard.txt

  Scenario: Same-origin mutation protection still works
    Tool: Bash
    Preconditions: Mutation route available
    Steps:
      1. Send a mutation request with mismatched `Origin` and `Host` where same-origin is required.
      2. Assert the route rejects the request.
    Expected Result: Mutating route returns 403 for forbidden origin.
    Failure Indicators: Request succeeds or returns inconsistent status.
    Evidence: .sisyphus/evidence/task-4-same-origin.txt
  ```

  **Commit**: YES
  - Message: `refactor(api): centralize route auth and error policy`
  - Files: shared auth/error helpers, representative route tests
  - Pre-commit: route auth tests

- [ ] 5. Establish i18n and accessibility platform defaults

  **What to do**:
  - Define the shared locale-selection rule and apply a dynamic `html[lang]` strategy.
  - Introduce shared navigation/accessibility primitives for skip-link behavior, dialog semantics, and field labeling expectations.
  - Set repo guardrails so i18n/a11y fixes stay focused on semantics, focus, labels, and critical strings.

  **Must NOT do**:
  - Do not turn this task into a full translation rewrite.
  - Do not couple accessibility fixes to a visual redesign.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: shared UI/UX platform behavior with accessibility implications.
  - **Skills**: [`wcag-accessibility`, `frontend-design`]
    - `wcag-accessibility`: ensure semantic/focus requirements are explicit.
    - `frontend-design`: keep UX consistent while adding affordances.
  - **Skills Evaluated but Omitted**:
    - `playwright`: verification comes later; this task defines the platform primitives.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4)
  - **Blocks**: 13, 14
  - **Blocked By**: None

  **References**:
  - `app/layout.tsx:38` - current hardcoded `lang="ru"` root behavior.
  - `lib/i18n/context.tsx:27` - locale persistence and provider logic.
  - `components/shell/Header.tsx:202` - current accessible label pattern worth preserving.
  - `components/sections/guides/GuideModal.tsx:237` - modal flow currently missing stronger dialog semantics.
  - `components/sections/registration/RegistrationFilters.tsx:26` - missing filter labels to use as baseline defect.

  **Acceptance Criteria**:
  - [ ] Locale selection rule is documented and wired to root layout behavior.
  - [ ] Shared skip-link/dialog/form-label expectations are documented or codified in reusable primitives.
  - [ ] i18n/a11y scope guardrails are explicit in docs or contributor guidance.

  **QA Scenarios**:
  ```
  Scenario: Root layout can represent the active locale dynamically
    Tool: Bash
    Preconditions: Locale selection rule implemented
    Steps:
      1. Inspect the root layout and locale provider wiring.
      2. Verify `lang` is not hardcoded to `ru` only.
    Expected Result: Root locale behavior is dynamic or derived from a documented source.
    Failure Indicators: `html` language remains hardcoded regardless of active locale.
    Evidence: .sisyphus/evidence/task-5-dynamic-lang.txt

  Scenario: Accessibility primitives exist for critical flows
    Tool: Bash
    Preconditions: Shared a11y patterns introduced
    Steps:
      1. Verify skip-link and dialog/field-label guidance or utilities exist.
      2. Confirm target consumers are identified for follow-up tasks.
    Expected Result: Shared platform baseline exists before page-level remediation starts.
    Failure Indicators: Page-level tasks would still need to invent accessibility behavior from scratch.
    Evidence: .sisyphus/evidence/task-5-a11y-baseline.txt
  ```

  **Commit**: YES
  - Message: `feat(platform): define locale and accessibility defaults`
  - Files: `app/layout.tsx`, i18n provider/shared UI utilities or docs
  - Pre-commit: targeted locale/a11y tests if introduced

- [ ] 6. Secure and harden the schedule route

  **What to do**:
  - Require authentication for schedule reads and document the route as protected in the published matrix.
  - Remove the silent `200 []` error fallback and return truthful error semantics.
  - Add tests for unauthenticated, authenticated, and failure-path behavior.

  **Must NOT do**:
  - Do not preserve anonymous data access by accident.
  - Do not mask backend failure as success.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: focused API hardening with test coverage.
  - **Skills**: [`git-master`]
    - `git-master`: keep route + tests bundled cleanly.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: no major external API ambiguity here.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7-11)
  - **Blocks**: 15
  - **Blocked By**: 4

  **References**:
  - `app/api/schedule/route.ts:105` - current public GET and silent fallback behavior.
  - `lib/auth/request.ts:11` - auth token extraction helper.
  - `lib/auth.ts:51` - token verification helper.
  - `lib/schemas/schedule.ts:1` - payload validation patterns already in use.
  - `tests/api/client.test.ts:125` - response validation and typed error pattern.

  **Acceptance Criteria**:
  - [ ] Unauthenticated schedule reads return 401/403.
  - [ ] Authenticated reads return 200 with validated payload.
  - [ ] Backend failures return truthful error status and message shape.

  **QA Scenarios**:
  ```
  Scenario: Anonymous schedule read is rejected
    Tool: Bash (curl)
    Preconditions: No auth cookie or bearer token present
    Steps:
      1. Run `curl -i http://localhost:3000/api/schedule`.
      2. Inspect HTTP status and response JSON.
    Expected Result: Response is 401 or 403 with structured error payload.
    Failure Indicators: Response is 200 with live data or empty array.
    Evidence: .sisyphus/evidence/task-6-schedule-anon.txt

  Scenario: Authenticated schedule read succeeds and failures are truthful
    Tool: Bash (curl)
    Preconditions: Valid auth token available; test DB or backend reachable
    Steps:
      1. Call `GET /api/schedule` with auth.
      2. Temporarily induce a backend/read-model failure in the test setup.
      3. Re-run the call and inspect status.
    Expected Result: Authenticated success returns 200; induced failure returns non-200 error JSON.
    Failure Indicators: Failure still returns `200 []`.
    Evidence: .sisyphus/evidence/task-6-schedule-auth.txt
  ```

  **Commit**: YES
  - Message: `fix(schedule): protect reads and surface truthful errors`
  - Files: `app/api/schedule/route.ts`, related tests
  - Pre-commit: schedule route tests

- [ ] 7. Secure and harden the rules route

  **What to do**:
  - Protect `GET /api/rules` and align the route matrix to show it as authenticated.
  - Preserve officer-only write behavior while standardizing response semantics.
  - Add route tests covering anonymous, authenticated, and officer write paths.

  **Must NOT do**:
  - Do not leave rules exposure undocumented.
  - Do not weaken existing officer-write protection.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: contained API hardening and test work.
  - **Skills**: [`git-master`]
    - `git-master`: helps keep route policy changes minimal and reviewable.
  - **Skills Evaluated but Omitted**:
    - `playwright`: API-only task.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8-11)
  - **Blocks**: 15
  - **Blocked By**: 4

  **References**:
  - `app/api/rules/route.ts:57` - current public GET behavior.
  - `app/api/rules/route.ts:42` - current officer-write guard pattern.
  - `lib/authz.ts:1` - role hierarchy source.
  - `tests/lib/authz.test.ts:1` - role expectation tests.

  **Acceptance Criteria**:
  - [ ] `GET /api/rules` rejects unauthenticated access and succeeds for authenticated users.
  - [ ] POST/PUT remain officer-gated and return consistent 401/403 behavior.
  - [ ] Route tests cover anonymous, member, and officer access cases.

  **QA Scenarios**:
  ```
  Scenario: Anonymous rules read follows the explicit policy
    Tool: Bash (curl)
    Preconditions: No auth token present
    Steps:
      1. Run `curl -i http://localhost:3000/api/rules`.
      2. Compare the result to the published route access matrix.
    Expected Result: Route behavior matches the documented policy exactly.
    Failure Indicators: Runtime behavior and docs disagree.
    Evidence: .sisyphus/evidence/task-7-rules-read.txt

  Scenario: Non-officer write is rejected, officer write succeeds
    Tool: Bash (curl)
    Preconditions: Valid member token and valid officer token available
    Steps:
      1. Send `POST /api/rules` with member auth.
      2. Send the same request with officer auth.
      3. Inspect status codes and response bodies.
    Expected Result: Member request returns 403; officer request succeeds.
    Failure Indicators: Member can mutate rules or officer request uses inconsistent error shape.
    Evidence: .sisyphus/evidence/task-7-rules-write.txt
  ```

  **Commit**: YES
  - Message: `fix(rules): align read policy and auth semantics`
  - Files: `app/api/rules/route.ts`, related tests/docs if needed
  - Pre-commit: rules route tests

- [ ] 8. Secure and harden the PvP read surface

  **What to do**:
  - Make `GET /api/pvp` authenticated-only and remove anonymous viewer-specific or summary access.
  - Ensure actor-specific data only appears for authenticated users.
  - Add tests for anonymous vs authenticated behavior and preserve rate-limit/error semantics.

  **Must NOT do**:
  - Do not leak queue/match/user-specific state to anonymous callers.
  - Do not combine this task with the full schema-bootstrap migration removal; that stays in foundation/migration tasks.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: PvP route has high complexity and mixed actor/summary behavior.
  - **Skills**: [`git-master`]
    - `git-master`: helps control a high-risk route diff.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: behavior is mostly domain-specific to this repo.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9-11)
  - **Blocks**: 15
  - **Blocked By**: 3, 4

  **References**:
  - `app/api/pvp/route.ts:450` - current GET behavior with optional token.
  - `app/api/pvp/route.ts:48` - in-memory rate-limit behavior to preserve or refine.
  - `lib/server/pvp/logic.ts:1` - PvP result/rating logic that must remain correct.
  - `tests/lib/pvp-logic.test.ts:1` - existing PvP domain tests.

  **Acceptance Criteria**:
  - [ ] Anonymous callers are rejected from `GET /api/pvp`.
  - [ ] Authenticated callers still receive their viewer-specific state correctly.
  - [ ] Existing PvP domain logic remains green under test.

  **QA Scenarios**:
  ```
  Scenario: Anonymous PvP read exposes no private state
    Tool: Bash (curl)
    Preconditions: No auth token present
    Steps:
      1. Run `curl -i http://localhost:3000/api/pvp`.
      2. Inspect whether queue position, active match, or user rating is present.
    Expected Result: Anonymous request is rejected with 401/403 and no PvP state payload.
    Failure Indicators: Any PvP state payload is returned without auth.
    Evidence: .sisyphus/evidence/task-8-pvp-anon.txt

  Scenario: Authenticated PvP read still returns viewer-specific data
    Tool: Bash (curl)
    Preconditions: Valid auth token for a queued or active user
    Steps:
      1. Call `GET /api/pvp` with auth.
      2. Assert user-specific fields are present and correct.
      3. Run the PvP logic tests.
    Expected Result: Authenticated behavior remains correct and tests pass.
    Failure Indicators: Authenticated payload loses actor-specific state or tests fail.
    Evidence: .sisyphus/evidence/task-8-pvp-auth.txt
  ```

  **Commit**: YES
  - Message: `fix(pvp): lock down anonymous read surface`
  - Files: `app/api/pvp/route.ts`, related tests
  - Pre-commit: `npm run test -- tests/lib/pvp-logic.test.ts`

- [ ] 9. Remove auth and account request-time schema bootstrapping

  **What to do**:
  - Remove `ensureAccountsSchema()` from request-time auth/account flows and move the responsibility to the chosen migration/startup path.
  - Preserve login, register, session verification, and account-read behavior.
  - Add tests for cold-start and migrated-schema expectations.

  **Must NOT do**:
  - Do not break login/register behavior while relocating schema ownership.
  - Do not leave hidden fallback schema creation in auth code paths.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: auth and account flows are sensitive and stateful.
  - **Skills**: [`git-master`]
    - `git-master`: helps isolate auth-surface changes safely.
  - **Skills Evaluated but Omitted**:
    - `playwright`: this is backend-centric.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6-8, 10-11)
  - **Blocks**: 15
  - **Blocked By**: 3

  **References**:
  - `app/api/auth/route.ts:134` - request-time accounts schema bootstrapping.
  - `app/api/auth/register/route.ts:34` - request-time accounts schema bootstrapping.
  - `app/api/admin/accounts/route.ts:40` - admin account flow dependency.
  - `lib/auth/accounts.ts:22` - current schema helper implementation.
  - `tests/lib/auth-session.test.ts:1` - session/account behavior coverage to preserve.

  **Acceptance Criteria**:
  - [ ] Auth/account route handlers no longer call `ensureAccountsSchema()`.
  - [ ] Login, registration, and account flows continue to behave correctly.
  - [ ] Tests cover migrated schema expectations and no hidden request-time bootstrapping remains.

  **QA Scenarios**:
  ```
  Scenario: Auth routes no longer own schema creation
    Tool: Bash
    Preconditions: Migration/startup mechanism in place
    Steps:
      1. Search auth/account handlers for `ensureAccountsSchema`.
      2. Verify the count is zero in request handlers.
    Expected Result: Auth/account handlers are schema-consumers only.
    Failure Indicators: Any request handler still invokes schema bootstrap logic.
    Evidence: .sisyphus/evidence/task-9-no-auth-bootstrap.txt

  Scenario: Login and register flows still work
    Tool: Bash (curl)
    Preconditions: Test database migrated; valid account fixtures available
    Steps:
      1. Call `POST /api/auth` with valid credentials.
      2. Call `POST /api/auth/register` with valid new-user payload.
      3. Assert status codes, cookie behavior, and response schema.
    Expected Result: Auth flows succeed without request-time schema creation.
    Failure Indicators: Requests fail because schema bootstrap was removed incorrectly.
    Evidence: .sisyphus/evidence/task-9-auth-flows.txt
  ```

  **Commit**: YES
  - Message: `refactor(auth): remove request-time schema bootstrapping`
  - Files: auth/account handlers, migration/bootstrap code, tests
  - Pre-commit: auth route/session tests

- [ ] 10. Remove guide and help request-time schema bootstrapping

  **What to do**:
  - Remove request-time `ensureGuideSchema()` and `ensureHelpSchema()` ownership from guide/help handlers.
  - Preserve existing guide CRUD, vote/comment, and help responder flows after migration/startup relocation.
  - Add route coverage for migrated-state assumptions.

  **Must NOT do**:
  - Do not collapse guide/help business behavior into the migration task.
  - Do not leave partial request-time bootstrapping in secondary route files.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: multiple related route families with shared schema helpers.
  - **Skills**: [`git-master`]
    - `git-master`: useful for keeping related guide/help route changes grouped.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: backend/data concern.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6-9, 11)
  - **Blocks**: 15
  - **Blocked By**: 3

  **References**:
  - `app/api/guide/route.ts:30` - guide schema bootstrapping in list/create path.
  - `app/api/guide/[id]/route.ts:31` - guide schema bootstrapping in detail/update/delete path.
  - `app/api/guide/[id]/comment/route.ts:30` - comment flow dependency.
  - `app/api/guide/[id]/vote/route.ts:33` - vote flow dependency.
  - `app/api/help/route.ts:57` - help schema bootstrapping.
  - `app/api/help/responders/route.ts:87` - responder schema bootstrapping.
  - `lib/guides/schema.ts:4` - guide schema helper.
  - `app/api/help/_shared.ts:22` - help schema helper.

  **Acceptance Criteria**:
  - [ ] Guide/help route handlers no longer invoke request-time schema bootstrap helpers.
  - [ ] Guide CRUD, comment, vote, and help responder flows still function.
  - [ ] Regression tests cover migrated-schema assumptions.

  **QA Scenarios**:
  ```
  Scenario: Guide and help handlers are free of request-time schema bootstrap calls
    Tool: Bash
    Preconditions: Migration/startup mechanism implemented
    Steps:
      1. Search `app/api/guide*` and `app/api/help*` for `ensureGuideSchema` and `ensureHelpSchema`.
      2. Confirm no request handler still invokes them.
    Expected Result: Schema bootstrap logic is absent from guide/help request handlers.
    Failure Indicators: Any route file still owns schema initialization.
    Evidence: .sisyphus/evidence/task-10-no-guide-help-bootstrap.txt

  Scenario: Guide and help core flows still work
    Tool: Bash (curl)
    Preconditions: Test fixtures and migrated schema available
    Steps:
      1. Exercise guide list/detail and a comment or vote action.
      2. Exercise help list/respond or related responder flow.
      3. Validate statuses and response shape.
    Expected Result: Core guide/help behavior still succeeds without request-path DDL.
    Failure Indicators: Flows fail because the schema is no longer created on demand.
    Evidence: .sisyphus/evidence/task-10-guide-help-flows.txt
  ```

  **Commit**: YES
  - Message: `refactor(content): remove guide/help request-time schema bootstrapping`
  - Files: guide/help handlers, schema bootstrap code, tests
  - Pre-commit: guide/help route tests

- [ ] 11. Realign discord-proxy surfaces to the app-owned DB architecture

  **What to do**:
  - Audit every `app/api/discord-proxy/*` route and decide: keep as bot-integration-only proxy, convert to direct app-owned DB route, or retire in favor of a canonical endpoint.
  - Remove hybrid fallthrough behavior that makes the route contract ambiguous.
  - Update callers/hooks so the canonical data path is clear and documented.

  **Must NOT do**:
  - Do not keep DB fallthrough hidden behind “proxy” naming.
  - Do not break frontend consumers by changing endpoints without updating the API client layer.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: architecture convergence across route families and client callers.
  - **Skills**: [`git-master`, `documentation-lookup`]
    - `git-master`: route consolidation should land atomically.
    - `documentation-lookup`: useful if any proxy/integration behavior depends on external bot contracts.
  - **Skills Evaluated but Omitted**:
    - `playwright`: browser layer is not the core concern here.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6-10)
  - **Blocks**: 15
  - **Blocked By**: 2, 3, 4

  **References**:
  - `app/api/discord-proxy/registration/route.ts:19` - route currently does both auth-protected DB access and bot proxying.
  - `app/api/discord-proxy/schedule/route.ts:1` - proxy surface to review under app-owned DB target.
  - `app/api/discord-proxy/news/route.ts:1` - proxy surface to review.
  - `app/api/discord-proxy/guides/route.ts:1` - hybrid surface to review.
  - `lib/api/registrations.ts:31` - frontend API client currently points at discord-proxy namespace.
  - `lib/registration/hooks.ts:10` - consumer hook impact.
  - `lib/news/hooks.ts:9` - consumer hook impact.

  **Acceptance Criteria**:
  - [ ] Every discord-proxy route has an explicit role in the new architecture: retained proxy, canonical route, or retired.
  - [ ] Frontend API clients point at the canonical route surface.
  - [ ] Docs and route naming no longer imply a proxy-only system when DB ownership lives in the app.

  **QA Scenarios**:
  ```
  Scenario: Client hooks hit canonical route surfaces only
    Tool: Bash
    Preconditions: Route/client realignment completed
    Steps:
      1. Inspect `lib/api/*` and related hooks for `discord-proxy` usage.
      2. Confirm each remaining usage is intentional and documented.
    Expected Result: Client call sites are aligned with the chosen backend architecture.
    Failure Indicators: Hooks still target obsolete hybrid routes without documented reason.
    Evidence: .sisyphus/evidence/task-11-client-surface.txt

  Scenario: Representative data flows still succeed through the canonical endpoints
    Tool: Bash (curl)
    Preconditions: Auth available for protected endpoints
    Steps:
      1. Call canonical registration/news/schedule endpoints.
      2. Assert success for authenticated flows and alignment with the route matrix.
    Expected Result: Data flows work through the standardized endpoint surface.
    Failure Indicators: Consumers rely on retired routes or inconsistent naming/contracts.
    Evidence: .sisyphus/evidence/task-11-canonical-flows.txt
  ```

  **Commit**: YES
  - Message: `refactor(api): align proxy surfaces with app-owned backend`
  - Files: `app/api/discord-proxy/*`, `lib/api/*`, hooks, docs
  - Pre-commit: representative route/client tests

- [ ] 12. Fix current ESLint and React correctness violations

  **What to do**:
  - Resolve the active React hook, immutability, and display-name issues currently reported by direct ESLint.
  - Preserve behavior while removing patterns that the React/Next toolchain now treats as correctness risks.
  - Add targeted tests where a lint fix changes runtime behavior or render sequencing.

  **Must NOT do**:
  - Do not mute or disable the rules to hide the problem.
  - Do not rewrite working UI flows unnecessarily while fixing targeted correctness issues.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: a bounded set of known file-level fixes.
  - **Skills**: [`git-master`]
    - `git-master`: useful for a contained cleanup commit.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: this is correctness work, not visual design.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13-14)
  - **Blocks**: 13, 14, 15
  - **Blocked By**: 1

  **References**:
  - `components/guides/MarkdownRenderer.tsx:114` - render-time mutation issue.
  - `components/sections/guides/GuideModal.tsx:53` - state-in-effect and memoization warnings.
  - `components/shell/Header.tsx:77` - state-in-effect warning.
  - `lib/i18n/context.tsx:30` - state-in-effect warning.
  - `components/sections/registration/index.tsx:35` - state-in-effect warning.
  - `tests/hooks/useGuides.test.tsx:59` - display-name error.
  - `tests/hooks/usePvp.test.tsx:34` - display-name error.

  **Acceptance Criteria**:
  - [ ] Direct ESLint no longer reports the known correctness errors in the listed files.
  - [ ] Any behavior-affecting fixes have targeted regression tests.
  - [ ] The repo remains functionally equivalent where no intended behavior change exists.

  **QA Scenarios**:
  ```
  Scenario: Known ESLint correctness violations are cleared
    Tool: Bash
    Preconditions: Fixes applied
    Steps:
      1. Run `npx eslint .`.
      2. Verify the previously reported files no longer emit the known errors.
    Expected Result: The targeted correctness violations are gone.
    Failure Indicators: The same files still report hook/immutability/display-name errors.
    Evidence: .sisyphus/evidence/task-12-eslint-fixes.txt

  Scenario: Guide modal and markdown rendering still behave after the fixes
    Tool: Playwright
    Preconditions: Dev server running; guide content fixture available
    Steps:
      1. Open `/guides` and launch the guide modal.
      2. Interact with outline links, close the modal with `Escape`, and reopen.
      3. Verify the content still renders and modal behavior remains stable.
    Expected Result: UI behavior remains correct after lint-driven code changes.
    Failure Indicators: Modal fails to open/close, heading links misbehave, or render output changes unexpectedly.
    Evidence: .sisyphus/evidence/task-12-guide-modal.png
  ```

  **Commit**: YES
  - Message: `fix(react): clear current correctness violations`
  - Files: listed components/tests with active lint errors
  - Pre-commit: `npx eslint .`

- [ ] 13. Complete i18n coverage and dynamic locale application

  **What to do**:
  - Replace high-impact hardcoded portal strings with translation-driven content in the main shell and priority sections.
  - Ensure root locale application is dynamic and consistent with the chosen locale source.
  - Add tests for locale persistence, switching, and at least one non-Russian render path.

  **Must NOT do**:
  - Do not attempt full translation of low-priority content outside the defined critical surfaces.
  - Do not leave Russian-only strings in the shell or primary user flows that are claimed as localized.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: cross-cutting UI/content system work with user-facing output.
  - **Skills**: [`frontend-design`, `documentation-lookup`]
    - `frontend-design`: keep localized surfaces coherent.
    - `documentation-lookup`: useful if framework locale handling details need verification.
  - **Skills Evaluated but Omitted**:
    - `playwright`: verification uses it, but the implementation focus is i18n integration.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 14)
  - **Blocks**: 15
  - **Blocked By**: 5, 12

  **References**:
  - `app/layout.tsx:38` - root `lang` application.
  - `lib/i18n/context.tsx:27` - locale persistence/provider logic.
  - `lib/i18n/translations/ru.ts:1` - translation structure pattern.
  - `components/shell/Header.tsx:111` - shell strings already tied to translation labels.
  - `components/sections/profile/index.tsx:55` - hardcoded high-impact strings.
  - `components/sections/registration/RegistrationFilters.tsx:30` - hardcoded filter strings.
  - `tests/i18n/context.test.tsx:51` - current i18n test base to expand.

  **Acceptance Criteria**:
  - [ ] `html[lang]` reflects the active locale source rather than hardcoded `ru`.
  - [ ] Priority shell and portal surfaces render via the translation layer.
  - [ ] Locale-switching and non-Russian render tests pass without missing-key crashes.

  **QA Scenarios**:
  ```
  Scenario: Locale switch updates root language and UI copy
    Tool: Playwright
    Preconditions: Dev server running; language switcher available
    Steps:
      1. Open the portal and inspect `document.documentElement.lang`.
      2. Change the language from Russian to English.
      3. Assert `lang` changes and key shell labels update.
    Expected Result: Root language and visible translated text change together.
    Failure Indicators: `lang` stays `ru`, or visible strings remain hardcoded Russian.
    Evidence: .sisyphus/evidence/task-13-locale-switch.png

  Scenario: Non-Russian render path does not crash on missing keys
    Tool: Bash
    Preconditions: Tests updated
    Steps:
      1. Run the focused i18n test file.
      2. Assert the non-Russian render path passes.
    Expected Result: i18n tests pass and no missing-key crash occurs.
    Failure Indicators: Tests fail when switching away from `ru`.
    Evidence: .sisyphus/evidence/task-13-i18n-tests.txt
  ```

  **Commit**: YES
  - Message: `feat(i18n): finish dynamic locale application in critical flows`
  - Files: layout, translation files, high-impact sections, i18n tests
  - Pre-commit: focused i18n tests + build

- [ ] 14. Complete accessibility remediation for navigation, forms, and modal flows

  **What to do**:
  - Add a skip link to the app shell and ensure keyboard users can reach main content quickly.
  - Fix unlabeled filters and ensure form errors have explicit programmatic associations.
  - Upgrade modal semantics and keyboard behavior: dialog role, `aria-modal`, focus entry/return, and `Escape` handling.

  **Must NOT do**:
  - Do not turn this into a visual redesign.
  - Do not stop at aria labels only; focus movement and keyboard flow must also be covered.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: user-facing interaction and semantic UI work.
  - **Skills**: [`wcag-accessibility`, `playwright`]
    - `wcag-accessibility`: required for semantic and keyboard correctness.
    - `playwright`: ideal for verifying keyboard and modal flows.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: aesthetics are secondary to semantics here.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12-13)
  - **Blocks**: 15
  - **Blocked By**: 5, 12

  **References**:
  - `components/sections/registration/RegistrationFilters.tsx:26` - unlabeled controls.
  - `components/forms/GuideForm.tsx:293` - current form error rendering that needs stronger associations.
  - `components/sections/guides/GuideModal.tsx:237` - modal container and keyboard flow baseline.
  - `components/shell/Header.tsx:202` - existing accessible label pattern to preserve.
  - `tests/components/Header.test.tsx:1` - existing accessibility-oriented test style.
  - `tests/components/ProfileSection.test.tsx:90` - switch semantics test example.

  **Acceptance Criteria**:
  - [ ] App shell exposes a working skip link to main content.
  - [ ] Registration filters and key forms have discernible labels and error associations.
  - [ ] Guide modal exposes correct dialog semantics and keyboard/focus behavior.

  **QA Scenarios**:
  ```
  Scenario: Skip link and filter controls are keyboard-accessible
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Open the portal and press `Tab` from the top of the page.
      2. Activate the skip link and confirm focus moves to main content.
      3. Navigate to the registration filters and inspect accessible names.
    Expected Result: Skip link appears and works; filters have discernible accessible names.
    Failure Indicators: No skip link, focus does not move, or filters remain unnamed.
    Evidence: .sisyphus/evidence/task-14-skip-link.png

  Scenario: Guide modal traps and returns focus correctly
    Tool: Playwright
    Preconditions: At least one guide available
    Steps:
      1. Open a guide modal from `/guides`.
      2. Assert dialog semantics (`role="dialog"`, `aria-modal="true"`).
      3. Cycle focus with `Tab`, close with `Escape`, and verify focus returns to the opener.
    Expected Result: Modal is keyboard-safe and semantically correct.
    Failure Indicators: Focus escapes behind modal, `Escape` fails, or opener focus is lost.
    Evidence: .sisyphus/evidence/task-14-modal-a11y.png
  ```

  **Commit**: YES
  - Message: `fix(a11y): complete keyboard and semantic accessibility uplift`
  - Files: shell, filters, forms, modal, related tests
  - Pre-commit: targeted Playwright/a11y tests if introduced

- [ ] 15. Add CI automation and final contributor runbooks

  **What to do**:
  - Add CI automation that enforces the repo quality gates on every change.
  - Document the contributor workflow for migrations, linting, auth boundary expectations, and public-route policy.
  - Ensure docs reference the final architecture, security, and testing story rather than the interim state.

  **Must NOT do**:
  - Do not add CI that runs a different command set from local contributor guidance.
  - Do not leave migration or public-route policy tribal/implicit.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: this is documentation and automation glue work.
  - **Skills**: [`documentation-lookup`, `git-master`]
    - `documentation-lookup`: useful for current GitHub Actions / Next.js / npm guidance.
    - `git-master`: keep final automation/docs cleanup atomic.
  - **Skills Evaluated but Omitted**:
    - `playwright`: execution belongs in CI, but the task itself is workflow/documentation oriented.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: F1, F2, F3, F4
  - **Blocked By**: 1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14

  **References**:
  - `package.json:6` - local quality gate commands to mirror in CI.
  - `.gitignore:1` - existing repo hygiene expectations.
  - `README.md:1` - contributor-facing entry point.
  - `ARCHITECTURE.md:1` - architecture source of truth.
  - `MIGRATION_DB.md:1` - migration runbook base.
  - `.github/` - currently absent; CI workflow needs to be introduced here.

  **Acceptance Criteria**:
  - [ ] CI runs `npm ci`, `npm run lint`, `npm run type-check`, `npm run test`, and `npm run build`.
  - [ ] Contributor docs explain migrations, route exposure policy, and local quality gates.
  - [ ] Local and CI command sets match exactly.

  **QA Scenarios**:
  ```
  Scenario: CI workflow mirrors local quality gates
    Tool: Bash
    Preconditions: Workflow file created
    Steps:
      1. Read the workflow file under `.github/workflows/`.
      2. Verify it runs `npm ci`, `npm run lint`, `npm run type-check`, `npm run test`, and `npm run build`.
      3. Compare the commands to `package.json` and contributor docs.
    Expected Result: CI and local docs/scripts match exactly.
    Failure Indicators: Workflow omits a required gate or diverges from local instructions.
    Evidence: .sisyphus/evidence/task-15-ci-workflow.txt

  Scenario: Contributor runbooks cover migrations and public-route policy
    Tool: Bash
    Preconditions: Docs updated
    Steps:
      1. Read the updated README/architecture/migration docs.
      2. Confirm they describe migration execution, public-route allowlist rules, and quality-gate commands.
    Expected Result: New contributors can operate the repo without hidden assumptions.
    Failure Indicators: Migration or route-policy behavior remains undocumented.
    Evidence: .sisyphus/evidence/task-15-runbooks.txt
  ```

  **Commit**: YES
  - Message: `chore(ci): enforce repo quality gates and runbooks`
  - Files: `.github/workflows/*`, README/architecture/migration docs, scripts if needed
  - Pre-commit: local dry run of all quality gates

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection -> fix -> re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each Must Have: verify implementation exists via file reads, quality gate commands, and route probes. For each Must NOT Have: search the codebase for forbidden patterns including request-path DDL and undocumented public routes.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run lint`, `npm run type-check`, `npm run test`, and `npm run build`. Review changed files for React hook violations, unsafe fallbacks, duplicated route policy logic, and lingering hardcoded locale strings in critical surfaces.
  Output: `Lint [PASS/FAIL] | Types [PASS/FAIL] | Tests [PASS/FAIL] | Build [PASS/FAIL] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Execute the QA scenarios from every task. Verify auth boundaries, locale switching, skip-link behavior, modal keyboard flow, and repo quality commands. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  Compare the actual diff to the plan. Confirm that the work converges to app-owned DB architecture, protected-by-default reads, zero request-path DDL, and the constrained i18n/a11y/docs scope. Flag any unrelated feature work.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1**: `chore(dx): repair lint workflow and quality gates` — `package.json`, `eslint.config.js`, `.eslintrc.json`, CI files
- **2**: `refactor(api): enforce protected reads and remove request-path ddl` — route handlers, migration/bootstrap files, tests
- **3**: `fix(ui): complete i18n and accessibility uplift` — layout, shell, sections, modal/forms, tests
- **4**: `docs(architecture): align docs with live backend model` — `ARCHITECTURE.md`, `README.md`, migration/security runbooks

---

## Success Criteria

### Verification Commands
```bash
npm run lint
npm run type-check
npm run test
npm run build
```

### Final Checklist
- [ ] All Must Have items present
- [ ] All Must NOT Have items absent
- [ ] Route access matrix matches implemented behavior
- [ ] Zero request handlers perform runtime schema DDL
- [ ] Locale and accessibility regressions cleared on critical portal flows
- [ ] Architecture docs match the actual runtime model
