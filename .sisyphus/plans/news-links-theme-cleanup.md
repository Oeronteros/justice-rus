# News Links and Theme Cleanup

## TL;DR

> **Quick Summary**: Fix News so inline URLs stay clickable while preserving the existing Discord CTA, remove the March 8 seasonal theme completely, and leave a short prioritized improvement backlog for technical and product follow-up.
>
> **Deliverables**:
> - Safe clickable inline links in News content/previews
> - Preserved `Open in Discord` CTA via `messageUrl`
> - Removed March 8 toggle, persistence, labels, and `.theme-march8` styles
> - Targeted Vitest coverage for News and Header regressions
> - Prioritized improvement recommendations
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 2 waves + final verification
> **Critical Path**: Task 1 -> Task 2 -> Task 6 -> Final Verification

---

## Context

### Original Request
1. Finish News so links display correctly.
2. Remove the March 8 theme.
3. Propose ideas for both technical improvements and user-facing features.

### Interview Summary
**Key Discussions**:
- News should keep the existing Discord CTA and also make inline links clickable.
- March 8 theme should be removed rather than merely hidden.
- Automated verification should follow a tests-after strategy.

**Research Findings**:
- `components/sections/news/index.tsx` currently normalizes inline URLs into readable text and only renders a separate anchor for `messageUrl`.
- `lib/schemas/news.ts` and `lib/server/read-models/news.ts` already carry optional `messageUrl` through the read path.
- `app/api/news/route.ts` likely drops `messageUrl` on POST, so link loss may also exist in the write path.
- March 8 theme is isolated to `components/shell/Header.tsx` and `.theme-march8` rules in `app/globals.css`.
- Vitest + Testing Library are present; no browser E2E framework is installed.

### Metis Review
**Identified Gaps** (addressed):
- Need explicit guardrail to preserve `Open in Discord` while adding inline linkification.
- Need exact acceptance criteria for punctuation trimming, multiple links, and `messageUrl` persistence.
- Need repo-wide verification that March 8 toggle state and CSS references are fully removed.

---

## Work Objectives

### Core Objective
Repair the News link experience end-to-end without redesigning the whole section, and remove the March 8 seasonal theme cleanly without disturbing the baseline wuxia styling.

### Concrete Deliverables
- News renderer supports clickable inline URLs in displayed content/previews.
- News POST flow preserves `messageUrl` when supplied.
- Existing `messageUrl` CTA remains visible and correct.
- Header no longer exposes March 8 UI or localStorage behavior.
- Seasonal CSS overrides are deleted with no leftover references.
- Improvement ideas are documented in the plan output for prioritization.

### Definition of Done
- [ ] News items containing inline URLs render anchors with correct `href` and readable text.
- [ ] News items with `messageUrl` still show `Open in Discord`.
- [ ] `POST /api/news` preserves `messageUrl` in stored/returned payloads.
- [ ] Repo search returns zero hits for `theme-march8` and `theme-march-8` after implementation.
- [ ] `npm test` passes.

### Must Have
- Preserve current News layout and CTA structure.
- Keep changes scoped to News link handling, March 8 cleanup, and related regression tests.
- Use safe React rendering; no unsafe HTML injection.

### Must NOT Have (Guardrails)
- No News section redesign or copy overhaul beyond what link display requires.
- No new theming framework or seasonal-theme abstraction.
- No Playwright/Cypress/CI installation in this task.
- No `dangerouslySetInnerHTML` unless separately justified and sanitized.

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — all verification must be agent-executed.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after
- **Framework**: Vitest + Testing Library

