'use client';

import { useState } from 'react';
import { SectionHero } from '@/components/shared/SectionHero';
import { EmptyState } from '@/components/shared/EmptyState';
import WuxiaIcon from '@/components/WuxiaIcons';
import {
  useAutoApproveRules,
  useAutoCloseRules,
  useTemplates,
  useWorkflowSettings,
  useUpdateWorkflowSettings,
  useCreateAutoApproveRule,
  useCreateTemplate,
} from '@/lib/workflow';
import { AutoApproveRuleEditor } from '@/components/workflow';
import { hasRoleAtLeast } from '@/lib/authz';
import { useUser } from '@/lib/auth/context';
import { useLanguage, type Language } from '@/lib/i18n/context';
import { isWorkflowAutomationEnabled } from '@/lib/platform/runtime';

const copy: Record<Language, {
  title: string;
  subtitle: string;
  autoApprove: string;
  autoClose: string;
  templates: string;
  settings: string;
  noRules: string;
  addRule: string;
}> = {
  ru: {
    title: 'Автоматизация',
    subtitle: 'Настройка правил авто-одобрения, авто-закрытия и шаблонов',
    autoApprove: 'Авто-одобрение отсутствий',
    autoClose: 'Авто-закрытие помощи',
    templates: 'Шаблоны ответов',
    settings: 'Общие настройки',
    noRules: 'Нет активных правил',
    addRule: 'Добавить правило',
  },
  en: {
    title: 'Workflow Automation',
    subtitle: 'Configure auto-approval, auto-close rules, and response templates',
    autoApprove: 'Auto-approve Absences',
    autoClose: 'Auto-close Help Requests',
    templates: 'Response Templates',
    settings: 'General Settings',
    noRules: 'No active rules',
    addRule: 'Add Rule',
  },
  zh: {
    title: '工作流自动化',
    subtitle: '配置自动批准、自动关闭规则和响应模板',
    autoApprove: '自动批准请假',
    autoClose: '自动关闭求助',
    templates: '响应模板',
    settings: '常规设置',
    noRules: '无活动规则',
    addRule: '添加规则',
  },
};

const workflowPilotCopy: Record<Language, { title: string; description: string }> = {
  ru: {
    title: 'Автоматизация пока в пилоте',
    description: 'Модуль временно скрыт до подключения серверного workflow API.',
  },
  en: {
    title: 'Automation is in pilot mode',
    description: 'This section is temporarily hidden until server workflow APIs are enabled.',
  },
  zh: {
    title: '自动化功能处于试点阶段',
    description: '在服务器端 workflow API 启用前，此模块暂时不可用。',
  },
};

export default function WorkflowPage() {
  const { language } = useLanguage();
  const user = useUser();
  const canManageWorkflow = hasRoleAtLeast(user.role, 'officer');
  const workflowAutomationEnabled = isWorkflowAutomationEnabled();

  if (!canManageWorkflow) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Automation', 'Officers Only']}
          />
          <EmptyState
            title={language === 'zh' ? '仅限官员' : language === 'en' ? 'Officers Only' : 'Только для офицеров'}
            description={language === 'zh' ? '此页面需要官员或更高权限' : language === 'en' ? 'This page requires officer or higher role' : 'Эта страница требует роли офицера или выше'}
            icon="lock"
          />
        </div>
      </section>
    );
  }

  if (!workflowAutomationEnabled) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Automation', 'Pilot']}
          />
          <EmptyState
            title={workflowPilotCopy[language].title}
            description={workflowPilotCopy[language].description}
            icon="clock"
          />
        </div>
      </section>
    );
  }

  return <WorkflowAutomationContent language={language} />;
}

