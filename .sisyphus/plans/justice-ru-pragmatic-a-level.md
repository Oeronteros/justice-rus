# Justice RU Pragmatic A-Level

## TL;DR

> **Quick Summary**: Raise the current Next.js 16 + TypeScript portal from a solid `B` baseline to pragmatic `A-level` by standardizing route boundaries, adding high-value E2E coverage, hardening security defaults, making accessibility measurable, finishing shared i18n coverage, and tightening CI-quality gates without rewriting the existing website -> bot API -> DB architecture.
>
> **Deliverables**:
> - Shared server-side route wrappers for auth, role checks, validation, and error mapping
> - Browser-level coverage for auth and protected flows
> - Stronger security defaults and explicit trust-boundary validation
> - Automated accessibility checks plus key keyboard/focus fixes
> - Removal of high-impact hardcoded shared UI strings from common surfaces
> - Clear cache/performance strategy and enforced quality gates
>
> **Estimated Effort**: XL
> **Parallel Execution**: YES - 3 implementation waves + final verification
> **Critical Path**: Task 1 -> Task 2 -> Task 3 -> Task 4 -> Task 7

---

## Context

### Original Request
Assess the repository against architecture and engineering quality dimensions, then create a repo-specific work plan to reach pragmatic A-level quality.

### Interview Summary
**Key Discussions**:
- The target is `Pragmatic A-level`, not strict enterprise-only A-level.
- The user wants both a saved canonical plan and a chat summary.
- The current runtime model should remain the documented proxy architecture, not a rewrite into a new backend shape.

**Research Findings**:
- `ARCHITECTURE.md:5` documents a clear `Website -> Discord Bot API -> DB` boundary.
- `tsconfig.json:7` uses strict TypeScript, and the repo already relies on Zod contracts in `lib/schemas/auth.ts:3` and `lib/schemas/guide.ts:47`.
- `lib/api/client.ts:18` centralizes client transport and optional schema parsing, while `lib/authz.ts:3` provides focused RBAC helpers.
- `app/api/auth/route.ts:101` is functional but mixes many concerns in one route.
- `lib/server/db-cache.ts:3` provides useful process-local coalescing/TTL cache primitives, but it is not a cross-instance cache strategy.
- `vitest.config.ts:7` and tests like `tests/components/ErrorBoundary.test.tsx:37` show a real unit/property-test foundation.
- Key gaps are lack of E2E coverage, inconsistent route-boundary hardening, partial a11y automation, incomplete shared i18n coverage, and incomplete security headers.

### Metis Review
**Identified Gaps** (addressed):
- Formal Metis consultation timed out; equivalent gap review is handled here explicitly.
- Start-work compatibility risk is reduced by using a canonical Prometheus plan structure with concrete TODOs and executor-friendly tasks.
- Model fragility risk is reduced by avoiding optional oracle-only review tasks in the critical path; the plan is executable with standard task categories.

---

## Work Objectives

### Core Objective
Improve the repository where the risk and leverage are highest: route boundaries, trust boundaries, user-critical flow coverage, accessibility enforcement, shared UX/i18n consistency, and repeatable quality gates.

### Concrete Deliverables
- Shared route helpers for auth, role checks, schema parsing, and standardized API failures
- Refactored high-risk routes to use shared route primitives
- Playwright coverage for auth, protected navigation, logout, and one representative role-gated flow
- Stronger security header set and explicit validation/sanitization audit for external or rich-content boundaries
- Automated accessibility checks for core shell/forms and fixes for keyboard/focus regressions
- Translation-driven shared UI for common error/empty/fallback surfaces
- CI/local verification path that enforces lint, typecheck, unit tests, targeted E2E, and build

