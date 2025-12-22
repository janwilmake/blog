---
date: 2018-03-06
modified_at: 2018-03-31
---

# The MVP Challenge - From 0 to MVP in 100 days: Using Expo

I want to make a software product, so back in May 2017, I decided I was gonna
make a React Native App. Here are all the things I learned and, roughly, the
workflows I use to make an app quickly. NB that it's barely an article, more of
a summary for myself, decision and workflow-wise.

> This article is part of a series on building an MVP of a Data-driven
cross-platform app with the following stack: React Native, Apollo GraphQL, and
on the backend Node JS with Express and a MySQL Database.


Coding style decisions:
I decided I was gonna code this way. I could also have chosen the more
professional and more common approach used in the industry, but for a
one-man-band, this is not necessary, in my opinion. Therefore I choose a style
that makes developing quickly easy. Because for an MVP, you need to be quick,
especially when bootstrapping!

 * Keep steps in this document and actual code very much aligned for better flow
   and not having to switch back and forth between functions, files, etc.
 * Sketch broad plan first, then fill in the blanks
 * Prioritise a small & stable codebase with lots of powerful functionality —>
   RN, Expo, Apollo
 * Boilerplate first for productivity, assuming I can need everything already
   the first day.
 * Flatten out file structure because it results in quicker building, easier
   overview… only create more files if they really feel too big and if you start
   getting redundant. I don't wanna waste time on imports and exports and
   finding where I put the code.
 * Heavily comment the code when doing a tutorial. First always sketch what I’m
   gonna code in the comments in the main file, and slowly split it up in other
   files.
 * Always stay in the editor. If I write notes in word, it will be a bigger
   threshold to go back to some psuedo-code or real code because word is not
   made for that.
 * Use flow or typescript, especially during the tutorial, but also for better
   understanding the code myself.
 * I like to always have a reason for doing something. Even for refactoring. So
   first start with an index and don’t use includes. Just do everything in one
   file. Then, when it gets too complex, or when I have to request the same
   thing twice, divide it up into multiple files. To summarise: show the
   refactoring and why. It’s important to show this process.
 * A terminal in the editor too
 * Shortcuts to the max
 * Measurement is WakaTime and Rescuetime
 * git init server and client separately. Git push every step. This makes it way
   easier to start somewhere in the middle any day by git clone & git checkout.
   However, always keep in mind that starting completely from scratch is better
   if I want to keep using the newest versions

Architecture and stack decisions:
There were some though choices. First of all I decided I wanted to go for
Javascript 100% to keep the learning curve as small as possible. But then there
ended up to be many many different libraries within Javascript! I won't go into
detail of my choice for React Native and Node + Express and GraphQL. But there
were some though choices I made.

 * MySQL or SQLite? SQLite just works. Simple. Efficient. I can create multiple
   files per game to make them work independently if one becomes corrupt. For
   example, when the chat gets corrupt it can easily create a new one. When
   users get corrupt the chat still could work. MySQL requires some more setup,
   but according to a later in-depth performance experiment, it turned out that
   MySQL can be a lot more performant on a higher scale. Therefore, I now
   decided to include MySQL into my codebase.

Work Ethic
It's very important to have good work ethic. If you are too chaotic, it's hard
to steer your direction. These are some of my habits:

 * Before starting, write the day down on notepad so I can close my laptop &
   think! It's easy to get distracted if you don't know what you're doing.
   Prevent this by closing your laptop when you loose momentum.
 * When scripting, use local environment & don’t check the remote environment
   all the time. Big pitfall! It takes a lot of extra time especially if you're
   debugging and doing trial and error fixing.
 * Focus on creating functionality & seek reward by seeing good use & smiling
   faces at the end of the day.
 * Keep finding ways to simplify code while keeping functionality and learn new
   useful things (see sidesteps).

Practice the Cycle of persistent learning, every day:
 1. Learn something new
 2. Apply it multiple times while minimizing overhead of having to create other
    things that I already know first
 3. Insert it into the flow of 0 to MVP

