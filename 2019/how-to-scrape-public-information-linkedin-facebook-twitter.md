---
date: 2019-10-25
modified_at: 2019-10-25
tags: [programming, web-development, coding]
---

# How to scrape public information from LinkedIn, Facebook and Twitter using Javascript

For my app Dunbar https://Dunbar.site  I needed to scrape person information.
The goal was to get profile picture options to show them in the app. It wasn't
easy. A whole new world opened up to me. The world of data scraping! 

Puppeteer (Node JS) https://pptr.dev/  is a tool to do automate browsing using
a Headless browser. I created a bot that scrapes Facebook and LinkedIn Images
with it. See this repo for a working example
https://github.com/EAT-CODE-KITE-REPEAT/linkedin-facebook-scraper-puppeteer.
The biggest thing I had to learn was CSS Selectors
https://www.w3schools.com/cssref/css_selectors.asp  in order to obtain
information from web pages. 

Unfortunately, after hours and hours of work, I noticed that especially the
websites I wanted to scrape have anti-scraping protection in place. There is
rate limiting and sometimes it shows an auth wall. How to counteract this? 

https://proxycrawl.com/  is a paid SDK  to set a proxy in front of any webpage.

Apify WebScraper https://apify.com/apify/web-scraper  is a web scraper that
has many features baked in to bypass anti-scraping protection
https://help.apify.com/en/articles/1961361-several-tips-how-to-bypass-website-anti-scraping-protections
. 

https://serpapi.com/  is an api for Google Search.