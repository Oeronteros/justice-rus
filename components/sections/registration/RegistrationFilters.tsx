'use client';

interface RegistrationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  rankFilter: string;
  onRankChange: (value: string) => void;
}

export function RegistrationFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  rankFilter,
  onRankChange,
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
        <option value="pending">Ожидает</option>
        <option value="leave">Отгул</option>
      </select>

      <select
        value={rankFilter}
        onChange={(e) => onRankChange(e.target.value)}
        className="select-field"
      >
        <option value="all">Все ранги</option>
        <option value="novice">Новик</option>
        <option value="member">Брат</option>
        <option value="veteran">Ветеран</option>
        <option value="elite">Элита</option>
        <option value="legend">Легенда</option>
        <option value="gm">ГМ</option>
      </select>
    </div>
  );
}
