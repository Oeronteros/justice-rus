import { Section } from '@/types';

export type Language = 'ru' | 'en';

export const sectionLabels: Record<Language, Record<Section, string>> = {
  ru: {
    registration: 'Участники',
    schedule: 'Расписание',
    news: 'Новости',
    guides: 'Гайды',
    absences: 'Отсутствия',
    help: 'Помощь',
    about: 'О нас',
    calculator: 'Калькулятор',
  },
  en: {
    registration: 'Members',
    schedule: 'Schedule',
    news: 'News',
    guides: 'Guides',
    absences: 'Absences',
    help: 'Help',
    about: 'About',
    calculator: 'Calculator',
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
    oath: 'Организация · Стратегия · Результат',
    heroTag: 'Cult | Game Community',
    heroTitle: 'Cult — игровое сообщество в Justice Mobile',
    heroSubtitle:
      'Объединяем игроков для совместного прохождения контента. Рейды, PvP, обмен опытом и дружеская атмосфера.',
    heroCtaPrimary: 'Расписание',
    heroCtaSecondary: 'Гайды',
    heroManifestoTitle: 'О сообществе',
    heroManifestoBody:
      'Мы — активное игровое сообщество, где каждый участник важен. Помогаем новичкам освоиться, делимся знаниями и вместе проходим сложный контент. Главное для нас — комфортная игра и взаимопомощь.',
    ritualOneTitle: 'Вступление',
    ritualOneBody: 'Простая регистрация и знакомство с командой.',
    ritualTwoTitle: 'Правила',
    ritualTwoBody: 'Уважение, активность, готовность помочь.',
    ritualThreeTitle: 'Сообщество',
    ritualThreeBody: 'Дружный коллектив с хорошей репутацией на сервере.',
    pillarOne: 'Активное участие',
    pillarTwo: 'Развитие навыков',
    pillarThree: 'Совместный контент',
    pillarFour: 'Командные достижения',
  },
  en: {
    oath: 'Organization · Strategy · Results',
    heroTag: 'Cult | Game Community',
    heroTitle: 'Cult — gaming community in Justice Mobile',
    heroSubtitle:
      'We bring players together for group content. Raids, PvP, knowledge sharing and friendly atmosphere.',
    heroCtaPrimary: 'Schedule',
    heroCtaSecondary: 'Guides',
    heroManifestoTitle: 'About us',
    heroManifestoBody:
      'We are an active gaming community where every member matters. We help newcomers get started, share knowledge and tackle challenging content together. Our focus is comfortable gameplay and mutual support.',
    ritualOneTitle: 'Joining',
    ritualOneBody: 'Simple registration and team introduction.',
    ritualTwoTitle: 'Guidelines',
    ritualTwoBody: 'Respect, activity, willingness to help.',
    ritualThreeTitle: 'Community',
    ritualThreeBody: 'Friendly team with good server reputation.',
    pillarOne: 'Active participation',
    pillarTwo: 'Skill development',
    pillarThree: 'Group content',
    pillarFour: 'Team achievements',
  },
};
