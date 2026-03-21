import { z } from 'zod';
import {
  notificationDefaultsSchema,
  profileInterestSchema,
  profileTitleSchema,
} from '@/lib/schemas/registration';

export const userRoleSchema = z.enum(['guest', 'member', 'officer', 'head', 'sysadmin']);
export const authMethodSchema = z.enum(['account', 'pin']);
export const portalAccountIdSchema = z.string().regex(/^\d+$/);
export const pinAuthUserIdSchema = z.string().regex(/^pin-(guest|member|officer|head|sysadmin)$/);

export const authUserSchema = z.object({
  id: z.string().optional(),
  nickname: z.string().optional(),
  role: userRoleSchema,
  isActive: z.boolean().optional(),
  authMethod: authMethodSchema.optional(),
  discordId: z.string().nullable().optional(),
  discordHandle: z.string().nullable().optional(),
  className: z.string().nullable().optional(),
  prefix: z.string().nullable().optional(),
  profileTitle: profileTitleSchema.nullable().optional(),
  preferredClasses: z.array(z.string()).optional(),
  interests: z.array(profileInterestSchema).optional(),
  notificationDefaults: notificationDefaultsSchema.optional(),
  exp: z.number().optional(),
});

export const authResponseSchema = z.object({
  success: z.boolean(),
  user: authUserSchema,
});

export const registerAuthUserSchema = authUserSchema.extend({
  createdAt: z.string().optional(),
});

export const registerResponseSchema = z.object({
  success: z.boolean(),
  pendingApproval: z.boolean().optional(),
  message: z.string().optional(),
  user: registerAuthUserSchema,
});

export const verifyAuthResponseSchema = z.object({
  valid: z.boolean(),
  user: authUserSchema,
});

export const logoutResponseSchema = z.object({
  success: z.boolean(),
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthResponseDto = z.infer<typeof authResponseSchema>;
export type RegisterResponseDto = z.infer<typeof registerResponseSchema>;
export type VerifyAuthResponseDto = z.infer<typeof verifyAuthResponseSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type User = AuthUser;
export type AuthResponse = AuthResponseDto;
export type VerifyAuthResponse = VerifyAuthResponseDto;