### Definition of Done
- [x] Shared route helpers are the default pattern for high-risk routes
- [x] `npm run lint` exits `0`
- [x] `npm run type-check` exits `0`
- [x] `npm run test` exits `0`
- [x] `npm run build` exits `0`
- [x] Browser E2E covers login, logout, protected navigation, and one role-gated path
- [x] Shared UI no longer ships hardcoded fallback/error text where i18n already exists
- [x] Security defaults are documented and applied consistently across sensitive routes

### Must Have
- Preserve the current App Router + bot-proxy architecture
- Improve structure by composition and shared helpers, not broad rewrites
- Add automated confidence where the current risk is highest
- Keep the resulting codebase easier to reason about than before
- Use existing stack choices where possible: Next.js, TypeScript, Zod, Vitest

### Must NOT Have (Guardrails)
- No architecture rewrite away from the current website -> bot API -> DB model
- No unrelated feature delivery or cosmetic redesign work
- No generic abstraction layer without at least one concrete high-risk use site
- No weakening of current auth semantics to make refactors easier
- No cache/platform complexity unless justified by an actual hot path or deployment constraint

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Vitest exists now; Playwright to be added in-scope
- **Frameworks**: Vitest, Testing Library, Playwright, Next.js build/typecheck/lint
- **Reasoning**: The requested uplift is repo-wide quality work; completion is not credible without executable verification.

### QA Policy
Every task must end with concrete verification evidence.

- **Route/helper work**: unit tests plus route-focused regression coverage where possible
- **Security work**: config inspection, route tests, and build verification
- **A11y work**: automated a11y checks and keyboard/focus validation in browser tests where relevant
- **i18n work**: tests or assertions for translation-backed shared UI plus multilingual spot verification
- **Evidence location**: `.sisyphus/evidence/task-{N}-{scenario-slug}.txt`

---

## Execution Strategy

### Parallel Execution Waves

```text
Wave 1 (Start Immediately - foundations and highest leverage):
├── Task 1: Create shared route-boundary primitives [unspecified-high]
├── Task 2: Refactor highest-risk routes onto shared primitives [unspecified-high]
├── Task 3: Harden security headers and route trust boundaries [unspecified-high]
└── Task 4: Remove shared hardcoded UI strings and align i18n surfaces [quick]

Wave 2 (After Wave 1 - confidence and usability):
├── Task 5: Add Playwright auth/protected-flow coverage [unspecified-high]
├── Task 6: Add automated accessibility checks and keyboard/focus fixes [unspecified-high]
└── Task 7: Improve proxy-boundary validation and rich-content safety [unspecified-high]

Wave 3 (After Wave 2 - sustainability and observability):
├── Task 8: Clarify cache/performance strategy and add lightweight performance checks [unspecified-high]
└── Task 9: Tighten CI and contributor quality gates [quick]

Wave FINAL (After all tasks - independent review and replay):
├── Task F1: Plan compliance audit [unspecified-high]
├── Task F2: Verification replay across lint/typecheck/test/build/E2E [unspecified-high]
└── Task F3: Scope fidelity and regression check [deep]

Critical Path: Task 1 -> Task 2 -> Task 3 -> Task 5 -> Task 9
Parallel Speedup: High
Max Concurrent: 4
```

### Dependency Matrix

- **1**: None -> 2, 5, 7, 9
- **2**: 1 -> 3, 5, 7
- **3**: 2 -> 9
- **4**: None -> 9
- **5**: 1, 2 -> F1, F2, F3
- **6**: 4 -> F1, F2, F3
- **7**: 1, 2 -> F1, F2, F3
- **8**: None -> F1, F2, F3
- **9**: 3, 4, 5, 6, 7 -> F1, F2, F3

### Agent Dispatch Summary

- **Wave 1**: **4** - T1/T2/T3 -> `unspecified-high`, T4 -> `quick`
- **Wave 2**: **3** - T5/T6/T7 -> `unspecified-high`
- **Wave 3**: **2** - T8 -> `unspecified-high`, T9 -> `quick`
- **FINAL**: **3** - F1/F2 -> `unspecified-high`, F3 -> `deep`

