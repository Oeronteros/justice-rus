# Evaluate Whether FSD Is Needed

## TL;DR

> **Quick Summary**: Assess whether Feature-Sliced Design would solve real structural problems in this Next.js repository, or whether the current modular conventions are already sufficient.
>
> **Deliverables**:
> - Repository structure inventory with FSD-fit signals
> - Decision matrix scoring adoption need vs cost
> - Recommendation note: keep current structure, tighten conventions, or prepare phased FSD migration later
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 -> Task 6 -> Task 8

---

## Context

### Original Request
Determine whether this repository actually needs Feature-Sliced Design.

### Interview Summary
**Key Discussions**:
- Current repo appears modular but not organized as strict FSD.
- User chose evaluation-first instead of migration planning.

**Research Findings**:
- `README.md:88` documents a conventional structure around `app/`, `components/`, `lib/`, `types/`, `docs/`.
- `ARCHITECTURE.md:15` explains system architecture, not frontend slicing.
- `app/(portal)/` groups routes by portal sections such as `members/`, `guides/`, `news/`, `schedule/`, `profile`.
- `components/` contains app shell, section UI, shared UI, and forms in one broad bucket.
- `lib/server/registration/` and `lib/server/pvp/` show some domain-oriented organization already.
- `lib/hooks/`, `lib/schemas/`, and `types/index.ts` centralize cross-domain concerns into broad technical buckets.
- `tests/` is split by technical concern (`components`, `hooks`, `lib`) rather than domain slices.

### Metis Review
**Identified Gaps** (addressed):
- Need explicit guardrail against drifting into implementation or migration during evaluation.
- Need concrete recommendation criteria so the result is not a vague opinion.
- Need a fallback outcome in case FSD is not justified: tighten naming and boundaries without adopting FSD.

---

## Work Objectives

### Core Objective
Produce an evidence-based recommendation on whether adopting FSD would materially improve this repository's maintainability, scalability, and team ergonomics.

### Concrete Deliverables
- `.sisyphus/notepads/fsd-repo-inventory.md`
- `.sisyphus/notepads/fsd-decision-matrix.md`
- `.sisyphus/notepads/fsd-recommendation.md`

### Definition of Done
- [ ] Repository evidence is mapped to concrete files and current organizational patterns.
- [ ] Decision matrix includes both adoption benefits and migration costs.
- [ ] Final recommendation is binary enough to act on: `Do not adopt now`, `Adopt partially later`, or `Plan migration`.
- [ ] Recommendation includes non-FSD alternatives if full adoption is not justified.

### Must Have
- File-backed analysis of current route, component, domain, and shared-module boundaries.
- Explicit criteria for when FSD adds value vs when it is overkill.
- Migration-cost assessment tied to actual repo structure.

### Must NOT Have (Guardrails)
- No source-code refactors, renames, or folder moves.
- No premature migration plan beyond a short "if later" note.
- No generic "FSD is always better" conclusion without repository evidence.
- No recommendation based only on aesthetics or trend-following.

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: None
- **Framework**: vitest
- **Reason**: This work produces analysis artifacts, not behavior changes. Verification relies on evidence capture and consistency checks rather than new automated tests.

### QA Policy
Every task must leave inspectable evidence in `.sisyphus/evidence/` or `.sisyphus/notepads/`.

- **Repo analysis**: Use Bash plus file reads/searches to capture inventories and counts.
- **Documentation synthesis**: Save intermediate notes with explicit file references.
- **Decision validation**: Cross-check every recommendation claim against at least one repository reference and one evaluation criterion.

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately - repository evidence collection):
- Task 1: Map route and page structure against potential FSD page/widget boundaries [unspecified-low]
- Task 2: Inventory UI/component organization and reuse hotspots [unspecified-low]
- Task 3: Inventory domain/business logic boundaries on server and schema layers [unspecified-low]
- Task 4: Inventory shared hooks, shared types, and cross-domain buckets [unspecified-low]
- Task 5: Inspect test layout and coupling signals that affect maintainability [unspecified-low]

