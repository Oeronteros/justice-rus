# Draft: Astro Migration Assessment

## Requirements (confirmed)
- User asks whether migrating this project to Astro makes sense.
- Decision needed is strategic: full migration, partial migration, or stay on current stack.
- User is open to a major rewrite if functionality is preserved and the end result is better.

## Technical Decisions
- Current recommendation is not fixed yet; needs to be based on repo shape and product type.
- Use Astro official docs plus repo inspection before advising.
- Migration effort is not the main constraint; functional parity and actual improvement are the priorities.
- Reassessment is best done after the planned FSD migration, because architecture boundaries may change the Astro fit.

## Research Findings
- Current project uses `Next.js 16` + `React 19` via `package.json`.
- Repo includes many App Router API routes under `app/api/**/route.ts`.
- Repo includes authenticated/app-like portal pages under `app/(portal)/**`.
- Repo includes interactive React features such as React Query and Milkdown editor usage.
- Astro v6 docs position Astro as server-first, content-driven, static by default, with selective hydration through islands.

## Open Questions
- What is the main pain point prompting Astro consideration: performance, DX, hosting cost, or simplification?
- Is the target scope full portal migration or only public/content-facing pages?
- After FSD migration: how much of the app remains content-first versus app-like and interactive?

## Scope Boundaries
- INCLUDE: strategic fit assessment, trade-offs, and recommendation framing.
- EXCLUDE: implementation or migration execution.
