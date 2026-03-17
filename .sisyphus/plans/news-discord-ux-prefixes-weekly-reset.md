# News Publishing, Discord Delivery, UX Refresh, Prefixes, Weekly Reset

## TL;DR

> **Quick Summary**: Expand the existing portal into a proper publishing surface: officers write news on-site, the site stores and validates the article, then `DiscordBot2` publishes a Discord-safe announcement through a secured bot API while the site gets a sharper modern UX and users get cosmetic prefixes.
>
> **Deliverables**:
> - Protected site news composer + publish flow
> - Secured bot endpoint for Discord announcement delivery
> - Discord-adaptive formatter with idempotent delivery behavior
> - Modernized UX pass centered on news/profile/admin publishing surfaces
> - Cosmetic prefix/title system on portal profiles and visible UI surfaces
> - Weekly Monday 07:00 `Europe/Moscow` reset for weekly counters
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves + final verification
> **Critical Path**: 1 -> 2 -> 6 -> 7 -> 11 -> 14 -> F1-F4

---

## Context

### Original Request
- Add the ability to write news in the site news section and also send it to Discord through the bot in `D:\Desktop\DiscordBot2`.
- Make the website UX feel new, modern, and high-end, with explicit frontend design/UX execution quality.
- Add title/prefix functionality similar to examples like `Чертила`, `VIP`, `Boobs`.
- Reset weekly stats `Bounty`, `Outer Heroic`, `Inner Heroic`, `Crimson Sands`, `Abyss`, `GVG`, `Secret Realm` every Monday at 07:00 Moscow time.

### Interview Summary
**Key Discussions**:
- News publication flow is fixed as: protected site editor + secured bot API for Discord delivery.
- Automated tests should be added after implementation, using existing `vitest` + `playwright` infrastructure.
- Prefixes are treated as cosmetic/display-only, not a permission system.
- Weekly reset stays reset-only; archival/history is out of scope unless already trivial.

**Research Findings**:
- `justice-ru` already has `app/api/news/route.ts`, `lib/server/read-models/news.ts`, and `components/sections/news/index.tsx`, but no dedicated authoring UI.
- `justice-ru` has profile/admin management in `components/sections/profile/index.tsx` and account APIs in `app/api/admin/accounts/route.ts`.
- `DiscordBot2` already has FastAPI in `api_server.py`, scheduler logic in `cogs/tasks.py`, guild channel targeting in `cogs/guild_settings.py`, and news syncing in `cogs/news_sync.py`.
- Existing bot task scheduling already includes weekly reset semantics with catch-up behavior, making the bot the correct home for the new Monday reset logic.

### Metis Review
**Identified Gaps** (addressed in this plan):
- Lock down the site<->bot integration as a single versioned API contract instead of ad-hoc DB coupling.
- Explicitly require authentication, replay protection, and idempotency on publish calls.
- Limit UX redesign scope so it upgrades publishing/profile surfaces without turning into a full unrelated redesign.
- Define Discord failure handling, mention sanitization, and duplicate-publish behavior.
- Require timezone-accurate weekly reset verification with catch-up behavior after downtime.

### Oracle Guidance Applied
- Site owns news content and publish intent; bot owns Discord delivery behavior, queueing, delivery status, and scheduled reset execution.
- Weekly reset belongs in `DiscordBot2`, not the Next.js app, because scheduling already lives there.
- Delivery must be idempotent and expose deterministic status back to the site.

---

## Work Objectives

### Core Objective
Turn the portal into the authoritative editorial surface for guild news while keeping Discord-specific delivery and weekly automation in the bot, then wrap the new workflows in a cleaner, more premium UX.

### Concrete Deliverables
- Protected news authoring/publishing UI inside `justice-ru`
- Site-side publish contract, persistence updates, and delivery status handling
- Bot-side authenticated announcement endpoint with Discord-safe formatting and dedupe
- Prefix catalog + selected prefix support in portal account/profile display
- Weekly reset logic for the requested counters in bot scheduling/database code
- Unit/API/E2E coverage across site and bot repos for publish flow, prefixes, and reset behavior

### Definition of Done
- [ ] Officer-level user can create a news post on the site, publish it, and see successful Discord delivery metadata reflected in the site.
- [ ] Duplicate submit of the same news item does not create duplicate Discord announcements.
- [ ] Prefixes render in the intended portal UI surfaces without affecting authorization.
- [ ] Weekly counters reset once at Monday 07:00 `Europe/Moscow`, with catch-up protection after downtime.
- [ ] `justice-ru` passes targeted unit/E2E coverage plus standard validation commands.
- [ ] `DiscordBot2` passes targeted API/database tests covering publish and reset behavior.

### Must Have
- One secure, versioned site->bot publish API
- Discord-safe formatting with explicit length/mention guardrails
- Monday 07:00 Moscow weekly reset in bot scheduler
- High-quality publishing/profile UX polish using `frontend-design` and `frontend-ui-ux`
- Cosmetic-only prefixes with no RBAC side effects

### Must NOT Have (Guardrails)
- No direct DB-sharing shortcut for the new publish trigger
- No webhook-only bypass as the primary publish path
- No redesign of unrelated portal areas beyond necessary shell/style consistency
- No new permission model attached to prefixes
- No history/archive feature for weekly reset in this scope
- No secrets or admin secret-management UI added to the site
- No post-publish message edit/sync feature unless it is already trivial inside the chosen implementation path

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — all verification is executable by agents.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after
- **Framework**: `vitest` + `playwright` in `justice-ru`; existing Python test suite in `DiscordBot2`
- **If tests-after**: implement first, then add/adjust tests before the verification wave

### QA Policy
Every task below includes agent-executed QA scenarios and evidence capture under `.sisyphus/evidence/`.

- **Frontend/UI**: Playwright against `justice-ru`
- **API/Backend (site)**: `curl`/HTTP assertions against Next route handlers or local dev server
- **API/Backend (bot)**: targeted Python tests and `curl` against FastAPI
- **Scheduler logic**: automated tests with frozen/mock time where possible, plus direct invocation/verification of guard state

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately - contract, foundation, schema):
- Task 1: Site publish contract and persistence boundary
- Task 2: Bot publish endpoint/auth/idempotency foundation
- Task 3: UX direction + shared visual foundations for publishing/profile surfaces
- Task 4: Prefix data model and display contract
- Task 5: Weekly reset data-path audit and counter expansion in bot DB layer

