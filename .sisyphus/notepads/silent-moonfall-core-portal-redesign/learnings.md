# Learnings

- 2026-03-16:  is the single source of truth for desktop primary rail, desktop immersive groups, mobile dock, and mobile overflow; updating arrays/groups here automatically propagates to Header and MobileNav consumers.
- 2026-03-16: Keeping / in the same order as grouped sections avoids drift and supports direct IA contract assertions in tests.

- 2026-03-16: lib/nav.ts is the source of truth for desktop primary rail, desktop immersive groups, mobile dock, and mobile overflow; IA changes should be centralized there.
- 2026-03-16: Keep desktopSecondarySections/mobileSecondarySections ordered the same as desktopNavGroups/mobileNavGroups to prevent ordering drift and keep nav contract tests stable.
- 2026-03-16: When desktop primary includes profile, remove it from desktop secondary/core group as well or the immersive menu duplicates the same destination.
- 2026-03-16: Moving shared rgba values into StyleX tokens makes cards, controls, and notices easier to tune without route-level churn.
- 2026-03-17: Keeping refresh/logout/language-switch handlers in MainLayout and passing them to Header as callbacks makes shell chrome redesigns safer because session behavior no longer lives in desktop visual code.
- 2026-03-17: Annotating dashboard modules with stable `data-dashboard-region` and `data-dashboard-module` seams lets later UI reshuffles proceed without touching hook/data contracts.
- 2026-03-17: The safest vinext compatibility boundary is shared metadata and shared StyleX foundations; shell choreography can stay main-portal-only until cutover parity is explicitly scheduled.
- 2026-03-17: When broad inventory delegation stalls, a single file-grounded doc artifact can preserve scope and still unblock later redesign/test waves.
- 2026-03-17: Desktop shell hierarchy reads more clearly when primary navigation and utility actions get separate visual framing instead of sharing one undifferentiated strip.
- 2026-03-17: Mobile navigation becomes easier to parse when the dock explains its role and the overflow sheet opens with its own heading and hint instead of dropping users straight into grouped links.
- 2026-03-17: The dashboard above the fold reads more clearly when hero metrics carry short contextual hints and quick-route actions sit in their own rail instead of competing with summary cards.
- 2026-03-17: Dense dashboard cards stay easier to scan when each monitoring block ends with a small action row instead of burying follow-up links in long text stacks.
- 2026-03-17: News and guides read more intentionally when the hero is followed by a compact overview rail and the operational controls are grouped into a distinct command/filter deck.
- 2026-03-17: Action-heavy modules like schedule and help scan faster when the hero is followed by a small stats rail that frames urgency before the main workflow panels.
- 2026-03-17: Profile feels more cohesive with the redesigned shell when the first screen summarizes status, role, and combat identity before dropping into notifications, permissions, and account tables.
- 2026-03-17: Shared state language becomes more convincing when route-specific empty branches stop improvising custom chrome and instead feed into the same EmptyState badge, spacing, and CTA row.
- 2026-03-17: T16 is safest when it focuses on newly introduced summary and CTA copy; broad translation rewrites would create unnecessary risk outside the redesign scope.
- 2026-03-17: T17 coverage goes farther when it protects one happy/fallback slice per module family instead of trying to snapshot every redesigned screen wholesale.
- 2026-03-17: Next app routes must keep nonstandard action names private because exporting them breaks generated `.next/types` even when the logic itself is valid.
- 2026-03-17: F4 reruns should treat generated `apps/portal-vinext/node_modules/.vite/**` churn as scope noise that must be cleaned before final handoff, otherwise fidelity checks produce false negatives.
