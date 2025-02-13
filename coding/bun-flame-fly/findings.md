Stopped machines cost $0.15 per GB per month, and my machine with chrome is 1GB.

Destroyed machines cost nothing and scaling a stopped machine with chromium seems to take ±20 seconds.

To create a highly performant browser automation service, it'd be best to work with "performance" VMs. The amount of CPUs doesn't matter, so 1 CPU should be fine. The amount of memory does matter, so 8GB (highest for 1 CPU) should be fastest.

The above setup will cost about $0.0846 per hour, but obviously, the highest cost will come from LLMs. You could argue trying multiple tabs to make the VM more cost-effective, but that wouldn't reduce LLM cost which is significantly higher, so this optimisation doesn't seem to be worth it. LLMs are currently costing anywhere between $0.10 and $100 cost per million tokens (a factor 1000x difference)

Let's assume:

- A browser action requires 4000 tokens on average and a bot performs 720 actions an hour, yielding 2.88M tokens an hour
- We use Llama 2 70B (4096 Context Length) for $0.70/$0.80 per million on groq.com

Now our additional cost would be $2.30 per hour extra for the bot to run.

Last but not least, we can expect to pay an additional price for residential IPs. This may easily cost anywhere between $0.3 up to $10 extra per GB. Assuming a single bot making 720 requests per hour worth 1.5MB each, that comes down to 1080MB/hour.

Let's assume for now we can get the proxys for $1 per GB, this will be our final cost per hour:

- VM: $0.09 per hour
- LLM: $2.30 per hour
- Proxy: $1 per hour

Our AI will already cost $3.39 per hour, or about half a cent ($0.005) per pageload.
