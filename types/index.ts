// Типы данных для приложения

export type UserRole = 'member' | 'officer' | 'gm';
export type Section = 'registration' | 'schedule' | 'help' | 'news' | 'guides' | 'absences' | 'calculator';

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

// Deprecated: используйте Registration
export interface Member extends Registration {}

export type RegistrationRank = 'novice' | 'member' | 'veteran' | 'elite' | 'legend' | 'gm';
export type RegistrationStatus = 'active' | 'inactive' | 'pending' | 'leave';

// Deprecated: используйте RegistrationRank и RegistrationStatus
export type MemberRank = RegistrationRank;
export type MemberStatus = RegistrationStatus;

export interface Schedule {
  date: string;
  registration: string;
  type: string;
  description: string;
}

// Deprecated: используйте Schedule
export interface Activity extends Schedule {}

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

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  role: UserRole;
  token: string;
}

export interface VerifyAuthResponse {
  valid: boolean;
  role: UserRole;
  discordId?: string | null;
}

