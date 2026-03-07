# Codebase Quality Remediation Plan

## TL;DR

> **Quick Summary**: Stabilize the repository around the active Next.js architecture, remove ambiguity from the legacy Vite stack, and refactor the highest-risk server/UI hotspots so the codebase more consistently follows SOLID, DRY, and KISS.
>
> **Deliverables**:
> - Single canonical runtime/deploy path for the Next.js app
> - Shared server helpers for auth/request guards and schema/bootstrap logic
> - Broken-up replacement for the `registration` god route
> - Shared client data-access boundaries used by auth/profile flows
> - Removal or quarantine of dead legacy sections and Vite-era app artifacts
> - Regression tests and guardrails to keep the architecture from regressing
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 3 implementation waves + final verification
> **Critical Path**: 1 -> 3/5/6 -> 8/9/11 -> 14/15/16 -> 17 -> F1-F4

---

## Context

### Original Request
Deep-audit the website codebase, assess whether it follows SOLID / DRY / KISS, identify used patterns, then turn the findings into a prioritized remediation work plan.

### Interview Summary
**Key Discussions**:
- The repository already has a stronger modern layer than the legacy surface suggests: Next.js App Router, typed API client, React Query hooks, Zod schemas, and Vitest coverage.
- The biggest issues are not missing structure but inconsistent adoption of that structure.
- The user wants a concrete remediation plan, not more analysis.

**Research Findings**:
- Active stack is defined in `package.json` as Next.js 16 + React 19 + TypeScript + React Query + Zod + Vitest.
- Current production-oriented paths are `app/`, `components/`, `lib/`, `types/`, and `tests/`.
- Legacy Vite / vanilla SPA artifacts still exist in `src/`, `index.html`, `vite.config.js`, `config.js`, and `.vercel.json`.
- Hotspots include `app/api/discord-proxy/registration/route.ts` and `components/sections/GuidesSection.tsx`.
- Duplication exists in repeated `getAuthToken` helpers, repeated runtime DDL/bootstrap SQL, and direct UI `fetch` calls bypassing shared client abstractions.

### Metis Review
**Identified Gaps** (addressed):
- Formal Metis consultations were invoked but did not return findings before timeout; equivalent gap review was covered by Oracle consultation plus explicit self-review in this plan.
- Missing test-strategy confirmation was resolved with a safe default: use the existing Vitest infrastructure in a tests-after workflow.
- Legacy cleanup scope was locked down so the work removes ambiguity, not product functionality.

---

## Work Objectives

### Core Objective
Make the repository easier to reason about and safer to change by consolidating on one active architecture, extracting repeated infrastructure code, decomposing the largest multi-responsibility files, and removing dead/legacy paths that blur ownership.

### Concrete Deliverables
- Canonical Next.js deploy/runtime configuration with legacy Vite paths removed from active tooling
- Shared server-side request/auth and schema/bootstrap helpers
- Modularized replacement for the `registration` route internals
- Shared client API/hook boundaries for auth/profile/admin flows
- Removal of unused flat legacy section components and stale duplicate types
- Regression tests and architecture guardrails

### Definition of Done
- [ ] `npm run build` passes against the canonical Next.js runtime
- [ ] `npm run type-check` passes with no new type regressions
- [ ] `npm run test` passes with added regression coverage for extracted helpers
- [ ] No active page imports an obsolete flat section component when a modular slice already exists
- [ ] No API route keeps an in-file copy of `getAuthToken` once the shared helper is introduced
- [ ] Legacy Vite entrypoints are no longer part of active deploy/build/runtime paths

### Must Have
- Reduce duplication in auth/request helper logic and guide/bootstrap code
- Break the registration route into smaller modules without changing behavior
- Standardize client data access around shared abstractions where modern slices already exist
- Remove ambiguity between active Next.js code and inactive legacy SPA code
- Preserve current user-facing behavior while refactoring internals

### Must NOT Have (Guardrails)
- No new product features, UI redesigns, or unrelated content changes
- No schema/business-logic rewrites beyond what is required to extract shared helpers and preserve behavior
- No partial cleanup that leaves two “official” runtime/deploy paths in place
- No over-abstraction that invents generic frameworks with no second real use site
- No deletion of legacy code until imports, build config, and runtime references prove it is inactive

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No manual acceptance steps.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after
- **Framework**: Vitest + Testing Library (`vitest.config.ts`, `tests/setup.ts`)
- **Default Applied**: Because the user asked directly for the plan after analysis and did not specify TDD, this plan uses tests-after while still requiring agent-executed QA on every task.

### QA Policy
Every task includes agent-executed QA scenarios with concrete commands/selectors/assertions.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Playwright where interaction verification is needed
- **API/Backend**: Bash + `curl` or targeted route test commands
- **Library/Module**: Bash + Vitest / type-check / import checks
- **Config/Repo hygiene**: Bash + file/reference searches + build commands

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by landing shared primitives first, then fan out refactors, then finish with cleanup and guardrails.

```text
Wave 1 (Start Immediately - canonical boundaries + shared primitives)
├── Task 1: Canonical runtime and deploy baseline [quick]
├── Task 2: Canonical section/folder mapping and legacy inventory [writing]
├── Task 3: Shared request auth helper + route guard primitive [quick]
├── Task 4: Shared guide schema/bootstrap helper [quick]
├── Task 5: Registration server module scaffolding [deep]
└── Task 6: Client data-access scaffolding for auth/profile/admin [quick]

Wave 2 (After Wave 1 - core refactors, max parallel)
├── Task 7: Migrate guide routes to shared helpers [unspecified-high]
├── Task 8: Refactor registration read path out of monolith [deep]
├── Task 9: Refactor registration write path out of monolith [deep]
├── Task 10: Standardize auth entry/session UI data access [quick]
├── Task 11: Standardize profile/admin UI data access [unspecified-high]
├── Task 12: Retire legacy guides monolith [quick]
└── Task 13: Retire legacy help monolith [quick]

Wave 3 (After Wave 2 - cleanup, type alignment, tests, guardrails)
├── Task 14: Remove remaining unused flat legacy section components [quick]
├── Task 15: Remove or archive legacy Vite SPA surface [unspecified-high]
├── Task 16: Normalize type source-of-truth around schemas [quick]
├── Task 17: Add regression coverage for extracted helpers and flows [deep]
└── Task 18: Add architecture guardrails and contributor guidance [writing]

Wave FINAL (After ALL tasks - independent review, 4 parallel)
├── Task F1: Plan compliance audit [oracle]
├── Task F2: Code quality review [unspecified-high]
├── Task F3: Real QA execution [unspecified-high]
└── Task F4: Scope fidelity check [deep]

Critical Path: 1 -> 3/5/6 -> 8/9/11 -> 14/15/16 -> 17 -> F1-F4
Parallel Speedup: ~60-70% faster than sequential execution
Max Concurrent: 7
```

