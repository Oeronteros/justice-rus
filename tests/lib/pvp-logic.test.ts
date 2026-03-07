import { describe, expect, it } from 'vitest';
import { calculateRating, deriveConfirmationStatus, resolveMatchWinner } from '@/lib/server/pvp/logic';

describe('lib/server/pvp/logic', () => {
  it('calculates deterministic rating delta for symmetric matchups', () => {
    expect(calculateRating(1000, 1000, 1)).toBe(1016);
    expect(calculateRating(1000, 1000, 0)).toBe(984);
  });

  it('derives confirmation status from match lifecycle and reports', () => {
    expect(deriveConfirmationStatus('completed', [])).toBe('confirmed');
    expect(deriveConfirmationStatus('pending', [])).toBe('unreported');
    expect(deriveConfirmationStatus('pending', ['one'])).toBe('waiting');
    expect(deriveConfirmationStatus('pending', ['one', 'one'])).toBe('waiting');
    expect(deriveConfirmationStatus('pending', ['one', 'two'])).toBe('disputed');
  });

  it('resolves a winner only when both players report the same participant', () => {
    const playerOneId = 'p1';
    const playerTwoId = 'p2';

    expect(
      resolveMatchWinner(playerOneId, playerTwoId, [
        { playerId: playerOneId, reportedWinnerId: playerOneId },
      ])
    ).toBeNull();

    expect(
      resolveMatchWinner(playerOneId, playerTwoId, [
        { playerId: playerOneId, reportedWinnerId: playerOneId },
        { playerId: playerTwoId, reportedWinnerId: playerTwoId },
      ])
    ).toBeNull();

    expect(
      resolveMatchWinner(playerOneId, playerTwoId, [
        { playerId: playerOneId, reportedWinnerId: playerOneId },
        { playerId: playerTwoId, reportedWinnerId: playerOneId },
      ])
    ).toBe(playerOneId);

    expect(
      resolveMatchWinner(playerOneId, playerTwoId, [
        { playerId: playerOneId, reportedWinnerId: 'outsider' },
        { playerId: playerTwoId, reportedWinnerId: 'outsider' },
      ])
    ).toBeNull();
  });
});
