import type { BlockNode, InlineNode, MarkdownAst } from '../types';
import { escapeHtml } from '../utils/escapeHtml';
import { tokenizeCode } from '../highlight/tokenizeCode';

function renderInline(nodes: InlineNode[]): string {
    return nodes
        .map((node) => {
            switch (node.type) {
                case 'text':
                    return escapeHtml(node.value);

                case 'bold':
                    return `<strong class="zmd-strong">${renderInline(node.children)}</strong>`;

                case 'italic':
                    return `<em class="zmd-em">${renderInline(node.children)}</em>`;

                case 'code':
                    return `<code class="zmd-inline-code">${escapeHtml(node.value)}</code>`;

                case 'link':
                    return `<a href="${escapeHtml(node.href)}" class="zmd-link">${renderInline(node.children)}</a>`;
            }
        })
        .join('');
}

function renderBlock(node: BlockNode): string {
    switch (node.type) {
        case 'heading':
            return `<h${node.level} class="zmd-heading zmd-heading-${node.level}">${renderInline(node.children)}</h${node.level}>`;

        case 'paragraph':
            return `<p class="zmd-paragraph">${renderInline(node.children)}</p>`;

        case 'codeBlock': {
            // Подключаем токенизатор для чистой HTML версии тоже!
            const tokens = tokenizeCode(node.value);
            const tokensHtml = tokens
                .map(t => `<span class="zmd-token zmd-token-${t.type}">${escapeHtml(t.value)}</span>`)
                .join('');

            return `<pre class="zmd-pre"><code class="zmd-code-block language-${escapeHtml(node.language ?? 'plain')}">${tokensHtml}</code></pre>`;
        }

        case 'blockquote':
            return `<blockquote class="zmd-blockquote">${renderInline(node.children)}</blockquote>`;

        case 'unorderedList':
            return `<ul class="zmd-list zmd-ul">${node.items
                .map((item) => `<li class="zmd-list-item">${renderInline(item)}</li>`)
                .join('')}</ul>`;

        case 'orderedList':
            return `<ol class="zmd-list zmd-ol">${node.items
                .map((item) => `<li class="zmd-list-item">${renderInline(item)}</li>`)
                .join('')}</ol>`;
    }
}

export function renderHtml(ast: MarkdownAst): string {
    // Оборачиваем весь HTML в div с классом zmd, чтобы применились базовые стили
    return `<div class="zmd">\n${ast.map(renderBlock).join('\n')}\n</div>`;
}