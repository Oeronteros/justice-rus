'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { OfficerWorkload } from '@/lib/schemas/analytics';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { analyticsStyles } from './Analytics.stylex';

interface OfficerWorkloadDisplayProps {
  data: OfficerWorkload[];
}

function getWorkloadLevel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Высокая', color: 'text-[#b96f6f]' };
  if (score >= 60) return { label: 'Средняя', color: 'text-[#b9a56f]' };
  if (score >= 40) return { label: 'Низкая', color: 'text-[#6fb98f]' };
  return { label: 'Минимальная', color: 'text-gray-400' };
}

export function OfficerWorkloadDisplay({ data }: OfficerWorkloadDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
        <div {...stylex.props(analyticsStyles.empty)}>
          <WuxiaIcon name="profile" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p {...stylex.props(analyticsStyles.emptyText)}>Нет данных о нагрузке офицеров</p>
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.workloadScore - a.workloadScore);
  const averageScore = Math.round(data.reduce((sum, o) => sum + o.workloadScore, 0) / data.length);

  return (
    <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
      <div {...stylex.props(analyticsStyles.header)}>
        <h3 {...stylex.props(analyticsStyles.title)}>Нагрузка офицеров</h3>
        <div {...stylex.props(analyticsStyles.meta)}>{data.length} офицеров</div>
      </div>

      {/* Officers Grid */}
      <div {...stylex.props(analyticsStyles.grid2)}>
        {sortedData.map((officer) => {
          const level = getWorkloadLevel(officer.workloadScore);

          return (
            <div
              key={officer.officerId}
              {...stylex.props(analyticsStyles.personCard)}
            >
              <div {...stylex.props(analyticsStyles.personHeader)}>
                <div className="flex items-center gap-2">
                  <div {...stylex.props(analyticsStyles.avatar)}>
                    {officer.officerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div {...stylex.props(analyticsStyles.personName)}>{officer.officerName}</div>
                    <div {...stylex.props(analyticsStyles.personRole)}>{officer.role}</div>
                  </div>
                </div>

                <div className={`text-xs font-medium ${level.color}`}>
                  {level.label}
                </div>
              </div>

              {/* Workload Score Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span {...stylex.props(analyticsStyles.label)}>Нагрузка</span>
                  <span {...stylex.props(analyticsStyles.personName)}>{officer.workloadScore}%</span>
                </div>
                <div {...stylex.props(analyticsStyles.progressTrack)}>
                  <div
                    {...stylex.props(officer.workloadScore >= 80 ? analyticsStyles.progressFillBad : officer.workloadScore >= 60 ? analyticsStyles.progressFillWarn : analyticsStyles.progressFillGood)}
                    style={{ width: `${officer.workloadScore}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div {...stylex.props(analyticsStyles.grid3)}>
                <div {...stylex.props(analyticsStyles.statBox)}>
                  <div {...stylex.props(analyticsStyles.label)}>Одобрено</div>
                  <div {...stylex.props(analyticsStyles.statBoxValue)}>
                    {officer.metrics.approvalsProcessed}
                  </div>
                </div>
                <div {...stylex.props(analyticsStyles.statBox)}>
                  <div {...stylex.props(analyticsStyles.label)}>Помощь</div>
                  <div {...stylex.props(analyticsStyles.statBoxValue)}>
                    {officer.metrics.helpRequestsHandled}
                  </div>
                </div>
                <div {...stylex.props(analyticsStyles.statBox)}>
                  <div {...stylex.props(analyticsStyles.label)}>Отсутствия</div>
                  <div {...stylex.props(analyticsStyles.statBoxValue)}>
                    {officer.metrics.absencesReviewed}
                  </div>
                </div>
              </div>

              {/* Response Time */}
              {officer.metrics.averageResponseTime > 0 && (
                <div className="mt-3 pt-3 border-t border-[#2a3c4c]/60 flex items-center justify-between text-xs">
                  <span {...stylex.props(analyticsStyles.label)}>Среднее время ответа</span>
                  <span {...stylex.props(analyticsStyles.personName)}>
                    {officer.metrics.averageResponseTime < 1
                      ? '< 1 ч'
                      : `${Math.round(officer.metrics.averageResponseTime)} ч`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div {...stylex.props(analyticsStyles.summaryGrid4)}>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Средняя нагрузка</div>
          <div {...stylex.props(analyticsStyles.summaryValue)}>{averageScore}%</div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Максимальная</div>
          <div {...stylex.props(analyticsStyles.summaryValueWarn)}>
            {sortedData[0]?.officerName || '—'}
          </div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Минимальная</div>
          <div {...stylex.props(analyticsStyles.summaryValueGood)}>
            {sortedData[sortedData.length - 1]?.officerName || '—'}
          </div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Перегружены</div>
          <div {...stylex.props(analyticsStyles.summaryValueBad)}>
            {data.filter(o => o.workloadScore >= 80).length}
          </div>
        </div>
      </div>
    </div>
  );
}
