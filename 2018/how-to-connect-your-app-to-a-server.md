---
date: 2018-03-06
modified_at: 2018-03-06
tags: [react-native, graphql, apollo, nodejs, devops, programming]
description: Technical considerations for connecting React Native apps to servers, covering SSL requirements, CloudFlare configuration, error handling, and connection testing strategies.
---

# How to connect your app to a server?

> This article is part of a series on building an MVP of a Data-driven
cross-platform app with the following stack: React Native, Apollo GraphQL, and
on the backend Node JS with Express and a MySQL Database.


The server can be accessed locally over localhost, locally over the local IP, or
remotely. Remotely it can be accessed directly by IP over HTTP or SSL
connection. It can also go through CloudFlare to mitigate any DDOS attacks.

 1. SSL Needed: the problem seems to be that a lot of wifi networks nowadays
    require an HTTPS SSL connection, especially without a browser. iOS also
    needs a https connection if you want to publish your app in their store or
    in TestFlight.
    
    
 2. CloudFlare needs browser: CloudFlare seems to be pretty browser-oriented, so
    without the right settings, your API sometimes will run into trouble!
    CloudFlare sometimes prevents DDoS attacks and malicious users by captcha's
    and stuff like that. This doesn't work well on API's because you can't see
    the captcha without a browser! Nonetheless I am using CloudFlare, but I had
    to change some settings (see CloudFlare-->Firewall) in order for these
    capchas not to 'appear'. Seems that there, all requests from certain
    countries (e.g. China, Russia and Indonesia) get a challenge captcha before
    access BY DEFAULT, and this is enforced even after setting page rules. So if
    you're planning to release your app to some of these countries make sure to
    change these settings.
    
    

In the end, it should automatically connect on any device, and on any network.
Also it should show a proper error or way to solve problems if it cannot
connect.

Error Handling:
 1. Show that you’re offline if you’re offline according to NetInfo
    https://facebook.github.io/react-native/docs/netinfo.html. You can also
    use something like the ConnectivityRenderer from react-native-offline
    https://github.com/rauliyohmc/react-native-offline but I ended up using
    none of them. ConnectivityRenderer seemd to have a false positive on some
    slow edgy cellular networks.
    
    
 2. request to open the browser if SSL connection cannot be established within
    ±5 seconds, for example if you have to login into wifi.
    React-native-offline provides a fetch with a timeout (which originally isn’t
    part of fetch)
    Use this and fetch both google.com and your own server endpoint before
    loading { version } somehow. If google is offline, you have no right
    connection. If Your own server is offline, then the server is probably
    offline. If they both work, try to connect. Of course this could be done
    synchronously.
    
    

I didn't implement this myself yet, but it's good because it's pretty common
that you need to go to the browser to login into a wifi-network or something,
and (expo) apps don't have this functionality (yet) by default.

 3. If the server doesn’t respond, show that server is busy or offline. It's
    always good to show the user what's going on.

To make sure you have everything set up correctly, the connection should work
everywhere, so do test it everywhere too!

Test:

 * locally, android emulator
   
   
 * locally, iOS simulator
   
   
 * locally, android device
   
   
 * locally, iOS device
   
   
 * server, android emulator
   
   
 * server, iOS simulator
   
   
 * server, android device
   
   
 * server, iOS device
   
   

Best practices for securing an API.
This is useful information and there is way more info on this of course.
However, this is premature optimization. Let's do this once I have a succesful
product out there.

https://medium.com/@gajus/protecting-apis-from-the-ddos-attacks-by-signing-the-pks-c1eca7cc7725
https://www.incapsula.com/blog/best-practices-for-securing-your-api.html