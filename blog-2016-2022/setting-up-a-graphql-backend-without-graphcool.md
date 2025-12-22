---
date: 2018-03-06
modified_at: 2018-06-05
---

# Setting up a GraphQL Backend without GraphCool

> This article is part of a series on building an MVP of a Data-driven
cross-platform app with the following stack: React Native, Apollo GraphQL, and
on the backend Node JS with Express and a MySQL Database.


GraphCool is great but it kinda traps you. With this simple guide, I want to
argue that it's actually not THAT hard to set up your own backend! And after you
scale it, it's muuuuuuuch cheaper!

> Please note! This is still a work in progress. It were actually just my own
notes, so if something is unclear, just contact me.


In this post, you will read how to do the following:

 1. Start with a basic server setup, GraphQL, Express, Sequelize, SQLite, Dev
    mode, Git
 2. Explain how I spin it up a 5$ Linode
 3. Explain all domain stuff too? But https is necessary for sure! iOS needs it.

1) GraphQL Server locally
First of all, we are going to make sure we have a GraphQL Server working on
localhost

 * git init whole project, create git repo, set remote, commit, push
 * code .gitignore server/dist node_modules , client .... 1 git for all
 * folder server
 * yarn init, yarn add -D nodemon, babel-cli, babel-preset-env, eslint,
   prettier-eslint
 * zorg dat prettier plugin en eslint plugin in VSCode werken en controlleer dit
 * add typescript
 * ./node_modules/.bin/eslint --init with airbnb preset
 * create scripts in package.json
   - dev: nodemon --exec babel-node --presets=env --plugins=transform-runtime
   lib
   - build: babel lib -d dist --presets env
   - serve pm2 start dist/index.js
 * leg ook uit wat deze commandos precies doen en wanneer je ze gebruikt
 * create index: * connectors (sequelize docs)
    * schema, resolvers, server execution (apollo graphql docs)
   
   
 * test it with GraphiQL, SQLite, en DB Browser for SQLite

2) Remote server
The second step will be to run it on a remote server somewhere on this planet
using Linode (or any other cloud hosting platform).

 * Set up secure Create linode —> 2GB
 * Deploy an image —> Ubuntu 18.04 LTS
 * Boot
 * Initial server setup
   [https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04]
 * Set up SSH Key
   [https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804]
 * set up Nginx
   [https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04]
 * set up git, node (and npm), yarn, and pm2
 * set up mysql
   [https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04]
 * create mysql database with proper name
 * git pull
 * yarn, yarn dev and check if the app runs correctly
 * if so, yarn build and yarn serve
 * test with GraphiQL

 1. add name servers of preferred domain pointing to cloudflare
    (dana&paul.ns.cloudflare.com)
 2. setup CloudFlare DNS

 * Point CNAME record www and @ to na-west1.surge.sh
 * Point A record server.example.com to server IP
 * Crypto —> Origin certificate, save these values!

 3. use any static website project but probably the React Bootstrap App theme
    that I modified, build it, and upload it using “surge ./build/ example.com”
    
    
 4. setup a server with Ubuntu 16.04 and Nginx that has this in 
    /etc/nginx/sites-enabled/default
    
    

server {
listen 80;
access_log /var/log/nginx/nginx.vhost.access.log;
error_log /var/log/nginx/nginx.vhost.error.log;

location / {
proxy_pass http://localhost:3001/graphql;
}

}

 5. check for correctness using sudo nginx -t and if it's correct, restart
    nginx: sudo systemctl restart nginx
    
    
 6. Make sure the process indeed runs on this location and port using pm2.
    
    
 7. You can now approach your server remotely from anywhere in the world via 
    https://server.yourdomain.com/ . congratz!