Wave 2 (After Wave 1 - core implementation, max parallel):
- Task 6: Site news composer and publish workflow UI
- Task 7: Bot Discord formatter and delivery orchestration
- Task 8: Weekly reset scheduler implementation in `DiscordBot2`
- Task 9: Prefix management UI and portal rendering
- Task 10: Focused portal UX redesign for news/profile/admin publishing surfaces

Wave 3 (After Wave 2 - integration and hardening):
- Task 11: Cross-repo publish status wiring and failure handling
- Task 12: Site automated tests for news UX, prefixes, and publish behavior
- Task 13: Bot automated tests for publish endpoint, formatter, and reset logic

Wave 4 (After Wave 3 - integration QA and cleanup):
- Task 14: End-to-end publish + Discord delivery verification path
- Task 15: Final UX polish pass and responsive/accessibility cleanup

Wave FINAL (After ALL tasks - independent review, 4 parallel):
- F1: Plan compliance audit
- F2: Code quality review
- F3: Real QA execution
- F4: Scope fidelity check

Critical Path: 1 -> 2 -> 6 -> 7 -> 11 -> 14 -> F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5

### Dependency Matrix

- **1**: — -> 6, 11
- **2**: — -> 7, 11, 13, 14
- **3**: — -> 6, 9, 10, 15
- **4**: — -> 9, 12
- **5**: — -> 8, 13
- **6**: 1, 3 -> 11, 12, 14, 15
- **7**: 2 -> 11, 13, 14
- **8**: 5 -> 13, 14
- **9**: 3, 4 -> 12, 15
- **10**: 3 -> 12, 14, 15
- **11**: 1, 2, 6, 7 -> 14
- **12**: 4, 6, 9, 10 -> 14, 15
- **13**: 2, 5, 7, 8 -> 14
- **14**: 2, 6, 7, 8, 10, 11, 12, 13 -> F1-F4
- **15**: 3, 6, 9, 10, 12 -> F1-F4

### Agent Dispatch Summary

- **Wave 1**: T1 `quick`, T2 `unspecified-high`, T3 `visual-engineering`, T4 `quick`, T5 `unspecified-high`
- **Wave 2**: T6 `visual-engineering`, T7 `unspecified-high`, T8 `unspecified-high`, T9 `visual-engineering`, T10 `visual-engineering`
- **Wave 3**: T11 `deep`, T12 `quick`, T13 `quick`
- **Wave 4**: T14 `deep`, T15 `visual-engineering`
- **FINAL**: F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] 1. Define site-side publish contract and persistence updates

  **What to do**:
  - Extend the site news write path so one news item has a stable publish identity, Discord delivery metadata, and a contract payload for bot delivery.
  - Keep the site as source of truth for article content and publish intent; do not move publishing state ownership into the bot database.
  - Reuse existing news API/read-model patterns where possible, adding only fields needed for delivery status/idempotency.

  **Must NOT do**:
  - Do not trigger Discord delivery directly from the UI.
  - Do not bypass the existing site backend with direct DB writes from the browser.
  - Do not introduce a second ad-hoc news source of truth.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: bounded backend/schema work in one concern cluster.
  - **Skills**: [`git-master`]
    - `git-master`: helps keep schema/API changes atomic and easy to stage.
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: not primary for backend contract work.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: 6, 11
  - **Blocked By**: None

  **References**:
  - `D:\Desktop\justice-ru\app\api\news\route.ts` - existing authorized GET/POST news endpoint and current write boundary.
  - `D:\Desktop\justice-ru\lib\server\read-models\news.ts` - read model refresh flow and current `message_url` usage.
  - `D:\Desktop\justice-ru\lib\schemas\news.ts` - current news payload contract that must be extended safely.
  - `D:\Desktop\justice-ru\tests\components\NewsSection.test.tsx` - current expectations around message links and news rendering.

  **Acceptance Criteria**:
  - [ ] Site news write path produces a deterministic publish identifier/idempotency key.
  - [ ] News persistence supports Discord delivery metadata without breaking current `GET /api/news` consumers.
  - [ ] Failed/queued/sent delivery state is representable from the site backend.

  **QA Scenarios**:
  ```
  Scenario: Site news create returns publish metadata
    Tool: Bash (curl)
    Preconditions: justice-ru dev server running; authorized officer token/cookie available
    Steps:
      1. POST to /api/news with title="Patch 7.1", content="Body", pinned=false
      2. Capture JSON response body
      3. Assert response status is 201 and response contains stable news id plus Discord publish metadata fields
    Expected Result: news record is created and contract fields are present
    Failure Indicators: 500 error, missing publish metadata, or malformed news payload
    Evidence: .sisyphus/evidence/task-1-site-news-create.json

  Scenario: Unauthorized create is rejected
    Tool: Bash (curl)
    Preconditions: justice-ru dev server running; no auth token
    Steps:
      1. POST the same payload to /api/news without credentials
      2. Capture response
    Expected Result: status 401 or 403 with JSON error payload
    Evidence: .sisyphus/evidence/task-1-site-news-create-unauthorized.json
  ```

  **Commit**: YES
  - Message: `feat(news): add publish metadata to site news flow`

