'use client';

import { useMemo } from 'react';
import { useRsvps } from './hooks';
import { useSchedule } from '@/lib/schedule/hooks';
import { SectionHero } from '@/components/shared/SectionHero';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import WuxiaIcon from '@/components/WuxiaIcons';
import { generateGoogleCalendarLink, generateOutlookCalendarLink, generateICalEvent } from '@/lib/calendar';
import type { User } from '@/lib/schemas/auth';
import type { Language } from '@/lib/i18n';
import type { Rsvp, Schedule } from '@/lib/schemas/rsvp';

interface CalendarViewProps {
  user: User;
  language: Language;
}

const statusLabels = {
  going: { ru: 'Иду', en: 'Going', zh: '参加' },
  not_going: { ru: 'Не иду', en: 'Not Going', zh: '不参加' },
  maybe: { ru: 'Возможно', en: 'Maybe', zh: '可能' },
  pending: { ru: 'Нет ответа', en: 'No Response', zh: '无回复' },
};

function formatDate(dateStr: string, language: Language): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  const locale = language === 'zh' ? 'zh-CN' : language === 'en' ? 'en-US' : 'ru-RU';
  return date.toLocaleDateString(locale, options);
}

function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return timeStr;
  return `${match[1]}:${match[2]}`;
}

export function CalendarView({ user, language }: CalendarViewProps) {
  const { data: rsvps, isLoading: rsvpsLoading } = useRsvps(user.id);
  const { data: schedule, isLoading: scheduleLoading } = useSchedule(language);

  const isLoading = rsvpsLoading || scheduleLoading;

  const myRsvpsByScheduleId = useMemo(() => {
    const map = new Map<string, Rsvp>();
    rsvps?.forEach((rsvp) => {
      map.set(rsvp.scheduleId, rsvp);
    });
    return map;
  }, [rsvps]);

  const upcomingEvents = useMemo(() => {
    if (!schedule) return [];

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return schedule
      .filter((event) => {
        if (!event.date || !event.active) return false;
        const eventDate = new Date(event.date);
        return eventDate >= today;
      })
      .map((event) => ({
        ...event,
        rsvp: myRsvpsByScheduleId.get(event.id!) || null,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date!).getTime();
        const dateB = new Date(b.date!).getTime();
        return dateA - dateB;
      })
      .slice(0, 10);
  }, [schedule, myRsvpsByScheduleId]);

  const groupedEvents = useMemo(() => {
    const groups: Record<string, typeof upcomingEvents> = {
      going: [],
      maybe: [],
      not_going: [],
      pending: [],
    };

    upcomingEvents.forEach((event) => {
      const status = event.rsvp?.status || 'pending';
      groups[status].push(event);
    });

    return groups;
  }, [upcomingEvents]);

  const copy = {
    title: language === 'zh' ? '我的日历' : language === 'en' ? 'My Calendar' : 'Мой календарь',
    subtitle: language === 'zh' ? '你的活动回复和计划' : language === 'en' ? 'Your event responses and schedule' : 'Твои ответы на мероприятия и расписание',
    empty: language === 'zh' ? '还没有回复任何活动' : language === 'en' ? 'No event responses yet' : 'Пока нет ответов на мероприятия',
    emptyHint: language === 'zh' ? '在时间表中选择活动并标记你的状态' : language === 'en' ? 'Go to Schedule and mark your status for events' : 'Перейди в Расписание и отметь свой статус',
    going: statusLabels.going[language],
    maybe: statusLabels.maybe[language],
    notGoing: statusLabels.not_going[language],
    pending: statusLabels.pending[language],
    noEvents: language === 'zh' ? '这个类别没有活动' : language === 'en' ? 'No events in this category' : 'Нет мероприятий в этой категории',
  };

  const totalRsvps = upcomingEvents.filter((e) => e.rsvp && e.rsvp.status !== 'pending').length;

  if (isLoading) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="calendar" className="w-5 h-5" />}
            title={copy.title}
            subtitle={copy.subtitle}
            chips={['Personal', 'Schedule']}
          />
          <LoadingState title={copy.title} subtitle={copy.subtitle} icon="calendar" />
        </div>
      </section>
    );
  }

  if (totalRsvps === 0) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="calendar" className="w-5 h-5" />}
            title={copy.title}
            subtitle={copy.subtitle}
            chips={['Personal', 'Schedule']}
          />
          <EmptyState
            title={copy.empty}
            subtitle={copy.emptyHint}
            icon="calendar"
          />
        </div>
      </section>
    );
  }

  const renderEventList = (events: typeof upcomingEvents, statusKey: string) => {
    if (events.length === 0) return null;

    const statusLabel = copy[statusKey as keyof typeof copy] as string;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            statusKey === 'going' ? 'bg-[#2d5a3f]' :
            statusKey === 'maybe' ? 'bg-[#5a4a2d]' :
            statusKey === 'not_going' ? 'bg-[#5a2d2d]' :
            'bg-[#2d3a5a]'
          }`} />
          <h3 className="text-sm font-semibold text-[#bcd6e5]">{statusLabel}</h3>
          <span className="text-xs text-gray-400">({events.length})</span>
        </div>

        <div className="space-y-2">
          {events.map((event) => {
            const handleExport = (platform: 'google' | 'outlook' | 'ical') => {
              const scheduleEvent = event as unknown as Schedule;
              if (platform === 'google') {
                const url = generateGoogleCalendarLink(scheduleEvent, language);
                window.open(url, '_blank');
              } else if (platform === 'outlook') {
                const url = generateOutlookCalendarLink(scheduleEvent, language);
                window.open(url, '_blank');
              } else if (platform === 'ical') {
                const icalData = generateICalEvent(scheduleEvent, language);
                const blob = new Blob([icalData], { type: 'text/calendar' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `event-${event.id || 'calendar'}.ics`;
                link.click();
                URL.revokeObjectURL(url);
              }
            };

            return (
              <article
                key={event.id}
                className="rounded-xl border border-[#2a3c4c]/60 bg-[#101a23]/65 p-4 hover:border-[#2f6e8d]/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[#2d5a3f]">
                        {event.dayType}
                      </span>
                      {event.time && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{formatTime(event.time)}</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-[#e6eff5] truncate">
                      {language === 'zh' ? event.titleZh || event.titleRu :
                       language === 'en' ? event.titleEn || event.titleRu :
                       event.titleRu}
                    </h4>
                    {event.date && (
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(event.date, language)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {event.rsvp && event.rsvp.status !== 'pending' && (
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                        event.rsvp.status === 'going' ? 'bg-[#2d5a3f]/30 text-[#6fb98f]' :
                        event.rsvp.status === 'maybe' ? 'bg-[#5a4a2d]/30 text-[#b9a56f]' :
                        'bg-[#5a2d2d]/30 text-[#b96f6f]'
                      }`}>
                        <WuxiaIcon
                          name={
                            event.rsvp.status === 'going' ? 'checkCircle' :
                            event.rsvp.status === 'maybe' ? 'questionCircle' :
                            'xCircle'
                          }
                          className="w-3 h-3"
                        />
                        <span className="hidden sm:inline">
                          {statusLabels[event.rsvp.status][language]}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleExport('google')}
                        className="p-1.5 rounded-lg text-[#8fb9cc] hover:bg-[#1a2a3a]/60 transition-colors"
                        title={language === 'ru' ? 'Добавить в Google Calendar' : language === 'zh' ? '添加到 Google 日历' : 'Add to Google Calendar'}
                      >
                        <WuxiaIcon name="externalLink" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExport('outlook')}
                        className="p-1.5 rounded-lg text-[#8fb9cc] hover:bg-[#1a2a3a]/60 transition-colors"
                        title={language === 'ru' ? 'Добавить в Outlook' : language === 'zh' ? '添加到 Outlook' : 'Add to Outlook'}
                      >
                        <WuxiaIcon name="calendar" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExport('ical')}
                        className="p-1.5 rounded-lg text-[#8fb9cc] hover:bg-[#1a2a3a]/60 transition-colors"
                        title={language === 'ru' ? 'Скачать .ics файл' : language === 'zh' ? '下载 .ics 文件' : 'Download .ics file'}
                      >
                        <WuxiaIcon name="download" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHero
          icon={<WuxiaIcon name="calendar" className="w-5 h-5" />}
          title={copy.title}
          subtitle={copy.subtitle}
          chips={['Personal', 'Schedule', `${totalRsvps} events`]}
        />

        <div className="space-y-8">
          {renderEventList(groupedEvents.going, 'going')}
          {renderEventList(groupedEvents.maybe, 'maybe')}
          {renderEventList(groupedEvents.not_going, 'notGoing')}
          {renderEventList(groupedEvents.pending, 'pending')}
        </div>
      </div>
    </section>
  );
}
