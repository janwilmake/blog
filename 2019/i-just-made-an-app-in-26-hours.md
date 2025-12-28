---
date: 2019-03-10
modified_at: 2019-05-20
tags: [react-native, expo, programming, shipping, mvp, productivity, dx, open-source]
---

# I just made an app in 26 hours

I got this Aha-eureka moment when I started thinking about relationships, at
about 22:30 on a lonely friday night. How do I maintain my relationships? Well,
it's hard. All current platforms don't really help you with it. If they do
anything, they make it harder. You see, on Facebook and other social media I
have ±600 friends. This is not a maintainable amount of relationships. When I go
to these platforms, I don't connect with my close friends, I just sparsify my
attention to many loose connections, and this only makes maintaining the closer
relationships harder.

Thanks to Robin Dunbar https://en.wikipedia.org/wiki/Robin_Dunbar, it's known
that 150 is a magic number of the limit of relationships an average person can
maintain. I really think there should exist a tool to easily see and maintain
the relationships that you care about, and be able to reach this magic number.
To create a PoC I just need a very simple offline app that can get some contacts
from my contact list, put them on a screen, and have a cool UI that has leads to
real human interaction. Let's create an app, and call it Dunbar

Code
I started by creating a new folder, github repo, and launch expo init in the
terminal. I made a few sketches of what the app should look like on the home
screen. The rest of the app was a rather straightforward copy/paste from the
iPhone phone app I already use now.

So after an hour, I had a list of functionalities and screens the app needed to
have (See this GitHub Issue
https://github.com/EAT-CODE-KITE-REPEAT/Dunbar/issues/1). Then I started
coding, and I kept adding more specifics about the implementation in the issue
on the fly. In total it took me 6 morning- or evening-sessions of, in total, 26
hours. Of these 26 hours, 20 hours was coding. 4 hours was planning out features
(create a huge backlog), brainstorming, pre-validating with others, and testing,
and 2 hours was bringing it to the stores of Android and iOS.

The first iteration (Iteration 0 - the Proof of Concept) code will remain open
source in this repo https://github.com/EAT-CODE-KITE-REPEAT/Dunbar/. The app
is already usable, but further iterations will improve it greatly.

Validate
This week, I'm going to validate the PoC and get feedback from others. Then I'm
going to start with Iteration 1 and, hopefully this month, set it live. I can't
wait to see what others think of it! I can't wait to see if it gets any
traction. This could very well be a hit app!

How can it be so fast?


There are many reasons for it, but I think these are the biggest ones:

 1. My motivation to create it was super high, so I was about 50% more
    productive. A few times I was in a busy cafe, and I was completely zoned out
    and focused on writing code, while others were talking around me. Also,
    turning off my phone wasn't needed because I didn't care to check it at all!
    
    
 2. Programming is about reading old code and other people's code more than
    writing new. Normally, reading old code takes 75% of the time when writing
    code. Now I didn't have to read ANY code, making it 4x as fast. Let's say
    that, once I'm in a further iteration, I can't always be just writing and
    never reading code. Code just has to change. But the big advantage shouldn't
    be overseen that I am the one that wrote all the code. And if that's recent,
    this will mean that I'm not wasting as much time on reading code. Let's say
    that in further iterations, the time reading code will be about 50%, and
    writing code also 50%. That means that I'm 2x as fast at that on average!
    
    
 3. At most projects I've worked on there was complicated linkage with native
    code and no building automation from Expo https://expo.io. This easily
    takes about 30% of all coding time. Using Expo and staying in the realm of
    their possibilities they offer, removes all native Android and iOS stuff,
    making it 1.3x as fast.
    
    
 4. On most projects I've worked, discussions, prioritizing, planning and
    reviewing takes about 3 hours every 8-hour day (37.5%). Because I did this
    alone, I just needed 4 hours out of 26, which is 15%. This is another
    improvement of time of 19%.
    
    
 5. I used some smart ways to reduce boilerplate a lot (one of which is Redux
    light, I call it). This left me with an app of just 1500 lines of code. On
    most projects I've worked on, the boilerplate was already set up in a very
    extensive way, and it's not easy to change this. Therefore, I think I needed
    about 20% less code, if not more.
    
    
 6. I was able to rely on some libraries I wrote in the past and open sourced,
    one of which is React Native Data Forms
    https://github.com/EAT-CODE-KITE-REPEAT/react-native-data-forms. This
    library creates a form in ±100 lines instead of a few thousand lines.
    Because of this, I probably needed to use 50% less code. (improvement with
    factor 1.5)
    
    
 7. I kept components and my UI/UX simple and close to native UI. This meant
    that I didn't have to deal with any complicated animations or modals, or
    anything. These things can slow down your feature development a lot, maybe
    up to 100%, but let's say 30%. I've seen this a lot on my other projects.
    
    

These 7 reasons meant I was able to make an app 1.5 x 2 x 1.3 x 1.19 x 1.2 x 1.5
x 1.3 = almost 11 times as fast as when I'm working on a slow legacy
perfectionized product in a big company. Can this really be true? Yes, I think
it can. I made it in 26 hours. The next iteration will probably take ±62 hours,
which brings me to a total of 88 hours. This would take 3 developers ±2 months
to build something similar if they didn't have these 7 advantages. This would
cost a company at least €28.800,-. Not bad if I can produce the same result in 2
weeks on my own :)