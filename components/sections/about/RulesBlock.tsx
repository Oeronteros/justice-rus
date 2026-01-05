'use client';

import { useEffect, useState } from 'react';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useUser } from '@/lib/auth/context';
import type { Language } from '@/lib/i18n';

interface Rule {
  id: number;
  text_ru: string;
  text_en: string;
  order_index: number;
}

interface RulesBlockProps {
  language: Language;
}

export default function RulesBlock({ language }: RulesBlockProps) {
  const user = useUser();
  const isAdmin = user.role === 'gm' || user.role === 'officer';
  
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRules, setEditingRules] = useState<Rule[]>([]);

  // Загружаем правила из API
  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rules');
      
      if (!response.ok) {
        throw new Error('Failed to load rules');
      }
      
      const data = await response.json();
      setRules(data);
    } catch (err) {
      console.error('Error loading rules:', err);
      setError(language === 'ru' ? 'Не удалось загрузить правила' : 'Failed to load rules');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = () => {
    setEditingRules([...rules]);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditingRules([]);
    setIsEditing(false);
  };

  const saveRules = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const filtered = editingRules.filter(r => r.text_ru.trim() || r.text_en.trim());
      
      const response = await fetch('/api/rules', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: filtered }),
      });

      if (!response.ok) {
        throw new Error('Failed to save rules');
      }

      const data = await response.json();
      setRules(data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving rules:', err);
      setError(language === 'ru' ? 'Не удалось сохранить правила' : 'Failed to save rules');
    } finally {
      setSaving(false);
    }
  };

  const updateRule = (id: number, field: 'text_ru' | 'text_en', value: string) => {
    setEditingRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRule = () => {
    const newId = -Date.now(); // Временный отрицательный ID для новых правил
    setEditingRules(prev => [...prev, { id: newId, text_ru: '', text_en: '', order_index: prev.length + 1 }]);
  };

  const removeRule = (id: number) => {
    setEditingRules(prev => prev.filter(r => r.id !== id));
  };

  const moveRule = (id: number, direction: 'up' | 'down') => {
    setEditingRules(prev => {
      const idx = prev.findIndex(r => r.id === id);
      if (idx === -1) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === prev.length - 1) return prev;
      
      const newRules = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      [newRules[idx], newRules[swapIdx]] = [newRules[swapIdx], newRules[idx]];
      return newRules;
    });
  };

  if (loading) {
    return (
      <div className="bg-[#0d1318]/80 backdrop-blur-sm rounded-2xl border border-[#223544]/60 p-6 mt-8">
        <div className="flex items-center gap-2 text-gray-400">
          <WuxiaIcon name="spinner" className="w-5 h-5 animate-spin" />
          {language === 'ru' ? 'Загрузка правил...' : 'Loading rules...'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1318]/80 backdrop-blur-sm rounded-2xl border border-[#223544]/60 p-6 mt-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <WuxiaIcon name="book" className="w-5 h-5 text-[#8fb9cc]" />
          {language === 'ru' ? 'Правила гильдии' : 'Guild Rules'}
        </h3>
        
        {isAdmin && !isEditing && (
          <button
            onClick={startEditing}
            className="text-sm text-[#8fb9cc] hover:text-white flex items-center gap-1 transition-colors"
          >
            <WuxiaIcon name="edit" className="w-4 h-4" />
            {language === 'ru' ? 'Редактировать' : 'Edit'}
          </button>
        )}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Режим просмотра */}
      {!isEditing && (
        <ol className="space-y-3">
          {rules.map((rule, idx) => (
            <li key={rule.id} className="flex gap-3 text-gray-300">
              <span className="text-[#8fb9cc] font-semibold w-6 flex-shrink-0">{idx + 1}.</span>
              <span>{language === 'ru' ? rule.text_ru : rule.text_en}</span>
            </li>
          ))}
          {rules.length === 0 && (
            <li className="text-gray-500 italic">
              {language === 'ru' ? 'Правила не заданы' : 'No rules set'}
            </li>
          )}
        </ol>
      )}

      {/* Режим редактирования */}
      {isEditing && (
        <div className="space-y-4">
          {editingRules.map((rule, idx) => (
            <div key={rule.id} className="bg-[#1a2530]/50 rounded-xl p-4 border border-[#223544]/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#8fb9cc] font-semibold">#{idx + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveRule(rule.id, 'up')}
                    disabled={idx === 0}
                    className="p-1 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Вверх"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveRule(rule.id, 'down')}
                    disabled={idx === editingRules.length - 1}
                    className="p-1 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Вниз"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeRule(rule.id)}
                    className="p-1 text-red-400 hover:text-red-300 ml-2"
                    title="Удалить"
                  >
                    <WuxiaIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">🇷🇺 Русский</label>
                  <input
                    type="text"
                    value={rule.text_ru}
                    onChange={(e) => updateRule(rule.id, 'text_ru', e.target.value)}
                    placeholder="Текст правила на русском..."
                    className="w-full bg-[#0d1318] border border-[#223544]/60 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#8fb9cc]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">🇬🇧 English</label>
                  <input
                    type="text"
                    value={rule.text_en}
                    onChange={(e) => updateRule(rule.id, 'text_en', e.target.value)}
                    placeholder="Rule text in English..."
                    className="w-full bg-[#0d1318] border border-[#223544]/60 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#8fb9cc]"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Кнопка добавления */}
          <button
            onClick={addRule}
            className="w-full py-3 border-2 border-dashed border-[#223544]/60 rounded-xl text-gray-500 hover:text-[#8fb9cc] hover:border-[#8fb9cc]/50 transition-colors flex items-center justify-center gap-2"
          >
            <WuxiaIcon name="plus" className="w-5 h-5" />
            {language === 'ru' ? 'Добавить правило' : 'Add rule'}
          </button>

          {/* Кнопки сохранения */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={cancelEditing}
              disabled={saving}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {language === 'ru' ? 'Отмена' : 'Cancel'}
            </button>
            <button
              onClick={saveRules}
              disabled={saving}
              className="px-4 py-2 bg-[#8fb9cc] text-[#0a1118] rounded-lg font-medium hover:bg-[#a5c9d9] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <WuxiaIcon name="spinner" className="w-4 h-4 animate-spin" />}
              {language === 'ru' ? 'Сохранить' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
