# Performance-Oriented Redesign Pass (Main + Portal)

## TL;DR

> **Quick Summary**: Redesign the portal shell and landing page to improve performance (LCP, TBT, CLS) while maintaining the "wuxia/moonfall" atmosphere. Key improvements include moving auth to the server, enabling Next.js 16 performance features like `cacheComponents`, and optimizing visual effects and media.
>
> **Deliverables**:
> - Optimized `next.config.ts` with Next.js 16 `cacheComponents`
> - Server-side auth verification in `app/(portal)/layout.tsx`
> - Optimized `BackgroundEffects` and `PointerEffectsClient`
> - Redesigned landing page (`app/(portal)/page.tsx`) with `next/image`
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 2 waves + final verification
> **Critical Path**: Task 1 -> Task 2 -> Task 3 -> Task 5
>
> **Note on Next.js 16**: We will use `cacheComponents: true` to enable Partial Prerendering (PPR) capabilities for the portal shell.

---

## Context

### Original Request
Create a focused work plan for executing a performance-oriented redesign pass on the main portal shell and landing page.

### Research Findings
- **Stack**: Next.js 16.1.6, React 19.2.3, Tailwind 4.
- **Portal Shell**: `app/(portal)/layout.tsx` is a client component performing auth on mount, causing a "Checking secure session..." flicker.
- **Landing Page**: `app/(portal)/page.tsx` is a client component using raw `<img>` tags and many client-side effects.
- **Visual Effects**: `components/BackgroundEffects.tsx` uses many absolute divs; `PointerEffectsClient.tsx` uses `requestAnimationFrame`.
- **Config**: `next.config.ts` lacks `cacheComponents`.

---

## Work Objectives

### Core Objective
Improve the perceived and actual performance of the portal entry point and landing page by leveraging Next.js 16 server-side features and optimizing client-side visual hotspots.

### Concrete Deliverables
- Next.js 16 configuration for `cacheComponents`.
- Server-side auth verification flow in the portal layout.
- Optimized visual effects components with reduced DOM overhead.
- Redesigned landing page with optimized media and improved visual hierarchy.

### Definition of Done
- [ ] `Checking secure session...` flicker is eliminated for authenticated users.
- [ ] Lighthouse Performance score for the landing page improves by at least 15 points.
- [ ] `npm run build` succeeds with `cacheComponents` enabled.
- [ ] Visual atmosphere remains consistent with the "wuxia/moonfall" theme.

### Must Have
- Preserve the existing visual language and atmosphere.
- Use `next/image` for all static and dynamic images.
- Ensure auth remains secure during the transition to server-side verification.

### Must NOT Have (Guardrails)
- Do not simplify the design to the point of losing its unique character.
- Do not add new heavy dependencies (e.g., Framer Motion) if CSS/native React can suffice.
- Do not break existing auth logic or Discord API integration.

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - all verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES (Vitest, Playwright)
- **Automated tests**: Tests-after
- **Framework**: Vitest for logic, Playwright for UI/Performance

### QA Policy
Every task includes agent-executed QA scenarios with evidence under `.sisyphus/evidence/`.

- **Frontend/UI**: Playwright for layout shift and interaction verification.
- **Performance**: Lighthouse/Web Vitals audit via CLI or Playwright.
- **Backend**: `npm run build` for Server Component validation.

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately - Foundations):
- Task 1: Performance Baseline & Next.js 16 Config
- Task 2: Server-Side Auth & Layout Refactor

Wave 2 (After Wave 1 - Visuals & Media):
- Task 3: Visual Effects Optimization
- Task 4: Landing Page Redesign & Media Optimization

Wave FINAL (After ALL tasks - independent review):
- F1: Plan compliance audit
- F2: Performance Audit (Lighthouse)
- F3: Real QA execution
- F4: Scope fidelity check

Critical Path: Task 1 -> Task 2 -> Task 4 -> Final verification
Parallel Speedup: ~40% faster than sequential
Max Concurrent: 2

### Dependency Matrix
- **1**: None -> 2, 3, 4
- **2**: 1 -> 3, 4
- **3**: 1, 2 -> 4
- **4**: 1, 2, 3 -> Final

---

## TODOs

### 1. Performance Baseline & Next.js 16 Config
- **What to do**:
  - Run a baseline Lighthouse audit on the current landing page and portal shell.
  - Update `next.config.ts` to enable `cacheComponents: true`.
  - Verify that the build still passes with this experimental feature.
- **Must NOT do**:
  - Do not enable features that break the current Discord API proxying.
- **Acceptance Criteria**:
  - [ ] Baseline performance report saved to `.sisyphus/evidence/baseline-perf.json`.
  - [ ] `next.config.ts` updated with `cacheComponents: true`.
  - [ ] `npm run build` succeeds.

### 2. Server-Side Auth & Layout Refactor
- **What to do**:
  - Convert `app/(portal)/layout.tsx` to a Server Component.
  - Move auth verification to a server-side helper (using cookies/JWT).
  - Implement a `Suspense` boundary for the portal shell to allow streaming.
  - Ensure `AuthProvider` still receives the user data without a client-side fetch.
- **Must NOT do**:
  - Do not expose the JWT secret to the client.
  - Do not break the `PinScreen` fallback for unauthenticated users.
- **Acceptance Criteria**:
  - [ ] `app/(portal)/layout.tsx` is a Server Component.
  - [ ] No "Checking secure session..." flicker for logged-in users.
  - [ ] Auth remains functional across all portal sub-pages.

### 3. Visual Effects Optimization
- **What to do**:
  - Audit `BackgroundEffects.tsx` and move static layers to pure CSS/Tailwind where possible.
  - Optimize `PointerEffectsClient.tsx` to use CSS variables and `will-change` for better GPU acceleration.
  - Ensure effects are disabled for users who prefer reduced motion.
- **Must NOT do**:
  - Do not remove the "moonfall" or "wuxia" visual elements.
- **Acceptance Criteria**:
  - [ ] Reduced DOM node count in `BackgroundEffects.tsx`.
  - [ ] Smooth 60fps animations on mid-range mobile devices.
  - [ ] `prefers-reduced-motion` is strictly honored.

### 4. Landing Page Redesign & Media Optimization
- **What to do**:
  - Redesign `app/(portal)/page.tsx` to be a Server Component (leveraging `cacheComponents`).
  - Replace raw `<img>` tags with `next/image` with proper `priority` and `sizes`.
  - Improve the visual hierarchy of the "Command Cards" and "Hero" section.
  - Implement `Suspense` for the `RulesBlock` or other secondary content.
- **Must NOT do**:
  - Do not lose the multi-language support (RU/ZH/EN).
- **Acceptance Criteria**:
  - [ ] Landing page LCP is under 1.5s on desktop.
  - [ ] All images are served in AVIF/WebP via `next/image`.
  - [ ] Visual design feels "refreshed" and more premium.

### 5. Final Verification & Audit
- **What to do**:
  - Run a final Lighthouse audit and compare with the baseline.
  - Verify all auth flows (login, logout, session persistence).
  - Check mobile responsiveness and accessibility (WCAG 2.2).
- **Acceptance Criteria**:
  - [ ] Performance score > 90 on desktop, > 70 on mobile.
  - [ ] Zero accessibility errors in the portal shell.
  - [ ] All todos marked as completed.