### Dependency Matrix

- **1**: Blocked By - None | Blocks - 15, 18
- **2**: Blocked By - None | Blocks - 12, 13, 14, 18
- **3**: Blocked By - None | Blocks - 7, 8, 9
- **4**: Blocked By - None | Blocks - 7
- **5**: Blocked By - None | Blocks - 8, 9
- **6**: Blocked By - None | Blocks - 10, 11
- **7**: Blocked By - 3, 4 | Blocks - 17
- **8**: Blocked By - 3, 5 | Blocks - 11, 17
- **9**: Blocked By - 3, 5 | Blocks - 11, 17
- **10**: Blocked By - 6 | Blocks - 17
- **11**: Blocked By - 6, 8, 9 | Blocks - 16, 17
- **12**: Blocked By - 2, 7 | Blocks - 14
- **13**: Blocked By - 2 | Blocks - 14, 16
- **14**: Blocked By - 2, 12, 13 | Blocks - 15, 16
- **15**: Blocked By - 1, 14 | Blocks - 17
- **16**: Blocked By - 11, 13, 14 | Blocks - 17, 18
- **17**: Blocked By - 7, 8, 9, 10, 11, 15, 16 | Blocks - FINAL
- **18**: Blocked By - 1, 2, 16 | Blocks - FINAL

### Agent Dispatch Summary

- **Wave 1**: 6 agents - T1 `quick`, T2 `writing`, T3 `quick`, T4 `quick`, T5 `deep`, T6 `quick`
- **Wave 2**: 7 agents - T7 `unspecified-high`, T8 `deep`, T9 `deep`, T10 `quick`, T11 `unspecified-high`, T12 `quick`, T13 `quick`
- **Wave 3**: 5 agents - T14 `quick`, T15 `unspecified-high`, T16 `quick`, T17 `deep`, T18 `writing`
- **FINAL**: 4 agents - F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] 1. Canonical runtime and deploy baseline

  **What to do**:
  - Make Next.js the only active deploy/runtime path for the repo.
  - Reconcile `vercel.json` vs `.vercel.json` so only the Next.js config remains authoritative.
  - Remove active build/deploy references that still point runtime traffic to `index.html` / Vite.

  **Must NOT do**:
  - Do not delete legacy SPA files in this task.
  - Do not change user-facing routes or product behavior.

  **Recommended Agent Profile**:
  - **Category**: `quick` - config alignment with clear evidence already identified.
  - **Skills**: `[]` - repo-local evidence is sufficient.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 15, 18
  - **Blocked By**: None

  **References**:
  - `package.json:6` - active scripts already target Next.js, not Vite.
  - `vercel.json:1` - current canonical Next.js deployment config.
  - `.vercel.json:1` - conflicting legacy Vite deployment config rewriting traffic to `index.html`.
  - `vite.config.js:4` - proves legacy SPA build path still exists.
  - `index.html:38` - legacy SPA entrypoint still wired to `src/js/app.js`.

  **Acceptance Criteria**:
  - [ ] Exactly one active Vercel/deploy config remains for the website.
  - [ ] No active deploy/runtime config rewrites the app to `index.html`.
  - [ ] `npm run build` succeeds using the Next.js application.

  **QA Scenarios**:
  ```text
  Scenario: Canonical Next.js deploy path is the only active one
    Tool: Bash
    Preconditions: Working tree contains updated deploy/config files
    Steps:
      1. Run `npm run build`.
      2. Confirm build output is for Next.js and exits with code 0.
      3. Search deploy configs for `framework": "vite"` and `destination": "/index.html"`.
    Expected Result: Build passes; no active deploy config keeps the Vite/index.html runtime path.
    Failure Indicators: Build uses wrong runtime, `.vercel.json` still controls deploy, or `index.html` rewrite remains active.
    Evidence: .sisyphus/evidence/task-1-next-runtime.txt

  Scenario: Forbidden legacy deploy rewrite is absent
    Tool: Read
    Preconditions: Updated config files saved
    Steps:
      1. Read `vercel.json` and `.vercel.json`.
      2. Verify no surviving active config rewrites all traffic to `/index.html`.
    Expected Result: Only the Next.js deploy definition is authoritative.
    Evidence: .sisyphus/evidence/task-1-no-vite-rewrite.txt
  ```

  **Commit**: YES
  - Message: `refactor(runtime): align deploy config with next app`

- [ ] 2. Canonical section/folder mapping and legacy inventory

  **What to do**:
  - Document which `app/(portal)` pages are active and which modular `components/sections/*` folders they use.
  - Mark flat legacy section components as deprecated/inactive where modular replacements already exist.
  - Capture the removal order so cleanup tasks delete only proven-dead paths.

  **Must NOT do**:
  - Do not remove legacy files in this task.
  - Do not invent a new folder taxonomy beyond what active pages already use.

  **Recommended Agent Profile**:
  - **Category**: `writing` - this task creates the architecture map that later cleanup depends on.
  - **Skills**: `[]` - the work is based entirely on internal code references.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 12, 13, 14, 18
  - **Blocked By**: None

  **References**:
  - `app/(portal)/guides/page.tsx:3` - active page points to modular guides slice.
  - `app/(portal)/help/page.tsx:3` - active page points to modular help slice.
  - `app/(portal)/members/page.tsx:3` - active page points to modular registration slice.
  - `app/(portal)/schedule/page.tsx:3` - active page points to modular schedule slice.
  - `components/sections/GuidesSection.tsx:61` - legacy flat guides component still present.
  - `components/sections/HelpSection.tsx:13` - legacy flat help component still present.

  **Acceptance Criteria**:
  - [ ] Architecture docs include an active-page -> active-section mapping.
  - [ ] Legacy flat section files targeted for later deletion are explicitly listed.
  - [ ] Cleanup tasks can rely on written proof instead of assumptions.

  **QA Scenarios**:
  ```text
  Scenario: Active modular section map is documented
    Tool: Read
    Preconditions: Updated architecture/contributor doc exists
    Steps:
      1. Read the updated architecture doc.
      2. Confirm it lists the active imports for guides, help, registration, schedule, news, absences, profile, and pvp pages.
      3. Confirm legacy flat section files are explicitly marked inactive/deprecated.
    Expected Result: Later cleanup work has a single written source of truth.
    Failure Indicators: Missing page mappings or undocumented legacy files.
    Evidence: .sisyphus/evidence/task-2-section-map.txt

  Scenario: No unsupported assumptions about active sections remain
    Tool: Grep
    Preconditions: Docs updated
    Steps:
      1. Search `app/(portal)` for section imports.
      2. Compare results against the documented mapping.
    Expected Result: Every imported active section appears in the mapping, and no documented removals are still claimed without evidence.
    Evidence: .sisyphus/evidence/task-2-import-audit.txt
  ```

  **Commit**: YES
  - Message: `docs(architecture): map active sections and legacy duplicates`

