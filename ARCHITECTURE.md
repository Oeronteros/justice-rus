# Архитектура системы

## Коротко

Портал больше не является только `API Proxy` для Discord-бота. Текущая архитектура гибридная:

- `Next.js` обслуживает UI, аутентификацию, серверные API routes и часть бизнес-логики.
- `Discord Bot API` остается внешним источником и интеграционным слоем для тех сценариев, где данные или события идут из Discord.
- `PostgreSQL` используется напрямую самим порталом для read-model, административных операций, RSVP, помощи, PvP и части справочных данных.

## Схема взаимодействия

```text
┌─────────────┐         ┌──────────────┐
│   Browser   │ ──────> │   Next.js     │
│             │ <────── │  app/api/*    │
└─────────────┘         └──────┬───────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
                v                               v
         ┌──────────────┐                ┌─────────────┐
         │ Discord Bot  │                │ PostgreSQL  │
         │   API        │                │  / Neon     │
         └──────────────┘                └─────────────┘
```

## Основные слои

### 1. UI и App Router

- `app/` - маршруты, layout, server/client pages
- `components/` - shell, sections, forms, shared UI
- `lib/*/hooks.ts` - клиентский data access через React Query

### 2. API и политики доступа

- `app/api/*` - transport layer для HTTP
- `lib/server/route-helpers.ts` - общие guard-функции, same-origin проверки, DB-backed session validation, JSON parsing и error envelope
- `lib/server/auth-session.ts` - серверная проверка JWT + активного состояния аккаунта, включая pre-query валидацию DB-backed account id

### 3. Доменные серверные модули

Критичная логика вынесена из route handlers в `lib/server/*`:

- `lib/server/help/*` - помощь, responders, schema bootstrap
- `lib/server/schedule/*` - серверные операции по расписанию
- `lib/server/news/*` - новости и Discord publish flow
- `lib/server/analytics/*` - аналитика состава
- `lib/server/pvp/*` - PvP очередь, матчи, рейтинги, разделенные на schema / actors / state / mutations / rate-limit / errors
- `lib/server/registration/*` - registrations, read-model, sync и write-операции

### 3.1. I18n как отдельный слой

- `lib/i18n/context.tsx` - runtime provider и persistence языка
- `lib/i18n/translations/*` - feature copy для экранов и форм
- `lib/i18n/copy.ts` - shell/navigation/portal source-of-truth
- `lib/i18n.ts` - compatibility re-export для существующих импортов

### 4. Read-model и process-local cache

Портал использует собственные read-model и коалесцирующий cache слой:

- `lib/server/read-models/news.ts`
- `lib/server/read-models/schedule.ts`
- `lib/server/registration/read-model.ts`
- `lib/server/db-cache.ts`

Это позволяет:

- читать данные из БД напрямую без постоянной нагрузки на источник
- переживать краткие ошибки sync-процесса через stale snapshot
- обновлять read-model после write-операций

## Где все еще используется Discord Bot API

Discord-бот остается важным интеграционным звеном, но уже не единственным источником истины:

- `app/api/discord-proxy/*` - прокси/совместимость для внешних bot endpoints
- `lib/server/read-models/news.ts` и `lib/server/read-models/schedule.ts` - fallback/sync из bot API
- `app/api/news/route.ts` / `lib/server/news/service.ts` - публикация новости в Discord
- `app/api/integrations/discord/route.ts` - управление интеграционными настройками

## Потоки данных

### Чтение

1. Браузер вызывает `app/api/*`
2. Route проходит через session/origin guards
3. Route вызывает `lib/server/<domain>/*`
4. Модуль читает из:
   - read-model / БД напрямую, если данные локально доступны
   - Discord Bot API, если это интеграционный или fallback-сценарий

### Запись

1. Браузер отправляет запрос в `app/api/*`
2. Route применяет `requireSameOrigin()` и `requireActiveSession()`
3. Route парсит payload через общую schema
4. Серверный доменный модуль выполняет DB write / orchestration
5. Если нужно, обновляется read-model или вызывается Discord Bot API

## Почему это лучше старой proxy-only схемы

✅ Меньше дублирования логики в route handlers
✅ Быстрее чтение за счет локальных read-model
✅ Портал умеет сам enforce-ить активность аккаунта и роль
✅ Внешние Discord integration flows не смешаны с основным доменным transport слоем

## Что считать текущим architectural baseline

Если добавляется новый API endpoint, ожидаемый путь такой:

1. thin route в `app/api/.../route.ts`
2. guards и parsing через `lib/server/route-helpers.ts`
3. orchestration в `lib/server/<domain>/*`
4. DTO/validation в `lib/schemas/*`
5. тесты на helper/route/service поведение

## Связанные документы

- `README.md` - запуск и quality gate
- `SECURITY.md` - trust boundaries и security defaults
- `PERFORMANCE.md` - cache и perf strategy
- `docs/discord-bot-integration.md` - детали bot-side интеграции
- `docs/hotspot-refactor-seams.md` - зафиксированные split points для крупных hotspot-модулей
