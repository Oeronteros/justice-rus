# Core Module Inventory

## Scope

This inventory covers only the in-scope Core Portal modules for later redesign waves:
- `/`
- `/news`
- `/guides`
- `/schedule`
- `/help`
- `/profile`

It records stable redesign seams, protected actions, and obvious UX hotspots without changing product behavior.

## `/news`

- Entry file: `components/sections/news/index.tsx`
- Primary seams:
  - `hero`: `SectionHero` with module framing
  - `composer`: officer-only publish form and submit mutation
  - `preview`: Discord-safe preview surface for draft content
  - `featured`: pinned or first-item spotlight article
  - `list`: remaining news card grid with expand/delete/open-in-Discord actions
- Protected actions:
  - create news
  - pin featured news
  - delete news
  - open Discord message URL
  - refresh after empty/error states
- UX hotspots:
  - one file owns normalization, preview shaping, publish flow, featured card, and list card rendering
  - featured/list distinction should stay explicit during redesign

## `/schedule`

- Entry file: `components/sections/schedule/index.tsx`
- Primary seams:
  - `hero`: route framing and calendar context
  - `day rail`: weekday or recurring grouping selection
  - `event timeline/list`: grouped schedule items with time logic
  - `rsvp`: RSVP actions and RSVP summary display
  - `editor`: officer create/edit draft flow with validation and duration presets
- Protected actions:
  - create schedule item
  - edit schedule item
  - respond via RSVP
  - refresh schedule data
- UX hotspots:
  - timeline/list view, recurrence labeling, and officer editor all live in one large file
  - time parsing and validation are critical and must not drift during redesign

## `/guides`

- Entry file: `components/sections/guides/index.tsx`
- Primary seams:
  - `hero/list`: `GuidesList` inside section shell
  - `detail modal`: `GuideModal`
  - `create/edit`: `GuideEditor`
  - `header visibility coupling`: modal/editor open state hides shell header through header context
- Protected actions:
  - open guide detail by query param
  - create guide
  - preserve slug/query syncing
- UX hotspots:
  - header-hide behavior is coupled to modal/editor state and must remain intentional
  - guide browse, detail, and editing are already conceptually separate and should stay that way

## `/help`

- Entry file: `components/sections/help/index.tsx`
- Primary seams:
  - `hero`: support board framing
  - `request composer`: title/details/category/time range creation flow
  - `status filter toolbar`: open/closed/all chips + refresh
  - `request list`: responder state, status badges, metadata, details
  - `request actions`: respond, withdraw RSVP, edit time, close/open, delete
- Protected actions:
  - create help request
  - RSVP / withdraw RSVP
  - edit time range
  - toggle request status
  - delete request
- UX hotspots:
  - the page mixes creation and operations-heavy list management in one file
  - action density is high and should be preserved as explicit groups in redesign

## `/profile`

- Entry file: `components/sections/profile/index.tsx`
- Primary seams:
  - `overview`: nickname/discord/class/guild/role/status summary
  - `notifications`: notification settings and desktop permission flow
  - `role access`: current role explainer cards
  - `activity toggles`: PvE/PvP activity marks
  - `accounts panel`: admin account validity and role/status management
- Protected actions:
  - update profile/account data
  - change notification settings
  - request desktop notification permission
  - toggle account active state
  - change roles when permitted
- UX hotspots:
  - combines member self-service and admin account-management responsibilities
  - redesign should preserve the admin/non-admin split rather than flattening it

## Shell-Smoke-Only Modules

These remain outside redesign scope and are shell-smoke-only until later waves:
- `/members`
- `/absences`
- `/pvp`
- `/analytics`
- `/workflow`
- `/integrations`
- `/calculator`

## Shared Risk Notes

- Several modules are large single-entry files; redesign work should preserve existing action groups before attempting visual restyling.
- Shared components and hooks are heavily reused; later redesign tasks should alter route composition before changing data contracts.
- `guides` is structurally modal-driven, unlike the other modules; it should not be forced into the same interaction shape.
