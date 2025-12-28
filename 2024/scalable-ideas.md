---
date: 2024-01
tags: [ai, agents, programming, startup, automation]
description: Demonstrates how LLMs enable scalable knowledge work by breaking down complex tasks into API-driven subtasks, using building websites for GitHub repos as a practical example.
---

We're entering an age where we can start copying knowledge work. What I mean by that, is that we can find a useful thing to do once and do it on a global scale, potentially millions of times, to create value.

This was already possible before, but not in a very scalable way, and the things we could do was super limited.

An example: With an LLM I can now create a website for my app very easily based on the README of the repo. What if I would do that for all popular repos without website?

I want to get to a point where we can give computers instructions like this:

> Find popular github repos that don't have a website yet, and build a compelling landing page for them with a CTA back to the repo. Host this on vercel and make an issue in the repo named `I made a website for you!`

Let's break this down into chunks and which apis we'd need for these:

| Task                                                                 | Which APIs do I need?                                                                            | Subtask, rewritten                                                                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Find popular github repos                                            | github repo browsing                                                                             | Find popular github repos                                                                                                           |
| that don't have a website yet and would benefit from one             | - github: read repo info, read repo md files<br>- serp: search google<br>- jina: scrape websites | Figure out if a github repo has a website or not                                                                                    |
| Build a compelling landing page for them with a CTA back to the repo | - github: read repo info, read repo md files<br>- claude<br>- actionschema website builder       | - Implied: figure out what a repo is about<br>- Implied: Come up with what the website needs to show<br>- Build the website in HTML |
| Host this on vercel                                                  | vercel deploy                                                                                    | Host a set of files on vercel and get a short domain                                                                                |
| make a PR and issue in the repo                                      | browser automation: github issue creation                                                        | Login to github and make an issue on a repo                                                                                         |
| make a PR and issue in the repo                                      | browser automation: github issue creation                                                        | Login to github and make an issue on a repo                                                                                         |

These are pretty much the separate things that need to be done independently. It's important to note, that this was rather easy for me to separate because I know the underlying work to be done and the APIs available.

Every step in this pipeline has its own challenges, and we probably can't make this all in a single prompt. However, we can definitely build a system that would do every individual step. We need good program search to find the endpoints, and build individual hosted APIs for each subtask.

After that's done and each individual action is a hosted serverless API, the whole pipeline becomes a simple ActionSchema. We can now do knowledge work at unimaginable scales. The main concern will be to deliver good output, and steer the project once we know better what people want. A slow upramp would be preferrable, and also to add feedback into the pipeline, of course.
