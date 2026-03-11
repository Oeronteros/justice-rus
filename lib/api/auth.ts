import { z } from 'zod';
import {
  getApiVerifyAuth,
  postApiAuth,
  postApiAuthRegister,
  postApiLogout,
} from '@/lib/api/generated';
import {
  authResponseSchema,
  logoutResponseSchema,
  registerResponseSchema,
  verifyAuthResponseSchema,
  type AuthResponseDto,
  type RegisterResponseDto,
  type VerifyAuthResponseDto,
} from '@/lib/schemas/auth';
import { sameOriginOpenApiClient } from './openapi-client';

const loginPayloadSchema = z.object({
  nickname: z.string().trim().min(1).optional(),
  password: z.string().min(1),
});

const registerPayloadSchema = z.object({
  nickname: z.string().trim().min(1),
  className: z.string().trim().min(1),
  discordHandle: z.string().trim().max(120).optional(),
  password: z.string().min(8),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponseDto> => {
    const response = await postApiAuth({
      client: sameOriginOpenApiClient,
      body: loginPayloadSchema.parse(payload),
    });
    return authResponseSchema.parse(response.data || {});
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponseDto> => {
    const response = await postApiAuthRegister({
      client: sameOriginOpenApiClient,
      body: registerPayloadSchema.parse(payload),
    });
    return registerResponseSchema.parse(response.data || {});
  },

  verify: async (): Promise<VerifyAuthResponseDto> => {
    const response = await getApiVerifyAuth({ client: sameOriginOpenApiClient });
    return verifyAuthResponseSchema.parse(response.data || {});
  },

  logout: async (): Promise<void> => {
    const response = await postApiLogout({ client: sameOriginOpenApiClient });
    logoutResponseSchema.parse(response.data || {});
  },
};
