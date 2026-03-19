'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import * as stylex from '@stylexjs/stylex';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { sectionLabels, type Language } from '@/lib/i18n';
import { useOptionalNotifications } from '@/lib/notifications/context';
import { useOptionalTheme } from '@/lib/theme/context';
import type { Section } from '@/types';
import { missionControlStyles } from './MissionControl.stylex';

type QuickLink = {
  href: string;
  icon: IconName;
  title: string;
  body: string;
  meta: string;
};

interface MissionControlProps {
  currentSection: Section;
  language: Language;
}

const copy = {
  ru: {
    eyebrow: 'Mission control',
    title: 'Командный мост Silent Moonfall',
    body:
      'Один слой управления для навигации, сигналов, Discord-контекста и быстрого доступа к ключевым маршрутам гильдии.',
    currentSection: 'Активный раздел',
    theme: 'Тема интерфейса',
    alerts: 'Сигналы браузера',
    enabled: 'включено',
    disabled: 'выключено',
    alertReady: 'Desktop-уведомления готовы к работе.',
    alertBlocked: 'Разрешение ещё не выдано. Встроенные тосты остаются активными.',
    darkTheme: 'Тёмная',
    lightTheme: 'Светлая',
    systemTheme: 'Системная',
    allowDesktop: 'Включить desktop',
    sendTest: 'Тестовый сигнал',
    openCalendar: 'Календарь',
    openCalendarBody: 'Следи за рейдами, PvP-окнами и экспортом событий в Google/Outlook.',
    openCalendarMeta: 'Живое расписание',
    openHelp: 'Помощь',
    openHelpBody: 'Держи открытые запросы и срочные отклики в одном канале действий.',
    openHelpMeta: 'Эскалации гильдии',
    openNews: 'Новости',
    openNewsBody: 'Быстрый доступ к закрепам, Discord-публикациям и анонсам событий.',
    openNewsMeta: 'Контент и синхронизация',
    openProfile: 'Профиль',
    openProfileBody: 'Обновляй класс, префикс и боевую идентичность без лишних переходов.',
    openProfileMeta: 'Персонализация',
    toastTitleGranted: 'Desktop alerts активированы',
    toastTitleBlocked: 'Разрешение не выдано',
    toastTitleTest: 'Тестовый сигнал',
    toastBodyGranted: 'Теперь важные сигналы гильдии смогут приходить как системные уведомления.',
    toastBodyBlocked: 'Оставляем встроенные тосты и ручное управление сигналами.',
    toastBodyTest: 'Командный мост готов отправлять сигналы о событиях, помощи и PvP.',
  },
  en: {
    eyebrow: 'Mission control',
    title: 'Silent Moonfall command bridge',
    body:
      'One operating layer for navigation, live signals, Discord context, and quick access to the guild’s core routes.',
    currentSection: 'Current section',
    theme: 'Interface theme',
    alerts: 'Browser alerts',
    enabled: 'enabled',
    disabled: 'disabled',
    alertReady: 'Desktop notifications are ready for guild signals.',
    alertBlocked: 'Permission is still blocked. In-app toasts remain active.',
    darkTheme: 'Dark',
    lightTheme: 'Light',
    systemTheme: 'System',
    allowDesktop: 'Enable desktop',
    sendTest: 'Send test signal',
    openCalendar: 'Calendar',
    openCalendarBody: 'Track raids, PvP windows, and event exports to Google or Outlook.',
    openCalendarMeta: 'Live schedule',
    openHelp: 'Help board',
    openHelpBody: 'Keep open help requests and urgent responses in one action lane.',
    openHelpMeta: 'Guild escalations',
    openNews: 'News',
    openNewsBody: 'Jump into pinned updates, Discord delivery, and event announcements.',
    openNewsMeta: 'Content sync',
    openProfile: 'Profile',
    openProfileBody: 'Update your class, prefix, and combat identity without context switching.',
    openProfileMeta: 'Personalization',
    toastTitleGranted: 'Desktop alerts enabled',
    toastTitleBlocked: 'Permission not granted',
    toastTitleTest: 'Test signal',
    toastBodyGranted: 'Important guild signals can now be delivered as system notifications.',
    toastBodyBlocked: 'Keeping in-app toasts and manual signal controls available.',
    toastBodyTest: 'The command bridge is ready to surface event, help, and PvP alerts.',
  },
  zh: {
    eyebrow: 'Mission control',
    title: 'Silent Moonfall 指挥桥',
    body: '把导航、实时信号、Discord 上下文和核心入口收拢到同一个操作层。',
    currentSection: '当前分区',
    theme: '界面主题',
    alerts: '浏览器提醒',
    enabled: '已开启',
    disabled: '已关闭',
    alertReady: '桌面通知已准备好承接公会信号。',
    alertBlocked: '权限尚未授予，站内提醒仍然保持可用。',
    darkTheme: '暗色',
    lightTheme: '亮色',
    systemTheme: '系统',
    allowDesktop: '开启桌面提醒',
    sendTest: '发送测试信号',
    openCalendar: '日历',
    openCalendarBody: '跟踪团本、PvP 窗口以及导出到 Google / Outlook 的活动。',
    openCalendarMeta: '实时日程',
    openHelp: '求助',
    openHelpBody: '把开放求助与紧急响应集中到同一行动通道。',
    openHelpMeta: '公会升级事项',
    openNews: '公告',
    openNewsBody: '快速进入置顶更新、Discord 投递状态与活动公告。',
    openNewsMeta: '内容同步',
    openProfile: '资料',
    openProfileBody: '无须来回切换就能更新职业、前缀和战斗身份。',
    openProfileMeta: '个性化',
    toastTitleGranted: '桌面提醒已启用',
    toastTitleBlocked: '尚未授予权限',
    toastTitleTest: '测试信号',
    toastBodyGranted: '重要公会信号现在可以作为系统通知送达。',
    toastBodyBlocked: '继续保留站内提醒与手动控制。',
    toastBodyTest: '指挥桥已经可以推送活动、求助与 PvP 信号。',
  },
} as const;

