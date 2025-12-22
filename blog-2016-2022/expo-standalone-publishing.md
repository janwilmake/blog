---
date: 2018-03-31
modified_at: 2019-03-09
---

# Publishing your expo app to both app stores

Publishing your expo app to both app stores can be an exhausting and scary
process with many unknowns if you do it for the first time. To make it a little
bit easier, here is my guide! Don't make the same mistakes I made and keep
making over and over again! Keep this guide by your side.

This guide assumes you just created an app using Expo and want to release it to
the Google Play store and Apple Appstore.

1) Setup initial App.json settings:
 * Add reverse DNS value (com.companyname.appslug) to ios.bundleIdentifier and
   android.package
   
   
 * iOS: App Icon 1024 x 1024 non-transparent —> put in assets/icon.png
   
   
 * Don’t forget name, description, slug, splash
   
   
 * Add notification settings:
   
   

"notification": { "icon": "./assets/notifications_icon.png", "color": "#000000",
"androidMode": "collapse", "androidCollapsedTitle": "#{unread_notifications} new
notifications" },

app.json:

App.json should be configured properly. Read more here
[https://docs.expo.io/versions/latest/workflow/configuration/#__next]
Make sure to set the right permissions under the android key! Otherwise expo
will define defaults which are a lot of permissions. Your APK's package name
must be in the following format "com.example.myapp". It may contain letters
(a-z), numbers and underscores (_). It must start with a lowercase letter. It
must be 150 characters or fewer.

2) Create an initial build
exp start —> exp build:android —> wait 2-5 minutes —> exp url:apk

exp start —> exp build:ios —> wait 2-5 minutes —> exp url:ipa

NB: since exp v50 you can automate this with a script because it will wait until
the build is finished. use something like this to download the file from the URL
you get from exp url:ipa/apk: P.s. I haven't tested this yet! Let me know if it
works.
standalonedir="/Users/progenworks/2018 code/Communify/standalone/" && exp start
&& exp build:ios && urlios = "exp url:ipa" && wget -O $standalonedir "$urlios"
&& exp build:android && urlandroid = "exp url:apk" && wget -O $standalonedir
"$urlandroid"

NB: Don’t put files in expo folder, not even under assets, or build will fail!

NB: I let expo handle certificates for the time being, but it's questionable
whether this a good idea when your app starts to make money, because they kind
of own the app, right? It saves a lot of time though, but I become completely
dependent on their online services because I can’t update the app version
without a certificate.
Also, once you want more functionality in your app like payments, you will have
to detach, so then you can't let expo do the certificates anymore. You'll have
to do it yourself!

More Info here [https://developer.android.com/studio/publish/app-signing.html] 
and here [https://calvium.com/how-to-make-a-p12-file/]

3) Having the right credentials set up
Make sure to go through these steps before you upload your build to the Google
Play Console or to TestFlight. Every time you forget something, you'll end up
having to rebuild and wait so long that your teeth fall out.

 * Android: up the version number
 * iOS: up the version number
 * icon without tranparency and without alpha channels (use
   alpha-channel-remover to remove alpha-channels from png)

Install Google and Maps if you need it:

https://docs.expo.io/versions/latest/sdk/google.html
https://docs.expo.io/versions/latest/sdk/map-view.html

4) Get All The Files
Creating Screenshots

 * Apple: The exact resolution matters. Create screenshots from iOS Simulator
   (turn off debug->optimize rendering for window scale and use 5.5" iPhone
   (iPhone X is optional). Also make a screenshot on the 12.9" iPad.
 * From Android simulator: The exact resolution doesn't matter.

You also need these files:

 1. Hi-res icon 512 x 512 32-bit PNG (with alpha) for Android. This is the
    Android app icon.
 2. Feature graphic 1024 w x 500 h JPG or 24-bit PNG (no alpha) for android
 3. Link to Privacy policy

5) Build again
exp start
exp build:android
download apk from resulting url
exp build:ios
download ipa from resulting url

6) [Optional] Check if builds were successful
For Android:

Drag and drop the .apk into your Android emulator to see if the build was
successful.

To run it on your Android device, make sure you have the Android platform tools
installed along with adb, then just run adb install app-filename.apk with your
device plugged in.

For iOS:

To run it on your iOS Simulator, first build your expo project with the
simulator flag by running exp build:ios -t simulator, then download the tarball
with the link given upon completion when running exp build:status. Unpack the
tar.gz by running tar -xvzf your-app.tar.gz. Then you can run it by starting an
iOS Simulator instance, then running xcrun simctl install booted and xcrun
simctl launch booted . Another alternative which some people prefer is to
install the ios-sim tool and then use ios-sim launch .

7) Upload your standalone builds:
Android Developer Console
Go Here [https://play.google.com/apps/publish/]

TestFlight to test app for iOS
 1. Add new app in iTunes connect
 2. Open xCode —> dev tools —> application loader —> select & upload IPA —> Wait
    15 minutes.
 3. It can now be added to iTunes connect. In the meantime, descriptions can be
    filled in, and screenshots etc. can be uploaded.

8) Fill in all details for Android and iOS
It's pretty straightforward, so no need to explain everything. But here are some
things that were not so straightforward.

Check this on the Apple submission form because of Segment:

 1. “Attribute this app installation to a previously served advertisement”
 2. “Attribute an action taken within this app to a previously served
    advertisement”
 3. “I, YOUR_NAME, confirm that this app, and any third party…”

Fill in everything in iTunes Connect and wait 1-2 days for manual review.

Make sure to add login credentials! Create some fake google or facebook account
and provide these as login credentials (or create an account on your platform
for them if you also support normal sign up)

9) Updates?
There are only a couple reasons why you might want to rebuild and resubmit the
native binaries:

 * If you want to change native metadata like the app’s name or icon.
 * If you upgrade to a newer sdkVersion of your app (new React Native version,
   which requires new native code)
   If you do this, also update the binary’s versionCode and buildNumber in
   app.json

Good to know: Updates are handled differently on iOS and Android. On Android,
updates are downloaded in the background. This means that the first time a user
opens your app after an update they will get the old version while the new
version is downloaded in the background. The second time they open the app
they’ll get the new version. On iOS, updates are downloaded synchronously, so
users will get the new version the first time they open your app after an
update.

——

Future additions:
These are some things I'd still like to explore myself:

 * Production optimizations
 * App size: can I make it smaller?
 * How to make the app work offline
 * Permissions: can I change them to necessary only?