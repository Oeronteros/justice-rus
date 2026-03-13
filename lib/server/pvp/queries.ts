export function normalizedMatchSelect(whereClause?: string, orderClause?: string, limitClause?: string) {
  return `
    SELECT
      id,
      COALESCE(player_one_id, player1_id) AS player_one_id,
      COALESCE(player_one_nickname, player1_id) AS player_one_nickname,
      player_one_prefix,
      player_one_class,
      COALESCE(player_two_id, player2_id) AS player_two_id,
      COALESCE(player_two_nickname, player2_id) AS player_two_nickname,
      player_two_prefix,
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
