# 🔥🔥🔥 Flybun 🔥🔥🔥

Some time a go, a friend that works with Elixir told me about this new cloud provider [Fly](https://fly.io). Since I aim to build a scalable AI Platform that often relies on components (e.g. browser automation, dynamic code execution, video editing) that are hard to scale with serverless, it peaked my interest.

> In this article I aim to create a POC for a scalable API for browser automation tasks using [Bun](https://bun.sh) as the main toolkit.

Coming from a mix of regular cloud VMs ([Linode](https://linode.com)) and hosting Serverless on [Vercel](https://vercel.com), fly is really something different, because it:

- automatically sets up SSL and a host for your VMs
- allows multiple machines for an app with an easy API to create/remove/pause/start them.
- automatically load-balances stuff [for you](https://fly.io/docs/reference/load-balancing/).
- exposes this all in a very general purpose way so you can build your own solutions with it.

The creators of Fly showed a new pattern that rethinks serverless: the [FLAME pattern](https://fly.io/blog/rethinking-serverless-with-flame/). It was first implemented with Elixir, and they created a small (unfinished) POC for [JavaScript](https://fly.io/javascript-journal/flame-for-javascript-rethinking-serverless/), but to accomodate my existing codebase of 120k lines, I need this pattern in Typescript. My conclusion is that this is easier with [Bun](https://bun.sh)

What I want to do:

- Have a fly setup with docker image that installs NodeJS, ffmpeg, browser, and anything else I require in my monolith.
- Ensure that docker image also starts up the server correctly
- Implement the [FLAME pattern](https://fly.io/blog/rethinking-serverless-with-flame/) so it will always start or create machines if unavailable, or use an available one if there is one.

It'd be very nice to have a server that is infinitely scalable that has MUCH FEWER CONSTRAINTS than regular serverless.

What I'd want:

- Open browsers with playwright, any extension code, proxy, etc.
- Process files with things like ffmpeg
- Run heavy AI models on GPUs
- Run arbitrary code

This would be a very good thing to have and - if I document it well (openapi) and make it infinitely scalable using fly.io - it'd be an amazing service in itself.

An alternative or diversion from FLAME pattern came from an idea [from Theo](https://www.youtube.com/watch?v=ewf-18jacmo): Using Vercel Serverless OpenAPI by default, but host and lead it to Fly automatically for when it’s not possible to run a function on there (such as ffmpeg or browsers). I might do this.

# TODO: Proof of concept

To create a POC, let's:

✅ Figure out how to create a bun + ffmpeg docker + chromium

✅ Make a playwright script in the http endpoint, that opens chrome, goes to a URL, waits for it to load, gets the text, and returns that in the response.

❌ **playwright support in bun seems bad**

✅ Try puppeteer instead: https://github.com/rgl/try-puppeteer-in-bun/blob/main/main.js ... first in localhost then also on the vm...

✅ Fix VM chrome not found (https://stackoverflow.com/questions/59979188/error-failed-to-launch-the-browser-process-puppeteer)

❌ For some reason, it can't access any network (`could not complete HTTP request to instance: connection closed before message completed`). see https://community.fly.io/t/could-not-make-http-request-to-instance-connection-closed-before-message-completed/14650 ... tried to follow this but there is no solution here.

❌ Maybe try https://macarthur.me/posts/puppeteer-with-docker/ **not working either**

✅ Try https://github.com/fly-apps/puppeteer-js-renderer **it works!** see https://puppeteer-js-renderer2.fly.dev/api/render?url=https://google.nl

Ultimately I want to run regular functions in next.js - passing special functions onto fly. However, nextjs projects don't output a build folder with all js files.

Try to replicate https://fly.io/javascript-journal/flame-for-javascript-rethinking-serverless/ but in the Bun repo so it starts up a new one that pauses within 1 minute.

Start up 100 that are paused. Do a stress test with https://www.artillery.io/ ramping up to 100 rps and see how it goes.

<!--
If this works decently reliably, fast, and cheap...
This could be the new base for my server!
Make this with the new openapi and aim to replace all stateless cfa api stuff.
-->

If this works, I can mix in my [openapi nextjs demo](https://github.com/CodeFromAnywhere/next-openapi-demo) so I actually host regular serverless unless it's not possible. I can do this by providing a different handler to the `/api`. [Max duration](https://vercel.com/docs/functions/runtimes#max-duration) shouldn't be a problem given we are just waiting for a fetchcall to return.
