---
date: 2019-10-20
modified_at: 2019-10-20
---

# Install An Express+MySQL App on a remote server

This is the way I do it, not all steps are necessary.

 1. Create a Linode [https://linode.com]  Or DigitalOcean Droplet. They are both
    good.
 2. Initial server setup
    [https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04]

2. Install NGinx
[https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04]

3. Install Node
[https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04]

4. Install MySQL
[https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04]

5. Create database:

> mysql
> CREATE DATABASE name;
6. If you want emoji's in your database too, set database to support full
Unicode using this guide [https://mathiasbynens.be/notes/mysql-utf8mb4].

7. Link the domain to CloudFlare's name servers "dana.ns.cloudflare.com" and
"paul.ns.cloudflare.com". 

8. On CloudFlare, set DNS to link the server domain to the IP of the server you
just set up. 

9. Add deploy key to your repo in GitHub. To do this, run the following command
on the server

> ssh-keygen
Then run:

> cat /home/[USER]/.ssh/id_rsa.pub
The printed string should be pasted into GitHub->settings->deploy keys->add
deploy key

Running the express app
 1. Clone your repo into the server.

> git clone [SSH URL to be found on your repo]
2. try to run it

> npm run dev
Does it work? PM2 is a good tool to run it for a longer term. If the server
reboots, PM2 makes sure the app is rebooted too.