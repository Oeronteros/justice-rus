// Типы данных для приложения

export type Section =
  | 'registration'
  | 'schedule'
  | 'calendar'
  | 'analytics'
  | 'workflow'
  | 'integrations'
  | 'workflow'
  | 'analytics'
  | 'pvp'
  | 'guides'
  | 'help'
  | 'absences'
  | 'news'
  | 'about'
  | 'calculator'
  | 'profile';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface Schedule {
  date: string;
  registration: string;
  type: string;
  description: string;
  group?: string;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
}

export type { UserRole, User, AuthResponse, VerifyAuthResponse } from '@/lib/schemas/auth';

export type { PortalAccount } from '@/lib/schemas/account';

export type { Registration, RegistrationRank, RegistrationStatus } from '@/lib/schemas/registration';

export type { News } from '@/lib/schemas/news';

export type { Absence } from '@/lib/schemas/absence';

export type { HelpRequest } from '@/lib/schemas/help';

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
