import { z } from 'zod';

// Analytics data schemas
export const attendanceHeatmapSchema = z.object({
  memberId: z.string(),
  memberName: z.string(),
  role: z.string(),
  className: z.string(),
  weeks: z.array(z.object({
    weekStart: z.string(),
    attendanceRate: z.number(), // 0-100
    eventsAttended: z.number(),
    totalEvents: z.number(),
  })),
  averageAttendance: z.number(), // 0-100
});

export const classCompositionSchema = z.object({
  className: z.string(),
  count: z.number(),
  percentage: z.number(),
  icon: z.string(),
});

export const attendanceTrendSchema = z.object({
  date: z.string(),
  totalMembers: z.number(),
  activeMembers: z.number(),
  attendanceRate: z.number(), // 0-100
  eventsCount: z.number(),
});

export const officerWorkloadSchema = z.object({
  officerId: z.string(),
  officerName: z.string(),
  role: z.string(),
  metrics: z.object({
    approvalsProcessed: z.number(),
    helpRequestsHandled: z.number(),
    absencesReviewed: z.number(),
    averageResponseTime: z.number(), // in hours
  }),
  workloadScore: z.number(), // 0-100
});

export const rosterAnalyticsSchema = z.object({
  heatmap: z.array(attendanceHeatmapSchema),
  classComposition: z.array(classCompositionSchema),
  trends: z.array(attendanceTrendSchema),
  officerWorkload: z.array(officerWorkloadSchema),
  summary: z.object({
    totalMembers: z.number(),
    activeMembers: z.number(),
    inactiveMembers: z.number(),
    averageAttendance: z.number(),
    topAttendees: z.array(z.object({
      memberId: z.string(),
      memberName: z.string(),
      attendanceRate: z.number(),
    })),
  }),
});

export type AttendanceHeatmap = z.infer<typeof attendanceHeatmapSchema>;
export type ClassComposition = z.infer<typeof classCompositionSchema>;
export type AttendanceTrend = z.infer<typeof attendanceTrendSchema>;
export type OfficerWorkload = z.infer<typeof officerWorkloadSchema>;
export type RosterAnalytics = z.infer<typeof rosterAnalyticsSchema>;
