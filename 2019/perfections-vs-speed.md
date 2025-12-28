---
date: 2019-01-11
modified_at: 2019-01-11
tags: [productivity, shipping, entrepreneurship]
description: Why staying with Expo and avoiding native dependencies saves development time and reduces bugs, helping startups ship faster with limited resources.
---

# Perfections VS Speed in Data-driven React Native Apps

In the past 2 years of working with react native, I've worked with 3 Expo apps
and one Native App. I've learned a very valuable lesson regarding the difference
between those two.

To keep it short, here are my conclusions:

 * If you can, keep using Expo. This will cost you at least twice as little time
   as Native. The automatic building and over-the-air updates save a lot of
   time, and their API's and Libraries are very stable and seldomly fail on me.
 * If you must, detach with Expokit, so you can still use over-the-air updates
   and a few Expo libraries, so you still save some time and have very stable
   libraries to your disposal.
 * If you create a native app with crna from the ground up - without Expo - this
   will be a lot slower. The libraries you depend on will be open-source, or you
   have to make your own and manage them yourself. This means there will be more
   maintenance and more bugs. Still though, try to depend on much-starred
   open-source libraries as much as possible. Every line of code written by
   someone else means you don't have to do it yourself!
 * Creating your own native dependencies should be avoided at all cost.
   Maintenance cost is very high.

I think that many startups fail because of high app development costs. When
money is low, I think that, sometimes, it's better to have a not-so-perfect
feature instead of going fully native and have it exactly the way you want it.
At my startup, I heavily decide what to do based on what's available with Expo,
so I can continue using Expo as long as possible.