export const fallbackKnownClasses = [
  'Ironclad',
  'Bloodstorm',
  'Numina',
  'Celestune',
  'Dragon Roar',
  'Sylph',
  'Nightwalker',
] as const;

const knownClassNameSet = new Set(fallbackKnownClasses.map((value) => value.toLowerCase()));

function normalizeClassValue(value: unknown): string | null {
  const normalized = String(value || '').trim();
  return normalized ? normalized : null;
}

export async function getKnownClasses(): Promise<string[]> {
  return [...fallbackKnownClasses];
}

export async function isKnownClassName(className: string): Promise<boolean> {
  const normalized = normalizeClassValue(className);
  if (!normalized) return false;
  return knownClassNameSet.has(normalized.toLowerCase());
}
