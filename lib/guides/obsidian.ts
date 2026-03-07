import { guideCategories, type GuideCategory } from '@/lib/schemas/guide';

export interface GuideDraft {
  title: string;
  content: string;
  category: GuideCategory;
  author?: string;
}

type FrontmatterValue = string | string[];

const CATEGORY_SET = new Set<string>(guideCategories);
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg', 'bmp']);
const ATTACHMENT_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, 'mp4', 'webm', 'pdf']);
const CALLOUT_LABELS: Record<string, string> = {
  note: 'Note',
  abstract: 'Overview',
  summary: 'Summary',
  info: 'Info',
  todo: 'Todo',
  tip: 'Tip',
  hint: 'Hint',
  important: 'Important',
  success: 'Success',
  check: 'Check',
  done: 'Done',
  question: 'Question',
  help: 'Help',
  faq: 'FAQ',
  warning: 'Warning',
  caution: 'Caution',
  attention: 'Attention',
  failure: 'Failure',
  fail: 'Failure',
  missing: 'Missing',
  danger: 'Danger',
  error: 'Error',
  bug: 'Bug',
  example: 'Example',
  quote: 'Quote',
};

function normalizeLineBreaks(value: string): string {
  return value.replace(/\r\n/g, '\n');
}

function stripQuotes(value: string): string {
  return value.replace(/^['"]|['"]$/g, '').trim();
}

function baseName(value: string): string {
  const normalized = value.replace(/\\/g, '/');
  const parts = normalized.split('/').filter(Boolean);
  return parts[parts.length - 1] || normalized;
}

function fileExtension(value: string): string {
  const match = baseName(value).match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : '';
}

function isAttachmentPath(value: string): boolean {
  return ATTACHMENT_EXTENSIONS.has(fileExtension(value));
}

function isImagePath(value: string): boolean {
  return IMAGE_EXTENSIONS.has(fileExtension(value));
}

function sanitizeWikiTarget(value: string): string {
  return value.split('#')[0].trim();
}

function parseWikiReference(value: string): { target: string; label: string } {
  const [targetPart, labelPart] = value.split('|');
  const target = sanitizeWikiTarget(targetPart || '');
  const label = (labelPart || '').trim();
  return { target, label };
}

function normalizeFileLookupKey(value: string): string {
  return baseName(value).toLowerCase();
}

function buildFileLookup(files: File[]): Map<string, File> {
  const lookup = new Map<string, File>();

  for (const file of files) {
    lookup.set(normalizeFileLookupKey(file.name), file);
    const relativePath = (file as File & { webkitRelativePath?: string }).webkitRelativePath;
    if (relativePath) {
      lookup.set(normalizeFileLookupKey(relativePath), file);
    }
  }

  return lookup;
}

function valueToList(value: FrontmatterValue | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function resolveGuideCategory(rawCategory?: string, tags: string[] = []): GuideCategory {
  const candidates = [rawCategory, ...tags]
    .map((value) => (value || '').trim().toLowerCase())
    .filter(Boolean);

  for (const candidate of candidates) {
    if (CATEGORY_SET.has(candidate)) {
      return candidate as GuideCategory;
    }

    if (candidate.includes('raid') || candidate.includes('boss') || candidate.includes('dungeon')) {
      return 'pve';
    }

    if (candidate.includes('arena') || candidate.includes('duel')) {
      return 'pvp';
    }

    if (candidate.includes('build')) {
      return 'build';
    }

    if (candidate.includes('farm')) {
      return 'farm';
    }

    if (candidate.includes('craft')) {
      return 'craft';
    }

    if (candidate.includes('train')) {
      return 'training';
    }
  }

  return 'general';
}

function parseFrontmatterValue(value: string): FrontmatterValue {
  const trimmed = value.trim();

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => stripQuotes(item))
      .filter(Boolean);
  }

  return stripQuotes(trimmed);
}

export function parseGuideFrontmatter(markdown: string): {
  data: Record<string, FrontmatterValue>;
  content: string;
} {
  const normalized = normalizeLineBreaks(markdown);

  if (!normalized.startsWith('---\n')) {
    return { data: {}, content: normalized };
  }

  const endIndex = normalized.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return { data: {}, content: normalized };
  }

  const frontmatterBlock = normalized.slice(4, endIndex);
  const content = normalized.slice(endIndex + 5);
  const data: Record<string, FrontmatterValue> = {};
  let currentListKey: string | null = null;

  for (const rawLine of frontmatterBlock.split('\n')) {
    const line = rawLine.trimEnd();
    if (!line.trim()) continue;

    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      const [, rawKey, rawValue] = keyMatch;
      const key = rawKey.toLowerCase();
      const value = rawValue.trim();

      if (!value) {
        data[key] = [];
        currentListKey = key;
        continue;
      }

      data[key] = parseFrontmatterValue(value);
      currentListKey = null;
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && currentListKey) {
      const existing = valueToList(data[currentListKey]);
      existing.push(stripQuotes(listMatch[1]));
      data[currentListKey] = existing.filter(Boolean);
    }
  }

  return { data, content };
}

