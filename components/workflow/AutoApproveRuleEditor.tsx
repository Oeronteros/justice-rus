'use client';

import { useState } from 'react';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { AutoApproveRule } from '@/lib/schemas/workflow';

interface AutoApproveRuleEditorProps {
  rule?: AutoApproveRule;
  onSave: (rule: Omit<AutoApproveRule, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function AutoApproveRuleEditor({ rule, onSave, onCancel }: AutoApproveRuleEditorProps) {
  const [name, setName] = useState(rule?.name || '');
  const [enabled, setEnabled] = useState(rule?.enabled ?? true);
  const [maxDuration, setMaxDuration] = useState(rule?.conditions.maxDuration?.toString() || '');
  const [autoApprove, setAutoApprove] = useState(rule?.action.autoApprove ?? true);
  const [notifyOfficer, setNotifyOfficer] = useState(rule?.action.notifyOfficer ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      enabled,
      conditions: {
        maxDuration: maxDuration ? parseInt(maxDuration, 10) : undefined,
      },
      action: {
        autoApprove,
        notifyOfficer,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#bcd6e5] mb-1">Название правила</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field w-full"
          placeholder="Например: Авто-одобрение на 1 день"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-[#e6eff5]">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="rounded border-[#2a3c4c] bg-[#101a23] text-[#2d5a3f]"
          />
          Активно
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#bcd6e5] mb-1">
          Максимальная длительность (часы)
        </label>
        <input
          type="number"
          value={maxDuration}
          onChange={(e) => setMaxDuration(e.target.value)}
          className="input-field w-full"
          placeholder="24"
          min="1"
        />
        <p className="text-xs text-gray-400 mt-1">Оставьте пустым для любой длительности</p>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-[#e6eff5]">
          <input
            type="checkbox"
            checked={autoApprove}
            onChange={(e) => setAutoApprove(e.target.checked)}
            className="rounded border-[#2a3c4c] bg-[#101a23] text-[#2d5a3f]"
          />
          Автоматически одобрять
        </label>
        <label className="flex items-center gap-2 text-sm text-[#e6eff5]">
          <input
            type="checkbox"
            checked={notifyOfficer}
            onChange={(e) => setNotifyOfficer(e.target.checked)}
            className="rounded border-[#2a3c4c] bg-[#101a23] text-[#2d5a3f]"
          />
          Уведомлять офицера
        </label>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-[#2a3c4c]/60">
        <button type="submit" className="btn-primary">
          Сохранить
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Отмена
        </button>
      </div>
    </form>
  );
}
