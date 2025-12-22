---
createdAt: 1548788151000
updatedAt: 1548790033000
publishedAt: 1548788344000
---

# Never let your API go down with a flexible client

My app sends about 0.5 RPS to the API.

Once a minute I query the serverInfo which also contains info about CPU load.

If the CPU load gets higher than 80%, the app goes into save-mode. This means
that queries that refetch every 5 seconds normally, will now only refetch once
every minute.

Once this happens, clients will just send 4 queries per minute to the server,
plus all the actions they take themselves. Let's say that makes 10 queries per
minute, which is 0,17 per second.

In practice, this means that my server, which normally could handle about 10k
users tops with Vertical scaling [/vertical-scaling], could now handle 29.4k+
users. The users get a warning that says that the servers are under high load
and we are working on it, but the users can still use the app.

This simple addition to your client can at least triple your maximal users
capacity by slightly lowering the user experience, I think that's quite a good
trade-off!