- [ ] 2. Add bot publish endpoint, auth, and idempotency guard

  **What to do**:
  - Add one versioned internal endpoint in `DiscordBot2` for site-triggered news publication.
  - Require service authentication, stale-request rejection, and idempotency so retries cannot create duplicate Discord announcements.
  - Expose deterministic delivery status suitable for site-side handling.

  **Must NOT do**:
  - Do not add a generic unrestricted “send any Discord message” API.
  - Do not rely on plain unauthenticated webhook submission as the primary path.
  - Do not couple the endpoint to a site-only DB schema shortcut.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: API, auth, and integration hardening cross multiple bot modules.
  - **Skills**: [`git-master`]
    - `git-master`: useful for a clean multi-file backend change across a second repo.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: irrelevant to the API boundary.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 7, 11, 13, 14
  - **Blocked By**: None

  **References**:
  - `D:\Desktop\DiscordBot2\api_server.py` - existing FastAPI auth middleware and endpoint patterns.
  - `D:\Desktop\DiscordBot2\WEBSITE_INTEGRATION.md` - current website-to-bot access expectations and API key model.
  - `D:\Desktop\DiscordBot2\tests\test_api.py` - API testing conventions and auth header usage.
  - `D:\Desktop\DiscordBot2\cogs\guild_settings.py` - target channel ownership and existing announcement channel settings.

  **Acceptance Criteria**:
  - [ ] New publish endpoint requires configured service auth.
  - [ ] Duplicate requests with the same publish identifier result in one delivery action.
  - [ ] Response body clearly reports queued/sent/failed state in a deterministic shape.

  **QA Scenarios**:
  ```
  Scenario: Authenticated publish request is accepted once
    Tool: Bash (curl)
    Preconditions: DiscordBot2 API running with API key configured
    Steps:
      1. POST a valid publish payload with idempotency_key="news-101-v1" to the new endpoint
      2. POST the exact same payload again
      3. Assert first response is success and second response reports duplicate/idempotent reuse rather than a second queued post
    Expected Result: one logical publish operation only
    Failure Indicators: duplicate queued records or inconsistent status codes
    Evidence: .sisyphus/evidence/task-2-bot-publish-idempotency.txt

  Scenario: Invalid auth is rejected
    Tool: Bash (curl)
    Preconditions: DiscordBot2 API running
    Steps:
      1. POST the same payload with a wrong API key/signature
      2. Capture status and body
    Expected Result: 401/403 response with no publish side effect
    Evidence: .sisyphus/evidence/task-2-bot-publish-unauthorized.txt
  ```

  **Commit**: YES
  - Message: `feat(bot): add authenticated news publish endpoint`

- [ ] 3. Establish the UX foundation for the publishing experience

  **What to do**:
  - Define a focused visual direction for the portal’s publishing/profile surfaces and bake it into reusable tokens/layout primitives.
  - Keep the redesign centered on news, profile, and nearby admin/publishing surfaces while preserving working app structure.
  - Prepare foundations that make the later editor, prefix badges, and status states feel cohesive.

  **Must NOT do**:
  - Do not redesign unrelated sections with no publishing/profile overlap.
  - Do not introduce generic AI-looking defaults or a purple-gradient template look.
  - Do not break mobile behavior while polishing desktop visuals.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: high-end UI direction and shared styling system work.
  - **Skills**: [`frontend-design`, `frontend-ui-ux`, `visual-design-system`, `mobile-responsive-ux`]
    - `frontend-design`: sets strong aesthetic direction.
    - `frontend-ui-ux`: keeps the result polished and intentional.
    - `visual-design-system`: keeps tokens and surfaces coherent.
    - `mobile-responsive-ux`: protects responsive quality during redesign.
  - **Skills Evaluated but Omitted**:
    - `git-master`: useful later, but not core to the design task itself.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 6, 9, 10, 15
  - **Blocked By**: None

  **References**:
  - `D:\Desktop\justice-ru\app\globals.css` - current portal-wide styling/tokens and motion patterns.
  - `D:\Desktop\justice-ru\components\sections\profile\index.tsx` - current profile/admin visual density and interaction areas.
  - `D:\Desktop\justice-ru\components\sections\news\index.tsx` - current news visual structure that will evolve.
  - `D:\Desktop\justice-ru\app\(portal)\layout.tsx` - shell/layout context for scope-safe redesign work.

  **Acceptance Criteria**:
  - [ ] A documented visual direction is reflected in shared styles/components used by later tasks.
  - [ ] Foundations support desktop and mobile layouts for news/profile surfaces.
  - [ ] Loading, error, and status states have a coherent presentation pattern.

  **QA Scenarios**:
  ```
  Scenario: Publishing/profile surfaces render with the new visual foundation
    Tool: Playwright
    Preconditions: justice-ru dev server running
    Steps:
      1. Open /news and /profile on desktop viewport
      2. Assert updated shell/styling primitives are visible on both pages
      3. Capture screenshots for comparison
    Expected Result: shared visual language is visible and consistent
    Failure Indicators: pages keep mismatched old styles or have obvious layout regressions
    Evidence: .sisyphus/evidence/task-3-ux-foundation-desktop.png

  Scenario: Mobile layout remains usable
    Tool: Playwright
    Preconditions: justice-ru dev server running
    Steps:
      1. Open /news on iPhone-size viewport
      2. Verify main actions remain reachable without overlap or horizontal scroll
    Expected Result: responsive layout stays readable and operable
    Evidence: .sisyphus/evidence/task-3-ux-foundation-mobile.png
  ```

  **Commit**: YES
  - Message: `feat(ui): establish publishing-focused visual foundation`

- [ ] 4. Add cosmetic prefix data model and rendering contract

  **What to do**:
  - Define a small preset prefix/title model for the portal, with one selected cosmetic prefix per user.
  - Wire the field into portal-facing schemas and display surfaces without touching authorization logic.
  - Decide the canonical presentation style so later UI tasks can render it consistently.

  **Must NOT do**:
  - Do not tie prefixes to roles, rank escalation, or access rules.
  - Do not allow arbitrary unsafe HTML/format injection in prefix text.
  - Do not expand into a broad collectible/title progression system.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: bounded schema and display-contract work.
  - **Skills**: [`git-master`]
    - `git-master`: keeps schema + UI surface updates small and atomic.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: visual polish comes later in Tasks 9 and 15.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 9, 12
  - **Blocked By**: None

  **References**:
  - `D:\Desktop\justice-ru\components\sections\profile\index.tsx` - current profile identity surfaces.
  - `D:\Desktop\justice-ru\lib\schemas\registration.ts` - existing user-facing roster stats schema.
  - `D:\Desktop\justice-ru\lib\schemas\account.ts` - portal account schema area for optional profile metadata.
  - `D:\Desktop\justice-ru\tests\components\ProfileSection.test.tsx` - profile rendering and accessibility test patterns.

  **Acceptance Criteria**:
  - [ ] Portal data layer can represent a selected cosmetic prefix safely.
  - [ ] No authorization helper or role mapping changes are required for prefixes.
  - [ ] Prefix text is validated/sanitized to prevent unsafe rendering.

  **QA Scenarios**:
  ```
  Scenario: Prefix value appears in profile-facing payloads
    Tool: Bash (curl)
    Preconditions: justice-ru dev server running with a user that has a selected prefix
    Steps:
      1. Request the relevant profile/account payload endpoint
      2. Assert selected prefix field is present and role field is unchanged
    Expected Result: prefix data exists independently from role data
    Failure Indicators: missing field or role/prefix coupling
    Evidence: .sisyphus/evidence/task-4-prefix-payload.json

  Scenario: Unsafe prefix text is rejected or sanitized
    Tool: Bash (curl)
    Preconditions: update endpoint/path available in local environment
    Steps:
      1. Submit a prefix containing disallowed markup or mention-like content
      2. Assert validation error or sanitized stored result
    Expected Result: no unsafe raw prefix is accepted for rendering
    Evidence: .sisyphus/evidence/task-4-prefix-safety.txt
  ```

  **Commit**: YES
  - Message: `feat(profile): add cosmetic prefix contract`

