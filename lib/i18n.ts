import { Section } from '@/types';

export type Language = 'ru' | 'en';

export const sectionLabels: Record<Language, Record<Section, string>> = {
  ru: {
    registration: 'Регистрация',
    schedule: 'Расписание',
    help: 'Помощь',
    news: 'Новости',
    guides: 'Гайды',
    absences: 'Отсутствия',
    calculator: 'Калькулятор',
  },
  en: {
    registration: 'Registration',
    schedule: 'Schedule',
    help: 'Help',
    news: 'News',
    guides: 'Guides',
    absences: 'Absences',
    calculator: 'Calculator',
  },
};
