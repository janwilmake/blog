---
date: 2018-03-13
modified_at: 2018-03-13
tags: [programming, coding, dx, open-source, productivity]
description: Seven key principles for maintaining high code quality, balancing concerns like DRY principles, naming conventions, external dependencies, and reducing time-to-context.
---

# My 7 key ways to keep my Code Quality Ultra High

 * Seperation of concerns. I don't agree with seperating style and data from the
   components too much if it's not reusable/redundant, because it will make
   single features more sparsely spread across the codebase. In my opinion it's
   better to Seperate by feature.
   
   
 * No redundancy: It's very important that you don't have the same code twice.
   Don't Repeat Yourself (DRY), as most devs call it, is important. In the
   beginning it can save you some time with an easy copy and paste. However,
   later it may be difficult to search the things you need, because they are in
   multiple places, and to change a single 'feature' or UI in more places, you
   have to change it in every place seperately.
   
   
 * Complexity vs. Flexibility: You don't want to create a new component for
   every single difference. Props in components can be great to make a component
   more adaptable to the situation it's used in. It's the same as using
   variables in a function to make it do more tings. However, sometimes the
   component may become too complex. If this happens, you can either split it up
   based on naming, or based on type of feature. You can also extrapolate
   certain parts of the component into props of the main component (Let's call
   it subcomponents). This is a big advantage because it makes the component
   incredibly flexible!
   
   
 * Good Naming vs. code-speed: Make sure to use good names for functions and
   components. The more specific, the easier to understand. Don't be lazy and
   keep the same name for a compnent if it's usage changes! This will prevent a
   lot of confusion later on. However, you need to find a balance. You're not
   gonna describe every feature in the name, and change the name every time you
   add something. This costs more time to write. Find a proper balance.
   
   
 * Risk Reduction vs. Time-to maintain: Don't rely too much on external
   libraries! They may change or break. Unless you know very well who maintains
   it and unless it's a very stable library, just internalize your components!
   On the other hand, this will of course also increase the time you spent on
   maintaining it yourself. If a library is very well maintained and is getting
   upgrades regularly, it may be a smart move to choose to rely on it and hope
   they don't fuck up.
   
   
 * Reducing Time-to-Context: It surprised me I still had less than 10k lines of
   code on the client-side, whilst working in this code base over 4 months. The
   reason for this is probably the following: I read and change my code way more
   often then I write it. Very often I'm just looking up code because I want to
   see what's going on. This can be called 'context'. This is what I spend a lot
   of time on. That's why I need to invest time into creating certain universal
   patterns and choices. The most important is that I keep the data structured
   in the same way.
   This will make it quicker to understand what's going on somewhere, because,
   after you learn the code base, you will understand patterns you see quickly
   as they are the same all over the app!
   
   
 * Learnability: In the future I want others to work in my codebase too. That's
   why I need to make the code very easily learnable. For this, a good structure
   and proper naming, and using common conventions and patterns are very very
   important. Also it's important to know what the industry knows on average
   (this changes), and use those things! When choosing a library or technology,
   this is a very important thing to keep in mind.