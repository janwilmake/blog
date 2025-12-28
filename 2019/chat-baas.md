---
date: 2019-01-11
modified_at: 2019-01-11
tags: [programming, startup, business]
---

# Chat-BaaS: Chat Backend as a Service

Chats are very universal. With Communify https://communify.cc, I'm solving a
problem that many software companies have solved, are solving, and will solve. I
am solving it for React-Native + Node JS + GraphQL + MySQL, on Linux. A very
nice combination.

What if I could create a BaaS for chats, and solve this problem once and for
all?

There are already Chat BaaS'es out there. Check https://sendbird.com/. If you
read their blog, you'll find others, too. But it's super expensive, and I don't
know if they've taken the right approach.

So, in this post, I will ellaborate on what I think the right approach would be
for creating a Chat-BaaS.

Model, front-end and back-end
Every chat-post has { user (id,name,avatar,pushtoken), channel, group,
information (type, text, likes, etc.), createdAt, updatedAt } and every channel
has { id, channel, group, user, createdAt, updatedAt, lastMessage,
lastMessageText, etc... }

The whole front-end is super convenient. I could open source the whole front-end
of the chat-list, chat, chat-details, actions, and everything and couple this to
a default BaaS where people can create an account, get 1M messages/month for
free, and pay a lot more for more.

The cool thing would be that I open source the front-end as one component which
is a data-coupled and navigation-coupled react-native component. you only have
to give your token and it connects with your backend.

On the backend, it has a few queries and mutations:

Queries: serverInfo, posts, subs, mysubs;
Mutations: createPost, likePost, createSub, createPM, deleteSub, toggleSub,
setRead, upsertSub.

On the front-end, it can actually handle all push-notification stuff. This is a
big big deal. Lots of code that can be spared for a startup if they use this.
The user model is very lightweight and is meant to be extended by the startup
itself.

The cool thing of a BaaS is that you can create multiple front-ends for it. I
could also create an app in which you can create your own 'app'. It then creates
the whole chat-interface inside that app. with react-native-web, I could also
expose that chat-interface on the web.

This idea could take a huge part out of my codebase. On itself, it's a big
startup, which is just a small refactor for me to create and start using
myself... Since the biggest part of many applications is the chat, it's a great
way to shorten the programming time to create useful apps.

This app will still be useful in a 1000 years. Think about that!

Scaling
It gets even cooler if you think where the bottlenecks are. I think that, if
it's a truly good product, you don't need marketing or anything. No sales. I
think, if it's a truly good product, all you need is good scaling. It's so
universal, that features is something you can finish. After a few years of
programming, it just has all you need. So features is not a bottleneck I will
need many people for. What's left? SCALING. So scaling is the bottleneck. So how
do we scale succesfully? The great thing is that this every platform that wants
to use this, is independent of other platforms. So they have to scale
independently. Another great thing is that even scaling can be automated.
Databases can be created automatically. For small customers, a single server per
DB will do with a few servers for the backend. This can be automated. Once we
have super big clients that need sharding, they have 2 options:

 1. Pay us for experts that automate the sharding process
    
    
 2. Split up their app into separate communities, for example, location-based.
    
    

So if I get the hang of basic CI automation, I can automate up to 10k online
users per community or so, maybe even more.

This is a great idea.

Should I do it?
I think that, if Communify doesn't pick up as quickly as I expect, it may be a
smart idea to have a look at this. It seems that MessageBird is doing incredibly
well. To start, a PoC should be easy. Just extrahere the server of communify,
automatically create a new SQLite for every Backend user, and create a nice
onboarding page that asks you the app-name and shows you your app on the web. It
should just be a screen that you can place in your RN-app. super simple. If this
proves succesful, I could create more building blocks for apps maybe. More small
BaaS'es. For example one for a timeline. One for friends. One for pages. One for
photo albums. The possibilities are endless.

To further see if it's really that easy to create a BaaS for Communify (there
may be some things I didn't see because I didn't look at the code) I should have
a look at the backend code and see if I really thought of all connections....

Join me!
Did you read it all and think it's a great idea? Then join me, I could use some
hands! As of now, I have so many things I want to build, but just so little
time! Yet, I already have a great start. I basically have all the code
(front-end and back-end) already, I just need to rewrite it a bit, and make it
look fancy. Let me know if you're interested, or let me know if you're
interested in using parts of my codebase! Everything's negotiable!