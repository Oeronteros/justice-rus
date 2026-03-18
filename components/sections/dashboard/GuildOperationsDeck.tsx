'use client';

import { useMemo, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from 'chart.js';
import * as stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { useOptionalNotifications } from '@/lib/notifications/context';
import { useOptionalTheme } from '@/lib/theme/context';
import { guildOperationsDeckStyles } from './GuildOperationsDeck.stylex';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

type Language = 'ru' | 'en' | 'zh';

interface GuildOperationsDeckProps {
  language: Language;
  scheduleCount: number;
  rosterSnapshot: {
    total: number;
    active: number;
    readyCore: number;
    inactive: number;
  };
  helpSnapshot: {
    total: number;
    unattended: number;
  };
  absenceSnapshot: {
    pendingCount: number;
  };
  pvpSnapshot: {
    queueSize: number;
    disputed: boolean;
  };
  nextEventLabel: string;
}

const copy = {
  ru: {
    eyebrow: 'Командный deck',
    title: 'Живые сигналы и стратегия ночи',
    description:
      'Новый командный слой связывает статистику, разрешения на уведомления и маршруты в Discord/календарь в одну рабочую поверхность.',
    livePressure: 'Давление контура',
    readinessMix: 'Состав и готовность',
    notificationConsole: 'Консоль сигналов',
    notificationDescription: 'Выбери, какие сигналы держать в foreground, а что отправлять в тихий режим.',
    enableDesktop: 'Desktop alerts',
    enableEvents: 'Напоминания о событиях',
    enableOfficer: 'Офицерские эскалации',
    desktopHint: 'Браузерные уведомления для срочных действий и сборов.',
    eventsHint: 'Предупреждать о ближайших рейдах, PvP окнах и встречах.',
    officerHint: 'Показывать pending help/absence/pvp dispute в одном канале.',
    allowDesktop: 'Разрешить desktop',
    testSignal: 'Тестовый сигнал',
    testSignalDone: 'Сигнал отправлен',
    testSignalBody: 'Командный deck готов к ночной вахте Silent Moonfall.',
    messengerRail: 'Связь и синхронизация',
    messengerDescription: 'Быстрые каналы для координации гильдии без лишнего переключения контекста.',
    discordBridge: 'Discord bridge',
    calendarOps: 'Event calendar',
    profileOps: 'Profile live sync',
    discordText: 'Выноси новости, спорные PvP и сборы в единый канал оповещений.',
    calendarText: 'Следующее окно: ',
    profileText: 'Профиль, классы и префиксы держатся синхронно с боевым профилем.',
    openDiscord: 'Открыть интеграции',
    openCalendar: 'Открыть календарь',
    openProfile: 'Открыть профиль',
    active: 'активны',
    pending: 'ожидают',
    disputed: 'спор',
    stable: 'стабильно',
  },
  en: {
    eyebrow: 'Command deck',
    title: 'Live signals and tonight strategy',
    description:
      'This command layer ties guild pressure, notification permissions, and Discord/calendar routes into one working surface.',
    livePressure: 'Guild pressure',
    readinessMix: 'Roster readiness',
    notificationConsole: 'Signal console',
    notificationDescription: 'Pick which alerts stay in the foreground and which ones run quietly.',
    enableDesktop: 'Desktop alerts',
    enableEvents: 'Event reminders',
    enableOfficer: 'Officer escalations',
    desktopHint: 'Browser notifications for urgent guild actions and assembly calls.',
    eventsHint: 'Warn about upcoming raids, PvP windows, and meetings.',
    officerHint: 'Keep pending help/absence/pvp disputes in one signal lane.',
    allowDesktop: 'Allow desktop',
    testSignal: 'Send test signal',
    testSignalDone: 'Signal sent',
    testSignalBody: 'The Silent Moonfall command deck is ready for tonight watch.',
    messengerRail: 'Comms and sync',
    messengerDescription: 'Fast coordination lanes so the guild does not need to hop through random screens.',
    discordBridge: 'Discord bridge',
    calendarOps: 'Event calendar',
    profileOps: 'Profile live sync',
    discordText: 'Push news, disputed PvP, and assembly calls into one guild operations lane.',
    calendarText: 'Next window: ',
    profileText: 'Profile, class, and prefix updates stay connected to your combat identity.',
    openDiscord: 'Open integrations',
    openCalendar: 'Open calendar',
    openProfile: 'Open profile',
    active: 'active',
    pending: 'pending',
    disputed: 'disputed',
    stable: 'stable',
  },
  zh: {
    eyebrow: '指挥层',
    title: '实时信号与今晚策略',
    description: '这个指挥层把公会压力、通知权限和 Discord/日历入口收拢到同一工作面板。',
    livePressure: '公会压力',
    readinessMix: '成员战备',
    notificationConsole: '信号控制台',
    notificationDescription: '选择哪些提醒放在前台，哪些只保持安静追踪。',
    enableDesktop: '桌面提醒',
    enableEvents: '活动提醒',
    enableOfficer: '军官升级信号',
    desktopHint: '用于紧急行动和集结的浏览器系统通知。',
    eventsHint: '提醒即将开始的活动、PvP 窗口和集会。',
    officerHint: '把待处理求助/请假/PvP 争议集中到一个信号通道。',
    allowDesktop: '允许桌面提醒',
    testSignal: '发送测试信号',
    testSignalDone: '信号已发送',
    testSignalBody: 'Silent Moonfall 指挥面板已准备好今晚值守。',
    messengerRail: '沟通与同步',
    messengerDescription: '快速协调通道，避免在多个页面间来回跳转。',
    discordBridge: 'Discord 桥接',
    calendarOps: '活动日历',
    profileOps: '资料实时同步',
    discordText: '把公告、争议 PvP 和集结呼叫推到统一公会频道。',
    calendarText: '下一窗口：',
    profileText: '职业、称号和战斗档案保持同步。',
    openDiscord: '打开集成',
    openCalendar: '打开日历',
    openProfile: '打开资料',
    active: '活跃',
    pending: '待处理',
    disputed: '争议',
    stable: '稳定',
  },
} as const;

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(10, 15, 25, 0.92)',
      borderColor: 'rgba(255,255,255,0.12)',
      borderWidth: 1,
      titleColor: '#f6f0e7',
      bodyColor: '#d8cec0',
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#bda991',
      },
      grid: {
        color: 'rgba(255,255,255,0.06)',
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#bda991',
        precision: 0,
      },
      grid: {
        color: 'rgba(255,255,255,0.06)',
      },
    },
  },
};

const doughnutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#bda991',
        usePointStyle: true,
        boxWidth: 10,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(10, 15, 25, 0.92)',
      borderColor: 'rgba(255,255,255,0.12)',
      borderWidth: 1,
      titleColor: '#f6f0e7',
      bodyColor: '#d8cec0',
    },
  },
};

export default function GuildOperationsDeck({
  language,
  scheduleCount,
  rosterSnapshot,
  helpSnapshot,
  absenceSnapshot,
  pvpSnapshot,
  nextEventLabel,
}: GuildOperationsDeckProps) {
  const t = copy[language];
  const notifications = useOptionalNotifications();
  const theme = useOptionalTheme();
  const [permissionBusy, setPermissionBusy] = useState(false);
  const isLightTheme = theme?.resolvedTheme === 'light';

  const settings = notifications?.settings ?? {
    enabled: true,
    helpRequests: true,
    absenceApprovals: true,
    pvpMatches: true,
    eventReminders: true,
    officerAlerts: true,
    soundEnabled: false,
    desktopEnabled: false,
  };

  const pressureData = useMemo(
    () => ({
      labels: ['Events', 'Help', 'Pending', 'PvP'],
      datasets: [
        {
          data: [scheduleCount, helpSnapshot.unattended, absenceSnapshot.pendingCount, pvpSnapshot.queueSize],
          borderRadius: 12,
          backgroundColor: ['#74a7d9', '#d07a72', '#c9a86a', '#72c08f'],
        },
      ],
    }),
    [absenceSnapshot.pendingCount, helpSnapshot.unattended, pvpSnapshot.queueSize, scheduleCount]
  );

  const readinessData = useMemo(
    () => ({
      labels: ['Ready core', 'Active roster', 'Inactive'],
      datasets: [
        {
          data: [rosterSnapshot.readyCore, Math.max(rosterSnapshot.active - rosterSnapshot.readyCore, 0), rosterSnapshot.inactive],
          backgroundColor: ['#72c08f', '#74a7d9', '#d07a72'],
          borderWidth: 0,
        },
      ],
    }),
    [rosterSnapshot.active, rosterSnapshot.inactive, rosterSnapshot.readyCore]
  );

  const activePalette = isLightTheme ? '#5b6e86' : '#bda991';
  const chartTooltipPalette = isLightTheme
    ? {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderColor: 'rgba(27, 34, 48, 0.12)',
        titleColor: '#1b2230',
        bodyColor: '#4d5c70',
      }
    : {
        backgroundColor: 'rgba(10, 15, 25, 0.92)',
        borderColor: 'rgba(255,255,255,0.12)',
        titleColor: '#f6f0e7',
        bodyColor: '#d8cec0',
      };

  const pressureOptions = useMemo<ChartOptions<'bar'>>(
    () => ({
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        tooltip: {
          ...chartOptions.plugins?.tooltip,
          ...chartTooltipPalette,
        },
      },
      scales: {
        x: {
          ...chartOptions.scales?.x,
          ticks: {
            color: activePalette,
          },
          grid: {
            color: isLightTheme ? 'rgba(27,34,48,0.08)' : 'rgba(255,255,255,0.06)',
          },
        },
        y: {
          ...chartOptions.scales?.y,
          ticks: {
            color: activePalette,
            precision: 0,
          },
          grid: {
            color: isLightTheme ? 'rgba(27,34,48,0.08)' : 'rgba(255,255,255,0.06)',
          },
        },
      },
    }),
    [activePalette, chartTooltipPalette, isLightTheme]
  );

  const readinessOptions = useMemo<ChartOptions<'doughnut'>>(
    () => ({
      ...doughnutOptions,
      plugins: {
        ...doughnutOptions.plugins,
        legend: {
          ...doughnutOptions.plugins?.legend,
          labels: {
            ...doughnutOptions.plugins?.legend?.labels,
            color: activePalette,
          },
        },
        tooltip: {
          ...doughnutOptions.plugins?.tooltip,
          ...chartTooltipPalette,
        },
      },
    }),
    [activePalette, chartTooltipPalette]
  );

  const handlePermissionRequest = async () => {
    if (!notifications) {
      return;
    }

    setPermissionBusy(true);
    try {
      const permission = await notifications.requestPermission();
      notifications.addToast({
        type: permission === 'granted' ? 'success' : 'warning',
        title: permission === 'granted' ? t.testSignalDone : 'Permission blocked',
        message:
          permission === 'granted'
            ? t.testSignalBody
            : 'Browser permission is still blocked. You can keep using in-app toasts.',
        duration: 4500,
      });
    } finally {
      setPermissionBusy(false);
    }
  };

  const triggerTestSignal = () => {
    if (!notifications) {
      return;
    }

    notifications.addToast({
      type: 'info',
      title: t.testSignalDone,
      message: t.testSignalBody,
      duration: 4200,
    });
  };

  return (
    <div {...stylex.props(guildOperationsDeckStyles.grid)}>
      <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, guildOperationsDeckStyles.card, guildOperationsDeckStyles.chartCard)}>
        <div {...stylex.props(guildOperationsDeckStyles.titleRow)}>
          <div {...stylex.props(guildOperationsDeckStyles.titleBlock)}>
            <span {...stylex.props(guildOperationsDeckStyles.kicker)}>{t.eyebrow}</span>
            <h3 {...stylex.props(guildOperationsDeckStyles.title)}>{t.title}</h3>
            <p {...stylex.props(guildOperationsDeckStyles.body)}>{t.description}</p>
          </div>
          <span {...stylex.props(uiStyles.badge, uiStyles.badgeSuccess)}>
            {rosterSnapshot.active} {t.active}
          </span>
        </div>

        <div {...stylex.props(guildOperationsDeckStyles.chartGrid)}>
          <div {...stylex.props(guildOperationsDeckStyles.chartShell)}>
            <div {...stylex.props(guildOperationsDeckStyles.titleBlock)}>
              <span {...stylex.props(guildOperationsDeckStyles.kicker)}>{t.livePressure}</span>
              <span {...stylex.props(guildOperationsDeckStyles.body)}>
                {helpSnapshot.unattended} {t.pending} / {pvpSnapshot.disputed ? t.disputed : t.stable}
              </span>
            </div>
            <Bar data={pressureData} options={pressureOptions} />
          </div>

          <div {...stylex.props(guildOperationsDeckStyles.chartShell)}>
            <div {...stylex.props(guildOperationsDeckStyles.titleBlock)}>
              <span {...stylex.props(guildOperationsDeckStyles.kicker)}>{t.readinessMix}</span>
              <span {...stylex.props(guildOperationsDeckStyles.body)}>
                {rosterSnapshot.total} total / {rosterSnapshot.readyCore} ready core
              </span>
            </div>
            <Doughnut data={readinessData} options={readinessOptions} />
          </div>
        </div>

        <div {...stylex.props(guildOperationsDeckStyles.signalList)}>
          <div {...stylex.props(guildOperationsDeckStyles.signalItem)}>
            <div {...stylex.props(guildOperationsDeckStyles.signalHead)}>
              <span {...stylex.props(guildOperationsDeckStyles.signalLabel)}>{t.messengerRail}</span>
              <span {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)}>{t.stable}</span>
            </div>
            <p {...stylex.props(guildOperationsDeckStyles.signalMeta)}>{t.messengerDescription}</p>
            <div {...stylex.props(guildOperationsDeckStyles.messengerGrid)}>
              <Link href="/integrations" {...stylex.props(guildOperationsDeckStyles.messengerCard)}>
                <span {...stylex.props(guildOperationsDeckStyles.messengerTitle)}>{t.discordBridge}</span>
                <span {...stylex.props(guildOperationsDeckStyles.messengerText)}>{t.discordText}</span>
                <span {...stylex.props(guildOperationsDeckStyles.messengerFooter)}>{t.openDiscord}</span>
              </Link>
              <Link href="/calendar" {...stylex.props(guildOperationsDeckStyles.messengerCard)}>
                <span {...stylex.props(guildOperationsDeckStyles.messengerTitle)}>{t.calendarOps}</span>
                <span {...stylex.props(guildOperationsDeckStyles.messengerText)}>
                  {t.calendarText}
                  <span {...stylex.props(guildOperationsDeckStyles.nextEventBadge)}>{nextEventLabel}</span>
                </span>
                <span {...stylex.props(guildOperationsDeckStyles.messengerFooter)}>{t.openCalendar}</span>
              </Link>
              <Link href="/profile" {...stylex.props(guildOperationsDeckStyles.messengerCard)}>
                <span {...stylex.props(guildOperationsDeckStyles.messengerTitle)}>{t.profileOps}</span>
                <span {...stylex.props(guildOperationsDeckStyles.messengerText)}>{t.profileText}</span>
                <span {...stylex.props(guildOperationsDeckStyles.messengerFooter)}>{t.openProfile}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <aside {...stylex.props(guildOperationsDeckStyles.sideRail)}>
        <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, guildOperationsDeckStyles.card, guildOperationsDeckStyles.controlsCard)}>
          <div {...stylex.props(guildOperationsDeckStyles.titleBlock)}>
            <span {...stylex.props(guildOperationsDeckStyles.kicker)}>{t.notificationConsole}</span>
            <h3 {...stylex.props(guildOperationsDeckStyles.title)}>{t.notificationConsole}</h3>
            <p {...stylex.props(guildOperationsDeckStyles.body)}>{t.notificationDescription}</p>
          </div>

          <div {...stylex.props(guildOperationsDeckStyles.controlsGrid)}>
            {[
              { key: 'desktopEnabled', title: t.enableDesktop, hint: t.desktopHint, enabled: settings.desktopEnabled },
              { key: 'eventReminders', title: t.enableEvents, hint: t.eventsHint, enabled: settings.eventReminders },
              { key: 'officerAlerts', title: t.enableOfficer, hint: t.officerHint, enabled: settings.officerAlerts },
            ].map((control) => (
              <div key={control.key} {...stylex.props(guildOperationsDeckStyles.controlRow)}>
                <div>
                  <div {...stylex.props(guildOperationsDeckStyles.controlTitle)}>{control.title}</div>
                  <div {...stylex.props(guildOperationsDeckStyles.controlDescription)}>{control.hint}</div>
                </div>
                <button
                  type="button"
                  onClick={() => notifications?.updateSettings({ [control.key]: !control.enabled } as Record<string, boolean>)}
                  aria-pressed={control.enabled}
                  {...stylex.props(guildOperationsDeckStyles.switchButton, control.enabled && guildOperationsDeckStyles.switchButtonActive)}
                >
                  <span {...stylex.props(guildOperationsDeckStyles.switchKnob, control.enabled && guildOperationsDeckStyles.switchKnobActive)} />
                </button>
              </div>
            ))}
          </div>

          <div {...stylex.props(guildOperationsDeckStyles.actionRow)}>
            <button
              type="button"
              onClick={handlePermissionRequest}
              disabled={permissionBusy || !notifications}
              {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
            >
              {permissionBusy ? '...' : t.allowDesktop}
            </button>
            <button type="button" onClick={triggerTestSignal} disabled={!notifications} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}>
              {t.testSignal}
            </button>
          </div>
        </article>
      </aside>
    </div>
  );
}
