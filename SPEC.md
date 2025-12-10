I have a blog in a repo 'blog' I want to make a simple Cloudflare worker that hosts my blog entries by:

1. build.js: creating or updating a 'manifest.json' looking at created at of the files and the file names available. also, look in front matter if there's a date available in format YYYY-MM[-DD] (looks in ./ in all folders recursively for .md files)
2. worker.ts: imports the manifest.json and use server side markdown to html and a template html around it to render each
3. the homepage is just a list from the manifest, sorted reverse chronologically
4. there is a `/llms.txt` available too that lists all entries for AI according to https://llmstxt.org/index.md

NB: the markdown files are available using env.ASSETS.fetch

Please make me the build.js (making the manifest), package.json, wrangler.json (not toml), and `worker.ts`. In build.js ensure to ignore `.git`, `.wrangler` and `node_modules`. give me a new build.js
