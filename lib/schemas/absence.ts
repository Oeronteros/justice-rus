import { z } from 'zod';

export const absenceStatuses = ['pending', 'approved', 'rejected'] as const;

export const absenceSchema = z.object({
  id: z.string(),
  member: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string(),
  status: z.enum(absenceStatuses),
});

export const absencesArraySchema = z.array(absenceSchema);

export const createAbsenceSchema = z.object({
  member: z.string().min(1, 'Имя обязательно'),
  startDate: z.string().min(1, 'Дата начала обязательна'),
  endDate: z.string().min(1, 'Дата окончания обязательна'),
  reason: z.string().min(1, 'Причина обязательна').max(500, 'Максимум 500 символов'),
});

// Inferred types
export type Absence = z.infer<typeof absenceSchema>;
export type AbsenceStatus = typeof absenceStatuses[number];
export type CreateAbsenceDto = z.infer<typeof createAbsenceSchema>;
