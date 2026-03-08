# FSD Decision Matrix

## External decision criteria used

- Official FSD overview says a switch is worth considering when the current architecture is already causing trouble, especially when the project is too inter-connected or onboarding is getting hard (`https://feature-sliced.design/docs/get-started/overview`).
- Official migration guidance says the first question is whether the team really needs FSD, and highlights difficulty adding features, unrelated breakage, and onboarding pain as key triggers (`https://feature-sliced.design/docs/guides/migration/from-custom`).
- FSD 2.1 guidance recommends starting from `pages`, and even stopping there if reuse pressure is limited (`https://feature-sliced.design/docs/guides/migration/from-v2-0`).
- FSD guidance on excessive entities explicitly says some apps, especially thinner clients, may not need a separate `entities` layer at all (`https://fsd.how/vi/docs/guides/issues/excessive-entities`).

## Repo-specific scorecard

Scoring legend:
- `Low` = weak reason to adopt FSD now
- `Medium` = meaningful pressure, but not enough on its own
- `High` = strong reason to adopt FSD soon

### 1. Page boundary clarity

- Need for FSD now: `Low`
- Evidence: `app/(portal)/members/page.tsx:6`, `app/(portal)/guides/page.tsx:6`, `app/(portal)/profile/page.tsx:6`, and `app/(portal)/schedule/page.tsx:7` are already thin page entry points.
- Why it matters: FSD 2.1 treats `pages` as the main starting point; this repo already has that pattern in practice.
- Counter-signal: `app/(portal)/page.tsx:10` is a heavier route file, but it is one notable hotspot rather than proof that the whole page layer is failing.

### 2. Component ownership clarity

- Need for FSD now: `Medium`
- Evidence: `components/` mixes app shell (`components/PortalShell.tsx:16`, `components/MainLayout.tsx:63`), shared UI (`components/shared/SectionHero.tsx`), and section UI (`components/sections/registration/index.tsx:26`).
- Why it matters: a broad `components/` root obscures ownership and can become noisy as the app grows.
- Counter-signal: `components/sections/` and `components/shared/` already provide partial business-vs-shared separation, so the problem is bucket breadth more than total architectural absence.

### 3. Domain modularity on server and contracts

- Need for FSD now: `Low`
- Evidence: `lib/server/registration/` and `lib/server/pvp/logic.ts` already separate domain logic, and `lib/schemas/registration.ts`, `lib/schemas/schedule.ts`, `lib/schemas/news.ts`, and peers keep contracts per concept.
- Why it matters: FSD often helps when domain logic is scattered; here a meaningful amount of domain code is already grouped.
- Counter-signal: `types/index.ts:1` partially re-flattens domain ownership on the type surface.

### 4. Shared technical bucket sprawl

- Need for FSD now: `Medium`
- Evidence: `lib/hooks/` contains 9 hook files plus `index.ts`, `lib/hooks/index.ts:1` re-exports them centrally, `12` files under `components/sections/` import from `@/lib/hooks/`, and `34` files across the repo import from `@/types`.
- Why it matters: this is the clearest signal that the repo thinks in technical folders before domain ownership.
- Counter-signal: some shared modules are correctly global, such as `lib/providers/QueryProvider.tsx:41`.

### 5. Cross-page business reuse pressure

- Need for FSD now: `Low`
- Evidence: `9` portal route files import directly from `@/components/sections/`, and representative entries like `app/(portal)/members/page.tsx:6`, `app/(portal)/guides/page.tsx:6`, `app/(portal)/profile/page.tsx:6`, and `app/(portal)/schedule/page.tsx:7` mostly hand off to one section component.
- Why it matters: FSD becomes more valuable when business logic is reused across many pages and needs explicit lower-layer ownership.
- Counter-signal: `components/sections/schedule/index.tsx:205` is large enough that reuse pressure may emerge later, but current evidence still looks mostly page/section-local.

### 6. Client thickness vs thin-client reality