Wave 2 (After Wave 1 - evaluation and trade-offs):
- Task 6: Build FSD-fit criteria scorecard from repo evidence [writing]
- Task 7: Assess migration cost, churn, and lower-cost alternatives [writing]

Wave 3 (After Wave 2 - final recommendation):
- Task 8: Synthesize recommendation and decision memo [writing]

Wave FINAL (After ALL tasks - independent review, 4 parallel):
- Task F1: Plan compliance audit [oracle]
- Task F2: Evidence quality review [unspecified-high]
- Task F3: Notepad artifact QA [unspecified-high]
- Task F4: Scope fidelity check [deep]

Critical Path: Task 1 -> Task 6 -> Task 8
Parallel Speedup: ~55% faster than sequential
Max Concurrent: 5

### Dependency Matrix

- **1**: none -> 6, 8
- **2**: none -> 6, 7, 8
- **3**: none -> 6, 7, 8
- **4**: none -> 6, 7, 8
- **5**: none -> 6, 7, 8
- **6**: 1, 2, 3, 4, 5 -> 8
- **7**: 2, 3, 4, 5 -> 8
- **8**: 6, 7 -> F1, F2, F3, F4
- **F1**: 8 -> complete
- **F2**: 8 -> complete
- **F3**: 8 -> complete
- **F4**: 8 -> complete

### Agent Dispatch Summary

- **Wave 1**: 5 agents - T1-T5 -> `unspecified-low`
- **Wave 2**: 2 agents - T6-T7 -> `writing`
- **Wave 3**: 1 agent - T8 -> `writing`
- **FINAL**: 4 agents - F1 -> `oracle`, F2 -> `unspecified-high`, F3 -> `unspecified-high`, F4 -> `deep`

---

## TODOs

- [ ] 1. Map route and page structure

  **What to do**:
  - Inspect `app/` and especially `app/(portal)/` to map route segments, layouts, and page entry points.
  - Identify whether current route organization already acts like the FSD `pages` layer and whether any route files are overloaded with UI orchestration.
  - Record findings in `.sisyphus/notepads/fsd-repo-inventory.md` under a dedicated "Routes and pages" section.

  **Must NOT do**:
  - Do not move or rename route files.
  - Do not propose migration steps yet.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: narrow repository inspection with low implementation complexity.
  - **Skills**: `[]`
    - No extra skill is required; this is direct file-structure analysis.
  - **Skills Evaluated but Omitted**:
    - `navigation-patterns`: not needed because the task evaluates structure, not redesigning navigation UX.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: 6, 8
  - **Blocked By**: None

  **References**:
  - `README.md:88` - Documents the top-level project structure that should be compared with actual route organization.
  - `app/(portal)` - Primary route group where feature sections are already split by page path.
  - `app/(portal)/page.tsx:10` - Example portal landing page showing route-level orchestration and direct imports from shared component buckets.
  - `app/layout.tsx` - Root app shell boundary that may overlap with what FSD would consider app-level infrastructure.

  **Acceptance Criteria**:
  - [ ] `.sisyphus/notepads/fsd-repo-inventory.md` contains a "Routes and pages" section with at least 5 concrete route references.
  - [ ] The section explicitly states whether current routing already covers most of the FSD `pages` need.

  **QA Scenarios**:
  ```
  Scenario: Route inventory captured
    Tool: Bash
    Preconditions: Repository is readable and `.sisyphus/notepads/` exists.
    Steps:
      1. Enumerate `app/` and `app/(portal)/` entries.
      2. Open `.sisyphus/notepads/fsd-repo-inventory.md`.
      3. Assert it contains the heading `Routes and pages` and at least five path strings starting with `app/`.
    Expected Result: Route inventory exists and references real route files/directories.
    Failure Indicators: Missing heading, fewer than five route references, or claims without file paths.
    Evidence: .sisyphus/evidence/task-1-route-inventory.txt

  Scenario: Overloaded route check captured
    Tool: Bash
    Preconditions: `app/(portal)/page.tsx` is accessible.
    Steps:
      1. Read `app/(portal)/page.tsx`.
      2. Assert the inventory note states whether this file behaves mainly as orchestration, UI composition, or mixed responsibility.
      3. Confirm the note includes a yes/no judgment on whether route files are a current pain point.
    Expected Result: The note contains a binary structural judgment, not just description.
    Failure Indicators: No judgment, no file reference, or purely generic commentary.
    Evidence: .sisyphus/evidence/task-1-route-overload-check.txt
  ```

  **Commit**: NO

