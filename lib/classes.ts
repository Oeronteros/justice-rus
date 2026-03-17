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
  accentColor: string;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
  ringColor: string;
};

const classVisuals: Record<KnownClassName, ClassVisual> = {
  Ironclad: {
    accentColor: '#f5c979',
    gradientStart: '#2b1f0e',
    gradientMid: '#4e3614',
    gradientEnd: '#8a5c24',
    ringColor: 'rgba(255, 215, 154, 0.35)',
  },
  Bloodstorm: {
    accentColor: '#ff7f78',
    gradientStart: '#2a1215',
    gradientMid: '#3a171b',
    gradientEnd: '#5f1f28',
    ringColor: 'rgba(255, 145, 139, 0.35)',
  },
  Numina: {
    accentColor: '#b68cff',
    gradientStart: '#1d1332',
    gradientMid: '#312054',
    gradientEnd: '#56308e',
    ringColor: 'rgba(196, 164, 255, 0.35)',
  },
  Celestune: {
    accentColor: '#4b79ff',
    gradientStart: '#0d1c4a',
    gradientMid: '#10296b',
    gradientEnd: '#1b49b4',
    ringColor: 'rgba(111, 150, 255, 0.35)',
  },
  'Dragon Roar': {
    accentColor: '#77ffd6',
    gradientStart: '#08211e',
    gradientMid: '#0d3934',
    gradientEnd: '#126255',
    ringColor: 'rgba(152, 255, 224, 0.35)',
  },
  Sylph: {
    accentColor: '#ffb8bc',
    gradientStart: '#231520',
    gradientMid: '#402134',
    gradientEnd: '#6f3154',
    ringColor: 'rgba(255, 201, 204, 0.35)',
  },
  Nightwalker: {
    accentColor: '#d6fbff',
    gradientStart: '#0a2528',
    gradientMid: '#103d42',
    gradientEnd: '#1d6b73',
    ringColor: 'rgba(209, 252, 255, 0.35)',
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
