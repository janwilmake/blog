import { marked } from "marked";
import manifest from "./manifest.json";

interface Env {
  ASSETS: Fetcher;
  ADMIN_PASSWORD?: string;
}

interface Entry {
  draft: boolean;
  slug: string;
  date: number | null;
  contentType: "markdown" | "url";
  externalUrl?: string;
  title?: string;
  description?: string;
  tags?: string[];
}

interface Manifest {
  tags: string[];
  allTags: string[];
  tagToEntries: Record<string, string[]>;
  entries: Entry[];
}

const typedManifest = manifest as Manifest;

function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: {}, content };

  const frontmatterText = match[1];
  const frontmatter: Record<string, any> = {};

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

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

function isAdmin(request: Request, env: Env): boolean {
  if (!env.ADMIN_PASSWORD) return false;
  const token = getCookie(request, "admin_token");
  return token === env.ADMIN_PASSWORD;
}

function htmlTemplate(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .header { border-bottom: 2px solid #333; margin-bottom: 2rem; padding-bottom: 1rem; }
    .entry { margin-bottom: 2rem; }
    .entry-date { color: #666; font-size: 0.9rem; }
    .draft-badge { background: #ff6b6b; color: white; padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.8rem; }
    pre { background: #f4f4f4; padding: 1rem; overflow-x: auto; }
    code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px; }
    pre code { background: none; padding: 0; }
    img { max-width: 100%; height: auto; }
    video { max-width: 100%; height: auto; }
    iframe { max-width: 100%; }
    article { max-width: 100%; overflow-x: hidden; }
    .tags { margin-top: 1rem; }
    .tag { display: inline-block; background: #e0e0e0; padding: 0.2rem 0.6rem; border-radius: 3px; margin-right: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; }
    .tag:hover { background: #d0d0d0; }
  </style>
</head>
<body>
  <div class="header">
    <h1><a href="/">Blog</a></h1>
  </div>
  ${content}
</body>
</html>`;
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  if (!env.ADMIN_PASSWORD) {
    return new Response("Admin access not configured", { status: 404 });
  }

  if (request.method === "POST") {
    const formData = await request.formData();
    const password = formData.get("password");

    if (password === env.ADMIN_PASSWORD) {
      return new Response("Logged in", {
        status: 302,
        headers: {
          Location: "/",
          "Set-Cookie": `admin_token=${env.ADMIN_PASSWORD}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
        },
      });
    }

    return new Response("Invalid password", { status: 401 });
  }

  const html = htmlTemplate(
    "Login",
    `
    <form method="POST">
      <label>Password: <input type="password" name="password" required /></label>
      <button type="submit">Login</button>
    </form>
  `,
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

async function handleHome(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const tag = url.searchParams.get("tag");
  const admin = isAdmin(request, env);

  let entries = typedManifest.entries
    .filter((e) => admin || !e.draft)
    .filter((e) => e.date !== null)
    .filter((e) => !tag || e.slug.startsWith(tag + "/"));

  entries.sort((a, b) => (b.date || 0) - (a.date || 0));

  const entriesHtml = entries
    .map((entry) => {
      const date = entry.date
        ? new Date(entry.date).toLocaleDateString()
        : "No date";
      const draftBadge = entry.draft
        ? '<span class="draft-badge">DRAFT</span> '
        : "";
      return `
      <div class="entry">
        <h2><a href="/${entry.slug}">${draftBadge}${
        entry.title || entry.slug
      }</a></h2>
        <div class="entry-date">${date}</div>
        ${entry.description ? `<p>${entry.description}</p>` : ""}
      </div>
    `;
    })
    .join("");

  const tagsHtml =
    typedManifest.tags.length > 0
      ? `
    <div style="margin-bottom: 2rem;">
      <strong>Tags:</strong> 
      <a href="/">All</a> | 
      ${typedManifest.tags
        .map((t) => `<a href="?tag=${t}">${t}</a>`)
        .join(" | ")}
    </div>
  `
      : "";

  const adminLinks = env.ADMIN_PASSWORD
    ? `
    <div style="margin-bottom: 1rem;">
      ${
        admin
          ? '<a href="/logout">Logout</a>'
          : '<a href="/login">Admin Login</a>'
      }
    </div>
  `
    : "";

  const html = htmlTemplate(
    "Blog",
    `
    ${adminLinks}
    ${tagsHtml}
    ${entriesHtml}
    <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ccc;">
      <a href="/feed">RSS Feed</a> | <a href="/llms.txt">LLMs.txt</a>
    </div>
  `,
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

async function handleLogout(): Promise<Response> {
  return new Response("Logged out", {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie":
        "admin_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
    },
  });
}

async function handleEntry(
  slug: string,
  env: Env,
  request: Request,
): Promise<Response> {
  const entry = typedManifest.entries.find((e) => e.slug === slug);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  if (entry.draft && !isAdmin(request, env)) {
    return new Response("Not found", { status: 404 });
  }

  let markdown: string;

  if (entry.contentType === "url" && entry.externalUrl) {
    const response = await fetch(entry.externalUrl);
    if (!response.ok) {
      return new Response("Failed to fetch content", { status: 500 });
    }
    markdown = await response.text();
  } else {
    const response = await env.ASSETS.fetch(
      new URL(`/${slug}.md`, request.url),
    );
    if (!response.ok) {
      return new Response("Not found", { status: 404 });
    }
    markdown = await response.text();
  }

  const { frontmatter, content } = parseFrontmatter(markdown);
  const html = await marked(content);
  const title = frontmatter.title || entry.slug;
  const date = entry.date ? new Date(entry.date).toLocaleDateString() : "";

  const draftBadge = entry.draft
    ? '<span class="draft-badge">DRAFT</span> '
    : "";

  // Create tags display
  const tags = frontmatter.tags || entry.tags || [];
  const tagsHtml =
    tags.length > 0
      ? `
    <div class="tags">
      ${tags.map((tag: string) => `<a href="/tag/${encodeURIComponent(tag)}" class="tag">${tag}</a>`).join("")}
    </div>
  `
      : "";

  const pageHtml = htmlTemplate(
    title,
    `
    <article>
      <h1>${draftBadge}${title}</h1>
      ${date ? `<div class="entry-date">${date}</div>` : ""}
      ${tagsHtml}
      ${html}
    </article>
  `,
  );

  return new Response(pageHtml, {
    headers: { "Content-Type": "text/html" },
  });
}

async function handleRssFeed(request: Request, env: Env): Promise<Response> {
  const admin = isAdmin(request, env);
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const entries = typedManifest.entries
    .filter((e) => admin || !e.draft)
    .filter((e) => e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  const items = entries
    .map((entry) => {
      const date = entry.date ? new Date(entry.date).toUTCString() : "";
      return `
    <item>
      <title>${entry.title || entry.slug}</title>
      <link>${baseUrl}/${entry.slug}</link>
      <guid>${baseUrl}/${entry.slug}</guid>
      <pubDate>${date}</pubDate>
      ${
        entry.description
          ? `<description>${entry.description}</description>`
          : ""
      }
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog</title>
    <link>${baseUrl}</link>
    <description>My Blog</description>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}

async function handleLlmsTxt(request: Request, env: Env): Promise<Response> {
  const admin = isAdmin(request, env);
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const entries = typedManifest.entries
    .filter((e) => admin || !e.draft)
    .filter((e) => e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  const entriesList = entries
    .map((entry) => {
      const date = entry.date ? new Date(entry.date).toLocaleDateString() : "";
      return `- [${entry.title || entry.slug}](${baseUrl}/${
        entry.slug
      }): ${date}${entry.description ? " - " + entry.description : ""}`;
    })
    .join("\n");

  const llmsTxt = `# Blog

> A collection of blog posts

## Entries

${entriesList}
`;

  return new Response(llmsTxt, {
    headers: { "Content-Type": "text/markdown" },
  });
}

async function handleTagPage(
  tag: string,
  request: Request,
  env: Env,
): Promise<Response> {
  const admin = isAdmin(request, env);

  // Get entry slugs for this tag
  const entrySlugs = typedManifest.tagToEntries[tag];

  if (!entrySlugs || entrySlugs.length === 0) {
    return new Response("Tag not found", { status: 404 });
  }

  // Get full entry objects
  const entries = typedManifest.entries
    .filter((e) => entrySlugs.includes(e.slug))
    .filter((e) => admin || !e.draft)
    .filter((e) => e.date !== null)
    .sort((a, b) => (b.date || 0) - (a.date || 0));

  if (entries.length === 0) {
    return new Response("No entries found for this tag", { status: 404 });
  }

  const entriesHtml = entries
    .map((entry) => {
      const date = entry.date
        ? new Date(entry.date).toLocaleDateString()
        : "No date";
      const draftBadge = entry.draft
        ? '<span class="draft-badge">DRAFT</span> '
        : "";
      return `
      <div class="entry">
        <h2><a href="/${entry.slug}">${draftBadge}${
        entry.title || entry.slug
      }</a></h2>
        <div class="entry-date">${date}</div>
        ${entry.description ? `<p>${entry.description}</p>` : ""}
      </div>
    `;
    })
    .join("");

  const html = htmlTemplate(
    `Jan Wilmake on ${tag}`,
    `
    <h1>Jan Wilmake on ${tag}</h1>
    <p>All blog posts tagged with <strong>${tag}</strong></p>
    ${entriesHtml}
    <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ccc;">
      <a href="/">← Back to all posts</a>
    </div>
  `,
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      return handleHome(request, env);
    }

    if (path === "/login") {
      return handleLogin(request, env);
    }

    if (path === "/logout") {
      return handleLogout();
    }

    if (path === "/feed") {
      return handleRssFeed(request, env);
    }

    if (path === "/llms.txt") {
      return handleLlmsTxt(request, env);
    }

    // Handle tag pages
    if (path.startsWith("/tag/")) {
      const tag = decodeURIComponent(path.slice(5));
      return handleTagPage(tag, request, env);
    }

    // Try to serve as blog entry
    const slug = path.slice(1); // Remove leading /
    return handleEntry(slug, env, request);
  },
};
