# ⚡ z-md

**z-md** is a simple, fast, and lightweight Markdown parser and renderer built with a focus on performance and beauty out of the box.

Unlike heavy libraries, `z-md` comes with **built-in syntax highlighting** and **ready-to-use styles**, so you don't need to install `prism.js`, `highlight.js`, or write CSS from scratch.

## ✨ Features

- ⚛️ **React and pure HTML support** out of the box.
- 🎨 **Beautiful dark theme** by default (easily customizable via CSS variables).
- 🌈 **Built-in code tokenizer** (syntax highlighting for JS, TS, React, and more without third-party dependencies).
- 🚀 **Zero-config** — works right after installation.
- 📦 **Minimal bundle size** — no heavy regex from giant packages.

## 📦 Installation

```bash
npm install @ovelwe/z-md
```

## 🚀 Usage (React)

The easiest way is to use the ready-made `<Markdown />` component.
**Don't forget to import the styles!**

```tsx
import React from 'react';
import { Markdown } from '@ovelwe/z-md';
import '@ovelwe/z-md/styles.css'; // Required style import

const myMarkdown = `
# Hello, world!
This is an example of using the **z-md** library.

> It supports blockquotes, lists, and built-in code highlighting!

\`\`\`tsx
const App = () => {
  return <div>Hello</div>;
};
\`\`\`
`;

export function App() {
  return (
    <div style={{ padding: '20px', background: '#0f172a' }}>
      <Markdown markdown={myMarkdown} />
    </div>
  );
}
```

## 🌐 Usage (Vanilla JS / HTML)

If you're not using React, you can generate a ready-made HTML string. The styles will also be applied automatically.

```javascript
import { markdownToHtml } from '@ovelwe/z-md';
import '@ovelwe/z-md/styles.css'; // Required style import
import '@ovelwe/z-md/styles.css'; // Required style import

const htmlString = markdownToHtml('# Heading\nPlain text');

document.getElementById('content').innerHTML = htmlString;
```

## 💻 Syntax Highlighting

`z-md` automatically highlights code. You can use short language aliases when creating code blocks:

- `js` / `javascript` / `mjs` / `cjs`
- `ts` / `typescript` / `mts`
- `jsx` / `tsx`
- `py` / `python`
- `rs` / `rust`
- `go` / `golang`

Example in Markdown:

````markdown
```ts
// Just write ```ts or ```typescript
const name: string = "z-md";
```
````

## 🎨 Style Customization (CSS Variables)

The library comes with a beautiful dark theme. If you want to change the colors to match your site's design, simply override the CSS variables in your global stylesheet:

```css
/* Example: changing the accent color to blue and the background to a lighter shade */
.zmd {
  --zmd-accent: #3b82f6;                    /* Link color and blockquote accent */
  --zmd-accent-bg: rgba(59, 130, 246, 0.1); /* Blockquote background */
  --zmd-pre-bg: #1e1e1e;                    /* Code block background */
  --zmd-text: #d1d5db;                      /* Main text color */
  --zmd-heading: #ffffff;                   /* Heading color */
  
  /* Syntax tokens (if needed) */
  --zmd-tok-keyword: #c084fc;
  --zmd-tok-string: #f59e0b;
}
```

## 🛠 Advanced Usage (AST)

If you need to write your own renderer, you can get the abstract syntax tree (AST):

```javascript
import { parseMarkdown } from '@ovelwe/z-md';

const ast = parseMarkdown('# Hello');
console.log(ast); 
/* 
[ 
  { 
    type: 'heading', 
    level: 1, 
    children: [ { type: 'text', value: 'Hello' } ] 
  } 
] 
*/
```

## 📄 License

MIT © [ovelwe](https://github.com/ovelwe)
```