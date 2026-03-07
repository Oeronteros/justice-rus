import { NextRequest, NextResponse } from 'next/server';
import type { PoolClient } from 'pg';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { pvpReportSchema } from '@/lib/schemas/pvp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Actor = {
  id: string;
  nickname: string;
  className: string;
};

type MatchRow = {
  id: number;
  player_one_id: string;
  player_one_nickname: string;
  player_one_class: string;
  player_two_id: string;
  player_two_nickname: string;
  player_two_class: string;
  status: 'pending' | 'completed';
  winner_id: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  confirmed_at: Date | string | null;
};

function normalizedMatchSelect(whereClause?: string, orderClause?: string, limitClause?: string) {
  return `
    SELECT
      id,
      COALESCE(player_one_id, player1_id) AS player_one_id,
      COALESCE(player_one_nickname, player1_id) AS player_one_nickname,
      player_one_class,
      COALESCE(player_two_id, player2_id) AS player_two_id,
      COALESCE(player_two_nickname, player2_id) AS player_two_nickname,
      player_two_class,
      status,
      winner_id,
      created_at,
      updated_at,
      COALESCE(confirmed_at, completed_at) AS confirmed_at
    FROM duel_matches
    ${whereClause || ''}
    ${orderClause || ''}
    ${limitClause || ''}
  `;
}

function actorIdFromUser(user: ReturnType<typeof verifyToken>): string | null {
  if (!user) return null;
  return user.discordId || user.id || user.nickname || null;
}

function toIso(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : new Date().toISOString();
}

function calculateRating(current: number, opponent: number, score: 0 | 1): number {
  const expected = 1 / (1 + Math.pow(10, (opponent - current) / 400));
  return Math.round(current + 32 * (score - expected));
}

async function ensurePvpSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS duel_queue (
      id SERIAL PRIMARY KEY,
      player_id TEXT NOT NULL UNIQUE,
      nickname TEXT NOT NULL,
      class_name TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS player_id TEXT;`);
  await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
  await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS nickname TEXT;`);
  await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS class_name TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS queued_at TIMESTAMP NULL;`);
  await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_queue_player_id_idx ON duel_queue(player_id);`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_queue_discord_id_idx ON duel_queue(discord_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS duel_queue_created_at_idx ON duel_queue(created_at ASC);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS duel_matches (
      id SERIAL PRIMARY KEY,
      player_one_id TEXT NOT NULL,
      player_one_nickname TEXT NOT NULL,
      player_one_class TEXT NOT NULL DEFAULT '',
      player_two_id TEXT NOT NULL,
      player_two_nickname TEXT NOT NULL,
      player_two_class TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      winner_id TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      confirmed_at TIMESTAMP
    );
  `);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_one_id TEXT;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player1_id TEXT;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_one_nickname TEXT;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_one_class TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_two_id TEXT;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player2_id TEXT;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_two_nickname TEXT;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_two_class TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS winner_id TEXT;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;`);
  await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;`);
  await pool.query(`CREATE INDEX IF NOT EXISTS duel_matches_status_idx ON duel_matches(status);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS duel_matches_player_one_idx ON duel_matches(player_one_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS duel_matches_player_two_idx ON duel_matches(player_two_id);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS duel_confirmations (
      id SERIAL PRIMARY KEY,
      match_id INTEGER NOT NULL REFERENCES duel_matches(id) ON DELETE CASCADE,
      player_id TEXT NOT NULL,
      reported_winner_id TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS match_id INTEGER;`);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS confirmed_winner_id TEXT;`);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;`);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS player_id TEXT;`);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS reported_winner_id TEXT;`);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();`);
  await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_confirmations_match_player_idx ON duel_confirmations(match_id, player_id);`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_confirmations_match_discord_idx ON duel_confirmations(match_id, discord_id);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS duel_ratings (
      id SERIAL PRIMARY KEY,
      discord_id TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL DEFAULT '',
      rating INTEGER NOT NULL DEFAULT 1000,
      wins INTEGER NOT NULL DEFAULT 0,
      losses INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
  await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS username TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS rating INTEGER NOT NULL DEFAULT 1000;`);
  await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS wins INTEGER NOT NULL DEFAULT 0;`);
  await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS losses INTEGER NOT NULL DEFAULT 0;`);
  await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_ratings_discord_id_idx ON duel_ratings(discord_id);`);
}

async function resolveActor(user: NonNullable<ReturnType<typeof verifyToken>>): Promise<Actor> {
  const actorId = actorIdFromUser(user);
  if (!actorId) {
    throw new Error('Player identity is unavailable');
  }

  const pool = getPool();
  let className = '';

  const registrationColumns = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'registrations'`
  );
  const names = new Set(registrationColumns.rows.map((row) => String(row.column_name).toLowerCase()));
  const nickCol = names.has('nick') ? 'nick' : names.has('nickname') ? 'nickname' : null;
  const classCol = names.has('class_name') ? 'class_name' : names.has('class') ? 'class' : null;

  if (nickCol && classCol && user.nickname) {
    const registration = await pool.query(
      `SELECT ${classCol} AS class_name FROM registrations WHERE LOWER(${nickCol}) = LOWER($1) LIMIT 1`,
      [user.nickname]
    );
    className = String(registration.rows[0]?.class_name || '');
  }

  return {
    id: actorId,
    nickname: user.nickname || user.discordId || user.id || 'Unknown duelist',
    className,
  };
}

