'use client';

import dynamic from 'next/dynamic';

const BackgroundEffects = dynamic(() => import('./BackgroundEffects'), {
  ssr: false,
});

const PointerEffectsClient = dynamic(() => import('./PointerEffectsClient'), {
  ssr: false,
});

export default function PortalVisualEffects() {
  return (
    <>
      <BackgroundEffects />
      <PointerEffectsClient />
    </>
  );
}
