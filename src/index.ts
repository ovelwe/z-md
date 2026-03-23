export { parseMarkdown } from './parse/parseMarkdown';
export { renderHtml } from './render/renderHtml';
export { renderReact } from './render/renderReact';
export { Markdown } from './react/Markdown';
export { CodeBlock } from './react/CodeBlock';

export type { MarkdownAst, BlockNode, InlineNode, CodeToken } from './types';

import { parseMarkdown } from './parse/parseMarkdown';
import { renderHtml } from './render/renderHtml';

export function markdownToHtml(markdown: string): string {
    return renderHtml(parseMarkdown(markdown));
}