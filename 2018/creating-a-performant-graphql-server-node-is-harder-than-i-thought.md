---
date: 2018-03-06
modified_at: 2018-03-06
tags: [graphql, nodejs, programming, devops, sequelize, performance]
description: An exploration of performance optimization strategies for GraphQL servers built with Node.js, covering benchmarking, database pooling, Dataloader, and production deployment techniques.
---

# Creating a performant GraphQL Server - node is harder than I thought!

> This article is part of a series on building an MVP of a Data-driven
cross-platform app with the following stack: React Native, Apollo GraphQL, and
on the backend Node JS with Express and a MySQL Database.


> This is still a work in progress, and it's not finished at all. I just put it
out there to get feedback already. Don't hestitate to ask me anything.


Hello there! This is the second part of my GraphQL Backend tutorial. Creating a
GraphQL Backend is easier said than done. That’s why loads of people use 
GraphCool https://www.graph.cool/ nowadays. But if your product isn’t
profitable from the beginning and you’re trying to bootstrap your MVP (or maybe
it’s just a side project) then GraphCool may not prove to be viable! That’s why
I’m looking for the perfect way to build your own GraphQL Server from the ground
up.

In the previous part, I explained the following:

 * I: How to set up a GraphQL Server Locally
 * II: How to spin up an Ubuntu server on Linode for 5$/month and run it on
   there
 * III: How to access the server from an SSL secured connection, behind a Secure
   Firewall, for free?

In this tutorial I will explain some crucial ways to increase performance to a
production ready level to make your backend ready for scale.

In this post I will assume that you’ve followed Part I and II, and you’re able
to access your GraphQL server over GraphiQL in the browser. If you’re trying to
improve your performance of your already existing GraphQL Server, this may also
proof to be useful.

Firstly we’re going to try to use Artillery to do a benchmark of common queries
of your server to test the current performance under high load.

 1. Improve node settings NODE_ENV=production & pm2
 2. Improve resolving: SQLite + Pooling, MySQL with Sequelize, Sequelize with
    query, mysql2 with execute, Dataloader
 3. Improve problem that arises with Engine: big queries. Link to other medium
    article: 
    https://dev-blog.apollodata.com/persisted-graphql-queries-with-apollo-client-119fd7e6bba5
 4. Run in pm2 clustermode with more CPU's

Encountered problems, learned things:
 * no sync api allowed on resolvers
 * not do CPU intensive work within the front facing Node.js instances - the
   ones clients connect to concurrently[1]

[1] = https://www.toptal.com/nodejs/top-10-common-nodejs-developer-mistakes