- [ ] 3. Shared request auth helper and route guard primitive

  **What to do**:
  - Introduce one canonical helper for extracting auth tokens from `NextRequest`.
  - Add a small reusable guard primitive for common unauthorized/forbidden route handling.
  - Migrate low-risk exemplar routes first so later route tasks can adopt the pattern quickly.

  **Must NOT do**:
  - Do not change JWT shape, issuer/audience validation, or cookie semantics.
  - Do not refactor all routes in one pass here.

  **Recommended Agent Profile**:
  - **Category**: `quick` - the duplication is obvious and the first extraction is tightly scoped.
  - **Skills**: `[]` - existing auth behavior must be preserved exactly.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 7, 8, 9
  - **Blocked By**: None

  **References**:
  - `lib/auth.ts:73` - current shared auth helpers stop at generic request parsing; this is the natural home/neighbor for route-level extraction.
  - `app/api/help/_shared.ts:4` - one existing shared route helper already uses the target pattern.
  - `app/api/admin/accounts/route.ts:16` - representative in-file `getAuthToken` duplication.
  - `app/api/guide/route.ts:16` - duplicated token extraction in a second route family.

  **Acceptance Criteria**:
  - [ ] One shared request-auth helper exists and is imported by exemplar routes.
  - [ ] Migrated exemplar routes no longer declare local `getAuthToken` functions.
  - [ ] `npm run type-check` passes with no auth contract regressions.

  **QA Scenarios**:
  ```text
  Scenario: Exemplar routes consume the shared helper
    Tool: Grep
    Preconditions: Shared helper and exemplar migrations are complete
    Steps:
      1. Search `app/api/help/_shared.ts` and `app/api/admin/accounts/route.ts` for `function getAuthToken`.
      2. Search the same files for the new shared helper import.
    Expected Result: Local helper definitions are gone from migrated files; shared helper import is present.
    Failure Indicators: Duplicated token extraction remains in exemplar routes.
    Evidence: .sisyphus/evidence/task-3-auth-helper-grep.txt

  Scenario: Unauthorized handling still compiles cleanly
    Tool: Bash
    Preconditions: Shared helper wired into exemplar routes
    Steps:
      1. Run `npm run type-check`.
      2. Confirm route handler types and `NextRequest` imports remain valid.
    Expected Result: Type-check passes with no auth helper regressions.
    Evidence: .sisyphus/evidence/task-3-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(server): centralize route auth extraction`

- [ ] 4. Shared guide schema/bootstrap helper

  **What to do**:
  - Extract duplicated guide table/bootstrap SQL into one shared server helper.
  - Preserve the current schema and idempotent bootstrap behavior exactly.
  - Migrate the top-level guide route first so the pattern is proven before full guide-route adoption.

  **Must NOT do**:
  - Do not redesign the guide schema.
  - Do not change response payloads or route permissions.

  **Recommended Agent Profile**:
  - **Category**: `quick` - the repeated DDL is mechanically similar and already localized.
  - **Skills**: `[]` - no external research is required.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 7
  - **Blocked By**: None

  **References**:
  - `app/api/guide/route.ts:23` - largest copy of the guide schema bootstrap logic.
  - `app/api/guide/[id]/route.ts:23` - second duplicate of the same guide bootstrap.
  - `app/api/guide/[id]/vote/route.ts:20` - vote route repeats a subset of the guide DDL.
  - `app/api/guide/[id]/comment/route.ts:21` - comment route repeats another subset.

  **Acceptance Criteria**:
  - [ ] One shared guide bootstrap helper exists.
  - [ ] `app/api/guide/route.ts` imports the helper instead of declaring local DDL.
  - [ ] `npm run type-check` passes.

  **QA Scenarios**:
  ```text
  Scenario: Guide schema bootstrap exists once
    Tool: Grep
    Preconditions: Shared helper extracted
    Steps:
      1. Search guide route files for `CREATE TABLE IF NOT EXISTS guide`.
      2. Confirm the DDL now lives in the shared helper instead of the top-level route file.
    Expected Result: Duplication count drops and the canonical helper is the new home for guide DDL.
    Failure Indicators: Top-level route still embeds full bootstrap SQL.
    Evidence: .sisyphus/evidence/task-4-guide-bootstrap-grep.txt

  Scenario: Extracted helper preserves compile-time contracts
    Tool: Bash
    Preconditions: Top-level guide route migrated
    Steps:
      1. Run `npm run type-check`.
      2. Confirm there are no import/type errors across guide routes.
    Expected Result: Type-check passes.
    Evidence: .sisyphus/evidence/task-4-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(guides): extract shared schema bootstrap`

- [ ] 5. Registration server module scaffolding

  **What to do**:
  - Create a dedicated server module boundary for the registration domain (read models, transforms, mutation helpers, schema helpers).
  - Move non-handler concerns out of `app/api/discord-proxy/registration/route.ts` without changing behavior yet.
  - Leave the route file as orchestration/wiring, not as the long-term home for every helper.

  **Must NOT do**:
  - Do not change API response shape.
  - Do not merge read and write concerns into a new generic framework.

  **Recommended Agent Profile**:
  - **Category**: `deep` - this is the highest-risk server hotspot and needs careful dependency carving.
  - **Skills**: `[]` - repo conventions and existing route behavior are the authority.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 8, 9
  - **Blocked By**: None

  **References**:
  - `app/api/discord-proxy/registration/route.ts:135` - computed row logic currently lives inside the route.
  - `app/api/discord-proxy/registration/route.ts:253` - registration read/query composition is embedded in the route file.
  - `app/api/discord-proxy/registration/route.ts:609` - mutation/update logic is embedded in the same file.
  - `types/index.ts:36` - response contract for registrations must remain stable.

  **Acceptance Criteria**:
  - [ ] A dedicated registration server module namespace exists.
  - [ ] The route file imports extracted helpers/modules instead of owning all helpers inline.
  - [ ] Route handler behavior remains unchanged at the contract level.

  **QA Scenarios**:
  ```text
  Scenario: Registration route becomes orchestration-focused
    Tool: Read
    Preconditions: New registration server modules created
    Steps:
      1. Read `app/api/discord-proxy/registration/route.ts`.
      2. Confirm helper-heavy concerns are imported from dedicated modules.
      3. Confirm the route still exports the same HTTP handlers.
    Expected Result: Route file reads like wiring/orchestration, not a utility dump.
    Failure Indicators: Large helper blocks such as transforms/introspection remain inline.
    Evidence: .sisyphus/evidence/task-5-route-structure.txt

  Scenario: Extraction preserves compile-time stability
    Tool: Bash
    Preconditions: Route imports extracted modules
    Steps:
      1. Run `npm run type-check`.
      2. Confirm registration-related files compile cleanly.
    Expected Result: Type-check passes.
    Evidence: .sisyphus/evidence/task-5-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(registration): scaffold server modules`