async function ensureRatingRow(client: PoolClient, actor: Actor) {
  await client.query(
    `
    INSERT INTO duel_ratings (discord_id, username, rating, wins, losses, updated_at)
    VALUES ($1, $2, 1000, 0, 0, NOW())
    ON CONFLICT (discord_id) DO UPDATE
    SET username = EXCLUDED.username,
        updated_at = NOW()
    `,
    [actor.id, actor.nickname]
  );
}

async function formatMatch(pool: Awaited<ReturnType<typeof getPool>>, row: MatchRow, viewerId: string | null) {
  const confirmations = await pool.query(
    `
    SELECT
      COALESCE(player_id, discord_id) AS player_id,
      COALESCE(reported_winner_id, confirmed_winner_id) AS reported_winner_id
    FROM duel_confirmations
    WHERE match_id = $1
    `,
    [row.id]
  );

  const reports = new Map<string, string>();
  for (const confirmation of confirmations.rows) {
    reports.set(String(confirmation.player_id), String(confirmation.reported_winner_id));
  }

  let yourReport: 'win' | 'loss' | null = null;
  let opponentReport: 'win' | 'loss' | null = null;
  if (viewerId) {
    const ownWinner = reports.get(viewerId);
    if (ownWinner) {
      yourReport = ownWinner === viewerId ? 'win' : 'loss';
    }
    const opponentId = viewerId === row.player_one_id ? row.player_two_id : viewerId === row.player_two_id ? row.player_one_id : null;
    if (opponentId) {
      const opponentWinner = reports.get(opponentId);
      if (opponentWinner) {
        opponentReport = opponentWinner === viewerId ? 'loss' : 'win';
      }
    }
  }

  const uniqueWinners = new Set(confirmations.rows.map((item) => String(item.reported_winner_id)));
  const confirmationStatus =
    row.status === 'completed'
      ? 'confirmed'
      : confirmations.rows.length === 0
        ? 'unreported'
        : uniqueWinners.size > 1
          ? 'disputed'
          : 'waiting';

  return {
    id: String(row.id),
    status: row.status,
    createdAt: toIso(row.created_at) || new Date().toISOString(),
    updatedAt: toIso(row.updated_at) || new Date().toISOString(),
    confirmedAt: toIso(row.confirmed_at),
    winnerId: row.winner_id || null,
    playerOne: {
      id: row.player_one_id,
      nickname: row.player_one_nickname,
      className: row.player_one_class || '',
    },
    playerTwo: {
      id: row.player_two_id,
      nickname: row.player_two_nickname,
      className: row.player_two_class || '',
    },
    yourReport,
    opponentReport,
    confirmationStatus,
  };
}