- [ ] 2. Inventory UI and component organization

  **What to do**:
  - Inspect `components/`, including `sections/`, `shared/`, and shell-level files.
  - Determine whether the current component layout mixes app shell, widgets, and feature-level UI too heavily.
  - Add findings to `.sisyphus/notepads/fsd-repo-inventory.md` under "UI organization".

  **Must NOT do**:
  - Do not redesign components.
  - Do not convert component folders to FSD names.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: bounded structural analysis of component directories.
  - **Skills**: `[]`
    - The task depends on direct repository reading rather than specialized UI craft.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: omitted because no visual redesign is in scope.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: 6, 7, 8
  - **Blocked By**: None

  **References**:
  - `components` - Top-level component bucket that may currently collapse multiple FSD layers into one area.
  - `components/sections` - Candidate evidence for route- or feature-specific UI organization.
  - `components/shared` - Candidate evidence for existing shared-layer conventions.
  - `components/PortalShell.tsx` - Shell-level component that may align with app/widget boundaries.
  - `components/MainLayout.tsx` - Another structural component useful for app-shell boundary analysis.

  **Acceptance Criteria**:
  - [ ] Inventory note contains a "UI organization" section with at least 6 concrete component references.
  - [ ] The section distinguishes app shell, reusable shared UI, and route/section-specific UI.

  **QA Scenarios**:
  ```
  Scenario: Component inventory captured
    Tool: Bash
    Preconditions: `components/` exists.
    Steps:
      1. Enumerate top-level entries under `components/`.
      2. Open `.sisyphus/notepads/fsd-repo-inventory.md`.
      3. Assert the `UI organization` section contains references to `components/sections` and `components/shared`.
    Expected Result: Inventory differentiates at least two component subgroups with examples.
    Failure Indicators: Only generic statements like "components are mixed" without examples.
    Evidence: .sisyphus/evidence/task-2-component-inventory.txt

  Scenario: Shared-vs-local boundary check captured
    Tool: Bash
    Preconditions: Inventory note is updated.
    Steps:
      1. Search the note for labels or wording that classify components as shell/shared/section-specific.
      2. Confirm at least one component is assigned to each class when evidence exists.
    Expected Result: The note explicitly states whether boundary confusion is a real problem.
    Failure Indicators: No classification or no conclusion about maintainability impact.
    Evidence: .sisyphus/evidence/task-2-boundary-check.txt
  ```

  **Commit**: NO

- [ ] 3. Inventory domain and server-side boundaries

  **What to do**:
  - Inspect `lib/server/`, domain subfolders, and schema modules to find existing domain-oriented boundaries.
  - Document where the repo already behaves like `entities` or `features` without using FSD naming.
  - Add findings to the inventory note under "Domain boundaries".

  **Must NOT do**:
  - Do not merge or split domain modules.
  - Do not assume naming differences alone mean poor architecture.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: direct codebase inspection with moderate conceptual analysis.
  - **Skills**: `[]`
    - No special skill is required for file-boundary mapping.
  - **Skills Evaluated but Omitted**:
    - `react-ux-patterns`: not relevant because this is domain-layer analysis.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: 6, 7, 8
  - **Blocked By**: None

  **References**:
  - `lib/server/registration` - Existing domain-oriented backend module that may reduce the immediate need for FSD.
  - `lib/server/pvp` - Another domain boundary useful for checking consistency.
  - `lib/schemas` - Central schema bucket to assess whether domain contracts are too centralized.
  - `types/index.ts:28` - Aggregated domain types that may blur entity boundaries.
  - `ARCHITECTURE.md:13` - System-level context for understanding where domain logic is intended to live.

  **Acceptance Criteria**:
  - [ ] Inventory note contains a "Domain boundaries" section with at least 5 concrete references.
  - [ ] The section identifies both existing good boundaries and current pain points.

  **QA Scenarios**:
  ```
  Scenario: Domain modules mapped
    Tool: Bash
    Preconditions: `lib/server/` and `lib/schemas/` exist.
    Steps:
      1. Enumerate `lib/server/` subdirectories and `lib/schemas/` files.
      2. Open `.sisyphus/notepads/fsd-repo-inventory.md`.
      3. Assert the note references `lib/server/registration` and at least one additional domain-related location.
    Expected Result: The note captures both domain-specific and shared-technical buckets.
    Failure Indicators: Only one side is documented or no comparison is made.
    Evidence: .sisyphus/evidence/task-3-domain-map.txt

  Scenario: Existing-boundary strength check captured
    Tool: Bash
    Preconditions: Domain section exists in the note.
    Steps:
      1. Read the `Domain boundaries` section.
      2. Confirm it explicitly answers whether current domain modularity already covers part of the FSD goal.
    Expected Result: The note includes a clear yes/no-or-partial judgment.
    Failure Indicators: No judgment or unsupported recommendation.
    Evidence: .sisyphus/evidence/task-3-boundary-strength.txt
  ```

  **Commit**: NO

