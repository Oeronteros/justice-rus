'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import { SectionHero } from '@/components/shared/SectionHero';
import { ClassBadge } from '@/components/ClassIcon';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useJoinPvpQueue, useLeavePvpQueue, usePvpState, useReportPvpResult } from '@/lib/pvp/hooks';
import type { PvpMatch } from '@/lib/schemas/pvp';
import type { User } from '@/lib/schemas/auth';
import { handleApiError } from '@/lib/api/errors';

interface PvpSectionProps {
  user: User;
}

function formatDateTime(value: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return value;
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getQueueElapsed(joinedAt: string | null | undefined, now: number) {
  if (!joinedAt) return 0;
  const startedAt = new Date(joinedAt).getTime();
  if (!Number.isFinite(startedAt)) return 0;
  return Math.max(0, Math.floor((now - startedAt) / 1000));
}

function QueueSearchBanner({ joinedAt, queueSize }: { joinedAt: string; queueSize: number }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const elapsed = getQueueElapsed(joinedAt, now);

  return (
    <div className="matchmaking-banner">
      <div className="matchmaking-banner__fx" aria-hidden="true">
        <span className="matchmaking-banner__pulse" />
        <span className="matchmaking-banner__pulse matchmaking-banner__pulse--delay" />
        <span className="matchmaking-banner__scan" />
      </div>

      <div className="matchmaking-banner__content">
        <div className="matchmaking-banner__status">
          <span className="matchmaking-banner__dot" />
          Поиск матча
        </div>

        <div className="matchmaking-banner__timer">{formatDuration(elapsed)}</div>

        <div className="matchmaking-banner__meta">
          <span>Плашка подбора активна</span>
          <span>Игроков в очереди: {queueSize}</span>
        </div>
      </div>
    </div>
  );
}

function MatchCard({
  match,
  user,
  onReport,
  isReporting,
}: {
  match: PvpMatch;
  user: User;
  onReport: (result: 'win' | 'loss') => Promise<void>;
  isReporting: boolean;
}) {
  const viewerId = user.discordId || user.id || user.nickname || '';
  const isPlayerOne = viewerId === match.playerOne.id;
  const you = isPlayerOne ? match.playerOne : match.playerTwo;
  const opponent = isPlayerOne ? match.playerTwo : match.playerOne;
  const hasReported = Boolean(match.yourReport);

  return (
    <div className="card section-card ds-section-panel p-5 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="text-sm uppercase tracking-widest text-green-300 mb-2">Текущий матч</div>
          <div className="text-2xl font-bold font-orbitron text-[#e6eff5]">{you.nickname} vs {opponent.nickname}</div>
          <div className="text-sm text-gray-400 mt-2">Создан: {formatDateTime(match.createdAt)}</div>
        </div>
        <div className="ds-kicker border-green-700/45 bg-green-900/30 py-2 text-xs text-green-300">
          <WuxiaIcon name="sword" className="w-4 h-4" />
          {match.confirmationStatus === 'confirmed'
            ? 'Подтверждено'
            : match.confirmationStatus === 'disputed'
              ? 'Есть спор'
              : match.confirmationStatus === 'waiting'
                ? 'Ждем второго игрока'
                : 'Результат не отправлен'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-2xl ds-section-panel-soft border-green-700/40 bg-green-950/35 p-4">
          <div className="text-gray-400 mb-1">Ты</div>
          <div className="text-[#e6eff5] font-semibold">{you.nickname}</div>
          <div className="mt-2">
            <ClassBadge className={you.className} emptyLabel="Класс не указан" textClassName="text-green-300 text-xs" iconSizeClassName="h-7 w-7" />
          </div>
        </div>
        <div className="rounded-2xl ds-section-panel-soft border-green-700/40 bg-green-950/35 p-4">
          <div className="text-gray-400 mb-1">Соперник</div>
          <div className="text-[#e6eff5] font-semibold">{opponent.nickname}</div>
          <div className="mt-2">
            <ClassBadge className={opponent.className} emptyLabel="Класс не указан" textClassName="text-green-300 text-xs" iconSizeClassName="h-7 w-7" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="text-sm text-gray-400">
          Твой отчет: <span className="text-[#e6eff5]">{match.yourReport ? (match.yourReport === 'win' ? 'Победа' : 'Поражение') : 'не отправлен'}</span>
          {' · '}
          Отчет соперника: <span className="text-[#e6eff5]">{match.opponentReport ? (match.opponentReport === 'win' ? 'Победа' : 'Поражение') : 'нет'}</span>
        </div>
        {match.status === 'pending' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" className="btn-primary px-4 py-2 w-full sm:w-auto" disabled={isReporting} onClick={() => onReport('win')}>
              {hasReported ? 'Обновить: победа' : 'Сообщить победу'}
            </button>
            <button type="button" className="btn-secondary px-4 py-2 w-full sm:w-auto" disabled={isReporting} onClick={() => onReport('loss')}>
              {hasReported ? 'Обновить: поражение' : 'Сообщить поражение'}
            </button>
          </div>
        )}
      </div>

      {match.status === 'pending' && hasReported && (
        <div className="rounded-2xl ds-section-panel-soft border-green-700/45 bg-green-950/35 px-4 py-3 text-xs text-green-300">
          Твой отчет уже отправлен. При необходимости его можно обновить до подтверждения матча.
        </div>
      )}
    </div>
  );
}

function PvpSectionContent({ user }: PvpSectionProps) {
  const { data, isLoading, error, refetch } = usePvpState();
  const joinQueue = useJoinPvpQueue({
    playerId: user.discordId || user.id || user.nickname || 'self',
    nickname: user.nickname || 'You',
    className: user.className || 'Unknown',
  });
  const leaveQueue = useLeavePvpQueue({
    playerId: user.discordId || user.id || user.nickname || 'self',
    nickname: user.nickname || 'You',
  });
  const reportResult = useReportPvpResult();
  const [actionNotice, setActionNotice] = useState<{ tone: 'error' | 'success'; message: string } | null>(null);

  const reportActionError = (err: unknown) => {
    setActionNotice({ tone: 'error', message: handleApiError(err) });
  };

  const joinQueueAction = async () => {
    try {
      await joinQueue.mutateAsync();
      setActionNotice({ tone: 'success', message: 'Ты в очереди. Ждем соперника.' });
    } catch (err) {
      reportActionError(err);
    }
  };

  const leaveQueueAction = async () => {
    try {
      await leaveQueue.mutateAsync();
      setActionNotice({ tone: 'success', message: 'Активность в PvP снята.' });
    } catch (err) {
      reportActionError(err);
    }
  };

  const reportMatchResult = async (matchId: string, result: 'win' | 'loss') => {
    try {
      await reportResult.mutateAsync({ matchId, result });
      setActionNotice({ tone: 'success', message: 'Результат отправлен. Ждем подтверждение второго игрока.' });
    } catch (err) {
      reportActionError(err);
    }
  };

  if (isLoading) {
    return (
      <LoadingState
        title="PvP-комната"
        subtitle="Ищем соперников и обновляем таблицу дуэлей..."
        icon={<WuxiaIcon name="sword" className="w-6 h-6 text-green-300" />}
        skeletonCount={3}
        layout="list"
      />
    );
  }

  if (error || !data) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="PvP недоступно"
        description={error instanceof Error ? error.message : 'Не удалось загрузить PvP-секцию'}
        action={<button onClick={() => refetch()} className="btn-primary">Повторить</button>}
        variant="error"
      />
    );
  }

  const canJoinQueue = !data.userInQueue && !data.activeMatch;
  const viewerId = user.discordId || user.id || user.nickname || '';
  const currentQueueEntry = data.queue.find((entry) => entry.playerId === viewerId || entry.nickname === user.nickname);

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="section-stack-lg">
        <SectionHero
          icon={<WuxiaIcon name="sword" className="w-5 h-5" />}
          title="PvP-комната"
          subtitle="Очередь дуэлей по модели DiscordBot2: встаешь в очередь, получаешь соперника, оба подтверждают итог — рейтинг обновляется только после совпадения отчетов."
          chips={['Queue', 'Matchmaking', 'ELO']}
        />

        {actionNotice && (
          <div
            className={`ds-notice ${
              actionNotice.tone === 'error'
                ? 'ds-notice-error'
                : 'ds-notice-success'
            }`}
          >
            <WuxiaIcon
              name={actionNotice.tone === 'error' ? 'alertTriangle' : 'checkCircle'}
              className="inline-block w-4 h-4 mr-2 align-text-bottom"
            />
            {actionNotice.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2 section-stack-md">
            <div className="card section-card ds-section-panel p-5 sm:p-6 space-y-5">
              {data.userInQueue && currentQueueEntry?.joinedAt && !data.activeMatch && (
                <QueueSearchBanner joinedAt={currentQueueEntry.joinedAt} queueSize={data.queue.length} />
              )}

              <div>
                <div className="text-sm uppercase tracking-widest text-green-300 mb-2">Твой статус</div>
                <div className="text-2xl font-bold font-orbitron text-[#e6eff5]">
                  {data.activeMatch ? 'Матч найден' : data.userInQueue ? 'В очереди' : 'Готов к подбору'}
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Очередь сейчас: {data.queue.length} {data.queue.length === 1 ? 'игрок' : 'игроков'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl ds-section-panel-soft border-green-700/40 bg-green-950/35 p-4">
                  <div className="text-gray-400 mb-1">Рейтинг</div>
                  <div className="text-[#e6eff5] font-semibold">{data.userRating?.rating ?? 1000}</div>
                </div>
                <div className="rounded-2xl ds-section-panel-soft border-green-700/40 bg-green-950/35 p-4">
                  <div className="text-gray-400 mb-1">W / L</div>
                  <div className="text-[#e6eff5] font-semibold">{data.userRating?.wins ?? 0} / {data.userRating?.losses ?? 0}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="btn-primary flex-1 py-3"
                  disabled={!canJoinQueue || joinQueue.isPending}
                  onClick={() => void joinQueueAction()}
                >
                  {joinQueue.isPending ? 'Ставим в очередь...' : 'Встать в очередь'}
                </button>
                <button
                  type="button"
                  className="btn-secondary flex-1 py-3"
                  disabled={(!data.userInQueue && !data.activeMatch) || leaveQueue.isPending}
                  onClick={() => void leaveQueueAction()}
                >
                  {leaveQueue.isPending ? 'Выходим...' : data.activeMatch ? 'Снять активность' : 'Покинуть очередь'}
                </button>
              </div>

              {data.activeMatch && (
                <div className="rounded-2xl ds-section-panel-soft ds-notice-warning border-yellow-700/40 bg-yellow-900/15 p-4 text-xs">
                  Новый вход в очередь временно заблокирован, пока активный матч не будет подтвержден или закрыт.
                </div>
              )}

              <div className="rounded-2xl ds-section-panel-soft border-dashed border-green-700/45 bg-green-950/30 p-4 text-sm text-gray-300">
                Если второй игрок уже ждет, матч появится сразу. Если оба игрока отправят одинаковый результат, ELO обновится автоматически.
              </div>
            </div>

            <div className="card section-card ds-section-panel p-5 sm:p-6">
              <div className="text-sm uppercase tracking-widest text-green-300 mb-4">Очередь</div>
              <div className="space-y-3">
                {data.queue.length === 0 ? (
                  <div className="text-sm text-gray-400">Очередь пуста — можно стартовать первым.</div>
                ) : (
                  data.queue.map((entry, index) => (
                    <div key={`${entry.playerId}-${entry.joinedAt}`} className="rounded-2xl ds-section-panel-soft border-green-700/40 bg-green-950/35 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="text-[#e6eff5] font-medium">#{index + 1} {entry.nickname}</div>
                        <div className="mt-1">
                          <ClassBadge className={entry.className} emptyLabel="Класс не указан" textClassName="text-xs text-green-300" iconSizeClassName="h-7 w-7" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 whitespace-nowrap">{formatDateTime(entry.joinedAt)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 section-stack-md">
            {data.activeMatch ? (
              <MatchCard
                match={data.activeMatch}
                user={user}
                isReporting={reportResult.isPending}
                onReport={async (result) => {
                  await reportMatchResult(data.activeMatch!.id, result);
                }}
              />
            ) : (
              <div className="card section-card ds-section-panel p-5 sm:p-6 text-sm text-gray-400">
                Активного матча нет. Вставай в очередь, чтобы система подобрала ближайшего соперника по FIFO.
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <div className="card section-card ds-section-panel p-5 sm:p-6">
                <div className="text-sm uppercase tracking-widest text-green-300 mb-4">Топ рейтинга</div>
                <div className="space-y-3">
                  {data.leaderboard.length === 0 ? (
                    <div className="text-sm text-gray-400">Рейтинг еще не заполнен.</div>
                  ) : (
                    data.leaderboard.map((entry, index) => (
                      <div key={entry.playerId} className="rounded-2xl ds-section-panel-soft border-green-700/40 bg-green-950/35 p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[#e6eff5] font-medium">#{index + 1} {entry.nickname}</div>
                          <div className="text-xs text-gray-400 mt-1">W {entry.wins} / L {entry.losses}</div>
                        </div>
                        <div className="text-lg font-semibold text-green-300">{entry.rating}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="card section-card ds-section-panel p-5 sm:p-6">
                <div className="text-sm uppercase tracking-widest text-green-300 mb-4">Последние подтвержденные матчи</div>
                <div className="space-y-3">
                  {data.recentMatches.length === 0 ? (
                    <div className="text-sm text-gray-400">Пока нет завершенных дуэлей.</div>
                  ) : (
                    data.recentMatches.map((match) => (
                      <div key={match.id} className="rounded-2xl ds-section-panel-soft border-green-700/40 bg-green-950/35 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="text-[#e6eff5] font-medium">{match.playerOne.nickname} vs {match.playerTwo.nickname}</div>
                          <div className="text-xs text-gray-400">{formatDateTime(match.confirmedAt || match.updatedAt)}</div>
                        </div>
                        <div className="text-xs text-green-300 mt-2">
                          Победитель: {match.winnerId === match.playerOne.id ? match.playerOne.nickname : match.winnerId === match.playerTwo.id ? match.playerTwo.nickname : '—'}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default function PvpSection(props: PvpSectionProps) {
  return (
    <ErrorBoundary>
      <PvpSectionContent {...props} />
    </ErrorBoundary>
  );
}
