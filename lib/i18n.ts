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
    oath: 'Клятва: Кровь - Тишина - Победа',
    heroTag: 'Клятва ордена Demonic Cult',
    heroTitle: 'Demonic Cult — холодная школа уся в Justice Mobile. Рейды. Дуэли. Дисциплина.',
    heroSubtitle:
      'Мы собираем тех, кто держит строй, читает бой и умеет побеждать без лишнего шума. Здесь власть — это контроль и точность.',
    heroCtaPrimary: 'Открыть расписание',
    heroCtaSecondary: 'Смотреть гайды',
    heroManifestoTitle: 'Манифест ордена',
    heroManifestoBody:
      'В культе нет случайных. Мы не кричим — мы делаем. Каждый рейд — обряд, каждая дуэль — экзамен, каждое слово — печать. Если ты пришёл за силой, принеси дисциплину. Если ты пришёл за славой, докажи её делом.',
    ritualOneTitle: 'Обряд входа',
    ritualOneBody: 'Проверка клинка, духа и верности — без истерик и суеты.',
    ritualTwoTitle: 'Кодекс крови',
    ritualTwoBody: 'Тишина, дисциплина, победа. Ошибка — урок. Повтор — наказание.',
    ritualThreeTitle: 'Печать ордена',
    ritualThreeBody: 'Знак, который знают союзники и помнят враги.',
    pillarOne: 'Посвящение и дисциплина',
    pillarTwo: 'Школа дуэлей и контроля',
    pillarThree: 'Охота за легендами',
    pillarFour: 'Венчание рейдов и титулов',
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
