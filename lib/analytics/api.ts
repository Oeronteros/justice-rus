import type { RosterAnalytics } from '@/lib/schemas/analytics';

// Mock API for analytics - replace with real API when backend is ready
export const analyticsApi = {
  getRosterAnalytics: async (days: number = 30): Promise<RosterAnalytics> => {
    // This will be replaced with actual API call
    // const response = await getApiAnalyticsRoster({ query: { days } });
    // return rosterAnalyticsSchema.parse(response.data);
    
    // Mock data for demonstration
    return {
      heatmap: [],
      classComposition: [],
      trends: [],
      officerWorkload: [],
      summary: {
        totalMembers: 0,
        activeMembers: 0,
        inactiveMembers: 0,
        averageAttendance: 0,
        topAttendees: [],
      },
    };
  },
};
