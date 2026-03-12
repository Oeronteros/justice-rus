import { canModerateContent, hasRoleAtLeast } from '@/lib/authz';
import { getPool } from '@/lib/neon';
import type { User } from '@/lib/schemas/auth';
import type { CreateHelpRequestDto, HelpRequest, HelpRsvpDto, MutateHelpRequestDto } from '@/lib/schemas/help';
import { ensureHelpSchema, resolveRosterClassName } from './shared';

class HelpRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'HelpRequestError';
  }
}

function isValidDate(date: Date): boolean {
  return Number.isFinite(date.getTime());
}

function toRequestId(value: string | number): number {
  const id = Number(value);
  if (!Number.isFinite(id)) {
    throw new HelpRequestError('Invalid id', 400);
  }
  return id;
}

function validateTimeRange(startRaw: string, endRaw: string): { gatheringStart: Date; gatheringEnd: Date } {
  const gatheringStart = new Date(startRaw);
  const gatheringEnd = new Date(endRaw);

  if (!isValidDate(gatheringStart) || !isValidDate(gatheringEnd)) {
    throw new HelpRequestError('Invalid gathering time range', 400);
  }

  if (gatheringEnd.getTime() <= gatheringStart.getTime()) {
    throw new HelpRequestError('Gathering end must be after start', 400);
  }

  return { gatheringStart, gatheringEnd };
}

export async function loadHelpRequest(requestId: number): Promise<HelpRequest | null> {
  const pool = getPool();

  const requestRow = await pool.query(
    `
    SELECT id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
    FROM help_requests
    WHERE id = $1
    LIMIT 1
    `,
    [requestId]
  );

  const row = requestRow.rows[0];
  if (!row) return null;

  const responders = await pool.query(
    `
    SELECT responder_user_id, responder_nickname, responder_class, responded_at
    FROM help_request_responders
    WHERE request_id = $1
    ORDER BY responded_at ASC
    `,
    [requestId]
  );

  const createdAt = (row.created_at || new Date()).toISOString();
  const gatheringStart = row.gathering_start ? new Date(row.gathering_start).toISOString() : createdAt;
  const gatheringEnd = row.gathering_end ? new Date(row.gathering_end).toISOString() : gatheringStart;

  return {
    id: String(row.id),
    title: row.title || '',
    details: row.details || '',
    category: row.category || 'general',
    author: row.author || 'unknown',
    authorUserId: row.author_user_id ? String(row.author_user_id) : null,
    status: row.status === 'closed' ? 'closed' : 'open',
    createdAt,
    gatheringStart,
    gatheringEnd,
    responders: responders.rows.map((responder) => ({
      userId: String(responder.responder_user_id),
      nickname: responder.responder_nickname || '',
      className: responder.responder_class || '',
      respondedAt: (responder.responded_at || new Date()).toISOString(),
    })),
  };
}

export async function listHelpRequests(status: string): Promise<HelpRequest[]> {
  await ensureHelpSchema();
  const pool = getPool();

  const where = status === 'all' ? '' : `WHERE status = ${status === 'closed' ? "'closed'" : "'open'"}`;
  const result = await pool.query(
    `
    SELECT id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
    FROM help_requests
    ${where}
    ORDER BY created_at DESC
    LIMIT 200
    `
  );

  const ids = result.rows.map((row) => Number(row.id)).filter((id) => Number.isFinite(id));
  const respondersByRequestId = new Map<string, HelpRequest['responders']>();

  if (ids.length > 0) {
    const responders = await pool.query(
      `
      SELECT request_id, responder_user_id, responder_nickname, responder_class, responded_at
      FROM help_request_responders
      WHERE request_id = ANY($1::int[])
      ORDER BY responded_at ASC
      `,
      [ids]
    );

    for (const responder of responders.rows) {
      const key = String(responder.request_id);
      const list = respondersByRequestId.get(key) || [];
      list.push({
        userId: String(responder.responder_user_id),
        nickname: responder.responder_nickname || '',
        className: responder.responder_class || '',
        respondedAt: (responder.responded_at || new Date()).toISOString(),
      });
      respondersByRequestId.set(key, list);
    }
  }

  return result.rows.map((row) => {
    const createdAt = (row.created_at || new Date()).toISOString();
    const gatheringStart = row.gathering_start ? new Date(row.gathering_start).toISOString() : createdAt;
    const gatheringEnd = row.gathering_end ? new Date(row.gathering_end).toISOString() : gatheringStart;

    return {
      id: String(row.id),
      title: row.title || '',
      details: row.details || '',
      category: row.category || 'general',
      author: row.author || 'unknown',
      authorUserId: row.author_user_id ? String(row.author_user_id) : null,
      status: row.status === 'closed' ? 'closed' : 'open',
      createdAt,
      gatheringStart,
      gatheringEnd,
      responders: respondersByRequestId.get(String(row.id)) || [],
    } satisfies HelpRequest;
  });
}

