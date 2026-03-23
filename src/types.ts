export type InlineNode =
    | { type: 'text'; value: string }
    | { type: 'bold'; children: InlineNode[] }
    | { type: 'italic'; children: InlineNode[] }
    | { type: 'code'; value: string }
    | { type: 'link'; href: string; children: InlineNode[] };

export type BlockNode =
    | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
    | { type: 'paragraph'; children: InlineNode[] }
    | { type: 'codeBlock'; language?: string; value: string }
    | { type: 'blockquote'; children: InlineNode[] }
    | { type: 'unorderedList'; items: InlineNode[][] }
    | { type: 'orderedList'; items: InlineNode[][] };

export type MarkdownAst = BlockNode[];

export type CodeTokenType =
    | 'plain'
    | 'keyword'
    | 'string'
    | 'number'
    | 'comment'
    | 'function'
    | 'operator';

export type CodeToken = {
    type: CodeTokenType;
    value: string;
};