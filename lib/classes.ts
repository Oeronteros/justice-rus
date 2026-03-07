import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema } from '@/lib/auth/accounts';

export const fallbackKnownClasses = [
  'Warrior',
  'Tank',
  'Assassin',
  'Archer',
  'Mage',
  'Priest',
  'Support',
  'Bard',
] as const;

function normalizeClassValue(value: unknown): string | null {
  const normalized = String(value || '').trim();
  return normalized ? normalized : null;
}

async function getRegistrationClassColumns(): Promise<string[]> {
  const pool = getPool();
  const result = await pool.query(
    `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'registrations'
    `
  );

  const names = new Set(result.rows.map((row) => String(row.column_name).toLowerCase()));
  const columns: string[] = [];
  if (names.has('class_name')) columns.push('class_name');
  if (names.has('class')) columns.push('class');
  return columns;
}

export async function getKnownClasses(): Promise<string[]> {
  const values = new Set<string>(fallbackKnownClasses);
  if (!hasDatabaseUrl()) {
    return [...values].sort((a, b) => a.localeCompare(b, 'ru'));
  }

  const pool = getPool();
  await ensureAccountsSchema();
  const registrationColumns = await getRegistrationClassColumns();

  for (const column of registrationColumns) {
    const result = await pool.query(
      `SELECT DISTINCT ${column} AS class_name FROM registrations WHERE ${column} IS NOT NULL AND TRIM(${column}) <> ''`
    );
    for (const row of result.rows) {
      const normalized = normalizeClassValue(row.class_name);
      if (normalized) values.add(normalized);
    }
  }

  const portalResult = await pool.query(
    `SELECT DISTINCT class_name FROM portal_account WHERE class_name IS NOT NULL AND TRIM(class_name) <> ''`
  ).catch(() => ({ rows: [] as Array<{ class_name: string }> }));
  for (const row of portalResult.rows) {
    const normalized = normalizeClassValue(row.class_name);
    if (normalized) values.add(normalized);
  }

  return [...values].sort((a, b) => a.localeCompare(b, 'ru'));
}

export async function isKnownClassName(className: string): Promise<boolean> {
  const normalized = normalizeClassValue(className);
  if (!normalized) return false;
  const known = await getKnownClasses();
  return known.some((value) => value.toLowerCase() === normalized.toLowerCase());
}
