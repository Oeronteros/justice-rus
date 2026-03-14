import { getPool, hasDatabaseUrl } from '@/lib/neon';
import type { RosterAnalytics } from '@/lib/schemas/analytics';

function emptyAnalytics(): RosterAnalytics {
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
}

function toDate(value: unknown): Date | null {
  if (!value) return null;
  const parsed = new Date(String(value));
  return Number.isFinite(parsed.getTime()) ? parsed : null;
}

function attendanceForWeek(lastLoginAt: Date | null, weekStart: Date): number {
  if (!lastLoginAt) return 0;
  return lastLoginAt >= weekStart ? 100 : 0;
}

export async function getRosterAnalytics(days: number): Promise<RosterAnalytics> {
  if (!hasDatabaseUrl()) {
    return emptyAnalytics();
  }

  try {
    const pool = getPool();
    const accountResult = await pool.query(
      `
      SELECT id, nickname, role, class_name, guild_name, is_active, last_login_at, created_at
      FROM portal_account
      ORDER BY nickname ASC
      `
    );

    if (accountResult.rows.length === 0) {
      return emptyAnalytics();
    }

    const now = new Date();
    const weekStarts = Array.from({ length: 4 }, (_, index) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (3 - index) * 7);
      date.setHours(0, 0, 0, 0);
      return date;
    });

    const heatmap = accountResult.rows.map((row) => {
      const lastLoginAt = toDate(row.last_login_at);
      const weeks = weekStarts.map((weekStart) => ({
        weekStart: weekStart.toISOString(),
        attendanceRate: attendanceForWeek(lastLoginAt, weekStart),
        eventsAttended: attendanceForWeek(lastLoginAt, weekStart) > 0 ? 1 : 0,
        totalEvents: 1,
      }));
      const averageAttendance = Math.round(weeks.reduce((sum, week) => sum + week.attendanceRate, 0) / weeks.length);

      return {
        memberId: String(row.id),
        memberName: String(row.nickname || 'Unknown'),
        role: String(row.role || 'member'),
        className: String(row.class_name || 'Unknown'),
        weeks,
        averageAttendance,
      };
    });

    const totalMembers = accountResult.rows.length;
    const activeMembers = accountResult.rows.filter((row) => Boolean(row.is_active)).length;
    const inactiveMembers = totalMembers - activeMembers;

    const classCounts = new Map<string, number>();
    for (const row of accountResult.rows) {
      const key = String(row.class_name || 'Unknown');
      classCounts.set(key, (classCounts.get(key) || 0) + 1);
    }

    const classComposition = [...classCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([className, count]) => ({
        className,
        count,
        percentage: totalMembers > 0 ? Math.round((count / totalMembers) * 100) : 0,
        icon: className,
      }));

    const helpActivity = await pool.query(
      `
      SELECT created_at::date AS day, COUNT(*)::int AS count
      FROM help_requests
      WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
      GROUP BY day
      `,
      [Math.max(7, days)]
    ).catch(() => ({ rows: [] as Array<{ day: string; count: number }> }));

    const absenceActivity = await pool.query(
      `
      SELECT created_at::date AS day, COUNT(*)::int AS count
      FROM absences
      WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
      GROUP BY day
      `,
      [Math.max(7, days)]
    ).catch(() => ({ rows: [] as Array<{ day: string; count: number }> }));

    const activityByDay = new Map<string, number>();
    for (const row of helpActivity.rows) {
      const key = String(row.day);
      activityByDay.set(key, (activityByDay.get(key) || 0) + Number(row.count || 0));
    }
    for (const row of absenceActivity.rows) {
      const key = String(row.day);
      activityByDay.set(key, (activityByDay.get(key) || 0) + Number(row.count || 0));
    }

    const trends = Array.from({ length: 14 }, (_, index) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (13 - index));
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toISOString().slice(0, 10);
      const activeWindowStart = new Date(date);
      activeWindowStart.setDate(activeWindowStart.getDate() - 7);
      const recentActive = accountResult.rows.filter((row) => {
        const lastLoginAt = toDate(row.last_login_at);
        return lastLoginAt && lastLoginAt >= activeWindowStart;
      }).length;

      return {
        date: dateKey,
        totalMembers,
        activeMembers: recentActive,
        attendanceRate: totalMembers > 0 ? Math.round((recentActive / totalMembers) * 100) : 0,
        eventsCount: activityByDay.get(dateKey) || 0,
      };
    });

    const officerWorkload = accountResult.rows
      .filter((row) => ['officer', 'head', 'sysadmin'].includes(String(row.role || '')))
      .map((row) => {
        const lastLoginAt = toDate(row.last_login_at);
        const recencyScore = lastLoginAt && now.getTime() - lastLoginAt.getTime() < 7 * 24 * 60 * 60 * 1000 ? 70 : 25;

        return {
          officerId: String(row.id),
          officerName: String(row.nickname || 'Unknown'),
          role: String(row.role || 'officer'),
          metrics: {
            approvalsProcessed: 0,
            helpRequestsHandled: 0,
            absencesReviewed: 0,
            averageResponseTime: 0,
          },
          workloadScore: recencyScore,
        };
      });

    const averageAttendance = heatmap.length > 0
      ? Math.round(heatmap.reduce((sum, item) => sum + item.averageAttendance, 0) / heatmap.length)
      : 0;

    const topAttendees = [...heatmap]
      .sort((left, right) => right.averageAttendance - left.averageAttendance)
      .slice(0, 5)
      .map((item) => ({
        memberId: item.memberId,
        memberName: item.memberName,
        attendanceRate: item.averageAttendance,
      }));

    return {
      heatmap,
      classComposition,
      trends,
      officerWorkload,
      summary: {
        totalMembers,
        activeMembers,
        inactiveMembers,
        averageAttendance,
        topAttendees,
      },
    };
  } catch (error) {
    console.error('Failed to build roster analytics:', error);
    return emptyAnalytics();
  }
}
