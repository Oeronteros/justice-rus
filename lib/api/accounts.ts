import { z } from 'zod';
import { api } from './client';
import { portalAccountSchema, portalAccountsSchema, type PortalAccountDto } from '@/lib/schemas/account';
import { userRoleSchema } from '@/lib/schemas/auth';

const updateAccountPayloadSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  role: userRoleSchema.optional(),
});

export type UpdateAccountPayload = z.infer<typeof updateAccountPayloadSchema>;

export const accountsApi = {
  list: async (): Promise<PortalAccountDto[]> => {
    return api.get('admin/accounts', portalAccountsSchema);
  },

  update: async (payload: UpdateAccountPayload): Promise<PortalAccountDto> => {
    return api.patch('admin/accounts', updateAccountPayloadSchema.parse(payload), portalAccountSchema);
  },
};
