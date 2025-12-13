import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IGNORE_DIRS = new Set([".git", ".wrangler", "node_modules"]);

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

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Parse boolean values
    if (value === "true") value = true;
    else if (value === "false") value = false;

    frontmatter[key] = value;
  });

  return {
    frontmatter,
    content: content.slice(match[0].length),
  };
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

      // First level directories are tags
      const tag = currentTag || item.name;
      const subEntries = await findMarkdownFiles(fullPath, rootDir, tag);
      entries.push(...subEntries);
    } else if (item.isFile()) {
      const ext = path.extname(item.name);

      if (ext === ".md") {
        const content = fs.readFileSync(fullPath, "utf-8");
        const { frontmatter } = parseFrontmatter(content);

        // Date is required
        if (!frontmatter.date) {
          console.warn(`Skipping ${relativePath}: no date in frontmatter`);
          continue;
        }

        const slug = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

        entries.push({
          draft: frontmatter.draft === true,
          slug,
          date: parseDate(frontmatter.date),
          contentType: "markdown",
          title: frontmatter.title || slug,
          description: frontmatter.description || "",
          tag: currentTag,
        });
      } else if (ext === ".url") {
        try {
          const markdown = await fetchUrlFile(fullPath);
          const { frontmatter } = parseFrontmatter(markdown);

          // Date is required
          if (!frontmatter.date) {
            console.warn(`Skipping ${relativePath}: no date in frontmatter`);
            continue;
          }

          const iniContent = fs.readFileSync(fullPath, "utf-8");
          const config = parseIniFile(iniContent);

          const slug = relativePath.replace(/\.url$/, "").replace(/\\/g, "/");

          entries.push({
            draft: frontmatter.draft === true,
            slug,
            date: parseDate(frontmatter.date),
            contentType: "url",
            externalUrl: config.url,
            title: frontmatter.title || slug,
            description: frontmatter.description || "",
            tag: currentTag,
          });
        } catch (error) {
          console.error(`Error processing ${relativePath}:`, error.message);
        }
      }
    }
  }

  return entries;
}

async function build() {
  console.log("Building manifest...");

  const entries = await findMarkdownFiles(__dirname);
  const tags = [...new Set(entries.map((e) => e.tag).filter(Boolean))];

  const manifest = {
    tags,
    entries: entries.map(({ tag, ...entry }) => entry),
  };

  fs.writeFileSync(
    path.join(__dirname, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log(
    `✓ Manifest created with ${entries.length} entries and ${tags.length} tags`,
  );
}

build().catch(console.error);
