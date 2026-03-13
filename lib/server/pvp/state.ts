import { getPool } from '@/lib/neon';
import type { PvpState } from '@/lib/schemas/pvp';
import { deriveConfirmationStatus } from '@/lib/server/pvp/logic';
import { normalizedMatchSelect } from '@/lib/server/pvp/queries';
import type { MatchRow } from '@/lib/server/pvp/types';

function toIso(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : new Date().toISOString();
}

export async function formatMatch(
  pool: Awaited<ReturnType<typeof getPool>>,
  row: MatchRow,
  viewerId: string | null
) {
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
    const opponentId =
      viewerId === row.player_one_id
        ? row.player_two_id
        : viewerId === row.player_two_id
          ? row.player_one_id
          : null;
    if (opponentId) {
      const opponentWinner = reports.get(opponentId);
      if (opponentWinner) {
        opponentReport = opponentWinner === viewerId ? 'loss' : 'win';
      }
    }
  }

  const confirmationStatus = deriveConfirmationStatus(
    row.status,
    confirmations.rows.map((item) => String(item.reported_winner_id))
  );

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
      prefix: row.player_one_prefix || '',
      className: row.player_one_class || '',
    },
    playerTwo: {
      id: row.player_two_id,
      nickname: row.player_two_nickname,
      prefix: row.player_two_prefix || '',
      className: row.player_two_class || '',
    },
    yourReport,
    opponentReport,
    confirmationStatus,
  };
}

export async function loadState(viewerId: string | null): Promise<PvpState> {
  const pool = getPool();

  const [queueResult, leaderboardResult, recentResult, activeResult] = await Promise.all([
    pool.query(
      `SELECT COALESCE(player_id, discord_id) AS player_id, nickname, prefix, class_name, COALESCE(created_at, queued_at) AS created_at FROM duel_queue ORDER BY COALESCE(queued_at, created_at) ASC LIMIT 20`
    ),
    pool.query(
      `SELECT discord_id, username, prefix, rating, wins, losses FROM duel_ratings ORDER BY rating DESC, wins DESC, losses ASC LIMIT 10`
    ),
    pool.query(
      normalizedMatchSelect(
        `WHERE status = 'completed'`,
        `ORDER BY COALESCE(confirmed_at, completed_at) DESC NULLS LAST, updated_at DESC NULLS LAST`,
        `LIMIT 8`
      )
    ),
    viewerId
      ? pool.query(
          normalizedMatchSelect(
            `WHERE status = 'pending' AND (COALESCE(player_one_id, player1_id) = $1 OR COALESCE(player_two_id, player2_id) = $1)`,
            `ORDER BY created_at DESC`,
            `LIMIT 1`
          ),
          [viewerId]
        )
      : Promise.resolve({ rows: [] }),
  ]);

  const queue = queueResult.rows.map((row) => ({
    playerId: String(row.player_id),
    nickname: String(row.nickname || ''),
    prefix: String(row.prefix || ''),
    className: String(row.class_name || ''),
    joinedAt: toIso(row.created_at) || new Date().toISOString(),
  }));

  const leaderboard = leaderboardResult.rows.map((row) => ({
    playerId: String(row.discord_id),
    nickname: String(row.username || ''),
    prefix: String(row.prefix || ''),
    rating: Number(row.rating || 1000),
    wins: Number(row.wins || 0),
    losses: Number(row.losses || 0),
  }));

  const recentMatches = await Promise.all(
    recentResult.rows.map((row) => formatMatch(pool, row as MatchRow, viewerId))
  );
  const activeMatch = activeResult.rows[0]
    ? await formatMatch(pool, activeResult.rows[0] as MatchRow, viewerId)
    : null;
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
