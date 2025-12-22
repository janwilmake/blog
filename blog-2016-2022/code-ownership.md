---
createdAt: 1546693359000
updatedAt: 1546695644000
publishedAt: 1546694188000
---

# Why code ownership is a must for agile development

Tl;dr:

 * It takes a while to get to know a codebase
 * The more people have t know and edit one piece of code, the less efficient
   because of confusion and errors
 * However, strong code ownership also brings another bottleneck in play
 * Strike the golden mean! Strive for feature ownership to diminish
   ineficiencies and bottlenecks

It's optimal to assign one person to a piece of code if you want to have the
optimal development speed. This is also one of the reasons why Communify is
developing so quickly. I'm having ownership over the entire codebase. I know
what every script does. Searching for where is what is never a thing. Having to
figure out how something works or what something does, never happens.

If you're in a team, it may be useful to have access to changing someone elses
code sometimes. This is called weak code ownership. You are responsible for your
own piece of the codebase but others can make changes in it. You review those
changes and make sure the codebase stays the way you like. I think this is the
best because waiting on other developers to make changes for you can also be a
bitch. It can slow things down and force you to work on something else. That's
also why I don't like the back-end frond-end distinction much. I know python and
react native, yet, at my current day-job, I'm not allowed to work on the
back-end and make changes there. Very often I'm forced to start working on
something else and stop what I'm working on now, just because the backend people
don't have time to make a tiny change. If I could handle backend too, I could do
this change within seconds. Now I have to wait hours.

A lot of new features in an app involve changes in all layers of the code and
other work. That is, UI/UX, front-end, back-end, and testing. Therefore, if you
have a front-end backend sepeartion of your team, a new feature has to be done
by two people. If you also have seperate UX/UI and testing, that number becomes
4. Often, one is done before the other. Therefore, one person has to wait on the
other for it to complete! This is, in my humble opinion, a huge bottleneck to
developing speed and being agile... And now I haven't even talked about UX and
Testing! These functions are very often also done by separate teams. If this is
the way you do things as a team, and everyone has to wait for one another all
the time, a new feature can take days, if not weeks. The bottleneck gets bigger
and bigger.

Therefore, in a company that wants to be truly agile, I think that you'd have to
strike the golden mean by giving everyone responsibility for a part of the
codebase and process, yet allow everyone to access and edit all, and, in the
end, strive to work on your own code yourself by proper issue/feature
distribution by the team lead. This also shows why Full Stack Developers are so
valuable. Especially when they can also handle a bit of UI, UX and testing. 
Ideally, you shouldnt' seperate code and tasks by it's technology and skills
used to create them, but by it's features. This ensures code ownership, yet
makes it possible for one person to add one new feature, all by himself, from
start to finish. You can even take it further: let the person that crafts the
feature also evalue the introduction of the feature into production and see the
impact to the product. See what customers think of it, and if the results are
not good, improve. I think this would be great for many reasons. One because you
improve agile-ness, but also because you get to see the result of your own
doings. As a front-end developer myself, it can be very boring sometimes. I
never get to think about what something must look like, I just need to make it.
I never get to see the outcome of what I make, I just have to make it. So
boring....

So, in conclusion:

 * Be agile
 * Strive for feature ownership along the entire production-line to diminish
   bottlenecks, inefficiencies, and waiting