'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { AttendanceHeatmap } from '@/lib/schemas/analytics';

interface AttendanceHeatmapProps {
  data: AttendanceHeatmap[];
  weeksToShow?: number;
}

function getAttendanceColor(rate: number): string {
  if (rate >= 80) return 'bg-[#2d5a3f]/90 border-[#2d5a3f]';
  if (rate >= 60) return 'bg-[#5a4a2d]/90 border-[#5a4a2d]';
  if (rate >= 40) return 'bg-[#5a3a2d]/90 border-[#5a3a2d]';
  if (rate >= 20) return 'bg-[#5a2d2d]/90 border-[#5a2d2d]';
  return 'bg-[#2d3a5a]/90 border-[#2d3a5a]';
}

function getAttendanceLabel(rate: number): string {
  if (rate >= 80) return 'Отлично';
  if (rate >= 60) return 'Хорошо';
  if (rate >= 40) return 'Средне';
  if (rate >= 20) return 'Низко';
  return 'Очень низко';
}

export function AttendanceHeatmapDisplay({ data, weeksToShow = 8 }: AttendanceHeatmapProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card section-card p-6">
        <div className="text-center text-gray-400 py-8">
          <WuxiaIcon name="calendar" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Нет данных о посещаемости</p>
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.averageAttendance - a.averageAttendance);

  return (
    <div className="card section-card p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#bcd6e5]">Heatmap посещаемости</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Последние {weeksToShow} недель</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#2d5a3f]" />
          <span className="text-gray-400">80%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#5a4a2d]" />
          <span className="text-gray-400">60-79%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#5a3a2d]" />
          <span className="text-gray-400">40-59%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#5a2d2d]" />
          <span className="text-gray-400">20-39%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#2d3a5a]" />
          <span className="text-gray-400">&lt;20%</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Header - Weeks */}
          <div className="grid grid-cols-[120px_repeat(8,1fr)] gap-1 mb-2">
            <div className="text-xs text-gray-400 font-medium">Участник</div>
            {data[0]?.weeks.slice(-weeksToShow).map((week, idx) => (
              <div key={idx} className="text-xs text-gray-400 text-center">
                {new Date(week.weekStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </div>
            ))}
          </div>

          {/* Rows - Members */}
          {sortedData.map((member) => (
            <div
              key={member.memberId}
              className="grid grid-cols-[120px_repeat(8,1fr)] gap-1 mb-2 items-center"
            >
              {/* Member Info */}
              <div className="text-xs text-[#e6eff5] truncate pr-2" title={member.memberName}>
                <div className="font-medium truncate">{member.memberName}</div>
                <div className="text-[10px] text-gray-400 truncate">{member.role} · {member.className}</div>
              </div>

              {/* Week Cells */}
              {member.weeks.slice(-weeksToShow).map((week, idx) => (
                <div
                  key={idx}
                  className={`h-8 rounded border ${getAttendanceColor(week.attendanceRate)} relative group cursor-help`}
                  title={`${getAttendanceLabel(week.attendanceRate)}: ${week.eventsAttended}/${week.totalEvents}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white/90">
                    {week.attendanceRate}%
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#101a23] border border-[#2a3c4c] rounded text-xs text-[#e6eff5] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {week.eventsAttended}/{week.totalEvents} событий
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-[#2a3c4c]/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-gray-400 mb-1">Средняя посещаемость</div>
          <div className="text-lg font-semibold text-[#e6eff5]">
            {Math.round(data.reduce((sum, m) => sum + m.averageAttendance, 0) / data.length)}%
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Лучший участник</div>
          <div className="text-sm font-medium text-[#2d5a3f] truncate">
            {sortedData[0]?.memberName || '—'}
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Всего участников</div>
          <div className="text-lg font-semibold text-[#e6eff5]">{data.length}</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Недель в анализе</div>
          <div className="text-lg font-semibold text-[#e6eff5]">{weeksToShow}</div>
        </div>
      </div>
    </div>
  );
}
