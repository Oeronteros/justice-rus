import { z } from 'zod';
import { userRoleSchema } from './auth';

export const portalAccountSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  role: userRoleSchema,
  isActive: z.boolean(),
  discordHandle: z.string().nullable().optional(),
  createdAt: z.string(),
  lastLoginAt: z.string().nullable(),
});

export const portalAccountsSchema = z.array(portalAccountSchema);

export type PortalAccountDto = z.infer<typeof portalAccountSchema>;
export type PortalAccount = PortalAccountDto;
