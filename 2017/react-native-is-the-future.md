---
date: 2017-07-03
modified_at: 2019-01-07
tags: [react-native, javascript, programming, web-development, nodejs, coding]
---

# My view on React Native and why I think it's the future

Really Nerdy React Native Rampage Now
In this article, I will completely rant out about React-Native. I basically do
this for myself as note-keeping; instead of losing track, I will keep all stuff
ordered and neat in this article. I will provide links to interesting material
so that you can learn it with me!

> Hi, I'm Jan, and I am a nomadic entrepreneur that is studying and working on
the move. I have a startup called Travel Life Movement
[https://travellifemovement.com/], and recently I went completely nuts about
React and React native.


Do you want to know why? Let me explain.

I. Getting started
Before 2017
I've programmed in HTML, CSS, PHP and MySQL since I was 13. I had a text-based
Mafia RPG game that I maintained and improved all the time. During my AI
Bachelors, I have programmed in Java, C, C++ and Python. For a side-project,
I've programmed in Pascal. But I've never touched Javascript before. I just
didn't like it.

My observations about coding web(apps) in 2017
The whole web app and app world is changing rapidly, and javascript is hard to
dodge these days [/and-then-i-turned-to-javascript]. It's impossible to know
everything because the moment you've learned it all, things have changed again.
As a coder nowadays, it's very important to be able to adapt, and use resources
that are freely available. Don't re-invent the wheel! Instead of creating your
own bricks, built a house with all the bricks lying around! They're not always
perfect, but it's gonna be a trade-off between development-time (time == money)
and quality anyway. Better create 80% of the result in 20% of the time. That
said, I think it's still very important to research well before starting.
Building on top of garbage can never create wealth. A monkey with a golden ring
is still an ugly thing! A good start is half of the work. Yeah... I like
sayings.

Let me convince you: React is the future!
I've read much on Medium.com, and all articles have the same conclusion:
Javascript is getting stronger, and will not go away anytime soon.
Some really nice articles here
[https://medium.com/this-dot-labs/building-modern-web-applications-in-2017-791d2ef2e341] 
and there
[https://medium.com/the-react-native-log/comparing-the-performance-between-native-ios-swift-and-react-native-7b5490d363e2] 
have convinced me to go all in on React Native and React. Some more articles if
you still need to be convinced.

 * Nice React Native Review
   [https://blog.discordapp.com/using-react-native-one-year-later-91fd5e949933]
 * About code re-use...
   [https://hackernoon.com/code-reuse-using-higher-order-hoc-and-stateless-functional-components-in-react-and-react-native-6eeb503c665]
 * Even AppleDevs are getting convinced
   [https://medium.com/ios-os-x-development/an-ios-developer-on-react-native-1f24786c29f0]
   .

If you like to read.... Just see my recommendations on Medium!
[https://medium.com/@karsens/has-recommended]

I'm sure in a few years, react will standardize one codebase for web, Android,
iOS, WP.... Everything. And that's why I'm all in on React right now!

My plans...
In June, I was studying and working with React Native about 10 hours or more.
I´m decreasing this number to about 8 hours per day now to maintain the right
work-life balance, but the point is that I was very excited.. You may ask why.
Well, I have an amazing plan to build an application for travelers. It's gonna
be all you need, the Google, Facebook, and WhatsApp for travelers. I will not go
into the details, but I'm super excited about it. I'm obsessed. Oh, and did I
say I was excited? Well, I am.

II. Setup
OS
Obviously, MacOS is the best OS for developing with React Native because you can
test both iOS and Android apps at the same time. It's not possible to do this on
Linux or Windows. Unfortunately, I'm already committed to Windows, but there's a
big change that I'm buying a Mac laptop. If you have any second-hand Macbook
lying around and you're located in Germany, let me know. You can trade it for my
HP Windows laptop.

IDE
For React Native, I've tried WebStorm, Sublime, and VSCode. It seems to be a
trade-off between functionality and speed. I think VSCode is the best because
you can install lots of plugins that make it really functional, but if you want
to keep it simple and fast, that's also fine. WebStorm gets a little slow
sometimes, even on my i7 8GB RAM Laptop.

Tooling
I'm going to try Prettier, Linting, Reactotron, Webpack, and lots of other
tools. There are so many things that can make your coding experience better. I
will give short descriptions of all my experiences here!

III. Useful Components, Libraries, and Examples
Sites to explore.
JS Coach [https://js.coach/react-native?sort=popular] is a good way to explore
popular RN stuff. Of course, Google also works, and you'll often end up at
Github, but keep this one in mind, might be useful!

My Medium Recommendations [https://medium.com/@karsens] - I read tons of
articles about Javascript, and they're often on Medium. That makes my
recommendation list a useful resource. I follow lots of awesome JS devs. I think
it's a great way to see the bigger picture of Javascript!

Follow me on GitHub [https://github.com/EAT-CODE-KITE-REPEAT] - I star all nice
repo's I find.

Egghead [https://egghead.io/?rc=3s1pk4] is a great website to get started with
modern coding in general, and also has awesome courses about React Native! I
totally recommend this website. Beware that some courses are for the more
experienced developers, as they are sometimes a little bit fast to take it all
up!

Handlebars [http://learn.handlebarlabs.com/courses/175915/] has a nice course
and it's free!

IV. Decisions, Decisions, Decisions...
Navigation options
After some exploring, I share my findings here:

> All I say in this video is basically that Wix's nav is better than Facebook's
recommendation because it is built on top of actual native navigation
components.The next day, I figured out that I shouldn't be so perfectionistic
and just went for React Native Navigation because it was already in my
boilerplate! Also, I tried Wix's navigation, but I couldn't figure it out. They
didn't have a very good documentation for setting up Android, and it takes more
steps than the official Navigation to set it up correctly. Let's just go for
simplicity...

By the way... This article is really good at explaining the official Navigation
for RN :) this one
[https://hackernoon.com/getting-started-with-react-navigation-the-navigation-solution-for-react-native-ea3f4bd786a4]

Higher order components pack for general purpose components
This can save you a lot of time because you don't have to reinvent wheels.

 1. Native Base [https://nativebase.io/]
 2. RN Elements [https://github.com/react-native-training/react-native-elements]
 3. Ant Design Mobile [https://github.com/ant-design/ant-design-mobile/]
 4. Shoutem UI [https://github.com/shoutem/ui]

I still have to explore all of them. I'm using Native Base in my prototype app
right now, and I quite like it!

Native Base has been around for longer, and RN Elements looks like an American
Copy of it, but it might be better, I don't know yet. I'll try them both!

The general purpose components can be used widely in my apps! Here I play around
a little with Native Base.

> Check this playlist for some info and playing around with Native Base!React
Native for The Web!?
I think this is the future, but it can go both ways... Write everything in React
Native and automatically compile it into a website too. Or write everything for
the web, creating a progressive web app that works on Android and iOS too,
giving access to native sensors and components. Currently, my personal opinion
is going for the first option, because I think the progressive web apps don't
work that well yet on iOS, and the disadvantage number two is that you can't
find your PWA's in the app stores yet. But it may all change! Who knows. There's
just one certainty: React.

Some really interesting projects:

 * ReactXP [https://github.com/microsoft/reactxp]
 * React Web [https://github.com/taobaofed/react-web]
 * React Native Web [https://github.com/necolas/react-native-web]

Boilerplates
Click here for some awesome starter kits
[https://www.icicletech.com/blog/react-native-starter-kits]

Ignite is very useful as a boilerplate. I'm using that now.

Of course, there are much more boilerplates to choose from... Just go for one,
it doesn't matter. Whatever feels good.

Modals and pop-ups
https://github.com/jacklam718/react-native-popup-dialog
https://github.com/react-native-community/react-native-modal
https://facebook.github.io/react-native/docs/modal.html

V. Other resources
HighScalability [http://highscalability.com/] contains very interesting articles
about the scalability of big apps.

I'm going to get into PWA's, React, Node JS, NoSQL, Ansible and Ghost CMS! I am
super focussed on RN right now, but I am finding these technologies very
interesting for the future!

React: enzyme and Jest: testing.

Cheat Sheet for styles in RN: X
[https://github.com/vhpoet/react-native-styling-cheat-sheet]

Camera:
https://medium.com/react-native-training/mastering-the-camera-roll-in-react-native-13b3b1963a2d

Interesting RN projects:
https://medium.com/react-native-development/interesting-react-native-projects-to-learn-from-99d1a0c0117e

React Native Radio
We can even listen to React related stuff in our spare time, and get to know all
the ins and outs of React Native. How nice!
https://devchat.tv/react-native-radio <-- yeah... I'm on a rampage.


Good articles July 2017
https://medium.mybridge.co/react-js-top-10-articles-for-the-past-month-v-july-2017-f7f0696dfa76

Quotes
Evan Rogic, Toptal [https://www.toptal.com/react/react-redux-and-immutablejs] -
The synergy of React, Redux and Immutable.js, when used right, offer some
elegant solutions to many performance issues that are often encountered in large
web applications. Immutable.js allows us to detect changes in JavaScript
objects/arrays without resorting to the inefficiencies of deep equality checks,
which in turn allows React to avoid expensive re-render operations when they are
not required.

VI. Study group
Are you super exited right now about RN? Do you like to travel and are you
planning to put loads of time into learning this language? Then contact me! I am
managing a Javascript co-study group as a part of my startup Travel Life
Movement [https://travellifemovement.com/]. Check it out and ask me to join!