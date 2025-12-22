---
createdAt: 1551017563000
updatedAt: 1553024341000
publishedAt: 1551102807000
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