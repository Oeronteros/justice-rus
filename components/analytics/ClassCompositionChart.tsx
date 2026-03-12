'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import { ClassBadge } from '@/components/ClassIcon';
import type { ClassComposition } from '@/lib/schemas/analytics';

interface ClassCompositionChartProps {
  data: ClassComposition[];
}

export function ClassCompositionChart({ data }: ClassCompositionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card section-card p-6">
        <div className="text-center text-gray-400 py-8">
          <WuxiaIcon name="registration" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Нет данных о составе классов</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, c) => sum + c.count, 0);
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="card section-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#bcd6e5]">Распределение классов</h3>
        <div className="text-xs text-gray-400">{total} участников</div>
      </div>

      {/* Visual Bar */}
      <div className="h-4 rounded-full overflow-hidden flex mb-6 bg-[#101a23]/60">
        {sortedData.map((cls, idx) => {
          const percentage = (cls.count / total) * 100;
          const colors = [
            'bg-[#2d5a3f]',
            'bg-[#5a4a2d]',
            'bg-[#5a2d2d]',
            'bg-[#2d3a5a]',
            'bg-[#5a2d5a]',
            'bg-[#2d5a5a]',
          ];
          const color = colors[idx % colors.length];

          return (
            <div
              key={cls.className}
              className={`${color} transition-all`}
              style={{ width: `${percentage}%` }}
              title={`${cls.className}: ${cls.count} (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Class List */}
      <div className="space-y-3">
        {sortedData.map((cls) => {
          const percentage = (cls.count / total) * 100;

          return (
            <div
              key={cls.className}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#101a23]/65 border border-[#2a3c4c]/60 hover:border-[#2f6e8d]/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <ClassBadge className={cls.className} badgeClassName="w-8 h-8 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#e6eff5] truncate">{cls.className}</div>
                  <div className="text-xs text-gray-400">{cls.count} участников</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-24 h-2 rounded-full bg-[#1a2a3a]/80 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2d5a3f] to-[#6fb98f]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm font-semibold text-[#bcd6e5] w-12 text-right">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diversity Stats */}
      <div className="mt-4 pt-4 border-t border-[#2a3c4c]/60 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div>
          <div className="text-gray-400 mb-1">Уникальных классов</div>
          <div className="text-lg font-semibold text-[#e6eff5]">{data.length}</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Самый популярный</div>
          <div className="text-sm font-medium text-[#2d5a3f]">
            {sortedData[0]?.className || '—'}
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Самый редкий</div>
          <div className="text-sm font-medium text-[#5a2d2d]">
            {sortedData[sortedData.length - 1]?.className || '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
