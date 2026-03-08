# Decisions - Performance Design Refresh

- Scope is limited to `main + portal` (shell and landing page).
- Prioritize performance without sacrificing the "wuxia/moonfall" atmosphere.
- Use Next.js 16 features like `use cache` and `cacheComponents` where applicable.
- Optimize visual effects by potentially moving some to CSS or reducing DOM nodes.
- Replace raw `<img>` tags with `next/image` for better optimization.
- Move auth verification from client-side mount to server-side where possible to reduce layout shift and TBT.
- Resolve portal session in `app/(portal)/layout.tsx` via `cookies()` + shared `resolveSessionFromToken()` before rendering the client shell.
- Reuse `resolveSessionFromToken()` in `app/api/verify-auth/route.ts` so route and layout enforce the same JWT/account activity rules.
- Keep unauthenticated fallback in `PortalShell` as `PinScreen` and keep logout behavior as cookie invalidation + local user reset (`setUser(null)`).
