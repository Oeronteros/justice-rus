# Problems - Performance Design Refresh

- No usage of `Suspense` for streaming found in the current codebase.
- `next/image` is not used, leading to unoptimized media delivery.
- High prevalence of client components in the portal shell might be impacting performance metrics (LCP, TBT).
