import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IGNORE_DIRS = new Set([".git", ".wrangler", "node_modules", "public"]);


function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: {}, content };

  const frontmatterText = match[1];
  const frontmatter = {};

  frontmatterText.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Parse arrays
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }
    // Remove quotes if present
    else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    // Parse boolean values
    else if (value === "true") value = true;
    else if (value === "false") value = false;

    frontmatter[key] = value;
  });

  return {
    frontmatter,
    content: content.slice(match[0].length),
  };
}

function extractFirstHeader(content) {
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#")) {
      return trimmed.replace(/^#+\s*/, "").trim();
    }
  }
  return null;
}

function getTitleFromFilename(filename) {
  return path.basename(filename, path.extname(filename));
}

function determineTitle(frontmatter, content, filename) {
  if (frontmatter.title) return frontmatter.title;
  const headerTitle = extractFirstHeader(content);
  if (headerTitle) return headerTitle;
  return getTitleFromFilename(filename);
}

function parseIniFile(content) {
  const lines = content.split("\n");
  const result = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(";") || trimmed.startsWith("#"))
      continue;

    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) continue;

    const key = trimmed.slice(0, equalIndex).trim().toLowerCase();
    const value = trimmed.slice(equalIndex + 1).trim();
    result[key] = value;
  }

  return result;
}

