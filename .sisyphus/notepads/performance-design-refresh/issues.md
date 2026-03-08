# Issues - Performance Design Refresh

- `app/(portal)/layout.tsx` is reported to be a client component performing auth on mount, which can cause flickering or slow initial paint.
- `app/(portal)/page.tsx` uses raw `<img>` for the emblem.
- Visual effects are client-only and might be blocking the main thread during hydration.
- `cacheComponents` cannot be enabled yet because the repo still has many API route segment configs (`runtime` / `dynamic`) that Next.js 16 rejects under that mode.
