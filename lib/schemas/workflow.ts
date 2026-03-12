import { z } from 'zod';

// Workflow automation rules
export const autoApproveRuleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  enabled: z.boolean(),
  conditions: z.object({
    maxDuration: z.number().optional(), // hours
    requiresSubstitution: z.boolean().optional(),
    allowedReasons: z.array(z.string()).optional(),
    officerRoles: z.array(z.string()).optional(), // roles that can be auto-approved
  }),
  action: z.object({
    autoApprove: z.boolean(),
    notifyOfficer: z.boolean(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const autoCloseRuleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  enabled: z.boolean(),
  conditions: z.object({
    inactivityHours: z.number(), // hours without response
    minResponders: z.number().optional(),
  }),
  action: z.object({
    autoClose: z.boolean(),
    notifyRequester: z.boolean(),
    markAsResolved: z.boolean(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const responseTemplateSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  category: z.enum(['help', 'absence', 'general']),
  content: z.string(),
  variables: z.array(z.string()).optional(), // e.g., ['memberName', 'date']
  isPublic: z.boolean(),
  usageCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const workflowSettingsSchema = z.object({
  autoApproveEnabled: z.boolean(),
  autoCloseEnabled: z.boolean(),
  templatesEnabled: z.boolean(),
  defaultAutoApproveRuleId: z.string().optional(),
  defaultAutoCloseRuleId: z.string().optional(),
});

export type AutoApproveRule = z.infer<typeof autoApproveRuleSchema>;
export type AutoCloseRule = z.infer<typeof autoCloseRuleSchema>;
export type ResponseTemplate = z.infer<typeof responseTemplateSchema>;
export type WorkflowSettings = z.infer<typeof workflowSettingsSchema>;
