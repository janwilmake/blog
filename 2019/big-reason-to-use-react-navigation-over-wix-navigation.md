---
date: 2019-01-10
modified_at: 2019-01-10
tags: [react-native, programming, coding]
---

# Big reason to use React navigation over Wix navigation

Today I discovered a really big reason why React navigation is fundamentally
better than Wix navigation. React navigation has functions
createBottomTabNavigator/createStackNavigator, etc. which return a component.
However, Wix navigation just has registerComponent, which take the screen you
want to render (with a wrapper around it, if you want it) and just returns a
void and creates this screen natively.
The problem with the latter is that, if you use a wrapper around your screen,
this wrapper will be mounted for every screen that is registered. For our app
this meant that our LocalAuthWrapper was also mounted 5 times on app start,
because we had an app with 5 tabs, and it mounts all tabs. Therefore, the dialog
to authorize with local auth mounted 5 times, which is 4 times too many. Because
of how this library works, it didn't function anytime after the first time, and
therefore we had to make native changes to this library.

I think it's kind of ugly that our wrapper gets mounted every single time a new
screen loads... Also less efficient. With react navigation, you don't have this
problem, because you can wrap your wrapper around the whole of the navigation,
because navigation is a component too.

This fundamental difference should not be overseen! It can be very important.