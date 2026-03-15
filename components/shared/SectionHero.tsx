'use client';

import type { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from '@/lib/i18n/context';
import { sectionHeroStyles } from '@/components/shared/SectionHero.stylex';

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
    <div {...stylex.props(sectionHeroStyles.root)}>
      <div {...stylex.props(sectionHeroStyles.main)}>
        <div {...stylex.props(sectionHeroStyles.eyebrow)}>{resolvedEyebrow}</div>
        <h2 {...stylex.props(sectionHeroStyles.title)}>
          {icon ? <span {...stylex.props(sectionHeroStyles.icon)}>{icon}</span> : null}
          <span>{title}</span>
        </h2>
        {subtitle ? <p {...stylex.props(sectionHeroStyles.subtitle)}>{subtitle}</p> : null}
        {chips && chips.length > 0 ? (
          <div {...stylex.props(sectionHeroStyles.chips)}>
            {chips.map((chip) => (
              <span key={chip} {...stylex.props(sectionHeroStyles.chip)}>
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {actions ? <div {...stylex.props(sectionHeroStyles.actions)}>{actions}</div> : null}
    </div>
  );
}