- [ ] 5. Expand the bot data layer for requested weekly counters

  **What to do**:
  - Audit `DiscordBot2` counter storage and reset helpers so the requested weekly fields map cleanly to persisted data.
  - Extend any missing DB helpers/tests needed for `Bounty`, `Outer Heroic`, `Inner Heroic`, `Crimson Sands`, `Abyss`, `GVG`, and `Secret Realm` reset handling.
  - Keep this task focused on data/reset plumbing, not scheduler timing.

  **Must NOT do**:
  - Do not add archival/history tables.
  - Do not rewrite unrelated analytics/KPI systems.
  - Do not move reset ownership into the site repo.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: touches bot database helpers and reset semantics.
  - **Skills**: [`git-master`]
    - `git-master`: useful for controlled changes in a stateful backend repo.
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: not applicable.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 8, 13
  - **Blocked By**: None

  **References**:
  - `D:\Desktop\DiscordBot2\database\db.py` - current activity/counter storage and `reset_all_activities` behavior.
  - `D:\Desktop\DiscordBot2\cogs\tasks.py` - current weekly reset entry points and setting guard.
  - `D:\Desktop\DiscordBot2\tests\test_database.py` - database reset testing patterns.
  - `D:\Desktop\justice-ru\lib\schemas\registration.ts` - requested site-visible weekly counter names.

  **Acceptance Criteria**:
  - [ ] Bot data layer can reset exactly the requested weekly counters.
  - [ ] Existing reset helpers/tests are updated to cover all requested fields.
  - [ ] No archival/history tables or features are introduced.

  **QA Scenarios**:
  ```
  Scenario: Reset helper clears requested weekly counters
    Tool: Bash (pytest)
    Preconditions: DiscordBot2 test environment ready
    Steps:
      1. Run targeted database tests covering reset helpers
      2. Assert seeded weekly counters are cleared after reset invocation
    Expected Result: requested counters become zero/empty exactly once
    Failure Indicators: one or more counters persist or unrelated data is removed
    Evidence: .sisyphus/evidence/task-5-reset-database-tests.txt

  Scenario: Re-running reset helper is harmless
    Tool: Bash (pytest)
    Preconditions: DiscordBot2 test environment ready
    Steps:
      1. Execute the same targeted reset test twice
      2. Assert second invocation does not error and does not over-delete
    Expected Result: idempotent reset helper behavior
    Evidence: .sisyphus/evidence/task-5-reset-idempotent.txt
  ```

  **Commit**: YES
  - Message: `feat(bot): expand weekly reset counter coverage`

- [ ] 6. Build the site news composer and publish workflow UI

  **What to do**:
  - Add a protected authoring surface for officers/head/sysadmin users to create and publish news from the portal.
  - Include preview/state feedback for draft, queued, success, and failure states using the shared UX direction from Task 3.
  - Keep write actions routed through the site backend contract from Task 1.

  **Must NOT do**:
  - Do not expose publish controls to ordinary members/guests.
  - Do not make the editor depend on direct bot availability from the browser.
  - Do not expand into a full WYSIWYG/CMS beyond what is needed for news writing and safe formatting.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: complex UX + protected form flow.
  - **Skills**: [`frontend-design`, `frontend-ui-ux`, `form-patterns`, `react-ux-patterns`]
    - `frontend-design`: keeps the editor premium-looking.
    - `frontend-ui-ux`: improves readability and status communication.
    - `form-patterns`: useful for authoring/validation UX.
    - `react-ux-patterns`: aligns with Next/React component architecture.
  - **Skills Evaluated but Omitted**:
    - `modal-patterns`: unnecessary if the composer can live inline on-page.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)
  - **Blocks**: 11, 12, 14, 15
  - **Blocked By**: 1, 3

  **References**:
  - `D:\Desktop\justice-ru\app\api\news\route.ts` - current auth-gated write path.
  - `D:\Desktop\justice-ru\components\sections\news\index.tsx` - destination news display patterns.
  - `D:\Desktop\justice-ru\components\sections\profile\index.tsx` - current protected/admin UI conventions.
  - `D:\Desktop\justice-ru\tests\components\NewsSection.test.tsx` - rendering/link expectations to preserve.

  **Acceptance Criteria**:
  - [ ] Authorized user sees a composer with validation, preview, and publish action.
  - [ ] Unauthorized users cannot access or operate publish controls.
  - [ ] Publish attempt reflects pending/success/failure states without page-breaking errors.

  **QA Scenarios**:
  ```
  Scenario: Officer publishes a news item from the site
    Tool: Playwright
    Preconditions: justice-ru dev server running; officer account available
    Steps:
      1. Log in as officer and open /news or the chosen authoring surface
      2. Fill title="Patch 7.1", content="**Raid tonight** at 21:00 https://example.com"
      3. Click the publish action and wait for success state
      4. Assert the new article appears in the news list with its status/Discord metadata UI
    Expected Result: authoring flow completes without client errors
    Failure Indicators: publish button unavailable to officer, no state feedback, or article absent
    Evidence: .sisyphus/evidence/task-6-site-publish-success.png

  Scenario: Member cannot publish
    Tool: Playwright
    Preconditions: justice-ru dev server running; member account available
    Steps:
      1. Log in as member and navigate to the same surface
      2. Assert composer or publish controls are hidden/disabled
    Expected Result: unauthorized user cannot trigger publication
    Evidence: .sisyphus/evidence/task-6-site-publish-forbidden.png
  ```

  **Commit**: YES
  - Message: `feat(news): add protected site composer`

