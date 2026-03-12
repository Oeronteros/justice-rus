'use client';

import Link from 'next/link';
import { useMemo, useEffect } from 'react';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import { PrefixBadge } from '@/components/PrefixBadge';
import { SectionHero } from '@/components/shared/SectionHero';
import { useAbsences } from '@/lib/absences/hooks';
import { hasRoleAtLeast } from '@/lib/authz';
import { useHelp } from '@/lib/help/hooks';
import { sectionLabels, type Language } from '@/lib/i18n';
import { useNews } from '@/lib/news/hooks';
import { usePvpState } from '@/lib/pvp/hooks';
import { useRegistrations } from '@/lib/registration/hooks';
import { useSchedule } from '@/lib/schedule/hooks';
import { useHelpNotifications, useAbsenceNotifications, usePvpNotifications } from '@/lib/notifications/hooks';
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

type ActivityType =
  | 'joined_guild'
  | 'responded_help'
  | 'created_help'
  | 'created_absence'
  | 'approved_absence'
  | 'closed_help'
  | 'created_guide'
  | 'joined_pvp'
  | 'completed_pvp'
  | 'updated_profile'
  | 'created_news'
  | 'rsvp_event';

type ActivityEvent = {
  id: string;
  type: ActivityType;
  actor: string;
  timestamp: string;
  details?: string;
};

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
  actionCenter: string;
  actionCenterBody: string;
  myTasks: string;
  noTasks: string;
  rsvpRequests: string;
  noRsvps: string;
  upcomingEvents: string;
  noUpcoming: string;
  officerActions: string;
  pendingApprovals: string;
  escalations: string;
  noOfficerActions: string;
  pendingAbsencesLabel: string;
  pendingHelpLabel: string;
  inactiveAccountsLabel: string;
  disputedMatchesLabel: string;
  activityFeed: string;
  activityFeedBody: string;
  noActivity: string;
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
  openProfile: string;
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
  joinedGuild: string;
  respondedToHelp: string;
  createdHelp: string;
  createdAbsence: string;
  approvedAbsence: string;
  closedHelp: string;
  createdGuide: string;
  joinedPvpQueue: string;
  completedPvpMatch: string;
  updatedProfile: string;
  createdNews: string;
  rsvpdToEvent: string;
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
  justNow: string;
};

