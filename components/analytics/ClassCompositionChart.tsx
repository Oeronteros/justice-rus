'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import { ClassBadge } from '@/components/ClassIcon';
import type { ClassComposition } from '@/lib/schemas/analytics';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { analyticsStyles } from './Analytics.stylex';

interface ClassCompositionChartProps {
  data: ClassComposition[];
}

const distributionColors = [
  '#2d5a3f',
  '#5a4a2d',
  '#5a2d2d',
  '#2d3a5a',
  '#5a2d5a',
  '#2d5a5a',
];

export function ClassCompositionChart({ data }: ClassCompositionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
        <div {...stylex.props(analyticsStyles.empty)}>
          <WuxiaIcon name="registration" {...stylex.props(analyticsStyles.iconLg)} />
          <p {...stylex.props(analyticsStyles.emptyText)}>Нет данных о составе классов</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, c) => sum + c.count, 0);
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, analyticsStyles.card)}>
      <div {...stylex.props(analyticsStyles.header)}>
        <h3 {...stylex.props(analyticsStyles.title)}>Распределение классов</h3>
        <div {...stylex.props(analyticsStyles.meta)}>{total} участников</div>
      </div>

      <div {...stylex.props(analyticsStyles.distributionBar)}>
        {sortedData.map((cls, idx) => {
          const percentage = (cls.count / total) * 100;

          return (
            <div
              key={cls.className}
              {...stylex.props(analyticsStyles.distributionSegment)}
              style={{ width: `${percentage}%`, backgroundColor: distributionColors[idx % distributionColors.length] }}
              title={`${cls.className}: ${cls.count} (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      <div {...stylex.props(analyticsStyles.classList)}>
        {sortedData.map((cls) => {
          const percentage = (cls.count / total) * 100;

          return (
            <div key={cls.className} {...stylex.props(analyticsStyles.classRow)}>
              <div {...stylex.props(analyticsStyles.classRowMain)}>
                <ClassBadge className={cls.className} badgeClassName="w-8 h-8 shrink-0" />
                <div {...stylex.props(analyticsStyles.classInfo)}>
                  <div {...stylex.props(analyticsStyles.personName)}>{cls.className}</div>
                  <div {...stylex.props(analyticsStyles.meta)}>{cls.count} участников</div>
                </div>
              </div>

              <div {...stylex.props(analyticsStyles.classStats)}>
                <div {...stylex.props(analyticsStyles.percentTrack)}>
                  <div {...stylex.props(analyticsStyles.percentFill)} style={{ width: `${percentage}%` }} />
                </div>
                <div {...stylex.props(analyticsStyles.personName, analyticsStyles.percentValue)}>{percentage.toFixed(1)}%</div>
              </div>
            </div>
          );
        })}
      </div>

      <div {...stylex.props(analyticsStyles.summaryGrid3)}>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Уникальных классов</div>
          <div {...stylex.props(analyticsStyles.summaryValue)}>{data.length}</div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Самый популярный</div>
          <div {...stylex.props(analyticsStyles.summaryValue, analyticsStyles.summaryValueGood)}>{sortedData[0]?.className || '—'}</div>
        </div>
        <div>
          <div {...stylex.props(analyticsStyles.summaryLabel)}>Самый редкий</div>
          <div {...stylex.props(analyticsStyles.summaryValue, analyticsStyles.summaryValueBad)}>{sortedData[sortedData.length - 1]?.className || '—'}</div>
        </div>
      </div>
    </div>
  );
}
