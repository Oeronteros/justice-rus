'use client';

import WuxiaIcon from '@/components/WuxiaIcons';
import type { ResponseTemplate } from '@/lib/schemas/workflow';

interface TemplateSelectorProps {
  category: 'help' | 'absence' | 'general';
  onSelect: (content: string) => void;
  templates: ResponseTemplate[];
}

export function TemplateSelector({ category, onSelect, templates }: TemplateSelectorProps) {
  const categoryTemplates = templates.filter((t) => t.category === category);

  if (categoryTemplates.length === 0) {
    return (
      <div className="text-xs text-gray-400 py-2">
        Нет шаблонов для этой категории
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-[#bcd6e5] mb-2">Шаблоны ответов</div>
      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
        {categoryTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.content)}
            className="text-left p-3 rounded-lg bg-[#101a23]/65 border border-[#2a3c4c]/60 hover:border-[#2f6e8d]/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-[#e6eff5]">{template.name}</span>
              <span className="text-xs text-gray-400">
                {template.usageCount} исп.
              </span>
            </div>
            <div className="text-xs text-gray-400 line-clamp-2">
              {template.content}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
