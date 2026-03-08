# FSD Recommendation

## Recommendation

**Do not adopt FSD now. Revisit after growth.**

## Why this is the recommendation

- The repo already has meaningful structural boundaries in `app/(portal)/`, `components/sections/`, `lib/server/registration/`, and `lib/schemas/*`.
- Most route files are already thin page entries, which means the project already captures a large part of the FSD `pages` value without using FSD naming.
- The biggest current problems are narrower than a full architecture migration: `components/` is too broad, `lib/hooks/` is organized by technical kind rather than ownership, and `types/index.ts` flattens many domains into one shared entry point.
- Those issues are real, but they do not yet prove the current architecture is causing the kinds of severe interconnection and onboarding pain that official FSD guidance treats as migration triggers.
- `ARCHITECTURE.md:17` describes the Website role as `Frontend + API Proxy`, while `ARCHITECTURE.md:26` and `ARCHITECTURE.md:31` place middleware and business logic in the Discord Bot layer, so the frontend looks at least partly thin-client in practice.

## Current strengths worth keeping

- `app/(portal)/members/page.tsx:6`, `app/(portal)/guides/page.tsx:6`, `app/(portal)/profile/page.tsx:6`, and `app/(portal)/schedule/page.tsx:7` are clean route entry points.
- `components/sections/` already provides domain-facing UI slices for most portal areas.
- `components/shared/` already acts as a shared UI layer.
- `lib/server/registration/` and `lib/server/pvp/logic.ts` already encode domain ownership on the server side.
- `lib/schemas/*` already separates many contracts by domain concept.

## Current weaknesses that do need attention

- `components/` is still a catch-all root that mixes shell UI, shared UI, and section-level UI.
- `components/sections/schedule/index.tsx:205` is a clear mixed-responsibility hotspot and a better target for incremental cleanup than an architecture-wide migration.
- `lib/hooks/` and `lib/hooks/index.ts:1` flatten ownership into a technical hook bucket; `12` section files currently import from that shared hook area.
- `types/index.ts:1` re-centralizes many unrelated concepts and weakens domain discoverability; `34` files currently import from `@/types`.
- `tests/components`, `tests/hooks`, and `tests/lib` favor technical grouping over ownership grouping.

## What to do instead now

- Keep the current route-group and section-based structure.
- Tighten ownership conventions inside existing folders before introducing full FSD vocabulary.
- Prefer local or domain-owned exports over expanding `types/index.ts`.
- Treat `components/sections/*` as the primary UI ownership unit unless a section clearly splits into reusable cross-section behavior.
- Clean up specific hotspots, especially oversized section files, before considering a whole-repo architecture change.

## When to revisit FSD

Revisit this decision if several of these start happening together:

- new features repeatedly require touching unrelated sections;
- ownership inside `components/` and `lib/hooks/` becomes hard to reason about;
- onboarding new developers becomes noticeably slower;
- cross-section reuse grows enough that section-local logic no longer has an obvious home;
- the number of exceptions like `app/(portal)/page.tsx:10` and `components/sections/schedule/index.tsx:205` grows instead of shrinking.

## Final call

- Full FSD adoption is not justified by the current repository evidence.
- The right near-term move is convention tightening and targeted modular cleanup inside the existing structure.
- If future growth turns current technical buckets into a real delivery problem, then a partial or phased FSD migration will make more sense than adopting it preemptively today.
