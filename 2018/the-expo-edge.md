---
date: 2018-03-06
modified_at: 2019-03-25
tags: [expo, react-native, programming, devops, dx]
description: A comprehensive comparison of Expo versus bare React Native and ExpoKit, outlining advantages like build automation and OTA updates, and disadvantages including app size constraints.
---

# The Expo Edge - why you should choose Expo over bare React Native

I recommend Expo, because it gives you an edge compared to other ways to create
apps. The expo edge 😎

You should really try it! Certainly if you're new to the app development world
and you want to build a cross-platform MVP for your startup. Or maybe you just
want to learn how to make apps. Expo is great for that...

Advantages of Expo:
 1. We can use the very stable expo library You save sooooo much time when
    learning React Native. Expo has the most crucial features built in and it
    automates building process so you don't have to go through this difficult
    stuff. You can be certain that things work. Expo's possibilities are limited
    compared to those of react-native. You can't just link new external
    components if they need new native bindings. However, at least you can be
    sure that the stuff that expo does have works, and it won't break. It's a
    safe environment.
    
    
 2. We can use their very stable OTA system You can show your app to friends or
    random people on THEIR PHONES without having to push it to the app stores
    yet. Expo makes it possible to have an app inside an app. This is called
    Over the air updates.
    
    
 3. Building automation becomes a possibility if you don't detach. This saves
    you days, or even weeks.
    
    
 4. Push notifications Expo also has their own tool for push notifications which
    is very easy to set up, compared to other push notifications libraries. Or,
    if you detached, you can still choose ot use FCM or OneSignal if you like.
    
    
 5. Not just a sandbox It's not just a sandbox to play and learn. You can
    actually make some real good app with this!
    
    
 6. Detach and still get native possibilities If you need more functionality you
    can always detach your app. You loose the build automation, but you can keep
    all your code and continue with your app. At least you have had the
    'expo-edge' for a long time while developing your app! That's why it could
    be smart to delay detaching until you really need it to save time in the
    process while building your app.
    
    

Disadvantages of Expo:
 1. App size becomes bigger
 2. Your code gets published through their servers, do we trust this company?
 3. Required Android and iOS versions: The minimum Android version Expo supports
    is Android 5 and the minimum iOS version is iOS 10.0. For iPhones, just 1%
    has lower than iOS 10. Of all Android devices worldwide, 11% has a version
    lower than 5. In the Netherlands, this percetnage is just 3%.

Choosing Expo or ExpoKit
Here are some differences you should take into account:

ExpoExpoKitNo FB SDK, but Segment may do the jobFB SDKEasy push notification
setup (4 hours)Very hard push notification setup (4 days+)Build AutomationNo
build AutomationLive reload on real devices without connecting a cable,Live
reload on real devices using a cable, using a lot of RAMNo need for XCode or
Android StudioMust have XCode and Android StudioLive reload on unlimited devices
Just 2 real devices maxOver the Air UpdatesOver the Air UpdatesYou don't need a
Staging app, much less buildingYou need a staging app to test some featuresMuch
easier setup for new developers (<2 hours)Setup can take daysNo maintenance of
native dependencies and linksNeeding to maintain android and ios folders
Drastically Decreasing learning curve of developersHigh learning curveJust
JavascriptJavascript, Objective C, Java, XCode, Android Studio, etc.No release
channels neededEvery native change that breaks previous versions needs a new
release channel, otherwise users with older versions get a breaking change20%
less wasting time on building/deployment20% less wasting time on native changes=
40% faster feature development