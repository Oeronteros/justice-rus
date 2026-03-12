'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import { SectionHero } from '@/components/shared/SectionHero';
import { useAbsences } from '@/lib/absences/hooks';
import { hasRoleAtLeast } from '@/lib/authz';
import { useHelp } from '@/lib/help/hooks';
import { sectionLabels, type Language } from '@/lib/i18n';
import { useNews } from '@/lib/news/hooks';
import { usePvpState } from '@/lib/pvp/hooks';
import { useRegistrations } from '@/lib/registration/hooks';
import { useSchedule } from '@/lib/schedule/hooks';
import type { User, UserRole } from '@/lib/schemas/auth';
import type { Absence } from '@/lib/schemas/absence';
import type { PvpState } from '@/lib/schemas/pvp';
import type { Registration } from '@/lib/schemas/registration';
import type { Schedule } from '@/lib/schemas/schedule';
import { cn } from '@/lib/utils';

interface DashboardSectionProps {
  user: User;
  language: Language;
}

type LiveTone = 'steady' | 'active' | 'alert';

type DashboardCopy = {
  title: string;
  subtitle: string;
  chips: string[];
  liveStatus: string;
  allClear: string;
  activeAlerts: string;
  situationRoom: string;
  liveSnapshot: string;
  openingLine: string;
  personalStation: string;
  personalStationBody: string;
  nextEvent: string;
  nextEventEmpty: string;
  urgentHelp: string;
  urgentHelpEmpty: string;
  readiness: string;
  readinessEmpty: string;
  announcements: string;
  announcementsEmpty: string;
  absences: string;
  absencesEmpty: string;
  pvpPulse: string;
  pvpEmpty: string;
  quickRoutes: string;
  quickRoutesBody: string;
  openSchedule: string;
  openHelp: string;
  openNews: string;
  openMembers: string;
  openGuides: string;
  openPvp: string;
  openAbsences: string;
  totalMembers: string;
  activeMembers: string;
  readyCore: string;
  avgKpi: string;
  unattendedRequests: string;
  openRequests: string;
  pendingAbsences: string;
  activeAnnouncements: string;
  activeQueue: string;
  liveMatch: string;
  yourRole: string;
  yourClass: string;
  yourPrefix: string;
  accountState: string;
  activeState: string;
  inactiveState: string;
  noClass: string;
  noPrefix: string;
  noOverlay: string;
  officerOverlay: string;
  queuedNow: string;
  notQueued: string;
  noQueue: string;
  contestedMatch: string;
  noLiveMatch: string;
  noResponder: string;
  responderOne: string;
  responderMany: string;
  pinned: string;
  latest: string;
  live: string;
  soon: string;
  stable: string;
  today: string;
  tomorrow: string;
  thisWeek: string;
  now: string;
  refreshPulse: string;
  reloadLiveModules: string;
};

