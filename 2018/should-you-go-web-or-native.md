---
date: 2018-03-06
modified_at: 2018-03-06
tags: [react-native, web-development, programming, startup, product-development]
---

# Should you go web or native?

When you're creating a software product with a certain goal, and you're just
starting out, you will probably have a hard time making a decision.

This is what happened to me. For months and months, I just learned a lot about
everything. And in the end, I choose for React native over the Progressive web
apps. (Also see this article [RN is the future](/2017/react-native-is-the-future))

Last Friday on the Dojo Barbeque, Niels Bossman from Makkelijk Afvallen
http://makkelijkafvallen.eu asked me a very good question. 'Should I make an
app or should I stay on the web?'

This is a very hard question to answer but I answered with some insights that I
think everyone should take into account. And of course, it's not the same for
everyone.

Here are some considerations: Capabilities, Platform, User Aquisition, User
Retention, and costs.

Capabilities
Think about what your product is and what kind of capabilities it will need.
location? push notifications? payments?

These things are not as accurate, as good, or as user-friendly on a progressive
web app, compared to on react native.
Payments are done with one click of a button on native. On the web, it's a lot
harder still in most cases.
Location works for many devices on the web nowadays, but you can't track
location in the background, for example.
Push notifications work on newer Android devices... iOS doesn't do this kind of
black voodoo magic.

More on progressive web apps later.

Platform: Mobile or Desktop?
Does your target audience mainly use a desktop computer, or do they use their
phone the most? If they use their phone more... It's probably a better idea to
go for react native.

You could bet on progressive web apps, but they are not there yet completely!
More on that later.

User aquisition
Where do you get new customers from?

 1. Google (SEO)
 2. Social Media
 3. Organic
 4. App store

For [1] you need to have a website. Google can't search inside your app! For
[4], you need to have an app. If you want it all, you need to have both.

User retention
There are many ways to get your customers back to your platform. Here are a few:

 1. Email
 2. Push notifications
 3. Physical products
 4. Organic Social media
 5. Paid Social Media (ads)

To decide, you have to know what fits the best for your product, and you have to
understand how good each of them works for platform of choice (web or native),
and your business model.

Costs
Until recently, making apps was very expensive to do. It's a pretty new industry
and there was high demand, so the costs for people that could create apps went
up to ludicrous heights.

The biggest reason why the costs went down a little lately, is the rise of
Javascript and React Native. Before RN, most GOOD apps were built with native
Android and native iOS: two completely different programming languages! This
meant that you needed at least two developers and also a backend developer to
get the job done (most companies also have expert UI/UX designer and product
manager, so your team gets to 5 people easily). All in all, the amount of hours
spent is 2-5 times as much to build an app!

So... Using react native will cut down the costs a lot!

Progressive Web Apps?
Progressive web apps are certainly a very interesting new technology and if you
already decided to go for the web, I would certainly recommend to implement it
in a way that it works as a PWA. For this, I'd recommend Lighthouse
https://developers.google.com/web/tools/lighthouse/.

PWA's sound like the future! It's a platform for mobile & desktop, Windows, Mac
OS, Android & iOS.

Nonetheless, I choose for React Native. And here are the main considerations
that made me make this decision.

1 We use apps, not browsers According to this 2017 report
https://www.comscore.com/Insights/Presentations-and-Whitepapers/2017/Mobiles-Hierarchy-of-Needs
, Mobile users spend 87% of their mobile time inside apps. Not in the browser!
2. The market is moving more mobile. We all love our phones. Some of us hate
them as well, but the time the world spends on their phones is still growing 
according to this study
https://www.comscore.com/Insights/Blog/Mobile-Matures-as-the-Cross-Platform-Era-Emerges
3. You can't find progressive web apps in the stores. Google is planning to make
PWA's findable in the Google Play Store, but it's not the case yet, and who
knows how long it will take? Apple, on the other hand, is completely blocking
it! They are not planning to showcase PWA websites in their stores anytime soon
4. Notifications are not working on iOS (yet?).
5. Offline capabilities don't work on iOS (yet?).

All of these things may not be technical problems. They can easily be made. But
Apple is blocking the road! Which is a very obvious business decision. They are
earning a lot of money with their App Store, and if apps become available
outside of it, they lose their walled garden where they can charge how much the
fuck they want.

Facebook to the rescue.
As much as I hate Facebook for its immoral way of doing business and retaining
users on their platform, the things they open source are great.

In 2015, they open sourced React Native
http://facebook.github.io/react-native/ and this completely changed the game
for the app world. Now, in 2018, many big apps use React Native! It's a great
technology, and I decided to go for it because it binds very closely to actual
native hardware capabilities of both Android and iOS. Also, there is a huge open
source community which means that it's not limited anywhere. If people need
something, it will be created, and it will probably be open source.