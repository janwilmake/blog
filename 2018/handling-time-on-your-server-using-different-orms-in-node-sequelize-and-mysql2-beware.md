---
date: 2018-02-04
modified_at: 2018-02-04
tags: [nodejs, sequelize, programming, devops, coding]
description: A technical deep-dive into timezone handling issues when using Sequelize vs mysql2 in Node.js, exploring how different ORMs process timestamps differently and cause validation problems.
---

# Handling time on your server, using different ORM's in node: Sequelize and mysql2. Beware!

> Disclaimer: This is my first post about code ever. Any advice/tips are hugely
appreciated and it's probably irrelevant and incoherent for most users, however,
I was writing this down to better understand the problem myself so I might as
well share it. If you don't like it or don't agree, let me know!


Time has multiple sources, solving strange time processing problems when using
different ORM's.

Before I calculate and compare times, I should make sure that sources are
aligned!
Otherwise the comparisons aren't right.
I always find it hard to reason about time.
Time is a very abstract concept to me, and it gets even more abstract when
adding timezones and stuff.
So in this post I try to reason about time, because I had a problem.

I made a time comparison between a db-value that got sent to the client and
processed there, and the same db-value, processed the same way, on the server.
Somehow, the processed versions of that timestamp were not the same! How could
it be?

As a very general start, I want to be clear about all possible sources from
time.
I am currently aware of the following possible sources:

A - Local time of the user (set in the user phone settings)
B - Server time, as requested by node
C - Server time, as requested by a MySQL Query
D - Server time, as requested (on the client side, from the server) by GraphQL
and then handled in React Native

What    How                             

A       Date.now()                
        New Date(Date.now())      

B       Date.now()
        New Date(Date.now())

C1       query('SELECT timeProperty FROM 
         table;').then(obj => obj.timeProperty)

 2       UPDATE table SET timeProperty = NOW();
    
D       data.timeProperty


Some background of my problem: My algorithm that got some trouble:
The problem was just facing, is that I use time functions to validate a request
to be a valid one. For a request to be valid, it has to contain this hash that's
using a secret that is the same on the client and the server. I create this hash
by encrypting a string containing a secret and a timestamp on the client. The
timestamp on the client is gotten from the server just like option C1. Then,
once the hash is sent to the server, the server creates a hash, based on the
same database property value, using the same secret. The hashes are then
compared to eachother. If they are the same, the request is valid because nobody
knows the secret, except for the client (the app) and the server. If you don't
know the secret, you can't make a valid request.

There are a few components in this formula.

 * One is the hashing algorithm. I'm using sha256, which is v0.9, which is
   working the same on the client and the server.
 * The second is the secret. It's a simple string, which is the same on the
   client and the server.
 * The last one is the timestamp. It has the same source, but it is processed in
   a different way. It seems to be problematic because once they are compared
   they are not the same anymore.

hash = sha256(secret + date);

How do they get processed?
On the server, it's simple. Just query it from the database. However, in my case
it's not that simple, because it can be done in two different ways: Using
Sequelize, or using MySQL2 to perform the query. I am using two different ORM's
on the server! And that was the problem! I used mysql2 in the resolver used to
get the time on the client, while I used Sequelize to validate it on the server.
And the results are different!

This is an example taken at 12:15 today in Berlin.

I performed the query UPDATE users SET actionAt=NOW();
Then looked at what I would get when I queried actionAt.
user is requested using Sequelize, while user2 is requested using the mysql2
library.

user.actionAt: Sun Feb 04 2018 13:15:29 GMT+0100 (CET)
user2.actionAt: Sun Feb 04 2018 12:15:29 GMT+0100 (CET)


Strangely enough, sequelize got it wrong!
Looking at GitHub, I found this is said by a maintainer of Sequelize:

"Your diagnosis of the problem is correct - the problem is exactly that sequelize converts the date to UTC, but when its returned, node-pg converts it into a date in the local timezone of the machine. I'm going to fix this in #4186, which allows for a more abstract way to hook into the parsing system than playing around with pg-types"


So it's probably converted to UTC time and then it's assumed to still be
GMT+0100 while not having that. That's why the time goes up by one hour when
using sequelize.

If I perform the same thing on the remote server (which sits in the London
timezone), I get this output (when I'm in Berlin at GMT+0100):

user.actionAt: Sun Feb 04 2018 11:46:23 GMT+0000 (UTC)
user2.actionAt: Sun Feb 04 2018 11:46:58 GMT+0000 (UTC)


Now there is no problem because the assumption of the date being in UTC format
is correct because the server is in London! Here is some background information
on what Sequelize does with its time: 
https://github.com/sequelize/sequelize/issues/854

My fix and opinion
To fix this when the assumption IS indeed incorrect, Sequelize advices me to set
the timezone to the correct one when defining the sequelize connection. However,
I don't want to do this! Because my timezone on the local server is different
from my timezone on the remote server, and whenever I change my server to
another server somewhere else, it will be the incorrect timezone and I'd have to
change the script again! Using mysql2 directly, this is all not needed.

After using mysql2 in both cases, the problem was solved!

Lessons Learned: ORM's only make things more complicated! In the case of
Sequelize, it generates flexibility but also adds another layer of complexity to
your data! Avoid it if it doesn't give you a clear advantage, or you may have to
add extra boilerplate to get your data right!