# Draft: Astro Migration Assessment

## Requirements (confirmed)
- User asks whether migrating this project to Astro makes sense.
- Decision needed is strategic: full migration, partial migration, or stay on current stack.
- User is open to a major rewrite if functionality is preserved and the end result is better.
- User likely wants to separate a public content layer from the authenticated portal after FSD.

## Technical Decisions
- Current recommendation is not fixed yet; needs to be based on repo shape and product type.
- Use Astro official docs plus repo inspection before advising.
- Migration effort is not the main constraint; functional parity and actual improvement are the priorities.
- Reassessment is best done after the planned FSD migration, because architecture boundaries may change the Astro fit.
- Current default recommendation is a split architecture: Astro for isolated public content pages, Next for portal/auth/API.

## Research Findings
- Current project uses `Next.js 16` + `React 19` via `package.json`.
- Repo includes many App Router API routes under `app/api/**/route.ts`.
- Repo includes authenticated/app-like portal pages under `app/(portal)/**`.
- Repo includes interactive React features such as React Query and Milkdown editor usage.
- Astro v6 docs position Astro as server-first, content-driven, static by default, with selective hydration through islands.
- Current repository does not yet show a clear full FSD structure; top-level `app/`, `components/`, and `lib/` remain primary, while `src/` only contains `css/` and `js/`.
- Representative app-like coupling remains visible in `app/api/auth/route.ts`, `app/api/guide/[id]/comment/route.ts`, `lib/auth/hooks.ts`, `lib/providers/QueryProvider.tsx`, and `components/forms/GuideForm.tsx`.
- Content-oriented areas exist, but many are still inside authenticated client pages such as `app/(portal)/news/page.tsx` and `app/(portal)/guides/page.tsx`.

## Latest Assessment
- FSD by itself would improve module boundaries and make selective extraction easier, but it does not change the product from app-like to content-first.
- If the post-FSD architecture still includes portal auth, mutations, React Query state, and rich editor flows, the default recommendation remains: keep the main app on Next and consider Astro only for isolated public/content pages.

## Open Questions
- What is the main pain point prompting Astro consideration: performance, DX, hosting cost, or simplification?
- Is the target scope full portal migration or only public/content-facing pages?
- After FSD migration: how much of the app remains content-first versus app-like and interactive?
- Which exact sections should belong to the public Astro layer versus stay in the authenticated Next portal?

## Scope Boundaries
- INCLUDE: strategic fit assessment, trade-offs, and recommendation framing.
- EXCLUDE: implementation or migration execution.
