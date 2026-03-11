'use client';

import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { normalizeGuideTitle, prepareMarkdownForRender } from '@/lib/guides/obsidian';

export interface GuideLinkEntry {
  id: string;
  title: string;
  slug?: string;
  linkTargets?: string[];
}

export interface MarkdownHeading {
  id: string;
  level: number;
  text: string;
  line?: number;
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
  guidesIndex?: GuideLinkEntry[];
  onGuideLinkClick?: (guideId: string) => void;
  onHeadingLinkClick?: (headingId: string) => void;
}

function joinClasses(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

function collectText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(collectText).join('');
  }

  if (node && typeof node === 'object' && 'props' in node) {
    return collectText((node as { props?: { children?: ReactNode } }).props?.children);
  }

  return '';
}

function normalizeHref(href: string): string {
  const trimmed = href.trim();
  if (/^(javascript:|vbscript:)/i.test(trimmed)) {
    return '#';
  }
  return trimmed;
}

function stripMarkdownTokens(value: string): string {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/!?\[([^\]]*)\]\(([^)]+)\)/g, '$1')
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_match, target, label) => String(label || target || ''))
    .trim();
}

export function extractMarkdownHeadings(content: string): MarkdownHeading[] {
  const markdown = prepareMarkdownForRender(content || '');
  const lines = markdown.split('\n');
  const headings: MarkdownHeading[] = [];
  const seen = new Map<string, number>();

  for (const [index, line] of lines.entries()) {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = stripMarkdownTokens(match[2]);
    if (!text) continue;

    const baseId = normalizeGuideTitle(text) || `section-${headings.length + 1}`;
    const currentCount = seen.get(baseId) || 0;
    seen.set(baseId, currentCount + 1);

    headings.push({
      id: currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`,
      level,
      text,
      line: index + 1,
    });
  }

  return headings;
}

function resolveGuideId(href: string | undefined, guidesIndex: GuideLinkEntry[] | undefined): string | null {
  if (!href || !guidesIndex || !href.startsWith('guide://')) return null;
  const slug = normalizeGuideTitle(decodeURIComponent(href.slice('guide://'.length)));
  const match = guidesIndex.find((guide) => (guide.slug ? normalizeGuideTitle(guide.slug) : normalizeGuideTitle(guide.title)) === slug);
  return match?.id || null;
}

export function MarkdownRenderer({
  content,
  className,
  guidesIndex,
  onGuideLinkClick,
  onHeadingLinkClick,
}: MarkdownRendererProps) {
  const markdown = prepareMarkdownForRender(content || '');
  const headings = extractMarkdownHeadings(content);

  const renderHeading = (
    fallbackLevel: 1 | 2 | 3 | 4 | 5 | 6,
    children: ReactNode,
    lineNumber?: number
  ) => {
    const heading = lineNumber == null ? undefined : headings.find((candidate) => candidate.line === lineNumber);
    const headingText = heading?.text || collectText(children).trim();
    const headingId = heading?.id || normalizeGuideTitle(headingText) || `section-${lineNumber ?? fallbackLevel}`;
    const Tag = `h${fallbackLevel}` as const;

    return (
      <Tag
        id={headingId}
        className={`dc-md-h${Math.min(fallbackLevel, 3)}`}
        data-guide-anchor={headingId}
      >
        <span>{children}</span>
        {(onHeadingLinkClick || headingId) && (
          <button
            type="button"
            className="dc-md-anchor"
            onClick={() => {
              if (onHeadingLinkClick) {
                onHeadingLinkClick(headingId);
                return;
              }

              const element = document.getElementById(headingId);
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            aria-label={`Go to section ${headingText}`}
          >
            #
          </button>
        )}
      </Tag>
    );
  };

  return (
    <div className={joinClasses('dc-md', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={(url) => normalizeHref(String(url || ''))}
        components={{
          h1: ({ children, node }) => renderHeading(1, children, node?.position?.start.line),
          h2: ({ children, node }) => renderHeading(2, children, node?.position?.start.line),
          h3: ({ children, node }) => renderHeading(3, children, node?.position?.start.line),
          h4: ({ children, node }) => renderHeading(4, children, node?.position?.start.line),
          h5: ({ children, node }) => renderHeading(5, children, node?.position?.start.line),
          h6: ({ children, node }) => renderHeading(6, children, node?.position?.start.line),
          p: ({ children }) => <p className="dc-md-p">{children}</p>,
          ul: ({ children, className: listClassName }) => (
            <ul className={joinClasses('dc-md-ul', listClassName)}>{children}</ul>
          ),
          ol: ({ children, className: listClassName }) => (
            <ol className={joinClasses('dc-md-ol', listClassName)}>{children}</ol>
          ),
          li: ({ children, className: itemClassName }) => (
            <li className={joinClasses('dc-md-li', itemClassName)}>{children}</li>
          ),
          blockquote: ({ children }) => {
            const calloutText = collectText(children).trim();
            const calloutMatch = calloutText.match(/^([A-Za-z]+)\s*-\s*(.+)$/);
            const calloutType = calloutMatch ? calloutMatch[1].toLowerCase() : '';

            return (
              <blockquote
                className={joinClasses('dc-md-blockquote', calloutMatch && 'dc-md-callout')}
                data-callout={calloutType || undefined}
              >
                {children}
              </blockquote>
            );
          },
          code: (props) => {
            const { className: codeClassName, children } = props as { className?: string; children?: ReactNode };
            const rawContent = collectText(children);
            const isInline = !String(codeClassName || '').includes('language-') && !rawContent.includes('\n');

            if (isInline) {
              return <code className="dc-md-code">{children}</code>;
            }

            return <code className={joinClasses('dc-md-code-block', codeClassName)}>{children}</code>;
          },
          pre: ({ children }) => <pre className="dc-md-pre">{children}</pre>,
          a: ({ href, children }) => {
            const guideId = resolveGuideId(href, guidesIndex);
            if (guideId && onGuideLinkClick) {
              return (
                <button
                  type="button"
                  className="dc-md-guide-link"
                  onClick={() => onGuideLinkClick(guideId)}
                >
                  {children}
                </button>
              );
            }

            if (href?.startsWith('guide://')) {
              return <span className="dc-md-guide-link dc-md-guide-link-static">{children}</span>;
            }

            return (
              <a className="dc-md-link" href={href} target="_blank" rel="noreferrer noopener">
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => (
            <span className="dc-md-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="dc-md-image" src={src || ''} alt={alt || ''} loading="lazy" />
            </span>
          ),
          hr: () => <hr className="dc-md-hr" />,
          table: ({ children }) => (
            <div className="dc-md-table-wrap">
              <table className="dc-md-table">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="dc-md-thead">{children}</thead>,
          tbody: ({ children }) => <tbody className="dc-md-tbody">{children}</tbody>,
          tr: ({ children }) => <tr className="dc-md-tr">{children}</tr>,
          th: ({ children }) => <th className="dc-md-th">{children}</th>,
          td: ({ children }) => <td className="dc-md-td">{children}</td>,
          input: ({ checked, disabled }) => (
            <input className="dc-md-checkbox" type="checkbox" checked={checked} disabled={disabled ?? true} readOnly />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
