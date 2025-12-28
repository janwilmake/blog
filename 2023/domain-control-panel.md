---
date: 2023-09-08
tags: [programming, devops, tools, web-development]
---

# Creating a domain control panel

Throughout my developer career I've bought hundreds of domains and tried many different services. But after years of experienced I've kind of stuck with a few things that I love because they just work and are convieniently easy to setup. I've stuck with NameCheap for finding and buying domains, and manage the DNS at CloudFlare.

Recently I've pondered on the idea to create a tool to fully automate the process of turning an idea into a working website by using the NameCheap and CloudFlare API combined with a server that handles all my domains. I own 50+ domains to this date, and yet just a fraction of them have valuable content on it.

The reason for this? It takes too much time to manage multiple projects because of all the steps required to go to production.

But this is changing for me, because I recently moved away from Next.js + Vercel hosting and moved from Node.js to Bun.sh. I created a way to quickly deploy without git by pushing files to my server instantly. I also set up NGinx in a way that all domains propogate to the same server. This means that, as long as I send the domain to the right server IP, it will be able to show something.

The only thing that's left, therefore, is to automatically find and buy a domain, setup the nameservers on NameCheap, and then setup the settings + DNS in the right way on CoudFlare.

In this article I'm walking you through the NameCheap and Cloudflare API's. The goal, utlimately, is to create an AI plugin that allows you to quickly find/buy a domain and show something there direcltly from your SSOT server without touching any keyboard or watching any screens. This AI can work from a voice call.

# Architecture

We can divide this up into multiple parts

- **A)** NameCheap API: querying available domains, buying a domain, sending it to the Cloudflare Nameservers
- **B)** CloudFlare API: Add the site to CloudFlare and set up the DNS records
- **C)** Vercel API: Add the domain to the frontend project in vercel
- **D)** My database: All domains need to be overviewed in one CRUD table, so it's easy to do the above, as well as configure other settings on the domain-level, from a single place.

This is a living article, meaning it will change over time as I progress with achieving the goal. Initially my priority will be B and C, because A can be done manually rather easily. All domains from NameCheap have been name-served to CloudFlare now already. This is really easy because you can "select-all" on NameCheap and send them all to the same nameservers, so it was a very easy change through their UI. Also, all new NameCheap domains automatically lead to CloudFlare's DNS, so all I need to do is find a domain there and pay for it. If I then have step B and C setup, I just need to add it in my system and the rest will be automated.

To summarize, for each domain, I need to:

- Buy the domain at NameCheap. DNS should be auto-configured to CloudFlare's NS.
- Add it into the DB if not there yet.
- Add site at CloudFlare
- Set DNS: `A * {my ip}` and `A @ {my ip}`
- Setup email DNS too? Need to check with Sendgrid too
- Enforce https (or api won't work)

I also created a schetch for my ideal architecture:

![](./domain-control-panel.drawio.png)

I will continue now with exploring the CloudFlare API:

# CloudFlare API:

The CloudFlare API has hundreds of endpoints and it's a bit overwhelming to see it at a first glance because it's hard to know what everything means. I've discovered I need to work with zones, which is another word for "domain name". I've found the following endpoints to be needed for my usecase.

The CloudFlare API documentation is very well documented. If you find an endpoint, you can select your programming language or protocol to find a piece of relevant code you can use for your implementation. To test an endpoint, they provide the cURL command.

For example, listing your domains can be done like so:

```sh
curl --request GET \
  --url https://api.cloudflare.com/client/v4/zones \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: {{{your email}}}'
  --header 'X-Auth-Key: {{{your key}}}'
```

NB: after copying their CURL, be sure to add the auth key header and your email + auth key into the request.

This command can be executed in your terminal to retreive your domains (20 per page).

These are all endpoints I need to CRUD domains and DNS records, and setup the settings I need:

## List zones:

https://developers.cloudflare.com/api/operations/zones-get

Example JS code:

```js
let url = "https://api.cloudflare.com/client/v4/zones";

let options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Email": cloudflareEmail,
    "X-Auth-Key": cloudflareApiKey,
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
```

## Add zone:

https://developers.cloudflare.com/api/operations/zones-post

## Delete zone

https://developers.cloudflare.com/api/operations/zones-0-delete

## List zone DNS

https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-list-dns-records

## Create zone DNS record

https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-create-dns-record

## Delete zone DNS Record

https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-delete-dns-record

## Patch/put zone DNS Record

(patch is partial update, put is complete update)

https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-update-dns-record
https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-patch-dns-record

## Set https always-on:

https://api.cloudflare.com/client/v4/zones/4fb3203432c82b2fcb824301c305d8c7/settings/always_use_https

```js
let url =
  "https://api.cloudflare.com/client/v4/zones/zone_identifier/settings/always_use_https";

let options = {
  method: "PATCH",
  headers: { "Content-Type": "application/json", "X-Auth-Email": "" },
  body: '{"value":"off"}',
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
```

## It's done now!

I've created bindings with cloudflare that allow me to:

- CRUD domains
- CRUD dns for a domain
- alter https-only setting

I've also created a function `addOrValidateManagedDomain` that sets up a domain according to the exact settings and dns.

Last but not least, I've started creating functions to add a domain to vercel and namecheap. I can now make a UI that lists all my domains with all my own configuration, that direclty also enforces the right config on the CloudFlare side.

Next time, I will continue with the vercel and namecheap creation and validation. Ultimately, I will be able to manage everything from a single "smart excel sheet" 😎
