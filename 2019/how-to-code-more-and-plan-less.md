---
date: 2019-05-01
modified_at: 2019-05-02
tags: [programming, productivity, shipping]
description: Overcoming the PO Fallacy by moving todos into the codebase instead of GitHub to reduce context-switching and increase time spent coding versus planning.
---

# The solution to the PO Fallacy - How to code more, and plan less

As a solo devpreneur I find myself over-analyzing and planning + thinking too
much. Even when working in bigger teams, I end up creating so many to-do's that
I get afraid of starting because it's so much. I end up planning without
executing. It's kind of a procastrination, so this has to change.

I think the problem is the context-switch between creating GitHub issues and
coding. Also, it's a bit of analysis paralysis. What if I would create my todo's
inside the codebase, and stay more connected to the code itself?

There are many impacts when I do this, and leave GitHub altogether.

 * Faster time-to-context
 * To-do's structured by file and location in code, not by feature. This reduces
   file switching as well
 * No more, or way fewer, context-switching
 * SCRUM board is still possible by doing this in a single file and linking
   titles with descriptions by #.
 * Also assignees are still possible (just use @{user}), just like labels (just
   use #{label}) and branches (just use #{n})
 * Time-tracking can be done with WakaTime, by file instead of by feature.
 * Less need for branches since there is less fileswitching
 * When starting to code, just open the codebase, start on a file.
 * It's harder to keep the convention that github enforces upon you, but if you
   know the convention, it'll be easy.

A good blog: https://simpleprogrammer.com/context-switching/

Migrating to this
In the end, I think it's nicer to have something like GitHub too, especially if
you work in a team where not everybody is a developer (a common occurence,
unfortunately). Even when you're alone, it's easier to have a glance and/or put
something on GitHub than in your Codebase. For planning and oversight, GitHub's
great. But for time-to-context and workflow, it's bad.

You can also maybe do it a bit less extremely: When you start your day, just
think of things you want to do that day, and copy all the issues you can finish
in one day into your codebase, in the right files. Then just close GitHub for
the day, and give it a go. Start flowing.

This way, you'd end up having to access GitHub just once for a few minutes per
day, and this will already give you huge benefits of not having to
context-switch (and worse, not having the chance of being distracted) all the
time.

Abandoning Chrome
For now, I'll try it like this. I make sure that I don't have to access GitHub,
the whole day. This means I go to Chrome very rarely: only when I need to read
some documentation, or look up a new component.

I also installed a plugin that lets me have a maximum of 3 tabs. Since one is
reserved for running the packager, and another for music, this leaves just one
to search for documentation and libraries.

However, I could also:

 * Put the music in Spotify
 * Put the packager in Chrome, limited to a single tab, minimizing and hiding it
   completely as a silent background-process.
 * Download documentation of the things I need often: React Native, React
   Navigation, React, Expo.
 * Whenever I really need to know something, delay this, and do it later. Do
   this with a simple hashtag: #toSearch. Whenever I really run out of things I
   can do inside my context, open up FireFox, search my #toSearch list, copy the
   answers I need, and close it.
 * To enforce this even more: Turn off internet access with some kind of
   Firewall that blocks all internet except localhost. This thing should be
   easily turned off. This requires an extra step for me, every time I open up
   something on the internet.

This way, I think I'd just need FireFox about 4 times a day or so, for a max of
an hour. Given that my current time in Chrome is ±4h/day and that this is
majorly unproductive, this would give my actual productive time a huge boost!

Let's do it.

Downloading documentation into PDF's
I tried Acrobat Pro. This tool allows you to do this:

 1. Get Adobe Acrobat Pro and open it up
 2. File -> Create PDF -> From website
 3. Type website, and select to crawl it all

However, it didn't work! Also, devdocs.io doesn't allow me to download Expo's
documentation. It's possible to run React Native documentation locally, and for
Expo's documentation it's probably also possible. This may provide me a better
way to turn them all into a searchable pdf. If anyone tries, let me know!