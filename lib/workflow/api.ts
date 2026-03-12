import type { AutoApproveRule, AutoCloseRule, ResponseTemplate, WorkflowSettings } from '@/lib/schemas/workflow';

// Mock API for workflow automation
export const workflowApi = {
  // Auto-approve rules
  getAutoApproveRules: async (): Promise<AutoApproveRule[]> => {
    return [];
  },
  createAutoApproveRule: async (rule: Omit<AutoApproveRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<AutoApproveRule> => {
    return {} as AutoApproveRule;
  },
  updateAutoApproveRule: async (rule: AutoApproveRule): Promise<AutoApproveRule> => {
    return rule;
  },
  deleteAutoApproveRule: async (id: string): Promise<void> => {},

  // Auto-close rules
  getAutoCloseRules: async (): Promise<AutoCloseRule[]> => {
    return [];
  },
  createAutoCloseRule: async (rule: Omit<AutoCloseRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<AutoCloseRule> => {
    return {} as AutoCloseRule;
  },
  updateAutoCloseRule: async (rule: AutoCloseRule): Promise<AutoCloseRule> => {
    return rule;
  },
  deleteAutoCloseRule: async (id: string): Promise<void> => {},

  // Response templates
  getTemplates: async (category?: string): Promise<ResponseTemplate[]> => {
    return [];
  },
  createTemplate: async (template: Omit<ResponseTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>): Promise<ResponseTemplate> => {
    return {} as ResponseTemplate;
  },
  updateTemplate: async (template: ResponseTemplate): Promise<ResponseTemplate> => {
    return template;
  },
  deleteTemplate: async (id: string): Promise<void> => {},
  incrementTemplateUsage: async (id: string): Promise<void> => {},

  // Settings
  getSettings: async (): Promise<WorkflowSettings> => {
    return {
      autoApproveEnabled: false,
      autoCloseEnabled: false,
      templatesEnabled: true,
    };
  },
  updateSettings: async (settings: WorkflowSettings): Promise<WorkflowSettings> => {
    return settings;
  },
};