### QA Policy
- **Frontend/UI**: Vitest + Testing Library for component behavior
- **API/Backend**: Bash (`curl`) against local app or route-focused automated tests if present
- **Static cleanup**: repo-wide search for dead theme references
- **Evidence location**: `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves

> Maximize parallelism by separating API contract work, News rendering work, and theme removal work.

```
Wave 1 (Start Immediately - independent foundations):
├── Task 1: Preserve `messageUrl` through News write path [quick]
├── Task 2: Add safe inline link rendering in News content [unspecified-high]
├── Task 3: Preserve and polish Discord CTA behavior [quick]
├── Task 4: Remove March 8 toggle and persistence from Header [quick]
└── Task 5: Remove `.theme-march8` CSS overrides [quick]

Wave 2 (After Wave 1 - regression coverage and synthesis):
├── Task 6: Add News link regression tests [deep]
├── Task 7: Add Header/theme-removal regression tests [quick]
└── Task 8: Compile prioritized improvement backlog [writing]

Wave FINAL (After ALL tasks - independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real QA execution (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 -> Task 2 -> Task 6 -> F1-F4
Parallel Speedup: ~55% faster than sequential
Max Concurrent: 5
```

### Dependency Matrix

- **1**: None -> 6
- **2**: None -> 3, 6
- **3**: 2 -> 6
- **4**: None -> 7
- **5**: None -> 7
- **6**: 1, 2, 3 -> F1, F2, F3, F4
- **7**: 4, 5 -> F1, F2, F3, F4
- **8**: None -> F1, F4

### Agent Dispatch Summary

- **1**: **5** - T1 `quick`, T2 `unspecified-high`, T3 `quick`, T4 `quick`, T5 `quick`
- **2**: **3** - T6 `deep`, T7 `quick`, T8 `writing`
- **FINAL**: **4** - F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] 1. Preserve `messageUrl` through News write path

  **What to do**:
  - Update `app/api/news/route.ts` so POST accepts optional `messageUrl`, persists it into `news.message_url`, and returns it in the created payload.
  - Keep backward compatibility for requests that omit `messageUrl`.
  - Verify the returned object still matches the News schema.

  **Must NOT do**:
  - Do not require `messageUrl` for all News creation.
  - Do not change GET authorization or read-model fallback behavior.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Narrow API contract fix in one route file.
  - **Skills**: [`documentation-lookup`]
    - `documentation-lookup`: Useful if Next route handler response typing needs confirmation.
  - **Skills Evaluated but Omitted**:
    - `git-master`: Not needed because this is not a git-history task.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 4, 5)
  - **Blocks**: 6
  - **Blocked By**: None

  **References**:
  - `app/api/news/route.ts:40` - Current POST handler that parses body fields and inserts News rows.
  - `app/api/news/route.ts:66` - Current INSERT statement drops `messageUrl`; this is the main write-path bug.
  - `lib/schemas/news.ts:3` - Canonical News schema including optional `messageUrl`.
  - `lib/server/read-models/news.ts:22` - Read-model normalization already supports `message_url`/`messageUrl`; use it as the contract target.

  **Acceptance Criteria**:
  - [ ] POST accepts payloads with and without `messageUrl`.
  - [ ] Inserted row includes `message_url` when provided.
  - [ ] API response for created news includes `messageUrl` when provided.

  **QA Scenarios**:
  ```
  Scenario: POST preserves Discord URL
    Tool: Bash (curl)
    Preconditions: Local app running with auth token and database configured
    Steps:
      1. Send `POST /api/news` with JSON body including `title`, `content`, `author`, `pinned`, and `messageUrl:"https://discord.com/channels/1/2/3"`.
      2. Assert HTTP status is `201`.
      3. Assert JSON response contains `messageUrl` exactly equal to `https://discord.com/channels/1/2/3`.
    Expected Result: Created news item preserves the Discord URL in the response.
    Failure Indicators: `messageUrl` missing, `null`, empty string, or status not `201`.
    Evidence: .sisyphus/evidence/task-1-post-preserves-message-url.txt

  Scenario: POST remains backward compatible without messageUrl
    Tool: Bash (curl)
    Preconditions: Local app running with auth token and database configured
    Steps:
      1. Send `POST /api/news` without `messageUrl`.
      2. Assert HTTP status is `201`.
      3. Assert response contains the created item and either omits `messageUrl` or returns it undefined/null without error.
    Expected Result: Existing clients still create news successfully.
    Failure Indicators: `400` on valid payload or schema mismatch.
    Evidence: .sisyphus/evidence/task-1-post-without-message-url.txt
  ```

  **Commit**: NO

- [ ] 2. Add safe inline link rendering in News content

  **What to do**:
  - Replace the current string-only normalization path in `components/sections/news/index.tsx` with a safe rendering approach that keeps readable labels while producing clickable anchors.
  - Support multiple URLs in one news body and strip trailing punctuation from anchors.
  - Keep plain text rendering for non-link text and avoid unsafe HTML injection.

  **Must NOT do**:
  - Do not switch the whole News body to Markdown rendering.
  - Do not use `dangerouslySetInnerHTML`.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Non-trivial component rendering logic with parser edge cases.
  - **Skills**: [`react-ux-patterns`, `wcag-accessibility`]
    - `react-ux-patterns`: Helps structure mixed text/anchor rendering cleanly in React.
    - `wcag-accessibility`: Ensures anchors remain keyboard and screen-reader friendly.
  - **Skills Evaluated but Omitted**:
    - `frontend-design-system`: Visual redesign is out of scope.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 4, 5)
  - **Blocks**: 3, 6
  - **Blocked By**: None

  **References**:
  - `components/sections/news/index.tsx:20` - Existing URL regex and normalization entry points.
  - `components/sections/news/index.tsx:53` - `formatKnownNewsUrl()` currently converts URLs to readable labels only.
  - `components/sections/news/index.tsx:76` - `normalizeNewsLine()` currently returns strings, which is why links are not clickable.
  - `components/sections/news/index.tsx:259` - Featured preview currently renders plain text only.
  - `components/sections/news/index.tsx:319` - List preview currently renders plain text only.

  **Acceptance Criteria**:
  - [ ] Inline URLs render as anchors with valid `href`.
  - [ ] Known guide URLs still display readable labels instead of raw full URLs.
  - [ ] Multiple links in one item remain independently clickable.
  - [ ] No unsafe HTML rendering is introduced.

  **QA Scenarios**:
  ```
  Scenario: News body renders clickable external link
    Tool: Vitest
    Preconditions: Component test fixture includes content `Guide: https://example.com/path?a=1.`
    Steps:
      1. Render News section with a single item containing the inline URL.
      2. Query for a link with `href="https://example.com/path?a=1"`.
      3. Assert the trailing `.` is not part of the anchor href.
    Expected Result: One clickable anchor exists and preserves the correct URL.
    Failure Indicators: URL rendered as plain text only, punctuation included in href, or no anchor found.
    Evidence: .sisyphus/evidence/task-2-inline-link-render.txt

  Scenario: Multiple links remain separate
    Tool: Vitest
    Preconditions: Component test fixture includes two URLs in one news body
    Steps:
      1. Render the News section with both URLs in content.
      2. Query all anchors within the rendered preview/body.
      3. Assert there are exactly two anchors with the expected href values.
    Expected Result: Both links are independently clickable.
    Failure Indicators: Only one link found, merged text nodes, or incorrect hrefs.
    Evidence: .sisyphus/evidence/task-2-multiple-links.txt
  ```

  **Commit**: NO

- [ ] 3. Preserve and polish Discord CTA behavior

  **What to do**:
  - Ensure `Open in Discord` still appears whenever `messageUrl` exists after the inline link rendering refactor.
  - Keep existing external-link safety attributes and make sure CTA does not duplicate or conflict with inline links.
  - Adjust text wrapping or spacing only if needed to keep cards readable.

  **Must NOT do**:
  - Do not remove the CTA in favor of inline links only.
  - Do not redesign the News card layout.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Narrow behavior-preservation pass on an existing component.
  - **Skills**: [`wcag-accessibility`]
    - `wcag-accessibility`: Ensures CTA name, target behavior, and focusability remain intact.
  - **Skills Evaluated but Omitted**:
    - `visual-design-system`: This is behavior preservation, not a style refresh.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential after Task 2
  - **Blocks**: 6
  - **Blocked By**: 2

  **References**:
  - `components/sections/news/index.tsx:279` - Featured CTA conditional render.
  - `components/sections/news/index.tsx:339` - List CTA conditional render.
  - `app/globals.css:2259` - Existing `.news-discord-link` styling to preserve unless a tiny adjustment is required.

  **Acceptance Criteria**:
  - [ ] Featured and list cards still show `Open in Discord` when `messageUrl` exists.
  - [ ] CTA remains `target="_blank"` with `rel="noreferrer"` or stricter safe equivalent.
  - [ ] Cards without `messageUrl` do not show empty CTA chrome.

  **QA Scenarios**:
  ```
  Scenario: Discord CTA remains visible on linked news
    Tool: Vitest
    Preconditions: Render a News item with `messageUrl="https://discord.com/channels/1/2/3"`
    Steps:
      1. Render the News section.
      2. Query the `Open in Discord` link.
      3. Assert `href`, `target`, and `rel` are preserved.
    Expected Result: CTA still works exactly as before.
    Failure Indicators: CTA missing, wrong href, or lost safety attributes.
    Evidence: .sisyphus/evidence/task-3-discord-cta.txt

  Scenario: News without messageUrl has no CTA gap
    Tool: Vitest
    Preconditions: Render a News item without `messageUrl`
    Steps:
      1. Render the News section.
      2. Assert no `Open in Discord` link is present.
      3. Assert footer still renders author metadata cleanly.
    Expected Result: No broken CTA placeholder appears.
    Failure Indicators: Empty button shell, stray icon, or broken layout markers.
    Evidence: .sisyphus/evidence/task-3-no-cta-gap.txt
  ```

  **Commit**: NO

- [ ] 4. Remove March 8 toggle and persistence from Header

  **What to do**:
  - Delete the March 8 toggle state, localStorage read/write, and localized label entries from `components/shell/Header.tsx`.
  - Ensure Header accessibility tests continue to cover the remaining controls.
  - Leave the rest of the header/navigation behavior untouched.

  **Must NOT do**:
  - Do not change unrelated nav copy or header layout.
  - Do not leave dead variables or label keys behind.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small isolated cleanup in a single component.
  - **Skills**: [`wcag-accessibility`]
    - `wcag-accessibility`: Helps preserve accessible names for the remaining controls after button removal.
  - **Skills Evaluated but Omitted**:
    - `navigation-patterns`: No navigation redesign is required.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 5)
  - **Blocks**: 7
  - **Blocked By**: None

  **References**:
  - `components/shell/Header.tsx:42` - `marchThemeEnabled` state to remove.
  - `components/shell/Header.tsx:74` - localStorage hydration effect for March 8 toggle.
  - `components/shell/Header.tsx:86` - body class toggle and persisted key write.
  - `components/shell/Header.tsx:107` - localized RU label.
  - `components/shell/Header.tsx:128` - localized ZH label.
  - `components/shell/Header.tsx:148` - localized EN label.
  - `components/shell/Header.tsx:214` - March 8 button markup.

  **Acceptance Criteria**:
  - [ ] Header renders without any March 8 button/control.
  - [ ] Header no longer reads or writes `theme-march-8`.
  - [ ] Remaining refresh/logout/language controls still render and remain accessible.

  **QA Scenarios**:
  ```
  Scenario: Header no longer exposes March 8 control
    Tool: Vitest
    Preconditions: Render Header in English
    Steps:
      1. Render Header.
      2. Query for buttons named `March 8`, `8 Марта`, and `3月8日`.
      3. Assert none of them exist.
    Expected Result: Seasonal button is fully removed in all locales.
    Failure Indicators: Any seasonal button still appears.
    Evidence: .sisyphus/evidence/task-4-header-no-march-button.txt

  Scenario: Header keeps core controls after cleanup
    Tool: Vitest
    Preconditions: Render Header in English
    Steps:
      1. Render Header.
      2. Assert `Refresh data`, `Logout`, and `Interface language` controls exist.
    Expected Result: Core header controls remain intact.
    Failure Indicators: Cleanup accidentally removes or renames unrelated controls.
    Evidence: .sisyphus/evidence/task-4-header-core-controls.txt
  ```

  **Commit**: NO

- [ ] 5. Remove `.theme-march8` CSS overrides

  **What to do**:
  - Delete the `.theme-wuxia.theme-march8` rules and related seasonal overrides from `app/globals.css`.
  - Keep shared `.theme-wuxia` and `.dc-season-badge` baseline styles only if still used elsewhere; otherwise remove dead seasonal-only styling safely.
  - Verify no leftover selectors reference the removed theme class.

  **Must NOT do**:
  - Do not modify baseline wuxia variables outside seasonal override removal.
  - Do not remove shared header/card styling that applies to the normal theme.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Isolated stylesheet cleanup.
  - **Skills**: [`visual-design-system`]
    - `visual-design-system`: Helps distinguish shared tokens from seasonal-only overrides.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: No new design work is requested.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: 7
  - **Blocked By**: None

  **References**:
  - `app/globals.css:36` - Entry point for `.theme-wuxia.theme-march8` variable overrides.
  - `app/globals.css:56` - Header-specific March 8 override.
  - `app/globals.css:63` - Card/hero March 8 override.
  - `app/globals.css:81` - Seasonal badge override.
  - `components/shell/Header.tsx:217` - Seasonal badge class usage; remove or retain related base style based on post-cleanup usage.

  **Acceptance Criteria**:
  - [ ] `.theme-march8` selectors are removed from stylesheet.
  - [ ] Shared wuxia theme variables remain unchanged for the normal theme.
  - [ ] No dead seasonal selector remains referenced from components.

  **QA Scenarios**:
  ```
  Scenario: Repo has zero March 8 CSS selectors
    Tool: Bash
    Preconditions: Implementation changes are applied
    Steps:
      1. Search the repo for `theme-march8`.
      2. Search the repo for `theme-march-8`.
      3. Assert both searches return zero matches in source files.
    Expected Result: All seasonal selectors and storage-key references are removed.
    Failure Indicators: Any remaining selector, key, or dead comment reference.
    Evidence: .sisyphus/evidence/task-5-no-march-selectors.txt

  Scenario: Baseline theme rules remain present
    Tool: Bash
    Preconditions: Implementation changes are applied
    Steps:
      1. Search `app/globals.css` for `.theme-wuxia .dc-text` and `.theme-wuxia .dc-muted`.
      2. Assert both shared rules still exist.
    Expected Result: Only seasonal overrides are removed.
    Failure Indicators: Normal theme rules accidentally deleted.
    Evidence: .sisyphus/evidence/task-5-baseline-theme-still-there.txt
  ```

  **Commit**: NO

- [ ] 6. Add News link regression tests

  **What to do**:
  - Add or extend component/unit tests covering inline link rendering, multiple links, punctuation trimming, guide-label formatting, and Discord CTA coexistence.
  - Prefer colocated test patterns already used in `tests/components`.
  - Cover both featured and list-card cases if rendering differs.

  **Must NOT do**:
  - Do not add browser E2E tooling.
  - Do not leave link behavior only manually verified.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Multiple behavior assertions and parser edge cases need careful test design.
  - **Skills**: [`form-patterns`]
    - `form-patterns`: Omitted for direct overlap, but careful interaction/assertion structure is still useful from existing Testing Library conventions.
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not installed and explicitly out of scope.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (with Task 7 after Wave 1)
  - **Blocks**: F1, F2, F3, F4
  - **Blocked By**: 1, 2, 3

  **References**:
  - `tests/components/Header.test.tsx:17` - Existing component test style with Testing Library and mocked `next/link`.
  - `tests/components/ProfileSection.test.tsx:62` - Example of concise component assertions and mocking patterns.
  - `vitest.config.ts:7` - Test environment and setup configuration.
  - `components/sections/news/index.tsx:164` - Main component entry point to exercise via tests.

  **Acceptance Criteria**:
  - [ ] Tests verify inline anchor rendering from content.
  - [ ] Tests verify guide URLs use readable labels.
  - [ ] Tests verify Discord CTA still appears when `messageUrl` exists.
  - [ ] New tests pass under `npm test`.

  **QA Scenarios**:
  ```
  Scenario: Focused News tests pass
    Tool: Bash
    Preconditions: News tests have been added
    Steps:
      1. Run the targeted Vitest command for News-related tests.
      2. Assert exit code `0`.
      3. Capture the pass summary.
    Expected Result: All News link regression tests pass.
    Failure Indicators: Any failing assertion around href, label, or CTA coexistence.
    Evidence: .sisyphus/evidence/task-6-news-tests.txt

  Scenario: Full test suite remains green
    Tool: Bash
    Preconditions: Wave 2 changes are complete
    Steps:
      1. Run `npm test`.
      2. Assert exit code `0`.
    Expected Result: New coverage does not break the existing test suite.
    Failure Indicators: Regressions in unrelated tests or setup failures.
    Evidence: .sisyphus/evidence/task-6-full-test-suite.txt
  ```

  **Commit**: NO

- [ ] 7. Add Header/theme-removal regression tests

  **What to do**:
  - Extend `tests/components/Header.test.tsx` or add a focused sibling test to lock removal of the seasonal toggle and persistence behavior.
  - Assert the remaining header controls still exist after cleanup.
  - Include a negative check for the old localStorage key behavior if the test harness allows spying.

  **Must NOT do**:
  - Do not couple these assertions to unrelated navigation behavior beyond current coverage.
  - Do not reintroduce theme state just to test it.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small additive regression coverage around one component.
  - **Skills**: [`wcag-accessibility`]
    - `wcag-accessibility`: Ensures the cleanup preserves discernible names for remaining controls.
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not installed and out of scope.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8)
  - **Blocks**: F1, F2, F3, F4
  - **Blocked By**: 4, 5

  **References**:
  - `tests/components/Header.test.tsx:17` - Existing Header accessibility coverage to extend instead of replacing.
  - `components/shell/Header.tsx:74` - Old persistence logic that should no longer exist after cleanup.
  - `components/shell/Header.tsx:214` - Old seasonal button location to guard against reintroduction.

  **Acceptance Criteria**:
  - [ ] Header tests assert March 8 button is absent.
  - [ ] Header tests still assert refresh/logout/language controls exist.
  - [ ] If spying is practical, tests assert no `theme-march-8` localStorage interactions occur.

  **QA Scenarios**:
  ```
  Scenario: Header cleanup tests pass
    Tool: Bash
    Preconditions: Header regression tests updated
    Steps:
      1. Run targeted Header Vitest command.
      2. Assert exit code `0`.
      3. Capture pass summary.
    Expected Result: Header cleanup is covered and passing.
    Failure Indicators: Seasonal button still found or core controls missing.
    Evidence: .sisyphus/evidence/task-7-header-tests.txt

  Scenario: No March 8 localStorage usage remains in component code
    Tool: Bash
    Preconditions: Cleanup complete
    Steps:
      1. Search `components/shell/Header.tsx` for `theme-march-8`.
      2. Assert zero matches.
    Expected Result: Persistence key is fully removed.
    Failure Indicators: Any remaining string match.
    Evidence: .sisyphus/evidence/task-7-no-localstorage-key.txt
  ```

  **Commit**: NO

- [ ] 8. Compile prioritized improvement backlog

  **What to do**:
  - Produce a concise recommendations note covering technical debt and user-facing enhancements discovered during this work.
  - Prioritize items by impact vs effort and keep them explicitly non-blocking for this fix.
  - Reference the concrete hotspots uncovered in News/API/theme work.

  **Must NOT do**:
  - Do not expand this into implementation of the suggested features.
  - Do not bury mandatory bug-fix work under speculative ideas.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: This is synthesis and prioritization, not code.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: Recommendations are repo-specific, not doc-driven.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7)
  - **Blocks**: F1, F4
  - **Blocked By**: None

  **References**:
  - `components/sections/news/index.tsx:53` - Parsing logic hotspot worth extracting later.
  - `app/api/news/route.ts:66` - Contract drift shows need for route-level regression coverage.
  - `package.json:6` - Existing scripts show CI is low-hanging fruit for future automation.

  **Acceptance Criteria**:
  - [ ] Recommendations are split into technical and product sections.
  - [ ] Each recommendation includes a short impact/effort rationale.
  - [ ] Recommendations are clearly marked as follow-up, not required for this bug-fix scope.

  **QA Scenarios**:
  ```
  Scenario: Improvement backlog is actionable
    Tool: Bash
    Preconditions: Recommendation note or section is written
    Steps:
      1. Read the generated recommendation output.
      2. Assert it contains at least two technical and two product items.
      3. Assert each item includes a priority or impact cue.
    Expected Result: Backlog is concise and actionable.
    Failure Indicators: Vague ideas without prioritization or no separation by category.
    Evidence: .sisyphus/evidence/task-8-improvement-backlog.txt

  Scenario: Recommendations stay out of implementation scope
    Tool: Bash
    Preconditions: All work complete
    Steps:
      1. Compare changed files against the bug-fix scope.
      2. Assert no extra feature implementation files were added solely for backlog ideas.
    Expected Result: Recommendations remain advisory only.
    Failure Indicators: Unplanned feature work appears in the diff.
    Evidence: .sisyphus/evidence/task-8-no-scope-creep.txt
  ```

  **Commit**: NO

---

## Improvement Backlog

### Technical Improvements
- Add route-level tests for `app/api/news/route.ts` to prevent future `messageUrl` regressions.
- Introduce a shared text/link normalization utility so News parsing logic is not trapped inside one component.
- Add a lightweight CI workflow to run `npm test`, `npm run type-check`, and lint on PRs.
- Consider a database/schema verification check for optional content fields like `message_url` during startup or migration scripts.

### Product / UX Ideas
- Show source badges for links (`Discord`, `Guide`, external domain) inside News cards.
- Add copy-link/share actions on each news card.
- Support richer announcement formatting such as bullet extraction, link preview chips, or pinned-news highlights.
- Add admin-side validation/hints when composing a News post with malformed links.

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Verify every planned News, API, test, and theme-cleanup deliverable exists; reject if any March 8 references or missing link behaviors remain.

- [ ] F2. **Code Quality Review** - `unspecified-high`
  Run `npm test` and review changed files for unsafe HTML rendering, dead code, stale theme constants, and accidental UI creep.

- [ ] F3. **Real QA Execution** - `unspecified-high`
  Execute the task QA scenarios end-to-end, including inline links, Discord CTA, POST preservation, and theme-removal checks.

- [ ] F4. **Scope Fidelity Check** - `deep`
  Confirm implementation stayed within News link handling, March 8 removal, test coverage, and backlog documentation only.

---

## Commit Strategy

- **1**: `fix(news): preserve links and remove march theme` - News/UI/API/test files, `npm test`

---

## Success Criteria

### Verification Commands
```bash
npm test
```

### Final Checklist
- [ ] All Must Have items are present
- [ ] All Must NOT Have items are absent
- [ ] News inline links are clickable and safe
- [ ] `Open in Discord` still works when `messageUrl` exists
- [ ] March 8 toggle, persistence key, and CSS references are gone
