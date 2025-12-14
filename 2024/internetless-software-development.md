---
date: 2024-01
---

<!-- http://agileotter.blogspot.com/2014/09/programming-is-mostly-thinking.html

If programming is 1/12th motion and 11/12ths thinking, then we shouldn't push people to be typing 11/12ths of the time. We should instead provide the materials, environment, and processes necessary to ensure that the thinking we do is of high quality.
 -->

Time and time again, I ask myself the question: "Can I completely remove myself from the dependency that is the internet?". An interesting value proposition, because yeah, it's a big dependency that has a lot of drawbacks. Can we rid ourselves of it? I imagine a device that goes back to basics. It has no internet, just a huge LLM.

My motivation for a computer without internet without drawbacks is multifluous:

- It would be a device that I can safely run AGI on, as it cannot easily escape.
- It would protect me from AGI going rogue online, because I'm not online
- It would keep my setup functional even if the government decides to shut down the internet due to AGI going rogue.
- It would reduce distractions bigtime: no social media, news, nothing. I'm in my zone.
- Because there's no internet, my activity on my laptop - which is how I spend most of my day - is completely private. I cannot be hacked remotely, and there can be no malware that is watching me. In an increasingly more connected AI panopticon, this will probably become increasingly useful.
- It is great for battery life because internet sucks up a lot of it. I've tried this before: without internet, a base model Macbook Air can easily last 3 days.
- It is great for remote places because internet can be slow. It'd be great not to be crazily dependent on it.

All in all, there's enough reason for me to explore this further, and there are probalby more reasons I will discover. That's why I'm going to make this a living document in which I report the progress and learnings, and from now on, I will dedicate my other Macbook Air as the Macbook that has never seen the real internet. I hope this document helps others with similar motivations.

# Installing MacOS without an internet connection

Apple's builtin recovery tools for a Mac heavily rely on WiFi. However, it's still [possible](https://www.easeus.com/computer-instruction/reinstall-macos-without-internet.html) to install MacOS without this. I need a USB stick that installs MacOS without connecting to any internet. I also need a USB for installing files and other programs such as VSCode.

I found that the instructions to install it via the MacOS App store gave an error when trying to boot it into the volume with `sudo /Applications/Install\ macOS\ Ventura.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume`: "/Applications/Install macOS Sonoma.app does not appear to be a valid OS installer application.". The [solution](https://discussions.apple.com/thread/255164224?sortBy=rank) was to use this command: `softwareupdate --fetch-full-installer --full-installer-version 14.5`

To install on an m1 macbook air, we need to hold the powerbutton to boot from the disk. However, unfortunately, it's [not possible](https://forums.macrumors.com/threads/installing-sonoma-without-apple-id.2407055/) to install Sonoma without activating it with an internet connection first. I guess if I really want to do things without internet, I need to downgrade to an older mac so I can install an older MacOS as the earliest version for M1 was Big Sur, and that shipped with a required activation step, requiring an internet connection. There goes my plan to not have it touch any internet! Even during the installation there were some moments internet was required, so it's not possible anymore with Apple.

Well, at least this is only during installation. If we don't need it anymore after installation, we still have the privacy edge.

# Disabling WiFi and other external connections at a low level

**⚠️ To be continued ⚠️**

One option would be to fully remove the WiFi chip. I researched about this before, and it's incredibly hard with Apple laptops.

Another would be to disable it at the OS level, somewhere with a system setting. This would ensure I cannot accidentally go online. I could also disable ethernet cable connection maybe.

# Redirecting internet traffic

To make it still possible to use some form of intranet, we need to resolve IP's and DNS back to localhost at a very low level. I had a great [conversation](https://claude.ai/chat/b360b4b3-4afc-4e9d-a918-3c6d2862b676) with Claude, and found that it can be done.

After this works, the best would be if I have a local custom DNS resolver, so I can easily create new domains that become accessible from the browser. For example, it'd be great if I could still resolve certain static files such as https://openapi.vercel.sh/vercel.json by cloning it.

# Vercel project resolver

Vercel projects need to:

- be found if the domain matches
- expose `public` files at the root domain
- follow the vercel.json spec for rewrites, redirects, and functions.

I can make this myself if I know the rules.

One great thing about this, is that my development environment is basically my production environment, but I can still develop on web-standards. A Cmd+S means things get deployed to the local internet.

It's important to take note of the limitations of a servleress Vercel function, and try to stay within the boundaries of what's possible.

# NPM Packages

Can I create a NPM server locally as well and serve it on the same API address, so I can still use all popular/common NPM packages? This would be cool!

# Firewall

This is all great, but there are still limitations, obviously:

- I can't build on top of external APIs that I didn't make myself
- I don't have the ability to do any direct web crawling, scraping, or otherwise
- I can't deploy! This is, of course, the more important problem to solve

## External APIs

I definitely need an OpenAPI directory, and this means I know the servers. I can simply create an LLM that creates a seemingly plausible mock-response for API endpoints that seem available, and cache this, so things that require these API's still kinda work.

## Webscraping

I can scrape my own little internet, so I can defnitely create software that can do webscraping, fully offline. Besides, I can come up with a set of common sites and create mock sites for them.

## I can't deploy

This may be annoying but it's also kind of great. I won't be impacted by external validation. Validation will probably be more objective now. The 2 main ways I currently deploy are `npm` and `git`. I'd love to be able to still deploy the way I was previously able to, but I can also simply use a USB stick, and run a script to deploy things once a month or so.