- [ ] 7. Implement bot-side Discord formatter and delivery orchestration

  **What to do**:
  - Convert the publish payload into Discord-safe message/embed output with explicit handling for long text, links, mentions, and optional metadata.
  - Route sending through existing bot utilities/queueing rather than direct unbuffered sends.
  - Return delivery results in a form the site can store and display.

  **Must NOT do**:
  - Do not allow raw unescaped `@everyone`/role spam from site-authored content.
  - Do not exceed Discord-safe content/embed limits without truncation/fallback.
  - Do not skip queue/retry protections already available in the bot.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Discord delivery logic with formatting and reliability concerns.
  - **Skills**: [`git-master`]
    - `git-master`: keeps formatter + endpoint + tests grouped sanely.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: not relevant to Discord delivery internals.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 11, 13, 14
  - **Blocked By**: 2

  **References**:
  - `D:\Desktop\DiscordBot2\utils\dispatch_queue.py` - existing rate-limited send pattern.
  - `D:\Desktop\DiscordBot2\utils\dm_sender.py` - retry-oriented send utility approach.
  - `D:\Desktop\DiscordBot2\cogs\news_sync.py` - current title/content extraction and message URL handling.
  - `D:\Desktop\DiscordBot2\cogs\guild_settings.py` - configured announce channel ownership.

  **Acceptance Criteria**:
  - [ ] Formatter produces Discord-safe output for normal, long, and link-heavy news bodies.
  - [ ] Mention-like content is sanitized or explicitly controlled.
  - [ ] Successful send returns channel/message URL metadata usable by the site.

  **QA Scenarios**:
  ```
  Scenario: Formatter handles a rich news payload safely
    Tool: Bash (pytest)
    Preconditions: DiscordBot2 test environment ready
    Steps:
      1. Run targeted formatter tests for long text, multiple links, and mention-like content
      2. Assert output stays within Discord-safe shape and sanitized expectations
    Expected Result: tests pass with deterministic formatted payloads
    Failure Indicators: unsanitized mentions, overflow, or unstable formatting
    Evidence: .sisyphus/evidence/task-7-formatter-tests.txt

  Scenario: Missing/invalid target channel fails cleanly
    Tool: Bash (pytest or curl)
    Preconditions: DiscordBot2 API running with missing announce channel config
    Steps:
      1. Submit a valid publish payload when target channel cannot be resolved
      2. Assert clean failure response and no crash
    Expected Result: explicit error state suitable for site display
    Evidence: .sisyphus/evidence/task-7-invalid-channel.txt
  ```

  **Commit**: YES
  - Message: `feat(bot): add discord-safe news formatter`

- [ ] 8. Implement the Monday 07:00 Moscow weekly reset scheduler in the bot

  **What to do**:
  - Extend the existing weekly reset loop/catch-up behavior so it resets the requested weekly counters at Monday 07:00 `Europe/Moscow`.
  - Persist a last-reset guard to avoid missed runs and duplicate resets during downtime/restart.
  - Keep scheduler ownership inside `DiscordBot2` only.

  **Must NOT do**:
  - Do not add site cron/Vercel cron for the same reset.
  - Do not make reset time per-guild configurable in this scope.
  - Do not add manual admin reset UI unless already trivially present.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: scheduler correctness, timezone handling, and data safety.
  - **Skills**: [`git-master`]
    - `git-master`: helps isolate timing and stateful changes.
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: no overlap.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 13, 14
  - **Blocked By**: 5

  **References**:
  - `D:\Desktop\DiscordBot2\cogs\tasks.py` - existing weekly reset loop and catch-up pattern.
  - `D:\Desktop\DiscordBot2\utils\time_utils.py` - bot timezone helpers.
  - `D:\Desktop\DiscordBot2\database\db.py` - reset state/settings persistence.
  - `D:\Desktop\DiscordBot2\tests\test_database.py` - current reset regression coverage style.

  **Acceptance Criteria**:
  - [ ] Weekly reset uses `Europe/Moscow` and runs at Monday 07:00.
  - [ ] Catch-up logic prevents missed reset after downtime and duplicate reset after restart.
  - [ ] Only the requested weekly counters are reset.

  **QA Scenarios**:
  ```
  Scenario: Monday 07:00 reset triggers once
    Tool: Bash (pytest)
    Preconditions: DiscordBot2 tests with frozen/mock time support
    Steps:
      1. Run targeted tests for Monday 06:59, 07:00, and 07:10 Europe/Moscow
      2. Assert reset does not happen before 07:00, happens at/after 07:00, and does not repeat the same day
    Expected Result: exactly one reset event in the weekly window
    Failure Indicators: early reset, duplicate reset, or no reset
    Evidence: .sisyphus/evidence/task-8-reset-schedule.txt

  Scenario: Catch-up executes after downtime
    Tool: Bash (pytest)
    Preconditions: DiscordBot2 tests with last_reset state seeded from previous week
    Steps:
      1. Simulate bot starting after Monday 07:00 with stale last_reset value
      2. Assert one catch-up reset occurs and guard value updates
    Expected Result: missed reset is recovered exactly once
    Evidence: .sisyphus/evidence/task-8-reset-catchup.txt
  ```

  **Commit**: YES
  - Message: `feat(bot): schedule weekly counter reset`

- [ ] 9. Add prefix management UI and render prefixes in portal identity surfaces

  **What to do**:
  - Let the chosen portal management surface assign/select a cosmetic prefix from the allowed set.
  - Render the selected prefix in profile-facing identity blocks and any nearby roster/news-author surfaces chosen by the implementation.
  - Match the visual language from Task 3 instead of treating prefixes as plain raw text.

  **Must NOT do**:
  - Do not expose arbitrary unmanaged custom HTML in prefixes.
  - Do not add privilege gating based on prefixes.
  - Do not scatter prefix rendering across unrelated pages with no identity context.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI-heavy identity and settings work.
  - **Skills**: [`frontend-ui-ux`, `form-patterns`, `interaction-patterns`]
    - `frontend-ui-ux`: improves identity presentation.
    - `form-patterns`: helps selection/edit flows.
    - `interaction-patterns`: useful for selection feedback and badges.
  - **Skills Evaluated but Omitted**:
    - `modal-patterns`: optional, but not required for a scoped selector.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 12, 15
  - **Blocked By**: 3, 4

  **References**:
  - `D:\Desktop\justice-ru\components\sections\profile\index.tsx` - current profile identity and admin interaction surface.
  - `D:\Desktop\justice-ru\tests\components\ProfileSection.test.tsx` - profile rendering/accessibility coverage style.
  - `D:\Desktop\justice-ru\lib\authz.ts` - must remain untouched by cosmetic prefix logic.
  - `D:\Desktop\justice-ru\lib\roles.ts` - existing role labels to keep distinct from new prefixes.

  **Acceptance Criteria**:
  - [ ] Prefix can be selected/assigned through the intended portal UI.
  - [ ] Prefix displays next to the relevant user identity surfaces with styled treatment.
  - [ ] Role/access behavior remains unchanged.

  **QA Scenarios**:
  ```
  Scenario: Prefix selection is visible on the profile surface
    Tool: Playwright
    Preconditions: justice-ru dev server running; profile user with assigned prefix
    Steps:
      1. Open /profile as the relevant user/admin
      2. Select or confirm prefix="VIP"
      3. Assert the prefix badge appears near the user identity block
    Expected Result: cosmetic prefix is visible and styled consistently
    Failure Indicators: selection unavailable, badge missing, or role label replaced incorrectly
    Evidence: .sisyphus/evidence/task-9-prefix-profile.png

  Scenario: Prefix does not unlock restricted controls
    Tool: Playwright
    Preconditions: justice-ru dev server running; member user with an assigned prefix
    Steps:
      1. Log in as a prefixed member user
      2. Visit admin-sensitive profile/news surfaces
      3. Assert officer-only controls remain hidden
    Expected Result: prefix affects presentation only
    Evidence: .sisyphus/evidence/task-9-prefix-no-rbac.png
  ```

  **Commit**: YES
  - Message: `feat(profile): add prefix selection and display`

