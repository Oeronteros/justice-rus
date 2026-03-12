'use client';

import { useEffect, useCallback } from 'react';
import { useNotifications } from './context';
import type { HelpRequest } from '@/lib/schemas/help';
import type { Absence } from '@/lib/schemas/absence';
import type { PvpMatch } from '@/lib/schemas/pvp';

interface UseHelpNotificationsOptions {
  enabled?: boolean;
  unattendedThresholdMinutes?: number;
}

export function useHelpNotifications(
  helpRequests: HelpRequest[],
  userId: string | null,
  options: UseHelpNotificationsOptions = {}
) {
  const { settings, addToast } = useNotifications();
  const { enabled = true, unattendedThresholdMinutes = 15 } = options;

  const checkUnattendedRequests = useCallback(() => {
    if (!enabled || !settings.enabled || !settings.helpRequests) return;

    const now = Date.now();
    const unattended = helpRequests.filter(
      (request) =>
        request.responders.length === 0 &&
        now - new Date(request.createdAt).getTime() > unattendedThresholdMinutes * 60000
    );

    if (unattended.length > 0) {
      addToast({
        type: 'warning',
        title: 'Запросы без ответа',
        message: `${unattended.length} запросов помощи ждут ответа уже более ${unattendedThresholdMinutes} мин.`,
        duration: 0,
        action: {
          label: 'Открыть помощь',
          onClick: () => {
            window.location.href = '/help';
          },
        },
      });
    }
  }, [enabled, settings.enabled, settings.helpRequests, helpRequests, unattendedThresholdMinutes, addToast]);

  const checkMyResponses = useCallback(
    (newRequests: HelpRequest[], previousCount: number) => {
      if (!userId || !settings.enabled) return;

      const newResponses = newRequests.filter(
        (request) =>
          request.responders.some((responder) => responder.userId === userId) &&
          request.responders.length > 0
      );

      if (newResponses.length > previousCount) {
        addToast({
          type: 'success',
          title: 'Отклик на помощь',
          message: 'Вы откликнулись на запрос помощи',
          duration: 3000,
        });
      }
    },
    [userId, settings.enabled, addToast]
  );

  useEffect(() => {
    const interval = setInterval(checkUnattendedRequests, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkUnattendedRequests]);

  return { checkUnattendedRequests, checkMyResponses };
}

interface UseAbsenceNotificationsOptions {
  enabled?: boolean;
}

export function useAbsenceNotifications(
  absences: Absence[],
  userRole: string,
  options: UseAbsenceNotificationsOptions = {}
) {
  const { settings, addToast } = useNotifications();
  const { enabled = true } = options;

  const checkPendingAbsences = useCallback(() => {
    if (!enabled || !settings.enabled || !settings.absenceApprovals) return;
    if (userRole !== 'officer' && userRole !== 'head' && userRole !== 'sysadmin') return;

    const pending = absences.filter((absence) => absence.status === 'pending');

    if (pending.length > 0) {
      addToast({
        type: 'info',
        title: 'Ожидают подтверждения',
        message: `${pending.length} отсутствий ждут вашего решения`,
        duration: 0,
        action: {
          label: 'Открыть отсутствия',
          onClick: () => {
            window.location.href = '/absences';
          },
        },
      });
    }
  }, [enabled, settings.enabled, settings.absenceApprovals, absences, userRole, addToast]);

  useEffect(() => {
    const interval = setInterval(checkPendingAbsences, 120000); // Check every 2 minutes
    return () => clearInterval(interval);
  }, [checkPendingAbsences]);

  return { checkPendingAbsences };
}

interface UsePvpNotificationsOptions {
  enabled?: boolean;
}

export function usePvpNotifications(
  activeMatch: PvpMatch | null,
  disputedMatch: boolean,
  options: UsePvpNotificationsOptions = {}
) {
  const { settings, addToast } = useNotifications();
  const { enabled = true } = options;

  const checkDisputedMatch = useCallback(() => {
    if (!enabled || !settings.enabled || !settings.pvpMatches) return;

    if (disputedMatch) {
      addToast({
        type: 'error',
        title: 'Спорный матч',
        message: 'Результаты матча расходятся. Требуется вмешательство офицера.',
        duration: 0,
        action: {
          label: 'Открыть PvP',
          onClick: () => {
            window.location.href = '/pvp';
          },
        },
      });
    }
  }, [enabled, settings.enabled, settings.pvpMatches, disputedMatch, addToast]);

  const notifyMatchComplete = useCallback(
    (match: PvpMatch) => {
      if (!settings.enabled || !settings.pvpMatches) return;

      addToast({
        type: 'success',
        title: 'Матч завершён',
        message: `${match.playerOne.nickname} vs ${match.playerTwo.nickname}`,
        duration: 5000,
      });
    },
    [settings.enabled, settings.pvpMatches, addToast]
  );

  useEffect(() => {
    checkDisputedMatch();
  }, [checkDisputedMatch]);

  return { checkDisputedMatch, notifyMatchComplete };
}
