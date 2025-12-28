---
draft: true
date: 2025-12-13
tags: [ai, llm, dx, programming, tools]
description: Explores the design challenges of creating developer-friendly layers around AI inference, combining features like response caching, billing, MCP tool use, and code mode in a unified architecture.
---

# Bringing all pieces together to be at the Frontier of AI inference design

Right when everybody got used to `/chat/completions`, [OpenAI introduced a new direction: Responses](https://developers.openai.com/blog/responses-api/). At the core, ai companies create models that takes tokens in and streams tokens out. These models need to be hosted on large GPUs to do inference for the end-user. Around that there are a lot of pieces that you may want to add:

- response caching
- billing
- identity provider
- url context
- mcp tool use
- code mode
- cronjobs
- async execution

![](architecture.drawio.png)

Creating developer or user experiences that combine some or all of the above is more of an artform than simply following rules in a book. With contextarea, I'm trying as well as possible to create such a more dx-friendly layer.
