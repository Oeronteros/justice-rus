# Learnings

- 2026-03-18: `lib/nav.ts` already encodes all needed route ownership for this task (`about` => `/`, pilot-sensitive and wave2-sensitive sections included), so contract tests can stay registry-free and assert directly from nav metadata.
- 2026-03-18: No current source usage of `styled-components` was found under `app/`, `components/`, or `lib/`, which lets the guardrail document define a clean future allowlist boundary without conflict.
- 2026-03-18: App Router Styled Components readiness here follows the official pattern (`compiler.styledComponents` plus a single root registry using `useServerInsertedHTML` and `ServerStyleSheet`) while leaving StyleX as the default owner outside leaf islands.
- 2026-03-18: A minimal bridge at `lib/styled-components/token-bridge.ts` can expose StyleX semantic vars (`colors`, `spacing`, `typography`, `radius`, `layout`, `motion`) directly to Styled Components leaves without introducing a second theme runtime.
- 2026-03-19: Route alias ownership now lives in `lib/nav.ts` via `sectionPathAliases` + `sectionPathEntries`, so `MainLayout` resolves `currentSection` from shared metadata instead of a duplicated local map.
- 2026-03-19: Keeping prefetch hook execution in `MainLayout` while centralizing only pathname resolution avoids session/auth boundary churn and preserves `ShellNavigationContract` for `Header` and `MobileNav`.
