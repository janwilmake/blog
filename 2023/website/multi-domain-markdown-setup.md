I'm quite proud of my multi-domain frontend setup that I've built recently. My goal was to build a frontend with a very quick first contentful paint. I quickly learnt that I shouldn't import many libraries at the frontend, rather at the backend, to reduce bundle size per page.

I learned that if I'd use react-markdown, for example, my bundle-size would already triple. If I would parse with showdown it would cause a big slowdown in building time. So performance and size both mattered. Especially since I hope to make this incredible scalable (potentially to tens of thousands of pages).

The result can be seen on this website, and I'm quite happy with it. It works because of some quite nifty tricks:

1. I've done a [NextJS locale hack](./multi-domain-locale-hack-nextjs.md) to support multiple domains.

2. server-side NextJS looks in `public/domains/[domain]/**/*.md` to know which files to statically build with `getStaticPaths`. It then uses `getStaticProps` to parse the markdown files into html

3. To parse thousands of markdown files, I've used [markdown-wasm](https://github.com/rsms/markdown-wasm) and [html-rewriter-wasm](https://github.com/cloudflare/html-rewriter-wasm). This allows for incredible performance.

4. When I embed code extensions (ts, js, etc.) or a `.md` using `![]()` syntax, it will turn it into code syntax for codeblocks or replace the embed with the actual markdown, parsed. This works recursively!

5. Embedding zip files also works because I add this to the public folder at buildtime. This way I can add any files as long as they're available in the github repo.

6. I've added support for embedding JSON, CSV, Audio and Video in the same way you would normally embed an image in markdown (using `![]()` syntax).

7. For syntax highlighting in code-blocks I'll use [syntect wasm](https://github.com/Menci/syntect-js) or simply [highlight.js](https://highlightjs.org) on the server. This reduces the need for a frontend highlighting library as it's already styled HTML when it reaches the frontend.

The code of the result can be found [here](~/packages/user-facing/os-web/src.zip). Please note you may need some libraries!
