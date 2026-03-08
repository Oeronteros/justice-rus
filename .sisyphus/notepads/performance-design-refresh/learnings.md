# Learnings - Performance Design Refresh

- Current stack is Next.js 16.1.6 and React 19.2.3.
- `app/(portal)/layout.tsx` and `app/(portal)/page.tsx` are key entry points for the portal.
- Visual effects are concentrated in `components/PortalVisualEffects.tsx`, `components/BackgroundEffects.tsx`, and `components/PointerEffectsClient.tsx`.
- `BackgroundEffects.tsx` uses many absolute divs which might be heavy on the DOM/GPU if not optimized.
- `PointerEffectsClient.tsx` uses `requestAnimationFrame` for smooth tilt effects, which is good, but it's a client-only effect.
- `next.config.ts` already has some image optimizations but lacks newer experimental features like `cacheComponents`.
- In Next.js 16 layouts, `cookies()` is async and must be awaited (`const cookieStore = await cookies()`), which allows direct server-side token lookup in `app/(portal)/layout.tsx`.
- Extracting session resolution into `lib/server/auth-session.ts` lets both `app/(portal)/layout.tsx` and `/api/verify-auth` share JWT decode + account-state checks without auth drift.
- Keeping `PortalShell` client-side with an `initialUser` prop preserves the existing `AuthProvider`/`useUser()` contract while removing the initial client verify gate.
- `components/BackgroundEffects.tsx` is pure decorative markup, so rendering it as a server component removes unnecessary client bundle work while keeping the same atmosphere.
- The repo can adopt `cacheComponents` once legacy App Router route-segment exports like `runtime = 'nodejs'` and `dynamic = 'force-dynamic'` are removed from `app/api/**` route handlers.
