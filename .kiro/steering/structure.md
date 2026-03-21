# Project Structure

```
/
├── app/                          # Next.js App Router
│   ├── (portal)/                 # Portal routes (authenticated)
│   ├── api/                      # API routes (thin transport layer)
│   ├── calculator/               # Calculator feature routes
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── manifest.ts               # PWA manifest
│
├── components/                   # UI components
│   ├── shell/                    # Layout shell, navigation, headers
│   ├── sections/                 # Feature sections
│   ├── forms/                    # Form components
│   └── ui/                       # Reusable UI primitives
│
├── lib/                          # Shared code
│   ├── api/                      # Client-side API wrappers
│   ├── auth/                     # Authentication helpers
│   ├── authz.ts                  # Authorization utilities
│   ├── classes.ts                # Class definitions
│   ├── constants.ts              # App constants
│   ├── db/                       # Database utilities
│   ├── discord/                  # Discord integration
│   ├── discord-api.ts            # Discord API client
│   ├── hooks/                    # Custom React hooks
│   ├── i18n/                     # Internationalization
│   │   ├── context.tsx           # i18n provider
│   │   ├── translations/         # Translation files
│   │   └── copy.ts               # Source of truth for UI text
│   ├── markdown.ts               # Markdown utilities
│   ├── nav.ts                    # Navigation utilities
│   ├── neon.ts                   # Neon database connection
│   ├── notifications/            # Notification system
│   ├── platform/                 # Platform-specific code
│   │   └── vinext-cutover.ts     # Route cutover logic
│   ├── providers/                # React providers (Query, i18n)
│   ├── schemas/                  # Zod schemas and DTOs
│   │   ├── index.ts              # Schema exports
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   ├── help.ts
│   │   ├── pvp.ts
│   │   ├── schedule.ts
│   │   └── ...                   # Domain-specific schemas
│   ├── server/                   # Server-side domain logic
│   │   ├── analytics/            # Analytics services
│   │   ├── auth/                 # Auth services
│   │   ├── help/                 # Help request services
│   │   ├── news/                 # News services
│   │   ├── pvp/                  # PvP services
│   │   ├── read-models/          # Read models and caching
│   │   ├── registration/         # Registration services
│   │   ├── schedule/             # Schedule services
│   │   ├── auth-session.ts       # Session validation
│   │   ├── cors.ts               # CORS utilities
│   │   ├── db-cache.ts           # Process-local cache
│   │   ├── error-payload.ts      # Error formatting
│   │   └── route-helpers.ts      # Route guards and helpers
│   ├── stylex/                   # StyleX utilities
│   ├── styled-components/        # Styled Components utilities
│   ├── theme/                    # Theme configuration
│   ├── ui/                       # UI primitives
│   ├── workflow/                 # Workflow utilities
│   └── utils.ts                  # General utilities
│
├── apps/                         # Monorepo apps
│   └── portal-vinext/            # Vinext migration target
│       └── package.json          # Vinext config
│
├── docs/                         # Documentation
├── tests/                        # Unit/integration tests
├── e2e/                          # Playwright E2E tests
├── scripts/                      # Build and dev scripts
├── public/                       # Static assets
├── types/                        # Global type definitions
│
├── .kiro/                        # Kiro configuration
│   └── steering/                 # Steering documents
├── .github/                      # GitHub workflows
├── .next/                        # Next.js build output
├── .opencode/                    # Claude-compatible config
├── .sisyphus/                    # Sisyphus CI/CD
│
├── .ai-factory.json              # AI factory config
├── .eslintrc.json                # ESLint config
├── .gitignore                    # Git ignore rules
├── .vercelignore                 # Vercel ignore rules
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── playwright.config.ts          # Playwright config
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Vitest configuration
├── ARCHITECTURE.md               # Architecture documentation
├── SECURITY.md                   # Security documentation
├── PERFORMANCE.md                # Performance documentation
├── README.md                     # Project overview
└── CHANGELOG.md                  # Version history
```

## Key Patterns

### API Routes
- Thin transport layer in `app/api/*/route.ts`
- Use `lib/server/route-helpers.ts` for guards and parsing
- Domain logic in `lib/server/<domain>/*`

### Server-Side Code
- Domain services in `lib/server/<domain>/*`
- Read models in `lib/server/read-models/*`
- Process-local cache in `lib/server/db-cache.ts`

### Schemas
- Zod schemas in `lib/schemas/*`
- DTOs and validation types
- Exported via `lib/schemas/index.ts`

### Styling
- Prefer `@stylexjs/stylex` for new components
- Use `styled-components` for existing components
- Global styles in `app/globals.css`

### Testing
- Unit/integration: `tests/` with vitest
- E2E: `e2e/` with Playwright
- Accessibility: axe-core in E2E tests
