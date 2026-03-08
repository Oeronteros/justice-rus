# FSD Repo Inventory

## Routes and pages

- `app/(portal)/members/page.tsx:6`, `app/(portal)/guides/page.tsx:6`, `app/(portal)/profile/page.tsx:6`, and `app/(portal)/schedule/page.tsx:7` are thin route entries that mostly pass context into section components.
- `app/(portal)/page.tsx:10` is the main exception: it contains a large amount of page-specific composition and content orchestration directly inside the route file.
- `app/(portal)/layout.tsx:6` keeps route-group wiring small and delegates auth-aware shell concerns to `components/PortalShell.tsx:16`.
- `app/layout.tsx` remains the app-level root boundary, while `app/(portal)/` already behaves like a practical page layer for the authenticated portal.
- Route grouping in `app/(portal)/absences`, `app/(portal)/guides`, `app/(portal)/help`, `app/(portal)/members`, `app/(portal)/news`, `app/(portal)/profile`, `app/(portal)/pvp`, and `app/(portal)/schedule` already gives the project URL-based slices that overlap with what FSD would call `pages`.

Assessment:
- Current routing already covers most of the FSD `pages` need.
- The main route-level pain point is not routing itself, but that `app/(portal)/page.tsx:10` mixes page composition with a lot of content/UI detail.

## UI organization

- `components/` is a broad umbrella that mixes shell components (`components/PortalShell.tsx:16`, `components/MainLayout.tsx:63`, `components/Header.tsx`), effects (`components/PortalVisualEffects.tsx`, `components/BackgroundEffects.tsx`), auth entry UI (`components/PinScreen.tsx`), and feature/section UI.
- `components/sections/` is already a meaningful boundary: it groups domain-facing page UI into `about/`, `absences/`, `guides/`, `help/`, `news/`, `profile/`, `pvp/`, `registration/`, and `schedule/`.
- `components/shared/EmptyState.tsx`, `components/shared/ErrorBoundary.tsx`, `components/shared/LoadingState.tsx`, and `components/shared/SectionHero.tsx` act like a practical shared UI layer.
- `components/sections/registration/index.tsx:26` shows a feature-sized section component that owns filtering, local UI state, and composition of smaller parts like `RegistrationStats`, `RegistrationFilters`, and `RegistrationTable`.
- `components/sections/schedule/index.tsx:205` is a much larger mixed-responsibility component; it combines UI, parsing utilities, language-dependent formatting, edit flows, and domain-facing screen logic in one file.
- `components/WuxiaIcons.tsx` and `components/shared/SectionHero.tsx` are reused broadly, but they live beside route shell and feature UI under the same top-level bucket.

Assessment:
- The repo already has a workable split between shared UI and section-specific UI.
- The structural issue is not an absence of boundaries; it is that `components/` remains the single catch-all root for app shell, shared atoms, and section-level widgets.

## Domain boundaries

- `lib/server/registration/` is already organized by domain behavior with `read.ts`, `write.ts`, `sync.ts`, `contracts.ts`, `schema.ts`, and `read-model.ts`.
- `lib/server/pvp/logic.ts` isolates PvP-specific server logic instead of burying it in a global server helpers file.
- `lib/server/auth-session.ts` and `lib/auth/context.tsx:17` show auth as a cross-cutting concern with both server and client ownership.
- `lib/schemas/registration.ts`, `lib/schemas/schedule.ts`, `lib/schemas/news.ts`, `lib/schemas/help.ts`, and `lib/schemas/guide.ts` already separate domain contracts by concept.
- `types/index.ts:28` then re-aggregates many domain types into one shared surface, which weakens ownership clarity even though the underlying schemas are already separated.
- `ARCHITECTURE.md:17`, `ARCHITECTURE.md:26`, and `ARCHITECTURE.md:31` show a system split where the Website acts as frontend/API proxy while the Discord Bot carries middleware and business-logic responsibilities; that supports domain separation at the system level more than heavy frontend slicing.

Assessment:
- Existing domain modularity already solves part of the problem FSD normally addresses.
- The strongest evidence against urgent FSD adoption is that domain boundaries already exist in `lib/server/` and `lib/schemas/`; the weaker area is shared ownership and discoverability on the client side.

## Shared technical buckets

- `lib/hooks/` centralizes many feature-facing hooks in one technical bucket: `useAbsences.ts`, `useAccounts.ts`, `useGuides.ts`, `useHelp.ts`, `useNews.ts`, `usePvp.ts`, `useRegistrations.ts`, and `useSchedule.ts`.
- `lib/hooks/index.ts:1` re-exports these hooks from one place, which is convenient but makes ownership feel technical first and domain second.
- `lib/schemas/index.ts:1` performs the same technical aggregation for schema modules.
- `types/index.ts:1` is the broadest aggregation point; it contains auth, registration, schedule, news, guide, absence, and API response types in one file.
- A repo-wide search found `34` files importing from `@/types`, which means the aggregate type entry point is used well beyond one local area and does flatten ownership across UI, tests, routes, and server helpers.
- A repo-wide search also found `9` portal route files importing section components from `@/components/sections/`, while `12` section files import hooks from `@/lib/hooks/`; this reinforces that the main ownership split today is route -> section -> shared hook bucket.
- `lib/providers/QueryProvider.tsx:41` is a legitimate app-level technical infrastructure concern and should stay shared regardless of whether FSD is adopted.

Assessment:
- Not every shared bucket is a problem; some are normal app infrastructure.
- The real coupling risk comes from domain-facing hooks and types being grouped under generic technical roots (`lib/hooks`, `types/index.ts`) instead of clearer ownership boundaries.

## Tests and maintainability signals

- `tests/components/` groups UI tests by technical shape, with files like `Header.test.tsx`, `ProfileSection.test.tsx`, and `RegistrationTable.test.tsx`.
- `tests/hooks/` groups hook tests such as `useGuides.test.tsx` and `usePvp.test.tsx`.
- `tests/lib/` groups lower-level logic tests such as `auth-session.test.ts`, `pvp-logic.test.ts`, and `registration-read.test.ts`.
- `package.json:6` confirms Vitest is configured, so test organization is an active convention rather than missing tooling.

Assessment:
- Current tests favor technical-area discoverability over domain ownership.
- This is a mild FSD signal, not a forcing function: the test layout may become more awkward as features grow, but it is not yet strong evidence that the whole repo needs FSD.

## Overall inventory conclusion

- This repo is not strict FSD, but it is not an unstructured monolith either.
- The strongest existing boundaries are route groups in `app/(portal)/`, section UI in `components/sections/`, and server/domain modules in `lib/server/` and `lib/schemas/`.
- The weakest areas are generic top-level buckets (`components/`, `lib/hooks/`, `types/index.ts`) that flatten ownership and make shared-vs-domain distinctions less obvious.
- Based on current structure alone, the repository looks closer to "modular Next.js app with technical buckets" than to "project urgently blocked by the absence of FSD".