- [ ] 4. Inventory shared hooks, schemas, and types

  **What to do**:
  - Inspect `lib/hooks/`, `lib/schemas/`, and `types/index.ts` for broad shared buckets that may hide domain coupling.
  - Record whether these shared buckets are a real maintenance problem or just a naming/style issue.
  - Add findings to the inventory note under "Shared technical buckets".

  **Must NOT do**:
  - Do not split files.
  - Do not infer coupling without referencing actual module grouping.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: small-scope structural review with no implementation work.
  - **Skills**: `[]`
    - No additional skill is required.
  - **Skills Evaluated but Omitted**:
    - `data-density-patterns`: not relevant to repository structure analysis.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: 6, 7, 8
  - **Blocked By**: None

  **References**:
  - `lib/hooks` - Central hook bucket that may combine multiple features/entities in one shared layer.
  - `lib/schemas` - Shared validation bucket useful for checking whether contracts are domain-owned or globally pooled.
  - `types/index.ts:1` - Single aggregate type entry point that can signal convenience vs over-centralization.
  - `lib/providers/QueryProvider.tsx` - Example of app-level technical infrastructure that should not be confused with domain slicing.

  **Acceptance Criteria**:
  - [ ] Inventory note contains a "Shared technical buckets" section with at least 4 concrete references.
  - [ ] The section separates true coupling risks from benign shared infrastructure.

  **QA Scenarios**:
  ```
  Scenario: Shared bucket inventory captured
    Tool: Bash
    Preconditions: Relevant directories exist.
    Steps:
      1. Enumerate `lib/hooks/` and `lib/schemas/`.
      2. Open `.sisyphus/notepads/fsd-repo-inventory.md`.
      3. Assert the note references both buckets and `types/index.ts`.
    Expected Result: Shared technical areas are documented with evidence.
    Failure Indicators: No reference to one of the major shared buckets.
    Evidence: .sisyphus/evidence/task-4-shared-buckets.txt

  Scenario: False-positive risk checked
    Tool: Bash
    Preconditions: Shared bucket section exists.
    Steps:
      1. Read the section.
      2. Confirm it explicitly distinguishes app infrastructure from domain leakage.
    Expected Result: The note avoids treating every shared file as an FSD problem.
    Failure Indicators: Blanket statement that all shared modules must become FSD slices.
    Evidence: .sisyphus/evidence/task-4-false-positive-check.txt
  ```

  **Commit**: NO

