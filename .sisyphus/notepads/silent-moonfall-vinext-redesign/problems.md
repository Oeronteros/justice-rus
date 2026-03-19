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


## Local StyleX/theme findings - 2026-03-19
- Token source files already exist in  (, , , , , ) and are consumed directly by shared StyleX primitives like , , , , and ; task 2 should extend this source of truth instead of duplicating values inside component files.
- Theme application is subtree-scoped through , which applies  /  plus  and adds , , and ; changing the wrapper contract would break both StyleX theming and the global CSS selectors that hang off .
- Theme mode persistence already lives in  (, , ) with storage key ; both  and  duplicate the same boot script that resolves mode before hydration and writes .
- Vinext already imports shared theme assets rather than owning its own token stack:  imports , , and , while  renders shared ; task 2 must preserve this shared-contract behavior unless the shell migration is explicitly widened.
- Legacy styling still depends heavily on  and :  defines Wuxia CSS vars,  overrides, large shell/auth/background effect classes, and utility-like classes such as , , , , ;  is still imported from  and Vinext fallback markup already uses compat classes ().
- Shared shell components are already StyleX-first but not StyleX-only:  consumes token vars extensively and / use theme context, yet some components still mix in class utilities (for example  uses  on ).


## Local StyleX/theme findings - 2026-03-19
- Token source already exists in lib/stylex/tokens.stylex.ts via colors, typography, radius, spacing, layout, and motion; shared primitives in lib/stylex/primitives.stylex.ts and components/shell/Shell.stylex.ts consume those vars directly, so task 2 should extend that source instead of re-declaring component-local values.
- Theme application is subtree-scoped through components/theme/AppThemeBoundary.tsx, which applies wuxiaTheme or moonlitTheme plus rootLayoutStyles.body and adds theme-wuxia, data-theme, and data-theme-mode; changing that wrapper contract would break both StyleX theme props and globals.css selectors tied to .theme-wuxia.
- Theme mode persistence already lives in lib/theme/context.tsx under ThemeProvider/useTheme/useOptionalTheme with storage key silent-moonfall-theme-mode; both app/layout.tsx and apps/portal-vinext/app/layout.tsx duplicate the same boot script to resolve mode before hydration and write documentElement/body dataset values.
- Vinext already depends on shared theme assets: apps/portal-vinext/app/layout.tsx imports @/app/globals.css, AppThemeBoundary, and ThemeProvider, while apps/portal-vinext/app/(portal)/layout.tsx renders shared PortalShell. Task 2 should preserve this shared contract unless the shell migration scope expands.
- Legacy styling still relies heavily on app/globals.css and app/tailwind-compat.css. globals.css defines Wuxia CSS vars, light-mode overrides, and many shell/auth/utility classes such as .wuxia-backdrop, .portal-hero, .ui-badge, .ui-chip, .section-card, and .loading-shell; tailwind-compat.css is still imported from globals.css, and the Vinext root Suspense fallback already uses compat utility classes relative z-10 min-h-screen.
- Shared shell components are StyleX-first but not StyleX-only: components/shell/Shell.stylex.ts is token-driven, and ThemeModeSwitch/Header are wired to theme context, but mixed utility usage still exists (for example Header.tsx passes className="w-5 h-5 text-white" to WuxiaIcon).
