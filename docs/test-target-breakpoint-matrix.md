# Test Target And Breakpoint Matrix

## Canonical Breakpoints

- Mobile: `390x844` primary touch baseline; minimum supported matrix target `375x800`
- Tablet: `768x900`
- Desktop: `1280x800`

## Route Coverage Matrix

| Route | Surface | Existing unit/component coverage | Existing Playwright coverage | Required matrix status |
| --- | --- | --- | --- | --- |
| `/` | Shell + dashboard | `tests/components/DashboardSection.test.tsx` | `e2e/mobile-dashboard-nav.spec.ts` | Needs desktop and tablet browser coverage expansion later |
| `/news` | Content-heavy module | none in `tests/components/` | `e2e/a11y.spec.ts` | Needs route-specific smoke beyond a11y |
| `/schedule` | Action-heavy module | none in `tests/components/` | indirect mock coverage via dashboard mobile flow only | Needs direct route smoke and breakpoint checks |
| `/help` | Action-heavy module | none in `tests/components/` | `e2e/a11y.spec.ts` | Needs direct route smoke and fallback-state checks |
| `/guides` | Content/workspace module | none in `tests/components/` | no direct Playwright route coverage found | Needs dedicated smoke coverage |
| `/profile` | Identity/settings module | none in `tests/components/` | no direct Playwright route coverage found | Needs dedicated smoke coverage |
| shell desktop | Header/nav chrome | `tests/components/Header.test.tsx` | none direct | Needs desktop navigation smoke |
| shell mobile | Bottom dock + overflow sheet | none direct component-level | `e2e/mobile-dashboard-nav.spec.ts` | Baseline exists; needs broader route matrix |

## Current Test Assets

### Component / unit
- `tests/components/Header.test.tsx`
  - Covers accessible desktop primary navigation, immersive menu access, refresh/logout controls, and language switch presence.
- `tests/components/DashboardSection.test.tsx`
  - Covers dashboard smoke rendering and shared prefix/signal strip presence with mocked hooks.
- `tests/lib/nav.test.ts`
  - Guards nav IA contract for primary/secondary/group ordering.

### Playwright / browser
- `e2e/mobile-dashboard-nav.spec.ts`
  - Mobile-only authenticated dashboard flow with immersive menu navigation into `/pvp`.
- `e2e/a11y.spec.ts`
  - Accessibility smoke for PinScreen, `/news`, and `/help`.
- `playwright.config.ts`
  - Two-project split: `chromium` for main portal and `vinext-chromium` for pilot routes.

## Main Portal Gaps

- No direct Playwright smoke for `/guides`.
- No direct Playwright smoke for `/profile`.
- No direct Playwright smoke for `/schedule` as its own route.
- No direct desktop route-navigation smoke for shell chrome after T1/T3 changes.
- No route-level breakpoint matrix for tablet/desktop across in-scope modules.
- Existing component coverage is concentrated in `Header` and `DashboardSection`; module-specific tests remain thin.

## Required Follow-Up Targets

### Wave 3 test additions
- Shell desktop route smoke at desktop width
- `/news` smoke at desktop + tablet
- `/schedule` smoke at mobile + desktop
- `/help` smoke at mobile + desktop
- `/guides` smoke at desktop
- `/profile` smoke at mobile + desktop
- A11y rerun for `/`, `/news`, `/help` and one additional action-heavy route

### Verification commands
- Targeted component regression: `npm run test -- tests/lib/nav.test.ts tests/components/Header.test.tsx tests/components/DashboardSection.test.tsx`
- Browser regression entrypoint: `npx playwright test e2e/mobile-dashboard-nav.spec.ts e2e/a11y.spec.ts --project=chromium`

## Notes

- `playwright.config.ts` already encodes the dual-runtime split, so T6 should not introduce a second matrix outside this file and this doc.
- Known pre-existing repo issue: `npm run type-check` currently fails in generated `.next/types` for `app/api/integrations/discord/route.ts`; that is not a T6 regression.