- [ ] 5. Inspect tests and maintainability signals

  **What to do**:
  - Inspect `tests/` layout to see whether current test organization increases or decreases the need for FSD.
  - Note whether the existing technical-area split helps local reasoning or hides domain ownership.
  - Add findings to the inventory note under "Tests and maintainability signals".

  **Must NOT do**:
  - Do not add or edit tests.
  - Do not equate non-FSD tests with bad architecture automatically.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: bounded repository assessment with low execution risk.
  - **Skills**: `[]`
    - No extra skill is necessary.
  - **Skills Evaluated but Omitted**:
    - `playwright`: not needed because no browser verification is required for this analysis task.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: 6, 7, 8
  - **Blocked By**: None

  **References**:
  - `tests` - Overall test organization split by technical concern.
  - `tests/components` - Evidence of UI-focused test grouping.
  - `tests/hooks` - Evidence of hook-centric technical grouping.
  - `tests/lib` - Evidence of library/server-centric technical grouping.
  - `package.json:6` - Confirms Vitest infrastructure exists, so maintainability analysis can include existing test organization rather than setup concerns.

  **Acceptance Criteria**:
  - [ ] Inventory note contains a "Tests and maintainability signals" section with at least 4 concrete references.
  - [ ] The section states whether current test layout supports or weakens domain ownership clarity.

  **QA Scenarios**:
  ```
  Scenario: Test-layout note captured
    Tool: Bash
    Preconditions: `tests/` exists.
    Steps:
      1. Enumerate top-level entries in `tests/`.
      2. Open `.sisyphus/notepads/fsd-repo-inventory.md`.
      3. Assert the note references `tests/components`, `tests/hooks`, and `tests/lib`.
    Expected Result: Test organization is captured with concrete examples.
    Failure Indicators: Missing references to major test groupings.
    Evidence: .sisyphus/evidence/task-5-test-layout.txt

  Scenario: Maintainability judgment captured
    Tool: Bash
    Preconditions: Test section exists.
    Steps:
      1. Read the `Tests and maintainability signals` section.
      2. Confirm it includes a statement about whether test layout is a forcing function for FSD adoption.
    Expected Result: The note turns observations into a direct evaluative conclusion.
    Failure Indicators: No recommendation impact stated.
    Evidence: .sisyphus/evidence/task-5-maintainability-judgment.txt
  ```

  **Commit**: NO

- [ ] 6. Build FSD-fit criteria scorecard

  **What to do**:
  - Create `.sisyphus/notepads/fsd-decision-matrix.md`.
  - Turn Wave 1 findings into explicit criteria: domain complexity, cross-team scaling, boundary confusion, duplication pressure, shared-layer sprawl, onboarding cost, migration payoff.
  - Score each criterion for this repo as `Low`, `Medium`, or `High` need for FSD, with rationale tied to repository evidence.

  **Must NOT do**:
  - Do not rely on generic internet opinions without tying them to this repo.
  - Do not collapse trade-offs into a single unsupported score.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: synthesis and decision-criteria writing are the main outputs.
  - **Skills**: [`comparison-patterns`]
    - `comparison-patterns`: helps structure side-by-side evaluation of current structure vs FSD value proposition.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: useful only if external references are needed; the core output must stay repo-specific.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: 8
  - **Blocked By**: 1, 2, 3, 4, 5

  **References**:
  - `.sisyphus/notepads/fsd-repo-inventory.md` - Primary repository evidence source gathered in Wave 1.
  - `README.md:88` - Baseline documented structure to compare against actual organization.
  - `components` - Evidence for UI-layer mixing risk.
  - `lib/server/registration` - Evidence that some domain slicing already exists without FSD naming.
  - `types/index.ts:28` - Evidence for centralized domain contracts.

  **Acceptance Criteria**:
  - [ ] `.sisyphus/notepads/fsd-decision-matrix.md` exists.
  - [ ] The matrix contains at least 6 decision criteria.
  - [ ] Every criterion has a score and at least one repository reference.

  **QA Scenarios**:
  ```
  Scenario: Decision matrix created with evidence-backed criteria
    Tool: Bash
    Preconditions: Wave 1 inventory note exists.
    Steps:
      1. Open `.sisyphus/notepads/fsd-decision-matrix.md`.
      2. Count criteria rows or headings.
      3. Assert there are at least six criteria and each contains a score plus a repository path reference.
    Expected Result: The matrix is structured, scored, and evidence-backed.
    Failure Indicators: Fewer than six criteria, no scores, or no file references.
    Evidence: .sisyphus/evidence/task-6-decision-matrix.txt

  Scenario: Anti-slop check on criteria
    Tool: Bash
    Preconditions: Decision matrix exists.
    Steps:
      1. Read the matrix.
      2. Assert it includes at least one criterion favoring "do not adopt now" if evidence is weak.
      3. Confirm no criterion uses blanket language like `always`, `never`, or `best practice` without qualification.
    Expected Result: The matrix remains decision-oriented, not ideology-driven.
    Failure Indicators: One-sided framing or unsupported absolutes.
    Evidence: .sisyphus/evidence/task-6-anti-slop-check.txt
  ```

  **Commit**: NO

