# A+ Upgrade Plan

## Goal

Raise repository quality by fixing the highest-impact structural gaps identified in the audit:

- inconsistent DB-backed session enforcement in privileged APIs
- duplicated manual auth/origin/error handling in large route handlers
- server logic embedded inside `app/api/*` files instead of `lib/server/*`
- split i18n ownership between `lib/i18n.ts` and `lib/i18n/context.tsx`
- insufficient tests around inactive sessions and security boundaries

## Phase 1 - Shared Auth and Route Helper Baseline

### Changes

1. Extend `lib/server/route-helpers.ts` with a DB-backed active-session guard built on `resolveSessionFromToken()`.
2. Keep the existing lightweight `requireAuth()` for routes that only need JWT presence, but introduce a stronger helper for privileged and stateful routes.
3. Add helper coverage for the new session guard in tests.

### Acceptance Criteria

- privileged routes can enforce active account state via one helper call
- helper returns standardized `401` responses for missing, invalid, and inactive sessions
- `tests/lib/route-helpers.test.ts` or a sibling helper test covers the new guard behavior

## Phase 2 - Migrate Manual Routes to Shared Guard Style

### Changes

1. Replace direct `getAuthToken()` + `verifyToken()` patterns in:
   - `app/api/help/route.ts`
   - `app/api/schedule/route.ts`
   - `app/api/news/route.ts`
   - `app/api/analytics/roster/route.ts`
   - `app/api/pvp/route.ts`
2. Use route helpers for same-origin, auth/session, and payload parsing where practical.

### Acceptance Criteria

- target routes stop manually decoding JWT for privileged behavior
- inactive accounts are rejected consistently across migrated routes
- payload parsing and guard flow become visibly thinner in route handlers

## Phase 3 - Extract Heavy Route Logic into `lib/server/*`

### Changes

1. Create server modules for domains with oversized handlers:
   - `lib/server/help/*`
   - `lib/server/schedule/*`
   - `lib/server/news/*`
   - `lib/server/analytics/*`
2. Move SQL, mapping, and orchestration out of route files into those modules.
3. Keep route handlers as thin transport wrappers.

### Acceptance Criteria

- route files primarily perform guards, parse inputs, and return `NextResponse`
- domain SQL and mapping live in `lib/server/*`
- type boundaries are preserved through shared schema usage

## Phase 4 - i18n Unification

### Changes

1. Consolidate `Language` ownership so it is not duplicated across `lib/i18n.ts` and `lib/i18n/context.tsx`.
2. Reduce copy drift by making shared language types and top-level copy flow from one source.
3. Replace static `lang="ru"` behavior with runtime-consistent document language updates.

### Acceptance Criteria

- one canonical `Language` type is consumed across the app
- document language reflects the selected locale instead of always staying Russian
- existing i18n tests continue to pass

## Phase 5 - Security and Integration Coverage

### Changes

1. Add tests for DB-backed session invalidation and helper-based guard behavior.
2. Add route-level tests for at least one migrated privileged route covering:
   - inactive account rejection
   - forbidden origin rejection
   - invalid payload rejection
3. Keep existing unit and E2E suites green.

### Acceptance Criteria

- tests fail if a deactivated user can still write through privileged APIs
- tests fail if helperized routes regress to manual/inconsistent guard behavior
- full validation gate passes

## Validation

Run after implementation:

1. `lsp_diagnostics` on modified files
2. `npm run lint`
3. `npm run test`
4. `npm run type-check`
5. `npm run build`
6. `npm run test:e2e`

## Notes

- prioritize correctness and consistency over broad feature expansion
- preserve working route behavior while moving logic into server modules
- avoid changes that widen public API surface unless necessary for consistency
