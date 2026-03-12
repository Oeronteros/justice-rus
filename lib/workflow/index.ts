export { workflowApi } from './api';
export {
  useAutoApproveRules,
  useCreateAutoApproveRule,
  useUpdateAutoApproveRule,
  useAutoCloseRules,
  useCreateAutoCloseRule,
  useTemplates,
  useCreateTemplate,
  useUpdateTemplate,
  useWorkflowSettings,
  useUpdateWorkflowSettings,
} from './hooks';
export type {
  AutoApproveRule,
  AutoCloseRule,
  ResponseTemplate,
  WorkflowSettings,
} from '@/lib/schemas/workflow';
