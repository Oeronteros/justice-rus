# Product: Justice Mobile Guild Portal

A web portal for managing the Silent Moonfall guild in Justice Mobile. The portal serves as a central hub for guild members and officers with the following capabilities:

## For Members
- Event scheduling with RSVP system (Go/Not Go/Possible)
- Personal dashboard for profile, activity, and account management
- Help requests and assistance system
- Absence applications
- PvP session registration, statistics, and rankings
- Guild guides and knowledge base
- News and announcements
- Full mobile support

## For Officers
- Analytics dashboard (attendance heatmap, class composition, trends, officer workload)
- Automation features (auto-approval of absences, auto-closure of help requests, response templates)
- Notification system with toast alerts
- Integration capabilities (Discord bot, Google Sheets, WoW API)

## Technical Context
- Hybrid architecture: Next.js handles UI, auth, server-side APIs, and some business logic
- Discord Bot API serves as external data source and integration layer
- PostgreSQL/Neon is the primary database for read-models, admin operations, RSVP, help, PvP, and reference data
- Path-based cutover system for gradual migration from Next.js to vinext (Vite-based RSC framework)