- Need for FSD now: `Low`
- Evidence: `ARCHITECTURE.md:17` describes the Website role as `Frontend + API Proxy`, while `ARCHITECTURE.md:26` and `ARCHITECTURE.md:31` assign middleware and business logic responsibilities to the Discord Bot layer.
- Why it matters: official FSD guidance notes thin clients often do not need a heavy `entities` layer.
- Counter-signal: some client sections do hold substantial UI logic, especially `components/sections/schedule/index.tsx:205`, so this is suggestive rather than absolute.

### 7. Onboarding and team scaling pressure

- Need for FSD now: `Medium-Low`
- Evidence: current repo structure is understandable enough to navigate by routes (`app/(portal)/...`) and section folders (`components/sections/...`), but `components/`, `lib/hooks/`, and `types/index.ts` make ownership less obvious.
- Why it matters: official migration guidance treats onboarding pain as a primary reason to switch.
- Counter-signal: there is no direct repository evidence yet of team-size pain, frequent unrelated breakage, or failed onboarding.

### 8. Migration payoff vs migration cost

- Need for FSD now: `Low`
- Evidence: a full shift would at least require changes across `components/`, `lib/hooks/`, `types/index.ts`, `tests/`, `9` route files importing from `@/components/sections/`, and `34` files importing from `@/types`.
- Why it matters: official guidance says adopt incrementally if needed, but only when current pain outweighs migration and learning cost.
- Counter-signal: because current boundaries are already partially modular, smaller convention fixes could likely capture most of the benefit at lower cost.

## Weighted outcome

- Strong adopt-now signals: `0`
- Medium signals: component ownership clarity, shared technical bucket sprawl
- Strong keep-current signals: page boundary clarity, existing domain modularity, thin-client characteristics, migration cost
- Overall read: `Do not adopt FSD now`

## Migration cost and risk assessment

- `components/` would require the largest churn because shell, shared UI, and section UI would need new ownership boundaries.
- `lib/hooks/` would need repartitioning by feature/entity/page ownership, which would change imports across many sections.
- `types/index.ts` would need to be broken up or replaced by slice-owned exports, creating broad import churn.
- `tests/components`, `tests/hooks`, and `tests/lib` would likely need new ownership conventions, adding friction without immediate user-facing value.
- The main migration risk is not technical impossibility; it is spending architectural effort to rename and reshuffle a repo that already has usable boundaries.

## Lower-cost alternatives to full FSD

### Alternative 1. Keep current architecture, but narrow the top-level buckets

- Split `components/` only where pain is real: preserve `components/shared/`, move shell-specific pieces into one app-shell area, and keep `components/sections/` as the primary section boundary.
- Benefit: improves ownership clarity without forcing full FSD vocabulary.

### Alternative 2. Push domain ownership down into existing folders

- Keep `app/(portal)/` and `components/sections/`, but stop expanding `types/index.ts` and prefer domain-local type exports from `lib/schemas/*` or adjacent modules.
- Benefit: reduces flattening without a wholesale folder migration.

### Alternative 3. Treat each section as the primary slice

- Formalize `components/sections/*` plus matching route files as the unit of ownership for UI, local helpers, and tests.
- Benefit: aligns with FSD 2.1's "pages first" idea while staying compatible with the current codebase.

### Alternative 4. Revisit only if concrete pain appears

- Re-evaluate FSD if the repo starts showing repeated cross-section reuse, onboarding slowdowns, frequent import ambiguity, or repeated unrelated breakages.
- Benefit: architectural cost is paid only when there is verified need.

## Decision summary

- Scope of this decision: this matrix evaluates full FSD adoption for the repo, not smaller FSD-aligned improvements such as clarifying page/section ownership.
- This repo has some FSD-shaped problems, but not enough to justify a full adoption now.
- The best current move is to tighten conventions around ownership inside the existing structure and revisit FSD only if growth makes the present boundaries insufficient.
