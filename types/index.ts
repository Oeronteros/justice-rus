// Типы данных для приложения

export type UserRole = 'guest' | 'member' | 'officer' | 'head' | 'sysadmin';
export type Section =
  | 'registration'
  | 'schedule'
  | 'pvp'
  | 'guides'
  | 'help'
  | 'absences'
  | 'news'
  | 'about'
  | 'calculator'
  | 'profile';

export interface User {
  id?: string;
  nickname?: string;
  role: UserRole;
  isActive?: boolean;
  authMethod?: 'account' | 'pin';
  discordId?: string | null;
  discordHandle?: string | null;
  className?: string | null;
  exp?: number;
}

export interface PortalAccount {
  id: string;
  nickname: string;
  role: UserRole;
  isActive: boolean;
  discordHandle?: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface Registration {
  discord: string;
  discordHandle?: string | null;
  avatarUrl?: string | null;
  nickname: string;
  rank: RegistrationRank;
  class: string;
  guild: string;
  joinDate: string;
  kpi: number;
  elo: number;
  mmr20: number;
  bounty: number;
  marks: number;
  outerHeroic: number;
  innerHeroic: number;
  crimsonSands: number;
  abyss: number;
  gvg: number;
  secretRealm: number;
  duelWins: number;
  duelLosses: number;
  status: RegistrationStatus;
}

export type RegistrationRank = UserRole;
export type RegistrationStatus = 'active' | 'inactive' | 'pending' | 'leave';

export interface Schedule {
  date: string;
  registration: string;
  type: string;
  description: string;
  group?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  pinned?: boolean;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
}

export interface Absence {
  id: string;
  member: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface HelpRequest {
  id: string;
  title: string;
  details: string;
  category: string;
  author: string;
  status: 'open' | 'closed';
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export interface VerifyAuthResponse {
  valid: boolean;
  user: User;
}

export type {
  GuideSummary,
  GuideDetail,
  GuideComment,
  CreateGuideDto,
  CreateCommentDto,
} from '@/lib/schemas/guide';

export type {
  HelpRequest as HelpRequestSchema,
  CreateHelpRequestDto,
  UpdateHelpRequestDto,
} from '@/lib/schemas/help';

export type {
  CreateAbsenceDto,
} from '@/lib/schemas/absence';
