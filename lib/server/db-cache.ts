import { getPool } from '@/lib/neon';

const resolvedValues = new Map<string, unknown>();
const pendingValues = new Map<string, Promise<unknown>>();
const expiringValues = new Map<string, { expiresAt: number; value: unknown }>();

async function getOrCreate<T>(key: string, factory: () => Promise<T>): Promise<T> {
  if (resolvedValues.has(key)) {
    return resolvedValues.get(key) as T;
  }

  const pending = pendingValues.get(key);
  if (pending) {
    return pending as Promise<T>;
  }

  const next = factory()
    .then((value) => {
      resolvedValues.set(key, value);
      pendingValues.delete(key);
      return value;
    })
    .catch((error) => {
      pendingValues.delete(key);
      throw error;
    });

  pendingValues.set(key, next);
  return next;
}

export async function runServerTaskOnce(key: string, task: () => Promise<void>): Promise<void> {
  await getOrCreate(`task:${key}`, task);
}

export async function runCoalescedTask<T>(key: string, task: () => Promise<T>): Promise<T> {
  const pendingKey = `coalesced:${key}`;
  const pending = pendingValues.get(pendingKey);
  if (pending) {
    return pending as Promise<T>;
  }

  const next = task()
    .then((value) => {
      pendingValues.delete(pendingKey);
      return value;
    })
    .catch((error) => {
      pendingValues.delete(pendingKey);
      throw error;
    });

  pendingValues.set(pendingKey, next);
  return next;
}

export async function getCachedTableColumns(tableName: string): Promise<Set<string>> {
  const columns = await getOrCreate(`columns:${tableName}`, async () => {
    const pool = getPool();
    const result = await pool.query(
      `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      `,
      [tableName]
    );

    return new Set(result.rows.map((row) => String(row.column_name).toLowerCase()));
  });

  return new Set(columns as Set<string>);
}

export async function getPreferredTableName(
  preferredTable: string,
  fallbackTables: readonly string[] = []
): Promise<string> {
  const candidates = [preferredTable, ...fallbackTables];

  return getOrCreate(`table:${candidates.join('|')}`, async () => {
    const pool = getPool();
    const result = await pool.query(
      `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = ANY($1::text[])
      ORDER BY CASE WHEN table_name = $2 THEN 0 ELSE 1 END, table_name ASC
      LIMIT 1
      `,
      [candidates, preferredTable]
    );

    return String(result.rows[0]?.table_name || preferredTable);
  });
}

export async function getExpiringValue<T>(key: string, ttlMs: number, factory: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cached = expiringValues.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.value as T;
  }

  const pendingKey = `expiring:${key}`;
  const pending = pendingValues.get(pendingKey);
  if (pending) {
    return pending as Promise<T>;
  }

  const next = factory()
    .then((value) => {
      expiringValues.set(key, { value, expiresAt: Date.now() + ttlMs });
      pendingValues.delete(pendingKey);
      return value;
    })
    .catch((error) => {
      pendingValues.delete(pendingKey);
      throw error;
    });

  pendingValues.set(pendingKey, next);
  return next;
}
