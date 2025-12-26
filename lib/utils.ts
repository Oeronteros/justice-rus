// Утилиты

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  if (typeof window === 'undefined') {
    // Server-side: простой escape
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function getRankClass(rank: string): string {
  const rankMap: Record<string, string> = {
    'novice': 'level-novice',
    'member': 'level-member',
    'veteran': 'level-veteran',
    'elite': 'level-elite',
    'legend': 'level-legend',
    'gm': 'level-gm'
  };
  
  const lowerRank = rank?.toLowerCase();
  return rankMap[lowerRank] || 'bg-gray-700';
}

export function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    'active': 'status-active',
    'inactive': 'status-inactive',
    'pending': 'status-pending',
    'leave': 'status-leave'
  };
  
  const lowerStatus = status?.toLowerCase();
  return statusMap[lowerStatus] || 'bg-gray-700';
}

export function getKPIClass(kpi: number | string): string {
  const kpiNum = typeof kpi === 'string' ? parseInt(kpi) || 0 : kpi;
  if (kpiNum >= 80) return 'kpi-good';
  if (kpiNum >= 50) return 'kpi-medium';
  return 'kpi-bad';
}

