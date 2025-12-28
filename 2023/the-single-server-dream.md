---
date: 2023-09-06
tags: [devops, programming, web-development, nodejs]
---

# Running everything from a single server isn't that easy

Last year I formed a plan of a 'homserver' which meant a single server would execute all functionality: frontend, backend, and connections to apis.

On top of that, I wanted to host all my domains from the same server and from the same frontend, including SSR.

The last weeks I've had my hands in my hair. I moved to bun while, at the same time, I moved away from next.js. The idea was to reduce complexity by creating a single deployment that did both the api and the frontend, but I ran into a multitude of limitations and problems.

My takeaway:

- New things may have unobserved limitations so be careful to jump on it so quickly
- SSR is very complex, especially if you want to include it into your own server.
- Platforms like Next.js abstract away from a lot but also ensure it 'just works' and are still very configurable. I moved away from Next.js to allow for more control, but this also added a complexity that I needed to solve myself, even if it was less complex.
- Single-server doing all isn't practical if you want to make scalable performant apps; you'll run into scaling issues with data, memory, cpu, and it's too slow at the other side of the world.
- Sometimes it's good to rely on third parties that take away a lot of complexity. You can never do everything yourself.

It's been quite a backlash, but I'm now going to do it in an easier way.

- The frontend can be done by Next.js and hosted on the edge with Vercel. With [this setup](https://multi-domain-first.vercel.app) I'll still be able to handle multiple domains from a single project, which reduces time and cost of deployment and codebase size.
- The backend will still be a single server because I have the database, crons, watchers, and user asset storage on there too. The api can be served from a single domain.

In the future I can still go down these paths:

- If I want to scale bigtime: host functions in something like [Cloudflare Workers](https://workers.cloudflare.com) so I don't need to worry about high load. I could then switch to another ORM like [Turso](https://turso.tech) or any other hosted database and put my data there, and I could put the assets in object storage with a CDN.
- If I want to allow for homeservers: allow a user to spin up this server on their own infra with a cloud hosting provider they trust. Since it also includes asset and db storage, it's very trustworthy.
- There might be a hybrid approach in which I put all heavy functions on cloudflare workers and maybe later also cloud gpu workers, while keeping the assets and database on a single server that is duplicateable. This allows for human-centeredness while keeping scalability - the homeserver doesn't become a bottleneck quickly.