const dashboardCopy: Record<Language, DashboardCopy> = {
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
    actionCenter: 'Центр действий',
    actionCenterBody: 'Персональные задачи и отклики, которые ждут твоего участия.',
    myTasks: 'Мои задачи',
    noTasks: 'Нет активных задач',
    rsvpRequests: 'Отклики на события',
    noRsvps: 'Нет ожидающих откликов',
    upcomingEvents: 'Ближайшие события',
    noUpcoming: 'Нет событий в ближайшее время',
    officerActions: 'Действия офицера',
    pendingApprovals: 'Требуют решения',
    escalations: 'Эскалации',
    noOfficerActions: 'Нет срочных действий',
    pendingAbsencesLabel: 'Отсутствия на одобрении',
    pendingHelpLabel: 'Запросы без ответа',
    inactiveAccountsLabel: 'Неактивные аккаунты',
    disputedMatchesLabel: 'Спорные матчи',
    activityFeed: 'Лента событий',
    activityFeedBody: 'Последние изменения в гильдии: участники, события, помощь, PvP.',
    noActivity: 'Пока нет событий для отображения',
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
    openProfile: 'Открыть профиль',
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
    joinedGuild: 'Присоединился к гильдии',
    respondedToHelp: 'Откликнулся на помощь',
    createdHelp: 'Создан запрос помощи',
    createdAbsence: 'Создал отсутствие',
    approvedAbsence: 'Одобрено отсутствие',
    closedHelp: 'Закрыт запрос помощи',
    createdGuide: 'Создан гайд',
    joinedPvpQueue: 'Вступил в PvP-очередь',
    completedPvpMatch: 'Завершён PvP-матч',
    updatedProfile: 'Обновлён профиль',
    createdNews: 'Создана новость',
    rsvpdToEvent: 'Отклик на событие',
    minutesAgo: 'мин. назад',
    hoursAgo: 'ч. назад',
    daysAgo: 'дн. назад',
    justNow: 'Только что',
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
    actionCenter: 'Action Center',
    actionCenterBody: 'Personal tasks and responses waiting for your participation.',
    myTasks: 'My Tasks',
    noTasks: 'No active tasks',
    rsvpRequests: 'Event RSVPs',
    noRsvps: 'No pending RSVPs',
    upcomingEvents: 'Upcoming Events',
    noUpcoming: 'No upcoming events',
    officerActions: 'Officer Actions',
    pendingApprovals: 'Pending Approvals',
    escalations: 'Escalations',
    noOfficerActions: 'No urgent actions',
    pendingAbsencesLabel: 'Absences pending',
    pendingHelpLabel: 'Unanswered requests',
    inactiveAccountsLabel: 'Inactive accounts',
    disputedMatchesLabel: 'Disputed matches',
    activityFeed: 'Activity Feed',
    activityFeedBody: 'Recent guild changes: members, events, help, PvP.',
    noActivity: 'No activity to display yet',
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
    openProfile: 'Open profile',
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
    joinedGuild: 'Joined the guild',
    respondedToHelp: 'Responded to help request',
    createdHelp: 'Created help request',
    createdAbsence: 'Created absence',
    approvedAbsence: 'Approved absence',
    closedHelp: 'Closed help request',
    createdGuide: 'Created guide',
    joinedPvpQueue: 'Joined PvP queue',
    completedPvpMatch: 'Completed PvP match',
    updatedProfile: 'Updated profile',
    createdNews: 'Created news',
    rsvpdToEvent: 'RSVP to event',
    minutesAgo: 'min ago',
    hoursAgo: 'h ago',
    daysAgo: 'd ago',
    justNow: 'Just now',
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
    actionCenter: '行动中心',
    actionCenterBody: '等待你参与的个人任务和响应。',
    myTasks: '我的任务',
    noTasks: '没有活跃任务',
    rsvpRequests: '活动响应',
    noRsvps: '没有待处理的响应',
    upcomingEvents: '近期活动',
    noUpcoming: '近期没有活动',
    officerActions: '军官行动',
    pendingApprovals: '待审批',
    escalations: '升级事项',
    noOfficerActions: '没有紧急行动',
    pendingAbsencesLabel: '待批假',
    pendingHelpLabel: '未响应求助',
    inactiveAccountsLabel: '不活跃账号',
    disputedMatchesLabel: '争议对局',
    activityFeed: '动态',
    activityFeedBody: '公会近期变化：成员、活动、求助、PvP。',
    noActivity: '暂无动态',
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
    openProfile: '打开个人页',
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
    joinedGuild: '加入公会',
    respondedToHelp: '响应求助',
    createdHelp: '创建求助请求',
    createdAbsence: '创建请假',
    approvedAbsence: '批准请假',
    closedHelp: '关闭求助',
    createdGuide: '创建攻略',
    joinedPvpQueue: '加入 PvP 队列',
    completedPvpMatch: '完成 PvP 对局',
    updatedProfile: '更新资料',
    createdNews: '发布公告',
    rsvpdToEvent: '响应活动',
    minutesAgo: '分钟前',
    hoursAgo: '小时前',
    daysAgo: '天前',
    justNow: '刚刚',
  },
};

const roleLabels: Record<Language, Record<UserRole, string>> = {
  ru: { guest: 'Гость', member: 'Участник', officer: 'Офицер', head: 'Глава', sysadmin: 'Сисадмин' },
  en: { guest: 'Guest', member: 'Member', officer: 'Officer', head: 'Head', sysadmin: 'Sysadmin' },
  zh: { guest: '访客', member: '成员', officer: '军官', head: '团长', sysadmin: '系统管理员' },
};

function formatTimeAgo(value: string, copy: DashboardCopy, language: Language): string {
  const now = Date.now();
  const then = new Date(value).getTime();
  if (!Number.isFinite(then)) return copy.justNow;

  const diffMinutes = Math.round((now - then) / 60000);
  if (diffMinutes <= 1) return copy.justNow;
  if (diffMinutes < 60) return `${diffMinutes} ${copy.minutesAgo}`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} ${copy.hoursAgo}`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} ${copy.daysAgo}`;
}

