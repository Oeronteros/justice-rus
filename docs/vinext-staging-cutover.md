# Vinext staging cutover

## Что уже встроено

- `Next` остаётся главным входом и проксирует маршруты в `vinext` через rewrites из `next.config.ts`.
- Правила cutover собираются helper'ом `lib/platform/vinext-cutover.ts`.
- Включение и откат идут только через env vars, без правок кода.

## Переменные окружения

```env
VINEXT_CUTOVER_SCOPE=off|pilot|wave2|all
VINEXT_CUTOVER_ORIGIN=https://your-vinext-preview.example.com
```

### Режимы

- `off` — весь трафик остаётся на `Next`
- `pilot` — `vinext` забирает `/news`, `/help`, `/guides`
- `wave2` — добавляет `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`
- `all` — финальный целевой scope по манифесту `docs/vinext-route-parity.md`

### Семантика `all` на текущем этапе

- Целевая карта `all`: `/`, `/about`, `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`, `/analytics`, `/workflow`, `/integrations`.
- Пока Vinext route-файлы есть только для `/news`, `/help`, `/guides`, `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`.
- Поэтому при `VINEXT_CUTOVER_SCOPE=all` rewrites включаются только для parity-ready маршрутов, а `/`, `/about`, `/analytics`, `/workflow`, `/integrations` остаются на Next до закрытия блокеров.

## Команды-подсказки

Вывести готовый env bundle:

```bash
npm run cutover:env:pilot
npm run cutover:env:wave2
npm run cutover:env:off
```

Проверить, какие rewrites включатся при текущем env:

```bash
VINEXT_CUTOVER_SCOPE=all VINEXT_CUTOVER_ORIGIN=https://vinext-preview.example.com npm run cutover:verify
```

## Preview / staging rollout

1. Задеплойте `vinext` отдельно и получите preview origin.
2. В preview/staging env для `Next` задайте:

```env
VINEXT_CUTOVER_SCOPE=pilot
VINEXT_CUTOVER_ORIGIN=https://vinext-preview.example.com
```

3. Пересоберите preview deployment `Next`.
4. Прогоните smoke на `/news`, `/help`, `/guides`.
5. Если pilot стабилен, переключите scope на `wave2` и повторите smoke.
6. Перед включением `all` сверяйтесь с `docs/vinext-route-parity.md`: blocked-маршруты не должны насильно переводиться на Vinext до появления route-файлов.

## Быстрый rollback

Самый быстрый откат:

```env
VINEXT_CUTOVER_SCOPE=off
VINEXT_CUTOVER_ORIGIN=
```

После этого redeploy `Next` полностью возвращает владение маршрутами legacy-контуру.

Быстрый rollback командой:

```bash
npm run cutover:env:off
```

## Что smoke-ить после переключения

- `/news`
- `/help`
- `/guides`
- `/profile`
- `/absences`
- `/pvp`
- `/schedule`
- `/calendar`
- logout / auth shell
- навигацию между `Next` и `vinext` route-prefix'ами
