'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import { PrefixBadge } from '@/components/PrefixBadge';
import { SectionHero } from '@/components/shared/SectionHero';
import { ClassBadge } from '@/components/ClassIcon';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useJoinPvpQueue, useLeavePvpQueue, usePvpState, useReportPvpResult } from '@/lib/pvp/hooks';
import type { PvpMatch } from '@/lib/schemas/pvp';
import type { User } from '@/lib/schemas/auth';
import { handleApiError } from '@/lib/api/errors';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { opsStyles } from '@/components/sections/ops/Ops.stylex';
import { pvpStyles } from './Pvp.stylex';

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
    <div {...stylex.props(pvpStyles.matchmakingBanner)}>
      <div {...stylex.props(pvpStyles.fxLayer)} aria-hidden="true">
        <span {...stylex.props(pvpStyles.pulse)} />
        <span {...stylex.props(pvpStyles.pulse, pvpStyles.pulseDelayed)} />
        <span {...stylex.props(pvpStyles.scan)} />
      </div>

      <div {...stylex.props(pvpStyles.matchmakingContent)}>
        <div {...stylex.props(pvpStyles.matchmakingStatus)}>
          <span {...stylex.props(pvpStyles.matchmakingDot)} />
          Поиск матча
        </div>

        <div {...stylex.props(pvpStyles.matchmakingTimer)}>{formatDuration(elapsed)}</div>

        <div {...stylex.props(pvpStyles.matchmakingMeta)}>
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
    <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, pvpStyles.matchCard)}>
      <div {...stylex.props(pvpStyles.matchHeader)}>
        <div>
          <div {...stylex.props(pvpStyles.matchKicker)}>Текущий матч</div>
          <div {...stylex.props(pvpStyles.matchTitle)}>{you.nickname} vs {opponent.nickname}</div>
          <div {...stylex.props(pvpStyles.matchMeta)}>Создан: {formatDateTime(match.createdAt)}</div>
        </div>
        <div {...stylex.props(uiStyles.badge, uiStyles.badgeSuccess)}>
          <WuxiaIcon name="sword" {...stylex.props(uiStyles.iconSm)} />
          {match.confirmationStatus === 'confirmed'
            ? 'Подтверждено'
            : match.confirmationStatus === 'disputed'
              ? 'Есть спор'
              : match.confirmationStatus === 'waiting'
                ? 'Ждем второго игрока'
                : 'Результат не отправлен'}
        </div>
      </div>

      <div {...stylex.props(pvpStyles.duelGrid)}>
        <div {...stylex.props(pvpStyles.duelCard)}>
          <div {...stylex.props(pvpStyles.duelLabel)}>Ты</div>
          <div {...stylex.props(pvpStyles.duelNameRow)}>
            <span>{you.nickname}</span>
            <PrefixBadge prefix={you.prefix} variant="compact" />
          </div>
          <div style={{ marginTop: 8 }}>
            <ClassBadge className={you.className} emptyLabel="Класс не указан" textClassName="text-green-300 text-xs" iconSizeClassName="h-7 w-7" />
          </div>
        </div>
        <div {...stylex.props(pvpStyles.duelCard)}>
          <div {...stylex.props(pvpStyles.duelLabel)}>Соперник</div>
          <div {...stylex.props(pvpStyles.duelNameRow)}>
            <span>{opponent.nickname}</span>
            <PrefixBadge prefix={opponent.prefix} variant="compact" />
          </div>
          <div style={{ marginTop: 8 }}>
            <ClassBadge className={opponent.className} emptyLabel="Класс не указан" textClassName="text-green-300 text-xs" iconSizeClassName="h-7 w-7" />
          </div>
        </div>
      </div>

      <div {...stylex.props(pvpStyles.reportRow)}>
        <div {...stylex.props(pvpStyles.reportText)}>
          Твой отчет: <span {...stylex.props(pvpStyles.reportAccent)}>{match.yourReport ? (match.yourReport === 'win' ? 'Победа' : 'Поражение') : 'не отправлен'}</span>
          {' · '}
          Отчет соперника: <span {...stylex.props(pvpStyles.reportAccent)}>{match.opponentReport ? (match.opponentReport === 'win' ? 'Победа' : 'Поражение') : 'нет'}</span>
        </div>
        {match.status === 'pending' && (
          <div {...stylex.props(pvpStyles.reportButtons)}>
            <button type="button" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)} style={{ padding: '8px 16px', width: '100%' }} disabled={isReporting} onClick={() => onReport('win')}>
              {hasReported ? 'Обновить: победа' : 'Сообщить победу'}
            </button>
            <button type="button" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)} style={{ padding: '8px 16px', width: '100%' }} disabled={isReporting} onClick={() => onReport('loss')}>
              {hasReported ? 'Обновить: поражение' : 'Сообщить поражение'}
            </button>
          </div>
        )}
      </div>

      {match.status === 'pending' && hasReported && (
        <div {...stylex.props(pvpStyles.reportNotice)}>
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
    prefix: user.prefix || null,
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
        icon={<WuxiaIcon name="sword" {...stylex.props(uiStyles.iconLg, uiStyles.iconSuccess)} />}
        skeletonCount={3}
        layout="list"
      />
    );
  }

  if (error || !data) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" {...stylex.props(uiStyles.iconXl, uiStyles.iconDanger)} />}
        title="PvP недоступно"
        description={error instanceof Error ? error.message : 'Не удалось загрузить PvP-секцию'}
        action={<button onClick={() => refetch()} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}>Повторить</button>}
        variant="error"
      />
    );
  }

  const canJoinQueue = !data.userInQueue && !data.activeMatch;
  const viewerId = user.discordId || user.id || user.nickname || '';
  const currentQueueEntry = data.queue.find((entry) => entry.playerId === viewerId || entry.nickname === user.nickname);

  return (
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <div {...stylex.props(uiStyles.stackLg)}>
        <SectionHero
          icon={<WuxiaIcon name="sword" {...stylex.props(uiStyles.iconMd)} />}
          title="PvP-комната"
          subtitle="Очередь дуэлей по модели DiscordBot2: встаешь в очередь, получаешь соперника, оба подтверждают итог — рейтинг обновляется только после совпадения отчетов."
          chips={['Queue', 'Matchmaking', 'ELO']}
        />

        {actionNotice && (
          <div
            {...stylex.props(uiStyles.notice, actionNotice.tone === 'error' ? uiStyles.noticeError : uiStyles.noticeSuccess)}
          >
            <WuxiaIcon
              name={actionNotice.tone === 'error' ? 'alertTriangle' : 'checkCircle'}
              {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)}
            />
            {actionNotice.message}
          </div>
        )}

        <div {...stylex.props(opsStyles.splitGrid)}>
          <div {...stylex.props(opsStyles.sideCol, opsStyles.listStack)}>
            <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, opsStyles.panel, opsStyles.listStack)}>
              {data.userInQueue && currentQueueEntry?.joinedAt && !data.activeMatch && (
                <QueueSearchBanner joinedAt={currentQueueEntry.joinedAt} queueSize={data.queue.length} />
              )}

              <div>
                <div {...stylex.props(opsStyles.fieldLabel)} style={{ color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>Твой статус</div>
                <div {...stylex.props(opsStyles.panelTitle)}>
                  {data.activeMatch ? 'Матч найден' : data.userInQueue ? 'В очереди' : 'Готов к подбору'}
                </div>
                <div {...stylex.props(opsStyles.helperInline)} style={{ marginTop: 8 }}>
                  Очередь сейчас: {data.queue.length} {data.queue.length === 1 ? 'игрок' : 'игроков'}
                </div>
              </div>

              <div {...stylex.props(opsStyles.fieldGrid2)} data-testid="pvp-stats">
                <div {...stylex.props(opsStyles.statCard)}>
                  <div {...stylex.props(opsStyles.statLabel)}>Рейтинг</div>
                  <div {...stylex.props(opsStyles.statValue)}>{data.userRating?.rating ?? 1000}</div>
                </div>
                <div {...stylex.props(opsStyles.statCard)}>
                  <div {...stylex.props(opsStyles.statLabel)}>W / L</div>
                  <div {...stylex.props(opsStyles.statValue)}>{data.userRating?.wins ?? 0} / {data.userRating?.losses ?? 0}</div>
                </div>
              </div>

              <div {...stylex.props(opsStyles.actionRow)}>
                <button
                  type="button"
                  {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                  style={{ flex: 1, minHeight: 48 }}
                  disabled={!canJoinQueue || joinQueue.isPending}
                  onClick={() => void joinQueueAction()}
                  data-testid="pvp-queue-button"
                >
                  {joinQueue.isPending ? 'Ставим в очередь...' : 'Встать в очередь'}
                </button>
                <button
                  type="button"
                  {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
                  style={{ flex: 1, minHeight: 48 }}
                  disabled={(!data.userInQueue && !data.activeMatch) || leaveQueue.isPending}
                  onClick={() => void leaveQueueAction()}
                >
                  {leaveQueue.isPending ? 'Выходим...' : data.activeMatch ? 'Снять активность' : 'Покинуть очередь'}
                </button>
              </div>

              {data.activeMatch && (
                <div {...stylex.props(uiStyles.notice, uiStyles.badgeWarning)}>
                  Новый вход в очередь временно заблокирован, пока активный матч не будет подтвержден или закрыт.
                </div>
              )}

              <div {...stylex.props(opsStyles.bodyCard)}>
                Если второй игрок уже ждет, матч появится сразу. Если оба игрока отправят одинаковый результат, ELO обновится автоматически.
              </div>
            </div>

            <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, opsStyles.panel)}>
              <div {...stylex.props(opsStyles.fieldLabel)} style={{ color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>Очередь</div>
              <div {...stylex.props(opsStyles.listStack)}>
                {data.queue.length === 0 ? (
                  <div {...stylex.props(opsStyles.helperInline)}>Очередь пуста — можно стартовать первым.</div>
                ) : (
                  data.queue.map((entry, index) => (
                    <div key={`${entry.playerId}-${entry.joinedAt}`} {...stylex.props(opsStyles.toolbarSurface)}>
                      <div>
                        <div {...stylex.props(opsStyles.actionRow)} style={{ color: '#e6eff5', fontWeight: 500 }}>
                          <span>#{index + 1} {entry.nickname}</span>
                          <PrefixBadge prefix={entry.prefix} variant="compact" />
                        </div>
                        <div className="mt-1">
                          <ClassBadge className={entry.className} emptyLabel="Класс не указан" textClassName="text-xs text-green-300" iconSizeClassName="h-7 w-7" />
                        </div>
                      </div>
                      <div {...stylex.props(opsStyles.helperInline)} style={{ whiteSpace: 'nowrap' }}>{formatDateTime(entry.joinedAt)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div {...stylex.props(opsStyles.mainCol, opsStyles.listStack)}>
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
              <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, opsStyles.panel)}>
                Активного матча нет. Вставай в очередь, чтобы система подобрала ближайшего соперника по FIFO.
              </div>
            )}

            <div {...stylex.props(opsStyles.fieldGrid2)}>
              <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, opsStyles.panel)}>
                <div {...stylex.props(opsStyles.fieldLabel)} style={{ color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>Топ рейтинга</div>
                <div {...stylex.props(opsStyles.listStack)}>
                  {data.leaderboard.length === 0 ? (
                    <div {...stylex.props(opsStyles.helperInline)}>Рейтинг еще не заполнен.</div>
                  ) : (
                    data.leaderboard.map((entry, index) => (
                      <div key={entry.playerId} {...stylex.props(opsStyles.toolbarSurface)}>
                        <div>
                          <div {...stylex.props(opsStyles.actionRow)} style={{ color: '#e6eff5', fontWeight: 500 }}>
                            <span>#{index + 1} {entry.nickname}</span>
                            <PrefixBadge prefix={entry.prefix} variant="compact" />
                          </div>
                          <div {...stylex.props(opsStyles.helperInline)} style={{ marginTop: 4 }}>W {entry.wins} / L {entry.losses}</div>
                        </div>
                        <div {...stylex.props(opsStyles.statValue)} style={{ color: '#86efac' }}>{entry.rating}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, opsStyles.panel)}>
                <div {...stylex.props(opsStyles.fieldLabel)} style={{ color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>Последние подтвержденные матчи</div>
                <div {...stylex.props(opsStyles.listStack)}>
                  {data.recentMatches.length === 0 ? (
                    <div {...stylex.props(opsStyles.helperInline)}>Пока нет завершенных дуэлей.</div>
                  ) : (
                    data.recentMatches.map((match) => (
                      <div key={match.id} {...stylex.props(opsStyles.bodyCard)}>
                        <div {...stylex.props(opsStyles.toolbar)}>
                          <div {...stylex.props(opsStyles.actionRow)} style={{ color: '#e6eff5', fontWeight: 500 }}>
                            <span>{match.playerOne.nickname}</span>
                            <PrefixBadge prefix={match.playerOne.prefix} variant="compact" />
                            <span className="text-gray-500">vs</span>
                            <span>{match.playerTwo.nickname}</span>
                            <PrefixBadge prefix={match.playerTwo.prefix} variant="compact" />
                          </div>
                          <div {...stylex.props(opsStyles.helperInline)}>{formatDateTime(match.confirmedAt || match.updatedAt)}</div>
                        </div>
                        <div {...stylex.props(opsStyles.helperInline)} style={{ color: '#86efac', marginTop: 8 }}>
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
