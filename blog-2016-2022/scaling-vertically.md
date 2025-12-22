---
date: 2019-01-29
modified_at: 2019-01-30
---

# Scaling my Node JS GraphQL Server Vertically to 5k RPS on a single machine

Intro
When you're building an MVP, it's good to be prepared for a little bit of
traffic. My app Communify [https://communify.cc] uses about 0.5 requests per
second per user that's using the app.

At some point, the app may go viral and attract an enormous amount of new users.
In such an event, we want those new users to actually sign up, and get their
emails! We don't want them to encounter an app that's offline. Never. Because of
this, I need a way to quickly scale with very little effort.

Many people choose to start setting up a whole complex architecture. DB Servers,
front-facing nodes, load balancers and horizontal scaling. Although I've 
thought
about this [/scaling], I think the first step for any startup should be vertical
scaling, as it will save you a lot of time and effort in the first stages, and
you probably don't need horizontal scaling in the beginning.

Vertical scaling is a lot easier, especially with cloud hosting where you can
resize your node within a couple of minutes, or even do it with an API. Good
providers for cloud hosting are linode [https://linode.com] and Digital Ocean
[https://digitalocean.com].

Setup
I was inspired by this article
[https://medium.com/graphile/how-i-made-postgraphile-faster-than-prisma-graphql-server-in-8-hours-e66b4c511160]
; 1000 rps on a 500MB RAM 1cpu free tier server of Heroku was achieved. This is
with PostGraphile, which has high performance
[https://www.graphile.org/postgraphile/performance/]. I don't know if the Heroku
CPU's are just that fast, or the PostGraphile performance is so much faster, or
their queries where much lighter, but I can't use Heroku because it doesn't
scale for free, it just has a single cpu free tier.

Recently, Digital Ocean introduced CPU-optimized droplets, which have much
faster CPUs. This is what we need! This comparison
[https://blog.digitalocean.com/a-practical-droplet-performance-comparison/] 
shows that 2 optimized CPU's are faster than 4 non-optimized ones on Digital
Ocean. A big difference. What's also great, is that CPU-optimized droplets
pricing increases linearly with its amount of CPU's, as opposed to the normal
counterparts, which double in price a few times. See pricing here
[https://www.digitalocean.com/pricing/]

Testing
It's rather easy to test load with tools like artillery [https://artillery.io] 
or loadtest [https://www.npmjs.com/package/loadtest]. Artillery is hard to
load-test if you want to send many requests (>600), but using this
[https://zetalab.de/blog/running-artillery-multicore/] you can test on multi
cores. Loadtest is more efficient, and easily gets up to 3000 rps, so I
recommend that, if possible.

This command sends 2000 rps to an url:

loadtest -c 1 --rps 2000 {url}

I use raw GraphQL with Sequelize and MySQL. I can't imagine this to be much
slower than the setup in the experiment
[https://medium.com/graphile/how-i-made-postgraphile-faster-than-prisma-graphql-server-in-8-hours-e66b4c511160]
, but it somehow is on my current setup. I ran it twice on a 2GB 1vCPU linode
machine on a GraphQL query that returns ±50 rows of json from a MySQL database.

 * I got 200rps on the first test.
 * The same evening I tested again, and I got 100% CPU usage with just 80 rps

Only 25% of all available memory is used (±500MB). My bottleneck is definitely
CPU use, and I can do 80-200 rps on a single non-optimized vCPU.

If CPU-optimized droplets on DigitalOcean are 2x as fast per CPU, and I can
scale vertically up to 32 vCPU's, that would theoretically mean that the server
could handle a factor 64 more RPS if I move to a 32vCPU 64GB RAM CPU-Optimized
DigitalOcean Droplet of 640$/month (which is less than a dollar an hour). That
would mean anywhere between 5120 and 12800 RPS on a single machine. Let's give
it a try and see if we can really get this kind of performance!

RESULTS COMING SOON

Conclusion:
My app functions on a single machine and can handle 5k+ RPS. Since it needs 0.5
RPS per user to function, I can handle 10k+ users using the app at the same
time. If I ever make this, I probably already earn enough to pay for a
professional DevOps engineer, so I don't have to learn how to scale horizontally
and setup a whole architecture!

I also added a small trick to my app to make sure my server doesn't go down at
high load [/never-go-down]. Using this trick, my app can handle about 200k
simultaneous users using the app without the server to go down. Amazing!

Do you need more users? Consider Horizontal Scaling [/scaling], but beware, it
is a lot more complex and requires much more work.

More questions
High availability or backups?
High availability would be cool (to have 2 identical synchronously running
servers) but it would cost 2x as much and would be mostly unnecessary. We don't
require that kind of quality. Since not a lot of downtime is expected, backups
would be good enough. A daily DB backup would be fine. This should be dumped to
an external location. Maybe S3 can do this? YES
[https://dzone.com/articles/using-aws-s3-for-database-backup-storage]

Profiling and minimizing CPU load
Profiling could be done to measure where the biggest CPU load comes from. Then,
it may be possible
[https://medium.com/@tarkus/how-to-call-c-c-code-from-node-js-86a773033892] to
transfer this load to C++ code and calculate it using this language because it
seems this can be much faster. For example, a GraphQL Parser in C++? Could make
a big difference. There may also be more optimizations that can be done. For
sure I have to make sure that there are no blocking events going on that block
the event loop. This is disastrous for RPS.

Isn't a single machine a single point of failure? That's bad.
A single node is a single point of failure. I read that everywhere. It's true.
But what if it just never fails? That would solve this 'problem'. If it fails
horribly, and I can't even restart it (it's really broken) then I probably get
support from the DO team within hours. But if I want to be back in minutes, I
should be able to quickly spin up a similar setup and run from a backup. On the
front-end, there should be a second endpoint that's tried if the first endpoint
is not reached. If this happens, the whole spinning up of the second endpoint
could be automated. If this is done, it's still true that there's a single point
of value, but it hardly matters as I can spawn a backup within an hour. Let's
say the server goes down once a month, that means 99,85% uptime, which is
acceptable.

Isn't vertical scaling much more expensive?
I thought so to, and at first it may seem that way, but in recent years many
things have changed. Since the availability of CPU-optimized nodes, the price
difference isn't that big. Let's assume we could also scale horizontally
including databases, sharding everything across all servers (like I proposed in 
this article [/scaling]); if we do this, we can get ±100rps on a single cpu of
5$. Since CPU-optimized nodes are twice as fast per CPU, the 640$ 32vCPU machine
is capable of 64x as many RPS, while it's about 128 times as expensive. That
means that per RPS, it's about 2x as expensive as horizontal scaling. If we also
assume we need a DevOps Engineer to do the horizontal scaling, which would cost
5000$ a month, this will become a viable choice way after we hit the max of
vertical scaling!

But wait! There's also day and night. With horizontal scaling, you can turn off
a big part of your CDN because at night there are almost no users. This could
theoretically save you about 50% of the costs if you do it well. However, with
vertical scaling this isn't an option since if we do this, we need to resize the
node at least twice a day which would mean at least 30 minutes downtime every
day. Because this is not acceptable, we can't scale up and down at day and
night. What we could do is turn the app off at night if we are sure users don't
use it at that time, but this is not something I'm planning to do. This means
that vertical scaling is another 2x as expensive since it doesn't have the
advantage of being able to scale up and down througout the day.

In total, that makes horizontal scaling 4x as cheap as vertical scaling in
resources. But if you can choose between one vertical scalable server that costs
max 640$, or 32x 5$ servers (on average), the difference is just 480$ a month.
With 480$ a month you can't build a horizontal server architecture, so it
doesn't make sense.

With horizontal scaling you can set up a global CDN, with vertical scaling you
can't since you just have one machine.
This is true, and it will mean that, for people in New Zealand, my app will be
much slower, since the server is located in Amsterdam. This can be a problem,
but since my app focusses on Dutch users in the first stage, the problem isn't
that big. Later, when we start expanding to more countries, a global CDN is a
must and horizontal scaling will be necessary.

Can we go even bigger, vertically?
If we really need an even bigger vertical scale, we could think about Amazon EC2
which offers a 72 vCPU optimized unit (c5.18xlarge)
[https://aws.amazon.com/ec2/pricing/on-demand/]. This would mean 2.25x more RPS
for 344% as much money, so it's just 53% more expensive, which is not that bad!
In the coming years, Compute optimized units of up to 128 vCPU's are expected,
so this is not the end! If we can get 12.5k rps on 32 vCPU's, that would mean
50k rps on 128 vCPU machines. That's massive scale for a single machine! This
means ±1.000.000 DAU on a single machine, or 100.000 online simultaneously!