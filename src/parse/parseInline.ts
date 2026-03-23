import type { InlineNode } from '../types';

export function parseInline(text: string): InlineNode[] {
    const nodes: InlineNode[] = [];
    let rest = text;

    while (rest.length > 0) {
        const boldMatch = rest.match(/^\*\*(.+?)\*\*/);
        if (boldMatch) {
            nodes.push({
                type: 'bold',
                children: parseInline(boldMatch[1]),
            });
            rest = rest.slice(boldMatch[0].length);
            continue;
        }

        const italicMatch = rest.match(/^\*(.+?)\*/);
        if (italicMatch) {
            nodes.push({
                type: 'italic',
                children: parseInline(italicMatch[1]),
            });
            rest = rest.slice(italicMatch[0].length);
            continue;
        }

        const codeMatch = rest.match(/^`([^`]+)`/);
        if (codeMatch) {
            nodes.push({
                type: 'code',
                value: codeMatch[1],
            });
            rest = rest.slice(codeMatch[0].length);
            continue;
        }

        const linkMatch = rest.match(/^\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
            nodes.push({
                type: 'link',
                href: linkMatch[2],
                children: parseInline(linkMatch[1]),
            });
            rest = rest.slice(linkMatch[0].length);
            continue;
        }

        const nextSpecial = rest.search(/(\*\*|\*|`|\[)/);

        if (nextSpecial === -1) {
            nodes.push({
                type: 'text',
                value: rest,
            });
            break;
        }

        if (nextSpecial > 0) {
            nodes.push({
                type: 'text',
                value: rest.slice(0, nextSpecial),
            });
            rest = rest.slice(nextSpecial);
            continue;
        }

        nodes.push({
            type: 'text',
            value: rest[0],
        });
        rest = rest.slice(1);
    }

    return nodes;
}