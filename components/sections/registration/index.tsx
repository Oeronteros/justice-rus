'use client';

import { useMemo, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useRegistrations } from '@/lib/hooks/useRegistrations';
import { RegistrationStats } from './RegistrationStats';
import { RegistrationFilters } from './RegistrationFilters';
import { RegistrationTable } from './RegistrationTable';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/types';

interface RegistrationSectionProps {
  user: User;
}

function RegistrationSectionContent({ user }: RegistrationSectionProps) {
  const { data: registrations = [], isLoading, error, refetch } = useRegistrations();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rankFilter, setRankFilter] = useState('all');

  const filteredRegistrations = useMemo(() => {
    let filtered = [...registrations];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (registration) =>
          registration.discord.toLowerCase().includes(searchLower) ||
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

    return filtered;
  }, [registrations, searchTerm, statusFilter, rankFilter]);

  if (isLoading) {
    return (
      <LoadingState
        title="Реестр Культа"
        subtitle="Призываем записи ордена..."
        icon={<WuxiaIcon name="registration" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="Реестр недоступен"
        description={error instanceof Error ? error.message : 'Не удалось загрузить реестр'}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-4 h-4 mr-2" />
            Повторить ритуал
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon name="registration" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            Реестр Культа
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Состав ордена, ранги и клятвы каждого, кто носит наш знак.
          </p>
        </div>

        <RegistrationStats registrations={registrations} />

        <div className="card p-6 mb-8">
          <RegistrationFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            rankFilter={rankFilter}
            onRankChange={setRankFilter}
          />

          <RegistrationTable registrations={filteredRegistrations} />
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
