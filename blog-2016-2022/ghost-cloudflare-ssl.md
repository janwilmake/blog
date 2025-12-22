---
date: 2019-05-15
modified_at: 2019-05-15
---

# How to use CloudFlare with Ghost with automatic SSL

Previously I had setup my node server with ghost using let’s encrypt. However,
when using CloudFlare, this isn’t needed anymore. I wanted to use CloudFlare so
I could get ghost on the subdomain and a surge.sh React website on the main
domain. I got stuck for ±100 minutes, because of a redirect loop. The changes I
had to make were very subtle yet important:

 * Set CloudFlare Crypto -> SSL to Flexible. This means that it will use https
   to connect to CloudFlare, but CloudFlare will use normal http to connect to
   your server
 * Update nginx: In the file /etc/nginx/sites-enabled, remove the ssl file, and
   put subdomain.domain.com instead of domain.com as the domain.
 * Check nginx config with sudo nginx -t, restart if OK: sudo systemctl restart
   nginx
 * Change domain of ghost to use http:// instead of https://, and the subdomain.
   Go to the folder where ghost is installed (/var/www/ghost for me) and ghost
   config url http://sub.domain.com
 * Restart ghost: ghost restart

The subtle thing I forgot was that the ghost config should think it’s http,
because cloud flare will approach our server using http. It’s a bit illogical as
the end user will still use https with your domain, but it’s how you need to set
it up. When I did that last thing, it finally worked, after ±100 minutes.

Remember: It would also have been possible to use the Full SSL or Full (Strict)
SSL setting at CloudFlare. Then you’d still need to use let’s encrypt for all
your domains in the DNS. Because I wanted both surge and ghost, it couldn’t
really be like that, and it would cost a lot of extra time to set up Let’s
encrypt anyway, so I don’t see the advantage. In the end, this Ghost.org +
Surge.sh + CloudFlare setup is super simple, and works perfectly for my needs.