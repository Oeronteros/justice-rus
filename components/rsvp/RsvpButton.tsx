'use client';

import { useState } from 'react';
import { useUpsertRsvp } from '@/lib/rsvp/hooks';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import type { RsvpStatus } from '@/lib/schemas/rsvp';
import type { User } from '@/lib/schemas/auth';

interface RsvpButtonProps {
  scheduleId: string;
  currentStatus: RsvpStatus | null;
  user: User;
  onRsvpChange?: () => void;
}

const statusConfig: Record<RsvpStatus, { label: string; icon: IconName; className: string }> = {
  going: {
    label: 'Иду',
    icon: 'checkCircle',
    className: 'bg-[#2d5a3f]/90 hover:bg-[#2d5a3f] text-[#e6f5ef]',
  },
  not_going: {
    label: 'Не иду',
    icon: 'xCircle',
    className: 'bg-[#5a2d2d]/90 hover:bg-[#5a2d2d] text-[#f5e6e6]',
  },
  maybe: {
    label: 'Возможно',
    icon: 'questionCircle',
    className: 'bg-[#5a4a2d]/90 hover:bg-[#5a4a2d] text-[#f5f0e6]',
  },
  pending: {
    label: 'Нет ответа',
    icon: 'clock',
    className: 'bg-[#2d3a5a]/90 hover:bg-[#2d3a5a] text-[#e6eff5]',
  },
};

export function RsvpButton({ scheduleId, currentStatus, user, onRsvpChange }: RsvpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const upsertRsvp = useUpsertRsvp();

  const handleRsvp = async (status: RsvpStatus) => {
    try {
      await upsertRsvp.mutateAsync({
        scheduleId,
        status,
      });
      setIsOpen(false);
      onRsvpChange?.();
    } catch (error) {
      console.error('Failed to update RSVP:', error);
    }
  };

  const currentConfig = currentStatus ? statusConfig[currentStatus] : statusConfig.pending;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${currentConfig.className}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <WuxiaIcon name={currentConfig.icon} className="w-3.5 h-3.5" />
        <span>{currentConfig.label}</span>
        <WuxiaIcon name="dots" className="w-3 h-3 opacity-70" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div 
            className="absolute right-0 mt-1 w-40 rounded-xl border border-[#2a3c4c]/60 bg-[#101a23]/95 backdrop-blur-sm shadow-xl z-50 overflow-hidden"
            role="menu"
          >
            {(Object.keys(statusConfig) as RsvpStatus[]).map((status) => {
              const config = statusConfig[status];
              const isSelected = currentStatus === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleRsvp(status)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-[#1a2a3a]/80 ${
                    isSelected ? 'bg-[#1a2a3a]/60 text-[#bcd6e5]' : 'text-[#9ec5d8]'
                  }`}
                  role="menuitem"
                >
                  <WuxiaIcon name={config.icon} className="w-3.5 h-3.5" />
                  <span>{config.label}</span>
                  {isSelected && (
                    <WuxiaIcon name="check" className="w-3 h-3 ml-auto opacity-70" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
