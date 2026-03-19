# Decisions

- 2026-03-18: Locked the core refresh route ownership contract to explicit in-scope (`/`, `/news`, `/guides`, `/schedule`, `/help`, `/profile`) and shell-smoke-only (`/members`, `/absences`, `/pvp`, `/analytics`, `/workflow`, `/integrations`, `/calculator`) lists in repo docs.
- 2026-03-18: Kept `lib/nav.ts` as the canonical route ownership source and enforced the contract by asserting derived href sets in `tests/lib/nav.test.ts` instead of introducing a separate registry.
- 2026-03-18: Declared StyleX-owned platform boundaries (`components/shell/*`, `components/shared/*`, `lib/stylex/*`, `app/layout.tsx`, `app/(portal)/layout.tsx`) and constrained Styled Components to route-local leaf presentation under `components/sections/*` only.
- 2026-03-18: Chose a root-mounted Styled Components registry (`app/styled-components-registry.tsx`) wrapping the existing root tree once, while preserving the provider order semantics `ThemeProvider -> AppThemeBoundary -> QueryProvider -> I18nProvider` unchanged.
- 2026-03-18: Kept token sharing as a bridge-only export (`lib/styled-components/token-bridge.ts`) based on existing StyleX semantic values, intentionally avoiding a Styled Components `ThemeProvider` to prevent parallel theme contexts.
- 2026-03-19: Standardized pathname-to-section resolution on `lib/nav.ts` exports (`resolveSectionFromPath`) and removed `MainLayout`'s private `pathToSection` registry to eliminate route/alias drift.
- 2026-03-19: Preserved runtime behavior by keeping shell tone and prefetch dispatch in `components/shell/MainLayout.tsx`, with tests expanded to lock integration aliases and fallback-to-`about` resolution.
- 2026-03-19: Kept the desktop header refresh entirely inside `components/shell/Header.tsx` and `components/shell/Shell.stylex.ts`, preserving `lib/nav.ts` as the sole source for the primary rail and grouped secondary menu.
- 2026-03-19: Chose a command-deck treatment for desktop widths: a framed utility tray, a standalone current-section signal chip, indexed primary nav cards, and a count-bearing immersive-menu trigger, without moving any session or localization handlers out of `MainLayout`.
