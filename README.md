# Agent-Friendly blog

This repo contains my writing from 2016-2025. It also allows hosting this as a website that is accessible through human browsers while also making the original markdown accessible through [llms.txt]. [This was the definition](SPEC.md) for creating the last version and can still be further refined. Because of this llms.txt, it allows anyone to chat with AI about your blog using the [LLMTEXT MCP](https://llmtext.com).

You can use this repo as a template and put your own blog (using markdown) in it.

## Simple and Elegant

Your blog content is simply markdown in folders in the repo. Other than that, there are just a few files:

- `.env` - update admin password (to see draft posts)
- `build.js` - creates a manifest based on all markdown entries found
- `worker.ts` - serves your blog to AI and humans.
- `wrangler.json` - deployment configuration such as domain

## Frontmatter Support

Each markdown file can include frontmatter at the top to specify metadata. Frontmatter should be enclosed in `---` delimiters:

```markdown
---
title: Your Post Title
description: A brief description of your post
tags: [tag1, tag2, tag3]
draft: false
---

Your content here...
```

### Supported Fields

- **title**: The title of the post (used in HTML `<title>`, OpenGraph, and listing pages)
- **description**: A brief description of the post (used in meta tags, OpenGraph, RSS feed, and listing pages)
- **tags**: An array of tags for categorization (e.g., `[javascript, web-development]`)
- **draft**: Boolean value (`true` or `false`) to mark posts as drafts (only visible to admins)

All fields are optional. If not specified, defaults will be used (e.g., the slug for the title).
