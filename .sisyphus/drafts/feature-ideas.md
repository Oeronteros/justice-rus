# Draft: Feature Ideas

## Requirements (confirmed)
- Request: user asked what features could be added to the project.
- Goal: identify useful next features based on current product capabilities.
- Preference: recommendations should cover the whole product, not a single module.
- Priority: large features with visible product impact, not quick wins.
- Desired outcome: improvements should cover both officer operations and member experience.
- Selection principle: choose the most powerful feature even if implementation is harder.
- Chosen direction: a general system for the whole guild, not an officer-only tool.
- Main entry point: a shared guild dashboard.
- Primary first-screen focus: live guild status right now.

## Technical Decisions
- Approach: inspect the current codebase first, then suggest scoped feature ideas instead of generic brainstorming.
- Product recommendation: evolve the portal toward a guild-wide operating dashboard that unifies schedule, help, absences, roster, PvP, news, and profile signals.

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
- Which live-status signals are mandatory on the first screen: upcoming events, active help requests, attendance/readiness, absences, PvP queue/matches, announcements?

## Scope Boundaries
- INCLUDE: feature discovery, prioritization suggestions, follow-up questions.
- EXCLUDE: implementation, code changes, work plan generation unless the user asks for a plan.
