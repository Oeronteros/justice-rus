'use client';

import { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useRegistrations } from '@/lib/registration/hooks';
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

interface RegistrationSectionProps {
  user: User;
}

function readStoredColumnLabels(): RegistrationColumnLabels {
  if (typeof window === 'undefined') {
    return defaultRegistrationColumnLabels;
  }

  const saved = window.localStorage.getItem('registration-column-labels');
  if (!saved) {
    return defaultRegistrationColumnLabels;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<RegistrationColumnLabels>;
    return { ...defaultRegistrationColumnLabels, ...parsed };
  } catch {
    return defaultRegistrationColumnLabels;
  }
}

function RegistrationSectionContent({ user }: RegistrationSectionProps) {
  const { t } = useTranslation();
  const { data: registrations = [], isLoading, error, refetch } = useRegistrations();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rankFilter, setRankFilter] = useState('all');
  const [sortBy, setSortBy] = useState<RegistrationSortOption>('nickname-asc');
  const [labelsOpen, setLabelsOpen] = useState(false);
  const [columnLabels, setColumnLabels] = useState<RegistrationColumnLabels>(readStoredColumnLabels);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('registration-column-labels', JSON.stringify(columnLabels));
  }, [columnLabels]);

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
        icon={<WuxiaIcon name="registration" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title={t.registration.error}
        description={error instanceof Error ? error.message : t.errors.server}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-4 h-4 mr-2" />
            {t.errors.tryAgain}
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionHero
            icon={<WuxiaIcon name="registration" className="w-5 h-5" />}
            title={t.registration.title}
            subtitle={t.registration.subtitle}
            chips={['Roster', 'Readiness', 'Roles']}
          />
        </div>

        <RegistrationStats registrations={registrations} user={user} />

        <div className="card p-6 mb-8">
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

          <div className="mb-6 rounded-2xl border border-[#2a3c4c]/60 bg-[#101a23]/60 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm uppercase tracking-widest text-[#9ec5d8] mb-1">Названия столбцов</div>
                <div className="text-sm text-gray-400">Можно переименовать заголовки под ваши текущие термины. Сохраняется локально в браузере.</div>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={() => setLabelsOpen((value) => !value)}>
                  {labelsOpen ? 'Скрыть названия' : 'Переименовать столбцы'}
                </button>
                <button
                  type="button"
                  className="btn-secondary px-4 py-2 text-sm"
                  onClick={() => setColumnLabels(defaultRegistrationColumnLabels)}
                >
                  Сбросить
                </button>
              </div>
            </div>

            {labelsOpen && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {registrationColumnOrder.map((key) => (
                  <label key={key} className="space-y-2 text-sm">
                    <span className="text-gray-400">{defaultRegistrationColumnLabels[key]}</span>
                    <input
                      value={columnLabels[key]}
                      onChange={(event) => {
                        const value = event.target.value;
                        setColumnLabels((current) => ({
                          ...current,
                          [key]: value || defaultRegistrationColumnLabels[key as RegistrationColumnKey],
                        }));
                      }}
                      className="input-field w-full"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          <RegistrationTable registrations={filteredRegistrations} user={user} onRefresh={refetch} columnLabels={columnLabels} />
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
