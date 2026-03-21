# Technology Stack

## Core Framework
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

## Build & Development
- **Vite 8** - Through vinext for the vinext pilot app
- **vinext 0.0.29** - Vite-based RSC framework for migration target

## Styling
- **styled-components 6.3.11** - CSS-in-JS
- **@stylexjs/stylex 0.18.1** - Facebook's CSS-in-JS (configured in Next.js config)

## Data & API
- **PostgreSQL / Neon** - Primary database
- **@tanstack/react-query 5.90.16** - Client-side data fetching
- **@hey-api/openapi-ts** - OpenAPI client generation

## Forms & Validation
- **react-hook-form 7.70.0** - Form management
- **zod 3.23.8** - Schema validation
- **@hookform/resolvers 5.2.2** - Zod-HookForm integration

## UI Components
- **motion (Framer Motion 12.36.0)** - Animations
- **chart.js 4.5.1** + **react-chartjs-2 5.3.1** - Charts
- **@milkdown/kit 7.19.0** - Markdown editor

## Testing
- **vitest 4.0.16** - Unit/integration testing
- **@playwright/test 1.58.2** - E2E testing
- **axe-core 4.11.1** - Accessibility testing
- **@testing-library/react 16.3.1** - React testing utilities
- **fast-check 4.5.3** - Property-based testing

## Deployment
- **Vercel** - Primary deployment platform
- **Cloudflare Tunnel** - Recommended for local dev with external services

## Common Commands

```bash
# Development
npm run dev                    # Start Next.js dev server
npm run dev:vinext            # Start vinext dev server (port 3101)
npm run dev:cutover:pilot     # Dual runtime with pilot routes
npm run dev:cutover:wave2     # Dual runtime with wave2 routes
npm run dev:cutover:all       # Dual runtime with all routes

# Build & Start
npm run build                 # Production build (includes prepare-build script)
npm run start                 # Start production server

# Quality Gates
npm run validate              # Full validation: guardrails + lint + test + e2e + build + type-check
npm run guardrails            # Check A-level guardrails
npm run lint                  # ESLint
npm run type-check            # TypeScript check
npm run test                  # Vitest unit/integration tests
npm run test:e2e              # Playwright E2E tests
npm run test:e2e:vinext       # Playwright tests for vinext
npm run test:watch            # Vitest watch mode
npm run test:coverage         # Test coverage report
npm run perf:smoke            # Production build smoke check

# Other
npm run codegen               # Generate OpenAPI client
npm run react:doctor          # React analysis
```

## Environment Variables

### Required
- `JWT_SECRET` - JWT signing secret
- `DISCORD_BOT_API_URL` or `BOT_API_URL` - Discord bot API endpoint
- `DISCORD_BOT_API_KEY` or `BOT_API_KEY` - Discord bot API key (if protected)
- `DATABASE_URL` - PostgreSQL connection string (if bot writes to DB)

### Optional
- `OFFICER_PIN` - Officer PIN fallback
- `GM_PIN` - GM PIN fallback

### Cutover Configuration
- `VINEXT_CUTOVER_SCOPE` - Route cutover scope: off, pilot, wave2, all
- `VINEXT_CUTOVER_ORIGIN` - Vinext server origin for rewrites
