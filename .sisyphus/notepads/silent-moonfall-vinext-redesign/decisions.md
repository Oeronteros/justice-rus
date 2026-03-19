# Decisions


## External doc findings - 2026-03-19
- Official vinext docs found in the upstream README rather than a separate docs site:  and  are preserved,  is non-destructive, and Cloudflare/Nitro runtime setup is documented there.
- Official routing evidence: vinext documents support for file-system routing in both routers, plus layouts, templates, parallel routes, route groups, route handlers, middleware, and nested App Router SSR.
- Official migration/cutover evidence is limited: docs cover side-by-side migration ( / existing ) and incremental adoption at the project level, but no official route-by-route cutover manifest or split-runtime ownership pattern was found.
- Official structure implication for parity manifests: the App Router scanner models , , , , , , , and , which is the cleanest documented source shape for a route ownership map.
- Example references worth mirroring for layout/provider composition: vinext fumadocs template uses a root provider in  plus a nested ; WorkOS AuthKit vinext example keeps provider composition in the root layout and documents known vinext limitations explicitly.

## External doc findings - 2026-03-19 (corrected)
- Supersedes the malformed block above: shell interpolation stripped inline code markers in the first append.
- Official vinext docs live primarily in the upstream README, not a separate docs site: existing app/ and pages/ structures are kept, vinext init is non-destructive, and both Cloudflare and Nitro runtime setup are documented.
- Official routing evidence: vinext documents file-system routing for both routers, including layouts, templates, route groups, parallel routes, route handlers, middleware, and nested App Router SSR.
- Official migration/cutover evidence is limited: the docs describe side-by-side project migration via dev:vinext alongside the existing dev flow, but I found no official route-by-route cutover manifest or split-runtime ownership guidance.
- Best input shape for a parity manifest comes from the App Router scanner data model: pattern, pagePath, routePath, layouts, parallelSlots, loadingPath, errorPath, and routeSegments.
- Example references worth mirroring for layout/provider composition: the vinext fumadocs template uses a root provider in app/layout.tsx plus a nested app/docs/layout.tsx; the WorkOS AuthKit vinext example keeps provider composition in the root layout and calls out known vinext limitations explicitly.

## 2026-03-19 Task 1 cutover decision
- Adopted a two-layer `all` interpretation to avoid unsafe rewrites: (1) `all` documents the final ownership target map in `docs/vinext-route-parity.md`; (2) active rewrites still include only parity-ready routes from `lib/platform/vinext-cutover.ts` until blocked Vinext route files exist.