export function normalizeGuideTitle(value: string): string {
  return stripQuotes(value)
    .replace(/\.(md|markdown)$/i, '')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9\u0400-\u04ff-]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function extractTitleFromMarkdown(content: string, fallbackFileName: string): string {
  const { data, content: stripped } = parseGuideFrontmatter(content);
  const frontmatterTitle = data.title;
  if (typeof frontmatterTitle === 'string' && frontmatterTitle.trim()) {
    return frontmatterTitle.trim().slice(0, 140);
  }

  const heading = stripped
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.startsWith('# '));

  if (heading) {
    return heading.replace(/^#\s+/, '').trim().slice(0, 140);
  }

  return baseName(fallbackFileName).replace(/\.(md|markdown)$/i, '').trim().slice(0, 140) || 'Imported guide';
}

async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsDataURL(file);
  });
}

async function resolveAssetLinks(markdown: string, files: File[]): Promise<string> {
  if (files.length === 0) return markdown;

  const lookup = buildFileLookup(files);
  let nextMarkdown = markdown;

  const obsidianEmbeds = [...nextMarkdown.matchAll(/!\[\[([^\]]+)\]\]/g)];
  for (const match of obsidianEmbeds) {
    const original = match[0];
    const { target, label } = parseWikiReference(match[1] || '');
    const file = lookup.get(normalizeFileLookupKey(target));
    const safeLabel = label || baseName(target).replace(/\.[a-z0-9]+$/i, '') || 'Attachment';

    if (!file) {
      const fallback = isImagePath(target)
        ? `![${safeLabel}](${target})`
        : `[${safeLabel}](${target})`;
      nextMarkdown = nextMarkdown.replace(original, fallback);
      continue;
    }

    const dataUrl = await readFileAsDataUrl(file);
    const replacement = isImagePath(file.name)
      ? `![${safeLabel}](${dataUrl})`
      : `[${safeLabel}](${dataUrl})`;
    nextMarkdown = nextMarkdown.replace(original, replacement);
  }

  const markdownLinks = [...nextMarkdown.matchAll(/(!?)\[([^\]]*)\]\(([^)]+)\)/g)];
  for (const match of markdownLinks) {
    const [original, bang, label, target] = match;
    const trimmedTarget = target.trim();
    if (!trimmedTarget || /^(https?:|mailto:|tel:|data:|guide:\/\/|#)/i.test(trimmedTarget)) {
      continue;
    }

    const file = lookup.get(normalizeFileLookupKey(trimmedTarget));
    if (!file || isMarkdownFile(file)) continue;

    const dataUrl = await readFileAsDataUrl(file);
    const safeLabel = label || baseName(file.name).replace(/\.[a-z0-9]+$/i, '') || 'Attachment';
    const replacement = bang === '!'
      ? `![${safeLabel}](${dataUrl})`
      : `[${safeLabel}](${dataUrl})`;
    nextMarkdown = nextMarkdown.replace(original, replacement);
  }

  return nextMarkdown;
}

function normalizeObsidianCallouts(markdown: string): string {
  const lines = normalizeLineBreaks(markdown).split('\n');

  return lines
    .map((line) => {
      const match = line.match(/^>\s*\[!([^\]]+)\]([+-])?\s*(.*)$/i);
      if (!match) return line;

      const type = match[1].trim().toLowerCase();
      const title = match[3].trim();
      const label = CALLOUT_LABELS[type] || (type.charAt(0).toUpperCase() + type.slice(1));
      return `> **${label}${title ? ` - ${title}` : ''}**`;
    })
    .join('\n');
}

function normalizeObsidianLinks(markdown: string): string {
  const withEmbeds = markdown.replace(/!\[\[([^\]]+)\]\]/g, (_match, rawReference) => {
    const { target, label } = parseWikiReference(String(rawReference || ''));
    if (!target) return String(rawReference || '');

    const safeLabel = label || baseName(target).replace(/\.[a-z0-9]+$/i, '') || 'Attachment';
    return isImagePath(target) ? `![${safeLabel}](${target})` : `[${safeLabel}](${target})`;
  });

  return withEmbeds.replace(/(?<!!)\[\[([^\]]+)\]\]/g, (_match, rawReference) => {
    const { target, label } = parseWikiReference(String(rawReference || ''));
    if (!target) return String(rawReference || '');

    if (isAttachmentPath(target)) {
      const safeLabel = label || baseName(target);
      return `[${safeLabel}](${target})`;
    }

    const guideSlug = normalizeGuideTitle(target);
    const safeLabel = label || baseName(target).replace(/\.(md|markdown)$/i, '') || target;
    return `[${safeLabel}](guide://${encodeURIComponent(guideSlug)})`;
  });
}

export function prepareMarkdownForRender(markdown: string): string {
  const { content } = parseGuideFrontmatter(markdown || '');
  return normalizeObsidianLinks(normalizeObsidianCallouts(content)).trim();
}

export async function buildGuideDraftFromMarkdownFile(file: File, files: File[]): Promise<GuideDraft> {
  const raw = await file.text();
  const { data, content } = parseGuideFrontmatter(raw);
  const resolvedContent = (await resolveAssetLinks(content.trim(), files)).slice(0, 500_000);
  const tags = valueToList(data.tags).map((value) => value.trim().toLowerCase());
  const categoryValue = typeof data.category === 'string' ? data.category : valueToList(data.category)[0];
  const authorValue = typeof data.author === 'string' ? data.author : valueToList(data.author)[0];

  return {
    title: extractTitleFromMarkdown(raw, file.name),
    content: resolvedContent,
    category: resolveGuideCategory(categoryValue, tags),
    author: authorValue?.trim() || undefined,
  };
}

export function isMarkdownFile(file: File): boolean {
  return /\.(md|markdown)$/i.test(file.name) || file.type === 'text/markdown';
}
