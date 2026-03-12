import { NextRequest, NextResponse } from 'next/server';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { canManageAccounts } from '@/lib/authz';

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || !canManageAccounts(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);

    if (!hasDatabaseUrl()) {
      // Return mock data
      return NextResponse.json({
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
      });
    }

    const pool = getPool();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Get roster with attendance
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

    // Calculate heatmap data
    const heatmap = rosterResult.rows.map((row) => {
      const attendanceRate = row.total_events > 0 
        ? Math.round((row.events_attended / row.total_events) * 100) 
        : 0;

      return {
        memberId: String(row.id),
        memberName: row.nickname,
        role: row.role,
        className: row.class_name,
        weeks: [],
        averageAttendance: attendanceRate,
      };
    });

    // Get class composition
    const classResult = await pool.query(
      `
      SELECT class as class_name, COUNT(*) as count
      FROM registrations
      WHERE status = 'active'
      GROUP BY class
      ORDER BY count DESC
      `
    );

    const totalMembers = classResult.rows.reduce((sum: number, row: any) => sum + Number(row.count), 0);
    const classComposition = classResult.rows.map((row: any) => ({
      className: row.class_name,
      count: Number(row.count),
      percentage: totalMembers > 0 ? Math.round((Number(row.count) / totalMembers) * 100) : 0,
      icon: row.class_name,
    }));

    // Get attendance trends (last 14 days)
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

    const trends = trendResult.rows.map((row: any) => ({
      date: row.date,
      totalMembers: Number(row.total_members),
      activeMembers: Number(row.active_members),
      attendanceRate: row.total_members > 0 
        ? Math.round((Number(row.active_members) / Number(row.total_members)) * 100) 
        : 0,
      eventsCount: Number(row.events_count),
    }));

    // Get officer workload
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

    const officerWorkload = officerResult.rows.map((row: any) => {
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
          averageResponseTime: 2, // Mock value
        },
        workloadScore,
      };
    });

    // Calculate summary
    const activeMembers = rosterResult.rows.filter((row: any) => Number(row.events_attended) > 0).length;
    const averageAttendance = heatmap.length > 0
      ? Math.round(heatmap.reduce((sum: number, h: any) => sum + h.averageAttendance, 0) / heatmap.length)
      : 0;

    const topAttendees = [...heatmap]
      .sort((a: any, b: any) => b.averageAttendance - a.averageAttendance)
      .slice(0, 5)
      .map((h: any) => ({
        memberId: h.memberId,
        memberName: h.memberName,
        attendanceRate: h.averageAttendance,
      }));

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Error fetching roster analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
    },
  });
}
