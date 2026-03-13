# Hotspot Refactor Seams

This note records the intended split points for the current large modules so follow-up refactors stay aligned with the existing architecture.

## Scope

- `components/shell/PinScreen.tsx`
- `lib/server/pvp/service.ts`
- `lib/server/read-models/news.ts`
- `lib/server/read-models/schedule.ts`

## PinScreen

### Current responsibilities

- renders the auth hero/copy and translated benefits
- manages login/register mode state and field state
- submits login and registration requests through `authApi`
- renders auxiliary officer PIN login UI
- renders inline feedback plus the post-registration approval modal

### Target seams

- `components/shell/pin-screen/PinScreenHero.tsx` for translated left-rail copy only
- `components/shell/pin-screen/PinScreenModeTabs.tsx` for login/register mode switching
- `components/shell/pin-screen/PinScreenForm.tsx` for the shared nickname/password submission surface
- `components/shell/pin-screen/PinScreenRegisterFields.tsx` for class/discord/confirm-password registration-only inputs
- `components/shell/pin-screen/PinScreenAdminPin.tsx` for the officer PIN disclosure and submit block
- `components/shell/pin-screen/PinScreenApprovalModal.tsx` for the success modal only

### Keep in the parent component

- request orchestration with `authApi`
- loading/error/notice state
- mode switching and registration reset flow
- the single `onAuthSuccess` boundary

### Non-goals

- no auth API redesign
- no visual redesign of the login experience
- no movement of session/business logic into the UI layer

## PvP Service

### Current responsibilities

- schema bootstrap for queue, matches, confirmations, and ratings
- actor resolution from authenticated user context
- rate limiting for queue/report actions
- match formatting and full state assembly
- queue join/leave mutations
- report confirmation flow and rating updates

### Target seams

- `lib/server/pvp/schema.ts` for `ensurePvpSchema`
- `lib/server/pvp/actors.ts` for `actorIdFromUser`, `requireActorId`, and `resolveActor`
- `lib/server/pvp/rate-limit.ts` for the in-memory action limiter and error type
- `lib/server/pvp/queries.ts` for normalized select helpers and shared read queries
- `lib/server/pvp/state.ts` for `formatMatch` and `loadState`
- `lib/server/pvp/mutations.ts` for `joinPvpQueue`, `leavePvpQueue`, `reportPvpResult`, and `completeMatch`

### Keep stable

- exported route-facing API from `lib/server/pvp/service.ts`
- `PvpState` and route DTO shapes from `lib/schemas/pvp.ts`
- current rating logic in `lib/server/pvp/logic.ts`

### Non-goals

- no product redesign of PvP behavior
- no route-layer orchestration moved out of `app/api/pvp/route.ts`
- no schema or response shape churn unless required by existing tests

## Read-models

### Shared overlap already present

- both modules use `getReadModelState`, `isReadModelStale`, `markReadModelReady`, `markReadModelError`
- both modules use `runCoalescedTask` and `runServerTaskOnce`
- both modules keep stale snapshots when sync fails and a previous read-model exists

### Candidate shared helpers

- `lib/server/read-models/error-payload.ts` or similar for bot error extraction instead of inline `error/message` parsing
- `lib/server/read-models/bot-source.ts` for tunnel bypass header creation and authenticated bot fetch wrappers
- `lib/server/read-models/refresh.ts` for the shared `refresh*AfterWrite` best-effort pattern

### Keep domain-specific

- news payload normalization and Discord publish metadata in `news.ts`
- schedule title-language formatting, key generation, and legacy table fallback in `schedule.ts`

### Non-goals

- no abstract framework that hides whether the source is DB or bot API
- no reduction of stale-snapshot observability
- no removal of explicit sync entry points per read-model
