'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { AttendanceTrend } from '@/lib/schemas/analytics';

interface AttendanceTrendsChartProps {
  data: AttendanceTrend[];
  daysToShow?: number;
}

export function AttendanceTrendsChart({ data, daysToShow = 14 }: AttendanceTrendsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card section-card p-6">
        <div className="text-center text-gray-400 py-8">
          <WuxiaIcon name="schedule" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Нет данных о трендах</p>
        </div>
      </div>
    );
  }

  const recentData = data.slice(-daysToShow);
  const maxAttendance = Math.max(...recentData.map(d => d.attendanceRate), 1);
  const maxMembers = Math.max(...recentData.map(d => d.activeMembers), 1);

  const averageRate = Math.round(recentData.reduce((sum, d) => sum + d.attendanceRate, 0) / recentData.length);
  const trend = recentData.length >= 2
    ? recentData[recentData.length - 1].attendanceRate - recentData[0].attendanceRate
    : 0;

  return (
    <div className="card section-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#bcd6e5]">Тренды посещаемости</h3>
        <div className={`flex items-center gap-1 text-xs font-medium ${
          trend > 0 ? 'text-[#2d5a3f]' : trend < 0 ? 'text-[#5a2d2d]' : 'text-gray-400'
        }`}>
          <WuxiaIcon
            name={trend > 0 ? 'trendingUp' : trend < 0 ? 'trendingDown' : 'minus'}
            className="w-3.5 h-3.5"
          />
          {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48 mb-4">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-500">
          {[100, 75, 50, 25, 0].map((level) => (
            <div key={level} className="flex items-center gap-2">
              <span className="w-8 text-right">{level}%</span>
              <div className="flex-1 h-px bg-[#2a3c4c]/40" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 left-10 right-0 flex items-end justify-between gap-1 px-2">
          {recentData.map((day, idx) => {
            const height = (day.attendanceRate / maxAttendance) * 100;
            const isActive = day.attendanceRate >= 60;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col justify-end group relative"
              >
                <div
                  className={`w-full rounded-t transition-all ${
                    isActive
                      ? 'bg-gradient-to-t from-[#2d5a3f] to-[#6fb98f]'
                      : 'bg-gradient-to-t from-[#5a2d2d] to-[#b96f6f]'
                  }`}
                  style={{ height: `${height}%` }}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#101a23] border border-[#2a3c4c] rounded text-xs text-[#e6eff5] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  <div className="font-medium">{day.attendanceRate}%</div>
                  <div className="text-gray-400">{day.activeMembers}/{day.totalMembers} участников</div>
                  <div className="text-gray-400">{day.eventsCount} событий</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between gap-1 px-2 mt-2 text-xs text-gray-400">
        {recentData.map((day, idx) => {
          const date = new Date(day.date);
          const showLabel = idx % Math.ceil(recentData.length / 7) === 0;
          
          return (
            <div key={idx} className="flex-1 text-center">
              {showLabel && (
                <span>{date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-[#2a3c4c]/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-gray-400 mb-1">Средняя посещаемость</div>
          <div className="text-lg font-semibold text-[#e6eff5]">{averageRate}%</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Пик активности</div>
          <div className="text-sm font-medium text-[#2d5a3f]">
            {Math.round(Math.max(...recentData.map(d => d.attendanceRate)))}%
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Спад активности</div>
          <div className="text-sm font-medium text-[#5a2d2d]">
            {Math.round(Math.min(...recentData.map(d => d.attendanceRate)))}%
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Тренд</div>
          <div className={`text-lg font-semibold ${
            trend > 0 ? 'text-[#2d5a3f]' : trend < 0 ? 'text-[#5a2d2d]' : 'text-gray-400'
          }`}>
            {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {trend > 0 ? 'Рост' : trend < 0 ? 'Спад' : 'Стабильно'}
          </div>
        </div>
      </div>
    </div>
  );
}
