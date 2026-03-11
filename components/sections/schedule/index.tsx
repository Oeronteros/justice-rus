'use client';

import { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useCreateSchedule, useSchedule, useUpdateSchedule } from '@/lib/schedule/hooks';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/lib/schemas/auth';
import type { Language } from '@/lib/i18n';
import { SectionHero } from '@/components/shared/SectionHero';
import { hasRoleAtLeast } from '@/lib/authz';
import type { Schedule as ScheduleItem } from '@/lib/schemas/schedule';

interface ScheduleSectionProps {
  user: User;
  language: Language;
}

// Парсим время из строки "HH:MM" или "HH:MM - HH:MM"
function parseTime(timeStr: string): { start: number; end: number } | null {
  if (!timeStr) return null;
  
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const start = hours * 60 + minutes;
  
  // Проверяем есть ли конечное время
  const endMatch = timeStr.match(/[-–]\s*(\d{1,2}):(\d{2})/);
  if (endMatch) {
    const endHours = parseInt(endMatch[1], 10);
    const endMinutes = parseInt(endMatch[2], 10);
    return { start, end: endHours * 60 + endMinutes };
  }
  
  // Если нет конечного времени, считаем что событие длится час
  return { start, end: start + 60 };
}

function formatCountdown(minutes: number, language: Language): string {
  if (minutes < 0) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const isRu = language === 'ru';
  const isZh = language === 'zh';
  
  if (hours > 0) {
    if (isRu) return `через ${hours}ч ${mins}м`;
    if (isZh) return `${hours}小时 ${mins}分后`;
    return `in ${hours}h ${mins}m`;
  }
  if (isRu) return `через ${mins}м`;
  if (isZh) return `${mins}分后`;
  return `in ${mins}m`;
}

type WeekdayConfig = {
  key: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  labels: Record<Language, string>;
  aliases: string[];
};

type ParsedScheduleItem = ScheduleItem & {
  parsedTime: { start: number; end: number } | null;
};

const recurringGroupAliases = {
  daily: ['daily', 'ежедневные', '每日'],
  weekly: ['weekly', 'еженедельные', '每周'],
};

const weekdays: WeekdayConfig[] = [
  {
    key: 'monday',
    labels: { ru: 'Понедельник', en: 'Monday', zh: '星期一' },
    aliases: ['понедельник', 'пн', 'monday', 'mon', '星期一', '周一', '1'],
  },
  {
    key: 'tuesday',
    labels: { ru: 'Вторник', en: 'Tuesday', zh: '星期二' },
    aliases: ['вторник', 'вт', 'tuesday', 'tue', 'tues', '星期二', '周二', '2'],
  },
  {
    key: 'wednesday',
    labels: { ru: 'Среда', en: 'Wednesday', zh: '星期三' },
    aliases: ['среда', 'ср', 'wednesday', 'wed', '星期三', '周三', '3'],
  },
  {
    key: 'thursday',
    labels: { ru: 'Четверг', en: 'Thursday', zh: '星期四' },
    aliases: ['четверг', 'чт', 'thursday', 'thu', 'thur', 'thurs', '星期四', '周四', '4'],
  },
  {
    key: 'friday',
    labels: { ru: 'Пятница', en: 'Friday', zh: '星期五' },
    aliases: ['пятница', 'пт', 'friday', 'fri', '星期五', '周五', '5'],
  },
  {
    key: 'saturday',
    labels: { ru: 'Суббота', en: 'Saturday', zh: '星期六' },
    aliases: ['суббота', 'сб', 'saturday', 'sat', '星期六', '周六', '6'],
  },
  {
    key: 'sunday',
    labels: { ru: 'Воскресенье', en: 'Sunday', zh: '星期日' },
    aliases: ['воскресенье', 'вс', 'sunday', 'sun', '星期日', '星期天', '周日', '周天', '7', '0'],
  },
];

function normalizeDayValue(value: string): string {
  return value.trim().toLowerCase().replace(/\u0451/g, '\u0435');
}

function getWeekdayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function getScheduleDayIndex(item: ScheduleItem): number | null {
  const normalized = normalizeDayValue(item.dayType || item.type || item.group || '');

  if (!normalized) {
    return null;
  }

  const matchIndex = weekdays.findIndex((weekday) =>
    weekday.aliases.some((alias) => normalized === normalizeDayValue(alias))
  );

  return matchIndex >= 0 ? matchIndex : null;
}

function isRecurringScheduleItem(item: ScheduleItem, kind: keyof typeof recurringGroupAliases): boolean {
  const values = [item.group, item.type, item.dayType]
    .filter((value): value is string => Boolean(value))
    .map((value) => normalizeDayValue(value));

  return values.some((value) =>
    recurringGroupAliases[kind].some((alias) => value === normalizeDayValue(alias))
  );
}

function getDisplayTitle(item: ScheduleItem, language: Language): string {
  if (language === 'zh') return item.titleZh || item.titleEn || item.titleRu || item.registration || '';
  if (language === 'en') return item.titleEn || item.titleRu || item.titleZh || item.registration || '';
  return item.titleRu || item.titleEn || item.titleZh || item.registration || '';
}

function getDisplayTime(item: ScheduleItem): string {
  return item.time || item.description || '\u2014';
}

// Цвета для групп
const groupColors: Record<string, string> = {
  'Общее': '#8fb9cc',
  'General': '#8fb9cc',
  'PvP': '#e57373',
  'PvE': '#81c784',
  'Рейды': '#ffb74d',
  'Raids': '#ffb74d',
  'Ивенты': '#ba68c8',
  'Events': '#ba68c8',
};

function getGroupColor(groupName: string): string {
  return groupColors[groupName] || '#8fb9cc';
}

type ScheduleEditDraft = {
  dayType: string;
  time: string;
  titleRu: string;
  titleEn: string;
  titleZh: string;
  orderIndex: string;
  active: boolean;
};

type ScheduleDraftField = 'dayType' | 'time' | 'titleRu' | 'titleEn';
type ScheduleDraftErrors = Partial<Record<ScheduleDraftField, string>>;

function toEditDraft(item: ScheduleItem): ScheduleEditDraft {
  return {
    dayType: item.dayType || item.type || '',
    time: item.time || item.description || '',
    titleRu: item.titleRu || item.registration || '',
    titleEn: item.titleEn || item.registration || '',
    titleZh: item.titleZh || '',
    orderIndex: String(item.orderIndex ?? 0),
    active: item.active ?? true,
  };
}

