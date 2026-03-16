'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { AttendanceHeatmap } from '@/lib/schemas/analytics';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { analyticsStyles } from './Analytics.stylex';

interface AttendanceHeatmapProps {
  data: AttendanceHeatmap[];
  weeksToShow?: number;
}

function getAttendanceTone(rate: number): stylex.StyleXStyles {
  if (rate >= 80) return analyticsStyles.heatmapCellExcellent;
  if (rate >= 60) return analyticsStyles.heatmapCellGood;
  if (rate >= 40) return analyticsStyles.heatmapCellMid;
  if (rate >= 20) return analyticsStyles.heatmapCellLow;
  return analyticsStyles.heatmapCellEmpty;
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
      <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
        <div {...stylex.props(analyticsStyles.empty)}>
          <WuxiaIcon name="calendar" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p {...stylex.props(analyticsStyles.emptyText)}>Нет данных о посещаемости</p>
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.averageAttendance - a.averageAttendance);

  return (
    <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
      <div {...stylex.props(analyticsStyles.header)}>
        <h3 {...stylex.props(analyticsStyles.title)}>Heatmap посещаемости</h3>
        <div {...stylex.props(analyticsStyles.meta)}>Последние {weeksToShow} недель</div>
        </div>

      {/* Legend */}
      <div {...stylex.props(analyticsStyles.legend)}>
        <div {...stylex.props(analyticsStyles.legendItem)}>
          <div {...stylex.props(analyticsStyles.swatch, analyticsStyles.heatmapCellExcellent)} />
          <span>80%+</span>
        </div>
        <div {...stylex.props(analyticsStyles.legendItem)}>
          <div {...stylex.props(analyticsStyles.swatch, analyticsStyles.heatmapCellGood)} />
          <span>60-79%</span>
        </div>
        <div {...stylex.props(analyticsStyles.legendItem)}>
          <div {...stylex.props(analyticsStyles.swatch, analyticsStyles.heatmapCellMid)} />
          <span>40-59%</span>
        </div>
        <div {...stylex.props(analyticsStyles.legendItem)}>
          <div {...stylex.props(analyticsStyles.swatch, analyticsStyles.heatmapCellLow)} />
          <span>20-39%</span>
        </div>
        <div {...stylex.props(analyticsStyles.legendItem)}>
          <div {...stylex.props(analyticsStyles.swatch, analyticsStyles.heatmapCellEmpty)} />
          <span>&lt;20%</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div {...stylex.props(analyticsStyles.heatmapWrap)}>
        <div {...stylex.props(analyticsStyles.heatmapInner)}>
          {/* Header - Weeks */}
          <div {...stylex.props(analyticsStyles.heatmapHeader)}>
            <div style={{ fontWeight: 600 }}>Участник</div>
            {data[0]?.weeks.slice(-weeksToShow).map((week, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                {new Date(week.weekStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </div>
            ))}
          </div>

          {/* Rows - Members */}
          {sortedData.map((member) => (
            <div
              key={member.memberId}
              {...stylex.props(analyticsStyles.heatmapRow)}
            >
              {/* Member Info */}
              <div style={{ fontSize: 12, color: '#e6eff5', paddingRight: 8, overflow: 'hidden' }} title={member.memberName}>
                <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.memberName}</div>
                <div style={{ fontSize: 10, color: 'rgba(156,163,175,0.95)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.role} · {member.className}</div>
              </div>

              {/* Week Cells */}
              {member.weeks.slice(-weeksToShow).map((week, idx) => (
                <div
                  key={idx}
                  {...stylex.props(analyticsStyles.heatmapCellBase, getAttendanceTone(week.attendanceRate))}
                  title={`${getAttendanceLabel(week.attendanceRate)}: ${week.eventsAttended}/${week.totalEvents}`}
                >
                  <div {...stylex.props(analyticsStyles.heatmapPct)}>
                    {week.attendanceRate}%
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div {...stylex.props(analyticsStyles.summaryGrid4)}>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Средняя посещаемость</div>
          <div {...stylex.props(analyticsStyles.summaryValue)}>
            {Math.round(data.reduce((sum, m) => sum + m.averageAttendance, 0) / data.length)}%
          </div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Лучший участник</div>
          <div {...stylex.props(analyticsStyles.summaryValueGood)}>
            {sortedData[0]?.memberName || '—'}
          </div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Всего участников</div>
          <div {...stylex.props(analyticsStyles.summaryValue)}>{data.length}</div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Недель в анализе</div>
          <div {...stylex.props(analyticsStyles.summaryValue)}>{weeksToShow}</div>
        </div>
      </div>
    </div>
  );
}
