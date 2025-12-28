---
date: 2019-02-24
modified_at: 2019-03-13
tags: [expo, react-native, devops, programming, coding]
description: A step-by-step guide to migrating an existing React Native project to Expo or ExpoKit for more stability, OTA updates, and streamlined development workflow.
---

# Migrating to Expo to become more lean and stable

It can very well be the case that when you started your react native project a
few years ago, Expo didn't exist or wasn't matured yet. However, now Expo is the
prefered choice when creating a new React Native project in most cases. The tool
is super stable and has many possibilities. Therefore, it can be a very good
idea to migrate to expo. In another article from about a year ago, I delve into
[the expo edge](/2018/the-expo-edge). This article will assume you
made the decision to migrate to expo, and shows you the steps to make in order
to achieve this.

Step 1: Create new Expo project with same name as current app and detach it.
Copy all code to this project and try to run it. Add all JS and Native
dependencies. All non-used dependencies. Now we can use OTA and use all Expo
libraries over Expokit

Step 2: Actively remove all native dependencies and replace them with Expo
dependencies.

Step 3: Once all native dependencies are gone, we can un-detach and will have
Pure Expo. Now we can use Expo push notifications and all expo commands like
expo build:ios and expo build:android to generate and sign APK / IPA files in
one command.

Migration instructions:
new expo project

expo init


If you want to use ExpoKit, run:

expo eject


react native link


cd ios
pod repo update
pod update 
pod install


Now, try to run it with

expo start


and in a new tab, run

react-native run-ios


If it works, the expo setup and ejecting succeeded. Now, it should be possible
to publish the app to expo using expo publish.

expo publish


Now, it should be possible to see your app inside the Expo app (after logging
in). This is called OTA. This is what we want! Please note that, after you added
native dependencies (the reason we ejected), you can't see the app in the Expo
app anymore, but you'll have to create your own BETA app with the native
dependencies installed, and publish it through TestFlight. Then, you can do OTA
updates to that app, over a channel.

Now we need to install our codebase with all dependencies to the project.

First, install all JS dependencies and dev dependencies, without native linking.
Then, add the codebase and link it to your index file. Try to run it. You'll
probably get a red screen because you didn't install all native dependencies.

Now you can do two things.

 1. Try to comment out all native things. Now the app will work, and you should
    replace most native things with expo counterparts.
    
    
 2. Try to add all native dependencies with
    
    

yarn add {dep1} {dep2} {depN}
react-native link


And any optional native setup required for every native dependency.

Run using XCode

To make sure it really succeeded on all fronts, try to run the app over XCode:

 * open the iOS folder in your app, and add your team.
 * try to build the app from XCode

If this works, we can use the whole Expo library and use over the air updates.
GREAT!