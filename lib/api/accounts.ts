import { z } from 'zod';
import { getApiAdminAccounts, patchApiAdminAccounts } from '@/lib/api/generated';
import { portalAccountSchema, portalAccountsSchema, type PortalAccountDto } from '@/lib/schemas/account';
import { userRoleSchema } from '@/lib/schemas/auth';
import { sameOriginOpenApiClient } from './openapi-client';

const updateAccountPayloadSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  role: userRoleSchema.optional(),
  prefix: z.string().trim().max(40).nullable().optional(),
});

export type UpdateAccountPayload = z.infer<typeof updateAccountPayloadSchema>;

export const accountsApi = {
  list: async (): Promise<PortalAccountDto[]> => {
    const response = await getApiAdminAccounts({ client: sameOriginOpenApiClient });
    return portalAccountsSchema.parse(response.data || []);
  },

  update: async (payload: UpdateAccountPayload): Promise<PortalAccountDto> => {
    const response = await patchApiAdminAccounts({
      client: sameOriginOpenApiClient,
      body: updateAccountPayloadSchema.parse(payload),
    });
    return portalAccountSchema.parse(response.data || {});
  },
};