function createDefaultDraft(): ScheduleEditDraft {
  return {
    dayType: '',
    time: '',
    titleRu: '',
    titleEn: '',
    titleZh: '',
    orderIndex: '0',
    active: true,
  };
}

function normalizeClockValue(value: string): string {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    return value.trim();
  }

  return `${match[1].padStart(2, '0')}:${match[2]}`;
}

function isValidClockValue(value: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function extractTimeParts(value: string): { start: string; end: string } {
  const matches = [...value.matchAll(/(\d{1,2}:\d{2})/g)].map((match) => normalizeClockValue(match[1]));

  return {
    start: matches[0] || '',
    end: matches[1] || '',
  };
}

function buildTimeValue(start: string, end: string): string {
  const normalizedStart = normalizeClockValue(start);
  const normalizedEnd = normalizeClockValue(end);

  if (normalizedStart && normalizedEnd) {
    return `${normalizedStart} - ${normalizedEnd}`;
  }

  return normalizedStart;
}

function addMinutesToTime(start: string, minutes: number): string {
  if (!isValidClockValue(start)) {
    return '';
  }

  const [hoursString, minutesString] = start.split(':');
  const totalMinutes = Number(hoursString) * 60 + Number(minutesString) + minutes;
  const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function getDraftTimeError(time: string, language: Language): string | null {
  const trimmedTime = time.trim();

  if (!trimmedTime) {
    return null;
  }

  const { start, end } = extractTimeParts(trimmedTime);

  if (!start || !isValidClockValue(start)) {
    return language === 'ru'
      ? 'Укажи время в формате HH:MM'
      : language === 'zh'
        ? '请使用 HH:MM 时间格式'
        : 'Use HH:MM time format';
  }

  if (end) {
    if (!isValidClockValue(end)) {
      return language === 'ru'
        ? 'Время окончания должно быть в формате HH:MM'
        : language === 'zh'
          ? '结束时间必须使用 HH:MM 格式'
          : 'End time must use HH:MM format';
    }

    const parsed = parseTime(buildTimeValue(start, end));
    if (!parsed || parsed.end <= parsed.start) {
      return language === 'ru'
        ? 'Время окончания должно быть позже времени начала'
        : language === 'zh'
          ? '结束时间必须晚于开始时间'
          : 'End time must be later than start time';
    }
  }

  return null;
}

function validateDraft(draft: ScheduleEditDraft, language: Language): ScheduleDraftErrors {
  const errors: ScheduleDraftErrors = {};

  if (!draft.dayType.trim()) {
    errors.dayType = language === 'ru' ? 'Выбери день или тип повтора' : language === 'zh' ? '请选择日期或重复类型' : 'Choose a day or recurrence type';
  }

  const timeError = getDraftTimeError(draft.time, language);
  if (timeError) {
    errors.time = timeError;
  }

  if (!draft.titleRu.trim()) {
    errors.titleRu = language === 'ru' ? 'Добавь русское название' : language === 'zh' ? '请填写俄文标题' : 'Add a Russian title';
  }

  if (!draft.titleEn.trim()) {
    errors.titleEn = language === 'ru' ? 'Добавь английское название' : language === 'zh' ? '请填写英文标题' : 'Add an English title';
  }

  return errors;
}

function getRecurringAlias(kind: keyof typeof recurringGroupAliases, language: Language): string {
  if (language === 'ru') {
    return recurringGroupAliases[kind][1];
  }

  if (language === 'zh') {
    return recurringGroupAliases[kind][2];
  }

  return recurringGroupAliases[kind][0];
}

function getRecurrenceLabel(kind: keyof typeof recurringGroupAliases, language: Language): string {
  if (kind === 'daily') {
    return language === 'ru' ? 'Каждый день' : language === 'zh' ? '每天' : 'Daily';
  }

  return language === 'ru' ? 'Каждую неделю' : language === 'zh' ? '每周' : 'Weekly';
}

function ScheduleSectionContent({ user, language }: ScheduleSectionProps) {
  const { data: schedules = [], isLoading, error, refetch } = useSchedule(language);
  const updateSchedule = useUpdateSchedule();
  const createSchedule = useCreateSchedule();
  const [now, setNow] = useState(() => new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => getWeekdayIndex(new Date()));
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [editDraft, setEditDraft] = useState<ScheduleEditDraft | null>(null);
  const [scheduleNotice, setScheduleNotice] = useState<string | null>(null);
  const canEditSchedule = hasRoleAtLeast(user.role, 'officer');
  const selectedDay = weekdays[selectedDayIndex];
  const draftErrors = editDraft ? validateDraft(editDraft, language) : {};
  const hasDraftErrors = Object.keys(draftErrors).length > 0;

  const updateDraft = (patch: Partial<ScheduleEditDraft>) => {
    setEditDraft((current) => (current ? { ...current, ...patch } : current));
  };

  const updateDraftTime = (part: 'start' | 'end', value: string) => {
    setEditDraft((current) => {
      if (!current) {
        return current;
      }

      const timeParts = extractTimeParts(current.time);
      const nextParts = {
        ...timeParts,
        [part]: value,
      };

      return {
        ...current,
        time: buildTimeValue(nextParts.start, nextParts.end),
      };
    });
  };

  const applyDurationPreset = (minutes: number) => {
    setEditDraft((current) => {
      if (!current) {
        return current;
      }

      const { start } = extractTimeParts(current.time);
      if (!isValidClockValue(start)) {
        return current;
      }

      return {
        ...current,
        time: buildTimeValue(start, addMinutesToTime(start, minutes)),
      };
    });
  };

  const fillDraftTitlesFrom = (source: 'titleRu' | 'titleEn' | 'titleZh') => {
    setEditDraft((current) => {
      if (!current) {
        return current;
      }

      const sourceValue = current[source].trim();

      if (!sourceValue) {
        return current;
      }

      return {
        ...current,
        titleRu: current.titleRu.trim() ? current.titleRu : sourceValue,
        titleEn: current.titleEn.trim() ? current.titleEn : sourceValue,
        titleZh: current.titleZh.trim() ? current.titleZh : sourceValue,
      };
    });
  };

  const openEditor = (item: ScheduleItem) => {
    if (!item.id) return;
    setEditingSchedule(item);
    setEditDraft(toEditDraft(item));
    setScheduleNotice(null);
  };

  const openCreator = () => {
    const exactDayItemsCount = schedules.filter((item) => getScheduleDayIndex(item) === selectedDayIndex).length;
    setEditingSchedule(null);
    setEditDraft({
      ...createDefaultDraft(),
      dayType: selectedDay.labels[language],
      orderIndex: String(exactDayItemsCount),
    });
    setScheduleNotice(null);
  };

  const closeEditor = useCallback(() => {
    if (updateSchedule.isPending || createSchedule.isPending) return;
    setEditingSchedule(null);
    setEditDraft(null);
  }, [createSchedule.isPending, updateSchedule.isPending]);

  const archiveScheduleEdit = async () => {
    if (!editingSchedule?.id || !editDraft || updateSchedule.isPending || createSchedule.isPending) {
      return;
    }

    const shouldArchive = editDraft.active;
    const confirmed = window.confirm(
      shouldArchive
        ? language === 'ru'
          ? 'Архивировать это событие? Оно исчезнет из расписания, но данные сохранятся.'
          : language === 'zh'
            ? '要归档这个活动吗？它会从日程中隐藏，但数据会保留。'
            : 'Archive this event? It will disappear from the schedule, but the data will be kept.'
        : language === 'ru'
          ? 'Вернуть это событие в расписание?'
          : language === 'zh'
            ? '要将这个活动恢复到日程中吗？'
            : 'Restore this event to the schedule?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setScheduleNotice(null);
      await updateSchedule.mutateAsync({
        id: editingSchedule.id,
        dayType: editDraft.dayType.trim(),
        time: editDraft.time.trim(),
        titleRu: editDraft.titleRu.trim(),
        titleEn: editDraft.titleEn.trim(),
        titleZh: editDraft.titleZh.trim() || undefined,
        orderIndex: Math.max(0, Number(editDraft.orderIndex) || 0),
        active: !shouldArchive,
      });

      setScheduleNotice(
        shouldArchive
          ? language === 'ru'
            ? 'Событие отправлено в архив'
            : language === 'zh'
              ? '活动已归档'
              : 'Event archived'
          : language === 'ru'
            ? 'Событие возвращено в расписание'
            : language === 'zh'
              ? '活动已恢复到日程'
              : 'Event restored to the schedule'
      );

      closeEditor();
      void refetch();
    } catch (archiveError) {
      setScheduleNotice(
        archiveError instanceof Error
          ? archiveError.message
          : shouldArchive
            ? language === 'ru'
              ? 'Не удалось архивировать событие'
              : language === 'zh'
                ? '无法归档活动'
                : 'Failed to archive the event'
            : language === 'ru'
              ? 'Не удалось вернуть событие'
              : language === 'zh'
                ? '无法恢复活动'
                : 'Failed to restore the event'
      );
    }
  };

  const saveScheduleEdit = async () => {
    if (!editDraft) {
      return;
    }

    const errors = validateDraft(editDraft, language);
    if (Object.keys(errors).length > 0) {
      setScheduleNotice(language === 'ru' ? 'Заполни обязательные поля перед сохранением' : language === 'zh' ? '请先填写必填字段' : 'Fill in the required fields before saving');
      return;
    }

    try {
      setScheduleNotice(null);
      const basePayload = {
        dayType: editDraft.dayType.trim(),
        time: editDraft.time.trim(),
        titleRu: editDraft.titleRu.trim(),
        titleEn: editDraft.titleEn.trim(),
        titleZh: editDraft.titleZh.trim() || undefined,
        orderIndex: Math.max(0, Number(editDraft.orderIndex) || 0),
        active: editDraft.active,
      };

      if (editingSchedule?.id) {
        await updateSchedule.mutateAsync({
          id: editingSchedule.id,
          ...basePayload,
        });
        setScheduleNotice(language === 'ru' ? 'Расписание обновлено' : language === 'zh' ? '日程已更新' : 'Schedule updated');
      } else {
        await createSchedule.mutateAsync(basePayload);
        setScheduleNotice(language === 'ru' ? 'Событие добавлено' : language === 'zh' ? '活动已添加' : 'Event added');
      }

      closeEditor();
      void refetch();
    } catch (saveError) {
      setScheduleNotice(saveError instanceof Error ? saveError.message : language === 'ru' ? 'Не удалось обновить расписание' : 'Failed to update schedule');
    }
  };

  // Обновляем время каждую минуту
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!editDraft) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeEditor();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeEditor, editDraft]);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todayIndex = getWeekdayIndex(now);
  const isSelectedToday = selectedDayIndex === todayIndex;
  const selectedSchedules = schedules
    .filter((item) => {
      const dayIndex = getScheduleDayIndex(item);

      if (dayIndex === selectedDayIndex) {
        return true;
      }

      return isRecurringScheduleItem(item, 'daily') || isRecurringScheduleItem(item, 'weekly');
    })
    .sort((a, b) => {
      const orderDelta = (a.orderIndex ?? 999) - (b.orderIndex ?? 999);
      if (orderDelta !== 0) {
        return orderDelta;
      }

      const timeA = parseTime(getDisplayTime(a))?.start ?? 9999;
      const timeB = parseTime(getDisplayTime(b))?.start ?? 9999;
      if (timeA !== timeB) {
        return timeA - timeB;
      }

      return getDisplayTitle(a, language).localeCompare(getDisplayTitle(b, language));
    });

  const draftTimeParts = editDraft ? extractTimeParts(editDraft.time) : { start: '', end: '' };
  const draftPreviewItem = editDraft
    ? {
        dayType: editDraft.dayType,
        time: editDraft.time,
        titleRu: editDraft.titleRu,
        titleEn: editDraft.titleEn,
        titleZh: editDraft.titleZh,
        registration: editingSchedule?.registration || '',
        description: editDraft.time,
        group: editingSchedule?.group || (language === 'ru' ? 'Общее' : language === 'zh' ? '综合' : 'General'),
        orderIndex: Number(editDraft.orderIndex) || 0,
        active: editDraft.active,
        date: editingSchedule?.date || '',
        type: editingSchedule?.type || editDraft.dayType,
      }
    : null;

  // Группируем по группам
  const groupedByGroup = selectedSchedules.reduce((acc, item) => {
    const groupName = item.group || (language === 'ru' ? 'Общее' : language === 'zh' ? '综合' : 'General');
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {} as Record<string, typeof schedules>);

  const sortedGroups = Object.keys(groupedByGroup).sort((a, b) => {
    if (a === 'Общее' || a === 'General') return -1;
    if (b === 'Общее' || b === 'General') return 1;
    return a.localeCompare(b);
  });

  // Находим следующее событие
  const nextEvent = isSelectedToday
    ? selectedSchedules
      .map<ParsedScheduleItem>((item) => ({ ...item, parsedTime: parseTime(getDisplayTime(item)) }))
      .filter((item) => item.parsedTime && item.parsedTime.start > currentMinutes)
      .sort((a, b) => (a.parsedTime?.start || 0) - (b.parsedTime?.start || 0))[0]
    : undefined;

  // Находим текущее событие
  const currentEvent = isSelectedToday
    ? selectedSchedules
      .map<ParsedScheduleItem>((item) => ({ ...item, parsedTime: parseTime(getDisplayTime(item)) }))
      .find((item) => item.parsedTime && item.parsedTime.start <= currentMinutes && item.parsedTime.end > currentMinutes)
    : undefined;

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-48"></div>
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-800/50 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
            <WuxiaIcon name="alertTriangle" className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <p className="text-red-400 mb-4">
              {error instanceof Error ? error.message : language === 'ru' ? 'Не удалось загрузить' : 'Failed to load'}
            </p>
            <button onClick={() => refetch()} className="btn-primary">
              <WuxiaIcon name="refresh" className="w-4 h-4 mr-2" />
              {language === 'ru' ? 'Повторить' : 'Retry'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHero
          icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
          title={language === 'ru' ? `Расписание — ${selectedDay.labels.ru}` : language === 'zh' ? `日程 - ${selectedDay.labels.zh}` : `Schedule - ${selectedDay.labels.en}`}
          subtitle={language === 'ru' ? 'Один день за раз' : language === 'zh' ? '一次只看一天' : 'One day at a time'}
          chips={[
            language === 'ru' ? `День: ${selectedDayIndex + 1}/7` : language === 'zh' ? `日期: ${selectedDayIndex + 1}/7` : `Day: ${selectedDayIndex + 1}/7`,
            language === 'ru' ? `Событий: ${selectedSchedules.length}` : language === 'zh' ? `事件: ${selectedSchedules.length}` : `Events: ${selectedSchedules.length}`,
          ]}
          actions={
            <>
              <div className="flex items-center gap-2 rounded-xl border border-[#223544]/60 bg-[#0c151d]/80 px-2 py-1">
                <button
                  type="button"
                  className="dc-icon-btn h-10 w-10 rounded-lg text-[#8fb9cc]"
                  onClick={() => setSelectedDayIndex((current) => (current + weekdays.length - 1) % weekdays.length)}
                  title={language === 'ru' ? 'Предыдущий день' : language === 'zh' ? '上一天' : 'Previous day'}
                  aria-label={language === 'ru' ? 'Предыдущий день' : language === 'zh' ? '上一天' : 'Previous day'}
                >
                  <span aria-hidden="true" className="text-lg leading-none">&lt;</span>
                </button>
                <div className="min-w-[9rem] px-2 text-center text-sm font-semibold text-[#e6eff5]">
                  {selectedDay.labels[language]}
                </div>
                <button
                  type="button"
                  className="dc-icon-btn h-10 w-10 rounded-lg text-[#8fb9cc]"
                  onClick={() => setSelectedDayIndex((current) => (current + 1) % weekdays.length)}
                  title={language === 'ru' ? 'Следующий день' : language === 'zh' ? '下一天' : 'Next day'}
                  aria-label={language === 'ru' ? 'Следующий день' : language === 'zh' ? '下一天' : 'Next day'}
                >
                  <span aria-hidden="true" className="text-lg leading-none">&gt;</span>
                </button>
              </div>
              {canEditSchedule && (
                <button
                  type="button"
                  onClick={openCreator}
                  className="btn-secondary"
                >
                  <WuxiaIcon name="plus" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                  {language === 'ru' ? 'Добавить событие' : language === 'zh' ? '添加活动' : 'Add event'}
                </button>
              )}
              <button
                onClick={() => refetch()}
                className="dc-icon-btn p-2.5 rounded-xl"
                title={language === 'ru' ? 'Обновить' : language === 'zh' ? '刷新' : 'Refresh'}
                aria-label={language === 'ru' ? 'Обновить расписание' : language === 'zh' ? '刷新日程' : 'Refresh schedule'}
              >
                <WuxiaIcon name="refresh" className="w-5 h-5" />
              </button>
            </>
          }
        />

        {scheduleNotice && (
          <div className="mt-4 mb-6 rounded-2xl border border-[#2f6e8d]/40 bg-[#16202b]/65 p-4 text-sm text-[#c7dce8]">
            <WuxiaIcon name="checkCircle" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
            {scheduleNotice}
          </div>
        )}

        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {weekdays.map((day, index) => {
              const dayEventsCount = schedules.filter((item) => {
                const itemDayIndex = getScheduleDayIndex(item);
                return itemDayIndex === index || isRecurringScheduleItem(item, 'daily') || isRecurringScheduleItem(item, 'weekly');
              }).length;
              const isActive = index === selectedDayIndex;
              const isToday = index === todayIndex;

              return (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => setSelectedDayIndex(index)}
                  className={`min-w-[8.75rem] rounded-2xl border px-4 py-3 text-left transition-all ${
                    isActive
                      ? 'border-[#a9d1e4]/65 bg-[linear-gradient(135deg,rgba(37,79,103,0.95),rgba(18,36,48,0.98))] shadow-[0_18px_30px_rgba(5,10,15,0.42)]'
                      : 'border-[#223544]/70 bg-[#0c151d]/85 hover:border-[#4b6f84]/80 hover:bg-[#101d27]/95'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-sm font-semibold ${isActive ? 'text-[#f3fbff]' : 'text-[#d3e3ec]'}`}>{day.labels[language]}</span>
                    {isToday && (
                      <span className="rounded-full border border-emerald-400/35 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                        {language === 'ru' ? 'Сегодня' : language === 'zh' ? '今天' : 'Today'}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-[#8aa4b3]">
                    {dayEventsCount} {language === 'ru' ? 'событий' : language === 'zh' ? '活动' : 'events'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Текущее/следующее событие */}
        {(currentEvent || nextEvent) && (
          <div className="mb-6">
            {currentEvent ? (
              <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-700/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {language === 'ru' ? 'Сейчас идёт' : language === 'zh' ? '进行中' : 'Happening now'}
                </div>
                <div className="text-white font-semibold text-lg">{getDisplayTitle(currentEvent, language)}</div>
                <div className="text-gray-400 text-sm mt-1">
                  {getDisplayTime(currentEvent)} • {currentEvent.group || (language === 'ru' ? 'Общее' : language === 'zh' ? '综合' : 'General')}
                </div>
              </div>
            ) : nextEvent && nextEvent.parsedTime ? (
              <div className="bg-gradient-to-r from-[#1a2a3a] to-[#1a1a2a] border border-[#8fb9cc]/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#8fb9cc] text-sm font-medium mb-2">
                      <WuxiaIcon name="schedule" className="w-4 h-4" />
                      {language === 'ru' ? 'Следующее событие' : language === 'zh' ? '下一场活动' : 'Next event'}
                    </div>
                    <div className="text-white font-semibold text-lg">{getDisplayTitle(nextEvent, language)}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      {getDisplayTime(nextEvent)} • {nextEvent.group || (language === 'ru' ? 'Общее' : language === 'zh' ? '综合' : 'General')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#8fb9cc]">
                      {formatCountdown(nextEvent.parsedTime.start - currentMinutes, language)}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {selectedSchedules.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-12 text-center">
            <WuxiaIcon name="schedule" className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {language === 'ru' ? `Нет событий на ${selectedDay.labels.ru.toLowerCase()}` : language === 'zh' ? `${selectedDay.labels.zh}没有活动` : `No events for ${selectedDay.labels.en}`}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {language === 'ru' ? 'Отдыхай, воин!' : language === 'zh' ? '好好休息，勇士！' : 'Rest well, warrior!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sortedGroups.map((groupName) => {
              const items = groupedByGroup[groupName];
              const color = getGroupColor(groupName);
              
              return (
                <div
                  key={groupName}
                  className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
                >
                  {/* Заголовок группы */}
                  <div 
                    className="px-4 py-3 border-b border-gray-800"
                    style={{ borderLeftWidth: 3, borderLeftColor: color }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{groupName}</span>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                        {items.length} {language === 'ru' ? 'событий' : language === 'zh' ? '项活动' : 'events'}
                      </span>
                    </div>
                  </div>
                  
                  {/* События */}
                  <div className="divide-y divide-gray-800/50">
                    {items.map((item, idx) => {
                      const timeLabel = getDisplayTime(item);
                      const time = parseTime(timeLabel);
                      const isNow = isSelectedToday && Boolean(time && time.start <= currentMinutes && time.end > currentMinutes);
                      const isPast = isSelectedToday && Boolean(time && time.end <= currentMinutes);
                      const isNext = nextEvent && item.id === nextEvent.id;
                      const isRecurring = isRecurringScheduleItem(item, 'daily') || isRecurringScheduleItem(item, 'weekly');
                      
                      return (
                        <div
                          key={item.id || `${groupName}-${timeLabel}-${idx}`}
                          className={`px-4 py-3 flex items-start gap-3 transition-colors ${
                            isNow 
                              ? 'bg-green-900/20' 
                              : isNext 
                                ? 'bg-[#8fb9cc]/10' 
                                : isPast 
                                  ? 'opacity-50' 
                                  : 'hover:bg-gray-800/30'
                          }`}
                        >
                          {/* Время */}
                          <div className={`font-mono text-sm w-16 flex-shrink-0 ${
                            isNow ? 'text-green-400' : isNext ? 'text-[#8fb9cc]' : 'text-gray-500'
                          }`}>
                            {timeLabel}
                          </div>
                          
                          {/* Название */}
                          <div className="flex-1 min-w-0">
                            <div className={`${isPast ? 'text-gray-500' : 'text-gray-200'} ${isNow ? 'font-medium' : ''}`}>
                              {getDisplayTitle(item, language)}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#7f97a6]">
                              {typeof item.orderIndex === 'number' && (
                                <span className="rounded-full border border-[#294454]/70 bg-[#0f1c25]/80 px-2 py-0.5">
                                  #{item.orderIndex}
                                </span>
                              )}
                              {isRecurring && (
                                <span className="rounded-full border border-[#35596a]/70 bg-[#10202a]/80 px-2 py-0.5 text-[#9dc5d7]">
                                  {isRecurringScheduleItem(item, 'daily')
                                    ? getRecurrenceLabel('daily', language)
                                    : getRecurrenceLabel('weekly', language)}
                                </span>
                              )}
                              {item.active === false && (
                                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-300">
                                  {language === 'ru' ? 'Скрыто' : language === 'zh' ? '隐藏' : 'Hidden'}
                                </span>
                              )}
                            </div>
                            {isNow && (
                              <span className="inline-flex items-center gap-1 text-xs text-green-400 mt-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                {language === 'ru' ? 'Сейчас' : language === 'zh' ? '进行中' : 'Now'}
                              </span>
                            )}
                          </div>

                          {canEditSchedule && item.id && (
                            <button
                              type="button"
                              className="dc-icon-btn p-2 rounded-lg text-[#8fb9cc]"
                              onClick={() => openEditor(item)}
                              title={language === 'ru' ? 'Редактировать слот' : language === 'zh' ? '编辑活动' : 'Edit slot'}
                              aria-label={language === 'ru' ? 'Редактировать событие' : language === 'zh' ? '编辑活动' : 'Edit event'}
                            >
                              <WuxiaIcon name="edit" className="w-4 h-4" />
                            </button>
                          )}
                          
                          {/* Статус */}
                          {isPast && (
                            <WuxiaIcon name="check" className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Статистика */}
        {selectedSchedules.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>{selectedDay.labels[language]}</span>
            <span>•</span>
            <span>{selectedSchedules.length} {language === 'ru' ? 'событий' : language === 'zh' ? '活动' : 'events'}</span>
            {nextEvent && nextEvent.parsedTime && (
              <>
                <span>•</span>
                <span className="text-[#8fb9cc]">
                  {language === 'ru' ? 'След.' : language === 'zh' ? '下一个' : 'Next'}: {formatCountdown(nextEvent.parsedTime.start - currentMinutes, language)}
                </span>
              </>
            )}
          </div>
        )}

        {canEditSchedule && editDraft && (
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-8" onClick={closeEditor}>
            <div
              className="card w-full max-w-6xl p-0 max-h-[92vh] overflow-hidden"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="schedule-editor-title"
            >
              <div className="grid max-h-[92vh] grid-cols-1 overflow-auto lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 id="schedule-editor-title" className="text-2xl font-bold font-orbitron text-[#e6eff5]">
                        {editingSchedule
                          ? (language === 'ru' ? 'Редактировать слот' : language === 'zh' ? '编辑活动' : 'Edit schedule slot')
                          : (language === 'ru' ? 'Добавить событие' : language === 'zh' ? '添加活动' : 'Add event')}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2">
                        {editingSchedule
                          ? editingSchedule.registration || (language === 'ru' ? 'Обнови слот и проверь живой предпросмотр справа.' : language === 'zh' ? '更新活动并查看右侧实时预览。' : 'Update the slot and review the live preview on the right.')
                          : language === 'ru'
                            ? 'Собери новый слот быстрее: выбери день, время и сразу проверь, как он выглядит в расписании.'
                            : language === 'zh'
                              ? '更快创建活动：选择日期、时间，并立即查看右侧预览。'
                              : 'Create a new slot faster: pick a day, set the time, and review the preview instantly.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="dc-icon-btn p-2.5 rounded-xl"
                      onClick={closeEditor}
                      disabled={updateSchedule.isPending || createSchedule.isPending}
                      aria-label={language === 'ru' ? 'Закрыть редактор расписания' : language === 'zh' ? '关闭日程编辑器' : 'Close schedule editor'}
                    >
                      <WuxiaIcon name="x" className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-[#365667]/70 bg-[#11202b]/80 px-3 py-1 text-[#d8ecf7]">
                      {editingSchedule ? (language === 'ru' ? 'Режим: редактирование' : language === 'zh' ? '模式：编辑' : 'Mode: editing') : language === 'ru' ? 'Режим: создание' : language === 'zh' ? '模式：创建' : 'Mode: create'}
                    </span>
                    <span className={`rounded-full border px-3 py-1 ${editDraft.active ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'}`}>
                      {editDraft.active ? (language === 'ru' ? 'Показывается в расписании' : language === 'zh' ? '活动显示中' : 'Visible in schedule') : language === 'ru' ? 'Скрыт из расписания' : language === 'zh' ? '活动已隐藏' : 'Hidden from schedule'}
                    </span>
                    <span className={`rounded-full border px-3 py-1 ${hasDraftErrors ? 'border-rose-500/35 bg-rose-500/10 text-rose-200' : 'border-sky-500/35 bg-sky-500/10 text-sky-200'}`}>
                      {hasDraftErrors
                        ? (language === 'ru' ? 'Нужно поправить поля' : language === 'zh' ? '仍有字段需要修正' : 'Some fields need attention')
                        : (language === 'ru' ? 'Форма готова к сохранению' : language === 'zh' ? '表单已可保存' : 'Form is ready to save')}
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[1.75rem] border border-[#223544]/70 bg-[#0c151d]/82 p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#e6eff5]">
                            {language === 'ru' ? 'День и повтор' : language === 'zh' ? '日期与重复' : 'Day and recurrence'}
                          </div>
                          <p className="mt-1 text-xs text-[#7f97a6]">
                            {language === 'ru' ? 'Выбери конкретный день недели или быстро переключись на повторяющийся слот.' : language === 'zh' ? '选择具体星期，或一键切换到重复活动。' : 'Pick a specific weekday or switch to a recurring slot in one tap.'}
                          </p>
                        </div>
                        <WuxiaIcon name="calendar" className="h-5 w-5 text-[#8fb9cc]" />
                      </div>

                      <div className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
                        {weekdays.map((day) => {
                          const isActive = day.aliases.some((alias) => normalizeDayValue(alias) === normalizeDayValue(editDraft.dayType));

                          return (
                            <button
                              key={day.key}
                              type="button"
                              onClick={() => updateDraft({ dayType: day.labels[language] })}
                              className={`rounded-2xl border px-3 py-2 text-sm transition ${isActive ? 'border-[#a9d1e4]/70 bg-[#173040] text-[#eff9ff]' : 'border-[#274152]/70 bg-[#101b24] text-[#bcd0db] hover:border-[#4c7388]/80 hover:text-white'}`}
                            >
                              {day.labels[language]}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {(['daily', 'weekly'] as const).map((kind) => {
                          const isActive = isRecurringScheduleItem({ dayType: editDraft.dayType } as ScheduleItem, kind);

                          return (
                            <button
                              key={kind}
                              type="button"
                              onClick={() => updateDraft({ dayType: getRecurringAlias(kind, language) })}
                              className={`rounded-full border px-4 py-2 text-sm transition ${isActive ? 'border-[#8fb9cc]/65 bg-[#1f3948] text-[#eff9ff]' : 'border-[#2c4556]/70 bg-[#101a22] text-[#95aebb] hover:border-[#55788d]/80 hover:text-white'}`}
                            >
                              {getRecurrenceLabel(kind, language)}
                            </button>
                          );
                        })}
                      </div>

                      <label className="space-y-2 text-sm block">
                        <span className="text-gray-400">{language === 'ru' ? 'Свободное значение' : language === 'zh' ? '自定义值' : 'Custom value'}</span>
                        <input
                          value={editDraft.dayType}
                          onChange={(event) => updateDraft({ dayType: event.target.value })}
                          className={`input-field w-full ${draftErrors.dayType ? 'border-rose-500/60' : ''}`}
                          placeholder={language === 'ru' ? 'Например: Понедельник или Еженедельные' : language === 'zh' ? '例如：星期一 或 每周' : 'For example: Monday or Weekly'}
                        />
                        {draftErrors.dayType && <p className="text-xs text-rose-300">{draftErrors.dayType}</p>}
                      </label>
                    </div>

                    <div className="rounded-[1.75rem] border border-[#223544]/70 bg-[#0c151d]/82 p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#e6eff5]">
                            {language === 'ru' ? 'Время и порядок' : language === 'zh' ? '时间与顺序' : 'Time and order'}
                          </div>
                          <p className="mt-1 text-xs text-[#7f97a6]">
                            {language === 'ru' ? 'Структурированный ввод ускоряет создание слота и снижает риск ошибки в диапазоне.' : language === 'zh' ? '结构化输入可加快创建活动并减少时间范围错误。' : 'Structured inputs make slot creation faster and reduce range mistakes.'}
                          </p>
                        </div>
                        <WuxiaIcon name="schedule" className="h-5 w-5 text-[#8fb9cc]" />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_140px]">
                        <label className="space-y-2 text-sm">
                          <span className="text-gray-400">{language === 'ru' ? 'Начало' : language === 'zh' ? '开始' : 'Start'}</span>
                          <input
                            type="time"
                            value={draftTimeParts.start}
                            onChange={(event) => updateDraftTime('start', event.target.value)}
                            className={`input-field w-full ${draftErrors.time ? 'border-rose-500/60' : ''}`}
                          />
                        </label>
                        <label className="space-y-2 text-sm">
                          <span className="text-gray-400">{language === 'ru' ? 'Конец' : language === 'zh' ? '结束' : 'End'}</span>
                          <input
                            type="time"
                            value={draftTimeParts.end}
                            onChange={(event) => updateDraftTime('end', event.target.value)}
                            className={`input-field w-full ${draftErrors.time ? 'border-rose-500/60' : ''}`}
                          />
                        </label>
                        <label className="space-y-2 text-sm">
                          <span className="text-gray-400">{language === 'ru' ? 'Порядок' : language === 'zh' ? '排序' : 'Order'}</span>
                          <input
                            type="number"
                            min={0}
                            max={999}
                            value={editDraft.orderIndex}
                            onChange={(event) => updateDraft({ orderIndex: event.target.value })}
                            className="input-field w-full"
                          />
                        </label>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {[60, 90, 120].map((minutes) => (
                          <button
                            key={minutes}
                            type="button"
                            onClick={() => applyDurationPreset(minutes)}
                            className="rounded-full border border-[#2c4556]/70 bg-[#101a22] px-3 py-1.5 text-sm text-[#bcd0db] transition hover:border-[#55788d]/80 hover:text-white"
                          >
                            {language === 'ru' ? `${minutes} мин` : language === 'zh' ? `${minutes} 分钟` : `${minutes} min`}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => updateDraft({ time: '' })}
                          className="rounded-full border border-[#2c4556]/70 bg-[#101a22] px-3 py-1.5 text-sm text-[#bcd0db] transition hover:border-[#55788d]/80 hover:text-white"
                        >
                          {language === 'ru' ? 'Очистить время' : language === 'zh' ? '清除时间' : 'Clear time'}
                        </button>
                      </div>

                      <label className="mt-4 block space-y-2 text-sm">
                        <span className="text-gray-400">{language === 'ru' ? 'Текстовое значение' : language === 'zh' ? '文本值' : 'Text value'}</span>
                        <input
                          value={editDraft.time}
                          onChange={(event) => updateDraft({ time: event.target.value })}
                          className={`input-field w-full ${draftErrors.time ? 'border-rose-500/60' : ''}`}
                          placeholder="19:30 - 20:30"
                        />
                        <p className="text-xs text-[#7f97a6]">
                          {language === 'ru' ? 'Можно оставить только начало или указать полный диапазон.' : language === 'zh' ? '可以只填写开始时间，也可以填写完整时间范围。' : 'You can keep only the start time or set the full range.'}
                        </p>
                        {draftErrors.time && <p className="text-xs text-rose-300">{draftErrors.time}</p>}
                      </label>
                    </div>

                    <div className="rounded-[1.75rem] border border-[#223544]/70 bg-[#0c151d]/82 p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#e6eff5]">
                            {language === 'ru' ? 'Названия и доступность' : language === 'zh' ? '标题与可见性' : 'Titles and visibility'}
                          </div>
                          <p className="mt-1 text-xs text-[#7f97a6]">
                            {language === 'ru' ? 'RU и EN обязательны, а китайский вариант можно быстро заполнить из готового текста.' : language === 'zh' ? 'RU 和 EN 为必填，中文标题可快速从现有内容补全。' : 'RU and EN are required, and the Chinese title can be quickly filled from existing text.'}
                          </p>
                        </div>
                        <WuxiaIcon name="bookOpen" className="h-5 w-5 text-[#8fb9cc]" />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="space-y-2 text-sm">
                          <span className="text-gray-400">Title RU</span>
                          <input
                            value={editDraft.titleRu}
                            onChange={(event) => updateDraft({ titleRu: event.target.value })}
                            className={`input-field w-full ${draftErrors.titleRu ? 'border-rose-500/60' : ''}`}
                          />
                          {draftErrors.titleRu && <p className="text-xs text-rose-300">{draftErrors.titleRu}</p>}
                        </label>
                        <label className="space-y-2 text-sm">
                          <span className="text-gray-400">Title EN</span>
                          <input
                            value={editDraft.titleEn}
                            onChange={(event) => updateDraft({ titleEn: event.target.value })}
                            className={`input-field w-full ${draftErrors.titleEn ? 'border-rose-500/60' : ''}`}
                          />
                          {draftErrors.titleEn && <p className="text-xs text-rose-300">{draftErrors.titleEn}</p>}
                        </label>
                        <label className="space-y-2 text-sm md:col-span-2">
                          <span className="text-gray-400">Title ZH</span>
                          <input
                            value={editDraft.titleZh}
                            onChange={(event) => updateDraft({ titleZh: event.target.value })}
                            className="input-field w-full"
                          />
                        </label>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => fillDraftTitlesFrom('titleRu')}
                          className="rounded-full border border-[#2c4556]/70 bg-[#101a22] px-3 py-1.5 text-sm text-[#bcd0db] transition hover:border-[#55788d]/80 hover:text-white"
                        >
                          {language === 'ru' ? 'Заполнить пустые из RU' : language === 'zh' ? '用 RU 填充空字段' : 'Fill empty titles from RU'}
                        </button>
                        <button
                          type="button"
                          onClick={() => fillDraftTitlesFrom('titleEn')}
                          className="rounded-full border border-[#2c4556]/70 bg-[#101a22] px-3 py-1.5 text-sm text-[#bcd0db] transition hover:border-[#55788d]/80 hover:text-white"
                        >
                          {language === 'ru' ? 'Заполнить пустые из EN' : language === 'zh' ? '用 EN 填充空字段' : 'Fill empty titles from EN'}
                        </button>
                      </div>

                      <label className="mt-4 flex items-center gap-3 text-sm rounded-2xl border border-[#223544]/60 bg-[#0c151d]/80 p-4">
                        <input
                          type="checkbox"
                          checked={editDraft.active}
                          onChange={(event) => updateDraft({ active: event.target.checked })}
                        />
                        <span className="text-gray-300">
                          {language === 'ru' ? 'Активно в расписании' : language === 'zh' ? '显示在日程中' : 'Visible in the schedule'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-6">
                    {editingSchedule?.id && (
                      <button
                        type="button"
                        className={`px-5 py-3 rounded-xl font-medium border transition ${editDraft.active ? 'border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/15' : 'border-emerald-500/35 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15'}`}
                        onClick={() => void archiveScheduleEdit()}
                        disabled={updateSchedule.isPending || createSchedule.isPending}
                      >
                        <WuxiaIcon name={editDraft.active ? 'trash' : 'redo'} className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                        {editDraft.active
                          ? language === 'ru'
                            ? 'Архивировать'
                            : language === 'zh'
                              ? '归档'
                              : 'Archive'
                          : language === 'ru'
                            ? 'Восстановить'
                            : language === 'zh'
                              ? '恢复'
                              : 'Restore'}
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn-secondary px-5 py-3"
                      onClick={closeEditor}
                      disabled={updateSchedule.isPending || createSchedule.isPending}
                    >
                      {language === 'ru' ? 'Отмена' : language === 'zh' ? '取消' : 'Cancel'}
                    </button>
                    <button
                      type="button"
                      className="btn-primary px-5 py-3"
                      onClick={() => void saveScheduleEdit()}
                      disabled={updateSchedule.isPending || createSchedule.isPending || hasDraftErrors}
                    >
                      {updateSchedule.isPending || createSchedule.isPending
                        ? (language === 'ru' ? 'Сохраняем...' : language === 'zh' ? '保存中...' : 'Saving...')
                        : editingSchedule
                          ? (language === 'ru' ? 'Сохранить' : language === 'zh' ? '保存' : 'Save')
                          : (language === 'ru' ? 'Добавить' : language === 'zh' ? '添加' : 'Add')}
                    </button>
                  </div>
                </div>

                <aside className="border-t border-[#203342]/80 bg-[radial-gradient(circle_at_top,rgba(47,111,144,0.22),transparent_45%),linear-gradient(180deg,#0d151c,#091017)] p-6 md:p-8 lg:border-l lg:border-t-0">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-[#eff8fd]">
                        {language === 'ru' ? 'Живой предпросмотр' : language === 'zh' ? '实时预览' : 'Live preview'}
                      </h4>
                      <p className="mt-1 text-sm text-[#8ba4b4]">
                        {language === 'ru' ? 'Так слот будет выглядеть в карточке дня.' : language === 'zh' ? '活动将在日程卡片中这样显示。' : 'This is how the slot will appear inside the day card.'}
                      </p>
                    </div>
                    <WuxiaIcon name="sparkle" className="h-5 w-5 text-[#8fb9cc]" />
                  </div>

                  {draftPreviewItem && (
                    <div className="rounded-[1.75rem] border border-[#2a4454]/75 bg-[#0c151d]/92 p-5 shadow-[0_20px_40px_rgba(3,8,12,0.45)]">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-[0.24em] text-[#7d99aa]">
                            {editDraft.dayType || (language === 'ru' ? 'Новый слот' : language === 'zh' ? '新活动' : 'New slot')}
                          </div>
                          <div className="mt-2 text-lg font-semibold text-[#f1f8fd]">
                            {getDisplayTitle(draftPreviewItem, language) || (language === 'ru' ? 'Название появится здесь' : language === 'zh' ? '标题会显示在这里' : 'The title will appear here')}
                          </div>
                        </div>
                        <div className="rounded-full border border-[#35596a]/70 bg-[#10202a]/80 px-3 py-1 text-xs text-[#9dc5d7]">
                          #{Number(editDraft.orderIndex) || 0}
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-[#c8d9e3]">
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#223544]/70 bg-[#111c24]/85 px-4 py-3">
                          <span className="text-[#86a4b5]">{language === 'ru' ? 'Время' : language === 'zh' ? '时间' : 'Time'}</span>
                          <span className="font-mono text-[#eef9ff]">{draftPreviewItem.time || '--:--'}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#223544]/70 bg-[#111c24]/85 px-4 py-3">
                          <span className="text-[#86a4b5]">{language === 'ru' ? 'Группа' : language === 'zh' ? '分组' : 'Group'}</span>
                          <span className="text-right text-[#eef9ff]">{draftPreviewItem.group}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                          <div className="rounded-2xl border border-[#223544]/70 bg-[#111c24]/85 px-4 py-3">
                            <div className="text-xs uppercase tracking-[0.18em] text-[#6f8b9b]">RU</div>
                            <div className="mt-2 text-sm text-[#eef9ff]">{editDraft.titleRu || '—'}</div>
                          </div>
                          <div className="rounded-2xl border border-[#223544]/70 bg-[#111c24]/85 px-4 py-3">
                            <div className="text-xs uppercase tracking-[0.18em] text-[#6f8b9b]">EN</div>
                            <div className="mt-2 text-sm text-[#eef9ff]">{editDraft.titleEn || '—'}</div>
                          </div>
                          <div className="rounded-2xl border border-[#223544]/70 bg-[#111c24]/85 px-4 py-3 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                            <div className="text-xs uppercase tracking-[0.18em] text-[#6f8b9b]">ZH</div>
                            <div className="mt-2 text-sm text-[#eef9ff]">{editDraft.titleZh || '—'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 rounded-[1.5rem] border border-[#223544]/70 bg-[#0c151d]/82 p-5">
                    <div className="text-sm font-semibold text-[#e6eff5]">
                      {language === 'ru' ? 'Быстрые подсказки' : language === 'zh' ? '快速提示' : 'Quick tips'}
                    </div>
                    <div className="mt-3 space-y-3 text-sm text-[#9db3c1]">
                      <div className="flex gap-3">
                        <WuxiaIcon name="checkCircle" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                        <span>{language === 'ru' ? 'Повторяющиеся события лучше помечать как Daily или Weekly, чтобы они автоматически появлялись в нужных днях.' : language === 'zh' ? '重复活动最好标记为 Daily 或 Weekly，这样它们会自动出现在对应日期。' : 'Recurring events work best when marked as Daily or Weekly so they appear automatically on the right days.'}</span>
                      </div>
                      <div className="flex gap-3">
                        <WuxiaIcon name="checkCircle" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                        <span>{language === 'ru' ? 'Порядок помогает вручную расставить карточки, если время у нескольких слотов совпадает.' : language === 'zh' ? '如果多个活动时间相同，排序字段可以帮助你手动调整顺序。' : 'The order field helps you manually arrange cards when several slots share the same time.'}</span>
                      </div>
                      <div className="flex gap-3">
                        <WuxiaIcon name="checkCircle" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                        <span>{language === 'ru' ? 'Если событие временно не нужно показывать, его можно скрыть, не теряя данные.' : language === 'zh' ? '如果活动暂时不需要显示，可以隐藏而不必丢失数据。' : 'If an event is temporarily inactive, hide it without losing the data.'}</span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ScheduleSection(props: ScheduleSectionProps) {
  return (
    <ErrorBoundary>
      <ScheduleSectionContent {...props} />
    </ErrorBoundary>
  );
}