- [ ] 10. Execute the focused portal UX redesign for publishing and profile surfaces

  **What to do**:
  - Apply the new visual system to the news page, composer surface, profile area, and adjacent publishing/admin states.
  - Improve hierarchy, spacing, typography, status visibility, and mobile composition so the workflow feels modern and polished.
  - Keep the redesign scoped to the surfaces most affected by the requested features.

  **Must NOT do**:
  - Do not turn this into a portal-wide rewrite.
  - Do not remove working content sections merely for aesthetic reasons.
  - Do not regress accessibility contrast, focus visibility, or mobile usability.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: this is the core design-heavy execution task.
  - **Skills**: [`frontend-design`, `frontend-ui-ux`, `visual-design-system`, `wcag-accessibility`, `mobile-responsive-ux`]
    - `frontend-design`: drives the high-end visual direction.
    - `frontend-ui-ux`: sharpens usability and delight.
    - `visual-design-system`: keeps layout/spacing/type consistent.
    - `wcag-accessibility`: protects contrast/focus/semantics during redesign.
    - `mobile-responsive-ux`: ensures mobile still works.
  - **Skills Evaluated but Omitted**:
    - `drag-drop-patterns`: not needed for this scope.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 12, 14, 15
  - **Blocked By**: 3

  **References**:
  - `D:\Desktop\justice-ru\app\globals.css` - current token and animation baseline.
  - `D:\Desktop\justice-ru\components\sections\news\index.tsx` - main redesign target.
  - `D:\Desktop\justice-ru\components\sections\profile\index.tsx` - profile/admin redesign target.
  - `D:\Desktop\justice-ru\app\(portal)\page.tsx` and `D:\Desktop\justice-ru\app\(portal)\layout.tsx` - shell context to keep redesign consistent.

  **Acceptance Criteria**:
  - [ ] News and profile surfaces reflect the new design direction clearly and consistently.
  - [ ] Composer/status/prefix UI feels integrated rather than bolted on.
  - [ ] Desktop and mobile screenshots show no overlap or readability regressions.

  **QA Scenarios**:
  ```
  Scenario: Redesigned news/profile surfaces render cleanly on desktop
    Tool: Playwright
    Preconditions: justice-ru dev server running with seed/demo data
    Steps:
      1. Open /news and /profile at 1440x900
      2. Assert no horizontal overflow and visible hierarchy for hero, composer, list, and profile cards
      3. Capture screenshots
    Expected Result: polished, readable layout on both pages
    Failure Indicators: overflow, clipped controls, or inconsistent section styling
    Evidence: .sisyphus/evidence/task-10-redesign-desktop.png

  Scenario: Redesigned surfaces remain usable on mobile
    Tool: Playwright
    Preconditions: justice-ru dev server running
    Steps:
      1. Open /news and /profile on 390x844 viewport
      2. Assert actions stay reachable and content stacks cleanly
    Expected Result: mobile layout remains stable and readable
    Evidence: .sisyphus/evidence/task-10-redesign-mobile.png
  ```

  **Commit**: YES
  - Message: `feat(ui): redesign news and profile publishing surfaces`

- [ ] 11. Wire cross-repo publish status and failure handling end-to-end

  **What to do**:
  - Connect the site publish action to the bot endpoint from the server side only.
  - Persist the resulting Discord message URL/status back into the site’s news record/read model.
  - Handle failure states explicitly so site users can see whether Discord delivery succeeded, failed, or is pending retry.

  **Must NOT do**:
  - Do not hide Discord failures behind a silent “published” state.
  - Do not make the site wait indefinitely on Discord delivery.
  - Do not introduce direct browser calls to the bot API.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: cross-repo integration, state transitions, and failure semantics.
  - **Skills**: [`git-master`]
    - `git-master`: useful for coordinated multi-repo change review.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: integration correctness matters more here than aesthetics.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (critical integration)
  - **Blocks**: 14
  - **Blocked By**: 1, 2, 6, 7

  **References**:
  - `D:\Desktop\justice-ru\app\api\news\route.ts` - site write entry point.
  - `D:\Desktop\justice-ru\lib\server\read-models\news.ts` - read-model refresh after writes and `message_url` handling.
  - `D:\Desktop\DiscordBot2\api_server.py` - bot API response shape/auth middleware.
  - `D:\Desktop\DiscordBot2\cogs\news_sync.py` - current message URL/title/content persistence conventions.

  **Acceptance Criteria**:
  - [ ] Site publish request calls the bot from the backend and stores resulting delivery metadata.
  - [ ] Duplicate publish attempt does not create duplicate Discord message records.
  - [ ] Failure response path is visible to the site and does not corrupt the saved article.

  **QA Scenarios**:
  ```
  Scenario: Successful publish stores Discord URL back on the site
    Tool: Bash (curl)
    Preconditions: both local services running with shared configuration
    Steps:
      1. Create/publish a site news item through the site backend
      2. Query /api/news for the created item
      3. Assert Discord delivery metadata/message URL is present
    Expected Result: site record reflects downstream bot delivery result
    Failure Indicators: missing URL/status or article stuck in unknown state
    Evidence: .sisyphus/evidence/task-11-publish-roundtrip.json

  Scenario: Bot delivery failure leaves site article intact with failure status
    Tool: Bash (curl)
    Preconditions: bot API reachable but configured to fail target channel resolution
    Steps:
      1. Trigger publish from the site
      2. Query the created article/state afterward
      3. Assert article exists but delivery status indicates failure/pending retry
    Expected Result: no silent success and no article loss
    Evidence: .sisyphus/evidence/task-11-publish-failure.json
  ```

  **Commit**: YES
  - Message: `feat(news): wire site publish to bot delivery`

