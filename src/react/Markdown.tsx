import React from 'react';
import { parseMarkdown } from '../parse/parseMarkdown';
import { renderReact } from '../render/renderReact';

type MarkdownProps = {
    markdown: string;
    className?: string;
};

export function Markdown({ markdown, className = '' }: MarkdownProps) {
    const ast = parseMarkdown(markdown);

    return (
        <div className={`zmd ${className}`.trim()}>
            {renderReact(ast)}
        </div>
    );
}