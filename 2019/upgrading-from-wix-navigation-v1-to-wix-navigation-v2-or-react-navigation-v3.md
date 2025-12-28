---
date: 2019-02-13
modified_at: 2019-03-10
tags: [react-native, programming, coding]
---

# Upgrading from Wix Navigation v1 to Wix Navigation v2, or React Navigation v3?

In the past year that we've worked on an app at our company we've used Wix React
Native Navigation V1 (WN1). It has worked well enough to use it, but over time,
we've discovered many quirks and problems. Since v2 improved a lot of things,
but not all, we now have a tough choice: should we refactor everything to use
Wix RN Navigation v2 (WN2), or should we totally refactor to a different
navigation: React Navigation v3 (RN3)?

Problems with WN1:
 * It's not possible to wrap a single mounted component around screens React
   navigation has functions createBottomTabNavigator / createStackNavigator,
   etc. which return a component. However, Wix navigation just has
   registerComponent, which take the screen you want to render (with a wrapper
   around it, if you want it) and just returns a void and creates this screen
   natively. The problem with the latter is that, if you use a wrapper around
   your screen, this wrapper will be mounted for every screen that is
   registered. For our app this meant that our LocalAuthWrapper was also mounted
   5 times on app start, because we had an app with 5 tabs, and it mounts all
   tabs. Therefore, the dialog to authorize with local auth mounted 5 times,
   which is 4 times too many. Because of how this library works, it didn't
   function anytime after the first time, and therefore we had to make native
   changes to this library.
   
   
 * You can't prevent that users navigate to a screen multiple times: If a user
   clicks on a navigation button very quickly multiple times, the WN1 will
   navigate to that screen multiple times and thus open/mount the screen
   multiple times. Then, when going back, they all got added to the stack and
   you have to go back multiple times too.
   
   
 * Android Back Button Behavior Sometimes we want to prevent opening a screen in
   the stack from multiple tabs because it may have different states and data
   based on user input, so we made sure a screen is always opened from the same
   tab, so sometimes, before opening a screen, the user is navigated to a
   different tab first. When going back with the android back button (or the
   header back button) this back behavior has to be programmed differently. The
   transition back to the tab you came from is slow in WN1. It's not possible to
   pop back 2 screens, for example, or pop back and switch the tab at once.
   
   
 * Header back button possibilities It's not possible to add a text to an icon
   on the left of the navigation header on Android. On iOS, this is no problem.
   
   

What does WN2 Solve?
 * Navigating multiple times (source?)
 * Android Back Button Behavior (see this
   [https://github.com/wix/react-native-navigation/blob/master/docs/docs/screen-api.md]
   , v2 has popTo)

What does RN3 Solve?
 * Navigating multiple times (see this
   [https://reactnavigation.org/blog/2018/05/07/react-navigation-2.0.html#navigateroutename-in-stacknavigator-is-less-pushy] 
   )
 * Wrapping once-mounted components around multiple screens
 * Android Back Button Behavior
 * Header back button possibilities (RN3 is way more flexible
   [https://reactnavigation.org/docs/en/header-buttons.html#docsNav] in header
   capabilities)

All in all, read this [https://reactnavigation.org/docs/en/pitch.html] for
advantages and disadvantages of RN3.

What are the function calls we do now for navigation?
 * withNavigation hoc giving several functions to screens: goto, resetTo,
   dismiss, modal, pop
 * registering all screens
 * backHandler logic in some screens
 * navigatorStyle static in some screens to determine navBarStyle and wether or
   not to show the tabBar
 * navigator.setButtons to set leftButtons, rightButtons, etc.

How much work is it to refactor to WN2?
As can be seen in the Wix documentation
[https://wix.github.io/react-native-navigation/#/docs/top-level-api-migration] 
it's not a lot of work to migrate from v1 to v2. This guide
[https://medium.com/wix-engineering/react-native-navigation-v2-is-here-5b7c87f002a] 
could also be useful.

How much work is it to refactor to RN3?
 * still keep the withNavigation hoc, call different library functions of RN3
   instead of WN1 inside it. This means we don't need to change all navigation
   props in all screens, which saves a lot of work.
 * registering screens is totally different. The whole stack and tabs are built
   up in a different way. This also manages hiding the tabbar and style, which
   is more convenient.
 * setButtons should be replaced by navigationOptions. Can be done when building
   the screen or on the screen itself, but it's a different syntax which has to
   be changed in all screens with buttons, which can be quite some work.

Refactoring
We have to discuss what would be the best roadmap now. If we choose to go to WN2
first, it's probably not a lot of work and we can do it in a single branch.
However, if we choose to refactor to RN3, we'd have to do quite some work, so
it'd be better to do it in steps so we can merge it in steps to keep the branch
changes small and keep the whole codebase working between steps. This will
minimize merge conflicts.