- [ ] 12. Add site automated coverage for publish UX and prefixes

  **What to do**:
  - Add/update `vitest` coverage for news rendering/authoring/prefix UI behavior.
  - Add/update Playwright coverage for protected publish flow and prefix display/guardrails.
  - Keep tests aligned with the new UX rather than snapshotting brittle decorative details.

  **Must NOT do**:
  - Do not add tests for unrelated pages outside this scope.
  - Do not make E2E depend on real Discord network calls.
  - Do not assert transient animation values instead of durable UI behavior.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: focused expansion of existing site test patterns.
  - **Skills**: [`playwright`, `git-master`]
    - `playwright`: required for browser verification.
    - `git-master`: useful for test-only commit hygiene.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: tests verify behavior, not design execution.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 13)
  - **Blocks**: 14, 15
  - **Blocked By**: 4, 6, 9, 10

  **References**:
  - `D:\Desktop\justice-ru\tests\components\NewsSection.test.tsx` - current news component testing style.
  - `D:\Desktop\justice-ru\tests\components\ProfileSection.test.tsx` - current profile behavior/accessibility assertions.
  - `D:\Desktop\justice-ru\playwright.config.ts` - browser test harness.
  - `D:\Desktop\justice-ru\e2e\auth.spec.ts` - auth-aware E2E structure to mirror for protected publishing.

  **Acceptance Criteria**:
  - [ ] Site unit tests cover publish UI state and prefix rendering/guardrails.
  - [ ] Site E2E tests cover authorized publish and unauthorized denial.
  - [ ] Tests run without needing a real Discord post.

  **QA Scenarios**:
  ```
  Scenario: Site unit/component tests pass
    Tool: Bash
    Preconditions: justice-ru dependencies installed
    Steps:
      1. Run npm test -- news/profile-related suite
      2. Assert all new/updated tests pass
    Expected Result: unit/component coverage is green
    Failure Indicators: failing publish/prefix assertions
    Evidence: .sisyphus/evidence/task-12-site-unit-tests.txt

  Scenario: Site E2E publish flow passes
    Tool: Playwright
    Preconditions: justice-ru dev server running with test auth fixtures/mocks
    Steps:
      1. Run the new publish-related Playwright spec
      2. Assert authorized publish and unauthorized denial both pass
    Expected Result: end-user flow is covered in browser automation
    Evidence: .sisyphus/evidence/task-12-site-e2e.txt
  ```

  **Commit**: YES
  - Message: `test(site): cover publish flow and prefixes`

- [ ] 13. Add bot automated coverage for publish endpoint, formatter, and reset logic

  **What to do**:
  - Add/update bot tests around the new publish endpoint, idempotency, formatter behavior, and weekly reset timing.
  - Keep coverage focused on deterministic behavior and failure cases.
  - Reuse existing API/database test organization instead of creating a parallel test structure.

  **Must NOT do**:
  - Do not require live Discord API calls in tests.
  - Do not leave scheduler correctness untested.
  - Do not test with brittle timing sleeps when frozen/mock time can be used.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: focused test additions around bounded new bot behavior.
  - **Skills**: [`git-master`]
    - `git-master`: helps isolate bot test additions cleanly.
  - **Skills Evaluated but Omitted**:
    - `playwright`: browser testing is not needed here.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: 14
  - **Blocked By**: 2, 5, 7, 8

  **References**:
  - `D:\Desktop\DiscordBot2\tests\test_api.py` - FastAPI endpoint tests and auth headers.
  - `D:\Desktop\DiscordBot2\tests\test_database.py` - reset and news persistence test patterns.
  - `D:\Desktop\DiscordBot2\api_server.py` - endpoint behavior under test.
  - `D:\Desktop\DiscordBot2\cogs\tasks.py` - scheduler logic to verify.

  **Acceptance Criteria**:
  - [ ] Bot tests cover authenticated publish, idempotent duplicate handling, and invalid auth rejection.
  - [ ] Formatter tests cover long text, links, and mention sanitization.
  - [ ] Reset tests cover Monday 07:00 Moscow behavior and catch-up logic.

  **QA Scenarios**:
  ```
  Scenario: Bot API/database test suite passes for publish/reset
    Tool: Bash
    Preconditions: DiscordBot2 test environment ready
    Steps:
      1. Run pytest tests/test_api.py tests/test_database.py -k "news or reset"
      2. Assert the suite passes
    Expected Result: endpoint, formatter, and reset regressions are covered
    Failure Indicators: any failing publish/reset-related test
    Evidence: .sisyphus/evidence/task-13-bot-tests.txt

  Scenario: Invalid auth and duplicate id cases are both covered
    Tool: Bash
    Preconditions: DiscordBot2 test environment ready
    Steps:
      1. Run the new targeted publish-idempotency test(s)
      2. Verify both auth rejection and duplicate reuse assertions are executed
    Expected Result: negative-path bot coverage exists and passes
    Evidence: .sisyphus/evidence/task-13-bot-negative-tests.txt
  ```

  **Commit**: YES
  - Message: `test(bot): cover publish formatter and weekly reset`

