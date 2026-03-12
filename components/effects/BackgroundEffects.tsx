import type { CSSProperties } from 'react';

interface BackgroundEffectsProps {
  variant?: 'default' | 'auth';
}

const authSceneCards: Array<{
  className: string;
  frameClassName: string;
  symbolClassName: string;
}> = [
  {
    className: 'auth-scene-card auth-scene-card-left',
    frameClassName: 'auth-scene-frame auth-scene-frame-sigil',
    symbolClassName: 'auth-scene-symbol auth-scene-symbol-sigil',
  },
  {
    className: 'auth-scene-card auth-scene-card-right',
    frameClassName: 'auth-scene-frame auth-scene-frame-gate',
    symbolClassName: 'auth-scene-symbol auth-scene-symbol-gate',
  },
  {
    className: 'auth-scene-card auth-scene-card-bottom',
    frameClassName: 'auth-scene-frame auth-scene-frame-scroll',
    symbolClassName: 'auth-scene-symbol auth-scene-symbol-scroll',
  },
];

const authMeteors: Array<{
  top: string;
  left: string;
  width: number;
  delay: string;
  duration: string;
}> = [
  { top: '12%', left: '14%', width: 220, delay: '-1.5s', duration: '10s' },
  { top: '24%', left: '52%', width: 180, delay: '-5s', duration: '12s' },
  { top: '42%', left: '8%', width: 160, delay: '-8s', duration: '9s' },
  { top: '56%', left: '62%', width: 210, delay: '-3s', duration: '11s' },
  { top: '68%', left: '26%', width: 140, delay: '-6.5s', duration: '8.5s' },
];

export default function BackgroundEffects({ variant = 'default' }: BackgroundEffectsProps) {
  const moonClassName = `absolute top-[-140px] right-[12%] h-[300px] w-[300px] moonfall-crescent${variant === 'auth' ? ' moonfall-parallax-slow' : ''}`;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 wuxia-backdrop"></div>
      <div className="absolute inset-0 wuxia-aurora"></div>
      <div className="absolute inset-0 wuxia-cursor-glow"></div>
      <div className="absolute inset-0 wuxia-constellation"></div>
      {variant === 'auth' ? <div className="absolute inset-0 moonfall-starfield"></div> : null}
      {variant === 'auth' ? <div className="absolute inset-0 moonfall-fog-layer moonfall-fog-layer-far"></div> : null}
      {variant === 'auth' ? (
        <div className="auth-scene-gallery" aria-hidden="true">
          {authSceneCards.map((scene) => (
            <div key={scene.className} className={scene.className}>
              <div className={scene.frameClassName}></div>
              <div className={scene.symbolClassName}></div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="absolute inset-0 wuxia-noise"></div>
      <div className="absolute inset-0 wuxia-smoke"></div>
      <div className="absolute inset-0 wuxia-scroll-grid opacity-30"></div>
      {variant === 'auth' ? <div className="absolute inset-0 moonfall-fog-layer moonfall-fog-layer-near"></div> : null}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full wuxia-glow"></div>
      {variant === 'auth' ? <div className="absolute top-[7%] right-[8%] h-[360px] w-[360px] rounded-full moonfall-orbit moonfall-parallax-slow"></div> : null}
      <div className={moonClassName}></div>
      <div className="absolute inset-0 moonfall-fall"></div>
      {variant === 'auth'
        ? authMeteors.map((meteor, index) => {
            const style: CSSProperties = {
              top: meteor.top,
              left: meteor.left,
              width: `${meteor.width}px`,
              animationDelay: meteor.delay,
              animationDuration: meteor.duration,
            };

            return <div key={`${meteor.top}-${meteor.left}-${index}`} className="absolute moonfall-meteor" style={style}></div>;
          })
        : null}
      <div className={`absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full wuxia-moon${variant === 'auth' ? ' moonfall-parallax-mid' : ''}`}></div>
      <div className={`absolute top-[18%] left-[-120px] h-[360px] w-[360px] rounded-full wuxia-ink${variant === 'auth' ? ' moonfall-parallax-light' : ''}`}></div>
      {variant === 'auth' ? <div className="absolute bottom-[-12%] left-[8%] h-[320px] w-[520px] moonfall-horizon"></div> : null}
    </div>
  );
}
