# Targeted Refactoring Plan: `components/`, `lib/hooks/`, `types/index.ts`

## Goal

Improve ownership clarity in three hotspots without migrating the repo to full FSD.

## Scope

In scope:
- `components/`
- `lib/hooks/`
- `types/index.ts`

Out of scope:
- Route restructuring in `app/`
- Full FSD migration
- Server/domain refactors outside import adjustments required by this plan

## Success Criteria

- `components/` no longer acts as one flat catch-all for shell, shared, and section-adjacent UI.
- `lib/hooks/` reflects ownership more clearly than a single technical bucket.
- `types/index.ts` stops being the default entry point for unrelated domains.
- Existing behavior stays unchanged.
- Import churn is staged so the refactor remains reviewable.

## Principles

- Preserve existing strengths: keep `components/sections/*` as the main section boundary.
- Prefer narrower ownership over new architectural vocabulary.
- Move the smallest safe unit first.
- Do not split files just because they are large; split only when ownership becomes clearer.

## Refactor Order

1. `components/`
2. `types/index.ts`
3. `lib/hooks/`

This order keeps UI ownership visible first, then reduces type coupling, then rehomes hooks after their target ownership zones are clearer.

## Phase 1: Refactor `components/`

### Problems to fix

- `components/` currently mixes shell UI (`PortalShell.tsx`, `MainLayout.tsx`, `Header.tsx`, `MobileNav.tsx`), shared UI (`shared/*`), effects (`BackgroundEffects.tsx`, `PortalVisualEffects.tsx`, `PointerEffects*`), auth entry UI (`PinScreen.tsx`), and section-facing UI.
- `components/sections/*` is already a good boundary and should remain the primary section-level entry point.

### Target structure

- Keep `components/sections/` unchanged as the domain-facing section UI area.
- Keep `components/shared/` for truly reusable presentational UI.
- Introduce one app-shell area for portal framing components, for example `components/shell/`.
- Introduce one effects area only if it improves clarity, for example `components/effects/`.
- Leave one-off domain-specific helpers next to their owning section instead of adding more global roots.

### Concrete moves

- Move `PortalShell.tsx`, `MainLayout.tsx`, `Header.tsx`, and `MobileNav.tsx` into a shell-focused folder.
- Move `PortalVisualEffects.tsx`, `BackgroundEffects.tsx`, `PointerEffectsClient.tsx`, and `PointerEffectsMount.tsx` into an effects-focused folder if they are reused outside one section.
- Review `PinScreen.tsx` and keep it with shell/auth entry concerns rather than general shared UI.
- Review `ClassIcon.tsx`, `WuxiaIcons.tsx`, and `InputPerformanceMode.tsx` individually; only globalize them if they are genuinely cross-section primitives.

### Must not do

- Do not break apart `components/sections/*` into FSD-style layers.
- Do not rename files only for stylistic reasons.
- Do not move section-local files into `shared/` just because they are reused twice.

## Phase 2: Refactor `types/index.ts`

### Problems to fix

- `types/index.ts` currently aggregates auth, account, registration, schedule, news, guide, absence, help, and API response types.
- Repo evaluation found `34` files importing from `@/types`, which means the shared entry point now acts as a wide coupling surface.

### Target structure

- Keep only true cross-domain types in `types/index.ts`, such as app-wide primitives that are still genuinely shared.
- Prefer domain-owned exports from adjacent schema or domain files where ownership is obvious.
- Convert `types/index.ts` from a source-of-truth file into a compatibility barrel that shrinks over time.

### Concrete moves

- Move registration-related types toward registration ownership.
- Move schedule/news/guide/help/absence types toward their schema or domain modules.
- Keep `UserRole`, `Section`, and a minimal auth/user surface in a genuinely shared location only if they are still used across many unrelated layers.
- Replace direct interface definitions in `types/index.ts` with re-exports where an equivalent domain-owned source already exists.
- Migrate importers in batches by domain, not all at once.

### Must not do

- Do not delete `types/index.ts` in one pass.
- Do not create circular type barrels.
- Do not move types away from schema modules that already own them well.

## Phase 3: Refactor `lib/hooks/`

### Problems to fix

- `lib/hooks/` is a technical bucket for domain-facing hooks.
- Repo evaluation found `12` section files importing from `@/lib/hooks/`, which makes sections depend on a generic hook root rather than clearer ownership boundaries.

### Target structure

- Keep truly global hooks together only if they are app infrastructure.
- Rehome domain-facing hooks closer to their owning domain or section boundary.
- Preserve a small shared hook area only for hooks with clearly cross-section semantics.

### Concrete moves

- Rehome hooks like `useRegistrations.ts`, `useSchedule.ts`, `useNews.ts`, `useGuides.ts`, `useHelp.ts`, and `useAbsences.ts` toward their matching ownership zones.
- Evaluate `useAccounts.ts` and `useKnownClasses.ts` separately; they may belong to auth/account or shared domain-support areas.
- Stop growing `lib/hooks/index.ts`; keep it as a temporary compatibility barrel during migration, then narrow or remove it.
- Migrate hook imports section by section to keep diffs readable.

### Must not do

- Do not move React Query infrastructure like `QueryProvider` into domain folders.
- Do not mix hook relocation with logic rewrites in the same pass.
- Do not introduce a new global hook barrel after shrinking the old one.

## Execution Batches

### Batch A: Shell clarity

- Create the new `components/` subfolders.
- Move shell/auth/effects files only.
- Update imports.
- Verify UI shell still composes the same way.

### Batch B: Type ownership

- Identify the highest-traffic exports from `types/index.ts`.
- Replace them with re-exports from domain-owned modules where possible.
- Update importers by domain cluster.

### Batch C: Hook ownership

- Rehome one domain hook group at a time.
- Update the owning section imports.
- Keep temporary barrel re-exports until each cluster is stable.

### Batch D: Cleanup

- Remove obsolete barrels or empty folders.
- Re-run import searches for `@/types` and `@/lib/hooks`.
- Confirm the remaining shared surfaces are intentional.

## Verification

- Run `lsp_diagnostics` on all modified TypeScript files.
- Run `npm run test`.
- Run `npm run type-check`.
- Run `npm run build`.
- Re-check imports into `@/types` and `@/lib/hooks` to confirm coupling actually decreased.

## Risks

- Import churn may be larger than expected because `@/types` is used broadly.
- Hook relocation can accidentally mix structural moves with behavior changes if not kept strict.
- Some UI files in `components/` may look shared but are actually owned by one section or one shell flow.

## Decision Rules During Implementation

- If a file has one obvious owner, move it closer to that owner.
- If a file serves unrelated sections equally, keep it in a shared area.
- If ownership is unclear, do not invent a new global bucket; keep the current location until evidence is stronger.

## Expected Outcome

- Clearer `components/` ownership without changing the section model.
- Smaller blast radius from `types/index.ts`.
- Fewer domain-facing imports from the generic `lib/hooks/` root.
- Better structure now, while still avoiding a full FSD migration.