- [ ] 14. Run the cross-repo publish and delivery verification path

  **What to do**:
  - Verify the full workflow from site authoring to bot delivery result using both services together.
  - Confirm the idempotency guard, site-visible delivery status, and final Discord metadata all align.
  - Capture evidence for both success and failure conditions.

  **Must NOT do**:
  - Do not rely on manual Discord clicking as the only proof.
  - Do not mark this complete if only unit tests pass but services fail together.
  - Do not ignore partial-failure states.

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: highest-risk integration checkpoint across two repos and multiple moving parts.
  - **Skills**: [`playwright`, `git-master`]
    - `playwright`: useful for end-user site verification.
    - `git-master`: helps inspect final staged integration behavior cleanly.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: not needed for final integration verification.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4
  - **Blocks**: Final verification wave
  - **Blocked By**: 2, 6, 7, 8, 10, 11, 12, 13

  **References**:
  - `D:\Desktop\justice-ru\app\api\news\route.ts` - entry point into the site write flow.
  - `D:\Desktop\DiscordBot2\api_server.py` - downstream bot API contract.
  - `D:\Desktop\DiscordBot2\WEBSITE_INTEGRATION.md` - environment/auth expectations for local integration.
  - `D:\Desktop\justice-ru\playwright.config.ts` - site browser automation setup.

  **Acceptance Criteria**:
  - [ ] One authorized publish from the site results in one bot delivery outcome and one stored delivery status.
  - [ ] Repeating the same publish id does not create a second Discord delivery.
  - [ ] Bot-side failure is surfaced as a clear site-visible error state.

  **QA Scenarios**:
  ```
  Scenario: Full happy-path publish succeeds across both repos
    Tool: Playwright + Bash (curl)
    Preconditions: justice-ru and DiscordBot2 both running with valid shared config
    Steps:
      1. Use Playwright to publish a news item from the site as an officer
      2. Query site /api/news for the new record
      3. Query bot endpoint/log state if available for matching delivery identifier
      4. Assert one delivery result and one persisted Discord URL/status
    Expected Result: complete round-trip success across both services
    Failure Indicators: duplicate delivery, missing metadata, or UI success with backend failure
    Evidence: .sisyphus/evidence/task-14-cross-repo-success.txt

  Scenario: Duplicate publish attempt is deduplicated
    Tool: Bash (curl)
    Preconditions: both services running; a known publish id already exists
    Steps:
      1. Replay the same publish payload/idempotency key
      2. Assert bot response indicates duplicate/idempotent reuse
      3. Assert site state remains unchanged except for consistent status
    Expected Result: no duplicate announcement is produced
    Evidence: .sisyphus/evidence/task-14-cross-repo-dedupe.txt
  ```

  **Commit**: NO

- [ ] 15. Finish the polish pass: responsive cleanup, accessibility, and status clarity

  **What to do**:
  - Tighten the final presentation of composer, status chips, prefix badges, and profile identity blocks after integration is proven.
  - Resolve responsive rough edges, keyboard/focus issues, and any accessibility regressions introduced by the redesign.
  - Keep this task as polish only, not a new redesign cycle.

  **Must NOT do**:
  - Do not reopen core architecture or schema decisions.
  - Do not add new feature scope under the banner of “polish”.
  - Do not remove tested behaviors to simplify styling.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: targeted finish pass on interaction, responsiveness, and clarity.
  - **Skills**: [`frontend-ui-ux`, `wcag-accessibility`, `mobile-responsive-ux`, `interaction-patterns`]
    - `frontend-ui-ux`: sharpens the finish quality.
    - `wcag-accessibility`: catches contrast/focus/semantic issues.
    - `mobile-responsive-ux`: ensures final responsive cleanup.
    - `interaction-patterns`: helps status and feedback states feel complete.
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: the visual direction is already established by earlier tasks.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: Final verification wave
  - **Blocked By**: 3, 6, 9, 10, 12

  **References**:
  - `D:\Desktop\justice-ru\app\globals.css` - shared responsive/focus/motion rules.
  - `D:\Desktop\justice-ru\components\sections\news\index.tsx` - final composer/list polish target.
  - `D:\Desktop\justice-ru\components\sections\profile\index.tsx` - final identity/prefix/status polish target.
  - `D:\Desktop\justice-ru\tests\components\ProfileSection.test.tsx` - current accessible-name/state expectations to preserve.

  **Acceptance Criteria**:
  - [ ] Keyboard focus, contrast, and status readability remain strong after redesign.
  - [ ] No mobile clipping/overlap remains on key publishing/profile surfaces.
  - [ ] Prefix badges and Discord delivery states are visually clear and consistent.

  **QA Scenarios**:
  ```
  Scenario: Keyboard/focus behavior is intact after polish
    Tool: Playwright
    Preconditions: justice-ru dev server running
    Steps:
      1. Navigate the news composer and profile controls using keyboard only
      2. Assert visible focus indicators on primary actions and inputs
      3. Capture screenshot of focused publish control
    Expected Result: keyboard path remains usable and visible
    Failure Indicators: hidden focus, trapped focus, or unreachable controls
    Evidence: .sisyphus/evidence/task-15-focus-polish.png

  Scenario: Final responsive pass removes layout issues
    Tool: Playwright
    Preconditions: justice-ru dev server running
    Steps:
      1. Revisit /news and /profile on 390x844 and 1280x800 viewports
      2. Assert no overlap, clipped badges, or hidden status chips
    Expected Result: polished layout on both breakpoints
    Evidence: .sisyphus/evidence/task-15-responsive-polish.png
  ```

  **Commit**: YES
  - Message: `fix(ui): polish responsive publish and prefix states`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Verify every deliverable and guardrail in this plan against the implemented repos and evidence files.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run repo-specific checks, scan changed files for unsafe shortcuts, and confirm no publish/reset/prefix logic leaked outside scope.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [PASS/FAIL] | VERDICT`

- [ ] F3. **Real QA Execution** — `unspecified-high`
  Execute every QA scenario from every task as an agent, capture evidence, and verify cross-repo integration from site publish action to Discord/bot behavior.
  Output: `Scenarios [N/N] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  Compare actual implementation against this plan task-by-task, flagging any unplanned redesign, permission changes, or archival features.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

- **1**: `feat(news): add site-to-bot publish contract and persistence plumbing`
- **2**: `feat(bot): add discord publish endpoint and formatter`
- **3**: `feat(profile): add cosmetic prefixes and weekly reset updates`
- **4**: `test(integration): cover publish flow reset and ux polish`

---

## Success Criteria

### Verification Commands
```bash
# justice-ru
npm test
npm run test:e2e
npm run type-check

# DiscordBot2
pytest tests/test_api.py tests/test_database.py -k "news or reset"
```

### Final Checklist
- [ ] Site-authored news can be published by authorized users only
- [ ] Bot receives authenticated publish requests and avoids duplicate Discord posts
- [ ] Discord content respects formatting/mention/length guardrails
- [ ] Prefixes render cosmetically and do not alter access control
- [ ] Weekly counters reset exactly once per week at the requested timezone boundary
- [ ] Targeted site and bot tests pass
