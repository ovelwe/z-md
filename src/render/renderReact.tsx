import React, {JSX} from 'react';
import type { BlockNode, InlineNode, MarkdownAst } from '../types';
import { CodeBlock } from '../react/CodeBlock';

function renderInline(nodes: InlineNode[]): React.ReactNode {
    return nodes.map((node, index) => {
        switch (node.type) {
            case 'text':
                return <React.Fragment key={index}>{node.value}</React.Fragment>;

            case 'bold':
                return (
                    <strong key={index} className="zmd-strong">
                        {renderInline(node.children)}
                    </strong>
                );

            case 'italic':
                return (
                    <em key={index} className="zmd-em">
                        {renderInline(node.children)}
                    </em>
                );

            case 'code':
                return (
                    <code key={index} className="zmd-inline-code">
                        {node.value}
                    </code>
                );

            case 'link':
                return (
                    <a key={index} href={node.href} className="zmd-link">
                        {renderInline(node.children)}
                    </a>
                );
        }
    });
}

function renderBlock(node: BlockNode, index: number): React.ReactNode {
    switch (node.type) {
        case 'heading': {
            const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
            return (
                <Tag key={index} className={`zmd-heading zmd-heading-${node.level}`}>
                    {renderInline(node.children)}
                </Tag>
            );
        }

        case 'paragraph':
            return (
                <p key={index} className="zmd-paragraph">
                    {renderInline(node.children)}
                </p>
            );

        case 'codeBlock':
            return (
                <CodeBlock
                    key={index}
                    code={node.value}
                    language={node.language}
                />
            );

        case 'blockquote':
            return (
                <blockquote key={index} className="zmd-blockquote">
                    {renderInline(node.children)}
                </blockquote>
            );

        case 'unorderedList':
            return (
                <ul key={index} className="zmd-list zmd-ul">
                    {node.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="zmd-list-item">
                            {renderInline(item)}
                        </li>
                    ))}
                </ul>
            );

        case 'orderedList':
            return (
                <ol key={index} className="zmd-list zmd-ol">
                    {node.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="zmd-list-item">
                            {renderInline(item)}
                        </li>
                    ))}
                </ol>
            );
    }
}

export function renderReact(ast: MarkdownAst): React.ReactNode {
    return ast.map(renderBlock);
}