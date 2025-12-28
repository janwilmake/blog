---
date: 2019-03-19
modified_at: 2019-04-26
tags: [react-native, programming, product-development]
---

# What is the best way to test new features in your React Native App?

In the past 2 years, I've worked on 9 React Native apps, and I've tried many
different ways to test new features. All possibilities have advantages and
drawbacks, so here they are.

 0. Dev Only Local Testing Don't do any setup. Just test thoroughly and quickly
    after building the new feature, and release to production right after you
    tested it and it works. The drawback is that it can't be tested by many beta
    testers, and it's prone to mistakes. Also, it costs a lot of effort to test
    features thoroughly, while just testing it for a while by more people is
    almost effortless.
    
    
 1. Using Wireless Live Reload Use Pure Expo ([migrate if needed](/2019/migrating-to-expo)) and let BETA testers test the app
    by running the packager and scanning the QR Code. This can work with as many
    devices as you want, as long as they're connected to the same WiFi network.
    
    
 2. Using a BETA tester Role You could make the functionality that makes it
    possible to give users the role 'Beta Tester'. If they have this, they can
    turn on and off beta features in their settings. This way you can slowly
    phase in and out new features (and even test beta features by segments of
    users to see how they like it). You won't need a different app for this.
    It'll take some setup, but in the long term, it'll be very easy to add
    features gradually.
    
    
 3. Setup A Beta Channel within Expo If you have [pure Expo](/2018/the-expo-edge) it's very easy to setup a beta channel
    https://docs.expo.io/versions/latest/distribution/release-channels/. You
    don't have to build, deploy and release the app every time you add something
    native (because you can't). You don't even have to do it once. You can just
    let users log into your Expo account and check out the app from within expo
    
    
 4. Setup a Beta Channel with ExpoKit This is the above scenario. This way means
    we have to build/deploy/release the BETA APP every time something native
    changes. This means twice as much of time is wasted on these time-consuming
    things.
    
    
 5. Secret Developer Mode Create a secret local developer role that makes it
    possible to enable certain features locally. For example, if you press 10
    times on a certain Icon, then 2 times longpress, and then 5 times again, the 
    devmode is activated. Now, you get an extra settings screen that makes it
    possible to enable and disable new features locally on your device. This is
    better because we don't need a different channel. One drawback of this is
    that there is no way of knowing that the user is really a dev. For backend
    driven features that require a lot of security, we need to add a
    developer-role to the user to limit access to certain new api's.
    
    
 6. A/B Testing with Firebase With Remote Config
    https://firebase.google.com/docs/ab-testing/abtest-config you can A/B test
    features over (a part of) your userbase, in production. This may be the best
    option for larger companies. It has one huge benefit, compared to all the
    above ways of testing new features: You can test psychological advantages of
    features. You can optimize funnels this way. You're not specifically looking
    wether or not a feature works well, or if people like it; you're looking at
    the most profitable way to design your app, and for the design that leads to
    most user satisfaction. This is usually in line with what people like the
    most; however, it's a hard thing to measure what people like, and what
    people say is not always in line with how they truly feel, because it's hard
    to express your feelings objectively. However, measuring and comparing to
    other designs can be done objectively.
    
    

When you're going to A/B test with Firebase Remote Config, you get all kinds of
statistics that you'd need to do yourself otherwise (like confidence factor and
probability of randomness). If you're good at statistics, it's no problem, but
Firebase can do it for you if you don't, and it never makes mistakes.

Personally, I'm for the 5th option: Least setup and most flexibility. However,
if you have a big team and working on a big product, the 6th option could be
very nice. It all depends on your use case.