const dashboardCopy = {
  ru: {
    title: 'Дашборд гильдии',
    subtitle: 'Живой статус Silent Moonfall: ближайшие события, срочные запросы, состояние состава и ключевые сигналы за один взгляд.',
    chips: ['Live Status', 'Guild Pulse', 'Shared Overview'],
    liveStatus: 'Живой статус',
    allClear: 'Контур стабилен',
    activeAlerts: 'Есть активные сигналы',
    situationRoom: 'Операционная сводка',
    liveSnapshot: 'На этом экране только те сигналы, которые реально влияют на координацию гильдии: события, помощь, состав и объявления.',
    openingLine: 'Все ключевые сигналы гильдии собраны в одну точку входа.',
    personalStation: 'Твоя станция',
    personalStationBody: 'Личный контекст участника и быстрый доступ к рабочим маршрутам.',
    nextEvent: 'Следующее событие',
    nextEventEmpty: 'Пока нет активных событий в расписании.',
    urgentHelp: 'Срочная помощь',
    urgentHelpEmpty: 'Открытых запросов без движения сейчас нет.',
    readiness: 'Готовность состава',
    readinessEmpty: 'Нет данных по составу для оценки готовности.',
    announcements: 'Объявления',
    announcementsEmpty: 'Нет свежих объявлений для вывода на главный экран.',
    absences: 'Радар отсутствий',
    absencesEmpty: 'Сейчас нет активных сигналов по отсутствиям.',
    pvpPulse: 'PvP-пульс',
    pvpEmpty: 'PvP-контур пока без активной очереди и матчей.',
    quickRoutes: 'Быстрые маршруты',
    quickRoutesBody: 'Переходы в ключевые разделы, если нужно углубиться из дашборда.',
    openSchedule: 'Открыть расписание',
    openHelp: 'Открыть помощь',
    openNews: 'Открыть новости',
    openMembers: 'Открыть состав',
    openGuides: 'Открыть гайды',
    openPvp: 'Открыть PvP',
    openAbsences: 'Открыть отсутствия',
    totalMembers: 'Всего в контуре',
    activeMembers: 'В строю',
    readyCore: 'Готовое ядро',
    avgKpi: 'Средний KPI',
    unattendedRequests: 'Без ответа',
    openRequests: 'Открыто',
    pendingAbsences: 'На решении',
    activeAnnouncements: 'Активных объявлений',
    activeQueue: 'В очереди',
    liveMatch: 'Текущий матч',
    yourRole: 'Роль',
    yourClass: 'Класс',
    yourPrefix: 'Префикс',
    accountState: 'Статус учетки',
    activeState: 'Активна',
    inactiveState: 'Не активна',
    noClass: 'Не указан',
    noPrefix: 'Нет префикса',
    noOverlay: 'Офицерский слой пока без срочных действий.',
    officerOverlay: 'Офицерский слой',
    queuedNow: 'Ты уже в очереди PvP.',
    notQueued: 'Сейчас ты вне PvP-очереди.',
    noQueue: 'Очередь пока не собрана',
    contestedMatch: 'Есть спорный матч, нужен разбор.',
    noLiveMatch: 'Активного матча сейчас нет.',
    noResponder: 'Без отклика',
    responderOne: '1 отклик',
    responderMany: 'отклика',
    pinned: 'Закреп',
    latest: 'Последнее',
    live: 'Live',
    soon: 'Скоро',
    stable: 'Стабильно',
    today: 'Сегодня',
    tomorrow: 'Завтра',
    thisWeek: 'На неделе',
    now: 'Сейчас',
    refreshPulse: 'Пульс обновляется по живым данным модулей портала.',
    reloadLiveModules: 'Перезагрузить модули',
  },
  en: {
    title: 'Guild Dashboard',
    subtitle: 'A live Silent Moonfall status surface: upcoming events, urgent requests, roster readiness, and guild signals in one place.',
    chips: ['Live Status', 'Guild Pulse', 'Shared Overview'],
    liveStatus: 'Live status',
    allClear: 'System steady',
    activeAlerts: 'Active signals detected',
    situationRoom: 'Situation room',
    liveSnapshot: 'This screen keeps only the signals that affect guild coordination: events, support, roster, and announcements.',
    openingLine: 'All critical guild signals are gathered into one entry point.',
    personalStation: 'Your station',
    personalStationBody: 'Member context plus quick routes into the rest of the portal.',
    nextEvent: 'Next event',
    nextEventEmpty: 'No active events are scheduled right now.',
    urgentHelp: 'Urgent help',
    urgentHelpEmpty: 'No open requests are stalling right now.',
    readiness: 'Roster readiness',
    readinessEmpty: 'Not enough roster data to evaluate readiness yet.',
    announcements: 'Announcements',
    announcementsEmpty: 'No fresh announcements to surface on the dashboard.',
    absences: 'Absence radar',
    absencesEmpty: 'No active absence signals right now.',
    pvpPulse: 'PvP pulse',
    pvpEmpty: 'PvP is quiet right now: no queue and no live match.',
    quickRoutes: 'Quick routes',
    quickRoutesBody: 'Jump deeper into the core modules when a live card needs action.',
    openSchedule: 'Open schedule',
    openHelp: 'Open help board',
    openNews: 'Open news',
    openMembers: 'Open roster',
    openGuides: 'Open guides',
    openPvp: 'Open PvP',
    openAbsences: 'Open absences',
    totalMembers: 'In roster',
    activeMembers: 'Ready now',
    readyCore: 'Ready core',
    avgKpi: 'Average KPI',
    unattendedRequests: 'Unanswered',
    openRequests: 'Open',
    pendingAbsences: 'Pending',
    activeAnnouncements: 'Active announcements',
    activeQueue: 'In queue',
    liveMatch: 'Live match',
    yourRole: 'Role',
    yourClass: 'Class',
    yourPrefix: 'Prefix',
    accountState: 'Account state',
    activeState: 'Active',
    inactiveState: 'Inactive',
    noClass: 'Not set',
    noPrefix: 'No prefix',
    noOverlay: 'Officer overlay is quiet right now.',
    officerOverlay: 'Officer overlay',
    queuedNow: 'You are already in the PvP queue.',
    notQueued: 'You are outside the PvP queue right now.',
    noQueue: 'Queue is empty for now',
    contestedMatch: 'A disputed match needs attention.',
    noLiveMatch: 'No active match right now.',
    noResponder: 'No response',
    responderOne: '1 responder',
    responderMany: 'responders',
    pinned: 'Pinned',
    latest: 'Latest',
    live: 'Live',
    soon: 'Soon',
    stable: 'Stable',
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This week',
    now: 'Now',
    refreshPulse: 'Pulse refreshes from the live module data already running in the portal.',
    reloadLiveModules: 'Reload live modules',
  },
  zh: {
    title: '公会总览',
    subtitle: '把 Silent Moonfall 的实时状态放到一个入口：近期活动、紧急求助、成员战备与关键公告。',
    chips: ['Live Status', 'Guild Pulse', 'Shared Overview'],
    liveStatus: '实时状态',
    allClear: '整体稳定',
    activeAlerts: '存在活跃信号',
    situationRoom: '当前态势',
    liveSnapshot: '此页只保留真正影响公会协作的信号：活动、求助、成员状态与公告。',
    openingLine: '所有关键公会信号都汇聚到一个入口。',
    personalStation: '你的站位',
    personalStationBody: '成员个人上下文，加上进入核心模块的快速通道。',
    nextEvent: '下一场活动',
    nextEventEmpty: '当前没有可显示的活动安排。',
    urgentHelp: '紧急求助',
    urgentHelpEmpty: '当前没有停滞中的公开求助。',
    readiness: '成员战备',
    readinessEmpty: '当前缺少足够成员数据，暂时无法评估战备。',
    announcements: '公告',
    announcementsEmpty: '当前没有适合展示在首页的新公告。',
    absences: '请假雷达',
    absencesEmpty: '当前没有活跃的请假信号。',
    pvpPulse: 'PvP 脉搏',
    pvpEmpty: '当前 PvP 比较安静：没有排队，也没有进行中的对局。',
    quickRoutes: '快速入口',
    quickRoutesBody: '当某个实时卡片需要深入处理时，可以直接跳到对应模块。',
    openSchedule: '打开日程',
    openHelp: '打开求助',
    openNews: '打开公告',
    openMembers: '打开成员',
    openGuides: '打开攻略',
    openPvp: '打开 PvP',
    openAbsences: '打开请假',
    totalMembers: '总人数',
    activeMembers: '当前到位',
    readyCore: '核心战备',
    avgKpi: '平均 KPI',
    unattendedRequests: '未响应',
    openRequests: '开启中',
    pendingAbsences: '待处理',
    activeAnnouncements: '活跃公告',
    activeQueue: '队列人数',
    liveMatch: '进行中对局',
    yourRole: '角色',
    yourClass: '职业',
    yourPrefix: '前缀',
    accountState: '账号状态',
    activeState: '已激活',
    inactiveState: '未激活',
    noClass: '未设置',
    noPrefix: '无前缀',
    noOverlay: '军官层当前没有需要立即处理的事项。',
    officerOverlay: '军官视层',
    queuedNow: '你已经在 PvP 队列中。',
    notQueued: '你当前不在 PvP 队列中。',
    noQueue: '当前还没有形成队列',
    contestedMatch: '有争议对局需要处理。',
    noLiveMatch: '当前没有进行中的对局。',
    noResponder: '无人响应',
    responderOne: '1 人响应',
    responderMany: '人响应',
    pinned: '置顶',
    latest: '最新',
    live: 'Live',
    soon: '即将',
    stable: '稳定',
    today: '今天',
    tomorrow: '明天',
    thisWeek: '本周',
    now: '现在',
    refreshPulse: '页面脉搏来自各模块的实时数据。',
    reloadLiveModules: '重新加载实时模块',
  },
} satisfies Record<Language, DashboardCopy>;

