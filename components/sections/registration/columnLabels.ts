export type RegistrationColumnKey =
  | 'index'
  | 'discord'
  | 'nickname'
  | 'rank'
  | 'class'
  | 'guild'
  | 'elo'
  | 'mmr20'
  | 'bounty'
  | 'outerHeroic'
  | 'innerHeroic'
  | 'crimsonSands'
  | 'abyss'
  | 'gvg'
  | 'secretRealm'
  | 'marks'
  | 'kpi'
  | 'status'
  | 'actions';

export type RegistrationColumnLabels = Record<RegistrationColumnKey, string>;

export const defaultRegistrationColumnLabels: RegistrationColumnLabels = {
  index: 'Знак',
  discord: 'Discord',
  nickname: 'Имя',
  rank: 'Ранг',
  class: 'Класс',
  guild: 'Клан',
  elo: 'ELO',
  mmr20: 'Best MMR PvP',
  bounty: 'Bounty',
  outerHeroic: 'Outer Heroic',
  innerHeroic: 'Inner Heroic',
  crimsonSands: 'Crimson Sands',
  abyss: 'Abyss',
  gvg: 'GVG',
  secretRealm: 'Secret Realm',
  marks: 'Отметки',
  kpi: 'KPI',
  status: 'Статус',
  actions: 'Действия',
};

export const registrationColumnOrder: RegistrationColumnKey[] = [
  'index',
  'discord',
  'nickname',
  'rank',
  'class',
  'guild',
  'elo',
  'mmr20',
  'bounty',
  'outerHeroic',
  'innerHeroic',
  'crimsonSands',
  'abyss',
  'gvg',
  'secretRealm',
  'marks',
  'kpi',
  'status',
  'actions',
];
