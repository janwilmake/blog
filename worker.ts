import { Marked } from "marked";
import manifest from "./manifest.json";

interface Env {
  ASSETS: Fetcher;
}

interface ManifestEntry {
  slug: string;
  title: string;
  date: string | null;
  filepath: string;
  description: string;
  contentType: "markdown" | "url";
  externalUrl?: string;
}

const marked = new Marked();

/**
 * HTML template for blog posts
 */
function renderPostTemplate(
  title: string,
  content: string,
  date: string,
): string {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    header {
      margin-bottom: 2rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
    }
    h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2.5rem;
    }
    .date {
      color: #666;
      font-size: 0.9rem;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 1rem;
      color: #0066cc;
      text-decoration: none;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    article {
      margin-top: 2rem;
    }
    article img {
      max-width: 100%;
      height: auto;
    }
    article pre {
      background: #f5f5f5;
      padding: 1rem;
      overflow-x: auto;
      border-radius: 4px;
    }
    article code {
      background: #f5f5f5;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-size: 0.9em;
    }
    article pre code {
      background: none;
      padding: 0;
    }
  </style>
</head>
<body>
  <a href="/" class="back-link">← Back to posts</a>
  <header>
    <h1>${escapeHtml(title)}</h1>
    <div class="date">${formattedDate}</div>
  </header>
  <article>
    ${content}
  </article>
</body>
</html>`;
}

/**
 * HTML template for homepage
 */
function renderHomepage(entries: ManifestEntry[]): string {
  const postList = entries
    .map((entry) => {
      const date = entry.date
        ? new Date(entry.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Unknown";

      const badge =
        entry.contentType === "url"
          ? '<span class="badge">External Link</span>'
          : "";

      return `
      <article class="post-preview">
        <h2><a href="/${entry.slug}">${escapeHtml(
        entry.title,
      )}</a> ${badge}</h2>
        <div class="date">${date}</div>
        ${
          entry.description
            ? `<p class="description">${escapeHtml(entry.description)}</p>`
            : ""
        }
      </article>
    `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog</title>
  <style>
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    .post-preview {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #eee;
    }
    .post-preview:last-child {
      border-bottom: none;
    }
    .post-preview h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .post-preview h2 a {
      color: #0066cc;
      text-decoration: none;
    }
    .post-preview h2 a:hover {
      text-decoration: underline;
    }
    .badge {
      font-size: 0.7rem;
      background: #0066cc;
      color: white;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      font-weight: normal;
    }
    .date {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    .description {
      color: #555;
      margin: 0.5rem 0 0 0;
    }
  </style>
</head>
<body>
  <h1>Blog</h1>
  ${postList}
</body>
</html>`;
}

/**
 * Generate llms.txt content
 */
function renderLlmsTxt(entries: ManifestEntry[]): string {
  const postList = entries
    .map((entry) => {
      const date = entry.date
        ? new Date(entry.date).toISOString().split("T")[0]
        : "Unknown";
      const description = entry.description ? `: ${entry.description}` : "";
      const type = entry.contentType === "url" ? " [External]" : "";
      return `- [${entry.title}](/${entry.slug})${description}${type} (${date})`;
    })
    .join("\n");

  return `# Blog

> A collection of blog posts

## Posts

${postList}
`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Parse .url file content to extract URL
 */
function parseUrlFile(content: string): string | null {
  const match = content.match(/URL=(.+)/);
  return match ? match[1].trim() : null;
}

/**
 * Fetch content from external URL using jina.ai reader
 */
async function fetchExternalContent(url: string): Promise<string> {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const response = await fetch(jinaUrl, {
      headers: {
        Accept: "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching external content:", error);
    throw error;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Homepage
    if (pathname === "/" || pathname === "") {
      const html = renderHomepage(manifest.entries);
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // llms.txt
    if (pathname === "/llms.txt") {
      const txt = renderLlmsTxt(manifest.entries);
      return new Response(txt, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Blog post
    const slug = pathname.slice(1); // Remove leading slash
    const entry = manifest.entries.find((e) => e.slug === slug);

    if (!entry) {
      return new Response("Not Found", { status: 404 });
    }

    try {
      let content = "";
      let html = "";

      if (entry.contentType === "url") {
        // Fetch .url file from assets
        const assetUrl = new URL(`/${entry.filepath}`, request.url);
        const assetResponse = await env.ASSETS.fetch(assetUrl);

        if (!assetResponse.ok) {
          return new Response("Not Found", { status: 404 });
        }

        const urlFileContent = await assetResponse.text();
        const externalUrl = parseUrlFile(urlFileContent);

        if (!externalUrl) {
          return new Response("Invalid .url file", { status: 500 });
        }

        // Fetch content from external URL
        try {
          content = await fetchExternalContent(externalUrl);
          // Convert markdown to HTML
          html = await marked.parse(content);
        } catch (error) {
          html = `
            <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 1rem; border-radius: 4px;">
              <p><strong>External Content</strong></p>
              <p>Unable to fetch content from: <a href="${escapeHtml(
                externalUrl,
              )}" target="_blank">${escapeHtml(externalUrl)}</a></p>
              <p style="color: #666; font-size: 0.9em;">Error: ${escapeHtml(
                String(error),
              )}</p>
            </div>
          `;
        }
      } else {
        // Fetch markdown file from assets
        const assetUrl = new URL(`/${entry.filepath}`, request.url);
        const assetResponse = await env.ASSETS.fetch(assetUrl);

        if (!assetResponse.ok) {
          return new Response("Not Found", { status: 404 });
        }

        const markdown = await assetResponse.text();

        // Remove frontmatter if present
        content = markdown.replace(/^---\n[\s\S]*?\n---\n/, "");

        // Convert markdown to HTML
        html = await marked.parse(content);
      }

      // Render template
      const fullHtml = renderPostTemplate(entry.title, html, entry.date);

      return new Response(fullHtml, {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error rendering post:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
