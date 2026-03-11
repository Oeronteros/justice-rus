'use client';

interface RegistrationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  rankFilter: string;
  onRankChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function RegistrationFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  rankFilter,
  onRankChange,
  sortBy,
  onSortChange,
}: RegistrationFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,0.72fr))] lg:items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск по имени, Discord или классу..."
        className="input-field w-full"
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="select-field w-full"
      >
        <option value="all">Все статусы</option>
        <option value="active">Активен</option>
        <option value="inactive">Неактивен</option>
      </select>

      <select
        value={rankFilter}
        onChange={(e) => onRankChange(e.target.value)}
        className="select-field w-full"
      >
        <option value="all">Все ранги</option>
        <option value="guest">Гость</option>
        <option value="member">Брат</option>
        <option value="officer">Офицер</option>
        <option value="head">Глава</option>
        <option value="sysadmin">Сис.Админ</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="select-field w-full"
        aria-label="Сортировка участников"
      >
        <option value="nickname-asc">Имя: А-Я</option>
        <option value="nickname-desc">Имя: Я-А</option>
        <option value="rank-desc">По рангу</option>
        <option value="kpi-desc">По KPI</option>
        <option value="status-asc">По статусу</option>
      </select>
    </div>
  );
}
