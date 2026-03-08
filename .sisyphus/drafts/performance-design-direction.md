# Draft: Website Performance and Design Direction

## Requirements (confirmed)
- User is open to newer technologies if they materially improve site performance.
- User is also open to design changes.

## Technical Decisions
- None yet.

## Research Findings
- Stack appears to be `Next.js 16.1.6` with App Router, `React 19.2.3`, Tailwind 4, and Vitest (`package.json`).
- `next.config.ts` currently has image formats, compression, console removal, and `optimizeCss`, but does not enable `cacheComponents` / Partial Prerendering.
- No visible usage of `use cache`, `cacheLife`, or `Suspense`-based streaming was found.
- No `next/image` imports were found.
- Many route and UI files are client components, including `app/(portal)/page.tsx`.
- Visual layer includes client-only dynamic effects in `components/PortalVisualEffects.tsx` and multiple fixed background layers in `components/BackgroundEffects.tsx`, which are likely performance-sensitive.

## Open Questions
- Which pages feel slow right now: home, portal pages, guides, profile, or all pages?
- Is the main goal faster first load, smoother animations/scrolling, better mobile performance, or all three?
- Is the user open to reducing some decorative effects if they are the main cause of jank?

## Scope Boundaries
- INCLUDE: performance opportunities, possible architecture directions, possible design simplification.
- EXCLUDE: implementation details until user confirms target priorities.
