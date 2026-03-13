export type Actor = {
  id: string;
  nickname: string;
  prefix: string;
  className: string;
};

export type MatchRow = {
  id: number;
  player_one_id: string;
  player_one_nickname: string;
  player_one_prefix: string | null;
  player_one_class: string;
  player_two_id: string;
  player_two_nickname: string;
  player_two_prefix: string | null;
  player_two_class: string;
  status: 'pending' | 'completed';
  winner_id: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  confirmed_at: Date | string | null;
};
