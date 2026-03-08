import { canAssignRoles, canManageAccounts, canModerateContent, canSeeNumericKpi, hasRoleAtLeast, roleOrder } from '@/lib/authz';
import type { UserRole } from '@/lib/schemas/auth';

export const roleLabels: Record<UserRole, string> = {
  guest: 'Гость',
  member: 'Член',
  officer: 'Офицер',
  head: 'Глава',
  sysadmin: 'Сис.Админ',
};

const roleSummaries: Record<UserRole, string> = {
  guest: 'Базовый доступ без административных действий.',
  member: 'Обычный участник гильдии без прав модерации и управления.',
  officer: 'Операционный уровень: управление учетками и рабочими разделами.',
  head: 'Руководящий уровень: все права офицера плюс роли и модерация.',
  sysadmin: 'Максимальный уровень в иерархии ролей (поверх head).',
};

function roleCapabilities(role: UserRole): string[] {
  const capabilities = ['Доступ к основным разделам портала и личному кабинету.'];

  if (hasRoleAtLeast(role, 'officer')) {
    capabilities.push('Может управлять правилами и менять статус help-запросов.');
  }

  if (canManageAccounts(role)) {
    capabilities.push('Может активировать/деактивировать учетные записи.');
  }

  if (canSeeNumericKpi(role)) {
    capabilities.push('Видит числовой KPI участников в реестре.');
  }

  if (canAssignRoles(role)) {
    capabilities.push('Может назначать роли пользователям.');
  }

  if (canModerateContent(role)) {
    capabilities.push('Может модерировать и удалять контент (гайды и запросы помощи).');
  }

  if (role === 'member') {
    capabilities.push('Видит неполный KPI (индикатор), но не числовые значения других участников.');
  }

  if (role === 'guest') {
    capabilities.push('Не получает офицерских/руководящих полномочий.');
  }

  return capabilities;
}

export const roleExplainerRows = roleOrder.map((role) => ({
  role,
  label: roleLabels[role],
  summary: roleSummaries[role],
  capabilities: roleCapabilities(role),
}));
