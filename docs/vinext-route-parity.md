# Vinext route parity manifest

This document is the single route-parity source for Vinext cutover.

- Scope source of truth in code: `lib/platform/vinext-cutover.ts`
- Rewrite injection point: `next.config.ts` (`beforeFiles` via `buildVinextCutoverRewrites()`)
- API exception: `/api/:path*` remains on Next (not routed to Vinext)
- Rollback baseline for every route family: set `VINEXT_CUTOVER_SCOPE=off` and redeploy Next

## Final scope contract

`VINEXT_CUTOVER_SCOPE=all` is the final ownership target map for these routes:

- `/`, `/about`, `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`, `/analytics`, `/workflow`, `/integrations`

Current implementation keeps rewrites enabled only for parity-ready routes and marks blocked routes explicitly until Vinext pages exist.

## Route table

| Route | Section key | Auth requirement | Data dependencies (high level) | Next route file(s) | Vinext route file(s) | Current rewrite owner | Final owner (`all`) | Status | Blocker / note | Rollback note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `about` | Protected content behind `PortalShell` PinScreen/session | Dashboard section hooks + shell providers | `app/(portal)/page.tsx` | `apps/portal-vinext/app/(portal)/page.tsx` | Vinext in `all` | Vinext | Ready | Vinext dashboard wrapper now owns the root route in final scope | `VINEXT_CUTOVER_SCOPE=off` |
| `/about` | `about` | Protected content behind `PortalShell` PinScreen/session | Dashboard section hooks + shell providers | - | `apps/portal-vinext/app/(portal)/about/page.tsx` | Vinext in `all` | Vinext | Ready | Dedicated Vinext `/about` route mirrors the dashboard alias intentionally | `VINEXT_CUTOVER_SCOPE=off` |
| `/news` | `news` | Protected content behind `PortalShell` PinScreen/session | `/api/news` | `app/(portal)/news/page.tsx` | `apps/portal-vinext/app/(portal)/news/page.tsx` | Vinext in `pilot+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/help` | `help` | Protected content behind `PortalShell` PinScreen/session | `/api/help` | `app/(portal)/help/page.tsx` | `apps/portal-vinext/app/(portal)/help/page.tsx` | Vinext in `pilot+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/guides` | `guides` | Protected content behind `PortalShell` PinScreen/session | `/api/guide` (+ related guide endpoints) | `app/(portal)/guides/page.tsx` | `apps/portal-vinext/app/(portal)/guides/page.tsx` | Vinext in `pilot+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/profile` | `profile` | Protected content behind `PortalShell` PinScreen/session | Profile/account API usage via section hooks | `app/(portal)/profile/page.tsx` | `apps/portal-vinext/app/(portal)/profile/page.tsx` | Vinext in `wave2+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/absences` | `absences` | Protected content behind `PortalShell` PinScreen/session | `/api/discord-proxy/absences` | `app/(portal)/absences/page.tsx` | `apps/portal-vinext/app/(portal)/absences/page.tsx` | Vinext in `wave2+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/pvp` | `pvp` | Protected content behind `PortalShell` PinScreen/session | `/api/pvp` | `app/(portal)/pvp/page.tsx` | `apps/portal-vinext/app/(portal)/pvp/page.tsx` | Vinext in `wave2+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/schedule` | `schedule` | Protected content behind `PortalShell` PinScreen/session | `/api/schedule` | `app/(portal)/schedule/page.tsx` | `apps/portal-vinext/app/(portal)/schedule/page.tsx` | Vinext in `wave2+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/calendar` | `calendar` | Protected content behind `PortalShell` PinScreen/session | Notifications + help + absences + pvp hooks | `app/(portal)/calendar/page.tsx` | `apps/portal-vinext/app/(portal)/calendar/page.tsx` | Vinext in `wave2+` | Vinext | Ready | Parity route file exists in both runtimes | `VINEXT_CUTOVER_SCOPE=off` |
| `/analytics` | `analytics` | Officer-only content behind `PortalShell` PinScreen/session | Roster analytics hooks/API | `app/(portal)/analytics/page.tsx` | - | Next | Vinext | Blocked | Vinext analytics route file missing | `VINEXT_CUTOVER_SCOPE=off` |
| `/workflow` | `workflow` | Officer-only content behind `PortalShell` PinScreen/session | Workflow hooks/API + feature flag | `app/(portal)/workflow/page.tsx` | - | Next | Vinext | Blocked | Vinext workflow route file missing | `VINEXT_CUTOVER_SCOPE=off` |
| `/integrations` | `integrations` | Officer-only content behind `PortalShell` PinScreen/session | Integrations section + nested integrations pages | `app/(portal)/integrations/page.tsx` | - | Next | Vinext | Blocked | Vinext integrations route file missing | `VINEXT_CUTOVER_SCOPE=off` |

## Scope behavior snapshot

- `off`: no Vinext route ownership.
- `pilot`: Vinext owns `/news`, `/help`, `/guides`.
- `wave2`: Vinext owns pilot routes plus `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`.
- `all`: final target map includes all manifest routes, but rewrites currently stay on parity-ready routes only; blocked routes remain on Next until Vinext files exist.

## Cutover verification path

- Config verification: `npm run cutover:verify`
- Targeted route parity verification: `npx playwright test -c playwright.vinext.config.ts --grep "@route-parity"`

## Rollback commands

Use the same rollback for pilot, wave2, and all:

```bash
npm run cutover:env:off
```

Equivalent env form:

```env
VINEXT_CUTOVER_SCOPE=off
VINEXT_CUTOVER_ORIGIN=
```
