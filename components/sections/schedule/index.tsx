'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useSchedule, useUpdateSchedule } from '@/lib/hooks/useSchedule';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/types';
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

function ScheduleSectionContent({ user, language }: ScheduleSectionProps) {
  const { data: schedules = [], isLoading, error, refetch } = useSchedule(language);
  const updateSchedule = useUpdateSchedule();
  const [now, setNow] = useState(() => new Date());
  const [filter, setFilter] = useState<string>('all');
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [editDraft, setEditDraft] = useState<ScheduleEditDraft | null>(null);
  const [scheduleNotice, setScheduleNotice] = useState<string | null>(null);
  const canEditSchedule = hasRoleAtLeast(user.role, 'officer');

  const openEditor = (item: ScheduleItem) => {
    if (!item.id) return;
    setEditingSchedule(item);
    setEditDraft(toEditDraft(item));
    setScheduleNotice(null);
  };

  const closeEditor = () => {
    if (updateSchedule.isPending) return;
    setEditingSchedule(null);
    setEditDraft(null);
  };

  const saveScheduleEdit = async () => {
    if (!editingSchedule?.id || !editDraft) {
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
        active: editDraft.active,
      });
      setScheduleNotice(language === 'ru' ? 'Расписание обновлено' : language === 'zh' ? '日程已更新' : 'Schedule updated');
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

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const today = new Date();
  const locale = language === 'ru' ? 'ru-RU' : language === 'zh' ? 'zh-CN' : 'en-US';
  const dayName = today.toLocaleDateString(locale, { weekday: 'long' });
  const dateStr = today.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
  });

  // Группируем по группам
  const groupedByGroup = schedules.reduce((acc, item) => {
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

  // Фильтруем группы
  const filteredGroups = filter === 'all' 
    ? sortedGroups 
    : sortedGroups.filter(g => g === filter);

  // Находим следующее событие
  const nextEvent = schedules
    .map(item => ({ ...item, time: parseTime(item.description) }))
    .filter(item => item.time && item.time.start > currentMinutes)
    .sort((a, b) => (a.time?.start || 0) - (b.time?.start || 0))[0];

  // Находим текущее событие
  const currentEvent = schedules
    .map(item => ({ ...item, time: parseTime(item.description) }))
    .find(item => item.time && item.time.start <= currentMinutes && item.time.end > currentMinutes);

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
          title={language === 'ru' ? `Расписание — ${dayName}` : language === 'zh' ? `日程 - ${dayName}` : `Schedule - ${dayName}`}
          subtitle={dateStr}
          chips={[
            language === 'ru' ? `Групп: ${sortedGroups.length}` : language === 'zh' ? `分组: ${sortedGroups.length}` : `Groups: ${sortedGroups.length}`,
            language === 'ru' ? `Событий: ${schedules.length}` : language === 'zh' ? `事件: ${schedules.length}` : `Events: ${schedules.length}`,
          ]}
          actions={
            <>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="select-field text-sm"
              >
              <option value="all">{language === 'ru' ? 'Все группы' : language === 'zh' ? '全部分组' : 'All groups'}</option>
                {sortedGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>

              <button
                onClick={() => refetch()}
                className="dc-icon-btn p-2.5 rounded-xl"
                title={language === 'ru' ? 'Обновить' : language === 'zh' ? '刷新' : 'Refresh'}
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

        {/* Текущее/следующее событие */}
        {(currentEvent || nextEvent) && (
          <div className="mb-6">
            {currentEvent ? (
              <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-700/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {language === 'ru' ? 'Сейчас идёт' : language === 'zh' ? '进行中' : 'Happening now'}
                </div>
                <div className="text-white font-semibold text-lg">{currentEvent.registration}</div>
                <div className="text-gray-400 text-sm mt-1">
                  {currentEvent.description} • {currentEvent.group || (language === 'ru' ? 'Общее' : language === 'zh' ? '综合' : 'General')}
                </div>
              </div>
            ) : nextEvent && nextEvent.time ? (
              <div className="bg-gradient-to-r from-[#1a2a3a] to-[#1a1a2a] border border-[#8fb9cc]/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#8fb9cc] text-sm font-medium mb-2">
                      <WuxiaIcon name="schedule" className="w-4 h-4" />
                      {language === 'ru' ? 'Следующее событие' : language === 'zh' ? '下一场活动' : 'Next event'}
                    </div>
                    <div className="text-white font-semibold text-lg">{nextEvent.registration}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      {nextEvent.description} • {nextEvent.group || (language === 'ru' ? 'Общее' : language === 'zh' ? '综合' : 'General')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#8fb9cc]">
                      {formatCountdown(nextEvent.time.start - currentMinutes, language)}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {schedules.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-12 text-center">
            <WuxiaIcon name="schedule" className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {language === 'ru' ? 'Нет событий на сегодня' : language === 'zh' ? '今天没有活动' : 'No events today'}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {language === 'ru' ? 'Отдыхай, воин!' : language === 'zh' ? '好好休息，勇士！' : 'Rest well, warrior!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredGroups.map((groupName) => {
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
                      const time = parseTime(item.description);
                      const isNow = time && time.start <= currentMinutes && time.end > currentMinutes;
                      const isPast = time && time.end <= currentMinutes;
                      const isNext = nextEvent && item.registration === nextEvent.registration && item.description === nextEvent.description;
                      
                      return (
                        <div
                          key={idx}
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
                            {item.description || '—'}
                          </div>
                          
                          {/* Название */}
                          <div className="flex-1 min-w-0">
                            <div className={`${isPast ? 'text-gray-500' : 'text-gray-200'} ${isNow ? 'font-medium' : ''}`}>
                              {item.registration}
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
        {schedules.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>{sortedGroups.length} {language === 'ru' ? 'групп' : language === 'zh' ? '分组' : 'groups'}</span>
            <span>•</span>
            <span>{schedules.length} {language === 'ru' ? 'событий' : language === 'zh' ? '活动' : 'events'}</span>
            {nextEvent && nextEvent.time && (
              <>
                <span>•</span>
                <span className="text-[#8fb9cc]">
                  {language === 'ru' ? 'След.' : language === 'zh' ? '下一个' : 'Next'}: {formatCountdown(nextEvent.time.start - currentMinutes, language)}
                </span>
              </>
            )}
          </div>
        )}

        {canEditSchedule && editingSchedule && editDraft && (
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-8" onClick={closeEditor}>
            <div className="card w-full max-w-3xl p-6 md:p-8 max-h-[90vh] overflow-auto" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">
                    {language === 'ru' ? 'Редактировать слот' : language === 'zh' ? '编辑活动' : 'Edit schedule slot'}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">{editingSchedule.registration}</p>
                </div>
                <button type="button" className="dc-icon-btn p-2.5 rounded-xl" onClick={closeEditor} disabled={updateSchedule.isPending}>
                  <WuxiaIcon name="x" className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <label className="space-y-2 text-sm">
                  <span className="text-gray-400">Day type</span>
                  <input
                    value={editDraft.dayType}
                    onChange={(event) => setEditDraft((current) => current ? { ...current, dayType: event.target.value } : current)}
                    className="input-field w-full"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-gray-400">Time</span>
                  <input
                    value={editDraft.time}
                    onChange={(event) => setEditDraft((current) => current ? { ...current, time: event.target.value } : current)}
                    className="input-field w-full"
                    placeholder="19:30 - 20:30"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-gray-400">Title RU</span>
                  <input
                    value={editDraft.titleRu}
                    onChange={(event) => setEditDraft((current) => current ? { ...current, titleRu: event.target.value } : current)}
                    className="input-field w-full"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-gray-400">Title EN</span>
                  <input
                    value={editDraft.titleEn}
                    onChange={(event) => setEditDraft((current) => current ? { ...current, titleEn: event.target.value } : current)}
                    className="input-field w-full"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-gray-400">Title ZH</span>
                  <input
                    value={editDraft.titleZh}
                    onChange={(event) => setEditDraft((current) => current ? { ...current, titleZh: event.target.value } : current)}
                    className="input-field w-full"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-gray-400">Order</span>
                  <input
                    type="number"
                    value={editDraft.orderIndex}
                    onChange={(event) => setEditDraft((current) => current ? { ...current, orderIndex: event.target.value } : current)}
                    className="input-field w-full"
                  />
                </label>
                <label className="flex items-center gap-3 text-sm md:col-span-2 rounded-2xl border border-[#223544]/60 bg-[#0c151d]/80 p-4">
                  <input
                    type="checkbox"
                    checked={editDraft.active}
                    onChange={(event) => setEditDraft((current) => current ? { ...current, active: event.target.checked } : current)}
                  />
                  <span className="text-gray-300">Активно в расписании</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button type="button" className="btn-secondary px-5 py-3" onClick={closeEditor} disabled={updateSchedule.isPending}>
                  Отмена
                </button>
                <button type="button" className="btn-primary px-5 py-3" onClick={() => void saveScheduleEdit()} disabled={updateSchedule.isPending}>
                  {updateSchedule.isPending ? 'Сохраняем...' : 'Сохранить'}
                </button>
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
