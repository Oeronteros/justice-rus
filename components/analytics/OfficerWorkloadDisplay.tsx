'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { OfficerWorkload } from '@/lib/schemas/analytics';

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
      <div className="card section-card p-6">
        <div className="text-center text-gray-400 py-8">
          <WuxiaIcon name="profile" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Нет данных о нагрузке офицеров</p>
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.workloadScore - a.workloadScore);
  const averageScore = Math.round(data.reduce((sum, o) => sum + o.workloadScore, 0) / data.length);

  return (
    <div className="card section-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#bcd6e5]">Нагрузка офицеров</h3>
        <div className="text-xs text-gray-400">{data.length} офицеров</div>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {sortedData.map((officer) => {
          const level = getWorkloadLevel(officer.workloadScore);

          return (
            <div
              key={officer.officerId}
              className="rounded-xl border border-[#2a3c4c]/60 bg-[#101a23]/65 p-4 hover:border-[#2f6e8d]/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2d5a3f] to-[#1a3a2f] flex items-center justify-center text-xs font-bold text-[#e6eff5]">
                    {officer.officerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#e6eff5]">{officer.officerName}</div>
                    <div className="text-xs text-gray-400">{officer.role}</div>
                  </div>
                </div>

                <div className={`text-xs font-medium ${level.color}`}>
                  {level.label}
                </div>
              </div>

              {/* Workload Score Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">Нагрузка</span>
                  <span className="text-[#e6eff5] font-medium">{officer.workloadScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#1a2a3a]/80 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      officer.workloadScore >= 80 ? 'bg-gradient-to-r from-[#b96f6f] to-[#ff8888]' :
                      officer.workloadScore >= 60 ? 'bg-gradient-to-r from-[#b9a56f] to-[#ffd888]' :
                      'bg-gradient-to-r from-[#6fb98f] to-[#88ffbb]'
                    }`}
                    style={{ width: `${officer.workloadScore}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 rounded-lg bg-[#1a2a3a]/60">
                  <div className="text-gray-400 mb-0.5">Одобрено</div>
                  <div className="text-sm font-semibold text-[#e6eff5]">
                    {officer.metrics.approvalsProcessed}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#1a2a3a]/60">
                  <div className="text-gray-400 mb-0.5">Помощь</div>
                  <div className="text-sm font-semibold text-[#e6eff5]">
                    {officer.metrics.helpRequestsHandled}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#1a2a3a]/60">
                  <div className="text-gray-400 mb-0.5">Отсутствия</div>
                  <div className="text-sm font-semibold text-[#e6eff5]">
                    {officer.metrics.absencesReviewed}
                  </div>
                </div>
              </div>

              {/* Response Time */}
              {officer.metrics.averageResponseTime > 0 && (
                <div className="mt-3 pt-3 border-t border-[#2a3c4c]/60 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Среднее время ответа</span>
                  <span className="text-[#bcd6e5] font-medium">
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
      <div className="mt-4 pt-4 border-t border-[#2a3c4c]/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-gray-400 mb-1">Средняя нагрузка</div>
          <div className="text-lg font-semibold text-[#e6eff5]">{averageScore}%</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Максимальная</div>
          <div className="text-sm font-medium text-[#b96f6f]">
            {sortedData[0]?.officerName || '—'}
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Минимальная</div>
          <div className="text-sm font-medium text-[#6fb98f]">
            {sortedData[sortedData.length - 1]?.officerName || '—'}
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Перегружены</div>
          <div className="text-lg font-semibold text-[#b96f6f]">
            {data.filter(o => o.workloadScore >= 80).length}
          </div>
        </div>
      </div>
    </div>
  );
}
