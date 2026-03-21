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
import { hasRoleAtLeast } from '@/lib/authz';
import { useUser } from '@/lib/auth/context';
import { useLanguage, type Language } from '@/lib/i18n/context';
import * as stylex from '@stylexjs/stylex';

const copy: Record<Language, {
  title: string;
  subtitle: string;
  autoApprove: string;
  autoClose: string;
  templates: string;
  settings: string;
  noRules: string;
  addRule: string;
  loading: string;
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
    loading: 'Загрузка...',
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
    loading: 'Loading...',
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
    loading: '加载中...',
  },
};

const styles = stylex.create({
  container: {
    display: 'grid',
    gap: '1.5rem',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(16, 26, 35, 0.65)',
    border: '1px solid rgba(42, 60, 76, 0.6)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#bcd6e5',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: '0.875rem',
    color: '#e6eff5',
  },
  toggle: {
    position: 'relative',
    width: '2.75rem',
    height: '1.5rem',
    backgroundColor: 'rgba(42, 60, 76, 0.8)',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  toggleActive: {
    backgroundColor: '#2d5a3f',
  },
  toggleKnob: {
    position: 'absolute',
    top: '0.125rem',
    left: '0.125rem',
    width: '1.25rem',
    height: '1.25rem',
    backgroundColor: '#e6eff5',
    borderRadius: '9999px',
    transition: 'transform 0.2s',
  },
  toggleKnobActive: {
    transform: 'translateX(1.25rem)',
  },
  ruleItem: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(42, 60, 76, 0.6)',
    backgroundColor: 'rgba(16, 26, 35, 0.65)',
  },
  ruleItemActive: {
    borderColor: 'rgba(45, 90, 63, 0.4)',
    backgroundColor: 'rgba(45, 90, 63, 0.1)',
  },
  ruleHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ruleName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#e6eff5',
  },
  ruleMeta: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginTop: '0.25rem',
  },
  ruleBadge: {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
  },
  ruleBadgeActive: {
    backgroundColor: 'rgba(45, 90, 63, 0.3)',
    color: '#6fb98f',
  },
  ruleBadgeInactive: {
    backgroundColor: 'rgba(75, 85, 99, 0.3)',
    color: '#9ca3af',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: '#9ca3af',
    fontSize: '0.875rem',
  },
  loadingState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#9ca3af',
  },
  addButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.375rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#e6eff5',
    backgroundColor: '#2d5a3f',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, 1fr)',
    },
    gap: '1rem',
  },
});

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      {...stylex.props(styles.toggle, checked && styles.toggleActive)}
    >
      <span {...stylex.props(styles.toggleKnob, checked && styles.toggleKnobActive)} />
    </button>
  );
}

export default function WorkflowPage() {
  const { language } = useLanguage();
  const user = useUser();
  const canManageWorkflow = hasRoleAtLeast(user.role, 'officer');

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
          <div {...stylex.props(styles.loadingState)}>
            <WuxiaIcon name="schedule" className="w-12 h-12 mx-auto mb-3 animate-pulse" />
            <p>{copy[language].loading}</p>
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

        <div data-testid="workflow-automation-grid" {...stylex.props(styles.container)}>
          {/* General Settings */}
          <div {...stylex.props(styles.card)}>
            <h3 {...stylex.props(styles.cardTitle)}>{copy[language].settings}</h3>
            <div {...stylex.props(styles.cardContent)}>
              <div {...stylex.props(styles.toggleRow)}>
                <span {...stylex.props(styles.toggleLabel)}>{copy[language].autoApprove}</span>
                <ToggleSwitch
                  checked={settings?.autoApproveEnabled ?? false}
                  onChange={(checked) => updateSettings.mutate({ ...settings!, autoApproveEnabled: checked })}
                />
              </div>
              <div {...stylex.props(styles.toggleRow)}>
                <span {...stylex.props(styles.toggleLabel)}>{copy[language].autoClose}</span>
                <ToggleSwitch
                  checked={settings?.autoCloseEnabled ?? false}
                  onChange={(checked) => updateSettings.mutate({ ...settings!, autoCloseEnabled: checked })}
                />
              </div>
              <div {...stylex.props(styles.toggleRow)}>
                <span {...stylex.props(styles.toggleLabel)}>{copy[language].templates}</span>
                <ToggleSwitch
                  checked={settings?.templatesEnabled ?? true}
                  onChange={(checked) => updateSettings.mutate({ ...settings!, templatesEnabled: checked })}
                />
              </div>
            </div>
          </div>

          {/* Auto-Approve Rules */}
          <div {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.cardHeader)}>
              <h3 {...stylex.props(styles.cardTitle)}>{copy[language].autoApprove}</h3>
              <button
                type="button"
                onClick={() => setShowRuleEditor(true)}
                {...stylex.props(styles.addButton)}
              >
                <WuxiaIcon name="plus" className="w-3.5 h-3.5" />
                {copy[language].addRule}
              </button>
            </div>

            {autoApproveRules.length === 0 ? (
              <div {...stylex.props(styles.emptyState)}>{copy[language].noRules}</div>
            ) : (
              <div {...stylex.props(styles.cardContent)}>
                {autoApproveRules.map((rule) => (
                  <div
                    key={rule.id}
                    {...stylex.props(styles.ruleItem, rule.enabled && styles.ruleItemActive)}
                  >
                    <div {...stylex.props(styles.ruleHeader)}>
                      <div>
                        <div {...stylex.props(styles.ruleName)}>{rule.name}</div>
                        <div {...stylex.props(styles.ruleMeta)}>
                          {rule.conditions.maxDuration
                            ? `${language === 'ru' ? 'До' : language === 'en' ? 'Up to' : '最多'} ${rule.conditions.maxDuration} ${language === 'zh' ? '小时' : language === 'ru' ? 'часов' : 'hours'}`
                            : language === 'zh' ? '任意时长' : language === 'en' ? 'Any duration' : 'Любая длительность'}
                        </div>
                      </div>
                      <span {...stylex.props(styles.ruleBadge, rule.enabled ? styles.ruleBadgeActive : styles.ruleBadgeInactive)}>
                        {rule.enabled
                          ? language === 'zh' ? '启用' : language === 'en' ? 'Active' : 'Активно'
                          : language === 'zh' ? '禁用' : language === 'en' ? 'Inactive' : 'Неактивно'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Templates */}
          <div {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.cardHeader)}>
              <h3 {...stylex.props(styles.cardTitle)}>{copy[language].templates}</h3>
              <button type="button" {...stylex.props(styles.addButton)}>
                <WuxiaIcon name="plus" className="w-3.5 h-3.5" />
                {language === 'zh' ? '添加模板' : language === 'en' ? 'Add Template' : 'Добавить шаблон'}
              </button>
            </div>

            {templates.length === 0 ? (
              <div {...stylex.props(styles.emptyState)}>
                {language === 'zh' ? '暂无模板' : language === 'en' ? 'No templates yet' : 'Пока нет шаблонов'}
              </div>
            ) : (
              <div {...stylex.props(styles.grid)}>
                {templates.map((template) => (
                  <div key={template.id} {...stylex.props(styles.ruleItem)}>
                    <div {...stylex.props(styles.ruleHeader)}>
                      <span {...stylex.props(styles.ruleName)}>{template.name}</span>
                      <span {...stylex.props(styles.ruleBadge, styles.ruleBadgeInactive)}>{template.category}</span>
                    </div>
                    <div {...stylex.props(styles.ruleMeta)} style={{ marginTop: '0.5rem' }}>{template.content}</div>
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