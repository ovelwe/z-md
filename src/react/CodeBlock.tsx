import React from 'react';
import { tokenizeCode } from '../highlight/tokenizeCode';

type CodeBlockProps = {
    code: string;
    language?: string;
};

export function CodeBlock({ code, language }: CodeBlockProps) {
    const tokens = tokenizeCode(code);

    return (
        <pre className="zmd-pre">
      <code className={`zmd-code-block language-${language ?? 'plain'}`}>
        {tokens.map((token, index) => (
            <span
                key={`${token.type}-${index}`}
                className={`zmd-token zmd-token-${token.type}`}
            >
            {token.value}
          </span>
        ))}
      </code>
    </pre>
    );
}