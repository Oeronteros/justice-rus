'use client';

import { useRsvpSummary } from './hooks';
import WuxiaIcon from '@/components/WuxiaIcons';

interface RsvpSummaryProps {
  scheduleId: string;
  compact?: boolean;
}

export function RsvpSummaryDisplay({ scheduleId, compact = false }: RsvpSummaryProps) {
  const { data: summary, isLoading } = useRsvpSummary(scheduleId);

  if (isLoading || !summary) {
    return (
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <WuxiaIcon name="clock" className="w-3 h-3 animate-pulse" />
        <span>Загрузка...</span>
      </div>
    );
  }

  const { going, notGoing, maybe, pending, total } = summary;

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[#2d5a3f] font-medium">+{going}</span>
        {maybe > 0 && (
          <span className="text-[#5a4a2d] font-medium">~{maybe}</span>
        )}
        {notGoing > 0 && (
          <span className="text-[#5a2d2d] font-medium">-{notGoing}</span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">Ответы участников</span>
        <span className="text-[#bcd6e5] font-medium">{total} всего</span>
      </div>

      <div className="space-y-1.5">
        {going > 0 && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#2d5a3f]" />
              <span className="text-[#9ec5d8]">Идут</span>
            </div>
            <span className="text-[#e6eff5] font-medium">{going}</span>
          </div>
        )}

        {maybe > 0 && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#5a4a2d]" />
              <span className="text-[#9ec5d8]">Возможно</span>
            </div>
            <span className="text-[#e6eff5] font-medium">{maybe}</span>
          </div>
        )}

        {notGoing > 0 && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#5a2d2d]" />
              <span className="text-[#9ec5d8]">Не идут</span>
            </div>
            <span className="text-[#e6eff5] font-medium">{notGoing}</span>
          </div>
        )}

        {pending > 0 && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#2d3a5a]" />
              <span className="text-[#9ec5d8]">Нет ответа</span>
            </div>
            <span className="text-[#e6eff5] font-medium">{pending}</span>
          </div>
        )}
      </div>
    </div>
  );
}
