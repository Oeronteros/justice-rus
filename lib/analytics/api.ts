import { rosterAnalyticsSchema, type RosterAnalytics } from '@/lib/schemas/analytics';

export const analyticsApi = {
  getRosterAnalytics: async (days: number = 30): Promise<RosterAnalytics> => {
    const response = await fetch(`/api/analytics/roster?days=${encodeURIComponent(String(days))}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      const error = typeof payload?.error === 'string' ? payload.error : 'Failed to fetch analytics';
      throw new Error(error);
    }

    return rosterAnalyticsSchema.parse(payload || {});
  },
};
