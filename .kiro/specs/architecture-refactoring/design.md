# Design Document: Architecture Refactoring

## Overview

Этот документ описывает архитектурные решения для рефакторинга Justice Mobile Guild Portal. Основные изменения включают внедрение React Query для управления состоянием, унификацию API-клиента, декомпозицию компонентов, улучшение форм и обработки ошибок.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js App                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Sections  │  │   Shared    │  │   Modals    │   UI Layer   │
│  │  Components │  │  Components │  │             │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│  ┌──────┴────────────────┴────────────────┴──────┐              │
│  │              Custom Hooks Layer               │              │
│  │  useGuides, useRegistrations, useSchedule...  │              │
│  └──────────────────────┬───────────────────────┘              │
│                         │                                        │
│  ┌──────────────────────┴───────────────────────┐              │
│  │            React Query (TanStack Query)       │  State Layer │
│  │         QueryClient + QueryClientProvider     │              │
│  └──────────────────────┬───────────────────────┘              │
│                         │                                        │
│  ┌──────────────────────┴───────────────────────┐              │
│  │              Unified API Client               │  API Layer   │
│  │         lib/api/*.ts + Zod Schemas            │              │
│  └──────────────────────┬───────────────────────┘              │
│                         │                                        │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Discord Bot API     │
              │   (External Service)  │
              └───────────────────────┘
```

### Directory Structure

```
lib/
├── api/
│   ├── client.ts          # Base fetch wrapper
│   ├── guides.ts          # Guides API methods
│   ├── registrations.ts   # Registrations API methods
│   ├── schedule.ts        # Schedule API methods
│   ├── news.ts            # News API methods
│   ├── absences.ts        # Absences API methods
│   └── index.ts           # Re-exports
├── hooks/
│   ├── useGuides.ts       # Guides query hooks
│   ├── useRegistrations.ts
│   ├── useSchedule.ts
│   ├── useNews.ts
│   ├── useAbsences.ts
│   └── index.ts
├── schemas/
│   ├── guide.ts           # Zod schemas for guides
│   ├── registration.ts
│   ├── schedule.ts
│   ├── news.ts
│   ├── absence.ts
│   └── index.ts
├── i18n/
│   ├── translations/
│   │   ├── ru.ts
│   │   └── en.ts
│   ├── context.tsx
│   └── index.ts
└── providers/
    ├── QueryProvider.tsx
    └── I18nProvider.tsx

components/
├── sections/
│   ├── guides/
│   │   ├── GuidesList.tsx
│   │   ├── GuideCard.tsx
│   │   ├── GuideModal.tsx
│   │   ├── GuideEditor.tsx
│   │   ├── GuideComments.tsx
│   │   └── index.tsx      # GuidesSection (orchestrator)
│   ├── registration/
│   │   ├── RegistrationTable.tsx
│   │   ├── RegistrationFilters.tsx
│   │   ├── RegistrationStats.tsx
│   │   └── index.tsx
│   └── ...
├── shared/
│   ├── ErrorBoundary.tsx
│   ├── LoadingState.tsx
│   ├── EmptyState.tsx
│   └── ...
└── forms/
    ├── GuideForm.tsx
    ├── CommentForm.tsx
    └── ...
```

## Components and Interfaces

### QueryProvider

```typescript
// lib/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,        // 10 minutes (formerly cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### API Client

```typescript
// lib/api/client.ts
import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  schema?: z.ZodType<T>
): Promise<T> {
  const response = await fetch(`/api/${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.message || `HTTP ${response.status}`,
      response.status,
      error.code
    );
  }

  const data = await response.json();
  
  if (schema) {
    return schema.parse(data);
  }
  
  return data as T;
}

export const api = {
  get: <T>(endpoint: string, schema?: z.ZodType<T>) => 
    request<T>(endpoint, { method: 'GET' }, schema),
    
  post: <T>(endpoint: string, body: unknown, schema?: z.ZodType<T>) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, schema),
    
  put: <T>(endpoint: string, body: unknown, schema?: z.ZodType<T>) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }, schema),
    
  delete: <T>(endpoint: string, schema?: z.ZodType<T>) =>
    request<T>(endpoint, { method: 'DELETE' }, schema),
};
```

### Custom Hooks Example

```typescript
// lib/hooks/useGuides.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { guidesApi } from '@/lib/api/guides';
import type { GuideSummary, GuideDetail, CreateGuideDto } from '@/lib/schemas/guide';

export const guideKeys = {
  all: ['guides'] as const,
  lists: () => [...guideKeys.all, 'list'] as const,
  list: (filters: string) => [...guideKeys.lists(), { filters }] as const,
  details: () => [...guideKeys.all, 'detail'] as const,
  detail: (id: string) => [...guideKeys.details(), id] as const,
};

export function useGuides() {
  return useQuery({
    queryKey: guideKeys.lists(),
    queryFn: guidesApi.list,
  });
}

export function useGuide(id: string, voterKey: string) {
  return useQuery({
    queryKey: guideKeys.detail(id),
    queryFn: () => guidesApi.get(id, voterKey),
    enabled: !!id,
  });
}

export function useCreateGuide() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateGuideDto) => guidesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}

export function useVoteGuide() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, voterKey }: { id: string; voterKey: string }) => 
      guidesApi.vote(id, voterKey),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: guideKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
    },
  });
}
```

### Error Boundary

```typescript
// components/shared/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorFallback 
          error={this.state.error} 
          onRetry={this.handleRetry} 
        />
      );
    }
    return this.props.children;
  }
}
```

### Form with React Hook Form + Zod

```typescript
// components/forms/GuideForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGuideSchema, type CreateGuideDto } from '@/lib/schemas/guide';

interface GuideFormProps {
  onSubmit: (data: CreateGuideDto) => Promise<void>;
  onCancel: () => void;
}

export function GuideForm({ onSubmit, onCancel }: GuideFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateGuideDto>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'general',
      author: '',
    },
  });

  const handleFormSubmit = async (data: CreateGuideDto) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input {...register('title')} placeholder="Название" />
      {errors.title && <span>{errors.title.message}</span>}
      
      <textarea {...register('content')} placeholder="Содержание" />
      {errors.content && <span>{errors.content.message}</span>}
      
      <select {...register('category')}>
        <option value="general">General</option>
        <option value="pve">PvE</option>
        <option value="pvp">PvP</option>
      </select>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Сохранение...' : 'Опубликовать'}
      </button>
      <button type="button" onClick={onCancel}>Отмена</button>
    </form>
  );
}
```

## Data Models

### Zod Schemas

```typescript
// lib/schemas/guide.ts
import { z } from 'zod';

export const guideSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  author: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  votes: z.number(),
  commentsCount: z.number(),
});

export const guideCommentSchema = z.object({
  id: z.string(),
  author: z.string(),
  comment: z.string(),
  createdAt: z.string(),
});

export const guideDetailSchema = z.object({
  guide: z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    category: z.string(),
    author: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  votes: z.number(),
  voted: z.boolean(),
  comments: z.array(guideCommentSchema),
});

export const createGuideSchema = z.object({
  title: z.string().min(1, 'Название обязательно').max(200),
  content: z.string().min(10, 'Минимум 10 символов').max(500000),
  category: z.enum(['general', 'pve', 'pvp', 'build', 'farm', 'craft', 'training']),
  author: z.string().max(100).optional(),
});

// Inferred types
export type GuideSummary = z.infer<typeof guideSummarySchema>;
export type GuideComment = z.infer<typeof guideCommentSchema>;
export type GuideDetail = z.infer<typeof guideDetailSchema>;
export type CreateGuideDto = z.infer<typeof createGuideSchema>;
```

### i18n Structure

```typescript
// lib/i18n/translations/ru.ts
export const ru = {
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    retry: 'Повторить',
    cancel: 'Отмена',
    save: 'Сохранить',
    delete: 'Удалить',
  },
  guides: {
    title: 'Гайды ордена',
    subtitle: 'Пиши свитки. Оценивай печатью. Обсуждай.',
    create: 'Написать гайд',
    search: 'Поиск по названию/автору...',
    empty: 'Ничего не найдено',
    categories: {
      all: 'Все',
      general: 'Общее',
      pve: 'PvE',
      pvp: 'PvP',
      build: 'Билды',
      farm: 'Фарм',
      craft: 'Крафт',
      training: 'Тренировки',
    },
  },
  registration: {
    title: 'Реестр Культа',
    subtitle: 'Состав ордена, ранги и клятвы каждого.',
    total: 'Всего в ордене',
    active: 'В строю',
    avgKpi: 'Средний KPI',
  },
  // ... more translations
};

export type Translations = typeof ru;
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Query Cache Deduplication

*For any* query key requested by N components simultaneously, THE Query_Cache SHALL make exactly 1 network request and return the same data to all N components.

**Validates: Requirements 1.2, 1.4**

### Property 2: Cache Invalidation on Mutation

*For any* mutation that modifies data, THE Query_Cache SHALL mark all related queries as stale, causing them to refetch on next access.

**Validates: Requirements 1.6**

### Property 3: API Client Credential Inclusion

*For any* API request made through the API_Client, the request SHALL include `credentials: 'include'` header.

**Validates: Requirements 2.2**

### Property 4: API Response Validation

*For any* API response received, if a Zod schema is provided, THE API_Client SHALL validate the response and throw ZodError if validation fails.

**Validates: Requirements 2.3**

### Property 5: API Error Typing

*For any* failed API request, THE API_Client SHALL throw an ApiError with status code and message properties.

**Validates: Requirements 2.4**

### Property 6: Form Validation on Submit

*For any* form submission, THE Form_Manager SHALL validate all fields against the Zod schema before calling onSubmit.

**Validates: Requirements 4.2**

### Property 7: Form Error Display

*For any* field that fails validation, THE Form_Manager SHALL display the corresponding error message from the Zod schema.

**Validates: Requirements 4.3**

### Property 8: Form Reset on Success

*For any* successful form submission, THE Form_Manager SHALL reset all fields to their default values.

**Validates: Requirements 4.4**

### Property 9: Error Boundary Catch

*For any* error thrown within an Error_Boundary's children, THE Error_Boundary SHALL catch it and render the fallback UI instead of crashing.

**Validates: Requirements 5.1**

### Property 10: Error Boundary Logging

*For any* error caught by Error_Boundary, THE Error_Boundary SHALL call console.error with error details.

**Validates: Requirements 5.2**

### Property 11: Language Persistence

*For any* language change, THE i18n_System SHALL persist the new language to localStorage immediately.

**Validates: Requirements 6.3**

### Property 12: Language Restoration

*For any* Portal load where localStorage contains a valid language preference, THE i18n_System SHALL use that language.

**Validates: Requirements 6.4**

## Error Handling

### API Errors

```typescript
// Centralized error handling
export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401: return 'Требуется авторизация';
      case 403: return 'Доступ запрещён';
      case 404: return 'Не найдено';
      case 500: return 'Ошибка сервера';
      default: return error.message;
    }
  }
  if (error instanceof z.ZodError) {
    return 'Некорректные данные от сервера';
  }
  return 'Неизвестная ошибка';
}
```

### Query Error Handling

```typescript
// In hooks
export function useGuides() {
  return useQuery({
    queryKey: guideKeys.lists(),
    queryFn: guidesApi.list,
    meta: {
      errorMessage: 'Не удалось загрузить гайды',
    },
  });
}

// Global error handler
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        console.error('Query error:', error);
      },
    },
  },
});
```

## Testing Strategy

### Unit Tests

- Test Zod schemas with valid and invalid data
- Test API client error handling
- Test form validation logic
- Test i18n translation lookups

### Property-Based Tests

Using `fast-check` library:

1. **Query Cache Deduplication** - Generate random query keys, verify single request
2. **API Credential Inclusion** - Generate random endpoints, verify credentials present
3. **API Response Validation** - Generate random responses, verify Zod validation
4. **Form Validation** - Generate random form data, verify validation behavior
5. **Error Boundary Catch** - Generate random errors, verify catch behavior
6. **Language Persistence** - Generate random language switches, verify localStorage

### Integration Tests

- Test full flow: load guides → create guide → verify in list
- Test error boundary recovery
- Test language switching across components

### Test Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

Each property test should run minimum 100 iterations to ensure coverage of edge cases.