- [ ] 6. Client data-access scaffolding for auth/profile/admin

  **What to do**:
  - Create shared client API wrappers and hook entrypoints for auth/session/admin account flows.
  - Reuse `lib/api/client.ts` and Zod-backed schemas where appropriate instead of adding more raw `fetch` helpers.
  - Prepare the abstraction layer that Wave 2 UI tasks will adopt.

  **Must NOT do**:
  - Do not migrate every consumer in this task.
  - Do not change UI copy, layout, or auth behavior.

  **Recommended Agent Profile**:
  - **Category**: `quick` - the shape already exists in `lib/api/*` and `lib/hooks/*`.
  - **Skills**: `[]` - follow the existing api/hook/schema layering.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 10, 11
  - **Blocked By**: None

  **References**:
  - `lib/api/client.ts:18` - canonical request wrapper and error mapping.
  - `lib/api/guides.ts:18` - best current example of a focused feature API module.
  - `lib/hooks/useGuides.ts:13` - best current example of hook-layer orchestration around API modules.
  - `components/PinScreen.tsx:33` - auth UI currently performs raw fetches directly.
  - `app/(portal)/layout.tsx:17` - session verification/logout logic is still inline.
  - `components/sections/profile/index.tsx:95` - profile/admin flows still fetch directly from UI.

  **Acceptance Criteria**:
  - [ ] Shared auth/profile/admin API modules exist under `lib/api/`.
  - [ ] Hook entrypoints exist where stateful invalidation or reuse is needed.
  - [ ] New modules compile cleanly and align with existing `api -> hook -> component` layering.

  **QA Scenarios**:
  ```text
  Scenario: New client API modules follow the existing layered pattern
    Tool: Read
    Preconditions: New client API/hook files created
    Steps:
      1. Read the new auth/profile/admin API modules.
      2. Confirm they delegate to `lib/api/client.ts` instead of performing raw `fetch` internally.
      3. Read matching hooks and confirm they mirror the `useGuides` / `helpApi` style.
    Expected Result: New client-side abstractions match the repo's strongest existing pattern.
    Failure Indicators: Raw fetch survives inside the new abstraction layer or hook logic bypasses shared client code.
    Evidence: .sisyphus/evidence/task-6-client-layer.txt

  Scenario: Scaffolding integrates without type regressions
    Tool: Bash
    Preconditions: New client API modules saved
    Steps:
      1. Run `npm run type-check`.
    Expected Result: Type-check passes.
    Evidence: .sisyphus/evidence/task-6-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(client): scaffold shared auth and admin api modules`

- [ ] 7. Migrate guide routes to shared helpers

  **What to do**:
  - Adopt the shared request-auth helper and shared guide bootstrap helper across the entire guide route family.
  - Normalize guard/error handling while preserving existing response contracts.
  - Remove per-file `getAuthToken` / `ensureGuideSchema` duplication from guide routes.

  **Must NOT do**:
  - Do not change guide payload schemas.
  - Do not add new guide features while refactoring.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - several routes must be aligned without breaking behavior.
  - **Skills**: `[]` - use the shared helpers from Tasks 3 and 4.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 17
  - **Blocked By**: 3, 4

  **References**:
  - `app/api/guide/route.ts:16` - duplicated auth/bootstrap in collection route.
  - `app/api/guide/[id]/route.ts:16` - duplicated auth/bootstrap in detail route.
  - `app/api/guide/[id]/vote/route.ts:13` - duplicated auth/bootstrap in vote route.
  - `app/api/guide/[id]/comment/route.ts:14` - duplicated auth/bootstrap in comment route.
  - `lib/schemas/guide.ts:7` - output contracts that must remain stable.

  **Acceptance Criteria**:
  - [ ] No guide route file still declares local `getAuthToken`.
  - [ ] No guide route file still declares local guide schema/bootstrap SQL.
  - [ ] Route contracts remain compatible with `lib/schemas/guide.ts`.
  - [ ] `npm run type-check` passes.

  **QA Scenarios**:
  ```text
  Scenario: Guide route family now uses shared helpers
    Tool: Grep
    Preconditions: Guide routes migrated
    Steps:
      1. Search `app/api/guide/**/*.ts` for `function getAuthToken`.
      2. Search the same files for `async function ensureGuideSchema`.
      3. Confirm the new shared helper imports are present.
    Expected Result: Local helper definitions are gone from the guide route family.
    Failure Indicators: Any guide route still owns duplicated auth/bootstrap helpers.
    Evidence: .sisyphus/evidence/task-7-guide-route-dedup.txt

  Scenario: Guide route family still compiles against existing schemas
    Tool: Bash
    Preconditions: Shared helpers wired into all guide routes
    Steps:
      1. Run `npm run type-check`.
    Expected Result: Type-check passes with no guide route regressions.
    Evidence: .sisyphus/evidence/task-7-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(guides): adopt shared route helpers`