export async function createHelpRequest(payload: CreateHelpRequestDto, user: User): Promise<HelpRequest> {
  await ensureHelpSchema();
  const pool = getPool();
  const { gatheringStart, gatheringEnd } = validateTimeRange(payload.gatheringStart, payload.gatheringEnd);

  const author = user.nickname || user.discordId || user.role;
  const authorUserId = user.id || user.discordId || user.nickname || null;
  const category = payload.category || 'general';

  const inserted = await pool.query(
    `
    INSERT INTO help_requests (title, details, category, author, author_user_id, status, gathering_start, gathering_end)
    VALUES ($1, $2, $3, $4, $5, 'open', $6, $7)
    RETURNING id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
    `,
    [payload.title, payload.details, category, author, authorUserId, gatheringStart, gatheringEnd]
  );

  const row = inserted.rows[0];
  return {
    id: String(row.id),
    title: row.title,
    details: row.details,
    category: row.category,
    author: row.author,
    authorUserId: row.author_user_id ? String(row.author_user_id) : null,
    status: row.status === 'closed' ? 'closed' : 'open',
    createdAt: (row.created_at || new Date()).toISOString(),
    gatheringStart: (row.gathering_start || new Date()).toISOString(),
    gatheringEnd: (row.gathering_end || new Date()).toISOString(),
    responders: [],
  };
}

export async function updateHelpRequest(payload: MutateHelpRequestDto, user: User): Promise<HelpRequest> {
  await ensureHelpSchema();
  const pool = getPool();
  const requestId = toRequestId(payload.id);
  const isOfficer = hasRoleAtLeast(user.role, 'officer');
  const wantsStatusUpdate = Boolean(payload.status);
  const wantsTimeUpdate = Boolean(payload.gatheringStart) && Boolean(payload.gatheringEnd);

  if (wantsStatusUpdate && !isOfficer) {
    throw new HelpRequestError('Forbidden', 403);
  }

  let gatheringStart: Date | null = null;
  let gatheringEnd: Date | null = null;
  if (wantsTimeUpdate) {
    const validated = validateTimeRange(payload.gatheringStart as string, payload.gatheringEnd as string);
    gatheringStart = validated.gatheringStart;
    gatheringEnd = validated.gatheringEnd;
  }

  if (wantsTimeUpdate && !isOfficer) {
    const userId = user.id || user.discordId || user.nickname || null;
    if (!userId) {
      throw new HelpRequestError('Forbidden', 403);
    }

    const existing = await pool.query(`SELECT author_user_id, author FROM help_requests WHERE id = $1`, [requestId]);
    const row = existing.rows[0];
    if (!row) {
      throw new HelpRequestError('Not found', 404);
    }

    const authorUserId = row.author_user_id ? String(row.author_user_id) : null;
    const isAuthor =
      (authorUserId && authorUserId === String(userId)) ||
      (!authorUserId && user.nickname && row.author && String(row.author).toLowerCase() === String(user.nickname).toLowerCase());

    if (!isAuthor) {
      throw new HelpRequestError('Forbidden', 403);
    }
  }

  const sets: string[] = [];
  const values: Array<string | number | Date> = [requestId];

  if (payload.status) {
    values.push(payload.status);
    sets.push(`status = $${values.length}`);
  }

  if (wantsTimeUpdate && gatheringStart && gatheringEnd) {
    values.push(gatheringStart);
    sets.push(`gathering_start = $${values.length}`);
    values.push(gatheringEnd);
    sets.push(`gathering_end = $${values.length}`);
  }

  const updated = await pool.query(
    `
    UPDATE help_requests
    SET ${sets.join(', ')}
    WHERE id = $1
    RETURNING id, title, details, category, author, author_user_id, status, created_at, gathering_start, gathering_end
    `,
    values
  );

  const row = updated.rows[0];
  if (!row) {
    throw new HelpRequestError('Not found', 404);
  }

  const hydrated = await loadHelpRequest(requestId);
  if (!hydrated) {
    throw new HelpRequestError('Not found', 404);
  }

  return hydrated;
}

export async function deleteHelpRequest(requestIdRaw: number, user: User): Promise<{ success: true }> {
  if (!canModerateContent(user.role)) {
    throw new HelpRequestError('Forbidden', 403);
  }

  await ensureHelpSchema();
  const pool = getPool();
  const deleted = await pool.query(`DELETE FROM help_requests WHERE id = $1 RETURNING id`, [requestIdRaw]);
  if (!deleted.rows[0]) {
    throw new HelpRequestError('Not found', 404);
  }

  return { success: true };
}

export async function addHelpResponder(payload: HelpRsvpDto, user: User): Promise<HelpRequest> {
  if (!user.id) {
    throw new HelpRequestError('Responder identity is unavailable', 400);
  }

  await ensureHelpSchema();
  const pool = getPool();
  const requestId = toRequestId(payload.id);
  const nickname = user.nickname || 'unknown';
  const className = (await resolveRosterClassName(user.nickname)) || '';

  await pool.query(
    `
    INSERT INTO help_request_responders (request_id, responder_user_id, responder_nickname, responder_class)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (request_id, responder_user_id)
    DO UPDATE SET responder_nickname = EXCLUDED.responder_nickname, responder_class = EXCLUDED.responder_class
    `,
    [requestId, user.id, nickname, className]
  );

  const updated = await loadHelpRequest(requestId);
  if (!updated) {
    throw new HelpRequestError('Not found', 404);
  }

  return updated;
}

export async function removeHelpResponder(requestIdRaw: string, user: User): Promise<HelpRequest> {
  if (!user.id) {
    throw new HelpRequestError('Responder identity is unavailable', 400);
  }

  await ensureHelpSchema();
  const pool = getPool();
  const requestId = toRequestId(requestIdRaw);

  await pool.query(
    `DELETE FROM help_request_responders WHERE request_id = $1 AND responder_user_id = $2`,
    [requestId, user.id]
  );

  const updated = await loadHelpRequest(requestId);
  if (!updated) {
    throw new HelpRequestError('Not found', 404);
  }

  return updated;
}
