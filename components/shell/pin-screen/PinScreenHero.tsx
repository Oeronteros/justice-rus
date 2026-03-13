'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { Translations } from '@/lib/i18n';

interface PinScreenHeroProps {
  t: Translations;
}

export function PinScreenHero({ t }: PinScreenHeroProps) {
  return (
    <div className="auth-shell__aside relative mx-auto w-full max-w-[34rem] border-b border-[rgba(143,185,204,0.14)] bg-[linear-gradient(160deg,rgba(11,20,28,0.62),rgba(7,12,18,0.82))] p-6 lg:mx-0 lg:max-w-none lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
      <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.28)] bg-[rgba(9,18,26,0.62)] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[rgba(191,220,234,0.88)] sm:text-xs sm:tracking-[0.32em]">
        {t.common.portalEyebrow}
      </div>

      <div className="mt-6 flex justify-start">
        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-[rgba(190,223,237,0.18)] bg-[linear-gradient(145deg,rgba(66,136,170,0.92),rgba(151,206,231,0.78))] shadow-[0_18px_32px_rgba(5,12,18,0.45)] sm:h-[4.5rem] sm:w-[4.5rem]">
          <WuxiaIcon name="shield" className="h-8 w-8 text-white sm:h-9 sm:w-9" />
        </div>
      </div>

      <h2 className="mb-3 mt-5 max-w-[12ch] font-orbitron text-[2.15rem] font-bold leading-[0.96] text-[#eef7fd] sm:text-[2.8rem]">
        {t.auth.memberAccess}
      </h2>
      <p className="max-w-[34rem] text-sm leading-7 text-[rgba(191,209,220,0.92)] sm:text-base">{t.auth.accessIntro}</p>

      <div className="mt-6 grid gap-3 text-xs text-[rgba(205,225,236,0.95)] sm:text-sm">
        <div className="inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
          {t.auth.benefitAccounts}
        </div>
        <div className="inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
          {t.auth.benefitSecurity}
        </div>
        <div className="inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
          {t.auth.benefitPin}
        </div>
      </div>
    </div>
  );
}
