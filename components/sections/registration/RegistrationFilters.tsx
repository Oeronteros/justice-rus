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
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск по имени, Discord или классу..."
        className="input-field flex-1"
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="select-field"
      >
        <option value="all">Все статусы</option>
        <option value="active">Активен</option>
        <option value="inactive">Неактивен</option>
      </select>

      <select
        value={rankFilter}
        onChange={(e) => onRankChange(e.target.value)}
        className="select-field"
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
        className="select-field"
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