async function loadState(viewerId: string | null) {
  const pool = getPool();

  const [queueResult, leaderboardResult, recentResult, activeResult] = await Promise.all([
    pool.query(`SELECT COALESCE(player_id, discord_id) AS player_id, nickname, class_name, COALESCE(created_at, queued_at) AS created_at FROM duel_queue ORDER BY COALESCE(queued_at, created_at) ASC LIMIT 20`),
    pool.query(`SELECT discord_id, username, rating, wins, losses FROM duel_ratings ORDER BY rating DESC, wins DESC, losses ASC LIMIT 10`),
    pool.query(normalizedMatchSelect(`WHERE status = 'completed'`, `ORDER BY COALESCE(confirmed_at, completed_at) DESC NULLS LAST, updated_at DESC NULLS LAST`, `LIMIT 8`)),
    viewerId
      ? pool.query(normalizedMatchSelect(`WHERE status = 'pending' AND (COALESCE(player_one_id, player1_id) = $1 OR COALESCE(player_two_id, player2_id) = $1)`, `ORDER BY created_at DESC`, `LIMIT 1`), [viewerId])
      : Promise.resolve({ rows: [] }),
  ]);

  const queue = queueResult.rows.map((row) => ({
    playerId: String(row.player_id),
    nickname: String(row.nickname || ''),
    className: String(row.class_name || ''),
    joinedAt: toIso(row.created_at) || new Date().toISOString(),
  }));

  const leaderboard = leaderboardResult.rows.map((row) => ({
    playerId: String(row.discord_id),
    nickname: String(row.username || ''),
    rating: Number(row.rating || 1000),
    wins: Number(row.wins || 0),
    losses: Number(row.losses || 0),
  }));

  const recentMatches = await Promise.all(
    recentResult.rows.map((row) => formatMatch(pool, row as MatchRow, viewerId))
  );

  const activeMatch = activeResult.rows[0] ? await formatMatch(pool, activeResult.rows[0] as MatchRow, viewerId) : null;
  const userInQueue = Boolean(viewerId && queue.some((entry) => entry.playerId === viewerId));
  const userRating = viewerId ? leaderboard.find((entry) => entry.playerId === viewerId) || null : null;

  return {
    queue,
    leaderboard,
    recentMatches,
    activeMatch,
    userInQueue,
    userRating,
  };
}

