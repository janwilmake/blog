---
date: 2019-03-08
modified_at: 2020-05-30
tags: [react-native, programming, coding, dx]
description: Introducing Redux Light, a minimal boilerplate approach to Redux that prioritizes composition over inheritance and faster time to context while maintaining clarity.
---

# Redux Light and Universal endpoints

Redux adds a lot of layers and boilerplate, which increases time-to-context.
Here are the pro's and cons of Redux in my opinion. In this post, I'm showing
the form of Redux (and GraphQL/REST) I like the most: Redux Light, I'm calling
it. Here are my considerations before I decide which to use.

ReduxRedux LightSeperation of Redux and your component.
Your component doesn't know anything about Redux.You create inheritance and
layers.
This makes time to context rather slowFaster time to context. Composition over
inheritanceLots of boilerplate. MapStateToProps, MapDispatchToProps,
and even ActionCreators. Lots. Of. Boiler. Plate.Minimal boilerplate, and still
clear what you're doing.No overhead. Your components only sees what it needs
There's some overhead, but this doesn't matter a lot for efficiencyCode sample
Redux vs. Redux Light
Coming soon


Universal Data Principle
You can have a very specific and exact way of bringing data to your app, but you
can also distribute certain data universally throughout your app. The latter has
a big advantage: a clear convention of data structure, and boilerplate
reduction. The only problem is overhead of data in your screens.