- [ ] 7. Assess migration cost and alternatives

  **What to do**:
  - Add a cost/risk section to `.sisyphus/notepads/fsd-decision-matrix.md`.
  - Estimate migration pressure based on current structure: route reorganization, component moves, shared hook/schema/type ownership changes, and test churn.
  - Document lower-cost alternatives such as clearer boundaries inside existing `components/` and `lib/` buckets.

  **Must NOT do**:
  - Do not design a full migration roadmap.
  - Do not present FSD as the only path to better modularity.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: this is trade-off analysis and recommendation support.
  - **Skills**: [`comparison-patterns`]
    - `comparison-patterns`: useful for comparing FSD adoption against lower-cost alternatives.
  - **Skills Evaluated but Omitted**:
    - `git-master`: unnecessary because no history archaeology is required for this first-pass evaluation.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 6)
  - **Blocks**: 8
  - **Blocked By**: 2, 3, 4, 5

  **References**:
  - `components` - Main source of likely move/churn cost for any future slicing.
  - `lib/hooks` - Shared hook ownership would need careful repartition if FSD were adopted.
  - `lib/schemas` - Validation ownership likely shifts if stronger slice boundaries are introduced.
  - `types/index.ts:1` - Centralized types likely create migration touchpoints.
  - `tests` - Test reorganization cost and ownership changes.

  **Acceptance Criteria**:
  - [ ] Decision matrix contains a dedicated migration-cost section.
  - [ ] At least 3 lower-cost alternatives to full FSD are listed.
  - [ ] Cost estimates are tied to concrete structural areas in the repo.

  **QA Scenarios**:
  ```
  Scenario: Migration cost section grounded in repo structure
    Tool: Bash
    Preconditions: Decision matrix exists.
    Steps:
      1. Read the migration-cost section in `.sisyphus/notepads/fsd-decision-matrix.md`.
      2. Assert it references at least three concrete repo areas such as `components`, `lib/hooks`, `types/index.ts`, or `tests`.
    Expected Result: Cost assessment is evidence-based rather than abstract.
    Failure Indicators: Generic risk statements without repo touchpoints.
    Evidence: .sisyphus/evidence/task-7-migration-cost.txt

  Scenario: Alternatives section present
    Tool: Bash
    Preconditions: Decision matrix is updated.
    Steps:
      1. Search for an alternatives subsection.
      2. Confirm it lists at least three non-FSD options and explains when they are enough.
    Expected Result: The evaluation presents credible alternatives to full FSD adoption.
    Failure Indicators: No alternatives, or alternatives listed without rationale.
    Evidence: .sisyphus/evidence/task-7-alternatives.txt
  ```

  **Commit**: NO

