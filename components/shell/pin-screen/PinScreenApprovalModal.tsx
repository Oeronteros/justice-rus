'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { Translations } from '@/lib/i18n';

interface PinScreenApprovalModalProps {
  message: string;
  t: Translations;
  onDismiss: () => void;
  onBackToLogin: () => void;
}

export function PinScreenApprovalModal({
  message,
  t,
  onDismiss,
  onBackToLogin,
}: PinScreenApprovalModalProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#071018]/82 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
      <div className="w-full max-w-md rounded-[30px] border border-[#3d7c9d]/40 bg-gradient-to-br from-[#122433] via-[#0d1924] to-[#0a1219] p-5 shadow-2xl shadow-[#041018]/60 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#5e9fbe]/35 bg-[#153245]/80 text-[#9fd3ea]">
            <WuxiaIcon name="checkCircle" className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-[0.28em] text-[#7db2ca]">{t.auth.registrationComplete}</div>
            <h4 className="mt-2 font-orbitron text-2xl font-bold text-[#edf7fd]">{t.auth.officerApprovalNeeded}</h4>
            <p className="mt-3 text-sm leading-6 text-[#c2d8e5]">{t.auth.accountCreatedPendingApproval}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#2b5368]/45 bg-[#10202c]/70 px-4 py-3 text-sm leading-6 text-[#d7e8f1]">
          {message}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn-primary flex-1 px-4 py-3 text-sm font-semibold" onClick={onDismiss}>
            {t.auth.gotIt}
          </button>
          <button type="button" className="btn-secondary flex-1 px-4 py-3 text-sm font-semibold" onClick={onBackToLogin}>
            {t.auth.backToLogin}
          </button>
        </div>
      </div>
    </div>
  );
}
