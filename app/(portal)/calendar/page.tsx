'use client';

import { SectionHero } from '@/components/shared/SectionHero';
import { useAbsences } from '@/lib/absences/hooks';
import { useUser } from '@/lib/auth/context';
import { useHelp } from '@/lib/help/hooks';
import { useLanguage } from '@/lib/i18n/context';
import { useNotifications } from '@/lib/notifications/context';
import { usePvpState } from '@/lib/pvp/hooks';
import WuxiaIcon from '@/components/WuxiaIcons';
import { hasRoleAtLeast } from '@/lib/authz';

const copy = {
  ru: {
    title: 'Уведомления',
    subtitle: 'Центр сигналов и настроек. Ответы на события теперь живут прямо в расписании.',
    desktop: 'Desktop-уведомления',
    requestPermission: 'Разрешить браузерные уведомления',
    enabled: 'Включено',
    disabled: 'Выключено',
    help: 'Открытая помощь',
    absences: 'Отсутствия на подтверждении',
    pvp: 'Спорные PvP / активный контур',
    empty: 'Сейчас нет критичных сигналов. Здесь остаются только настройки и входящие алерты.',
    openHelp: 'Открыть помощь',
    openAbsences: 'Открыть отсутствия',
    openPvp: 'Открыть PvP',
  },
  en: {
    title: 'Notifications',
    subtitle: 'Signal center and settings. Event responses now live directly in the schedule.',
    desktop: 'Desktop notifications',
    requestPermission: 'Enable browser notifications',
    enabled: 'Enabled',
    disabled: 'Disabled',
    help: 'Open help requests',
    absences: 'Pending absences',
    pvp: 'Disputed PvP / live pulse',
    empty: 'No critical signals right now. This page is now mainly for settings and incoming alerts.',
    openHelp: 'Open help',
    openAbsences: 'Open absences',
    openPvp: 'Open PvP',
  },
  zh: {
    title: '通知中心',
    subtitle: '这里集中显示提醒与设置。活动回复现在直接放在日程里处理。',
    desktop: '桌面通知',
    requestPermission: '启用浏览器通知',
    enabled: '已开启',
    disabled: '已关闭',
    help: '开放中的求助',
    absences: '待审批请假',
    pvp: '争议 PvP / 活跃信号',
    empty: '当前没有关键提醒，这里主要保留提醒设置和实时信号。',
    openHelp: '打开求助',
    openAbsences: '打开请假',
    openPvp: '打开 PvP',
  },
} as const;

export default function CalendarPage() {
  const { language } = useLanguage();
  const user = useUser();
  const { settings, updateSettings, requestPermission } = useNotifications();
  const { data: help = [] } = useHelp('open');
  const { data: absences = [] } = useAbsences();
  const { data: pvpState } = usePvpState();
  const isOfficer = hasRoleAtLeast(user.role, 'officer');
  const text = copy[language];

  const cards = [
    {
      label: text.help,
      value: help.length,
      href: '/help',
      action: text.openHelp,
      visible: true,
    },
    {
      label: text.absences,
      value: absences.filter((item) => item.status === 'pending').length,
      href: '/absences',
      action: text.openAbsences,
      visible: isOfficer,
    },
    {
      label: text.pvp,
      value: pvpState?.activeMatch?.confirmationStatus === 'disputed' || pvpState?.queue?.length ? 1 : 0,
      href: '/pvp',
      action: text.openPvp,
      visible: true,
    },
  ].filter((item) => item.visible);

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-stack-lg">
          <SectionHero
            icon={<WuxiaIcon name="calendarCheck" className="w-5 h-5" />}
            title={text.title}
            subtitle={text.subtitle}
            chips={['Alerts', 'Settings', 'Live signals']}
          />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <article className="card section-card ds-section-panel p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <div className="dashboard-kicker">{text.desktop}</div>
                  <h3 className="text-xl font-bold font-orbitron text-[#e6eff5]">{text.requestPermission}</h3>
                </div>
                <button
                  type="button"
                  className="btn-primary px-4 py-2"
                  onClick={() => void requestPermission()}
                >
                  {settings.desktopEnabled ? text.enabled : text.requestPermission}
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: 'helpRequests', label: text.help },
                  { key: 'absenceApprovals', label: text.absences },
                  { key: 'pvpMatches', label: text.pvp },
                  { key: 'eventReminders', label: language === 'ru' ? 'Напоминания о событиях' : language === 'zh' ? '活动提醒' : 'Event reminders' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="dashboard-route-link justify-between text-left"
                    onClick={() => updateSettings({ [item.key]: !settings[item.key as keyof typeof settings] } as Partial<typeof settings>)}
                  >
                    <span>{item.label}</span>
                    <span className="ui-badge ui-badge-muted">{settings[item.key as keyof typeof settings] ? text.enabled : text.disabled}</span>
                  </button>
                ))}
              </div>
            </article>

            <article className="card section-card ds-section-panel p-5 sm:p-6">
              <div className="dashboard-kicker mb-3">Live</div>
              <div className="space-y-3">
                {cards.map((card) => (
                  <a key={card.label} href={card.href} className="dashboard-list__item">
                    <div>
                      <div className="dashboard-list__title">{card.label}</div>
                      <div className="dashboard-list__meta">{card.action}</div>
                    </div>
                    <span className={`ui-badge ${card.value > 0 ? 'ui-badge-danger' : 'ui-badge-muted'}`}>{card.value}</span>
                  </a>
                ))}
                {cards.every((card) => card.value === 0) ? (
                  <div className="dashboard-card-empty">{text.empty}</div>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
