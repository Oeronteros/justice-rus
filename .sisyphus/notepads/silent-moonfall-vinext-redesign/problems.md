# Problems


## External doc findings - 2026-03-19
- Official | https://stylexjs.com/docs/learn/theming/defining-variables |  tokens must live in named exports inside  files only; no other exports in that file. This constrains token/primitives layout for Vinext.
- Official | https://stylexjs.com/docs/learn/theming/creating-themes | theming APIs require ; themes are subtree-scoped via ; last theme for the same var group wins.
- Official | https://stylexjs.com/docs/learn/recipes/shareable-tokens |  can centralize token sources;  supports partial overrides so nested themes inherit unspecified vars from parents.
- Official | https://stylexjs.com/docs/learn/styling-ui/using-styles |  composes styles deterministically and later entries win, which is the main primitive for shell/app boundary composition instead of broad global CSS.
- Official | https://stylexjs.com/docs/learn/installation/nextjs | Next integration expects build-time extraction (), a single CSS entrypoint with , and aligned Babel/PostCSS config.
- Official | https://stylexjs.com/docs/learn/installation/vite/vite-rsc | RSC/SSR/client builds get aggregated CSS per environment; root shell must include one CSS entry and dev runtime helper when using Vite RSC examples.
- Official example | https://github.com/facebook/stylex/blob/main/examples/example-nextjs/app/page.tsx | example composes page styles with multiple themes in one  call for app-shell level theme switching.
- Official example | https://github.com/facebook/stylex/blob/main/examples/example-nextjs/app/InteractiveCard.tsx | example defines several  variants and applies them on small subtrees, useful for porting isolated auth/shell islands.
- Community example (lower confidence) | https://github.com/derekjwilliams/stylex-example-nextjs | standalone Next example derived from official repo; useful only as a setup cross-check, not stronger than official docs.


## External doc findings - 2026-03-19 (corrected block; supersedes malformed lines above)
- Official | https://stylexjs.com/docs/learn/theming/defining-variables | `defineVars` tokens must live in named exports inside `.stylex.*` files only; no other exports in that file. This constrains token/primitives layout for Vinext.
- Official | https://stylexjs.com/docs/learn/theming/creating-themes | theming APIs require `unstable_moduleResolution`; themes are subtree-scoped via `stylex.props(theme, ...)`; last theme for the same var group wins.
- Official | https://stylexjs.com/docs/learn/recipes/shareable-tokens | `stylex.env` can centralize token sources; `createTheme` supports partial overrides so nested themes inherit unspecified vars from parents.
- Official | https://stylexjs.com/docs/learn/styling-ui/using-styles | `stylex.props` composes styles deterministically and later entries win, which is the main primitive for shell/app boundary composition instead of broad global CSS.
- Official | https://stylexjs.com/docs/learn/installation/nextjs | Next integration expects build-time extraction (`runtimeInjection: false`), a single CSS entrypoint with `@stylex`, and aligned Babel/PostCSS config.
- Official | https://stylexjs.com/docs/learn/installation/vite/vite-rsc | RSC/SSR/client builds get aggregated CSS per environment; root shell must include one CSS entry and dev runtime helper when using Vite RSC examples.
- Official example | https://github.com/facebook/stylex/blob/main/examples/example-nextjs/app/page.tsx | example composes page styles with multiple themes in one `stylex.props(...)` call for app-shell level theme switching.
- Official example | https://github.com/facebook/stylex/blob/main/examples/example-nextjs/app/InteractiveCard.tsx | example defines several `createTheme` variants and applies them on small subtrees, useful for porting isolated auth/shell islands.
- Community example (lower confidence) | https://github.com/derekjwilliams/stylex-example-nextjs | standalone Next example derived from official repo; useful only as a setup cross-check, not stronger than official docs.
