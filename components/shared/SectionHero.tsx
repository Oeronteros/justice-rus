'use client';

import type { ReactNode } from 'react';
import { useTranslation } from '@/lib/i18n/context';

interface SectionHeroProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  chips?: string[];
  actions?: ReactNode;
}

export function SectionHero({
  icon,
  title,
  subtitle,
  eyebrow,
  chips,
  actions,
}: SectionHeroProps) {
  const { t } = useTranslation();
  const resolvedEyebrow = eyebrow ?? t.common.portalEyebrow;

  return (
    <div className="portal-hero mb-8">
      <div className="portal-hero-main">
        <div className="portal-hero-eyebrow">{resolvedEyebrow}</div>
        <h2 className="portal-hero-title">
          {icon ? <span className="portal-hero-icon">{icon}</span> : null}
          <span>{title}</span>
        </h2>
        {subtitle ? <p className="portal-hero-subtitle">{subtitle}</p> : null}
        {chips && chips.length > 0 ? (
          <div className="portal-hero-chips">
            {chips.map((chip) => (
              <span key={chip} className="portal-hero-chip">
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {actions ? <div className="portal-hero-actions">{actions}</div> : null}
    </div>
  );
}
