---
date: 2019-02-24
modified_at: 2019-03-19
tags: [react-native, expo, programming, devops, product-development]
description: A guide on implementing version control in your mobile app to force users to update when needed, using backend endpoints and update screens with over-the-air or store updates.
---

# Forcing your app users to update the app


Things to add: 

- Why
- How
- Code repo open source


 * Create backend endpoint ‘version_info’ which exposes ‘newest version’ &
   ‘required version’, and maybe ‘newest native version’ or so
 * Add this endpoint to main app loading on frontend
 * Add version to .env or app.json
 * Design update screen
 * If version < req —> show update screen. If version < newest native version,
   update via store, otherwise update OTA.