const roleLabels: Record<Language, Record<UserRole, string>> = {
  ru: {
    guest: 'Гость',
    member: 'Участник',
    officer: 'Офицер',
    head: 'Глава',
    sysadmin: 'Сисадмин',
  },
  en: {
    guest: 'Guest',
    member: 'Member',
    officer: 'Officer',
    head: 'Head',
    sysadmin: 'Sysadmin',
  },
  zh: {
    guest: '访客',
    member: '成员',
    officer: '军官',
    head: '团长',
    sysadmin: '系统管理员',
  },
};

const weekdays = [
  {
    labels: { ru: 'Понедельник', en: 'Monday', zh: '星期一' },
    aliases: ['понедельник', 'пн', 'monday', 'mon', '星期一', '周一', '1'],
  },
  {
    labels: { ru: 'Вторник', en: 'Tuesday', zh: '星期二' },
    aliases: ['вторник', 'вт', 'tuesday', 'tue', 'tues', '星期二', '周二', '2'],
  },
  {
    labels: { ru: 'Среда', en: 'Wednesday', zh: '星期三' },
    aliases: ['среда', 'ср', 'wednesday', 'wed', '星期三', '周三', '3'],
  },
  {
    labels: { ru: 'Четверг', en: 'Thursday', zh: '星期四' },
    aliases: ['четверг', 'чт', 'thursday', 'thu', 'thur', 'thurs', '星期四', '周四', '4'],
  },
  {
    labels: { ru: 'Пятница', en: 'Friday', zh: '星期五' },
    aliases: ['пятница', 'пт', 'friday', 'fri', '星期五', '周五', '5'],
  },
  {
    labels: { ru: 'Суббота', en: 'Saturday', zh: '星期六' },
    aliases: ['суббота', 'сб', 'saturday', 'sat', '星期六', '周六', '6'],
  },
  {
    labels: { ru: 'Воскресенье', en: 'Sunday', zh: '星期日' },
    aliases: ['воскресенье', 'вс', 'sunday', 'sun', '星期日', '星期天', '周日', '周天', '7', '0'],
  },
];

type ScheduleCandidate = {
  id: string;
  title: string;
  label: string;
  time: string;
  detail: string;
  state: 'live' | 'soon' | 'scheduled';
  startsAt: number;
};

function normalizeDayValue(value: string): string {
  return value.trim().toLowerCase().replace(/ё/g, 'е');
}

function getLocale(language: Language): string {
  if (language === 'zh') return 'zh-CN';
  if (language === 'en') return 'en-US';
  return 'ru-RU';
}

function getWeekdayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function parseScheduleClock(value: string): { start: number; end: number } | null {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const start = Number(match[1]) * 60 + Number(match[2]);
  const endMatch = value.match(/[-–]\s*(\d{1,2}):(\d{2})/);
  if (!endMatch) {
    return { start, end: start + 60 };
  }

  return {
    start,
    end: Number(endMatch[1]) * 60 + Number(endMatch[2]),
  };
}

