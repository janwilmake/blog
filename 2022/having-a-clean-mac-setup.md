---
date: 2022-02-25
modified_at: 2022-02-25
tags: [productivity, tools, workflow]
---

# Having a clean Mac setup with a super low memory and cpu footprint

After about 6 months my Macbook Air M1 became quite slow. Often it was very
laggy. Something had to change. 

So I erased all content and settings, and wrote a script to install everything
automatically after the reset. It can be found here
[https://github.com/Code-From-Anywhere/cfa-workspace].

Now it just takes me a couple minutes of doing things (and a couple hours of
waiting) to reset my mac and install a clean slate again, which is amazing! From
now on I can easily do a full computer reset every 3 months or so, because this
Macbook Air gets slow quite quickly (mess accumulates quickly).

Besides this script, I installed two very interesting programs with the
following setup:

 * quitter [https://marco.org/apps]: A small tool that automatically quits
   applications (or hides them) after x minutes of inactivity. I've set it up to
   quit most apps (except vscode) after 5 minutes of inactivity. This makes sure
   there is no wasted memory anmore on apps I don't use.
 * power manager [https://www.dssw.co.uk/powermanager/]: A small tool that lets
   you set up an automation that isn't available within the regular macos
   preferences. I set it up to shut down my mac after 1 hour of inactivity. With
   this in place, frequent restarts are enforced. Because of this you'll never
   have too many old cached things in your memory or cpu, and memory leaks don't
   get much chance to stay active for long periods of time.

I am going to try this out now. The initial results are very hopeful. Hopefully
I'll never see any lag again!