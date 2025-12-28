'use client';

import { useEffect, useMemo, useState } from 'react';
import { HelpRequest, User } from '@/types';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '../WuxiaIcons';

interface HelpSectionProps {
  user: User;
}

export default function HelpSection({ user }: HelpSectionProps) {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'open' | 'closed' | 'all'>('open');
  const [submitting, setSubmitting] = useState(false);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('general');

  const canModerate = user.role === 'officer' || user.role === 'gm';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('dc_help_author');
    if (stored) setAuthor(stored);
  }, []);

  useEffect(() => {
    loadRequests();
  }, [status]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/help?status=${status}`, { credentials: 'include' });
      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }
      setRequests(payload as HelpRequest[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить запросы помощи');
      console.error('Failed to load help requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(
    () => [
      { value: 'general', label: 'Общее' },
      { value: 'pve', label: 'PvE / Рейды' },
      { value: 'pvp', label: 'PvP / Дуэли' },
      { value: 'build', label: 'Билд / Сборка' },
      { value: 'farm', label: 'Фарм / Ресурсы' },
      { value: 'craft', label: 'Крафт' },
      { value: 'training', label: 'Тренировки' },
    ],
    []
  );

  const submitRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !details.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      if (typeof window !== 'undefined') {
        localStorage.setItem('dc_help_author', author.trim());
      }

      const response = await fetch('/api/help', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          details,
          category,
          author: author.trim() || undefined,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }

      setRequests((prev) => [payload as HelpRequest, ...prev]);
      setTitle('');
      setDetails('');
      setCategory('general');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось создать запрос');
      console.error('Failed to create help request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (requestId: string, next: 'open' | 'closed') => {
    try {
      const response = await fetch('/api/help', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: requestId, status: next }),
      });
      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }
      setRequests((prev) => prev.map((r) => (r.id === requestId ? (payload as HelpRequest) : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось обновить статус');
      console.error('Failed to update help request:', err);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon name="help" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            Запросы помощи
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Создавай запросы на помощь по билдам, дуэлям, фарму и рейдам. Орден отвечает быстро — когда ты формулируешь чётко.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 card p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2f6e8d]/30 to-[#8fb9cc]/30 rounded-full flex items-center justify-center mr-4">
                <WuxiaIcon name="plus" className="w-7 h-7 text-[#8fb9cc]" />
              </div>
              <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">Создать запрос</h3>
            </div>

            <form onSubmit={submitRequest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Твой ник (желательно)"
                  className="input-field"
                  maxLength={60}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select-field"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Коротко: что нужно?"
                className="input-field"
                maxLength={140}
                required
              />

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Подробно: билд/класс/ситуация/что уже пробовал. Чем точнее — тем быстрее ответ."
                className="input-field min-h-[140px]"
                maxLength={5000}
                required
              />

              <button type="submit" className="btn-primary w-full py-3" disabled={submitting}>
                {submitting ? (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
                    Отправляем...
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="seal" className="w-4 h-4 mr-3" />
                    Вызвать орден
                  </span>
                )}
              </button>

              {error && (
                <div className="text-[#bcd6e5] text-sm mt-2 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
                  <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                  {error}
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Показать:</span>
                <div className="inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70">
                  {(['open', 'closed', 'all'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStatus(value)}
                      className={`px-3 py-2 text-sm rounded-2xl transition-colors ${
                        status === value ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'
                      }`}
                    >
                      {value === 'open' ? 'Открытые' : value === 'closed' ? 'Закрытые' : 'Все'}
                    </button>
                  ))}
                </div>
              </div>

              <button type="button" className="dc-icon-btn p-2.5 rounded-xl" onClick={loadRequests} title="Обновить">
                <WuxiaIcon name="refresh" className="w-5 h-5" />
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card p-6">
                    <div className="h-5 bg-gray-800 rounded w-2/3 animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-800 rounded w-full animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : requests.length === 0 ? (
              <div className="card p-10 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-[#101922]/70 border border-[#223544]/60 grid place-items-center">
                    <WuxiaIcon name="seal" className="w-8 h-8 text-[#8fb9cc]" />
                  </div>
                </div>
                <div className="text-xl font-semibold text-[#e6eff5]">Тишина в зале ритуалов</div>
                <p className="text-gray-400 mt-2">Пока нет запросов. Открой первый — и орден откликнется.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {requests.map((req) => (
                  <div key={req.id} className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                            <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                            {req.category}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              req.status === 'closed'
                                ? 'bg-[#0f1720]/70 text-gray-400 border border-[#223140]/70'
                                : 'bg-[#183244]/70 text-[#e6eff5] border border-[#2f6e8d]/50'
                            }`}
                          >
                            {req.status === 'closed' ? 'Закрыт' : 'Открыт'}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold font-orbitron text-[#e6eff5] mb-2 break-words">
                          {req.title}
                        </h3>
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{req.details}</p>
                      </div>

                      <div className="sm:text-right text-sm text-gray-400 flex sm:flex-col gap-3 sm:gap-1 justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2">
                            <WuxiaIcon name="user" className="w-4 h-4" />
                            <span>{req.author}</span>
                          </div>
                          <div className="inline-flex items-center gap-2 mt-1">
                            <WuxiaIcon name="calendar" className="w-4 h-4" />
                            <span>{formatDate(req.createdAt)}</span>
                          </div>
                        </div>

                        {canModerate && (
                          <button
                            type="button"
                            className="text-sm font-medium text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors"
                            onClick={() => toggleStatus(req.id, req.status === 'closed' ? 'open' : 'closed')}
                          >
                            <WuxiaIcon
                              name={req.status === 'closed' ? 'redo' : 'checkCircle'}
                              className="inline-block w-4 h-4 mr-2 align-text-bottom"
                            />
                            {req.status === 'closed' ? 'Открыть снова' : 'Закрыть'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
