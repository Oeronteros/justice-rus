// Типы данных для приложения

export type UserRole = 'member' | 'officer' | 'gm';
export type Section =
  | 'registration'
  | 'schedule'
  | 'guides'
  | 'help'
  | 'absences'
  | 'news'
  | 'about'
  | 'calculator';

export interface User {
  role: UserRole;
  discordId?: string | null;
  exp?: number;
}

export interface Registration {
  discord: string;
  nickname: string;
  rank: RegistrationRank;
  class: string;
  guild: string;
  joinDate: string;
  kpi: number;
  status: RegistrationStatus;
}

export type RegistrationRank = 'novice' | 'member' | 'veteran' | 'elite' | 'legend' | 'gm';
export type RegistrationStatus = 'active' | 'inactive' | 'pending' | 'leave';

export interface Schedule {
  date: string;
  registration: string;
  type: string;
  description: string;
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
  role: UserRole;
}

export interface VerifyAuthResponse {
  valid: boolean;
  role: UserRole;
  discordId?: string | null;
}

// Re-export types from schemas for convenience
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