- [ ] 8. Refactor registration read path out of monolith

  **What to do**:
  - Move registration read-side responsibilities out of the route file: schema discovery, joins, row normalization, computed KPI shaping, and merge logic.
  - Keep `GET` behavior and payload shape stable.
  - Prefer named domain helpers over anonymous inline utility blocks.

  **Must NOT do**:
  - Do not rewrite the KPI formula or business rules.
  - Do not change query semantics beyond structural extraction.

  **Recommended Agent Profile**:
  - **Category**: `deep` - this is the most complex read-side behavior in the repo.
  - **Skills**: `[]` - preserve behavior from the existing route as the source of truth.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 11, 17
  - **Blocked By**: 3, 5

  **References**:
  - `app/api/discord-proxy/registration/route.ts:135` - computed row/KPI logic now embedded inline.
  - `app/api/discord-proxy/registration/route.ts:253` - portal-only row and read-side query composition.
  - `app/api/discord-proxy/registration/route.ts:348` - merged registration read pipeline.
  - `types/index.ts:36` - registration payload contract to preserve.

  **Acceptance Criteria**:
  - [ ] Read-side helpers live in dedicated registration server modules.
  - [ ] `GET` handler in the route delegates to extracted read helpers.
  - [ ] Registration payload shape remains compatible with `types/index.ts` and consuming UI.
  - [ ] `npm run type-check` passes.

  **QA Scenarios**:
  ```text
  Scenario: Registration GET path is modularized
    Tool: Read
    Preconditions: Read-side extraction complete
    Steps:
      1. Read `app/api/discord-proxy/registration/route.ts`.
      2. Confirm read-heavy helpers such as row shaping and DB composition are imported from dedicated modules.
      3. Confirm the route still exposes `GET` and marshals the same payload contract.
    Expected Result: Read path is delegated, not embedded.
    Failure Indicators: Read-side helper bodies still dominate the route file.
    Evidence: .sisyphus/evidence/task-8-read-structure.txt

  Scenario: Read-side extraction preserves compile-time consumers
    Tool: Bash
    Preconditions: GET path uses extracted modules
    Steps:
      1. Run `npm run type-check`.
    Expected Result: Type-check passes for the registration route and its consumers.
    Evidence: .sisyphus/evidence/task-8-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(registration): extract read pipeline`

- [ ] 9. Refactor registration write path out of monolith

  **What to do**:
  - Move PATCH-side concerns out of the registration route: target resolution, account sync, stat updates, and permission-sensitive mutation orchestration.
  - Keep the current permission model and success/error semantics stable.
  - Isolate mutation logic so future changes do not require editing the route file directly.

  **Must NOT do**:
  - Do not broaden write permissions.
  - Do not silently change mutation side effects (portal account sync, linked stats, etc.).

  **Recommended Agent Profile**:
  - **Category**: `deep` - write-path extraction has the highest behavior-regression risk.
  - **Skills**: `[]` - exact behavior preservation matters more than abstraction cleverness.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 11, 17
  - **Blocked By**: 3, 5

  **References**:
  - `app/api/discord-proxy/registration/route.ts:472` - target-resolution helpers are embedded inline.
  - `app/api/discord-proxy/registration/route.ts:505` - portal account update helpers are embedded inline.
  - `app/api/discord-proxy/registration/route.ts:547` - activity row bootstrap/helper logic is embedded inline.
  - `app/api/discord-proxy/registration/route.ts:609` - PATCH handler currently mixes auth, permissioning, validation, and persistence.

  **Acceptance Criteria**:
  - [ ] PATCH-side helpers live in dedicated registration server modules.
  - [ ] The route `PATCH` handler delegates to extracted mutation logic.
  - [ ] Permission and update side effects remain behaviorally unchanged.
  - [ ] `npm run type-check` passes.

  **QA Scenarios**:
  ```text
  Scenario: Registration PATCH path is modularized
    Tool: Read
    Preconditions: Write-side extraction complete
    Steps:
      1. Read `app/api/discord-proxy/registration/route.ts`.
      2. Confirm update helpers and mutation orchestration are imported from dedicated modules.
      3. Confirm the route still exposes the same `PATCH` handler.
    Expected Result: Route file is orchestration-only for writes.
    Failure Indicators: Permission logic and update helpers still live inline in the route.
    Evidence: .sisyphus/evidence/task-9-write-structure.txt

  Scenario: Mutation extraction preserves compile-time stability
    Tool: Bash
    Preconditions: PATCH path uses extracted modules
    Steps:
      1. Run `npm run type-check`.
    Expected Result: Type-check passes.
    Evidence: .sisyphus/evidence/task-9-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(registration): extract write pipeline`

