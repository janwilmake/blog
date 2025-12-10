import fs from "fs";
import path from "path";
import matter from "gray-matter";

const IGNORED_DIRS = [".git", ".wrangler", "node_modules"];

/**
 * Check if path should be ignored
 */
function shouldIgnore(filepath) {
  const parts = filepath.split(path.sep);
  return parts.some((part) => IGNORED_DIRS.includes(part));
}

/**
 * Recursively find all .md and .url files in a directory
 */
function findContentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    // Skip ignored directories
    if (shouldIgnore(filePath)) {
      return;
    }

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findContentFiles(filePath, fileList);
    } else if (path.extname(file) === ".md" || path.extname(file) === ".url") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract date from filename (YYYY-MM-DD format)
 */
function extractDateFromFilename(filename) {
  const match = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
}

/**
 * Parse date string in YYYY-MM[-DD] format
 */
function parseDate(dateStr) {
  if (!dateStr) return null;
  if (typeof dateStr !== "string") return null;
  // Handle YYYY-MM-DD or YYYY-MM format
  const match = dateStr.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (match) {
    const year = match[1];
    const month = match[2];
    const day = match[3] || "01";
    return new Date(`${year}-${month}-${day}`);
  }

  return null;
}

/**
 * Generate slug from filepath
 */
function generateSlug(filepath) {
  const relativePath = path.relative(".", filepath);
  return relativePath.replace(/\.(md|url)$/, "").replace(/\\/g, "/");
}

/**
 * Extract title from markdown content or filename
 */
function extractTitle(content, filename) {
  // Try to find H1 in content
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  // Fallback to filename
  return path
    .basename(filename, path.extname(filename))
    .replace(/^\d{4}-\d{2}-\d{2}-/, "") // Remove date prefix
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Parse .url file to extract URL
 */
function parseUrlFile(content) {
  const match = content.match(/URL=(.+)/);
  return match ? match[1].trim() : null;
}

/**
 * Build manifest from markdown and .url files
 */
function buildManifest() {
  const contentFiles = findContentFiles(".");
  const entries = [];

  console.log(`Found ${contentFiles.length} content files`);

  for (const filepath of contentFiles) {
    const content = fs.readFileSync(filepath, "utf-8");
    const ext = path.extname(filepath);

    let frontmatter = {};
    let markdown = content;
    let externalUrl = null;
    let contentType = "markdown";

    if (ext === ".url") {
      // Parse .url file
      externalUrl = parseUrlFile(content);
      contentType = "url";

      if (!externalUrl) {
        console.log(`  ✗ ${filepath} - Invalid .url file format`);
        continue;
      }
    } else if (ext === ".md") {
      // Parse markdown with frontmatter
      const parsed = matter(content);
      frontmatter = parsed.data;
      markdown = parsed.content;
      contentType = "markdown";
    }

    // Determine date from frontmatter, filename, or file stats
    let date = null;

    if (frontmatter.date) {
      date = parseDate(frontmatter.date);
    }

    if (!date) {
      const filenameDate = extractDateFromFilename(path.basename(filepath));
      if (filenameDate) {
        date = parseDate(filenameDate);
      }
    }

    if (!date) {
      date = null;
    }

    const slug = generateSlug(filepath);
    const title = frontmatter.title || extractTitle(markdown, filepath);

    entries.push({
      slug,
      title,
      date: date?.toISOString() || null,
      filepath: filepath.replace(/\\/g, "/"),
      description: frontmatter.description || "",
      contentType,
      externalUrl: externalUrl || undefined,
    });

    console.log(
      `  ✓ ${slug} ${contentType === "url" ? `(${externalUrl})` : ""}`,
    );
  }

  // Sort by date descending (newest first)
  entries.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  const manifest = {
    generated: new Date().toISOString(),
    entries,
  };

  fs.writeFileSync("manifest.json", JSON.stringify(manifest, null, 2));
  console.log(`\n✓ Generated manifest with ${entries.length} entries`);
}

buildManifest();
