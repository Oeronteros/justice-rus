export const NEWYEAR_STORAGE_KEY = 'dc_season_winter';

export function isWinterSeason(date: Date): boolean {
  const month = date.getMonth();
  // Зимний сезон: декабрь, январь, февраль
  return month === 11 || month === 0 || month === 1;
}

export function resolveNewYearEnabled(date: Date, storedValue: string | null): boolean {
  if (storedValue === 'on') return true;
  if (storedValue === 'off') return false;
  return isWinterSeason(date);
}

export function formatCountdownParts(milliseconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