async function fetchUrlFile(urlFilePath) {
  const content = fs.readFileSync(urlFilePath, "utf-8");
  const config = parseIniFile(content);

  if (!config.url) {
    throw new Error(`No URL found in ${urlFilePath}`);
  }

  console.log(`Fetching ${config.url}...`);
  const response = await fetch(config.url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${config.url}: ${response.statusText}`);
  }

  return await response.text();
}

function parseDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.getTime();
}

async function findMarkdownFiles(dir, rootDir = dir, currentTag = null) {
  const entries = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(rootDir, fullPath);

    if (item.isDirectory()) {
      if (IGNORE_DIRS.has(item.name)) continue;

      const tag = currentTag || item.name;
      const subEntries = await findMarkdownFiles(fullPath, rootDir, tag);
      entries.push(...subEntries);
    } else if (item.isFile()) {
      const ext = path.extname(item.name);

      if (ext === ".md") {
        const content = fs.readFileSync(fullPath, "utf-8");
        const { frontmatter, content: mainContent } = parseFrontmatter(content);

        if (!frontmatter.date) {
          console.warn(`Skipping ${relativePath}: no date in frontmatter`);
          continue;
        }

        const slug = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");
        const title = determineTitle(frontmatter, mainContent, item.name);

        entries.push({
          draft: frontmatter.draft === true,
          slug,
          date: parseDate(frontmatter.date),
          contentType: "markdown",
          title,
          description: frontmatter.description || "",
          tag: currentTag,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        });
      } else if (ext === ".url") {
        try {
          const markdown = await fetchUrlFile(fullPath);
          const { frontmatter, content: mainContent } = parseFrontmatter(markdown);

          if (!frontmatter.date) {
            console.warn(`Skipping ${relativePath}: no date in frontmatter`);
            continue;
          }

          const iniContent = fs.readFileSync(fullPath, "utf-8");
          const config = parseIniFile(iniContent);

          const slug = relativePath.replace(/\.url$/, "").replace(/\\/g, "/");
          const title = determineTitle(frontmatter, mainContent, item.name);

          entries.push({
            draft: frontmatter.draft === true,
            slug,
            date: parseDate(frontmatter.date),
            contentType: "url",
            externalUrl: config.url,
            title,
            description: frontmatter.description || "",
            tag: currentTag,
            tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          });
        } catch (error) {
          console.error(`Error processing ${relativePath}:`, error.message);
        }
      }
    }
  }

  return entries;
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can',
  'was', 'one', 'our', 'out', 'get', 'has', 'how', 'its', 'may', 'new',
  'now', 'see', 'two', 'way', 'who', 'did', 'let', 'put', 'say', 'too',
  'use', 'that', 'this', 'with', 'from', 'they', 'been', 'have', 'more',
  'will', 'into', 'your', 'what', 'than', 'then', 'some', 'when', 'make',
  'like', 'time', 'just', 'know', 'take', 'also', 'even', 'about', 'very',
  'after', 'back', 'good', 'much', 'only', 'well', 'most', 'over', 'such',
]);

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function computeRelatedSlugs(entries, topN = 5) {
  const published = entries.filter((e) => !e.draft && e.date !== null);

  const docs = published.map((entry) => {
    const t = tokenize(entry.title || '');
    const d = tokenize(entry.description || '');
    const g = (entry.tags || []).flatMap((tag) => tokenize(tag));
    return [...t, ...t, ...t, ...g, ...g, ...d];
  });

  const tfs = docs.map((tokens) => {
    const tf = {};
    for (const token of tokens) tf[token] = (tf[token] || 0) + 1;
    const total = tokens.length || 1;
    for (const token in tf) tf[token] /= total;
    return tf;
  });

  const n = published.length;
  const df = {};
  for (const tf of tfs) {
    for (const token of Object.keys(tf)) df[token] = (df[token] || 0) + 1;
  }

  const vectors = tfs.map((tf) => {
    const vec = {};
    for (const token in tf) {
      vec[token] = tf[token] * Math.log((n + 1) / ((df[token] || 0) + 1));
    }
    return vec;
  });

  const norms = vectors.map((vec) =>
    Math.sqrt(Object.values(vec).reduce((s, v) => s + v * v, 0))
  );

  const slugToRelated = {};
  published.forEach((entry, i) => {
    const vecA = vectors[i];
    const normA = norms[i];

    const sims = published
      .map((other, j) => {
        if (i === j) return { slug: other.slug, sim: -1 };
        let dot = 0;
        for (const token in vecA) {
          if (vectors[j][token]) dot += vecA[token] * vectors[j][token];
        }
        const sim = normA && norms[j] ? dot / (normA * norms[j]) : 0;
        return { slug: other.slug, sim };
      })
      .filter((x) => x.sim > 0)
      .sort((a, b) => b.sim - a.sim)
      .slice(0, topN)
      .map((x) => x.slug);

    slugToRelated[entry.slug] = sims;
  });

  return slugToRelated;
}

// ─── HTML generation ─────────────────────────────────────────────────────────

function htmlTemplate(title, content, config, description, hostname, mdUrl) {
  const blogName = config.NAME || 'Blog';

  const metaTags = description
    ? `
  <meta name="description" content="${description}">
  <meta property="og:description" content="${description}">
  <meta name="twitter:description" content="${description}">`
    : '';

  const alternateLink = mdUrl
    ? `\n  <link rel="alternate" type="text/markdown" href="${mdUrl}">`
    : '';

  const chatBtn = hostname
    ? `<a href="https://installthismcp.com/blog-janwilmake-com?url=https://mcp.llmtext.com/${hostname}/mcp" class="chat-btn" target="_blank" rel="noopener noreferrer">Chat with Blog</a>`
    : '';

  const navLinks = [];
  navLinks.push(`<a href="/feed.xml">RSS</a>`);
  navLinks.push(`<a href="/llms.txt">LLMs.txt</a>`);
  if (config.GITHUB) navLinks.push(`<a href="${config.GITHUB}" target="_blank" rel="noopener noreferrer">GitHub</a>`);
  if (config.X) navLinks.push(`<a href="${config.X}" target="_blank" rel="noopener noreferrer">X</a>`);
  if (config.CONTEXT) navLinks.push(`<a href="${config.CONTEXT}" target="_blank" rel="noopener noreferrer">context</a>`);
  if (chatBtn) navLinks.push(chatBtn);
  const navHtml = navLinks.join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta property="og:title" content="${title}">
  <meta name="twitter:title" content="${title}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary">${metaTags}${alternateLink}
  <style>
    :root {
      --font-sans: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
      --bg: #ffffff;
      --surface: #f1f5f9;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --text-faint: #94a3b8;
      --accent: #2563eb;
      --accent-hover: #1d4ed8;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0f172a;
        --surface: #1e293b;
        --border: #334155;
        --text: #f1f5f9;
        --text-muted: #94a3b8;
        --text-faint: #64748b;
        --accent: #60a5fa;
        --accent-hover: #93c5fd;
      }
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: var(--font-sans);
      font-size: 17px;
      line-height: 1.7;
      background: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .page-wrap { max-width: 720px; margin: 0 auto; padding: 0 1.5rem; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* Header */
    .site-header { border-bottom: 1px solid var(--border); margin-bottom: 3rem; }
    .site-header .page-wrap {
      display: flex; justify-content: space-between; align-items: center;
      gap: 1rem; flex-wrap: wrap; padding-top: 1.25rem; padding-bottom: 1.25rem;
    }
    .site-brand { font-size: 1.0625rem; font-weight: 700; letter-spacing: -0.02em; }
    .site-brand a { color: var(--text); text-decoration: none; }
    .site-nav { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; font-size: 0.875rem; }
    .site-nav a { color: var(--text-muted); text-decoration: none; }
    .site-nav a:hover { color: var(--text); }
    .chat-btn {
      display: inline-flex; align-items: center;
      background: var(--accent); color: #fff !important;
      font-size: 0.8125rem; font-weight: 500;
      padding: 0.375rem 0.875rem; border-radius: 6px;
      text-decoration: none !important; white-space: nowrap;
      transition: opacity 0.15s;
    }
    .chat-btn:hover { opacity: 0.85; text-decoration: none !important; }

    /* Footer */
    .site-footer {
      margin-top: 5rem; border-top: 1px solid var(--border);
      padding: 1.5rem 0; font-size: 0.8125rem; color: var(--text-faint);
    }

    /* Post list (home / tag pages) */
    .utility-bar {
      display: flex; gap: 1.25rem; font-size: 0.8125rem;
      color: var(--text-faint); margin-bottom: 1.75rem;
    }
    .utility-bar a { color: var(--text-faint); }
    .utility-bar a:hover { color: var(--text-muted); text-decoration: none; }
    .tag-filter { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 2.5rem; align-items: center; }
    .tag-filter-label { font-size: 0.8125rem; color: var(--text-faint); margin-right: 0.25rem; }
    .post-list { display: flex; flex-direction: column; }
    .post-card { padding: 1.75rem 0; border-bottom: 1px solid var(--border); }
    .post-card:first-child { padding-top: 0; }
    .post-card-meta { font-size: 0.8125rem; color: var(--text-faint); margin-bottom: 0.4rem; }
    .post-card h2 {
      font-size: 1.1875rem; font-weight: 600; line-height: 1.4;
      letter-spacing: -0.015em; margin: 0 0 0.4rem;
    }
    .post-card h2 a { color: var(--text); text-decoration: none; }
    .post-card h2 a:hover { color: var(--accent); }
    .post-card-desc { font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6; margin: 0; }

    /* Tags */
    .tag {
      display: inline-block; padding: 0.2rem 0.65rem;
      border-radius: 9999px; font-size: 0.775rem;
      background: var(--surface); color: var(--text-muted);
      text-decoration: none; border: 1px solid var(--border);
      transition: background 0.15s, color 0.15s;
    }
    .tag:hover { background: var(--border); color: var(--text); text-decoration: none; }

    /* Article prose */
    .prose { font-size: 1.0625rem; line-height: 1.8; overflow-x: hidden; }
    .prose h1 {
      font-size: 2rem; font-weight: 800; line-height: 1.2;
      letter-spacing: -0.03em; margin: 0 0 0.375rem;
    }
    .prose h2 { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.3; margin: 2.5rem 0 0.875rem; }
    .prose h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.3; margin: 2rem 0 0.75rem; }
    .prose h4, .prose h5, .prose h6 { font-weight: 600; margin: 1.5rem 0 0.5rem; }
    .prose p { margin: 0 0 1.25rem; }
    .prose ul, .prose ol { margin: 0 0 1.25rem; padding-left: 1.5rem; }
    .prose li { margin-bottom: 0.35rem; }
    .prose strong { font-weight: 600; }
    .prose blockquote {
      border-left: 3px solid var(--accent); padding: 0.25rem 0 0.25rem 1.25rem;
      margin: 1.5rem 0; color: var(--text-muted); font-style: italic;
    }
    .prose blockquote p:last-child { margin-bottom: 0; }
    .prose hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }
    .prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
    .prose a:hover { opacity: 0.8; text-decoration: underline; }
    .prose img { max-width: 100%; height: auto; border-radius: 8px; margin: 1.5rem 0; display: block; }
    .prose video { max-width: 100%; height: auto; border-radius: 8px; }
    .prose iframe { max-width: 100%; }
    .prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9375rem; }
    .prose th, .prose td { border: 1px solid var(--border); padding: 0.5rem 0.75rem; text-align: left; }
    .prose th { background: var(--surface); font-weight: 600; }

    /* Code */
    code {
      font-family: var(--font-mono); font-size: 0.875em;
      background: var(--surface); border: 1px solid var(--border);
      padding: 0.15em 0.4em; border-radius: 4px;
    }
    pre {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 8px; padding: 1.25rem; overflow-x: auto;
      margin: 0 0 1.5rem; line-height: 1.6;
    }
    pre code { background: none; border: none; padding: 0; font-size: 0.875rem; }

    /* Article meta */
    .article-meta {
      font-size: 0.875rem; color: var(--text-faint);
      margin: 0 0 2.5rem; display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;
    }
    .article-tags {
      display: flex; flex-wrap: wrap; gap: 0.375rem;
      margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--border);
    }

    /* Related posts */
    .related-posts { margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--border); }
    .related-heading {
      font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--text-faint); margin: 0 0 1.25rem;
    }
    .related-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.125rem; }
    .related-item-title { font-size: 0.9375rem; font-weight: 500; margin: 0 0 0.2rem; }
    .related-item-title a { color: var(--text); text-decoration: none; }
    .related-item-title a:hover { color: var(--accent); }
    .related-item-desc { font-size: 0.8125rem; color: var(--text-muted); margin: 0; line-height: 1.5; }
    .related-item-date { font-size: 0.75rem; color: var(--text-faint); margin-top: 0.2rem; }

    /* Tag page */
    .tag-page-title { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 0.375rem; }
    .back-link { display: inline-block; font-size: 0.875rem; color: var(--text-muted); text-decoration: none; margin-top: 3rem; }
    .back-link:hover { color: var(--text); text-decoration: none; }

    @media (max-width: 640px) {
      body { font-size: 16px; }
      .page-wrap { padding: 0 1rem; }
      .prose h1 { font-size: 1.625rem; }
      .prose h2 { font-size: 1.25rem; }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="page-wrap">
      <div class="site-brand"><a href="/">${blogName}</a></div>
      <nav class="site-nav">${navHtml}</nav>
    </div>
  </header>
  <main>
    <div class="page-wrap">
      ${content}
    </div>
  </main>
  <footer class="site-footer">
    <div class="page-wrap">${blogName}</div>
  </footer>
</body>
</html>`;
}

function generateHomePage(entries, manifest, config, hostname) {
  const sorted = entries
    .filter((e) => !e.draft && e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  const entriesHtml = sorted
    .map((entry) => {
      const date = entry.date
        ? new Date(entry.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "No date";
      return `
      <article class="post-card">
        <div class="post-card-meta">${date}</div>
        <h2><a href="/${entry.slug}">${entry.title || entry.slug}</a></h2>
        ${entry.description ? `<p class="post-card-desc">${entry.description}</p>` : ""}
      </article>
    `;
    })
    .join("");

  const allTagsList = [...manifest.tags, ...manifest.allTags];
  const tagsHtml = allTagsList.length > 0
    ? `
    <div class="tag-filter">
      <span class="tag-filter-label">Filter:</span>
      <a href="/" class="tag" style="background:var(--border);color:var(--text)">All</a>
      ${allTagsList.map((t) => `<a href="/tag/${encodeURIComponent(t)}" class="tag">${t}</a>`).join("")}
    </div>
  `
    : "";

  return htmlTemplate(
    config.NAME || "Blog",
    `
    ${tagsHtml}
    <div class="post-list">${entriesHtml}</div>
  `,
    config,
    undefined,
    hostname,
    '/index.md',
  );
}

function generateTagPage(tag, entries, manifest, config, hostname) {
  const entrySlugs = manifest.tagToEntries[tag];
  if (!entrySlugs || entrySlugs.length === 0) return null;

  const tagEntries = entries
    .filter((e) => entrySlugs.includes(e.slug))
    .filter((e) => !e.draft && e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  if (tagEntries.length === 0) return null;

  const entriesHtml = tagEntries
    .map((entry) => {
      const date = entry.date
        ? new Date(entry.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "No date";
      return `
      <article class="post-card">
        <div class="post-card-meta">${date}</div>
        <h2><a href="/${entry.slug}">${entry.title || entry.slug}</a></h2>
        ${entry.description ? `<p class="post-card-desc">${entry.description}</p>` : ""}
      </article>
    `;
    })
    .join("");

  return htmlTemplate(
    `${tag} — ${config.NAME || 'Blog'}`,
    `
    <h1 class="tag-page-title">#${tag}</h1>
    <p style="color:var(--text-muted);font-size:0.9375rem;margin:0.375rem 0 2rem">Posts tagged with <strong>${tag}</strong></p>
    <div class="post-list">${entriesHtml}</div>
    <a href="/" class="back-link">← All posts</a>
  `,
    config,
    undefined,
    hostname,
    `/tag/${encodeURIComponent(tag)}/index.md`,
  );
}

async function generateEntryPage(entry, allEntries, config, hostname) {
  let markdown;

  if (entry.contentType === "url" && entry.externalUrl) {
    const response = await fetch(entry.externalUrl);
    if (!response.ok) {
      console.error(`Failed to fetch ${entry.externalUrl} for ${entry.slug}`);
      return null;
    }
    markdown = await response.text();
  } else {
    const mdPath = path.join(__dirname, entry.slug + ".md");
    if (!fs.existsSync(mdPath)) {
      console.warn(`Missing file: ${mdPath}`);
      return null;
    }
    markdown = fs.readFileSync(mdPath, "utf-8");
  }

  const { frontmatter, content } = parseFrontmatter(markdown);

  const renderer = new marked.Renderer();
  const originalLinkRenderer = renderer.link.bind(renderer);
  renderer.link = (href, title, text) => {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    const html = originalLinkRenderer(href, title, text);
    if (isExternal) {
      return html.replace('<a', '<a target="_blank" rel="noopener noreferrer"');
    }
    return html;
  };

  const articleHtml = await marked(content, { renderer });
  const title = frontmatter.title || entry.slug;
  const description = frontmatter.description || entry.description;
  const date = entry.date
    ? new Date(entry.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  const h1End = articleHtml.indexOf('</h1>');
  const metaHtml = date ? `<div class="article-meta"><time>${date}</time></div>` : '';
  let bodyHtml;
  if (h1End !== -1) {
    bodyHtml = articleHtml.slice(0, h1End + 5) + metaHtml + articleHtml.slice(h1End + 5);
  } else {
    bodyHtml = metaHtml + articleHtml;
  }

  const tags = frontmatter.tags || entry.tags || [];
  const tagsHtml = tags.length > 0
    ? `<div class="article-tags">${tags.map((tag) => `<a href="/tag/${encodeURIComponent(tag)}" class="tag">${tag}</a>`).join("")}</div>`
    : "";

  const relatedSlugs = entry.relatedSlugs || [];
  const relatedEntries = relatedSlugs
    .map((s) => allEntries.find((e) => e.slug === s))
    .filter((e) => !!e && !e.draft);

  const relatedHtml = relatedEntries.length > 0
    ? `
    <section class="related-posts">
      <h2 class="related-heading">Related Posts</h2>
      <ul class="related-list">
        ${relatedEntries.map((r) => {
          const rDate = r.date
            ? new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
            : "";
          return `
          <li class="related-item">
            <div class="related-item-title"><a href="/${r.slug}">${r.title || r.slug}</a></div>
            ${r.description ? `<p class="related-item-desc">${r.description}</p>` : ""}
            ${rDate ? `<div class="related-item-date">${rDate}</div>` : ""}
          </li>`;
        }).join("")}
      </ul>
    </section>`
    : "";

  return htmlTemplate(
    title,
    `
    <article class="prose">
      ${bodyHtml}
      ${tagsHtml}
    </article>
    ${relatedHtml}
  `,
    config,
    description,
    hostname,
    `/${entry.slug}.md`,
  );
}

function generateIndexMd(entries, config, baseUrl) {
  const sorted = entries
    .filter((e) => !e.draft && e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  const list = sorted
    .map((entry) => {
      const date = entry.date ? new Date(entry.date).toLocaleDateString() : '';
      const link = `${baseUrl}/${entry.slug}.md`;
      return `- [${entry.title || entry.slug}](${link}): ${date}${entry.description ? ' - ' + entry.description : ''}`;
    })
    .join('\n');

  return `# ${config.NAME || 'Blog'}\n\n## Posts\n\n${list}\n`;
}

function generateTagMd(tag, entries, manifest, config, baseUrl) {
  const entrySlugs = manifest.tagToEntries[tag];
  if (!entrySlugs || entrySlugs.length === 0) return null;

  const tagEntries = entries
    .filter((e) => entrySlugs.includes(e.slug))
    .filter((e) => !e.draft && e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  if (tagEntries.length === 0) return null;

  const list = tagEntries
    .map((entry) => {
      const date = entry.date ? new Date(entry.date).toLocaleDateString() : '';
      const link = `${baseUrl}/${entry.slug}.md`;
      return `- [${entry.title || entry.slug}](${link}): ${date}${entry.description ? ' - ' + entry.description : ''}`;
    })
    .join('\n');

  return `# #${tag} — ${config.NAME || 'Blog'}\n\nPosts tagged with **${tag}**\n\n## Posts\n\n${list}\n`;
}

function generateFeed(entries, config, baseUrl) {
  const sorted = entries
    .filter((e) => !e.draft && e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  const items = sorted
    .map((entry) => {
      const date = entry.date ? new Date(entry.date).toUTCString() : "";
      return `
    <item>
      <title>${entry.title || entry.slug}</title>
      <link>${baseUrl}/${entry.slug}</link>
      <guid>${baseUrl}/${entry.slug}</guid>
      <pubDate>${date}</pubDate>
      ${entry.description ? `<description>${entry.description}</description>` : ""}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${config.NAME || 'Blog'}</title>
    <link>${baseUrl}</link>
    <description>${config.NAME || 'My Blog'}</description>
    ${items}
  </channel>
</rss>`;
}

function generateLlmsTxt(entries, config, baseUrl) {
  const sorted = entries
    .filter((e) => !e.draft && e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  const entriesList = sorted
    .map((entry) => {
      const date = entry.date ? new Date(entry.date).toLocaleDateString() : "";
      const link = entry.contentType === "markdown"
      ? `${baseUrl}/${entry.slug}.md`
      : `${baseUrl}/${entry.slug}`;
    return `- [${entry.title || entry.slug}](${link}): ${date}${entry.description ? " - " + entry.description : ""}`;
    })
    .join("\n");

  return `# ${config.NAME || 'Blog'}

> A collection of blog posts

## Entries

${entriesList}
`;
}

const STATIC_ASSET_EXTS = new Set([
  '.md',
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg',
  '.mp4', '.mov', '.webm',
  '.pdf',
  '.ico', '.woff', '.woff2', '.ttf',
]);

function copyStaticAssets(srcDir, destDir, rootDir = null) {
  if (!rootDir) rootDir = srcDir;

  const items = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const item of items) {
    if (IGNORE_DIRS.has(item.name)) continue;
    if (item.name.startsWith('.')) continue;

    const srcPath = path.join(srcDir, item.name);

    if (item.isDirectory()) {
      copyStaticAssets(srcPath, destDir, rootDir);
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (STATIC_ASSET_EXTS.has(ext)) {
        const relPath = path.relative(rootDir, srcPath);
        const destPath = path.join(destDir, relPath);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

async function generateStaticSite(entries, manifest) {
  const wranglerConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'wrangler.json'), 'utf-8'));
  const config = {
    NAME: wranglerConfig.vars?.NAME || 'Blog',
    GITHUB: wranglerConfig.vars?.GITHUB,
    X: wranglerConfig.vars?.X,
    CONTEXT: wranglerConfig.vars?.CONTEXT,
  };
  const hostname = wranglerConfig.routes?.[0]?.pattern || '';
  const baseUrl = hostname ? `https://${hostname}` : 'https://localhost';

  const publicDir = path.join(__dirname, 'public');

  if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true });
  }
  fs.mkdirSync(publicDir, { recursive: true });

  // Copy images and other static assets
  copyStaticAssets(__dirname, publicDir);
  console.log('✓ Static assets copied');

  // index.html
  fs.writeFileSync(
    path.join(publicDir, 'index.html'),
    generateHomePage(entries, manifest, config, hostname),
  );
  console.log('✓ index.html');

  // Tag pages
  let tagCount = 0;
  for (const tag of Object.keys(manifest.tagToEntries)) {
    const html = generateTagPage(tag, entries, manifest, config, hostname);
    if (html) {
      const tagDir = path.join(publicDir, 'tag', encodeURIComponent(tag));
      fs.mkdirSync(tagDir, { recursive: true });
      fs.writeFileSync(path.join(tagDir, 'index.html'), html);
      tagCount++;
    }
  }
  console.log(`✓ ${tagCount} tag pages`);

  // Entry pages
  let entryCount = 0;
  const published = entries.filter((e) => !e.draft && e.date !== null);
  for (const entry of published) {
    const html = await generateEntryPage(entry, entries, config, hostname);
    if (html) {
      const parts = entry.slug.split('/');
      const entryDir = path.join(publicDir, ...parts.slice(0, -1));
      fs.mkdirSync(entryDir, { recursive: true });
      fs.writeFileSync(path.join(publicDir, entry.slug + '.html'), html);
      entryCount++;
    }
  }
  console.log(`✓ ${entryCount} entry pages`);

  // index.md
  fs.writeFileSync(
    path.join(publicDir, 'index.md'),
    generateIndexMd(entries, config, baseUrl),
  );
  console.log('✓ index.md');

  // Tag markdown pages
  let tagMdCount = 0;
  for (const tag of Object.keys(manifest.tagToEntries)) {
    const md = generateTagMd(tag, entries, manifest, config, baseUrl);
    if (md) {
      const tagDir = path.join(publicDir, 'tag', encodeURIComponent(tag));
      fs.mkdirSync(tagDir, { recursive: true });
      fs.writeFileSync(path.join(tagDir, 'index.md'), md);
      tagMdCount++;
    }
  }
  console.log(`✓ ${tagMdCount} tag markdown pages`);

  // RSS feed
  fs.writeFileSync(
    path.join(publicDir, 'feed.xml'),
    generateFeed(entries, config, baseUrl),
  );
  console.log('✓ feed.xml');

  // llms.txt
  fs.writeFileSync(
    path.join(publicDir, 'llms.txt'),
    generateLlmsTxt(entries, config, baseUrl),
  );
  console.log('✓ llms.txt');
}

async function build() {
  console.log("Building manifest...");

  const entries = await findMarkdownFiles(__dirname);
  const yearTags = [...new Set(entries.map((e) => e.tag).filter(Boolean))];

  const allTagsSet = new Set();
  entries.forEach((entry) => {
    if (entry.tags && Array.isArray(entry.tags)) {
      entry.tags.forEach((tag) => allTagsSet.add(tag));
    }
  });

  const allTags = [...allTagsSet].sort();

  const tagToEntries = {};
  entries.forEach((entry) => {
    if (entry.tag) {
      if (!tagToEntries[entry.tag]) tagToEntries[entry.tag] = [];
      tagToEntries[entry.tag].push(entry.slug);
    }

    if (entry.tags && Array.isArray(entry.tags)) {
      entry.tags.forEach((tag) => {
        if (!tagToEntries[tag]) tagToEntries[tag] = [];
        tagToEntries[tag].push(entry.slug);
      });
    }
  });

  console.log("Computing related posts...");
  const slugToRelated = computeRelatedSlugs(entries);

  const manifest = {
    tags: yearTags,
    allTags,
    tagToEntries,
    entries: entries.map(({ tag, ...entry }) => ({
      ...entry,
      relatedSlugs: slugToRelated[entry.slug] || [],
    })),
  };

  fs.writeFileSync(
    path.join(__dirname, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log(
    `✓ Manifest created with ${entries.length} entries, ${yearTags.length} year tags, and ${allTags.length} total tags`,
  );

  console.log("\nGenerating static site...");
  await generateStaticSite(manifest.entries, manifest);

  console.log("\n✓ Build complete → public/");
}

build().catch(console.error);
