import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RegistrationTable } from '@/components/sections/registration/RegistrationTable';
import { defaultRegistrationColumnLabels } from '@/components/sections/registration/columnLabels';
import type { Registration, User } from '@/types';

const mutateAsync = vi.fn();

vi.mock('@/lib/hooks', () => ({
  useUpdateRegistrationStats: () => ({
    mutateAsync,
    isPending: false,
  }),
}));

describe('RegistrationTable guild editing', () => {
  const user: User = {
    id: 'u-officer',
    nickname: 'Officer',
    role: 'officer',
    isActive: true,
  };

  const baseRow: Registration = {
    discord: 'discord-001',
    avatarUrl: null,
    nickname: 'Target',
    rank: 'member',
    class: 'Numina',
    guild: 'Old Guild',
    joinDate: '2025-01-01',
    kpi: 77,
    elo: 1200,
    mmr20: 1500,
    bounty: 10,
    marks: 0,
    outerHeroic: 1,
    innerHeroic: 0,
    crimsonSands: 1,
    abyss: 0,
    gvg: 1,
    secretRealm: 0,
    duelWins: 0,
    duelLosses: 0,
    status: 'active',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mutateAsync.mockResolvedValue({ success: true, portalOnly: false });
    (window as unknown as { prompt: ReturnType<typeof vi.fn> }).prompt = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('edits guild in modal flow and submits trimmed value', async () => {
    const onRefresh = vi.fn();

    render(
      <RegistrationTable
        registrations={[baseRow]}
        user={user}
        onRefresh={onRefresh}
        columnLabels={defaultRegistrationColumnLabels}
      />
    );

    const editButtons = screen.getAllByRole('button', { name: /изменить/i });
    fireEvent.click(editButtons[0]);

    const guildInput = screen.getByLabelText('Клан');
    fireEvent.change(guildInput, { target: { value: '  New Guild  ' } });

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          nickname: 'Target',
          guild: 'New Guild',
        })
      );
    });

    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect((window as unknown as { prompt: ReturnType<typeof vi.fn> }).prompt).not.toHaveBeenCalled();
  });
});
