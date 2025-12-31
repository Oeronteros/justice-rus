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
    oath: 'Принципы: Организация - Стратегия - Победа',
    heroTag: 'Гильдия Demonic Cult',
    heroTitle: 'Demonic Cult — организованная гильдия в Justice Mobile. Рейды. PvP. Прогресс.',
    heroSubtitle:
      'Мы собираем игроков, которые держат строй, понимают механики и умеют работать в команде. Здесь сила — это знания и координация.',
    heroCtaPrimary: 'Открыть расписание',
    heroCtaSecondary: 'Смотреть гайды',
    heroManifestoTitle: 'О гильдии',
    heroManifestoBody:
      'В гильдии каждый член команды важен. Мы фокусируемся на результате, а не на пустых разговорах. Каждый рейд — это тренировка, каждая битва — возможность стать лучше. Мы ценим тех, кто готов учиться, адаптироваться и вносить вклад в общую победу.',
    ritualOneTitle: 'Вступление',
    ritualOneBody: 'Проверка навыков и готовности к командной игре.',
    ritualTwoTitle: 'Правила',
    ritualTwoBody: 'Дисциплина, коммуникация, уважение. Ошибки — это опыт. Главное — развитие.',
    ritualThreeTitle: 'Репутация',
    ritualThreeBody: 'Гильдия, которую уважают союзники и знают противники.',
    pillarOne: 'Активное участие',
    pillarTwo: 'Развитие навыков',
    pillarThree: 'Прохождение контента',
    pillarFour: 'Командные достижения',
  },
  en: {
    oath: 'Oath: Blood - Silence - Victory',
    heroTag: 'Demonic Cult Oath',
    heroTitle: 'Demonic Cult — a cold Wuxia order in Justice Mobile. Raids. Duels. Discipline.',
    heroSubtitle:
      'We gather players who hold formation, read the fight, and win without noise. Power here means control and precision.',
    heroCtaPrimary: 'Open schedule',
    heroCtaSecondary: 'View guides',
    heroManifestoTitle: 'Order manifesto',
    heroManifestoBody:
      'No one joins by accident. We do not shout — we act. Every raid is a rite, every duel is an exam, every word is a seal. If you seek strength, bring discipline. If you seek glory, prove it with deeds.',
    ritualOneTitle: 'Entry rite',
    ritualOneBody: 'A test of blade, spirit, and loyalty — without drama.',
    ritualTwoTitle: 'Blood code',
    ritualTwoBody: 'Silence, discipline, victory. Mistakes are lessons. Repeats are punishment.',
    ritualThreeTitle: 'Order seal',
    ritualThreeBody: 'A mark allies respect and enemies remember.',
    pillarOne: 'Initiation and discipline',
    pillarTwo: 'Duel school and control',
    pillarThree: 'Hunt for legends',
    pillarFour: 'Crowning raids and titles',
  },
};