function getScheduleDayIndex(item: Schedule): number | null {
  const normalized = normalizeDayValue(item.dayType || item.type || item.group || '');
  if (!normalized) return null;

  const weekdayIndex = weekdays.findIndex((weekday) =>
    weekday.aliases.some((alias) => normalizeDayValue(alias) === normalized)
  );

  return weekdayIndex >= 0 ? weekdayIndex : null;
}

function getScheduleTitle(item: Schedule, language: Language): string {
  if (language === 'zh') return item.titleZh || item.titleEn || item.titleRu || item.registration || 'Untitled';
  if (language === 'en') return item.titleEn || item.titleRu || item.titleZh || item.registration || 'Untitled';
  return item.titleRu || item.titleEn || item.titleZh || item.registration || 'Без названия';
}

function formatRelativeEvent(target: Date, now: Date, language: Language, copy: DashboardCopy): { label: string; state: ScheduleCandidate['state'] } {
  const diffMinutes = Math.round((target.getTime() - now.getTime()) / 60000);
  if (diffMinutes <= 0) {
    return { label: copy.now, state: 'live' };
  }

  if (diffMinutes < 60) {
    if (language === 'en') return { label: `in ${diffMinutes}m`, state: 'soon' };
    if (language === 'zh') return { label: `${diffMinutes} 分钟后`, state: 'soon' };
    return { label: `через ${diffMinutes}м`, state: 'soon' };
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  const state: ScheduleCandidate['state'] = diffMinutes <= 180 ? 'soon' : 'scheduled';

  if (language === 'en') return { label: `in ${hours}h ${minutes}m`, state };
  if (language === 'zh') return { label: `${hours} 小时 ${minutes} 分后`, state };
  return { label: `через ${hours}ч ${minutes}м`, state };
}

function getUpcomingScheduleItem(schedule: Schedule[], language: Language, copy: DashboardCopy): ScheduleCandidate | null {
  const now = new Date();
  const nowDayIndex = getWeekdayIndex(now);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const candidates = schedule
    .filter((item) => item.active !== false)
    .map((item) => {
      const dayIndex = getScheduleDayIndex(item);
      const parsed = parseScheduleClock(item.time || item.description || '');
      if (dayIndex === null || !parsed) return null;

      const offset = (dayIndex - nowDayIndex + 7) % 7;
      const startDate = new Date(now);
      startDate.setSeconds(0, 0);
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() + offset);
      startDate.setMinutes(parsed.start);

      let state: ScheduleCandidate['state'] = 'scheduled';

      if (offset === 0 && currentMinutes >= parsed.start && currentMinutes < parsed.end) {
        state = 'live';
      } else if (offset === 0 && currentMinutes >= parsed.end) {
        startDate.setDate(startDate.getDate() + 7);
      }

      const relative = formatRelativeEvent(startDate, now, language, copy);
      if (state !== 'live') {
        state = relative.state;
      }

      const label =
        offset === 0
          ? copy.today
          : offset === 1
            ? copy.tomorrow
            : weekdays[dayIndex].labels[language];

      return {
        id: item.id || `${item.dayType}-${item.time}-${item.titleRu}`,
        title: getScheduleTitle(item, language),
        label,
        time: item.time || item.description || '--',
        detail: state === 'live' ? copy.live : relative.label,
        state,
        startsAt: startDate.getTime(),
      };
    })
    .filter((item): item is ScheduleCandidate => Boolean(item))
    .sort((left, right) => left.startsAt - right.startsAt);

  return candidates[0] || null;
}

function getResponderLabel(count: number, copy: DashboardCopy, language: Language): string {
  if (count <= 0) return copy.noResponder;
  if (count === 1) return copy.responderOne;
  if (language === 'zh') return `${count}${copy.responderMany}`;
  return `${count} ${copy.responderMany}`;
}

