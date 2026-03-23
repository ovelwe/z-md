import type { CodeToken } from '../types';

const KEYWORDS = new Set([
    'const', 'let', 'var', 'function', 'return',
    'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue',
    'import', 'export', 'from',
    'type', 'interface', 'extends', 'implements',
    'class', 'new',
    'try', 'catch', 'finally', 'throw',
    'async', 'await',
    'typeof', 'instanceof',
    'enum', 'as', 'satisfies',
    'null', 'undefined', 'true', 'false',
    'void', 'never', 'any', 'unknown',
    'readonly', 'declare', 'module'
]);

export function tokenizeCode(code: string): CodeToken[] {
    const tokens: CodeToken[] = [];
    let i = 0;

    while (i < code.length) {
        const char = code[i];
        const rest = code.slice(i);

        const commentMatch = rest.match(/^\/\/.*/);
        if (commentMatch) {
            tokens.push({ type: 'comment', value: commentMatch[0] });
            i += commentMatch[0].length;
            continue;
        }

        const blockCommentMatch = rest.match(/^\/\*[\s\S]*?\*\//);
        if (blockCommentMatch) {
            tokens.push({ type: 'comment', value: blockCommentMatch[0] });
            i += blockCommentMatch[0].length;
            continue;
        }

        const stringMatch = rest.match(/^(['"`])((?:\\.|(?!\1).)*)\1/);
        if (stringMatch) {
            tokens.push({ type: 'string', value: stringMatch[0] });
            i += stringMatch[0].length;
            continue;
        }

        const numberMatch = rest.match(/^\b\d+(\.\d+)?\b/);
        if (numberMatch) {
            tokens.push({ type: 'number', value: numberMatch[0] });
            i += numberMatch[0].length;
            continue;
        }

        const functionMatch = rest.match(/^[a-zA-Z_$][\w$]*(?=\()/);
        if (functionMatch) {
            tokens.push({ type: 'function', value: functionMatch[0] });
            i += functionMatch[0].length;
            continue;
        }

        const wordMatch = rest.match(/^[a-zA-Z_$][\w$]*/);
        if (wordMatch) {
            const word = wordMatch[0];
            tokens.push({
                type: KEYWORDS.has(word) ? 'keyword' : 'plain',
                value: word,
            });
            i += word.length;
            continue;
        }

        const operatorMatch = rest.match(/^(=>|===|==|!==|!=|<=|>=|\+\+|--|&&|\|\||[=+\-*/%<>!])/);
        if (operatorMatch) {
            tokens.push({ type: 'operator', value: operatorMatch[0] });
            i += operatorMatch[0].length;
            continue;
        }

        tokens.push({ type: 'plain', value: char });
        i += 1;
    }

    return tokens;
}