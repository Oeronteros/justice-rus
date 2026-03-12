# Draft: Feature Ideas

## Requirements (confirmed)
- Request: user asked what features could be added to the project.
- Goal: identify useful next features based on current product capabilities.

## Technical Decisions
- Approach: inspect the current codebase first, then suggest scoped feature ideas instead of generic brainstorming.

## Research Findings
- Product: guild management portal for Justice Mobile with Next.js frontend, JWT auth, and Discord-bot-backed data flow.
- Current feature areas confirmed in code:
  - Schedule management with multilingual event editing and countdown logic.
  - Guides/knowledge base with markdown editor, comments, voting, and modal/detail flow.
  - Help board with request creation, responder RSVPs, status/time-range updates.
  - Roster/registration management with filters, readiness stats, and officer-editable column labels.
  - PvP queue and result reporting.
  - Absence requests with approval flow.
  - News feed sourced from Discord content and normalized for portal display.
  - Profile/account area with role visibility, account activation, and registration stat updates.
- Structural gaps observed:
  - Several API folders are present but empty: `app/api/activity`, `app/api/absences`, `app/api/guides`, `app/api/google-proxy`, `app/api/members`.
  - Product appears strong on operational modules but lighter on analytics, notifications, discovery/search, and cross-module automation.

## Open Questions
- Which area matters most to the user: member operations, guides/content, scheduling, PvP, or admin tooling?
- Is the priority quick wins or larger product bets?
- Should recommendations lean more toward guild leadership workflows or regular member experience?

## Scope Boundaries
- INCLUDE: feature discovery, prioritization suggestions, follow-up questions.
- EXCLUDE: implementation, code changes, work plan generation unless the user asks for a plan.