function generateSyntheticActivity(
  help: { id: string; title: string; author: string; createdAt: string; responders: any[] }[],
  absences: Absence[],
  news: { id: string; title: string; author: string; date: string }[],
  registrations: Registration[],
  pvpState: PvpState | null,
  copy: DashboardCopy,
  language: Language
): ActivityEvent[] {
  const events: ActivityEvent[] = [];

  help.slice(0, 3).forEach((h) => {
    if (h.responders.length > 0) {
      events.push({
        id: `help-${h.id}`,
        type: 'responded_help',
        actor: h.responders[0].nickname || h.author,
        timestamp: h.responders[0].respondedAt || h.createdAt,
        details: h.title,
      });
    }
    events.push({
      id: `help-created-${h.id}`,
      type: 'created_help',
      actor: h.author,
      timestamp: h.createdAt,
      details: h.title,
    });
  });

  absences.slice(0, 2).forEach((a) => {
    events.push({
      id: `absence-${a.id}`,
      type: a.status === 'approved' ? 'approved_absence' : 'created_absence',
      actor: a.member,
      timestamp: a.startDate,
      details: a.reason,
    });
  });

  news.slice(0, 2).forEach((n) => {
    events.push({
      id: `news-${n.id}`,
      type: 'created_news',
      actor: n.author,
      timestamp: n.date,
      details: n.title,
    });
  });

  registrations.slice(0, 2).forEach((r) => {
    events.push({
      id: `member-${r.discord}`,
      type: 'joined_guild',
      actor: r.nickname,
      timestamp: r.joinDate,
    });
  });

  if (pvpState?.recentMatches && pvpState.recentMatches.length > 0) {
    const match = pvpState.recentMatches[0];
    events.push({
      id: `pvp-${match.id}`,
      type: 'completed_pvp',
      actor: match.playerOne.nickname,
      timestamp: match.confirmedAt || match.updatedAt,
      details: `${match.playerOne.nickname} vs ${match.playerTwo.nickname}`,
    });
  }

  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 8);
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

