I have a blog in a repo 'blog' I want to make a simple Cloudflare worker that hosts my blog entries by:

1. `build.js`: creating or overwriting a `manifest.json` with the following datastructure: `{tags:string[],entries:{ draft:boolean,slug:string, date: number|null,contentType:"markdown"|"url",externalUrl?:string}[]}`.

   - looks in `./` in all folders recursively for .md files. Having a `date` frontmatter is required
   - ignore `.git`, `.wrangler` and `node_modules`
   - Date is set as ms since 1970 or null if missing
   - Tags are only the root folders that have entries
   - `.url` files must be fetched to get remote markdown files. they can be parsed in windows ini format
   - Other frontmatter taken into account: `{draft:boolean,title:string,description:string}`

2. `worker.ts`:

   - the markdown files are available using `env.ASSETS.fetch`
   - has access to import `manifest.json`
   - use server side markdown to html and a template html around it to render each blog
   - `/`:
   - the homepage is just a list from the manifest, sorted reverse chronologically
   - can filter by tags
   - if `env.ADMIN_PASSWORD` is available, allow admin sign in at `/login` with `www-authenticate`, which sets Cookie. if matches, show all drafts too in homepage
   - there is an rss feed at `/feed`
   - there is a `/llms.txt` available too that lists all entries for AI according to https://llmstxt.org/index.md

Please make me the `build.js` (making the manifest), package.json, wrangler.json (not toml), and `worker.ts`.
