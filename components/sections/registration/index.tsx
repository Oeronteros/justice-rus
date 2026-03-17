'use client';

import { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  useRegistrationColumnLabels,
  useRegistrations,
  useUpdateRegistrationColumnLabels,
} from '@/lib/registration/hooks';
import { RegistrationStats } from './RegistrationStats';
import { RegistrationFilters } from './RegistrationFilters';
import { RegistrationTable } from './RegistrationTable';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/lib/schemas/auth';
import { SectionHero } from '@/components/shared/SectionHero';
import { sortRegistrations, type RegistrationSortOption } from './sortRegistrations';
import {
  defaultRegistrationColumnLabels,
  registrationColumnOrder,
  type RegistrationColumnKey,
  type RegistrationColumnLabels,
} from './columnLabels';
import { useTranslation } from '@/lib/i18n/context';
import { hasRoleAtLeast } from '@/lib/authz';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { registrationStyles } from './Registration.stylex';

interface RegistrationSectionProps {
  user: User;
}

function RegistrationSectionContent({ user }: RegistrationSectionProps) {
  const { t } = useTranslation();
  const { data: registrations = [], isLoading, error, refetch } = useRegistrations();
  const { data: sharedColumnLabels = defaultRegistrationColumnLabels } = useRegistrationColumnLabels();
  const updateColumnLabels = useUpdateRegistrationColumnLabels();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rankFilter, setRankFilter] = useState('all');
  const [sortBy, setSortBy] = useState<RegistrationSortOption>('nickname-asc');
  const [labelsOpen, setLabelsOpen] = useState(false);
  const [draftColumnLabels, setDraftColumnLabels] = useState<RegistrationColumnLabels>(defaultRegistrationColumnLabels);
  const canEditColumns = hasRoleAtLeast(user.role, 'officer');

  useEffect(() => {
    setDraftColumnLabels(sharedColumnLabels);
  }, [sharedColumnLabels]);

  const filteredRegistrations = useMemo(() => {
    let filtered = [...registrations];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (registration) =>
          (registration.discordHandle || registration.discord).toLowerCase().includes(searchLower) ||
          registration.nickname.toLowerCase().includes(searchLower) ||
          registration.class.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((registration) => registration.status === statusFilter);
    }

    if (rankFilter !== 'all') {
      filtered = filtered.filter(
        (registration) => registration.rank.toLowerCase() === rankFilter.toLowerCase()
      );
    }

    return sortRegistrations(filtered, sortBy);
  }, [registrations, searchTerm, statusFilter, rankFilter, sortBy]);

  if (isLoading) {
    return (
      <LoadingState
        title={t.registration.title}
        subtitle={t.registration.loading}
        icon={<WuxiaIcon name="registration" {...stylex.props(uiStyles.iconLg, uiStyles.iconDanger)} />}
        skeletonCount={3}
        layout="cards"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" {...stylex.props(uiStyles.iconXl, uiStyles.iconDanger)} />}
        title={t.registration.error}
        description={error instanceof Error ? error.message : t.errors.server}
        action={
          <button onClick={() => refetch()} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}>
            <WuxiaIcon name="redo" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
            {t.errors.tryAgain}
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <div {...stylex.props(uiStyles.stackLg)}>
          <SectionHero
            icon={<WuxiaIcon name="registration" {...stylex.props(uiStyles.iconMd)} />}
            title={t.registration.title}
            subtitle={t.registration.subtitle}
            chips={['Roster', 'Readiness', 'Roles']}
          />

          <RegistrationStats registrations={registrations} user={user} />

          <div {...stylex.props(registrationStyles.filterCard)}>
          <RegistrationFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            rankFilter={rankFilter}
            onRankChange={setRankFilter}
            sortBy={sortBy}
            onSortChange={(value) => setSortBy(value as RegistrationSortOption)}
          />

          {canEditColumns && (
            <div {...stylex.props(registrationStyles.renamePanel)}>
            <div {...stylex.props(registrationStyles.renameHeader)}>
              <div>
                <div {...stylex.props(registrationStyles.headingKicker)}>Названия столбцов</div>
                <div {...stylex.props(registrationStyles.mutedText)}>Офицеры и выше могут переименовать заголовки. Сохраненные названия видны всем участникам.</div>
              </div>
              <div {...stylex.props(registrationStyles.actionRow)}>
                <button type="button" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)} onClick={() => setLabelsOpen((value) => !value)}>
                  {labelsOpen ? 'Скрыть названия' : 'Переименовать столбцы'}
                </button>
                <button
                  type="button"
                  {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                  disabled={updateColumnLabels.isPending}
                  onClick={() => {
                    void updateColumnLabels.mutateAsync(defaultRegistrationColumnLabels);
                  }}
                >
                  Сбросить
                </button>
              </div>
            </div>

            {labelsOpen && (
              <div {...stylex.props(registrationStyles.renameGrid)}>
                {registrationColumnOrder.map((key) => (
                  <label key={key} {...stylex.props(registrationStyles.labelStack)}>
                    <span {...stylex.props(registrationStyles.fieldLabel)}>{defaultRegistrationColumnLabels[key]}</span>
                    <input
                      value={draftColumnLabels[key]}
                      onChange={(event) => {
                        const value = event.target.value;
                        setDraftColumnLabels((current) => ({
                          ...current,
                          [key]: value || defaultRegistrationColumnLabels[key as RegistrationColumnKey],
                        }));
                      }}
                      {...stylex.props(uiStyles.input)}
                    />
                  </label>
                ))}
                <div {...stylex.props(registrationStyles.renameActions)}>
                  <button
                    type="button"
                    {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                    disabled={updateColumnLabels.isPending}
                    onClick={() => {
                      void updateColumnLabels.mutateAsync(draftColumnLabels);
                    }}
                  >
                    {updateColumnLabels.isPending ? 'Сохраняем...' : 'Сохранить для всех'}
                  </button>
                  <button
                    type="button"
                    {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                    disabled={updateColumnLabels.isPending}
                    onClick={() => setDraftColumnLabels(sharedColumnLabels)}
                  >
                    Отменить
                  </button>
                </div>
              </div>
            )}
          </div>
          )}

          <RegistrationTable registrations={filteredRegistrations} user={user} onRefresh={refetch} columnLabels={sharedColumnLabels} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RegistrationSection({ user }: RegistrationSectionProps) {
  return (
    <ErrorBoundary>
      <RegistrationSectionContent user={user} />
    </ErrorBoundary>
  );
}

export { RegistrationStats } from './RegistrationStats';
export { RegistrationFilters } from './RegistrationFilters';
export { RegistrationTable } from './RegistrationTable';
