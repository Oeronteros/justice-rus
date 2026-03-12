import { Section } from '@/types';

export type Language = 'ru' | 'en' | 'zh';

export const sectionLabels: Record<Language, Record<Section, string>> = {
  ru: {
    registration: 'Участники',
    schedule: 'Расписание',
    calendar: 'Календарь',
    analytics: 'Аналитика',
    workflow: 'Автоматизация',
    integrations: 'Интеграции',
    pvp: 'PvP',
    news: 'Новости',
    guides: 'Гайды',
    absences: 'Отсутствия',
    help: 'Помощь',
    about: 'Дашборд',
    calculator: 'Калькулятор DPS',
    profile: 'Кабинет',
  },
  en: {
    registration: 'Members',
    schedule: 'Schedule',
    calendar: 'Calendar',
    analytics: 'Analytics',
    workflow: 'Automation',
    integrations: 'Integrations',
    pvp: 'PvP',
    news: 'News',
    guides: 'Guides',
    absences: 'Absences',
    help: 'Help',
    about: 'Dashboard',
    calculator: 'DPS Calculator',
    profile: 'Profile',
  },
  zh: {
    registration: '成员',
    schedule: '日程',
    calendar: '日历',
    analytics: '分析',
    workflow: '自动化',
    integrations: '集成',
    pvp: 'PvP',
    news: '公告',
    guides: '攻略',
    absences: '请假',
    help: '求助',
    about: '总览',
    calculator: 'DPS 计算器',
    profile: '个人页',
  },
};

export const headerCopy: Record<
  Language,
  {
    brandSubtitle: string;
    activeSection: string;
    refresh: string;
    logout: string;
    languageSwitcher: string;
  }
> = {
  ru: {
    brandSubtitle: 'Гильдия · Justice Mobile',
    activeSection: 'Раздел',
    refresh: 'Обновить данные',
    logout: 'Выйти',
    languageSwitcher: 'Язык интерфейса',
  },
  en: {
    brandSubtitle: 'Guild · Justice Mobile',
    activeSection: 'Section',
    refresh: 'Refresh data',
    logout: 'Logout',
    languageSwitcher: 'Interface language',
  },
  zh: {
    brandSubtitle: '公会 · Justice Mobile',
    activeSection: '当前',
    refresh: '刷新数据',
    logout: '退出',
    languageSwitcher: '界面语言',
  },
};

export const portalCopy: Record<
  Language,
  {
    oath: string;
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    heroManifestoTitle: string;
    heroManifestoBody: string;
    ritualOneTitle: string;
    ritualOneBody: string;
    ritualTwoTitle: string;
    ritualTwoBody: string;
    ritualThreeTitle: string;
    ritualThreeBody: string;
    pillarOne: string;
    pillarTwo: string;
    pillarThree: string;
    pillarFour: string;
  }
> = {
  ru: {
    oath: 'Дисциплина · Командная игра · Победа',
    heroTag: 'Silent Moonfall | Гильдия',
    heroTitle: 'Silent Moonfall — гильдия в Justice Mobile',
    heroSubtitle:
      'Собираем сильных игроков для рейдов, PvP и прогресса. Четкая коммуникация, уважение и стабильный онлайн.',
    heroCtaPrimary: 'Расписание',
    heroCtaSecondary: 'Гайды',
    heroManifestoTitle: 'О сообществе',
    heroManifestoBody:
      'Silent Moonfall — гильдия игроков, которые приходят за результатом и остаются за атмосферой. Мы помогаем расти новичкам, усиливаем опытных и играем как единая команда.',
    ritualOneTitle: 'Вступление',
    ritualOneBody: 'Быстрый вход и знакомство с составом.',
    ritualTwoTitle: 'Правила',
    ritualTwoBody: 'Уважение, активность и ответственность.',
    ritualThreeTitle: 'Сообщество',
    ritualThreeBody: 'Стабильная команда с сильной репутацией.',
    pillarOne: 'Активное участие',
    pillarTwo: 'Развитие навыков',
    pillarThree: 'Совместный контент',
    pillarFour: 'Командные достижения',
  },
  en: {
    oath: 'Discipline · Teamplay · Victory',
    heroTag: 'Silent Moonfall | Guild',
    heroTitle: 'Silent Moonfall — guild in Justice Mobile',
    heroSubtitle:
      'We bring focused players together for raids, PvP and steady progress. Clear communication, respect and consistent activity.',
    heroCtaPrimary: 'Schedule',
    heroCtaSecondary: 'Guides',
    heroManifestoTitle: 'About the guild',
    heroManifestoBody:
      'Silent Moonfall is a guild built for results without losing the human side. We help new players grow, sharpen veterans, and clear hard content together as one team.',
    ritualOneTitle: 'Joining',
    ritualOneBody: 'Quick entry and team onboarding.',
    ritualTwoTitle: 'Guidelines',
    ritualTwoBody: 'Respect, activity, accountability.',
    ritualThreeTitle: 'Community',
    ritualThreeBody: 'Reliable roster with strong server reputation.',
    pillarOne: 'Active participation',
    pillarTwo: 'Skill development',
    pillarThree: 'Group content',
    pillarFour: 'Team achievements',
  },
  zh: {
    oath: '纪律 · 协作 · 胜利',
    heroTag: 'Silent Moonfall | 公会',
    heroTitle: 'Silent Moonfall — Justice Mobile 公会',
    heroSubtitle:
      '我们集结专注的玩家进行团本、PvP 与稳定成长。清晰沟通、相互尊重、长期活跃。',
    heroCtaPrimary: '日程',
    heroCtaSecondary: '攻略',
    heroManifestoTitle: '关于公会',
    heroManifestoBody:
      'Silent Moonfall 追求成绩，也重视团队氛围。我们帮助新成员成长，打磨核心成员，作为一个整体挑战高难内容。',
    ritualOneTitle: '加入',
    ritualOneBody: '快速入会并完成团队熟悉。',
    ritualTwoTitle: '规则',
    ritualTwoBody: '尊重、活跃、责任感。',
    ritualThreeTitle: '团队',
    ritualThreeBody: '稳定阵容，良好服务器口碑。',
    pillarOne: '积极参与',
    pillarTwo: '能力提升',
    pillarThree: '团队内容',
    pillarFour: '共同成就',
  },
};
