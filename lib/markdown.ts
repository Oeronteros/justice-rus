import { escapeHtml } from '@/lib/utils';

function formatInline(text: string) {
  let result = text;
  result = result.replace(/`([^`]+)`/g, '<code class="dc-md-code">$1</code>');
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label, hrefRaw) => {
      const href = String(hrefRaw || '').trim();
      const safeHref =
        href.startsWith('http://') || href.startsWith('https://') ? href : '#';
      return `<a class="dc-md-link" href="${safeHref}" target="_blank" rel="noreferrer noopener">${label}</a>`;
    }
  );
  return result;
}

export function markdownToHtml(markdown: string): string {
  const escaped = escapeHtml(markdown || '').replace(/\r\n/g, '\n');
  const lines = escaped.split('\n');

  let html = '';
  let inCode = false;
  let listOpen = false;

  const closeList = () => {
    if (!listOpen) return;
    html += '</ul>';
    listOpen = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, '  ');

    if (line.startsWith('```')) {
      closeList();
      if (inCode) {
        html += '</code></pre>';
        inCode = false;
      } else {
        inCode = true;
        html += '<pre class="dc-md-pre"><code>';
      }
      continue;
    }

    if (inCode) {
      html += `${line}\n`;
      continue;
    }

    if (!line.trim()) {
      closeList();
      html += '<div class="dc-md-spacer"></div>';
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      closeList();
      const level = Math.min(3, headingMatch[1].length);
      html += `<h${level} class="dc-md-h${level}">${formatInline(headingMatch[2])}</h${level}>`;
      continue;
    }

    const bulletMatch = line.match(/^\-\s+(.*)$/);
    if (bulletMatch) {
      if (!listOpen) {
        html += '<ul class="dc-md-ul">';
        listOpen = true;
      }
      html += `<li class="dc-md-li">${formatInline(bulletMatch[1])}</li>`;
      continue;
    }

    closeList();
    html += `<p class="dc-md-p">${formatInline(line)}</p>`;
  }

  closeList();
  if (inCode) {
    html += '</code></pre>';
  }

  return html;
}