export default function MissionControl({ currentSection, language }: MissionControlProps) {
  const t = copy[language];
  const notifications = useOptionalNotifications();
  const theme = useOptionalTheme();
  const prefersReducedMotion = useReducedMotion();
  const [permissionBusy, setPermissionBusy] = useState(false);

  const sectionLabel = sectionLabels[language][currentSection];
  const hasNotificationApi = typeof window !== 'undefined' && 'Notification' in window;
  const desktopReady = Boolean(notifications?.settings.desktopEnabled) && hasNotificationApi && Notification.permission === 'granted';

  const themeLabel = useMemo(() => {
    switch (theme?.mode) {
      case 'light':
        return t.lightTheme;
      case 'system':
        return t.systemTheme;
      case 'dark':
      default:
        return t.darkTheme;
    }
  }, [t.darkTheme, t.lightTheme, t.systemTheme, theme?.mode]);

  const quickLinks = useMemo<QuickLink[]>(
    () => [
      {
        href: '/calendar',
        icon: 'calendar',
        title: t.openCalendar,
        body: t.openCalendarBody,
        meta: t.openCalendarMeta,
      },
      {
        href: '/help',
        icon: 'help',
        title: t.openHelp,
        body: t.openHelpBody,
        meta: t.openHelpMeta,
      },
      {
        href: '/news',
        icon: 'news',
        title: t.openNews,
        body: t.openNewsBody,
        meta: t.openNewsMeta,
      },
      {
        href: '/profile',
        icon: 'profile',
        title: t.openProfile,
        body: t.openProfileBody,
        meta: t.openProfileMeta,
      },
    ],
    [t]
  );

  const requestDesktopPermission = async () => {
    if (!notifications) return;

    setPermissionBusy(true);
    try {
      const permission = await notifications.requestPermission();
      notifications.addToast({
        type: permission === 'granted' ? 'success' : 'warning',
        title: permission === 'granted' ? t.toastTitleGranted : t.toastTitleBlocked,
        message: permission === 'granted' ? t.toastBodyGranted : t.toastBodyBlocked,
        duration: 4200,
      });
    } finally {
      setPermissionBusy(false);
    }
  };

  const sendTestSignal = () => {
    notifications?.addToast({
      type: 'info',
      title: t.toastTitleTest,
      message: t.toastBodyTest,
      duration: 4200,
    });
  };

  return (
    <section {...stylex.props(missionControlStyles.shell)} aria-label={t.title}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        {...stylex.props(missionControlStyles.frame)}
      >
        <div {...stylex.props(missionControlStyles.topRow)}>
          <div {...stylex.props(missionControlStyles.titleStack)}>
            <span {...stylex.props(missionControlStyles.eyebrow)}>{t.eyebrow}</span>
            <h2 {...stylex.props(missionControlStyles.title)}>{t.title}</h2>
            <p {...stylex.props(missionControlStyles.body)}>{t.body}</p>
          </div>

          <div {...stylex.props(missionControlStyles.statusGrid)}>
            <div {...stylex.props(missionControlStyles.statusCard, missionControlStyles.statusCardSuccess)}>
              <span {...stylex.props(missionControlStyles.statusLabel)}>{t.currentSection}</span>
              <span {...stylex.props(missionControlStyles.statusValue)}>{sectionLabel}</span>
              <span {...stylex.props(missionControlStyles.statusMeta)}>{t.openNewsMeta}</span>
            </div>
            <div
              {...stylex.props(
                missionControlStyles.statusCard,
                desktopReady ? missionControlStyles.statusCardSuccess : missionControlStyles.statusCardAlert
              )}
            >
              <span {...stylex.props(missionControlStyles.statusLabel)}>{t.alerts}</span>
              <span {...stylex.props(missionControlStyles.statusValue)}>{desktopReady ? t.enabled : t.disabled}</span>
              <span {...stylex.props(missionControlStyles.statusMeta)}>{desktopReady ? t.alertReady : t.alertBlocked}</span>
            </div>
            <div {...stylex.props(missionControlStyles.statusCard)}>
              <span {...stylex.props(missionControlStyles.statusLabel)}>{t.theme}</span>
              <span {...stylex.props(missionControlStyles.statusValue)}>{themeLabel}</span>
              <span {...stylex.props(missionControlStyles.statusMeta)}>{theme?.resolvedTheme === 'light' ? t.lightTheme : t.darkTheme}</span>
            </div>
            <div {...stylex.props(missionControlStyles.statusCard)}>
              <span {...stylex.props(missionControlStyles.statusLabel)}>{t.alerts}</span>
              <span {...stylex.props(missionControlStyles.statusValue)}>
                {notifications?.settings.enabled === false ? t.disabled : t.enabled}
              </span>
              <span {...stylex.props(missionControlStyles.statusMeta)}>{notifications?.settings.eventReminders ? t.openCalendarMeta : t.openHelpMeta}</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(missionControlStyles.actionRow)}>
          <button
            type="button"
            onClick={requestDesktopPermission}
            disabled={!notifications || permissionBusy}
            {...stylex.props(missionControlStyles.actionButton, missionControlStyles.actionButtonAccent)}
          >
            <WuxiaIcon name="sparkle" className="h-4 w-4" />
            {permissionBusy ? '...' : t.allowDesktop}
          </button>
          <button type="button" onClick={sendTestSignal} disabled={!notifications} {...stylex.props(missionControlStyles.actionButton)}>
            <WuxiaIcon name="redo" className="h-4 w-4" />
            {t.sendTest}
          </button>
        </div>

        <div {...stylex.props(missionControlStyles.quickGrid)}>
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href} {...stylex.props(missionControlStyles.quickCard)}>
              <div {...stylex.props(missionControlStyles.quickTitleRow)}>
                <span {...stylex.props(missionControlStyles.iconWrap)}>
                  <WuxiaIcon name={item.icon} className="h-4 w-4" />
                </span>
                <span {...stylex.props(missionControlStyles.quickTitle)}>{item.title}</span>
              </div>
              <span {...stylex.props(missionControlStyles.quickBody)}>{item.body}</span>
              <span {...stylex.props(missionControlStyles.quickMeta)}>{item.meta}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
