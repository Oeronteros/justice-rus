import { getPool } from '@/lib/neon';

type AvatarSeed = {
  nickname: string;
  discordId: string | null;
  discordHandle: string | null;
};

type AvatarRow = {
  nickname_key: string;
  avatar_url: string | null;
};

function normalizeNicknameKey(nickname: string): string {
  return nickname.trim().toLowerCase();
}

function cleanValue(value: string | null | undefined): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function isPortalIdentity(value: string | null | undefined): boolean {
  return Boolean(value && value.trim().toLowerCase().startsWith('portal:'));
}

export async function ensurePortalMemberAvatarSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portal_member_avatar (
      id SERIAL PRIMARY KEY,
      nickname TEXT NOT NULL,
      nickname_key TEXT NOT NULL UNIQUE,
      discord_id TEXT NULL,
      discord_handle TEXT NULL,
      avatar_url TEXT NULL,
      source TEXT NULL,
      requested_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS nickname TEXT NOT NULL DEFAULT '';`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS nickname_key TEXT;`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS discord_id TEXT NULL;`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS discord_handle TEXT NULL;`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS avatar_url TEXT NULL;`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS source TEXT NULL;`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP NOT NULL DEFAULT NOW();`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_member_avatar ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`).catch(() => undefined);
  await pool.query(`UPDATE portal_member_avatar SET nickname_key = LOWER(TRIM(nickname)) WHERE nickname_key IS NULL OR nickname_key = '';`).catch(() => undefined);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS portal_member_avatar_nickname_key_uq ON portal_member_avatar (nickname_key);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS portal_member_avatar_discord_id_idx ON portal_member_avatar (discord_id);`);
}

export async function syncPortalMemberAvatarSeeds(seeds: AvatarSeed[]): Promise<Map<string, string | null>> {
  const normalizedSeeds = seeds
    .map((seed) => ({
      nickname: seed.nickname.trim(),
      nicknameKey: normalizeNicknameKey(seed.nickname),
      discordId: isPortalIdentity(seed.discordId) ? null : cleanValue(seed.discordId),
      discordHandle: cleanValue(seed.discordHandle),
    }))
    .filter((seed) => seed.nickname && seed.nicknameKey);

  if (normalizedSeeds.length === 0) {
    return new Map();
  }

  await ensurePortalMemberAvatarSchema();
  const pool = getPool();

  const deduped = new Map<string, (typeof normalizedSeeds)[number]>();
  for (const seed of normalizedSeeds) {
    const existing = deduped.get(seed.nicknameKey);
    if (!existing) {
      deduped.set(seed.nicknameKey, seed);
      continue;
    }

    deduped.set(seed.nicknameKey, {
      ...existing,
      nickname: seed.nickname || existing.nickname,
      discordId: seed.discordId || existing.discordId,
      discordHandle: seed.discordHandle || existing.discordHandle,
    });
  }

  const rows = [...deduped.values()];
  const values: unknown[] = [];
  const tuples = rows.map((row, index) => {
    const base = index * 4;
    values.push(row.nickname, row.nicknameKey, row.discordId, row.discordHandle);
    return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`;
  });

  const result = await pool.query<AvatarRow>(
    `
      INSERT INTO portal_member_avatar (nickname, nickname_key, discord_id, discord_handle)
      VALUES ${tuples.join(', ')}
      ON CONFLICT (nickname_key) DO UPDATE
      SET nickname = EXCLUDED.nickname,
          discord_id = COALESCE(EXCLUDED.discord_id, portal_member_avatar.discord_id),
          discord_handle = COALESCE(EXCLUDED.discord_handle, portal_member_avatar.discord_handle),
          updated_at = CASE
            WHEN portal_member_avatar.nickname IS DISTINCT FROM EXCLUDED.nickname
              OR (EXCLUDED.discord_id IS NOT NULL AND portal_member_avatar.discord_id IS DISTINCT FROM EXCLUDED.discord_id)
              OR (EXCLUDED.discord_handle IS NOT NULL AND portal_member_avatar.discord_handle IS DISTINCT FROM EXCLUDED.discord_handle)
            THEN NOW()
            ELSE portal_member_avatar.updated_at
          END
      RETURNING nickname_key, avatar_url
    `,
    values
  );

  return new Map(result.rows.map((row) => [row.nickname_key, row.avatar_url]));
}

export function getRegistrationAvatarUrl(
  nickname: string,
  avatars: Map<string, string | null>
): string | null {
  return avatars.get(normalizeNicknameKey(nickname)) || null;
}
