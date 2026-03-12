# Draft: Luxury Pass UI

## Requirements (confirmed)
- Scope: final luxury-pass across the portal UI
- Focus areas: animations and transitions
- Focus areas: hover and focus states
- Focus areas: mobile density and spacing consistency
- Prior baseline already completed: design-system unification for login, guides, schedule, profile, news, help, pvp, registration

## Technical Decisions
- Preserve the established wuxia/tech visual language already present in the app
- Build on existing `ds-*` primitives instead of introducing a second styling layer
- Treat this pass as refinement/polish, not feature work or architecture changes

## Research Findings
- Existing portal already uses shared section shells and hero patterns
- Recent work introduced reusable surface, notice, chip, toolbar, and metric-tile primitives
- Remaining likely opportunities are interaction polish, motion consistency, and mobile spacing density

## Open Questions
- Test strategy decision still needed
- Scope boundary between "portal-wide polish" and "all routes/components" still needs confirmation

## Scope Boundaries
- INCLUDE: visual refinement, motion, interaction states, mobile spacing/density
- EXCLUDE: backend/API/business-logic changes unless required for UI correctness
