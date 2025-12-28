---
date: 2019-02-24
modified_at: 2019-03-08
tags: [programming, react-native, product-development]
description: How to regain control of a clumsy startup codebase by simplifying development ecosystems, using JavaScript only, vertical scaling, and considering monoliths over microservices.
---

# How got get your app under control? Remove wildgrow, KISS, monolithize

A lot of startups run out of money and can't take off because they have a very
clumsy/heavy codebase that's hard to change/maintain. In early stage startups,
it is very easy to build up unmaintainable and legacy code because you pivot a
lot, both in tech-stack, developers, and in features of your app. Because of
those reasons, app development will slow down a lot and become very complex.



Complex Development Ecosystems
What I often see is that startups are using many different programming languages
and tools in their ecosystem. There is always a different programming language
that's better in some ways, but often, the most important factor is overseen:
learnability.

If you use Python, Ruby on Rails and Node on your backend, every developer needs
to learn those languages. If you use React Native, Redux, and Vue JS on your
front-ends, you give your developers 3x more to learn before they can become
productive. Oh hey, let's throw PHP in the mix! As an early stage startup, it
may easily become impossible to aquire people that know it all, and even if they
find someone, knowing all those languages won't make you the quickest at all of
them. Therefore, it may be an idea to decrease learning curve of your
development ecosystem.

I identified 3 reasons why startup development ecosystems can quickly become
slow, unmaintainable and clumsy:

 1. Changing developers
 2. Changing tech stacks
 3. Changing feature demands

What I advise and pursue in the apps I build, is the following stack and
paradigms:

 * GitHub for planning (issues) and version control. Don't use GitLab to reduce
   maintenance. It's worth the price
 * JS Only: Use React, React Native and Node JS. The developer now just has to
   learn one language! This also encourages [feature-ownership](/2019/code-ownership)
 * Keep DB Simple: As database, use SQLite until you require more power (which
   is very late, much later than most developers think)
 * Vertical Scaling: [Vertical scaling to the max](/2019/scaling-vertically). Much simpler DevOps, can be done
   until quite big apps generate huge amounts of revenue.
 * Move to a single codebase: Easier setup. Don't split your issues between
   repo's.
 * Create an overview: Create and maintain a README file that gets new
   developers up to speed and gives an overview for current developers and other
   employees of the startup.
 * Microservices are often considered, but for most startups, it's overkill
 * Start using docker and kubernetes once you really need it. Your setup changes
   too quickly in the beginning, and it will just increase maintenance cost.
 * [Use Expo as much as possible](/2019/perfections-vs-speed)
 * [Think well about your code quality](/2018/high-code-quality)

Migrate to Expo
I see a lot of startups working on big apps in either native Android, native iOS
(or both), or in bare React Native. Expo has matured in the past few years, and
for most apps, it will work, making some small concessions. There is a big edge
using expo as a startup: I call it [the Expo Edge](/2018/the-expo-edge). At a few companies I've worked, I think
that a full rewrite of your app may not be a bad idea at all
https://medium.com/@herbcaudill/lessons-from-6-software-rewrite-stories-635e4c8f7c22
. For bigger apps, it can be daunting and scary and it's often discouraged, but
especiallly for early stage startups that need to pivot a few times, it can be
good to rewrite if you have learned more about your tech-stack, and the features
you really need. If it's possible, I recommend [migrating to Expo](/2019/migrating-to-expo). Expo takes away much of the hassle of
app development (Deployment, OTA, Unstable code) and makes it possible for you
to focus on what matters: The features of your app.

About Monolithizing
Micro Services are something you grow into, not begin with
https://nickjanetakis.com/blog/microservices-are-something-you-grow-into-not-begin-with
. In this article, I found a very interesting quote: "As developers we’ve all
heard the phrase “DRY: don’t repeat yourself” and in general that’s a reasonable
guide to go by, but often times it’s very well worth repeating yourself. It’s
worth repeating yourself because if you try to abstract something without really
understanding what you’re abstracting then you create something called a leaky
abstraction
https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/."
Also, he states Shopify and Basecamp are monoliths and they earn $20M+/month.

Some people area against monoliths, but they have a good reason; How
MicroServices saved my small SaaS business
https://www.ynonperek.com/2018/01/15/microservices/ states micro services are
useful because it takes other programmers (freelancers) months to work
comfortably with his codebase. If you have many individual teams or freelancers
at work at your project, it can be better to let them build microservices since
those will be easier to understand on themselves for other freelancers. However,
I still think that a one-language paradigm is even better (JS-only, for
example).

All in all I think that, for most startups, it'll be better to keep a monolith
or to monolithize if you have different services already.