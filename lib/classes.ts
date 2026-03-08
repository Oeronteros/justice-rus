export const fallbackKnownClasses = [
  'Ironclad',
  'Bloodstorm',
  'Numina',
  'Celestune',
  'Dragon Roar',
  'Sylph',
  'Nightwalker',
] as const;

export type KnownClassName = (typeof fallbackKnownClasses)[number];

type ClassVisual = {
  accentClassName: string;
  surfaceClassName: string;
  ringClassName: string;
};

const classVisuals: Record<KnownClassName, ClassVisual> = {
  Ironclad: {
    accentClassName: 'text-[#ff7f78]',
    surfaceClassName: 'from-[#2a1215] via-[#3a171b] to-[#5f1f28]',
    ringClassName: 'ring-[#ff918b]/35',
  },
  Bloodstorm: {
    accentClassName: 'text-[#4b79ff]',
    surfaceClassName: 'from-[#0d1c4a] via-[#10296b] to-[#1b49b4]',
    ringClassName: 'ring-[#6f96ff]/35',
  },
  Numina: {
    accentClassName: 'text-[#77ffd6]',
    surfaceClassName: 'from-[#08211e] via-[#0d3934] to-[#126255]',
    ringClassName: 'ring-[#98ffe0]/35',
  },
  Celestune: {
    accentClassName: 'text-[#f5c979]',
    surfaceClassName: 'from-[#2b1f0e] via-[#4e3614] to-[#8a5c24]',
    ringClassName: 'ring-[#ffd79a]/35',
  },
  'Dragon Roar': {
    accentClassName: 'text-[#d6fbff]',
    surfaceClassName: 'from-[#0a2528] via-[#103d42] to-[#1d6b73]',
    ringClassName: 'ring-[#d1fcff]/35',
  },
  Sylph: {
    accentClassName: 'text-[#b979ff]',
    surfaceClassName: 'from-[#21112f] via-[#3c1a59] to-[#6a2da6]',
    ringClassName: 'ring-[#cb98ff]/35',
  },
  Nightwalker: {
    accentClassName: 'text-[#ffb8bc]',
    surfaceClassName: 'from-[#231520] via-[#402134] to-[#6f3154]',
    ringClassName: 'ring-[#ffc9cc]/35',
  },
};

const knownClassNameSet = new Set(fallbackKnownClasses.map((value) => value.toLowerCase()));

function normalizeClassValue(value: unknown): string | null {
  const normalized = String(value || '').trim();
  return normalized ? normalized : null;
}

export function getKnownClassName(value: unknown): KnownClassName | null {
  const normalized = normalizeClassValue(value);
  if (!normalized) return null;

  const lowerCased = normalized.toLowerCase();

  for (const className of fallbackKnownClasses) {
    if (className.toLowerCase() === lowerCased) {
      return className;
    }
  }

  return null;
}

export function getClassVisual(value: unknown): ClassVisual | null {
  const className = getKnownClassName(value);
  return className ? classVisuals[className] : null;
}

export async function getKnownClasses(): Promise<string[]> {
  return [...fallbackKnownClasses];
}

export async function isKnownClassName(className: string): Promise<boolean> {
  const normalized = normalizeClassValue(className);
  if (!normalized) return false;
  return knownClassNameSet.has(normalized.toLowerCase());
}
