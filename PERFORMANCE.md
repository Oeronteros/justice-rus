# Performance Notes

## Cache Strategy

- `lib/server/db-cache.ts` is a process-local optimization.
- It is appropriate for reducing repeated work within a single app process.
- It is not a shared cache and should not be treated as a cross-instance consistency layer.
- For data that must stay coherent across multiple instances or serverless cold starts, prefer explicit invalidation or an external cache only after a real hot path is proven.

## Lightweight Performance Check

Use the build-based smoke check to review route output and catch obvious regressions:

```bash
npm run perf:smoke
```

This command runs a production build and surfaces:

- route rendering mode changes
- build-time failures
- route table size/output shifts visible in Next.js build output

## Practical Guidance

- Treat `npm run validate` as the correctness gate.
- Treat `npm run perf:smoke` as the lightweight performance visibility pass.
- Avoid adding heavier cache or observability infrastructure until build output, hot paths, or production profiling justify it.
