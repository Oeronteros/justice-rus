import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { workflowApi } from './api';
import type { AutoApproveRule, AutoCloseRule, ResponseTemplate, WorkflowSettings } from '@/lib/schemas/workflow';

export const workflowKeys = {
  all: ['workflow'] as const,
  autoApproveRules: () => [...workflowKeys.all, 'autoApproveRules'] as const,
  autoCloseRules: () => [...workflowKeys.all, 'autoCloseRules'] as const,
  templates: (category?: string) => [...workflowKeys.all, 'templates', { category }] as const,
  settings: () => [...workflowKeys.all, 'settings'] as const,
};

// Auto-approve rules
export function useAutoApproveRules() {
  return useQuery({
    queryKey: workflowKeys.autoApproveRules(),
    queryFn: () => workflowApi.getAutoApproveRules(),
  });
}

export function useCreateAutoApproveRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rule: Omit<AutoApproveRule, 'id' | 'createdAt' | 'updatedAt'>) => workflowApi.createAutoApproveRule(rule),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.autoApproveRules() });
    },
  });
}

export function useUpdateAutoApproveRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rule: AutoApproveRule) => workflowApi.updateAutoApproveRule(rule),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.autoApproveRules() });
    },
  });
}

// Auto-close rules
export function useAutoCloseRules() {
  return useQuery({
    queryKey: workflowKeys.autoCloseRules(),
    queryFn: () => workflowApi.getAutoCloseRules(),
  });
}

export function useCreateAutoCloseRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rule: Omit<AutoCloseRule, 'id' | 'createdAt' | 'updatedAt'>) => workflowApi.createAutoCloseRule(rule),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.autoCloseRules() });
    },
  });
}

// Templates
export function useTemplates(category?: string) {
  return useQuery({
    queryKey: workflowKeys.templates(category),
    queryFn: () => workflowApi.getTemplates(category),
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (template: Omit<ResponseTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => workflowApi.createTemplate(template),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.templates() });
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (template: ResponseTemplate) => workflowApi.updateTemplate(template),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.templates() });
    },
  });
}

// Settings
export function useWorkflowSettings() {
  return useQuery({
    queryKey: workflowKeys.settings(),
    queryFn: () => workflowApi.getSettings(),
  });
}

export function useUpdateWorkflowSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: WorkflowSettings) => workflowApi.updateSettings(settings),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.settings() });
    },
  });
}
