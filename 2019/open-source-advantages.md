---
date: 2019-05-15
modified_at: 2019-05-22
tags: [open-source, programming, business]
---

# The advantages of open sourcing

At LECKR https://leckr.io, I'm developing open source components for the apps
I'm building. Instead of making everything specific to the apps I'm working on,
we look ahead and see that some of the things can be used universally across
multiple apps (Let's call this process "opening up"). It's a bit more work*, and
we give away free code, so the advantages might not be very apparent
immedeately, but in this short essay I'll try to make you see why I choose to do
so. An old Dutch saying goes De cost gaet voor de baet uyt and it's true, first
it will cost you something, but then there will be ROI.

* =Making your code universal means different abstractions and taking into
account more possibilities. This takes more time

Advantagetown
1. Feature Separation over mechanical separation
Most apps are separated in screens, store, components, util, wrappers, and stuff
like that. I call this mechanical separation. However, when you open up, you
will enforce yourself to do something called feature separation. Every library
contains all kinds of mechanics, but just one feature. The advantages are huge,
in my eyes. For one, you keep all things that do the same thing together in a
folder. That's nice when you want to work on that feature! Secondly? There were
more advantages, but I forgot.

2. Attract Devs
When you open up, other developers will start using your code (Doh). This can be
very benificial because you may be looking to grow your team! And it can be very
hard to find experienced developers in your technology. Well, this is the way,
my friend.

3. Loss of mass and community PR's
In Dunbar https://dunbar.site, about 75% of all LOC of the app is opened up 
now. That means the app itself becomes 4x as light, 4x less work, to maintain.
People from the community that use my libraries will do their part in fixing
problems of the opened up code.

4. Extra hustle on the side
If you do this right legally, you can use GNU Affero GPL or a similar legal
binding to your open source code. This licence makes it possible for everyone to
use it for free, but they need to open source all modifications as well, and if
they are a commercial company, you can charge them for it. This may take a while
to set up, but it may be quite lucrative in the long term.

5. Whitelabel your product
When you make open source front-end, you can also think about not just putting
UX and UI there, but also whole data-fed functionalities that actually do
something. These things that people donwload your app for, can also be
encaspulated into other apps if you open up. Of course, you'd need a business
model, but it can be a great way for strong exponential growth.

6. Viral Growth
Talking about strong exponential growth, I'd like to go one step further. What
if you made a functional component that had your logo in it? You can only use it
with the logo added, or you'd have to fork the library. Some apps would choose
to do so (I do so for a google address component that fetches addresses with
their API, and I kept the powered by Google. It's a good brand anyway). If your
brand gets that good, this may be very good for virality because users of
different apps will be taken to your app! Wahahaaaauuuu!