---

## Current Grades

| Area | Grade |
| --- | --- |
| Architecture | B+ |
| Folder structure | B |
| SOLID | B |
| Design patterns | B+ |
| Type safety + runtime validation | B+ |
| Error handling | B- |
| Performance | B- |
| Testing | B |
| Accessibility | B- |
| Code quality + DRY | B |
| Security | B- |
| Developer experience | B |
| i18n | B- |

Overall: `B`

---

## TODOs

- [x] 1. Create shared route-boundary primitives

  **What to do**:
  - Inspect existing API routes and identify repeated auth, role, origin, validation, and error-response logic.
  - Introduce reusable server helpers for schema parsing, standardized error responses, and auth/role enforcement.
  - Keep the helpers concrete enough to serve current routes rather than inventing a generic framework.

  **Must NOT do**:
  - Do not rewrite all routes at once.
  - Do not change current auth token semantics or user-visible success/error meaning without strong reason.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: multi-file refactor with design constraints and no appetite for architectural churn.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful if route-handler specifics or Next.js server-boundary details need confirmation.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 2, 5, 7, 9
  - **Blocked By**: None

  **References**:
  - `app/api/auth/route.ts:101`
  - `lib/api/client.ts:18`
  - `lib/authz.ts:3`

- [x] 2. Refactor highest-risk routes onto shared primitives

  **What to do**:
  - Apply the new route primitives to the highest-risk auth/mutation or privileged routes first.
  - Reduce duplicated auth/origin/error boilerplate and make route boundaries visibly consistent.
  - Add or update regression tests for extracted behavior.

  **Must NOT do**:
  - Do not expand this into a repo-wide route rewrite in one pass.
  - Do not silently change role requirements.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`documentation-lookup`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1
  - **Blocks**: 3, 5, 7
  - **Blocked By**: 1

  **References**:
  - `app/api/auth/route.ts:101`
  - `app/api/`

- [x] 3. Harden security headers and route trust boundaries

  **What to do**:
  - Expand security headers in `next.config.ts` to include missing hardened defaults where deployment permits.
  - Audit sensitive routes for consistent origin/auth enforcement.
  - Review legacy PIN auth posture and document whether it remains temporary or constrained.

  **Must NOT do**:
  - Do not add deployment-specific settings that break local development without guardrails.
  - Do not remove compatibility behavior unless tests and docs are updated.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`documentation-lookup`]

  **Parallelization**:
  - **Can Run In Parallel**: PARTIAL
  - **Parallel Group**: Wave 1
  - **Blocks**: 9
  - **Blocked By**: 2

  **References**:
  - `next.config.ts:24`
  - `app/api/auth/route.ts:106`
  - `app/api/auth/route.ts:201`

- [x] 4. Remove shared hardcoded UI strings and align i18n surfaces

  **What to do**:
  - Replace shared hardcoded user-facing strings with translation-backed equivalents.
  - Start with fallback/error/empty/common shell surfaces that affect multiple pages.
  - Add lightweight regression protection where feasible.

  **Must NOT do**:
  - Do not rewrite all copy in the application.
  - Do not introduce a second i18n pattern.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`documentation-lookup`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 6, 9
  - **Blocked By**: None

  **References**:
  - `components/shared/ErrorBoundary.tsx:21`
  - `lib/i18n/index.ts:2`
  - `components/shell/Header.tsx:206`

