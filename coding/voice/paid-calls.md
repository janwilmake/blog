---
isPublic: true
---

# ChatGPT on the phone via a premium-rate-number?

If all my chatbots were also available via callling a phone number, it would allow for a very interesting new interface. I'm working on this (read more at `llm-voice-calls.md`).

Last spring a friend suggested I could allow a voice interface on a paid phone number. What if old people that aren't familiar with the internet, that usually barely use technology, can simply access an AI like ChatGPT by calling a phone number? What if we can earn money from this target audience by charging per minute on this phone number? This could be a huge untapped market right there, so it's interesting to explore this.

The service Twilio offers is amazing, but they don't offer premium-rate numbers. But life does't stop at what twilio offers! What if we can connect a premium-rate-number service to a Twilio service? After some research, I discovered this may indeed be possible.

I found these companies that seem to offer premium rate numbers internationally:

- [MCXess](https://www.mcxess.com/phone-numbers/premium-rate-number/)
- [Sound of Data](https://www.soundofdata.com/global-service-numbers/non-geographic-numbers/premium-numbers)
- [Message to the Moon](https://messagetothemoon.com/international-phone-numbers/premium-rate-number/)

It seems that they all have the ability to forward the number to Twilio. Can't be sure though, but if it's possible, that means we can make every twilio phone number paid. The only thing is that it might be difficult to route it easily to the required purpose, and there may be setup costs + time, and operation costs to keep lots of numbers available.

Therefore, I contacted them to figure out the details...

**UPDATE 22th of august, 2023**

I just called with somenoe of https://messagetothemoon.com. They are charging money for a paid phone number: €390 for the first year, then €25/month. With something called "SIP Trunking" they allow me to redirect phone numbers from any country to a phone number of twilio. This would allow me to charge anything between €0.10 per minute to €1.15 per minute. Regulations differ a lot per country, so it's something manual to setup for every country.

As a first test after I've got it stable with Twilio would be to get a paid number for the Netherlands. If this works, we can partner with someone to promote this. We can also market our own stuff with this number, because it would reduce the onboarding cost to near-zero because people pay from the first second.

# TODO

I will further keep this article up to date as I progress in this use-case.

Initially I need to finish `llm-voice-calls.md`

After it fully works, I'll probably do a first test. I'll keep this posted!