- [ ] 8. Synthesize recommendation memo

  **What to do**:
  - Create `.sisyphus/notepads/fsd-recommendation.md`.
  - Summarize current structure strengths, actual pain points, decision-matrix outcome, and final recommendation.
  - End with one explicit action choice: `Do not adopt FSD now`, `Revisit after growth`, or `Prepare migration plan next`.
  - Include a short "what to do instead now" section if full FSD adoption is not recommended.

  **Must NOT do**:
  - Do not leave the recommendation ambiguous.
  - Do not expand into a full implementation plan.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: final deliverable is a clear recommendation memo.
  - **Skills**: [`comparison-patterns`]
    - `comparison-patterns`: helps condense evidence, costs, and alternatives into a final decision.
  - **Skills Evaluated but Omitted**:
    - `writing`: omitted as a skill because it is already expressed through the chosen category.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3
  - **Blocks**: F1, F2, F3, F4
  - **Blocked By**: 6, 7

  **References**:
  - `.sisyphus/notepads/fsd-repo-inventory.md` - Repository evidence source.
  - `.sisyphus/notepads/fsd-decision-matrix.md` - Decision logic and scoring source.
  - `README.md:88` - Documented structure baseline.
  - `ARCHITECTURE.md:15` - Helps keep system-level architecture separate from frontend slicing concerns.

  **Acceptance Criteria**:
  - [ ] `.sisyphus/notepads/fsd-recommendation.md` exists.
  - [ ] Memo contains one explicit recommendation outcome.
  - [ ] Memo cites both strengths of the current structure and risks/benefits of FSD.
  - [ ] Memo includes next-step guidance that stays evaluation-only unless migration is explicitly recommended.

  **QA Scenarios**:
  ```
  Scenario: Final recommendation is explicit and actionable
    Tool: Bash
    Preconditions: Recommendation memo exists.
    Steps:
      1. Open `.sisyphus/notepads/fsd-recommendation.md`.
      2. Assert it contains exactly one primary recommendation from: `Do not adopt FSD now`, `Revisit after growth`, or `Prepare migration plan next`.
      3. Confirm the memo contains a supporting rationale section with repository references.
    Expected Result: The memo is decisive and evidence-backed.
    Failure Indicators: Multiple conflicting outcomes or no clear recommendation.
    Evidence: .sisyphus/evidence/task-8-final-recommendation.txt

  Scenario: Scope guardrail preserved in final memo
    Tool: Bash
    Preconditions: Recommendation memo exists.
    Steps:
      1. Read the memo end-to-end.
      2. Confirm it does not include refactor instructions, file-move steps, or code-change directives beyond a brief future-planning note.
    Expected Result: Final output stays evaluation-focused.
    Failure Indicators: Migration execution steps appear in the memo.
    Evidence: .sisyphus/evidence/task-8-scope-guardrail.txt
  ```

  **Commit**: NO

---

## Final Verification Wave (MANDATORY - after ALL implementation tasks)

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Read the plan end-to-end. Verify each deliverable exists in `.sisyphus/notepads/`. Confirm every major conclusion in the recommendation memo cites repository evidence. Reject if any "Must Have" is missing or any migration/refactor work was performed.
  Output: `Deliverables [N/N] | Evidence-backed conclusions [N/N] | Guardrails [PASS/FAIL] | VERDICT`

- [ ] F2. **Evidence Quality Review** - `unspecified-high`
  Review `.sisyphus/notepads/fsd-repo-inventory.md` and `.sisyphus/notepads/fsd-decision-matrix.md` for specificity. Reject vague claims without file paths, criteria, or trade-off reasoning. Check for unsupported blanket statements such as "FSD is better".
  Output: `Claims [N grounded/N total] | Vague findings [N] | Trade-offs [PASS/FAIL] | VERDICT`

- [ ] F3. **Notepad Artifact QA** - `unspecified-high`
  Open all generated notepads and verify formatting, headings, and recommendation outcome are complete. Confirm the decision memo includes at least one alternative to full FSD adoption.
  Output: `Artifacts [N/N readable] | Recommendation present [YES/NO] | Alternatives present [YES/NO] | VERDICT`

- [ ] F4. **Scope Fidelity Check** - `deep`
  Compare all generated artifacts against this plan. Ensure work stayed evaluation-only: no code changes, no folder moves, no migration execution. Flag any scope creep beyond analysis and recommendation.
  Output: `Tasks [N/N compliant] | Scope creep [NONE/N items] | Guardrail violations [NONE/N items] | VERDICT`

---

## Commit Strategy

- **Single commit optional**: `docs(architecture): add fsd evaluation artifacts`
- Files: `.sisyphus/notepads/fsd-repo-inventory.md`, `.sisyphus/notepads/fsd-decision-matrix.md`, `.sisyphus/notepads/fsd-recommendation.md`
- Pre-commit: none required beyond artifact verification

## Success Criteria

### Verification Commands
```bash
dir .sisyphus\notepads
```

Expected: the three FSD evaluation artifacts exist.

### Final Checklist
- [ ] All "Must Have" items are present
- [ ] All "Must NOT Have" items are absent
- [ ] Final recommendation is evidence-based and actionable
