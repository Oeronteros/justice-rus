'use client';

import { useMemo } from 'react';
import { useRsvps, useUpsertRsvp, useRsvpSummary } from '@/lib/rsvp/hooks';
import { useSchedule } from '@/lib/schedule/hooks';
import { SectionHero } from '@/components/shared/SectionHero';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import WuxiaIcon from '@/components/WuxiaIcons';
import { generateGoogleCalendarLink, generateOutlookCalendarLink, generateICalEvent } from '@/lib/calendar';
import type { User } from '@/lib/schemas/auth';
import type { Language } from '@/lib/i18n';
import type { Rsvp } from '@/lib/schemas/rsvp';
import type { Schedule } from '@/lib/schemas/schedule';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { rsvpStyles } from './Rsvp.stylex';

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
  const { data: rsvps, isLoading: rsvpsLoading } = useRsvps(user.id ?? null) as { data: Rsvp[] | undefined; isLoading: boolean };
  const { data: schedule, isLoading: scheduleLoading } = useSchedule(language);

  const isLoading = rsvpsLoading || scheduleLoading;

  const myRsvpsByScheduleId = useMemo(() => {
    const map = new Map<string, Rsvp>();
    (rsvps || []).forEach((rsvp) => {
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
      <section {...stylex.props(uiStyles.sectionShell)}>
        <div {...stylex.props(uiStyles.sectionContainer)}>
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
      <section {...stylex.props(uiStyles.sectionShell)}>
        <div {...stylex.props(uiStyles.sectionContainer)}>
          <SectionHero
            icon={<WuxiaIcon name="calendar" className="w-5 h-5" />}
            title={copy.title}
            subtitle={copy.subtitle}
            chips={['Personal', 'Schedule']}
          />
          <EmptyState
            title={copy.empty}
            description={copy.emptyHint}
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
      <div {...stylex.props(rsvpStyles.section)}>
        <div {...stylex.props(rsvpStyles.sectionHead)}>
          <div {...stylex.props(rsvpStyles.statusDot, statusKey === 'going' ? rsvpStyles.statusGoing : statusKey === 'maybe' ? rsvpStyles.statusMaybe : statusKey === 'not_going' ? rsvpStyles.statusNo : rsvpStyles.statusPending)} />
          <h3 {...stylex.props(rsvpStyles.sectionTitle)}>{statusLabel}</h3>
          <span {...stylex.props(rsvpStyles.sectionMeta)}>({events.length})</span>
        </div>

        <div {...stylex.props(rsvpStyles.events)}>
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
                {...stylex.props(rsvpStyles.eventCard)}
              >
                <div {...stylex.props(rsvpStyles.eventHead)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span {...stylex.props(rsvpStyles.sectionMeta)} style={{ color: '#2d5a3f', fontWeight: 600 }}>
                        {event.dayType}
                      </span>
                      {event.time && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span {...stylex.props(rsvpStyles.muted)}>{formatTime(event.time)}</span>
                        </>
                      )}
                    </div>
                    <h4 {...stylex.props(rsvpStyles.eventTitle)}>
                      {language === 'zh' ? event.titleZh || event.titleRu :
                       language === 'en' ? event.titleEn || event.titleRu :
                       event.titleRu}
                    </h4>
                    {event.date && (
                      <p {...stylex.props(rsvpStyles.muted)} style={{ marginTop: 4 }}>
                        {formatDate(event.date, language)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {event.rsvp && event.rsvp.status !== 'pending' && (
                      <div {...stylex.props(rsvpStyles.eventBadge, event.rsvp.status === 'going' ? rsvpStyles.eventBadgeGoing : event.rsvp.status === 'maybe' ? rsvpStyles.eventBadgeMaybe : rsvpStyles.eventBadgeNo)}>
                        <WuxiaIcon
                          name={
                            event.rsvp.status === 'going' ? 'checkCircle' :
                            event.rsvp.status === 'maybe' ? 'dots' :
                            'calendarX'
                          }
                          className="w-3 h-3"
                        />
                        <span className="hidden sm:inline">
                          {statusLabels[event.rsvp.status][language]}
                        </span>
                      </div>
                    )}
                    
                    <div {...stylex.props(rsvpStyles.exportRow)}>
                      <button
                        type="button"
                        onClick={() => handleExport('google')}
                        {...stylex.props(rsvpStyles.exportBtn)}
                        title={language === 'ru' ? 'Добавить в Google Calendar' : language === 'zh' ? '添加到 Google 日历' : 'Add to Google Calendar'}
                      >
                        <WuxiaIcon name="link" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExport('outlook')}
                        {...stylex.props(rsvpStyles.exportBtn)}
                        title={language === 'ru' ? 'Добавить в Outlook' : language === 'zh' ? '添加到 Outlook' : 'Add to Outlook'}
                      >
                        <WuxiaIcon name="calendar" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExport('ical')}
                        {...stylex.props(rsvpStyles.exportBtn)}
                        title={language === 'ru' ? 'Скачать .ics файл' : language === 'zh' ? '下载 .ics 文件' : 'Download .ics file'}
                      >
                        <WuxiaIcon name="upload" className="w-3.5 h-3.5" />
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
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <SectionHero
          icon={<WuxiaIcon name="calendar" className="w-5 h-5" />}
          title={copy.title}
          subtitle={copy.subtitle}
          chips={['Personal', 'Schedule', `${totalRsvps} events`]}
        />

        <div {...stylex.props(rsvpStyles.list)}>
          {renderEventList(groupedEvents.going, 'going')}
          {renderEventList(groupedEvents.maybe, 'maybe')}
          {renderEventList(groupedEvents.not_going, 'notGoing')}
          {renderEventList(groupedEvents.pending, 'pending')}
        </div>
      </div>
    </section>
  );
}
