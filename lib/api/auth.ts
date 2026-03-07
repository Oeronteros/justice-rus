import { z } from 'zod';
import { api } from './client';
import {
  authResponseSchema,
  logoutResponseSchema,
  registerResponseSchema,
  verifyAuthResponseSchema,
  type AuthResponseDto,
  type RegisterResponseDto,
  type VerifyAuthResponseDto,
} from '@/lib/schemas/auth';

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
    return api.post('auth', loginPayloadSchema.parse(payload), authResponseSchema);
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponseDto> => {
    return api.post('auth/register', registerPayloadSchema.parse(payload), registerResponseSchema);
  },

  verify: async (): Promise<VerifyAuthResponseDto> => {
    return api.get('verify-auth', verifyAuthResponseSchema);
  },

  logout: async (): Promise<void> => {
    await api.post('logout', {}, logoutResponseSchema);
  },
};
