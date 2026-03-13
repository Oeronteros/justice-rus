import type { PoolClient } from 'pg';
import { getPool } from '@/lib/neon';
import type { User } from '@/lib/schemas/auth';
import type { PvpReportDto, PvpState } from '@/lib/schemas/pvp';
import { actorIdFromUser, requireActorId, resolveActor } from '@/lib/server/pvp/actors';
import { PvpError } from '@/lib/server/pvp/errors';
import { calculateRating, resolveMatchWinner } from '@/lib/server/pvp/logic';
import { normalizedMatchSelect } from '@/lib/server/pvp/queries';
import { touchRateLimit } from '@/lib/server/pvp/rate-limit';
import { ensurePvpSchema } from '@/lib/server/pvp/schema';
import { loadState } from '@/lib/server/pvp/state';
import type { Actor, MatchRow } from '@/lib/server/pvp/types';

async function ensureRatingRow(client: PoolClient, actor: Actor) {
  await client.query(
    `
    INSERT INTO duel_ratings (discord_id, username, prefix, rating, wins, losses, updated_at)
    VALUES ($1, $2, $3, 1000, 0, 0, NOW())
    ON CONFLICT (discord_id) DO UPDATE
    SET username = EXCLUDED.username,
        prefix = EXCLUDED.prefix,
        updated_at = NOW()
    `,
    [actor.id, actor.nickname, actor.prefix]
  );
}

async function completeMatch(matchId: number, winnerId: string): Promise<boolean> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const lockedMatchResult = await client.query(
      normalizedMatchSelect('WHERE id = $1', '', 'LIMIT 1 FOR UPDATE'),
      [matchId]
    );
    const lockedMatch = lockedMatchResult.rows[0] as MatchRow | undefined;

    if (!lockedMatch || lockedMatch.status !== 'pending') {
      await client.query('COMMIT');
      return false;
    }

    const playerOne: Actor = {
      id: lockedMatch.player_one_id,
      nickname: lockedMatch.player_one_nickname,
      prefix: String(lockedMatch.player_one_prefix || ''),
      className: lockedMatch.player_one_class,
    };
    const playerTwo: Actor = {
      id: lockedMatch.player_two_id,
      nickname: lockedMatch.player_two_nickname,
      prefix: String(lockedMatch.player_two_prefix || ''),
      className: lockedMatch.player_two_class,
    };

    if (winnerId !== playerOne.id && winnerId !== playerTwo.id) {
      throw new PvpError('Reported winner is not a participant of this match', 400);
    }

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
      WHERE id = $1 AND status = 'pending'
      `,
      [lockedMatch.id, winnerId]
    );

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function joinPvpQueue(user: User): Promise<PvpState> {
  await ensurePvpSchema();
  const actor = await resolveActor(user);
  touchRateLimit(actor.id, 'queue');
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const pendingMatch = await client.query(
      normalizedMatchSelect(
        `WHERE status = 'pending' AND (COALESCE(player_one_id, player1_id) = $1 OR COALESCE(player_two_id, player2_id) = $1)`,
        '',
        'LIMIT 1'
      ),
      [actor.id]
    );
    if (pendingMatch.rowCount) {
      await client.query('ROLLBACK');
      throw new PvpError('You already have an active PvP match', 409);
    }

    await client.query(`DELETE FROM duel_queue WHERE discord_id = $1 OR player_id = $1`, [actor.id]);
    await client.query(
      `
      INSERT INTO duel_queue (discord_id, player_id, nickname, prefix, class_name, queued_at, created_at)
      VALUES ($1, $1, $2, $3, $4, NOW(), NOW())
      `,
      [actor.id, actor.nickname, actor.prefix, actor.className]
    );

    const opponent = await client.query(
      `
      SELECT COALESCE(player_id, discord_id) AS player_id, nickname, prefix, class_name
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
          player_one_prefix,
          player_one_class,
          player_two_id,
          player_two_nickname,
          player_two_prefix,
          player_two_class,
          status,
          created_at,
          updated_at
        )
        VALUES ($1, $5, $1, $2, $3, $4, $5, $6, $7, $8, 'pending', NOW(), NOW())
        `,
        [
          rival.player_id,
          rival.nickname,
          rival.prefix || '',
          rival.class_name || '',
          actor.id,
          actor.nickname,
          actor.prefix,
          actor.className,
        ]
      );
      await client.query(
        `DELETE FROM duel_queue WHERE discord_id = ANY($1::text[]) OR player_id = ANY($1::text[])`,
        [[actor.id, String(rival.player_id)]]
      );
    }

    await ensureRatingRow(client, actor);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

  return loadState(actor.id);
}

export async function leavePvpQueue(user: User): Promise<PvpState> {
  await ensurePvpSchema();
  const actorId = requireActorId(user);
  touchRateLimit(actorId, 'queue');
  const pool = getPool();
  await pool.query(`DELETE FROM duel_queue WHERE discord_id = $1 OR player_id = $1`, [actorId]);
  return loadState(actorId);
}

export async function reportPvpResult(user: User, payload: PvpReportDto): Promise<PvpState> {
  await ensurePvpSchema();
  const actorId = requireActorId(user);
  const pool = getPool();
  touchRateLimit(actorId, 'report');

  const matchResult = await pool.query(
    normalizedMatchSelect(
      `WHERE id = $1 AND status = 'pending' AND (COALESCE(player_one_id, player1_id) = $2 OR COALESCE(player_two_id, player2_id) = $2)`,
      '',
      'LIMIT 1'
    ),
    [Number(payload.matchId), actorId]
  );
  const match = matchResult.rows[0] as MatchRow | undefined;
  if (!match) {
    throw new PvpError('Active match not found', 404);
  }

  const opponentId = match.player_one_id === actorId ? match.player_two_id : match.player_one_id;
  const winnerId = payload.result === 'win' ? actorId : opponentId;

  await pool.query(
    `DELETE FROM duel_confirmations WHERE match_id = $1 AND (discord_id = $2 OR player_id = $2)`,
    [Number(payload.matchId), actorId]
  );
  await pool.query(
    `
    INSERT INTO duel_confirmations (match_id, discord_id, confirmed_winner_id, confirmed_at, player_id, reported_winner_id, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), $2, $3, NOW(), NOW())
    `,
    [Number(payload.matchId), actorId, winnerId]
  );

  const confirmations = await pool.query(
    `SELECT COALESCE(player_id, discord_id) AS player_id, COALESCE(reported_winner_id, confirmed_winner_id) AS reported_winner_id FROM duel_confirmations WHERE match_id = $1`,
    [Number(payload.matchId)]
  );

  const resolvedWinnerId = resolveMatchWinner(
    match.player_one_id,
    match.player_two_id,
    confirmations.rows.map((row) => ({
      playerId: String(row.player_id),
      reportedWinnerId: String(row.reported_winner_id),
    }))
  );

  if (resolvedWinnerId) {
    await completeMatch(Number(payload.matchId), resolvedWinnerId);
  }

  return loadState(actorId);
}

export async function getPvpState(user: User): Promise<PvpState> {
  await ensurePvpSchema();
  return loadState(actorIdFromUser(user));
}
