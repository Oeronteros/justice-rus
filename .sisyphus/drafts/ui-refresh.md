# Draft: UI Refresh

## Requirements (confirmed)
- Participant prefixes should display nicely in the participants UI.
- Dashboard visual quality needs improvement.
- Menu visual quality needs improvement.
- Redesign scope: dashboard and menu may be changed freely, including strong layout/composition changes.

## Technical Decisions
- Preserve the existing Wuxia-themed design language and shared layout/navigation foundations unless later clarified otherwise.
- Treat this as a UI refresh/refactor, not a net-new feature.

## Research Findings
- Participant prefix display currently lives in `components/sections/profile/index.tsx` as an inline cyan badge near the nickname; source options are in `lib/schemas/registration.ts`.
- Dashboard lives in `components/sections/dashboard/index.tsx` and is routed from `app/(portal)/page.tsx`.
- Main navigation is split between `components/shell/Header.tsx` and `components/shell/MobileNav.tsx`, coordinated by `components/shell/MainLayout.tsx`.
- Shared visual conventions come from `app/globals.css`, `components/shared/SectionHero.tsx`, `components/WuxiaIcons.tsx`, and labels in `lib/i18n.ts`.
- Test infrastructure exists: Vitest + Testing Library + Playwright, with full validation via `npm run validate` and CI in `.github/workflows/ci.yml`.

## Test Strategy Decision
- Infrastructure exists: YES
- Automated tests: YES (tests after implementation)
- Frameworks available: Vitest, Testing Library, Playwright
- Agent-executed QA: required in final plan

## Open Questions
- Should participant prefixes be improved only in the profile participant card, or also anywhere else participants are listed?

## Scope Boundaries
- INCLUDE: participant prefix presentation, dashboard UI, menu UI.
- EXCLUDE: full product redesign unless user expands scope.
