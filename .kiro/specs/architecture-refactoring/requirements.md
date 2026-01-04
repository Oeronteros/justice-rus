# Requirements Document

## Introduction

Комплексный рефакторинг архитектуры веб-портала Justice Mobile Guild Portal. Цель — улучшить поддерживаемость, производительность и масштабируемость кодовой базы через внедрение современных паттернов и инструментов.

## Glossary

- **Portal**: Веб-приложение Justice Mobile Guild Portal на Next.js
- **Section**: Функциональный раздел портала (Registration, Schedule, Guides, etc.)
- **API_Client**: Модуль для взаимодействия с Discord Bot API
- **Query_Cache**: Система кэширования и управления серверным состоянием
- **Form_Manager**: Система управления формами и валидацией
- **Error_Boundary**: React-компонент для перехвата и обработки ошибок
- **i18n_System**: Система интернационализации для поддержки нескольких языков

## Requirements

### Requirement 1: State Management с React Query

**User Story:** As a developer, I want to use React Query for server state management, so that I can eliminate boilerplate code and get automatic caching, refetching, and error handling.

#### Acceptance Criteria

1. WHEN the Portal loads, THE Query_Cache SHALL be initialized with default configuration
2. WHEN a Section requests data, THE Query_Cache SHALL return cached data if available and not stale
3. WHEN cached data is stale, THE Query_Cache SHALL automatically refetch in the background
4. WHEN multiple components request the same data, THE Query_Cache SHALL deduplicate requests
5. WHEN a request fails, THE Query_Cache SHALL retry up to 3 times with exponential backoff
6. WHEN data is mutated, THE Query_Cache SHALL invalidate related queries automatically

### Requirement 2: Unified API Client

**User Story:** As a developer, I want a single, typed API client, so that all API calls are consistent and type-safe.

#### Acceptance Criteria

1. THE API_Client SHALL provide typed methods for all Discord Bot API endpoints
2. WHEN an API method is called, THE API_Client SHALL include authentication credentials
3. WHEN an API response is received, THE API_Client SHALL validate it against expected types
4. IF an API request fails, THEN THE API_Client SHALL throw a typed error with details
5. THE API_Client SHALL support both query (GET) and mutation (POST/PUT/DELETE) operations

### Requirement 3: Component Decomposition

**User Story:** As a developer, I want smaller, focused components, so that the codebase is easier to understand, test, and maintain.

#### Acceptance Criteria

1. WHEN a Section component exceeds 300 lines, THE Portal SHALL split it into smaller sub-components
2. THE GuidesSection SHALL be decomposed into GuidesList, GuideModal, and GuideEditor components
3. WHEN business logic is reusable, THE Portal SHALL extract it into custom hooks
4. WHEN UI patterns repeat, THE Portal SHALL extract them into shared components

### Requirement 4: Form Management with React Hook Form

**User Story:** As a developer, I want declarative form handling with validation, so that forms are easier to build and maintain.

#### Acceptance Criteria

1. WHEN a form is rendered, THE Form_Manager SHALL handle all input state automatically
2. WHEN a user submits a form, THE Form_Manager SHALL validate all fields against Zod schemas
3. IF validation fails, THEN THE Form_Manager SHALL display field-specific error messages
4. WHEN a form is submitted successfully, THE Form_Manager SHALL reset to initial state
5. THE Form_Manager SHALL support async validation for server-side checks

### Requirement 5: Error Boundaries

**User Story:** As a user, I want the application to gracefully handle errors, so that one broken section doesn't crash the entire portal.

#### Acceptance Criteria

1. WHEN a Section throws an error, THE Error_Boundary SHALL catch it and display a fallback UI
2. WHEN an error is caught, THE Error_Boundary SHALL log error details for debugging
3. THE Error_Boundary SHALL provide a "retry" button to attempt recovery
4. WHEN a user clicks retry, THE Error_Boundary SHALL reset and re-render the Section

### Requirement 6: Internationalization

**User Story:** As a user, I want the portal in my preferred language, so that I can understand all content.

#### Acceptance Criteria

1. THE i18n_System SHALL support Russian (ru) and English (en) languages
2. WHEN a user changes language, THE i18n_System SHALL update all visible text immediately
3. THE i18n_System SHALL persist language preference in localStorage
4. WHEN the Portal loads, THE i18n_System SHALL restore the saved language preference
5. THE i18n_System SHALL provide a centralized translation file for each language

### Requirement 7: Type System Cleanup

**User Story:** As a developer, I want clean, non-redundant types, so that the type system accurately reflects the domain model.

#### Acceptance Criteria

1. THE Portal SHALL remove all deprecated type aliases (Member, Activity, MemberRank, MemberStatus)
2. THE Portal SHALL use consistent naming conventions for all types
3. WHEN API responses are received, THE Portal SHALL validate them with Zod schemas
4. THE Portal SHALL generate TypeScript types from Zod schemas where applicable
