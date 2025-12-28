---
date: 2019-01-30
modified_at: 2019-01-30
tags: [programming, devops]
---

# About scaling horizontally without sharding: How many RPS are possible without sharding? Is this between-step worth it?

Sharding is hard and creates much room for risks and mistakes.

Therefore, it could be smart to delay this as long as possible.

There could be one dedicated MySQL Server as single DB, and a number of nodes
connected to it with a load balancer in front. This is relatively easy to set
up.

If we do this, the bottleneck becomes the amount of raw MySQL queries the DB
server can handle. My estimate is that this could be about 50k qps on a single
server, but could be more if we start using an in-memory DB like Redis. This
means that 5 vertically scaled Node JS nodes could process a total of ±50k RPS.

Because there is only a factor 5 theoretical room for improvement, I think this
step will be too much work compared to the profit.

Unless we really need a bigger database because we don't want to shard cities or
countries, for example, this will probably not be worth it.

Therefore, I think scaling horizontally WITH sharding [/scaling] will be the
next step, directly after I max out the possibility of vertical scaling
[/scaling-vertically]