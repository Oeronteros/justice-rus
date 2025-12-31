'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { User } from '@/types';
import { formatDate } from '@/lib/utils';
import { markdownToHtml } from '@/lib/markdown';
import WuxiaIcon from '../WuxiaIcons';

interface GuidesSectionProps {
  user: User;
}

type GuideSummary = {
  id: string;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  votes: number;
  commentsCount: number;
};

type GuideComment = {
  id: string;
  author: string;
  comment: string;
  createdAt: string;
};

type GuideDetail = {
  guide: {
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string;
    updatedAt: string;
  };
  votes: number;
  voted: boolean;
  comments: GuideComment[];
};

export default function GuidesSection({ user }: GuidesSectionProps) {
  const canModerate = user.role === 'officer' || user.role === 'gm';

  const [guides, setGuides] = useState<GuideSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const [openGuideId, setOpenGuideId] = useState<string | null>(null);
  const [guideDetail, setGuideDetail] = useState<GuideDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [createTab, setCreateTab] = useState<'write' | 'preview'>('write');
  const [createTitle, setCreateTitle] = useState('');
  const [createCategory, setCreateCategory] = useState('general');
  const [createAuthor, setCreateAuthor] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [creating, setCreating] = useState(false);

  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categories = useMemo(() => Array.from(new Set(guides.map((g) => g.category))), [guides]);

  const filteredGuides = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return guides.filter((guide) => {
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        guide.title.toLowerCase().includes(normalizedSearch) ||
        guide.author.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [guides, search, selectedCategory]);

  const getVoterKey = () => {
    if (typeof window === 'undefined') return 'server';
    const existing = localStorage.getItem('dc_guide_voter');
    if (existing) return existing;
    const generated =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `v_${Math.random().toString(16).slice(2)}_${Date.now()}`;
    localStorage.setItem('dc_guide_voter', generated);
    return generated;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('dc_guide_author');
    if (stored) {
      setCreateAuthor(stored);
      setCommentAuthor(stored);
    }
  }, []);

  useEffect(() => {
    loadGuides();
  }, []);

  useEffect(() => {
    if (createOpen || openGuideId) {
      document.documentElement.style.setProperty('--tilt-x', '0deg');
      document.documentElement.style.setProperty('--tilt-y', '0deg');
    }
  }, [createOpen, openGuideId]);

  const loadGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/guide', { credentials: 'include' });
      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }
      setGuides(payload as GuideSummary[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить гайды');
      console.error('Failed to load guides:', err);
    } finally {
      setLoading(false);
    }
  };

  const openGuide = async (guideId: string) => {
    setOpenGuideId(guideId);
    setDetailError(null);
    setGuideDetail(null);
    setCommentText('');
    setDetailLoading(true);

    try {
      const voterKey = getVoterKey();
      const response = await fetch(`/api/guide/${guideId}?voterKey=${encodeURIComponent(voterKey)}`, {
        credentials: 'include',
      });
      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }
      setGuideDetail(payload as GuideDetail);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'Не удалось загрузить гайд');
      console.error('Failed to load guide:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeGuide = () => {
    setOpenGuideId(null);
    setGuideDetail(null);
    setDetailError(null);
  };

  const applyWrap = (before: string, after: string = before) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const value = textarea.value;
    const selected = value.slice(start, end);
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    setCreateContent(next);

    requestAnimationFrame(() => {
      const cursorStart = start + before.length;
      const cursorEnd = start + before.length + selected.length;
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const applyLinePrefix = (prefix: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const value = textarea.value;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setCreateContent(next);

    requestAnimationFrame(() => {
      const cursor = start + prefix.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер изображения не должен превышать 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const textarea = editorRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart ?? 0;
      const value = textarea.value;
      const imageMarkdown = `\n![Изображение](${base64})\n`;
      const next = value.slice(0, start) + imageMarkdown + value.slice(start);
      setCreateContent(next);

      requestAnimationFrame(() => {
        const cursor = start + imageMarkdown.length;
        textarea.setSelectionRange(cursor, cursor);
        textarea.focus();
      });
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const insertImageUrl = () => {
    const url = prompt('Введите URL изображения:');
    if (!url) return;

    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const value = textarea.value;
    const imageMarkdown = `\n![Изображение](${url})\n`;
    const next = value.slice(0, start) + imageMarkdown + value.slice(start);
    setCreateContent(next);

    requestAnimationFrame(() => {
      const cursor = start + imageMarkdown.length;
      textarea.setSelectionRange(cursor, cursor);
      textarea.focus();
    });
  };

  const submitGuide = async () => {
    if (!createTitle.trim() || !createContent.trim()) return;
    try {
      setCreating(true);
      setError(null);

      if (typeof window !== 'undefined') {
        localStorage.setItem('dc_guide_author', createAuthor.trim());
      }

      const response = await fetch('/api/guide', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: createTitle,
          content: createContent,
          category: createCategory,
          author: createAuthor.trim() || undefined,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }

      setCreateOpen(false);
      setCreateTab('write');
      setCreateTitle('');
      setCreateContent('');
      setCreateCategory('general');

      setGuides((prev) => [payload as GuideSummary, ...prev]);
      await openGuide(String((payload as any).id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось создать гайд');
      console.error('Failed to create guide:', err);
    } finally {
      setCreating(false);
    }
  };

  const submitComment = async () => {
    if (!openGuideId || !commentText.trim()) return;
    try {
      setCommentSubmitting(true);
      setDetailError(null);

      if (typeof window !== 'undefined') {
        localStorage.setItem('dc_guide_author', commentAuthor.trim());
      }

      const response = await fetch(`/api/guide/${openGuideId}/comment`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: commentAuthor.trim() || undefined,
          comment: commentText,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }

      setGuideDetail((prev) => (prev ? { ...prev, comments: [...prev.comments, payload as GuideComment] } : prev));
      setGuides((prev) =>
        prev.map((g) => (g.id === openGuideId ? { ...g, commentsCount: g.commentsCount + 1 } : g))
      );
      setCommentText('');
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'Не удалось отправить комментарий');
      console.error('Failed to create comment:', err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const toggleVote = async () => {
    if (!openGuideId) return;
    try {
      setDetailError(null);
      const voterKey = getVoterKey();
      const response = await fetch(`/api/guide/${openGuideId}/vote`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voterKey }),
      });
      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || `HTTP ${response.status}`);
      }
      const votes = Number(payload?.votes || 0);
      const voted = Boolean(payload?.voted);
      setGuideDetail((prev) => (prev ? { ...prev, votes, voted } : prev));
      setGuides((prev) => prev.map((g) => (g.id === openGuideId ? { ...g, votes } : g)));
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'Не удалось поставить оценку');
      console.error('Failed to vote:', err);
    }
  };

  const closeCreate = () => {
    setCreateOpen(false);
    setCreateTab('write');
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-2">
              <WuxiaIcon name="guides" className="inline-block w-6 h-6 mr-3 text-red-400 align-text-bottom" />
              Гайды ордена
            </h2>
            <p className="text-gray-400">Загружаем свитки знаний...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-6 bg-gray-800 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse mb-4"></div>
                <div className="h-20 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                <WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Гайды недоступны</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button onClick={loadGuides} className="btn-primary">
              <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
              Попробовать снова
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
              <WuxiaIcon name="guides" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
              Гайды ордена
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Пиши свитки. Оценивай печатью. Обсуждай — и делай культ сильнее.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center lg:justify-end">
            <div className="flex gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по названию/автору..."
                className="input-field"
              />

              <button type="button" className="dc-icon-btn p-2.5 rounded-xl" onClick={loadGuides} title="Обновить">
                <WuxiaIcon name="refresh" className="w-5 h-5" />
              </button>
            </div>

            <button type="button" className="btn-primary px-5 py-3" onClick={() => setCreateOpen(true)}>
              <WuxiaIcon name="edit" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
              Написать гайд
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="text-sm text-gray-400">Категория:</span>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="select-field max-w-xs">
              <option value="all">Все</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-500 text-center sm:text-right">
            Всего: <span className="text-gray-300 font-medium">{guides.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <WuxiaIcon name="guides" className="w-10 h-10 text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Ничего не найдено</h3>
              <p className="text-gray-500">Измени фильтр или напиши новый гайд.</p>
            </div>
          ) : (
            filteredGuides.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => openGuide(guide.id)}
                className="card p-6 text-left hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                    <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                    {guide.category}
                  </span>
                  <span className="text-sm text-gray-400">{formatDate(guide.updatedAt)}</span>
                </div>

                <h3 className="text-xl font-bold font-orbitron mb-3 text-[#e6eff5] leading-snug">{guide.title}</h3>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-2">
                    <WuxiaIcon name="user" className="w-4 h-4" />
                    {guide.author}
                  </span>

                  <span className="inline-flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <WuxiaIcon name="seal" className="w-4 h-4 text-[#8fb9cc]" />
                      {guide.votes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <WuxiaIcon name="comment" className="w-4 h-4" />
                      {guide.commentsCount}
                    </span>
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {createOpen && (
        <div className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm flex items-center justify-center px-4 py-10" style={{ perspective: 'none', transform: 'none' }}>
          <div className="card w-full max-w-4xl p-6 md:p-8 relative max-h-[85vh] overflow-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">Новый гайд</h3>
                <p className="text-gray-400 text-sm mt-1">Пиши в Markdown. Предпросмотр покажет итог.</p>
              </div>
              <button type="button" className="dc-icon-btn p-2.5 rounded-xl self-start md:self-auto" onClick={closeCreate}>
                <WuxiaIcon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input value={createAuthor} onChange={(e) => setCreateAuthor(e.target.value)} placeholder="Автор (ник)" className="input-field" />
              <input value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} placeholder="Название гайда" className="input-field md:col-span-2" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <select value={createCategory} onChange={(e) => setCreateCategory(e.target.value)} className="select-field">
                {['general', 'pve', 'pvp', 'build', 'farm', 'craft', 'training'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <div className="inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70">
                <button
                  type="button"
                  onClick={() => setCreateTab('write')}
                  className={`px-3 py-2 text-sm rounded-2xl transition-colors ${createTab === 'write' ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'}`}
                >
                  Писать
                </button>
                <button
                  type="button"
                  onClick={() => setCreateTab('preview')}
                  className={`px-3 py-2 text-sm rounded-2xl transition-colors ${createTab === 'preview' ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'}`}
                >
                  Предпросмотр
                </button>
              </div>
            </div>

            {createTab === 'write' ? (
              <>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('# ')} title="Заголовок H1">
                    H1
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('## ')} title="Заголовок H2">
                    H2
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('### ')} title="Заголовок H3">
                    H3
                  </button>
                  <span className="w-px h-6 bg-gray-700"></span>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('**')} title="Жирный">
                    <strong>B</strong>
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('*')} title="Курсив">
                    <em>I</em>
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('~~')} title="Зачеркнутый">
                    <s>S</s>
                  </button>
                  <span className="w-px h-6 bg-gray-700"></span>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('- ')} title="Список">
                    <WuxiaIcon name="list" className="w-4 h-4" />
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('1. ')} title="Нумерованный список">
                    1.
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('> ')} title="Цитата">
                    <WuxiaIcon name="quote" className="w-4 h-4" />
                  </button>
                  <span className="w-px h-6 bg-gray-700"></span>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('`')} title="Код">
                    <span className="font-mono text-xs">{'<>'}</span>
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('```\n', '\n```')} title="Блок кода">
                    <span className="font-mono text-xs">{'{}'}</span>
                  </button>
                  <span className="w-px h-6 bg-gray-700"></span>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('[текст](', ')')} title="Ссылка">
                    <WuxiaIcon name="link" className="w-4 h-4" />
                  </button>
                  <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={insertImageUrl} title="Вставить URL изображения">
                    <WuxiaIcon name="image" className="w-4 h-4" />
                  </button>
                  <button type="button" className="dc-icon-btn dc-icon-btn-accent p-2 rounded-xl" onClick={handleImageUpload} title="Загрузить изображение">
                    <WuxiaIcon name="upload" className="w-4 h-4" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <textarea
                  ref={editorRef}
                  value={createContent}
                  onChange={(e) => setCreateContent(e.target.value)}
                  className="input-field min-h-[320px] font-mono text-sm leading-relaxed"
                  placeholder="Пиши здесь... Используй кнопки выше для форматирования или загрузки изображений."
                  maxLength={500_000}
                />
              </>
            ) : (
              <div className="card p-6 max-h-[420px] overflow-auto dc-md" dangerouslySetInnerHTML={{ __html: markdownToHtml(createContent) }} />
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
              <button type="button" className="btn-secondary px-5 py-3" onClick={closeCreate} disabled={creating}>
                Отмена
              </button>
              <button type="button" className="btn-primary px-5 py-3" onClick={submitGuide} disabled={creating}>
                {creating ? (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
                    Сохраняем...
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center">
                    <WuxiaIcon name="seal" className="w-4 h-4 mr-3" />
                    Опубликовать
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {openGuideId && (
        <div className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm flex items-center justify-center px-4 py-10" style={{ perspective: 'none', transform: 'none' }}>
          <div className="card w-full max-w-4xl p-6 md:p-8 relative max-h-[85vh] overflow-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                    <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                    {guideDetail?.guide.category || '...'}
                  </span>
                  {guideDetail && <span className="text-sm text-gray-400">{formatDate(guideDetail.guide.updatedAt)}</span>}
                </div>
                <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5] break-words">{guideDetail?.guide.title || 'Загрузка...'}</h3>
                {guideDetail && (
                  <div className="text-sm text-gray-400 mt-2 inline-flex items-center gap-2">
                    <WuxiaIcon name="user" className="w-4 h-4" />
                    {guideDetail.guide.author}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {guideDetail && (
                  <button
                    type="button"
                    className={`dc-icon-btn p-2.5 rounded-xl ${guideDetail.voted ? 'dc-icon-btn-active' : ''}`}
                    onClick={toggleVote}
                    title="Печать одобрения"
                  >
                    <span className="inline-flex items-center gap-2">
                      <WuxiaIcon name="seal" className="w-5 h-5" />
                      <span className="text-sm font-semibold">{guideDetail.votes}</span>
                    </span>
                  </button>
                )}
                <button type="button" className="dc-icon-btn p-2.5 rounded-xl" onClick={closeGuide} title="Закрыть">
                  <WuxiaIcon name="x" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {detailLoading && (
              <div className="card p-6">
                <div className="h-5 bg-gray-800 rounded w-2/3 animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
              </div>
            )}

            {detailError && (
              <div className="text-[#bcd6e5] text-sm mt-2 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
                <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                {detailError}
              </div>
            )}

            {guideDetail && (
              <>
                <div className="card p-6 dc-md" dangerouslySetInnerHTML={{ __html: markdownToHtml(guideDetail.guide.content) }} />

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-[#e6eff5] inline-flex items-center gap-2">
                      <WuxiaIcon name="comment" className="w-5 h-5 text-[#8fb9cc]" />
                      Комментарии
                    </h4>
                    <span className="text-sm text-gray-400">{guideDetail.comments.length}</span>
                  </div>

                  <div className="space-y-4">
                    {guideDetail.comments.length === 0 ? (
                      <div className="text-gray-400 text-sm">Пока тишина. Оставь первый комментарий.</div>
                    ) : (
                      guideDetail.comments.map((c) => (
                        <div key={c.id} className="card p-5">
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                            <span className="inline-flex items-center gap-2">
                              <WuxiaIcon name="user" className="w-4 h-4" />
                              {c.author}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <WuxiaIcon name="calendar" className="w-4 h-4" />
                              {formatDate(c.createdAt)}
                            </span>
                          </div>
                          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{c.comment}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-6 card p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)} placeholder="Твой ник" className="input-field" />
                      <button type="button" onClick={submitComment} disabled={commentSubmitting || !commentText.trim()} className="btn-primary py-3">
                        {commentSubmitting ? (
                          <span className="inline-flex items-center justify-center">
                            <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
                            Отправляем...
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center">
                            <WuxiaIcon name="plus" className="w-4 h-4 mr-3" />
                            Комментировать
                          </span>
                        )}
                      </button>
                    </div>

                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Твой комментарий..."
                      className="input-field min-h-[120px] mt-4"
                      maxLength={3000}
                    />

                    {canModerate && (
                      <div className="mt-4 text-xs text-gray-500">
                        Роль: <span className="text-gray-300">{user.role}</span> (можно будет добавить модерацию/редактирование).
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

