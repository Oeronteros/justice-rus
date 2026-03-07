export type MatchLifecycleStatus = 'pending' | 'completed';
export type MatchConfirmationStatus = 'unreported' | 'waiting' | 'disputed' | 'confirmed';

export type MatchReport = {
  playerId: string;
  reportedWinnerId: string;
};

export function calculateRating(current: number, opponent: number, score: 0 | 1): number {
  const expected = 1 / (1 + Math.pow(10, (opponent - current) / 400));
  return Math.round(current + 32 * (score - expected));
}

export function deriveConfirmationStatus(
  status: MatchLifecycleStatus,
  reportedWinnerIds: string[]
): MatchConfirmationStatus {
  if (status === 'completed') {
    return 'confirmed';
  }

  if (reportedWinnerIds.length === 0) {
    return 'unreported';
  }

  return new Set(reportedWinnerIds).size > 1 ? 'disputed' : 'waiting';
}

export function resolveMatchWinner(
  playerOneId: string,
  playerTwoId: string,
  reports: MatchReport[]
): string | null {
  const reportsByPlayer = new Map<string, string>();

  for (const report of reports) {
    if (!report.playerId || !report.reportedWinnerId) {
      continue;
    }

    reportsByPlayer.set(report.playerId, report.reportedWinnerId);
  }

  const first = reportsByPlayer.get(playerOneId);
  const second = reportsByPlayer.get(playerTwoId);

  if (!first || !second) {
    return null;
  }

  if (first !== second) {
    return null;
  }

  if (first !== playerOneId && first !== playerTwoId) {
    return null;
  }

  return first;
}
