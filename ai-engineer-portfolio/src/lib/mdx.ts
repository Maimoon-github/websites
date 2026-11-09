import { ArticlePost } from '@/types/portfolio';

export interface ParsedMdxBlock {
  type: 'heading' | 'code' | 'callout' | 'paragraph';
  text: string;
  id?: string;
  language?: string;
}

/**
 * Parse MDX content blocks (headings, fenced code blocks, callout blocks, and paragraphs)
 */
export function parseMdxBlocks(article: ArticlePost): ParsedMdxBlock[] {
  const rawBlocks = article.content.split('\n\n');
  return rawBlocks.map((block) => {
    if (block.startsWith('## ')) {
      const headingText = block.replace('## ', '').trim();
      const matching = article.headings.find((h) => h.text === headingText);
      const fallbackId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return {
        type: 'heading',
        text: headingText,
        id: matching?.id || fallbackId,
      };
    }
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const lang = lines[0].replace('```', '').trim() || 'text';
      const code = lines.slice(1, lines.length - 1).join('\n');
      return {
        type: 'code',
        language: lang,
        text: code,
      };
    }
    if (block.startsWith('> ')) {
      return {
        type: 'callout',
        text: block.replace(/^>\s*/gm, ''),
      };
    }
    return {
      type: 'paragraph',
      text: block,
    };
  });
}
