'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { AttendanceTrend } from '@/lib/schemas/analytics';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { analyticsStyles } from './Analytics.stylex';

interface AttendanceTrendsChartProps {
  data: AttendanceTrend[];
  daysToShow?: number;
}

export function AttendanceTrendsChart({ data, daysToShow = 14 }: AttendanceTrendsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
        <div {...stylex.props(analyticsStyles.empty)}>
          <WuxiaIcon name="schedule" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p {...stylex.props(analyticsStyles.emptyText)}>Нет данных о трендах</p>
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
    <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
      <div {...stylex.props(analyticsStyles.header)}>
        <h3 {...stylex.props(analyticsStyles.title)}>Тренды посещаемости</h3>
        <div {...stylex.props(analyticsStyles.subtleRow, trend > 0 ? analyticsStyles.summaryValueGood : trend < 0 ? analyticsStyles.summaryValueBad : analyticsStyles.meta)}>
          <WuxiaIcon
            name={trend > 0 ? 'redo' : trend < 0 ? 'refresh' : 'spinner'}
            className="w-3.5 h-3.5"
          />
          {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
        </div>
      </div>

      {/* Chart */}
      <div {...stylex.props(analyticsStyles.chartBox)}>
        {/* Grid Lines */}
        <div {...stylex.props(analyticsStyles.chartGrid)}>
          {[100, 75, 50, 25, 0].map((level) => (
            <div key={level} className="flex items-center gap-2">
              <span className="w-8 text-right">{level}%</span>
              <div className="flex-1 h-px bg-[#2a3c4c]/40" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div {...stylex.props(analyticsStyles.chartBars)}>
          {recentData.map((day, idx) => {
            const height = (day.attendanceRate / maxAttendance) * 100;
            const isActive = day.attendanceRate >= 60;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col justify-end group relative"
              >
                <div
                  {...stylex.props(analyticsStyles.chartBar, isActive ? analyticsStyles.chartBarGood : analyticsStyles.chartBarBad)}
                  style={{ height: `${height}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* X-Axis Labels */}
      <div {...stylex.props(analyticsStyles.xAxis)}>
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
      <div {...stylex.props(analyticsStyles.summaryGrid4)}>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Средняя посещаемость</div>
          <div {...stylex.props(analyticsStyles.summaryValue)}>{averageRate}%</div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Пик активности</div>
          <div {...stylex.props(analyticsStyles.summaryValueGood)}>
            {Math.round(Math.max(...recentData.map(d => d.attendanceRate)))}%
          </div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Спад активности</div>
          <div {...stylex.props(analyticsStyles.summaryValueBad)}>
            {Math.round(Math.min(...recentData.map(d => d.attendanceRate)))}%
          </div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Тренд</div>
          <div {...stylex.props(analyticsStyles.summaryValue, trend > 0 ? analyticsStyles.summaryValueGood : trend < 0 ? analyticsStyles.summaryValueBad : analyticsStyles.meta)}>
            {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {trend > 0 ? 'Рост' : trend < 0 ? 'Спад' : 'Стабильно'}
          </div>
        </div>
      </div>
    </div>
  );
}
