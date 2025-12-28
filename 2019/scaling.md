---
date: 2019-01-11
modified_at: 2019-01-29
tags: [programming, startup, devops]
---

# Scaling Horizontally to one million RPS

This Forbes Article
https://www.forbes.com/sites/reuvencohen/2013/11/26/google-shows-how-to-scale-apps-from-zero-to-one-million-requests-per-second-for-10/#7de604137ad9 
and its Original Post
https://cloudplatform.googleblog.com/2013/11/compute-engine-load-balancing-hits-1-million-requests-per-second.html 
describe how a guy managed to hit 1Million RPS for a while with one load
balancer and 10$. This post also contains a gist to reproduce the experiments,
which is pretty cool. This Facebook blog
https://www.facebook.com/notes/facebook-engineering/scaling-facebook-to-500-million-users-and-beyond/409881258919/ 
shows how they scaled up to 500 million users in 2010. In this article
http://highscalability.com/blog/2010/11/4/facebook-at-13-million-queries-per-second-recommends-minimiz.html
, which is also from 2010, Facebook gives an insight about their statistics and
scaling strategies. Stories like these excite me to think about future scaling
of Communify https://communify.cc/. With 500 Million users, Facebook had 13M
requests per second. Now, with 4 billion users, they probably handle ±100M
requests per second. I wonder how proper scaling could end up there.

My Geo Scaling Plan: scaling without bottlenecks
Since we have global communities now, it's pretty much impossible to get one
user's data from one server. Therefore, the load balancer may need to have an
overview of which communities are housed where. Then, the load balancer can send
the query to the right server, based on the request.

If this wasn't the case, it would be easy, like described in my previous
article
about geo-scaling
https://medium.com/leckr-react-native-graphql-apollo-tutorials/the-benefits-and-drawbacks-of-decentralised-geo-scaling-thinking-of-2019-and-beyond-infinite-9faa5ad465c8
. But now that we have global communities too, we have a few tricks to do. This
is what I came up with:

 * PULL automatically pull my GitHub repo everywhere whenever a new commit is
   pushed. pull, restart pm2, and automatically merge db changes to the db.
   
   
 * SPLIT automatically split a server into 2 servers whenever load is too high.
   Shard on community. The server is split in two, so there should be drawn a
   line on a map (cluster by location) so that the total members are split in
   two, based on location. There is an edge case in which an user is member of a
   community in both clusters. In this case, put the user on both servers. This
   is no big deal. The new server should then let the load balancer know it
   exists, and expose its communities.
   
   
 * MERGE automatically merge a server with another server whenever load is too
   low. Because we merge servers, we can't use incremental ID's, but need a UUID
   or GUID to keep table-rows unique. Since the sharding/splitting was done on
   communities, we can just merge all rows in all tables together. But because
   users may be in both clusters, there can be double users. If this happens,
   pick the user that's last updated, because that's where the user was active
   last. The deleted server should let the load balancer know it got deleted, so
   it will be deleted from the global server list.
   
   
 * BALANCE put a load balancer in front of all of it that directs every request
   to the right server, based on communityid. it knows which server has which
   communities because every server exposes their communities by 
   communities(){id} and we know every server, so, every minute or so, we can
   look up all community-id's from all servers. This is pretty light. However,
   this can also be done the other way around. When a community gets created or
   removed, or when a server splits up or merges, the load balancer gets
   notified with the new composition. This would be instant and way cheaper.
   
   

Double Models
Models that can be sharded based on community, and thus just need to live on one
server, and have just one copy: Posts, Subs, Roles, Communities, Channels.

Models with some problems: Users, CommunitySubs, Locations

A user can be subbed to two communities that live on different servers at the
same time. There are a few possibilities to deal with this:

 1. Copy/paste When a user updates the current community to a community on a
    different server, copy that user, together with all of its CommunitySubs and
    Locations to the new server. This will, then, be the single server that user
    gets its data from. CommunitySubs get notification increments by mutation
    calls (that increment) from other servers where the user still exists. When
    a user changes community, all servers should be notified, so that if a
    server knows about a user, it also knows in which community that user is...
    This can get heavy, but it doesn't happen that often. A side effect of this
    strategy is that users, communitysubs and locations can get outdated on
    servers on which the user isn't active. However, all servers that need to
    know, know on which server a user currently lives, all servers can get
    updates about that user to stay updated. For example, every hour, or every
    day. I don't know how much will be useful. In principle, a user doesn't
    change much for another community if it's not active in that community.
    
    
 2. Global, seperate database for users, community and locations This can be
    nice because its a single source of truth with is always up to date.
    However, the drawback is having multiple servers the app has to connect to,
    and there is one global server, which is bad for availability (risk) and
    can't scale infinitely.
    
    

I think this is where I have to choose from, and I think option one is the best.
I still have to discuss this with an expert. I'm quite impressed with this idea,
because my app can scale infinitely big without bottlenecks based on a few
assumptions, which my design of the app can guarantee:

 1. It doesn't get bigger than one loadbalancer can handle (around 1M rps)
 2. A single community never has to be sharded

This whole architecture is, I think, very interesting and would also work for my
[Chat-BaaS idea](/2019/chat-baas).

From 1M to 100M RPS.
100 M RPS, 4.000 M users, and ±40 M communities, ±20.000 servers.. That's the
dream!

On a single server that's balanced well, I don't think any problems will arise.
The only problem is that, when a user changes community, all servers that know
this user should know this, so the server has to send 20.000 requests! Right?
Well it does. Unless it knows on which server all other communities the user is
subbed to are hosted. And the load balancers know this, right? So let's ask a
load-balancer, and then just let the servers know that care! Great! Problem
solved.

The other thing is, we have to balance the traffic with load balancers. One load
balancer doesn't cut it anymore. 100 times as many RPS should mean 100 times as
many load balancers, but because we have some extra work for the load balancers
(telling servers which communities are hosted where), I think 1000 load
balancers would be better, just to be sure. With 40M communities, is it still
doable to let all load balancers know which communities are hosted where?

 * If yes, the problem gets easy. Just have one 'Master Load Balancer' that
   assigns any new visitor to one of the 1000 Load Balancers, and keeps it
   there. From there, the visitor knows where to go, because every Load balancer
   knows everything. Searching from ±40M rows of communities could be doable,
   but the bottleneck is probably that, on every user changing community (that
   is on a different server), every Load Balancer gets notified. The question
   is: How many times per second does this happen with 4 Billion users? If this
   is more often than ±5.000, the bottleneck is too small, and it won't fit. We
   have to find another solution.
   
   
 * If no, it gets complicated. Splitting the communities over all load balancers
   may be an option, but it's a complicated mess that I would have to think
   through. Let's save that for another time!