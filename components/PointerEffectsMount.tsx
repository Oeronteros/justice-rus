'use client';

import dynamic from 'next/dynamic';

const PointerEffectsClient = dynamic(() => import('./PointerEffectsClient'), {
  ssr: false,
});

export default function PointerEffectsMount() {
  return <PointerEffectsClient />;
}
