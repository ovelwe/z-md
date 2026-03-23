import type { MarkdownAst } from '../types';
import { parseInline } from './parseInline';

export function parseMarkdown(markdown: string): MarkdownAst {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const ast: MarkdownAst = [];

    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (!line.trim()) {
            i += 1;
            continue;
        }

        const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
            ast.push({
                type: 'heading',
                level: headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6,
                children: parseInline(headingMatch[2]),
            });
            i += 1;
            continue;
        }

        const codeBlockStart = line.match(/^```\s*(\w+)?/);
        if (codeBlockStart) {
            let language = codeBlockStart[1];

            const languageAliases: Record<string, string> = {
                js: 'javascript',
                ts: 'typescript',
                jsx: 'javascript',
                tsx: 'typescript',
                cjs: 'javascript',
                mjs: 'javascript',
                mts: 'typescript',
                cts: 'typescript',
                golang: 'go',
                rs: 'rust',
                py: 'python',
            };

            if (language) {
                language = language.toLowerCase();
                if (languageAliases[language]) {
                    language = `${language} ${languageAliases[language]}`;
                }
            }

            const codeLines: string[] = [];
            i += 1;

            while (i < lines.length && !/^```/.test(lines[i])) {
                codeLines.push(lines[i]);
                i += 1;
            }

            ast.push({
                type: 'codeBlock',
                language,
                value: codeLines.join('\n'),
            });

            i += 1;
            continue;
        }

        if (line.startsWith('> ')) {
            ast.push({
                type: 'blockquote',
                children: parseInline(line.slice(2)),
            });
            i += 1;
            continue;
        }

        if (/^[-*]\s+/.test(line)) {
            const items = [];

            while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
                items.push(parseInline(lines[i].replace(/^[-*]\s+/, '')));
                i += 1;
            }

            ast.push({
                type: 'unorderedList',
                items,
            });

            continue;
        }

        if (/^\d+\.\s+/.test(line)) {
            const items = [];

            while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
                items.push(parseInline(lines[i].replace(/^\d+\.\s+/, '')));
                i += 1;
            }

            ast.push({
                type: 'orderedList',
                items,
            });

            continue;
        }

        const paragraphLines: string[] = [];

        paragraphLines.push(lines[i]);
        i += 1;

        while (
            i < lines.length &&
            lines[i].trim() &&
            !/^(#{1,6})\s+/.test(lines[i]) &&
            !/^```/.test(lines[i]) &&
            !/^>\s+/.test(lines[i]) &&
            !/^[-*]\s+/.test(lines[i]) &&
            !/^\d+\.\s+/.test(lines[i])
            ) {
            paragraphLines.push(lines[i]);
            i += 1;
        }

        ast.push({
            type: 'paragraph',
            children: parseInline(paragraphLines.join(' ')),
        });
    }

    return ast;
}