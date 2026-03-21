# Member Routes Migration - Requirements

## Overview
Migrate member-facing routes (profile, absences, pvp) to Vinext with first-version personalization.

## Routes to Migrate
- `/profile` - User profile with personalization
- `/absences` - Absence request management
- `/pvp` - PvP session registration and statistics

## Personalization Features
- Editable titles and prefixes
- Class selection (multi-select)
- Interests selection
- Notification preferences
- Recommendation tags based on profile data

## Requirements

### Profile
- User can edit their title and prefix
- User can select their game classes
- User can set interests
- User can configure notification preferences
- Recommendations are derived from profile interests/classes (heuristic, not ML)

### Absences
- Existing absence request flows preserved
- Role/permission behavior maintained

### PvP
- Existing PvP registration/statistics preserved
- Role/permission behavior maintained

## Constraints
- Do not invent new account roles
- Do not create ranking formulas
- No irreversible schema changes outside existing contracts
- Use existing React Query patterns
- Use StyleX for styling in Vinext

## Acceptance Criteria
- [ ] /profile renders in Vinext with personalization fields
- [ ] /absences renders in Vinext with existing behavior
- [ ] /pvp renders in Vinext with existing behavior
- [ ] Profile personalization persists successfully
- [ ] Recommendation tags visible based on interests/classes
- [ ] Role/permission behavior preserved