function formatDateTime(value: string, language: Language): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return value;
  return date.toLocaleString(getLocale(language), {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateShort(value: string, language: Language): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return value;
  return date.toLocaleDateString(getLocale(language), {
    day: '2-digit',
    month: '2-digit',
  });
}

function isCurrentAbsence(absence: Absence): boolean {
  const now = Date.now();
  const start = new Date(absence.startDate).getTime();
  const end = new Date(absence.endDate).getTime();
  return Number.isFinite(start) && Number.isFinite(end) && now >= start && now <= end;
}

function isSilentMoonfallGuild(guild: string): boolean {
  return guild.trim().toLowerCase() === 'silent moonfall';
}

function MiniSkeleton() {
  return (
    <div className="dashboard-mini-skeleton" aria-hidden="true">
      <span className="dashboard-mini-skeleton__line dashboard-mini-skeleton__line--short" />
      <span className="dashboard-mini-skeleton__line" />
      <span className="dashboard-mini-skeleton__line dashboard-mini-skeleton__line--soft" />
    </div>
  );
}

function MetricTile({
  label,
  value,
  tone = 'steady',
}: {
  label: string;
  value: string | number;
  tone?: LiveTone;
}) {
  return (
    <div className={cn('dashboard-metric-tile', tone === 'alert' && 'dashboard-metric-tile--alert', tone === 'active' && 'dashboard-metric-tile--active')}>
      <div className="dashboard-metric-tile__value">{value}</div>
      <div className="dashboard-metric-tile__label">{label}</div>
    </div>
  );
}

function SignalBadge({ tone, children }: { tone: LiveTone; children: React.ReactNode }) {
  return (
    <span className={cn('ui-badge', tone === 'alert' ? 'ui-badge-danger' : tone === 'active' ? 'ui-badge-success' : 'ui-badge-muted')}>
      {children}
    </span>
  );
}

function StatusCard({
  title,
  icon,
  actionHref,
  actionLabel,
  tone = 'steady',
  children,
}: {
  title: string;
  icon: IconName;
  actionHref: string;
  actionLabel: string;
  tone?: LiveTone;
  children: React.ReactNode;
}) {
  return (
    <article className={cn('card section-card dashboard-status-card p-5 sm:p-6', tone === 'alert' && 'dashboard-status-card--alert', tone === 'active' && 'dashboard-status-card--active')}>
      <div className="dashboard-status-card__header">
        <div className="dashboard-status-card__title-wrap">
          <span className="dashboard-status-card__icon">
            <WuxiaIcon name={icon} className="h-5 w-5" />
          </span>
          <h3 className="dashboard-status-card__title">{title}</h3>
        </div>
        <Link href={actionHref} className="dashboard-inline-link">
          {actionLabel}
        </Link>
      </div>
      {children}
    </article>
  );
}

function DashboardSectionContent({ user, language }: DashboardSectionProps) {
  const copy = dashboardCopy[language];
  const { data: schedule = [], isLoading: scheduleLoading, error: scheduleError, refetch: refetchSchedule } = useSchedule(language);
  const { data: openHelp = [], isLoading: helpLoading, error: helpError, refetch: refetchHelp } = useHelp('open');
  const { data: registrations = [], isLoading: registrationsLoading, error: registrationsError, refetch: refetchRegistrations } = useRegistrations();
  const { data: news = [], isLoading: newsLoading, error: newsError, refetch: refetchNews } = useNews();
  const { data: absences = [], isLoading: absencesLoading } = useAbsences();
  const { data: pvpState, isLoading: pvpLoading } = usePvpState();
  const isOfficer = hasRoleAtLeast(user.role, 'officer');

  const nextEvent = useMemo(() => getUpcomingScheduleItem(schedule, language, copy), [copy, language, schedule]);

  const helpSnapshot = useMemo(() => {
    const sorted = [...openHelp].sort((left, right) => {
      const leftResponders = left.responders.length;
      const rightResponders = right.responders.length;
      if (leftResponders !== rightResponders) {
        return leftResponders - rightResponders;
      }

      return new Date(left.gatheringStart).getTime() - new Date(right.gatheringStart).getTime();
    });

    const unattended = sorted.filter((request) => request.responders.length === 0).length;
    const urgent = sorted.slice(0, 3).map((request) => {
      const tone: LiveTone = request.responders.length === 0 ? 'alert' : request.responders.length === 1 ? 'active' : 'steady';
      return { ...request, tone };
    });

    return {
      urgent,
      unattended,
      total: openHelp.length,
    };
  }, [openHelp]);

  const rosterSnapshot = useMemo(() => {
    const roster = registrations.filter((item) => isSilentMoonfallGuild(item.guild));
    const source = roster.length > 0 ? roster : registrations;
    const total = source.length;
    const active = source.filter((item) => item.status === 'active').length;
    const readyCore = source.filter((item) => item.status === 'active' && item.kpi >= 6).length;
    const avgKpi = total > 0 ? (source.reduce((sum, item) => sum + item.kpi, 0) / total).toFixed(1) : '0.0';
    const inactive = source.filter((item) => item.status !== 'active').length;

    return {
      total,
      active,
      readyCore,
      avgKpi,
      inactive,
      readinessPercent: total > 0 ? Math.round((active / total) * 100) : 0,
    };
  }, [registrations]);

  const newsSnapshot = useMemo(() => {
    const ordered = [...news].sort((left, right) => {
      const pinDelta = Number(Boolean(right.pinned)) - Number(Boolean(left.pinned));
      if (pinDelta !== 0) return pinDelta;
      return new Date(right.date).getTime() - new Date(left.date).getTime();
    });

    return {
      featured: ordered.slice(0, 3),
      activeCount: ordered.filter((item) => item.pinned).length || Math.min(ordered.length, 1),
    };
  }, [news]);

  const absenceSnapshot = useMemo(() => {
    const pending = absences.filter((item) => item.status === 'pending');
    const approvedNow = absences.filter((item) => item.status === 'approved' && isCurrentAbsence(item));
    return {
      pending,
      approvedNow,
    };
  }, [absences]);

  const pvpSnapshot = useMemo(() => {
    const state: PvpState =
      pvpState ?? {
        queue: [],
        leaderboard: [],
        recentMatches: [],
        activeMatch: null,
        userInQueue: false,
        userRating: null,
      };

    return {
      queueSize: state.queue.length,
      activeMatch: state.activeMatch,
      disputed: state.activeMatch?.confirmationStatus === 'disputed',
      userInQueue: state.userInQueue,
      topPlayer: state.leaderboard[0] || null,
    };
  }, [pvpState]);

  const officerSignals = helpSnapshot.unattended + absenceSnapshot.pending.length + rosterSnapshot.inactive;

  const liveTone: LiveTone =
    helpSnapshot.unattended > 0 || absenceSnapshot.pending.length > 0 || pvpSnapshot.disputed
      ? 'alert'
      : nextEvent?.state === 'live' || nextEvent?.state === 'soon'
        ? 'active'
        : 'steady';

  const liveLabel = liveTone === 'alert' ? copy.activeAlerts : liveTone === 'active' ? copy.live : copy.allClear;

  const coreLoading = scheduleLoading && helpLoading && registrationsLoading && newsLoading;
  const coreEmpty = !schedule.length && !openHelp.length && !registrations.length && !news.length;
  const coreErrored = Boolean(scheduleError && helpError && registrationsError && newsError);

  if (coreLoading && coreEmpty) {
    return <LoadingState title={copy.title} subtitle={copy.refreshPulse} icon="eye" skeletonCount={4} layout="cards" />;
  }

  if (coreErrored && coreEmpty) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon="alertTriangle"
            title={copy.title}
            description={copy.refreshPulse}
            action={{
              label: copy.reloadLiveModules,
              onClick: () => {
                void Promise.all([refetchSchedule(), refetchHelp(), refetchRegistrations(), refetchNews()]);
              },
            }}
            variant="error"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-stack-lg">
          <SectionHero
            icon={<WuxiaIcon name="eye" className="h-5 w-5" />}
            title={copy.title}
            subtitle={copy.subtitle}
            chips={copy.chips}
            actions={
              <>
                <Link href="/schedule" className="btn-primary px-4 py-2.5">
                  {copy.openSchedule}
                </Link>
                <Link href="/help" className="btn-secondary px-4 py-2.5">
                  {copy.openHelp}
                </Link>
              </>
            }
          />

          <div className="guild-dashboard-grid">
            <article className="card section-card guild-dashboard-command p-6 sm:p-7 xl:p-8">
              <div className="guild-dashboard-command__header">
                <div>
                  <div className="dashboard-kicker">{copy.liveStatus}</div>
                  <h3 className="guild-dashboard-command__title">{copy.situationRoom}</h3>
                </div>
                <SignalBadge tone={liveTone}>{liveLabel}</SignalBadge>
              </div>

              <p className="guild-dashboard-command__lede">{copy.openingLine}</p>
              <p className="guild-dashboard-command__body">{copy.liveSnapshot}</p>

              <div className="guild-dashboard-metric-grid">
                <MetricTile label={copy.activeMembers} value={rosterSnapshot.active} tone={liveTone === 'steady' ? 'active' : liveTone} />
                <MetricTile label={copy.unattendedRequests} value={helpSnapshot.unattended} tone={helpSnapshot.unattended > 0 ? 'alert' : 'steady'} />
                <MetricTile label={copy.pendingAbsences} value={absenceSnapshot.pending.length} tone={absenceSnapshot.pending.length > 0 ? 'alert' : 'steady'} />
                <MetricTile label={copy.activeAnnouncements} value={newsSnapshot.activeCount} tone="active" />
              </div>

              <div className="guild-dashboard-command__signals">
                <div className="guild-dashboard-command__signal">
                  <span className="guild-dashboard-command__signal-label">{copy.nextEvent}</span>
                  <strong>{nextEvent ? nextEvent.title : copy.nextEventEmpty}</strong>
                  <span>{nextEvent ? `${nextEvent.label} · ${nextEvent.time} · ${nextEvent.detail}` : copy.thisWeek}</span>
                </div>
                <div className="guild-dashboard-command__signal">
                  <span className="guild-dashboard-command__signal-label">{copy.urgentHelp}</span>
                  <strong>{helpSnapshot.total}</strong>
                  <span>{helpSnapshot.unattended > 0 ? `${copy.unattendedRequests}: ${helpSnapshot.unattended}` : copy.allClear}</span>
                </div>
                <div className="guild-dashboard-command__signal">
                  <span className="guild-dashboard-command__signal-label">{copy.announcements}</span>
                  <strong>{newsSnapshot.featured[0]?.title || copy.announcementsEmpty}</strong>
                  <span>{newsSnapshot.featured[0] ? formatDateTime(newsSnapshot.featured[0].date, language) : copy.latest}</span>
                </div>
              </div>
            </article>

            <aside className="card section-card guild-dashboard-station p-6 sm:p-7">
              <div className="guild-dashboard-station__header">
                <div>
                  <div className="dashboard-kicker">{copy.personalStation}</div>
                  <h3 className="guild-dashboard-station__title">{user.nickname || 'Silent Moonfall'}</h3>
                </div>
                <SignalBadge tone={user.isActive ? 'active' : 'alert'}>
                  {user.isActive ? copy.activeState : copy.inactiveState}
                </SignalBadge>
              </div>

              <p className="guild-dashboard-station__body">{copy.personalStationBody}</p>

              <div className="guild-dashboard-station__facts">
                <div>
                  <span>{copy.yourRole}</span>
                  <strong>{roleLabels[language][user.role]}</strong>
                </div>
                <div>
                  <span>{copy.yourClass}</span>
                  <strong>{user.className || copy.noClass}</strong>
                </div>
                <div>
                  <span>{copy.yourPrefix}</span>
                  <strong>{user.prefix || copy.noPrefix}</strong>
                </div>
                <div>
                  <span>{copy.accountState}</span>
                  <strong>{user.isActive ? copy.activeState : copy.inactiveState}</strong>
                </div>
              </div>

              <div className="guild-dashboard-station__queue">
                <div>
                  <span className="dashboard-kicker">PvP</span>
                  <strong>{pvpSnapshot.userInQueue ? copy.queuedNow : copy.notQueued}</strong>
                </div>
                <div className="ui-badge ui-badge-muted">
                  {pvpSnapshot.queueSize > 0 ? `${copy.activeQueue}: ${pvpSnapshot.queueSize}` : copy.noQueue}
                </div>
              </div>

              <div className="guild-dashboard-station__overlay">
                <span className="dashboard-kicker">{copy.officerOverlay}</span>
                <strong>{isOfficer && officerSignals > 0 ? officerSignals : 0}</strong>
                <p>{isOfficer && officerSignals > 0 ? copy.activeAlerts : copy.noOverlay}</p>
              </div>
            </aside>
          </div>

          <div className="guild-dashboard-primary-grid">
            <StatusCard title={copy.nextEvent} icon="calendarCheck" actionHref="/schedule" actionLabel={copy.openSchedule} tone={nextEvent?.state === 'live' ? 'active' : nextEvent?.state === 'soon' ? 'alert' : 'steady'}>
              {scheduleLoading ? (
                <MiniSkeleton />
              ) : nextEvent ? (
                <div className="dashboard-card-stack">
                  <div>
                    <div className="dashboard-card-highlight">{nextEvent.title}</div>
                    <div className="dashboard-card-copy">{nextEvent.label} · {nextEvent.time}</div>
                  </div>
                  <div className="dashboard-inline-tags">
                    <SignalBadge tone={nextEvent.state === 'live' ? 'active' : nextEvent.state === 'soon' ? 'alert' : 'steady'}>
                      {nextEvent.state === 'live' ? copy.live : nextEvent.state === 'soon' ? copy.soon : copy.stable}
                    </SignalBadge>
                    <span className="ui-badge ui-badge-muted">{nextEvent.detail}</span>
                  </div>
                </div>
              ) : (
                <div className="dashboard-card-empty">{copy.nextEventEmpty}</div>
              )}
            </StatusCard>

            <StatusCard title={copy.urgentHelp} icon="help" actionHref="/help" actionLabel={copy.openHelp} tone={helpSnapshot.unattended > 0 ? 'alert' : helpSnapshot.total > 0 ? 'active' : 'steady'}>
              {helpLoading ? (
                <MiniSkeleton />
              ) : helpSnapshot.urgent.length > 0 ? (
                <div className="dashboard-card-stack">
                  <div className="dashboard-inline-tags">
                    <SignalBadge tone={helpSnapshot.unattended > 0 ? 'alert' : 'active'}>{copy.openRequests}: {helpSnapshot.total}</SignalBadge>
                    <span className="ui-badge ui-badge-muted">{copy.unattendedRequests}: {helpSnapshot.unattended}</span>
                  </div>
                  <div className="dashboard-list">
                    {helpSnapshot.urgent.map((request) => (
                      <div key={request.id} className="dashboard-list__item">
                        <div>
                          <div className="dashboard-list__title">{request.title}</div>
                          <div className="dashboard-list__meta">{formatDateTime(request.gatheringStart, language)}</div>
                        </div>
                        <SignalBadge tone={request.tone}>{getResponderLabel(request.responders.length, copy, language)}</SignalBadge>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="dashboard-card-empty">{copy.urgentHelpEmpty}</div>
              )}
            </StatusCard>

            <StatusCard title={copy.readiness} icon="registration" actionHref="/members" actionLabel={copy.openMembers} tone={rosterSnapshot.readinessPercent >= 70 ? 'active' : rosterSnapshot.readinessPercent >= 40 ? 'steady' : 'alert'}>
              {registrationsLoading ? (
                <MiniSkeleton />
              ) : rosterSnapshot.total > 0 ? (
                <div className="dashboard-card-stack">
                  <div className="dashboard-progress-shell">
                    <div className="dashboard-progress-labels">
                      <span>{copy.activeMembers}</span>
                      <strong>{rosterSnapshot.readinessPercent}%</strong>
                    </div>
                    <div className="dashboard-progress-track">
                      <span className="dashboard-progress-fill" style={{ width: `${rosterSnapshot.readinessPercent}%` }} />
                    </div>
                  </div>
                  <div className="dashboard-readiness-grid">
                    <MetricTile label={copy.totalMembers} value={rosterSnapshot.total} />
                    <MetricTile label={copy.readyCore} value={rosterSnapshot.readyCore} tone="active" />
                    <MetricTile label={copy.avgKpi} value={rosterSnapshot.avgKpi} tone={Number(rosterSnapshot.avgKpi) >= 6 ? 'active' : Number(rosterSnapshot.avgKpi) >= 3 ? 'steady' : 'alert'} />
                  </div>
                </div>
              ) : (
                <div className="dashboard-card-empty">{copy.readinessEmpty}</div>
              )}
            </StatusCard>

            <StatusCard title={copy.announcements} icon="news" actionHref="/news" actionLabel={copy.openNews} tone={newsSnapshot.activeCount > 0 ? 'active' : 'steady'}>
              {newsLoading ? (
                <MiniSkeleton />
              ) : newsSnapshot.featured.length > 0 ? (
                <div className="dashboard-card-stack">
                  {newsSnapshot.featured.map((item, index) => (
                    <div key={item.id} className={cn('dashboard-news-spotlight', index === 0 && 'dashboard-news-spotlight--featured')}>
                      <div className="dashboard-news-spotlight__meta">
                        <SignalBadge tone={item.pinned ? 'active' : 'steady'}>{item.pinned ? copy.pinned : copy.latest}</SignalBadge>
                        <span>{formatDateShort(item.date, language)}</span>
                      </div>
                      <div className="dashboard-news-spotlight__title">{item.title}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dashboard-card-empty">{copy.announcementsEmpty}</div>
              )}
            </StatusCard>
          </div>

          <div className="guild-dashboard-secondary-grid">
            <StatusCard title={copy.absences} icon="absences" actionHref="/absences" actionLabel={copy.openAbsences} tone={absenceSnapshot.pending.length > 0 ? 'alert' : absenceSnapshot.approvedNow.length > 0 ? 'active' : 'steady'}>
              {absencesLoading ? (
                <MiniSkeleton />
              ) : absenceSnapshot.pending.length > 0 || absenceSnapshot.approvedNow.length > 0 ? (
                <div className="dashboard-card-stack">
                  <div className="dashboard-inline-tags">
                    <span className="ui-badge ui-badge-muted">{copy.pendingAbsences}: {absenceSnapshot.pending.length}</span>
                    <SignalBadge tone={absenceSnapshot.approvedNow.length > 0 ? 'active' : 'steady'}>
                      {copy.activeMembers}: {absenceSnapshot.approvedNow.length}
                    </SignalBadge>
                  </div>
                  <div className="dashboard-list">
                    {[...absenceSnapshot.pending.slice(0, 2), ...absenceSnapshot.approvedNow.slice(0, 1)].map((absence) => (
                      <div key={absence.id} className="dashboard-list__item">
                        <div>
                          <div className="dashboard-list__title">{absence.member}</div>
                          <div className="dashboard-list__meta">{formatDateShort(absence.startDate, language)} - {formatDateShort(absence.endDate, language)}</div>
                        </div>
                        <SignalBadge tone={absence.status === 'pending' ? 'alert' : 'active'}>{absence.status}</SignalBadge>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="dashboard-card-empty">{copy.absencesEmpty}</div>
              )}
            </StatusCard>

            <StatusCard title={copy.pvpPulse} icon="sword" actionHref="/pvp" actionLabel={copy.openPvp} tone={pvpSnapshot.disputed ? 'alert' : pvpSnapshot.queueSize > 0 || pvpSnapshot.activeMatch ? 'active' : 'steady'}>
              {pvpLoading ? (
                <MiniSkeleton />
              ) : pvpSnapshot.queueSize > 0 || pvpSnapshot.activeMatch ? (
                <div className="dashboard-card-stack">
                  <div className="dashboard-inline-tags">
                    <SignalBadge tone={pvpSnapshot.queueSize > 0 ? 'active' : 'steady'}>{copy.activeQueue}: {pvpSnapshot.queueSize}</SignalBadge>
                    <span className="ui-badge ui-badge-muted">{pvpSnapshot.activeMatch ? copy.liveMatch : copy.noLiveMatch}</span>
                  </div>
                  <div className="dashboard-list">
                    {pvpSnapshot.activeMatch ? (
                      <div className="dashboard-list__item">
                        <div>
                          <div className="dashboard-list__title">{pvpSnapshot.activeMatch.playerOne.nickname} vs {pvpSnapshot.activeMatch.playerTwo.nickname}</div>
                          <div className="dashboard-list__meta">{formatDateTime(pvpSnapshot.activeMatch.createdAt, language)}</div>
                        </div>
                        <SignalBadge tone={pvpSnapshot.disputed ? 'alert' : 'active'}>
                          {pvpSnapshot.disputed ? copy.contestedMatch : copy.live}
                        </SignalBadge>
                      </div>
                    ) : null}
                    {pvpSnapshot.topPlayer ? (
                      <div className="dashboard-list__item">
                        <div>
                          <div className="dashboard-list__title">{pvpSnapshot.topPlayer.nickname}</div>
                          <div className="dashboard-list__meta">#1 · rating {pvpSnapshot.topPlayer.rating}</div>
                        </div>
                        <span className="ui-badge ui-badge-muted">{copy.latest}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="dashboard-card-empty">{copy.pvpEmpty}</div>
              )}
            </StatusCard>

            <StatusCard title={copy.quickRoutes} icon="seal" actionHref="/guides" actionLabel={copy.openGuides} tone="steady">
              <div className="dashboard-card-stack">
                <p className="dashboard-card-copy">{copy.quickRoutesBody}</p>
                <div className="dashboard-route-grid">
                  {[
                    { href: '/schedule', section: 'schedule' as const },
                    { href: '/help', section: 'help' as const },
                    { href: '/news', section: 'news' as const },
                    { href: '/members', section: 'registration' as const },
                    { href: '/guides', section: 'guides' as const },
                    { href: '/profile', section: 'profile' as const },
                  ].map((item) => (
                    <Link key={item.href} href={item.href} className="dashboard-route-link">
                      <span className="dashboard-route-link__icon">
                        <WuxiaIcon name={item.section} className="h-4 w-4" />
                      </span>
                      <span>{sectionLabels[language][item.section]}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </StatusCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DashboardSection(props: DashboardSectionProps) {
  return (
    <ErrorBoundary>
      <DashboardSectionContent {...props} />
    </ErrorBoundary>
  );
}
