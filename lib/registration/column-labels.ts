import { z } from 'zod';
import {
  defaultRegistrationColumnLabels,
  type RegistrationColumnLabels,
} from '@/components/sections/registration/columnLabels';

const registrationColumnLabelValueSchema = z.string().trim().min(1).max(80);

export const registrationColumnLabelsSchema = z.object({
  index: registrationColumnLabelValueSchema,
  discord: registrationColumnLabelValueSchema,
  nickname: registrationColumnLabelValueSchema,
  rank: registrationColumnLabelValueSchema,
  class: registrationColumnLabelValueSchema,
  guild: registrationColumnLabelValueSchema,
  elo: registrationColumnLabelValueSchema,
  mmr20: registrationColumnLabelValueSchema,
  bounty: registrationColumnLabelValueSchema,
  outerHeroic: registrationColumnLabelValueSchema,
  innerHeroic: registrationColumnLabelValueSchema,
  crimsonSands: registrationColumnLabelValueSchema,
  abyss: registrationColumnLabelValueSchema,
  gvg: registrationColumnLabelValueSchema,
  secretRealm: registrationColumnLabelValueSchema,
  marks: registrationColumnLabelValueSchema,
  kpi: registrationColumnLabelValueSchema,
  status: registrationColumnLabelValueSchema,
  actions: registrationColumnLabelValueSchema,
});

export const registrationColumnLabelsPatchSchema = registrationColumnLabelsSchema.partial();

export function normalizeRegistrationColumnLabels(
  value: Partial<RegistrationColumnLabels> | null | undefined
): RegistrationColumnLabels {
  const merged = {
    ...defaultRegistrationColumnLabels,
    ...(value || {}),
  } satisfies RegistrationColumnLabels;

  return registrationColumnLabelsSchema.parse(merged);
}
