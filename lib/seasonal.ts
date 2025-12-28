export const NEWYEAR_STORAGE_KEY = 'dc_season_newyear';

export function isNewYearSeason(date: Date): boolean {
  const month = date.getMonth();
  const day = date.getDate();
  return (month === 11 && day >= 15) || (month === 0 && day <= 15);
}

export function resolveNewYearEnabled(date: Date, storedValue: string | null): boolean {
  if (storedValue === 'on') return true;
  if (storedValue === 'off') return false;
  return isNewYearSeason(date);
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