function MetricTile({ label, value, tone = 'steady' }: { label: string; value: string | number; tone?: LiveTone }) {
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

function DashboardHeroRegion({
  copy,
  liveTone,
  liveLabel,
  rosterSnapshot,
  helpSnapshot,
  absenceSnapshot,
  newsSnapshot,
  user,
  language,
  pvpSnapshot,
  isOfficer,
  officerSignals,
}: {
  copy: DashboardCopy;
  liveTone: LiveTone;
  liveLabel: string;
  rosterSnapshot: { active: number; readinessPercent: number; readyCore: number };
  helpSnapshot: { unattended: number };
  absenceSnapshot: { pending: Absence[] };
  newsSnapshot: { activeCount: number };
  user: User;
  language: Language;
  pvpSnapshot: { userInQueue: boolean; queueSize: number; disputed: boolean; topPlayer: { nickname: string; rating: number } | null };
  isOfficer: boolean;
  officerSignals: number;
}) {
  return (
    <div className="guild-dashboard-grid dashboard-hero-shell">
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

        <div className="guild-dashboard-command__signals dashboard-command-signal-strip">
          <div className="guild-dashboard-command__signal">
            <span className="dashboard-command__signal-label">Readiness</span>
            <strong>{rosterSnapshot.readinessPercent}%</strong>
            <span>{rosterSnapshot.readyCore} {copy.activeMembers.toLowerCase()}</span>
          </div>
          <div className="guild-dashboard-command__signal">
            <span className="dashboard-command__signal-label">Support</span>
            <strong>{helpSnapshot.unattended}</strong>
            <span>{copy.unattendedRequests.toLowerCase()}</span>
          </div>
          <div className="guild-dashboard-command__signal">
            <span className="dashboard-command__signal-label">Officer</span>
            <strong>{officerSignals}</strong>
            <span>{officerSignals > 0 ? copy.activeAlerts : copy.allClear}</span>
          </div>
        </div>

        <div className="guild-dashboard-metric-grid">
          <MetricTile label={copy.activeMembers} value={rosterSnapshot.active} tone={liveTone === 'steady' ? 'active' : liveTone} />
          <MetricTile label={copy.unattendedRequests} value={helpSnapshot.unattended} tone={helpSnapshot.unattended > 0 ? 'alert' : 'steady'} />
          <MetricTile label={copy.pendingAbsences} value={absenceSnapshot.pending.length} tone={absenceSnapshot.pending.length > 0 ? 'alert' : 'steady'} />
          <MetricTile label={copy.activeAnnouncements} value={newsSnapshot.activeCount} tone="active" />
        </div>
      </article>

      <aside className="card section-card guild-dashboard-station p-6 sm:p-7">
        <div className="guild-dashboard-station__header">
          <div>
            <div className="dashboard-kicker">{copy.personalStation}</div>
            <h3 className="guild-dashboard-station__title">{user.nickname || 'Silent Moonfall'}</h3>
          </div>
          <SignalBadge tone={user.isActive ? 'active' : 'alert'}>{user.isActive ? copy.activeState : copy.inactiveState}</SignalBadge>
        </div>

        <p className="guild-dashboard-station__body">{copy.personalStationBody}</p>

        <div className="guild-dashboard-station__facts">
          <div><span>{copy.yourRole}</span><strong>{roleLabels[language][user.role]}</strong></div>
          <div><span>{copy.yourClass}</span><strong>{user.className || copy.noClass}</strong></div>
          <div><span>{copy.yourPrefix}</span><strong>{user.prefix ? <PrefixBadge prefix={user.prefix} variant="compact" /> : copy.noPrefix}</strong></div>
          <div><span>{copy.accountState}</span><strong>{user.isActive ? copy.activeState : copy.inactiveState}</strong></div>
        </div>

        <div className="guild-dashboard-station__queue">
          <div><span className="dashboard-kicker">PvP</span><strong>{pvpSnapshot.userInQueue ? copy.queuedNow : copy.notQueued}</strong></div>
          <div className="ui-badge ui-badge-muted">{pvpSnapshot.queueSize > 0 ? `${copy.activeQueue}: ${pvpSnapshot.queueSize}` : copy.noQueue}</div>
          {pvpSnapshot.topPlayer ? <div className="dashboard-station-note">Top: {pvpSnapshot.topPlayer.nickname} · {pvpSnapshot.topPlayer.rating}</div> : null}
        </div>

        {isOfficer && (
          <div className="guild-dashboard-station__overlay">
            <span className="dashboard-kicker">{copy.officerOverlay}</span>
            <strong>{officerSignals > 0 ? officerSignals : 0}</strong>
            <p>{officerSignals > 0 ? copy.activeAlerts : copy.noOverlay}</p>

            <div className="officer-escalation-list">
              {absenceSnapshot.pending.length > 0 && (
                <div className="officer-escalation-item">
                  <WuxiaIcon name="calendarX" className="h-4 w-4" />
                  <span>{absenceSnapshot.pending.length} {copy.pendingAbsencesLabel}</span>
                  <Link href="/absences" className="officer-escalation-link">{copy.openAbsences}</Link>
                </div>
              )}
              {helpSnapshot.unattended > 0 && (
                <div className="officer-escalation-item">
                  <WuxiaIcon name="alertTriangle" className="h-4 w-4" />
                  <span>{helpSnapshot.unattended} {copy.pendingHelpLabel}</span>
                  <Link href="/help" className="officer-escalation-link">{copy.openHelp}</Link>
                </div>
              )}
              {pvpSnapshot.disputed && (
                <div className="officer-escalation-item">
                  <WuxiaIcon name="alertTriangle" className="h-4 w-4" />
                  <span>1 {copy.disputedMatchesLabel}</span>
                  <Link href="/pvp" className="officer-escalation-link">{copy.openPvp}</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function DashboardPrimaryRegion({
  copy,
  helpSnapshot,
  newsSnapshot,
  newsLoading,
  activityFeed,
  language,
}: {
  copy: DashboardCopy;
  helpSnapshot: { myResponses: Array<{ id: string; title: string; createdAt: string }> };
  newsSnapshot: { featured: Array<{ id: string; pinned?: boolean | null; date: string; title: string }>; activeCount: number };
  newsLoading: boolean;
  activityFeed: ActivityEvent[];
  language: Language;
}) {
  return (
    <div className="guild-dashboard-primary-grid dashboard-card-cluster">
      <StatusCard title={copy.actionCenter} icon="seal" actionHref="/profile" actionLabel={copy.openProfile} tone="active">
        <div className="dashboard-card-stack">
          <p className="dashboard-card-copy">{copy.actionCenterBody}</p>
          {helpSnapshot.myResponses.length > 0 ? (
            <div className="dashboard-list">
              {helpSnapshot.myResponses.slice(0, 3).map((r) => (
                <div key={r.id} className="dashboard-list__item">
                  <div>
                    <div className="dashboard-list__title">{r.title}</div>
                    <div className="dashboard-list__meta">{formatTimeAgo(r.createdAt, copy, language)}</div>
                  </div>
                  <SignalBadge tone="active">{copy.respondedToHelp}</SignalBadge>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-card-empty">{copy.noTasks}</div>
          )}
        </div>
      </StatusCard>

      <StatusCard title={copy.announcements} icon="news" actionHref="/news" actionLabel={copy.openNews} tone={newsSnapshot.activeCount > 0 ? 'active' : 'steady'}>
        {newsLoading ? <MiniSkeleton /> : newsSnapshot.featured.length > 0 ? (
          <div className="dashboard-card-stack">
            {newsSnapshot.featured.map((item, index) => (
              <div key={item.id} className={cn('dashboard-news-spotlight', index === 0 && 'dashboard-news-spotlight--featured')}>
                <div className="dashboard-news-spotlight__meta">
                  <SignalBadge tone={item.pinned ? 'active' : 'steady'}>{item.pinned ? copy.pinned : copy.latest}</SignalBadge>
                  <span>{formatTimeAgo(item.date, copy, language)}</span>
                </div>
                <div className="dashboard-news-spotlight__title">{item.title}</div>
              </div>
            ))}
          </div>
        ) : <div className="dashboard-card-empty">{copy.announcementsEmpty}</div>}
      </StatusCard>

      <StatusCard title={copy.activityFeed} icon="list" actionHref="/news" actionLabel={copy.openNews} tone="steady">
        <div className="dashboard-card-stack">
          <p className="dashboard-card-copy">{copy.activityFeedBody}</p>
          {activityFeed.length > 0 ? (
            <div className="activity-feed-list">
              {activityFeed.map((event) => (
                <div key={event.id} className="activity-feed-item">
                  <div className="activity-feed-icon">
                    <WuxiaIcon name={
                      event.type === 'joined_guild' ? 'user' :
                      event.type === 'responded_help' || event.type === 'created_help' ? 'help' :
                      event.type === 'created_absence' || event.type === 'approved_absence' ? 'absences' :
                      event.type === 'closed_help' ? 'checkCircle' :
                      event.type === 'created_guide' ? 'book' :
                      event.type === 'joined_pvp' || event.type === 'completed_pvp' ? 'sword' :
                      event.type === 'updated_profile' ? 'profile' :
                      event.type === 'created_news' ? 'news' :
                      'seal'
                    } className="h-4 w-4" />
                  </div>
                  <div className="activity-feed-content">
                    <div className="activity-feed-actor">{event.actor}</div>
                    <div className="activity-feed-action">
                      {event.type === 'joined_guild' ? copy.joinedGuild :
                       event.type === 'responded_help' ? copy.respondedToHelp :
                       event.type === 'created_help' ? copy.createdHelp :
                       event.type === 'created_absence' ? copy.createdAbsence :
                       event.type === 'approved_absence' ? copy.approvedAbsence :
                       event.type === 'closed_help' ? copy.closedHelp :
                       event.type === 'created_guide' ? copy.createdGuide :
                       event.type === 'joined_pvp' ? copy.joinedPvpQueue :
                       event.type === 'completed_pvp' ? copy.completedPvpMatch :
                       event.type === 'updated_profile' ? copy.updatedProfile :
                       event.type === 'created_news' ? copy.createdNews :
                       copy.rsvpdToEvent}
                    </div>
                    {event.details && <div className="activity-feed-details">{event.details}</div>}
                  </div>
                  <div className="activity-feed-time">{formatTimeAgo(event.timestamp, copy, language)}</div>
                </div>
              ))}
            </div>
          ) : <div className="dashboard-card-empty">{copy.noActivity}</div>}
        </div>
      </StatusCard>
    </div>
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

  const helpSnapshot = useMemo(() => {
    const sorted = [...openHelp].sort((left, right) => {
      const leftResponders = left.responders.length;
      const rightResponders = right.responders.length;
      if (leftResponders !== rightResponders) return leftResponders - rightResponders;
      return new Date(left.gatheringStart).getTime() - new Date(right.gatheringStart).getTime();
    });

    const unattended = sorted.filter((request) => request.responders.length === 0).length;
    const urgent = sorted.slice(0, 3).map((request) => {
      const tone: LiveTone = request.responders.length === 0 ? 'alert' : request.responders.length === 1 ? 'active' : 'steady';
      return { ...request, tone };
    });

    const myResponses = user.id ? sorted.filter((r) => r.responders.some((res) => res.userId === user.id)) : [];

    return { urgent, unattended, total: openHelp.length, myResponses };
  }, [openHelp, user.id]);

  const rosterSnapshot = useMemo(() => {
    const roster = registrations.filter((item) => item.guild.trim().toLowerCase() === 'silent moonfall');
    const source = roster.length > 0 ? roster : registrations;
    const total = source.length;
    const active = source.filter((item) => item.status === 'active').length;
    const readyCore = source.filter((item) => item.status === 'active' && item.kpi >= 6).length;
    const avgKpi = total > 0 ? (source.reduce((sum, item) => sum + item.kpi, 0) / total).toFixed(1) : '0.0';
    const inactive = source.filter((item) => item.status !== 'active').length;

    return { total, active, readyCore, avgKpi, inactive, readinessPercent: total > 0 ? Math.round((active / total) * 100) : 0 };
  }, [registrations]);

  const newsSnapshot = useMemo(() => {
    const ordered = [...news].sort((left, right) => {
      const pinDelta = Number(Boolean(right.pinned)) - Number(Boolean(left.pinned));
      if (pinDelta !== 0) return pinDelta;
      return new Date(right.date).getTime() - new Date(left.date).getTime();
    });
    return { featured: ordered.slice(0, 3), activeCount: ordered.filter((item) => item.pinned).length || Math.min(ordered.length, 1) };
  }, [news]);

  const absenceSnapshot = useMemo(() => {
    const pending = absences.filter((item) => item.status === 'pending');
    const approvedNow = absences.filter((item) => item.status === 'approved');
    return { pending, approvedNow };
  }, [absences]);

  const pvpSnapshot = useMemo(() => {
    const state: PvpState = pvpState ?? { queue: [], leaderboard: [], recentMatches: [], activeMatch: null, userInQueue: false, userRating: null };
    return {
      queueSize: state.queue.length,
      activeMatch: state.activeMatch,
      disputed: state.activeMatch?.confirmationStatus === 'disputed',
      userInQueue: state.userInQueue,
      topPlayer: state.leaderboard[0] || null,
    };
  }, [pvpState]);

  const officerSignals = helpSnapshot.unattended + absenceSnapshot.pending.length + rosterSnapshot.inactive + (pvpSnapshot.disputed ? 1 : 0);

  useHelpNotifications(openHelp, user.id ?? null, { enabled: true, unattendedThresholdMinutes: 15 });
  useAbsenceNotifications(absences, user.role, { enabled: true });
  usePvpNotifications(pvpSnapshot.activeMatch, pvpSnapshot.disputed, { enabled: true });

  const activityFeed = useMemo(
    () => generateSyntheticActivity(openHelp, absences, news, registrations, pvpState ?? null, copy, language),
    [openHelp, absences, news, registrations, pvpState, copy, language]
  );

  const liveTone: LiveTone = helpSnapshot.unattended > 0 || absenceSnapshot.pending.length > 0 || pvpSnapshot.disputed ? 'alert' : 'steady';
  const liveLabel = liveTone === 'alert' ? copy.activeAlerts : copy.allClear;

  const coreLoading = scheduleLoading || helpLoading || registrationsLoading || newsLoading;
  const coreEmpty = !schedule.length && !openHelp.length && !registrations.length && !news.length;
  const coreErrored = Boolean(scheduleError || helpError || registrationsError || newsError);

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
            action={{ label: copy.reloadLiveModules, onClick: () => void Promise.all([refetchSchedule(), refetchHelp(), refetchRegistrations(), refetchNews()]) }}
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
          <SectionHero icon={<WuxiaIcon name="eye" className="h-5 w-5" />} title={copy.title} subtitle={copy.subtitle} chips={copy.chips} actions={
            <>
              <Link href="/schedule" className="btn-primary px-4 py-2.5">{copy.openSchedule}</Link>
              <Link href="/help" className="btn-secondary px-4 py-2.5">{copy.openHelp}</Link>
            </>
          } />

          <DashboardHeroRegion
            copy={copy}
            liveTone={liveTone}
            liveLabel={liveLabel}
            rosterSnapshot={rosterSnapshot}
            helpSnapshot={helpSnapshot}
            absenceSnapshot={absenceSnapshot}
            newsSnapshot={newsSnapshot}
            user={user}
            language={language}
            pvpSnapshot={pvpSnapshot}
            isOfficer={isOfficer}
            officerSignals={officerSignals}
          />

          <DashboardPrimaryRegion
            copy={copy}
            helpSnapshot={helpSnapshot}
            newsSnapshot={newsSnapshot}
            newsLoading={newsLoading}
            activityFeed={activityFeed}
            language={language}
          />
        </div>
      </div>
    </section>
  );
}

export default function DashboardSection(props: DashboardSectionProps) {
  return <ErrorBoundary><DashboardSectionContent {...props} /></ErrorBoundary>;
}
