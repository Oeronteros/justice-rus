'use client';

import { memo } from 'react';

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 wuxia-backdrop"></div>
      <div className="absolute inset-0 wuxia-aurora"></div>
      <div className="absolute inset-0 wuxia-cursor-glow"></div>
      <div className="absolute inset-0 wuxia-constellation"></div>
      <div className="absolute inset-0 wuxia-noise"></div>
      <div className="absolute inset-0 wuxia-smoke"></div>
      <div className="absolute inset-0 wuxia-scroll-grid opacity-30"></div>
      <div className="absolute inset-0 wuxia-snow"></div>
      <div className="absolute inset-0 wuxia-sparkles"></div>
      <div className="absolute inset-0 wuxia-frost"></div>
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full wuxia-glow"></div>
      <div className="absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full wuxia-moon"></div>
      <div className="absolute top-[18%] left-[-120px] h-[360px] w-[360px] rounded-full wuxia-ink"></div>
    </div>
  );
}

export default memo(BackgroundEffects);