function WorkflowAutomationContent({ language }: { language: Language }) {
  const [showRuleEditor, setShowRuleEditor] = useState(false);

  const { data: settings, isLoading: settingsLoading } = useWorkflowSettings();
  const { data: autoApproveRules = [] } = useAutoApproveRules();
  const { data: autoCloseRules = [] } = useAutoCloseRules();
  const { data: templates = [] } = useTemplates();

  const updateSettings = useUpdateWorkflowSettings();
  const createRule = useCreateAutoApproveRule();
  const createTemplate = useCreateTemplate();

  if (settingsLoading) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Automation']}
          />
          <div className="text-center text-gray-400 py-12">
            <WuxiaIcon name="schedule" className="w-12 h-12 mx-auto mb-3 animate-pulse" />
            <p>{language === 'zh' ? '加载中...' : language === 'en' ? 'Loading...' : 'Загрузка...'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHero
          icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
          title={copy[language].title}
          subtitle={copy[language].subtitle}
          chips={['Automation', 'Officers']}
        />

        <div className="space-y-6">
          {/* General Settings */}
          <div className="card section-card p-6">
            <h3 className="text-sm font-semibold text-[#bcd6e5] mb-4">{copy[language].settings}</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-[#e6eff5]">{copy[language].autoApprove}</span>
                <input
                  type="checkbox"
                  checked={settings?.autoApproveEnabled ?? false}
                  onChange={(e) => updateSettings.mutate({ ...settings!, autoApproveEnabled: e.target.checked })}
                  className="toggle-switch"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-[#e6eff5]">{copy[language].autoClose}</span>
                <input
                  type="checkbox"
                  checked={settings?.autoCloseEnabled ?? false}
                  onChange={(e) => updateSettings.mutate({ ...settings!, autoCloseEnabled: e.target.checked })}
                  className="toggle-switch"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-[#e6eff5]">{copy[language].templates}</span>
                <input
                  type="checkbox"
                  checked={settings?.templatesEnabled ?? true}
                  onChange={(e) => updateSettings.mutate({ ...settings!, templatesEnabled: e.target.checked })}
                  className="toggle-switch"
                />
              </label>
            </div>
          </div>

          {/* Auto-Approve Rules */}
          <div className="card section-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#bcd6e5]">{copy[language].autoApprove}</h3>
              <button
                type="button"
                onClick={() => setShowRuleEditor(true)}
                className="btn-primary text-xs px-3 py-1.5"
              >
                <WuxiaIcon name="plus" className="w-3.5 h-3.5 mr-1 inline" />
                {copy[language].addRule}
              </button>
            </div>

            {showRuleEditor && (
              <div className="mb-4 p-4 rounded-xl border border-[#2a3c4c]/60 bg-[#101a23]/65">
                <AutoApproveRuleEditor
                  onSave={(rule) => {
                    createRule.mutate(rule, {
                      onSuccess: () => setShowRuleEditor(false),
                    });
                  }}
                  onCancel={() => setShowRuleEditor(false)}
                />
              </div>
            )}

            {autoApproveRules.length === 0 ? (
              <div className="text-center text-gray-400 py-8 text-sm">
                {copy[language].noRules}
              </div>
            ) : (
              <div className="space-y-2">
                {autoApproveRules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`p-3 rounded-lg border ${
                      rule.enabled
                        ? 'border-[#2d5a3f]/40 bg-[#2d5a3f]/10'
                        : 'border-[#2a3c4c]/60 bg-[#101a23]/65'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#e6eff5]">{rule.name}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {rule.conditions.maxDuration
                            ? `${language === 'ru' ? 'До' : language === 'en' ? 'Up to' : '最多'} ${rule.conditions.maxDuration} ${language === 'zh' ? '小时' : language === 'ru' ? 'часов' : 'hours'}`
                            : language === 'zh' ? '任意时长' : language === 'en' ? 'Any duration' : 'Любая длительность'}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        rule.enabled ? 'bg-[#2d5a3f]/30 text-[#6fb98f]' : 'bg-gray-500/30 text-gray-400'
                      }`}>
                        {rule.enabled
                          ? language === 'zh' ? '启用' : language === 'en' ? 'Active' : 'Активно'
                          : language === 'zh' ? '禁用' : language === 'en' ? 'Inactive' : 'Неактивно'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Templates */}
          <div className="card section-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#bcd6e5]">{copy[language].templates}</h3>
              <button
                type="button"
                className="btn-primary text-xs px-3 py-1.5"
              >
                <WuxiaIcon name="plus" className="w-3.5 h-3.5 mr-1 inline" />
                {language === 'zh' ? '添加模板' : language === 'en' ? 'Add Template' : 'Добавить шаблон'}
              </button>
            </div>

            {templates.length === 0 ? (
              <div className="text-center text-gray-400 py-8 text-sm">
                {language === 'zh' ? '暂无模板' : language === 'en' ? 'No templates yet' : 'Пока нет шаблонов'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-3 rounded-lg border border-[#2a3c4c]/60 bg-[#101a23]/65"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#e6eff5]">{template.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#2d3a5a]/50 text-[#8fb9cc]">
                        {template.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-2">{template.content}</div>
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
