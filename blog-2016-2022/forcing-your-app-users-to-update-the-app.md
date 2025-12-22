---
date: 2019-02-24
modified_at: 2019-03-19
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