- [x] 5. Add Playwright auth and protected-flow coverage

  **What to do**:
  - Add browser E2E infrastructure.
  - Cover login, failed login, logout, protected navigation, and one representative role-gated flow.
  - Keep the suite focused on high-risk flows rather than broad UI snapshotting.

  **Must NOT do**:
  - Do not attempt full-product browser coverage in this plan.
  - Do not couple tests tightly to unstable markup when role or behavior assertions are enough.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`, `documentation-lookup`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 9, F1, F2, F3
  - **Blocked By**: 1, 2

  **References**:
  - `vitest.config.ts:7`
  - `app/api/auth/route.ts:101`

- [ ] 6. Add automated accessibility checks and keyboard/focus fixes

  **What to do**:
  - Add automated a11y checks for key shared surfaces.
  - Add skip navigation if absent and validate keyboard-first traversal.
  - Fix focus behavior for overlays/dialog-like flows that currently lack measurable guarantees.

  **Must NOT do**:
  - Do not turn this into a visual redesign.
  - Do not add ARIA where semantic HTML already solves the problem cleanly.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`wcag-accessibility`, `playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 9, F1, F2, F3
  - **Blocked By**: 4

  **References**:
  - `components/shell/Header.tsx:243`
  - `components/shared/ErrorBoundary.tsx:11`

- [ ] 7. Improve proxy-boundary validation and rich-content safety

  **What to do**:
  - Ensure request and response validation is explicit where external or bot-provided data enters the app.
  - Review markdown/rich-content rendering and sanitize if the current path can emit unsafe HTML.
  - Add tests for invalid payload handling.

  **Must NOT do**:
  - Do not add heavy infrastructure if targeted schema enforcement solves the actual issue.
  - Do not broaden this into a full content-platform rewrite.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`documentation-lookup`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 9, F1, F2, F3
  - **Blocked By**: 1, 2

  **References**:
  - `lib/api/client.ts:46`
  - `lib/schemas/guide.ts:47`

- [ ] 8. Clarify cache/performance strategy and add lightweight performance checks

  **What to do**:
  - Document where process-local caching is acceptable and where it is insufficient.
  - Add lightweight performance visibility such as bundle or page-level checks.
  - Only introduce stronger cache machinery if a real hot path justifies it.

  **Must NOT do**:
  - Do not add Redis or equivalent by default without clear need.
  - Do not spend this task on premature micro-optimizations.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`documentation-lookup`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: F1, F2, F3
  - **Blocked By**: None

  **References**:
  - `lib/server/db-cache.ts:3`
  - `next.config.ts:7`

- [x] 9. Tighten CI and contributor quality gates

  **What to do**:
  - Make lint, typecheck, unit tests, targeted E2E, and build part of the default validation path.
  - Add minimal contributor guidance tied to the new route/testing/a11y patterns.
  - Keep the quality gate strict enough to hold the line without making routine work miserable.

  **Must NOT do**:
  - Do not add process overhead disconnected from actual failure modes.
  - Do not create duplicate scripts or duplicate docs for the same workflow.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`documentation-lookup`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3
  - **Blocks**: F1, F2, F3
  - **Blocked By**: 3, 4, 5, 6, 7

  **References**:
  - `package.json:6`
  - `vitest.config.ts:7`

---

## Final Verification Tasks

- [ ] F1. Plan compliance audit

  **What to do**:
  - Compare all implementation diffs against this plan.
  - Reject work that drifted into redesign, unrelated features, or unverified cleanup.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`

- [ ] F2. Verification replay across quality gates

  **What to do**:
  - Re-run lint, typecheck, unit tests, E2E tests, and build from the final worktree state.
  - Save evidence files for each major verification command.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`

- [ ] F3. Scope fidelity and regression check

  **What to do**:
  - Confirm the repository improved against the targeted grades without hidden regressions.
  - Flag any remaining B-/C-level pockets that should become follow-up work rather than sneaking into this plan late.

  **Recommended Agent Profile**:
  - **Category**: `deep`

---

## First Slice Recommendation

If execution starts immediately, begin with this smallest high-leverage slice:

1. Task 1 - shared route-boundary primitives
2. Task 2 - refactor highest-risk routes onto those primitives
3. Task 4 - shared i18n cleanup for error/fallback surfaces
4. Task 5 - Playwright auth and protected-flow coverage

That slice improves Architecture, SOLID, DRY, Security, Testing, Accessibility, and i18n at the same time.
