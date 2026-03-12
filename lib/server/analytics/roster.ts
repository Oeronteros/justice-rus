import { getPool, hasDatabaseUrl } from '@/lib/neon';
import type { RosterAnalytics } from '@/lib/schemas/analytics';

export async function getRosterAnalytics(days: number): Promise<RosterAnalytics> {
  if (!hasDatabaseUrl()) {
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

  const pool = getPool();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const rosterResult = await pool.query(
    `
    SELECT
      r.id,
      r.nickname,
      r.rank as role,
      r.class as class_name,
      COUNT(DISTINCT CASE WHEN a.attended = true THEN a.event_date END) as events_attended,
      COUNT(DISTINCT a.event_date) as total_events
    FROM registrations r
    LEFT JOIN attendance a ON r.id = a.member_id AND a.event_date >= $1
    WHERE r.status = 'active'
    GROUP BY r.id, r.nickname, r.rank, r.class
    ORDER BY r.nickname
    `,
    [cutoffDate]
  );

  const heatmap = rosterResult.rows.map((row) => {
    const attendanceRate = row.total_events > 0 ? Math.round((row.events_attended / row.total_events) * 100) : 0;

    return {
      memberId: String(row.id),
      memberName: row.nickname,
      role: row.role,
      className: row.class_name,
      weeks: [],
      averageAttendance: attendanceRate,
    };
  });

  const classResult = await pool.query(
    `
    SELECT class as class_name, COUNT(*) as count
    FROM registrations
    WHERE status = 'active'
    GROUP BY class
    ORDER BY count DESC
    `
  );

  const totalMembers = classResult.rows.reduce((sum: number, row: { count: string | number }) => sum + Number(row.count), 0);
  const classComposition = classResult.rows.map((row: { class_name: string; count: string | number }) => ({
    className: row.class_name,
    count: Number(row.count),
    percentage: totalMembers > 0 ? Math.round((Number(row.count) / totalMembers) * 100) : 0,
    icon: row.class_name,
  }));

  const trendResult = await pool.query(
    `
    SELECT
      event_date as date,
      COUNT(DISTINCT member_id) FILTER (WHERE attended = true) as active_members,
      COUNT(DISTINCT member_id) as total_members,
      COUNT(*) as events_count
    FROM attendance
    WHERE event_date >= NOW() - INTERVAL '14 days'
    GROUP BY event_date
    ORDER BY event_date DESC
    `
  );

  const trends = trendResult.rows.map((row: { date: string; total_members: string | number; active_members: string | number; events_count: string | number }) => ({
    date: row.date,
    totalMembers: Number(row.total_members),
    activeMembers: Number(row.active_members),
    attendanceRate: Number(row.total_members) > 0 ? Math.round((Number(row.active_members) / Number(row.total_members)) * 100) : 0,
    eventsCount: Number(row.events_count),
  }));

  const officerResult = await pool.query(
    `
    SELECT
      r.id,
      r.nickname,
      r.rank as role,
      COUNT(DISTINCT a.id) FILTER (WHERE a.action = 'approve') as approvals,
      COUNT(DISTINCT h.id) as help_handled,
      COUNT(DISTINCT ab.id) as absences_reviewed
    FROM registrations r
    LEFT JOIN admin_actions a ON r.id = a.officer_id AND a.action = 'approve'
    LEFT JOIN help_requests h ON r.id = h.responder_id
    LEFT JOIN absences ab ON r.id = ab.reviewer_id
    WHERE r.rank IN ('officer', 'head', 'sysadmin')
    GROUP BY r.id, r.nickname, r.rank
    ORDER BY approvals + help_handled + absences_reviewed DESC
    `
  );

  const officerWorkload = officerResult.rows.map((row: { id: string | number; nickname: string; role: string; approvals: string | number; help_handled: string | number; absences_reviewed: string | number }) => {
    const totalActions = Number(row.approvals) + Number(row.help_handled) + Number(row.absences_reviewed);
    const workloadScore = Math.min(100, Math.round((totalActions / 50) * 100));

    return {
      officerId: String(row.id),
      officerName: row.nickname,
      role: row.role,
      metrics: {
        approvalsProcessed: Number(row.approvals),
        helpRequestsHandled: Number(row.help_handled),
        absencesReviewed: Number(row.absences_reviewed),
        averageResponseTime: 2,
      },
      workloadScore,
    };
  });

  const activeMembers = rosterResult.rows.filter((row: { events_attended: string | number }) => Number(row.events_attended) > 0).length;
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
      inactiveMembers: totalMembers - activeMembers,
      averageAttendance,
      topAttendees,
    },
  };
}
