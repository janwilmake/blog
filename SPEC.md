# Blog — Static Site Builder Spec

A fully static Cloudflare Pages blog. `build.js` scans markdown files, builds a manifest, and generates a complete `public/` directory. Deployed via `wrangler` using the `assets` binding.

## Files

- `build.js` — single build script (ESM, Node.js)
- `wrangler.json` — Cloudflare config and site variables
- `manifest.json` — generated artifact, do not edit
- `public/` — generated output, do not edit

## `wrangler.json` vars

| Key | Purpose |
|---|---|
| `NAME` | Blog display name used in header, footer, RSS, llms.txt |
| `GITHUB` | Optional GitHub URL shown in header nav |
| `X` | Optional X/Twitter URL shown in header nav |
| `CONTEXT` | Optional URL shown as "context" link in header nav |

The `routes[0].pattern` field is used to derive `baseUrl` (`https://<pattern>`).

## `build.js` — what it does

### 1. Scan for entries (`findMarkdownFiles`)

- Recursively walks `./` ignoring `.git`, `.wrangler`, `node_modules`, `public`
- `.md` files: parsed for frontmatter; skipped if no `date` field
- `.url` files: parsed as Windows INI; the `url` key is fetched to retrieve remote markdown
- Frontmatter fields: `date` (required), `draft` (bool), `title`, `description`, `tags` (array)
- `title` falls back to: frontmatter → first `#` heading → filename
- `date` stored as ms since epoch (or `null`)
- `tag` (folder-level) = the root folder the file lives under
- `tags` (entry-level) = from frontmatter

### 2. Build manifest

`manifest.json` shape:

```json
{
  "tags": ["string"],          // root folder names that contain entries
  "allTags": ["string"],       // sorted frontmatter tags across all entries
  "tagToEntries": {            // tag → [slug, ...]
    "<tag>": ["<slug>"]
  },
  "entries": [{
    "draft": false,
    "slug": "folder/filename", // relative path without extension
    "date": 1700000000000,     // ms since epoch, or null
    "contentType": "markdown" | "url",
    "externalUrl": "https://…", // only for contentType "url"
    "title": "string",
    "description": "string",
    "tags": ["string"],
    "relatedSlugs": ["slug"]   // up to 5, TF-IDF cosine similarity
  }]
}
```

### 3. Compute related posts

TF-IDF cosine similarity across title (weighted ×3), tags (×2), and description. Up to 5 related slugs per entry. Only published (non-draft, dated) entries are considered.

### 4. Generate `public/`

| Output file | Generator |
|---|---|
| `index.html` | Home page — reverse-chrono list, tag filter bar |
| `<slug>.html` | Entry page — rendered markdown, article meta, related posts |
| `tag/<tag>/index.html` | Tag page — filtered entry list |
| `index.md` | LLM-friendly markdown index |
| `tag/<tag>/index.md` | LLM-friendly per-tag markdown index |
| `feed.xml` | RSS 2.0 |
| `llms.txt` | [llmstxt.org](https://llmstxt.org) format |
| *(static assets)* | `.md`, images, video, pdf, fonts copied verbatim |

All HTML pages share a single `htmlTemplate` with:
- Light/dark CSS variables
- Header: blog name (links `/`), nav: RSS · LLMs.txt · GitHub · X · context · Chat button
- Footer: blog name
- Responsive layout, max-width 720px

External links in rendered markdown get `target="_blank" rel="noopener noreferrer"` automatically.

The "Chat with Blog" button in the nav links to `https://installthismcp.com/blog-janwilmake-com?url=https://mcp.llmtext.com/<hostname>/mcp` and is only rendered when a hostname is configured.

### 5. Entry page detail

- Date injected after `</h1>` as `<div class="article-meta"><time>…</time></div>`
- Frontmatter tags rendered as pill links at bottom of article
- Related posts section below article (up to 5)
- `<link rel="alternate" type="text/markdown" href="/<slug>.md">` in `<head>`

## Running

```sh
node build.js      # generates manifest.json and public/
npx wrangler dev   # local preview
npx wrangler deploy             # deploy to Cloudflare Pages
```