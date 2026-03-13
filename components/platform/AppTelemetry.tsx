'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface AppTelemetryProps {
  enabled: boolean;
}

export default function AppTelemetry({ enabled }: AppTelemetryProps) {
  if (!enabled) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