- [ ] 10. Standardize auth entry and session UI data access

  **What to do**:
  - Replace ad-hoc auth/session `fetch` calls in login/register/session-check/logout flows with the shared client API layer from Task 6.
  - Centralize session verification and logout behavior so auth UI does not own transport details.
  - Preserve current UX and auth semantics.

  **Must NOT do**:
  - Do not redesign the login/register UI.
  - Do not change auth cookie behavior or role handling.

  **Recommended Agent Profile**:
  - **Category**: `quick` - the affected surface is small and the desired layering is already defined.
  - **Skills**: `[]` - existing UI behavior should remain unchanged.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 17
  - **Blocked By**: 6

  **References**:
  - `components/PinScreen.tsx:33` - direct login/register/auth fetches live here.
  - `app/(portal)/layout.tsx:17` - session check and logout logic are inline.
  - `lib/api/client.ts:18` - canonical transport/error wrapper.
  - `lib/auth/context.tsx:17` - auth context shape that must continue to work.

  **Acceptance Criteria**:
  - [ ] `components/PinScreen.tsx` no longer performs raw auth-related fetches directly.
  - [ ] `app/(portal)/layout.tsx` delegates session check/logout to shared client helpers.
  - [ ] Existing auth flow behavior remains unchanged from the user's perspective.
  - [ ] `npm run type-check` passes.

  **QA Scenarios**:
  ```text
  Scenario: Auth/session UI uses shared client API
    Tool: Grep
    Preconditions: Auth/session UI migration complete
    Steps:
      1. Search `components/PinScreen.tsx` and `app/(portal)/layout.tsx` for `await fetch(`.
      2. Confirm shared auth/session API imports are present instead.
    Expected Result: Targeted auth/session UI no longer owns raw transport calls.
    Failure Indicators: Raw auth fetches remain in either file.
    Evidence: .sisyphus/evidence/task-10-auth-ui-grep.txt

  Scenario: Auth/session UI still compiles cleanly
    Tool: Bash
    Preconditions: Shared client auth helpers wired in
    Steps:
      1. Run `npm run type-check`.
    Expected Result: Type-check passes.
    Evidence: .sisyphus/evidence/task-10-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(auth-ui): use shared session api`

- [ ] 11. Standardize profile and admin UI data access

  **What to do**:
  - Replace raw `fetch` calls in the profile/admin surface with shared client API modules and hooks.
  - Reuse query invalidation and error handling patterns already established in `lib/hooks/*`.
  - Keep admin role management and profile save semantics intact while the registration backend is being modularized.

  **Must NOT do**:
  - Do not change admin permission rules.
  - Do not expand the profile feature set.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - UI state, admin flows, and registration dependencies need coordinated cleanup.
  - **Skills**: `[]` - existing API/hook conventions are the main guide.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 16, 17
  - **Blocked By**: 6, 8, 9

  **References**:
  - `components/sections/profile/index.tsx:95` - admin accounts and roster fetches are inline today.
  - `app/api/admin/accounts/route.ts:37` - admin account route contract used by the UI.
  - `app/api/discord-proxy/registration/route.ts:564` - registration route contract used by profile save/read flows.
  - `lib/hooks/useGuides.ts:28` - good example of mutation + invalidation structure.

  **Acceptance Criteria**:
  - [ ] Profile/admin UI uses shared API modules/hooks instead of ad-hoc fetch blocks.
  - [ ] Cache invalidation/error handling is centralized in hooks where stateful reuse exists.
  - [ ] Profile/admin behavior remains stable.
  - [ ] `npm run type-check` passes.

  **QA Scenarios**:
  ```text
  Scenario: Profile/admin UI no longer owns raw transport code
    Tool: Grep
    Preconditions: UI migration complete
    Steps:
      1. Search `components/sections/profile/index.tsx` for `await fetch(`.
      2. Confirm shared API/hook imports replaced the raw calls.
    Expected Result: Raw profile/admin fetches are removed from the component.
    Failure Indicators: Inline fetches remain in profile/admin UI.
    Evidence: .sisyphus/evidence/task-11-profile-grep.txt

  Scenario: Profile/admin refactor still compiles
    Tool: Bash
    Preconditions: Shared client profile/admin layer wired in
    Steps:
      1. Run `npm run type-check`.
    Expected Result: Type-check passes.
    Evidence: .sisyphus/evidence/task-11-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(profile): standardize admin and profile data access`

- [ ] 12. Retire legacy guides monolith

  **What to do**:
  - Verify the modular guides slice is the only active one used by portal pages.
  - Remove `components/sections/GuidesSection.tsx` once guide route/helper parity is confirmed.
  - Ensure no stale imports, type dependencies, or doc references point to the flat legacy component.

  **Must NOT do**:
  - Do not remove the file until page imports and guide behavior are verified against the modular slice.
  - Do not move guide business logic back into the UI while cleaning up.

  **Recommended Agent Profile**:
  - **Category**: `quick` - the active modular replacement already exists.
  - **Skills**: `[]` - this is cleanup guided by explicit import evidence.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 14
  - **Blocked By**: 2, 7

  **References**:
  - `app/(portal)/guides/page.tsx:3` - active page already imports the modular guides slice.
  - `components/sections/guides/index.tsx:17` - active modular guides entrypoint.
  - `components/sections/GuidesSection.tsx:61` - legacy flat monolith to remove.

  **Acceptance Criteria**:
  - [ ] No active import references `components/sections/GuidesSection.tsx`.
  - [ ] Legacy guides monolith is removed or archived outside active component paths.
  - [ ] `npm run build` passes after cleanup.

  **QA Scenarios**:
  ```text
  Scenario: Legacy guides monolith is no longer referenced
    Tool: Grep
    Preconditions: Cleanup complete
    Steps:
      1. Search the repo for `components/sections/GuidesSection`.
      2. Search portal pages for the active guides import.
    Expected Result: No references to the legacy file remain; modular guides page import remains intact.
    Failure Indicators: Any active import still references the flat guides monolith.
    Evidence: .sisyphus/evidence/task-12-guides-cleanup.txt

  Scenario: Guides page still builds after cleanup
    Tool: Bash
    Preconditions: Legacy guides file removed or archived
    Steps:
      1. Run `npm run build`.
    Expected Result: Build passes.
    Evidence: .sisyphus/evidence/task-12-build.txt
  ```

  **Commit**: YES
  - Message: `refactor(guides): remove legacy flat section`

- [ ] 13. Retire legacy help monolith

  **What to do**:
  - Verify the modular help slice is the only active page-backed implementation.
  - Remove `components/sections/HelpSection.tsx` after confirming parity with `components/sections/help/index.tsx`.
  - Untangle any stale type dependencies that only existed for the flat legacy help component.

  **Must NOT do**:
  - Do not remove the legacy file until the modular slice is confirmed as active.
  - Do not drop help-request functionality while cleaning up.

  **Recommended Agent Profile**:
  - **Category**: `quick` - the active modular replacement already exists.
  - **Skills**: `[]` - this is evidence-backed cleanup.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 14, 16
  - **Blocked By**: 2

  **References**:
  - `app/(portal)/help/page.tsx:3` - active page already imports the modular help slice.
  - `components/sections/help/index.tsx:25` - active modular help implementation.
  - `components/sections/HelpSection.tsx:13` - legacy flat help implementation.
  - `types/index.ts:98` - stale help type definition likely only survives because the legacy component still imports it.
  - `lib/schemas/help.ts:10` - richer schema-backed help request contract should be the source of truth.

  **Acceptance Criteria**:
  - [ ] No active import references `components/sections/HelpSection.tsx`.
  - [ ] Legacy help monolith is removed or archived outside active component paths.
  - [ ] Help-request type usage is aligned toward schema-backed contracts.
  - [ ] `npm run build` passes.

  **QA Scenarios**:
  ```text
  Scenario: Legacy help monolith is no longer referenced
    Tool: Grep
    Preconditions: Cleanup complete
    Steps:
      1. Search the repo for `components/sections/HelpSection`.
      2. Search portal pages for the active help import.
    Expected Result: No references to the legacy file remain; modular help page import remains intact.
    Failure Indicators: Any active import still references the flat help monolith.
    Evidence: .sisyphus/evidence/task-13-help-cleanup.txt

  Scenario: Help page still builds after cleanup
    Tool: Bash
    Preconditions: Legacy help file removed or archived
    Steps:
      1. Run `npm run build`.
    Expected Result: Build passes.
    Evidence: .sisyphus/evidence/task-13-build.txt
  ```

  **Commit**: YES
  - Message: `refactor(help): remove legacy flat section`

- [ ] 14. Remove remaining unused flat legacy section components

  **What to do**:
  - Remove flat legacy section files that have proven modular/page-backed replacements.
  - Cover the remaining duplicate surfaces such as news, schedule, absences, registration, and about where active page imports already point elsewhere.
  - Update docs/import maps so cleanup is explicit and final.

  **Must NOT do**:
  - Do not delete any section that is still imported by an active route/page.
  - Do not merge unrelated modular sections during cleanup.

  **Recommended Agent Profile**:
  - **Category**: `quick` - this is import-audit-driven cleanup.
  - **Skills**: `[]` - no special skill beyond careful reference checking.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 15, 16
  - **Blocked By**: 2, 12, 13

  **References**:
  - `app/(portal)/news/page.tsx:3` - active modular news import.
  - `app/(portal)/schedule/page.tsx:3` - active modular schedule import.
  - `app/(portal)/absences/page.tsx:3` - active modular absences import.
  - `app/(portal)/members/page.tsx:3` - active modular registration import.
  - `components/sections/NewsSection.tsx:1` - legacy flat duplicate.
  - `components/sections/ScheduleSection.tsx:1` - legacy flat duplicate.
  - `components/sections/AbsencesSection.tsx:1` - legacy flat duplicate.
  - `components/sections/RegistrationSection.tsx:1` - legacy flat duplicate.
  - `components/sections/AboutSection.tsx:1` - legacy flat duplicate.

  **Acceptance Criteria**:
  - [ ] Unused flat section duplicates are removed or archived outside active paths.
  - [ ] Active `app/(portal)` page imports remain unchanged and build successfully.
  - [ ] Docs/import map reflects the cleanup.

  **QA Scenarios**:
  ```text
  Scenario: Flat legacy section duplicates are fully unreferenced
    Tool: Grep
    Preconditions: Cleanup complete
    Steps:
      1. Search the repo for each legacy flat section path.
      2. Confirm active portal pages still import only modular section folders.
    Expected Result: No active references to removed flat section files remain.
    Failure Indicators: Any portal page or shared component still imports a removed flat section.
    Evidence: .sisyphus/evidence/task-14-flat-section-audit.txt

  Scenario: Cleanup preserves the app build
    Tool: Bash
    Preconditions: Flat duplicates removed or archived
    Steps:
      1. Run `npm run build`.
    Expected Result: Build passes.
    Evidence: .sisyphus/evidence/task-14-build.txt
  ```

  **Commit**: YES
  - Message: `refactor(sections): remove unused flat legacy components`

- [ ] 15. Remove or archive legacy Vite SPA surface

  **What to do**:
  - Remove or quarantine the legacy SPA entrypoints and configs once active runtime/deploy references are already gone.
  - Cover `src/js`, `src/css` if unused by the Next app, plus `index.html`, `vite.config.js`, `config.js`, and the old Vite deploy config if it still exists only for legacy reasons.
  - Keep the repository unambiguous about which app is real.

  **Must NOT do**:
  - Do not remove any asset still referenced by the Next.js app.
  - Do not leave partial legacy runtime paths behind.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` - this is broad cleanup with cross-file reference risk.
  - **Skills**: `[]` - rely on repo-wide reference checks, not assumptions.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 17
  - **Blocked By**: 1, 14

  **References**:
  - `.vercel.json:1` - legacy deploy config pointing to Vite/index.html behavior.
  - `vite.config.js:4` - Vite build config for the old SPA.
  - `index.html:38` - old HTML entrypoint loading `src/js/app.js`.
  - `src/js/app.js:12` - legacy application bootstrap.
  - `config.js:32` - another legacy reference to the old SPA entrypoint.

  **Acceptance Criteria**:
  - [ ] Legacy SPA files are removed or relocated outside the active app surface.
  - [ ] No active config/docs/runtime reference points to the Vite SPA.
  - [ ] `npm run build` passes for the Next.js app after cleanup.

  **QA Scenarios**:
  ```text
  Scenario: Legacy Vite SPA surface is no longer active
    Tool: Grep
    Preconditions: Legacy SPA cleanup complete
    Steps:
      1. Search the repo for references to `src/js/app.js`, `index.html`, and `vite.config.js` in active app/deploy configs.
      2. Confirm no surviving config or doc claims the Vite SPA is the active runtime.
    Expected Result: The legacy SPA is no longer wired into active tooling.
    Failure Indicators: Any active config still references the Vite SPA entrypoints.
    Evidence: .sisyphus/evidence/task-15-vite-audit.txt

  Scenario: Next.js build succeeds after legacy cleanup
    Tool: Bash
    Preconditions: Legacy files removed or archived
    Steps:
      1. Run `npm run build`.
    Expected Result: Build passes.
    Evidence: .sisyphus/evidence/task-15-build.txt
  ```

  **Commit**: YES
  - Message: `refactor(legacy): remove obsolete vite app surface`

- [ ] 16. Normalize type source-of-truth around schema exports

  **What to do**:
  - Reduce stale duplicate domain interfaces in `types/index.ts` where richer schema-backed types already exist.
  - Update imports so active features consume schema-derived types for guides/help and related flows.
  - Keep `types/index.ts` focused on truly app-wide shared types instead of shadow copies.

  **Must NOT do**:
  - Do not change payload semantics while renaming or re-sourcing types.
  - Do not break public component props that still need app-level aliases.

  **Recommended Agent Profile**:
  - **Category**: `quick` - the cleanup is precise once legacy consumers are removed.
  - **Skills**: `[]` - type source-of-truth should follow existing schema contracts.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 17, 18
  - **Blocked By**: 11, 13, 14

  **References**:
  - `types/index.ts:80` - duplicate guide/news/help-style interfaces live here.
  - `types/index.ts:124` - schema types are already re-exported from this file.
  - `lib/schemas/guide.ts:62` - canonical guide type source.
  - `lib/schemas/help.ts:48` - canonical help type source.
  - `components/sections/HelpSection.tsx:4` - legacy type import that should disappear with cleanup.

  **Acceptance Criteria**:
  - [ ] Active guide/help flows import schema-backed types or approved aliases, not stale duplicates.
  - [ ] `types/index.ts` no longer keeps unnecessary shadow copies for cleaned-up features.
  - [ ] `npm run type-check` passes.

  **QA Scenarios**:
  ```text
  Scenario: Active features use schema-backed type sources
    Tool: Grep
    Preconditions: Type cleanup complete
    Steps:
      1. Search active feature files for imports of stale duplicate types from `@/types`.
      2. Confirm guide/help flows now resolve to schema-backed types or explicit aliases.
    Expected Result: Active features do not depend on stale shadow interfaces.
    Failure Indicators: Active modular features still import obsolete duplicates from `types/index.ts`.
    Evidence: .sisyphus/evidence/task-16-type-source-audit.txt

  Scenario: Type normalization preserves compile-time stability
    Tool: Bash
    Preconditions: Imports updated
    Steps:
      1. Run `npm run type-check`.
    Expected Result: Type-check passes.
    Evidence: .sisyphus/evidence/task-16-typecheck.txt
  ```

  **Commit**: YES
  - Message: `refactor(types): align active domains with schema exports`

- [ ] 17. Add regression coverage for extracted helpers and flows

  **What to do**:
  - Add or update Vitest coverage around the extracted auth helper, guide helper adoption, registration route modules, and shared client auth/profile modules.
  - Cover both happy-path and failure-path behavior for the new seams, especially unauthorized/error handling and preserved contracts.
  - Reuse existing testing conventions instead of inventing a separate test framework.

  **Must NOT do**:
  - Do not write brittle snapshot-only tests.
  - Do not leave the newly extracted boundaries untested.

  **Recommended Agent Profile**:
  - **Category**: `deep` - this task verifies the highest-risk refactors actually preserved behavior.
  - **Skills**: `[]` - existing Vitest + Testing Library patterns are sufficient.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: FINAL
  - **Blocked By**: 7, 8, 9, 10, 11, 15, 16

  **References**:
  - `vitest.config.ts:5` - current Vitest setup.
  - `tests/setup.ts:19` - shared test mocks (`fetch`, `localStorage`) already exist.
  - `tests/api/client.test.ts:14` - property-based testing style for client boundaries.
  - `tests/hooks/useGuides.test.tsx:57` - hook-layer testing pattern.
  - `app/api/discord-proxy/registration/route.ts:564` - highest-risk behavior to preserve through tests.

  **Acceptance Criteria**:
  - [ ] New or updated tests cover extracted server helpers and critical auth/profile flows.
  - [ ] Both happy and failure-path behavior are asserted for the new boundaries.
  - [ ] `npm run test` passes.
  - [ ] `npm run type-check` still passes.

  **QA Scenarios**:
  ```text
  Scenario: Regression suite passes for extracted boundaries
    Tool: Bash
    Preconditions: Tests for extracted helpers and flows are added/updated
    Steps:
      1. Run `npm run test`.
      2. Confirm suites covering shared auth helpers, guide route helpers, registration modules, and client auth/profile APIs pass.
    Expected Result: All targeted regression tests pass.
    Failure Indicators: Any newly added or touched suite fails.
    Evidence: .sisyphus/evidence/task-17-test-run.txt

  Scenario: Failure paths are covered, not just happy paths
    Tool: Read
    Preconditions: Test files saved
    Steps:
      1. Read the new/updated test files.
      2. Confirm they include explicit unauthorized/invalid-payload/error-handling assertions in addition to success cases.
    Expected Result: Regression tests cover both positive and negative behavior.
    Evidence: .sisyphus/evidence/task-17-test-audit.txt
  ```

  **Commit**: YES
  - Message: `test(quality): add regression coverage for refactor seams`

- [ ] 18. Add architecture guardrails and contributor guidance

  **What to do**:
  - Update architecture/contributor documentation with the canonical patterns established by this refactor.
  - Explicitly document rules such as: one active runtime, `api -> hook -> component` for client data access, shared route auth helpers, and no new flat legacy section components.
  - Add lightweight repo guardrails where feasible (scripts/lint checks/search-based checks) to stop drift from reappearing.

  **Must NOT do**:
  - Do not add heavyweight bespoke tooling if a simple script/doc/check is enough.
  - Do not document patterns that the codebase does not actually implement.

  **Recommended Agent Profile**:
  - **Category**: `writing` - the value is making the intended architecture explicit and enforceable.
  - **Skills**: `[]` - this is repo-specific guidance, not external-library research.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: FINAL
  - **Blocked By**: 1, 2, 16

  **References**:
  - `ARCHITECTURE.md:15` - current architecture doc needs to reflect the canonical runtime and layering.
  - `README.md` - contributor-facing setup/runtime guidance must stop implying multiple active app stacks.
  - `lib/api/client.ts:18` - client boundary to document as the standard pattern.
  - `app/api/help/_shared.ts:4` - concrete example of shared route helper extraction to generalize.

  **Acceptance Criteria**:
  - [ ] Docs clearly state the canonical runtime, section structure, and data-access rules.
  - [ ] Lightweight guardrails exist to catch reintroduction of forbidden patterns.
  - [ ] Documentation matches the post-refactor codebase.

  **QA Scenarios**:
  ```text
  Scenario: Contributor docs match the final architecture
    Tool: Read
    Preconditions: Docs updated after code refactor settles
    Steps:
      1. Read `README.md` and `ARCHITECTURE.md`.
      2. Confirm they describe the Next.js runtime, modular section folders, shared route auth helpers, and the client API/hook boundary.
    Expected Result: Documentation matches the implemented architecture.
    Failure Indicators: Docs still describe the Vite app or omit the new canonical patterns.
    Evidence: .sisyphus/evidence/task-18-doc-audit.txt

  Scenario: Guardrails are runnable and catch forbidden drift
    Tool: Bash
    Preconditions: Guardrail scripts/checks added
    Steps:
      1. Run the added guardrail command(s).
      2. Confirm they execute successfully in a clean refactor state.
    Expected Result: Guardrails run successfully and are suitable for CI/local use.
    Evidence: .sisyphus/evidence/task-18-guardrails.txt
  ```

  **Commit**: YES
  - Message: `docs(architecture): codify canonical patterns and guardrails`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must approve. Rejection -> fix -> re-run.

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Read the plan end-to-end. Verify that the canonical runtime is Next.js-only, duplicated helpers were centralized, monoliths were decomposed, and legacy artifacts were either removed or explicitly quarantined. Check evidence files exist.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT`

- [ ] F2. **Code Quality Review** - `unspecified-high`
  Run `npm run type-check`, `npm run build`, and `npm run test`. Review all changed files for duplicated helpers, dead imports, console noise in production paths, stale legacy references, and accidental over-abstraction.
  Output: `Typecheck [PASS/FAIL] | Build [PASS/FAIL] | Tests [N pass/N fail] | VERDICT`

- [ ] F3. **Real QA Execution** - `unspecified-high`
  Execute every task QA scenario, including route checks, auth/profile UI flows, and legacy-reference cleanup verification. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** - `deep`
  Compare final diff to this plan. Confirm only architecture/refactor/cleanup scope landed, with no extra feature work, design churn, or unrelated behavioral changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor(architecture): establish shared runtime and helper boundaries`
- **Wave 2**: `refactor(server): decompose duplicated route logic and monoliths`
- **Wave 2/3 UI cleanup**: `refactor(ui): standardize data access and remove legacy sections`
- **Wave 3 quality**: `test(quality): add regression coverage and guardrails`

---

## Success Criteria

### Verification Commands

```bash
npm run type-check   # Expected: 0 errors
npm run build        # Expected: successful Next.js production build
npm run test         # Expected: all Vitest suites pass
```

### Final Checklist
- [ ] All active pages import canonical modular sections only
- [ ] Shared server auth helper replaces per-route `getAuthToken` copies
- [ ] Guide schema/bootstrap logic exists once, not per route file
- [ ] Registration route behavior is preserved but implemented through smaller modules
- [ ] Auth/profile/admin UI uses shared client API boundaries instead of ad-hoc raw fetches where scoped by this plan
- [ ] Legacy Vite runtime/deploy references are gone from active tooling
- [ ] Regression tests cover extracted helpers and critical flows