Cycle of actionable planning & keeping plans in alignment with results:
 1. Create plan of execution on a notepad: actionable to-do list that can be
    accomplished today
 2. Take it up, put my mind to it, open laptop, start focused on this plan
 3. Close when done or consciously distracted
 4. Feel proud or change plan

Habit of sharing what I learn
In october until december 2017 I took time-lapses or screenshots as social
proof. If I am confident enough, I can create a course and sell it on some
platform. But for now, I uploaded everything to YouTube
[https://www.youtube.com/channel/UCDw844XEAwsJLkftu9pq2vA] to prove that I did a
lot of work (and maybe to help some people too). In the end it gave me a few
dozen subscribers, so some people must've learned something.

This is what I wanted to show in the average video. NB: Not every video ended up
to be that way! Making videos is quite hard!

 * Pick a piece and write a short plan. [Talk about it.]
 * Start with pomodoro & music, and the first point of the plan
 * If I exactly know what to do, film it.
 * Write down solutions after long research in comments
 * Keep status in sticky note on screen all times
 * After I figured out what I need to know, summarize it in the comments
 * After I figured out the bug, summarize the error, the process, the bug, and
   the fix in the comments
 * Speak my mind
 * After every pomodoro is finished speak about the progress

Outro:

 * Invite to do the challenge with me (using same techniques): minimum one hour
   a day & film the process
 * Give reason for that
 * Create a list of people doing the challenge with me in the same languages.

This is what I did and posted on my Youtube Channel
[https://www.youtube.com/channel/UCDw844XEAwsJLkftu9pq2vA?view_as=subscriber].
It ended up to be great for social proof and social accountability, so I
certainly recommend it. You can see 46 videos about this on my youtube channel!
I don't recommend watching it all, but there actually is some useful stuff in
there. I wish there was an easy way to edit and distill the videos to more time
efficient ones.

The Workflow
Challenge 0 = Project definition
The CS Way:

 1. Requirements
 2. Possible techniques
 3. Design (structure, techniques)

Challenge I: Setup server
 1. add name servers of preferred domain pointing to cloudflare
    (dana&paul.ns.cloudflare.com)
 2. setup CloudFlare DNS

 * Point CNAME record www and @ to na-west1.surge.sh
 * Point A record server.example.com to server IP
 * Crypto —> Origin certificate, save these values!

 3. use any static website project but probably the React Bootstrap App theme
    that I modified, build it, and upload it using “surge ./build/ example.com”
    
    
 4. setup a server with Ubuntu 16.04 and Nginx that has this in
    /etc/nginx/sites-enabled/default
    
    

server { listen 80; listen 443 ssl; ssl_certificate /ssl/cert.pem;
ssl_certificate_key /ssl/key.key; access_log
/var/log/nginx/nginx.vhost.access.log; error_log
/var/log/nginx/nginx.vhost.error.log; location /appname { proxy_pass
http://localhost:3456/graphql; } }

 5. Make sure the process indeed runs on this location and port using pm2
 6. For more info see notepad

Challenge II: Expo Setup
Notebook
Challenge III: Creating UI
Currently, my UI will consist of screens and components. Repeatedly iterate
between these things.

 1. Create overview and decide which external components to use
 2. Create screens & components using docs, memory and hot-reloading & chitshit

TINY ANNOYANCES

 * It seems that hot reloading is a little bit buggy. It doesn't always refresh.
   Why? Pay attention
 * “[exp] [React Transform HMR] Patching HomeScreen” appears in console, but it
   doesn't refresh the app in the simulator
 * React native debugger works & simulator works, but the remote RNDebugger
   doesn't work with hot reloading. If I need hot reloading (useful for UI), use
   ‘exp start’ (normal debugger). If I need the Remote RNDebugger, use live
   reloading.

Desicions

No styled components. I decided to work without styled-components because it is
an abstraction and hides real function too much and it is not supported well
enough by all kinds of things. It changes the code a lot but it isn’t the most
reliable thing. Things can easily break with it.

Jest

 * read up on documentation and some medium articles like this one 
   https://medium.com/react-native-training/learning-to-test-react-native-with-jest-part-1-f782c4e30101
   https://facebook.github.io/jest/docs/en/tutorial-react-native.html
 * try snapshot testing
 * I may not need this at all. It is a huge burden to have to write tests all
   the time, so I don’t see the reason yet. If I go into production I might
   start to see a reason for it, but if I type everything strongly too, it won’t
   break any time soon!
 * it’s not certain if I want to include them by default because it increases
   boilerplate a lot. It’s probably not necessary for BETA, but it probably is
   for production.

Typescript:

 * try to use it for now, but if it seems that it takes longer and doesn’t help
   much, revert back to normal JS

Babel & prettier:

 * The way I do it now seems to work correctly
 * Previously had a problem of conflicting rules and it didn’t work well with
   styled components
 * Create a habit of setting it up in the project seperately every time (except
   for VSCode plugin settings)
 * Put as much as possible everything in package.json, not in separate files

Intellisense

 * Use this as much as possible because the autocomplete and type introspection
   gives me less reason to go to docs!

Dependencies

 * use react-native, react and expo as much as possible!
 * Use as little other dependencies as possible!

Challenge IV: Component Data Population
 1. Populate UI/UX with Apollo Data:
 2. Populate UI/UX with Real Mutations
 3. Populate UI/UX with Redux Store
 4. Make sure to be smart about sending functions to components and reuse the
    declarations

Challenge V. Add permissions & sensors
Every app needs a lot of permissions. Expo does this automatically, so no need
to worry if you use that. Sometimes you need some certificates, but the
documentation is almost always excellent in my experience.

Challenge VI: Alpha Testing with Expo App & friends
Exp publish & open on android + iPhone

Make & Fix Often-Made Mistakes:

Challenge VII: Beta Testing with Standalone App & ideal customer
see this blog [/expo-standalone-publishing]

Challenge VIII: Web stuff as funnel to app (Landing page + Blog + FB + Youtube +
React Native Web?)
BLOG
Create as many secure blog sites as you want for 5$ a month total using Ghost
CMS

 * Why Linode, NGinx and Ghost?
 * Setup a Linode server with Nginx and Node JS
 * Point a domain at the Linode server
 * Install Ghost using ghost-cli on the server using Nginx and by specifying the
   port
 * Installing SSL on a domain. Understanding NGinx, DNS and SSL
 * Install ghost locally in development mode
 * Go editing a theme and test by running locally
 * Setup newsletter using MailChimp
 * Start blogging and cross publish on sites like Medium and LinkedIn
 * Finish it up, summarise & show result

Challenge IX: Share
The most important haha.
ProductHunt, relevant communities, news sites, people, friends, etc…
See what @levelsio has to say about this! He recently created a book Make.

Challenge X: Profit, invest, automate, repeat
Inner cycle: Learn —> Improve core product + Actionable plans ——> Improve core
product
Outer cycle: Network, Share, Teach & Sell ——> Find collaboration ——> Create
prototype & Beta ——> Test product market fit ———> if yes, finalise into
monetizable production-ready MVP ———> Automate & Move on ———> Network, Share,
Teach & Sell

The Inner cycle is a daily thing. I repeat this every day and don’t have to plan
ahead much.
The outer cycle is a bi-weekly thing. There will be events and I can organise
meetings & classes to grow my network. This is my social time so it shouldn’t
interrupt work. Then I create a prototype & beta by transforming my core
product. This can be done within a week. I also need a week for more general
purpose learning, improving and maintaining. That makes it two weeks for a beta.
The testing takes some waiting, so in the testing phase the product is on hold.
There can be small improvements I have to make. After it is thought to have
reached PMF, I kind of enter the second phase: make it an production ready MVP,
automate all workflows, and move on. This may take another two weeks or so. This
means that I’m able to create a startup in a month. It is very important for
apps to get traction. I have a system for that of some key elements that always
have to be there. Most of them are automatically present by app design..
Sometimes I need good partnerships… If they don’t get traction they fail because
I move on.