async function completeMatch(match: MatchRow, winnerId: string) {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const playerOne: Actor = {
      id: match.player_one_id,
      nickname: match.player_one_nickname,
      className: match.player_one_class,
    };
    const playerTwo: Actor = {
      id: match.player_two_id,
      nickname: match.player_two_nickname,
      className: match.player_two_class,
    };

    await ensureRatingRow(client, playerOne);
    await ensureRatingRow(client, playerTwo);

    const ratings = await client.query(
      `SELECT discord_id, rating, wins, losses FROM duel_ratings WHERE discord_id = ANY($1::text[])`,
      [[playerOne.id, playerTwo.id]]
    );
    const ratingMap = new Map<string, { rating: number; wins: number; losses: number }>();
    for (const row of ratings.rows) {
      ratingMap.set(String(row.discord_id), {
        rating: Number(row.rating || 1000),
        wins: Number(row.wins || 0),
        losses: Number(row.losses || 0),
      });
    }

    const one = ratingMap.get(playerOne.id) || { rating: 1000, wins: 0, losses: 0 };
    const two = ratingMap.get(playerTwo.id) || { rating: 1000, wins: 0, losses: 0 };
    const playerOneWon = winnerId === playerOne.id;

    const nextOne = calculateRating(one.rating, two.rating, playerOneWon ? 1 : 0);
    const nextTwo = calculateRating(two.rating, one.rating, playerOneWon ? 0 : 1);

    await client.query(
      `
      UPDATE duel_ratings
      SET rating = $2,
          wins = $3,
          losses = $4,
          updated_at = NOW()
      WHERE discord_id = $1
      `,
      [playerOne.id, nextOne, one.wins + (playerOneWon ? 1 : 0), one.losses + (playerOneWon ? 0 : 1)]
    );
    await client.query(
      `
      UPDATE duel_ratings
      SET rating = $2,
          wins = $3,
          losses = $4,
          updated_at = NOW()
      WHERE discord_id = $1
      `,
      [playerTwo.id, nextTwo, two.wins + (playerOneWon ? 0 : 1), two.losses + (playerOneWon ? 1 : 0)]
    );

    await client.query(
      `
      UPDATE duel_matches
      SET status = 'completed', winner_id = $2, confirmed_at = NOW(), completed_at = NOW(), updated_at = NOW()
      WHERE id = $1
      `,
      [match.id, winnerId]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured (missing DATABASE_URL)' }, { status: 503 });
    }

    await ensurePvpSchema();
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    const actorId = actorIdFromUser(decoded);

    return NextResponse.json(await loadState(actorId));
  } catch (error) {
    console.error('Error loading PvP state:', error);
    return NextResponse.json({ error: 'Failed to load PvP state' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured (missing DATABASE_URL)' }, { status: 503 });
    }

    await ensurePvpSchema();
    const actor = await resolveActor(decoded);
    const pool = getPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const pendingMatch = await client.query(
        normalizedMatchSelect(`WHERE status = 'pending' AND (COALESCE(player_one_id, player1_id) = $1 OR COALESCE(player_two_id, player2_id) = $1)`, '', 'LIMIT 1'),
        [actor.id]
      );
      if (pendingMatch.rowCount) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'You already have an active PvP match' }, { status: 409 });
      }

      await client.query(
        `
        INSERT INTO duel_queue (discord_id, player_id, nickname, class_name, queued_at, created_at)
        VALUES ($1, $1, $2, $3, NOW(), NOW())
        ON CONFLICT (discord_id) DO UPDATE
        SET player_id = EXCLUDED.player_id,
            nickname = EXCLUDED.nickname,
            class_name = EXCLUDED.class_name,
            queued_at = NOW(),
            created_at = COALESCE(duel_queue.created_at, NOW())
        `,
        [actor.id, actor.nickname, actor.className]
      );

      const opponent = await client.query(
        `
        SELECT COALESCE(player_id, discord_id) AS player_id, nickname, class_name
        FROM duel_queue
        WHERE COALESCE(player_id, discord_id) <> $1
        ORDER BY COALESCE(queued_at, created_at) ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED
        `,
        [actor.id]
      );

      if (opponent.rows[0]) {
        const rival = opponent.rows[0];
        await client.query(
          `
          INSERT INTO duel_matches (
            player1_id,
            player2_id,
            player_one_id,
            player_one_nickname,
            player_one_class,
            player_two_id,
            player_two_nickname,
            player_two_class,
            status,
            created_at,
            updated_at
          )
          VALUES ($1, $4, $1, $2, $3, $4, $5, $6, 'pending', NOW(), NOW())
          `,
          [rival.player_id, rival.nickname, rival.class_name || '', actor.id, actor.nickname, actor.className]
        );
        await client.query(`DELETE FROM duel_queue WHERE discord_id = ANY($1::text[]) OR player_id = ANY($1::text[])`, [[actor.id, String(rival.player_id)]]);
      }

      await ensureRatingRow(client, actor);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    return NextResponse.json(await loadState(actor.id));
  } catch (error) {
    console.error('Error joining PvP queue:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to join PvP queue' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    const actorId = actorIdFromUser(decoded);
    if (!decoded || !actorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured (missing DATABASE_URL)' }, { status: 503 });
    }

    await ensurePvpSchema();
    const pool = getPool();
    await pool.query(`DELETE FROM duel_queue WHERE discord_id = $1 OR player_id = $1`, [actorId]);

    return NextResponse.json(await loadState(actorId));
  } catch (error) {
    console.error('Error leaving PvP queue:', error);
    return NextResponse.json({ error: 'Failed to leave PvP queue' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    const actorId = actorIdFromUser(decoded);
    if (!decoded || !actorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured (missing DATABASE_URL)' }, { status: 503 });
    }

    await ensurePvpSchema();
    const payload = pvpReportSchema.parse(await request.json());
    const pool = getPool();

    const matchResult = await pool.query(
      normalizedMatchSelect(`WHERE id = $1 AND status = 'pending' AND (COALESCE(player_one_id, player1_id) = $2 OR COALESCE(player_two_id, player2_id) = $2)`, '', 'LIMIT 1'),
      [Number(payload.matchId), actorId]
    );
    const match = matchResult.rows[0] as MatchRow | undefined;
    if (!match) {
      return NextResponse.json({ error: 'Active match not found' }, { status: 404 });
    }

    const opponentId = match.player_one_id === actorId ? match.player_two_id : match.player_one_id;
    const winnerId = payload.result === 'win' ? actorId : opponentId;

    await pool.query(
      `
      INSERT INTO duel_confirmations (match_id, discord_id, confirmed_winner_id, confirmed_at, player_id, reported_winner_id, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), $2, $3, NOW(), NOW())
      ON CONFLICT (match_id, discord_id)
      DO UPDATE SET confirmed_winner_id = EXCLUDED.confirmed_winner_id, confirmed_at = NOW(), player_id = EXCLUDED.player_id, reported_winner_id = EXCLUDED.reported_winner_id, updated_at = NOW()
      `,
      [Number(payload.matchId), actorId, winnerId]
    );

    const confirmations = await pool.query(
      `SELECT COALESCE(player_id, discord_id) AS player_id, COALESCE(reported_winner_id, confirmed_winner_id) AS reported_winner_id FROM duel_confirmations WHERE match_id = $1`,
      [Number(payload.matchId)]
    );
    const players = new Set(confirmations.rows.map((row) => String(row.player_id)));
    const winners = new Set(confirmations.rows.map((row) => String(row.reported_winner_id)));

    if (players.has(match.player_one_id) && players.has(match.player_two_id) && winners.size === 1) {
      await completeMatch(match, String(confirmations.rows[0].reported_winner_id));
    }

    return NextResponse.json(await loadState(actorId));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }
    console.error('Error reporting PvP result:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to report PvP result' }, { status: 500 });
  }
}
