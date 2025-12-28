---
date: 2024-01
tags: [programming, ai, devops, philosophy, startup]
---

# Why are systems always so hard to integrate with other systems?

At work my techlead recently furiously disregarded my idea to use an API for creating PDFs. "No! We would be breaking the contract with the user! Their personal data cannot leave our AWS instances". Now we are implementing a local solution to generate PDFs in the user browser. This requires us to do much more effort because we won't be able to use HTML, and the libraries we are using are super low-level. We are constraining ourselves a lot; And this is a common thing in the software world. We don't easily allow ourselves to build upon others software. It is often a better choice to do things yourself.

Security is one of the issues. What could be the other ones? Claude 3.5 from Anthropic told me the following:

You've touched on a complex and persistent challenge in software development. While integrating systems can indeed be difficult, there are several reasons beyond security why organizations might choose to build custom solutions or avoid external integrations:

1. Data Privacy and Compliance: As your tech lead mentioned, data protection regulations (like GDPR, HIPAA, etc.) often place strict requirements on how and where data can be processed.

2. Vendor Lock-in: Relying on external APIs can create dependencies that are hard to break away from if the service changes or becomes unsuitable in the future.

3. Performance and Latency: External services may introduce latency or performance bottlenecks, especially for time-sensitive operations.

4. Customization and Control: Off-the-shelf solutions might not offer the specific features or level of customization required for unique business needs.

5. Long-term Cost: While initially more expensive to develop, in-house solutions can be more cost-effective in the long run, especially for core business functionalities.

6. Reliability and Uptime: Depending on external services means your system's reliability is tied to theirs.

7. Integration Complexity: Sometimes, the effort required to properly integrate and maintain an external system can exceed that of building a simpler in-house solution.

8. Intellectual Property Concerns: Some companies prefer to keep their core technologies in-house to maintain competitive advantages.

9. Legacy System Compatibility: Older systems may have trouble integrating with modern APIs or services.

10. Corporate Culture and Risk Aversion: Some organizations have a culture that favors building over buying, often due to past experiences or risk management strategies.

These are probably valid, but I'm envisioning a world where all software seamlessly integrates. We just need to overcome a few hurdles.

1. **Data Privacy and Compliance.** The biggest concern is where data gets stored, but personal data is sometimes also not allowed to leave a certain region. It is more work to figure out data compliance when using third party apis, so this is a big hurdle to overcome when using apis indeed. We can make it easier by adding filters to a potential 'API search engine'.

2. **Vendor Lock-in:** While it's certainly true that some apis create vendor lock-in because they're hard to replace, this doesn't need to be the case. There are often alternatives for services, the only problem is that the exact interface is often structured in a different way. With a technique I call "GPT Normalization" we should be able to refactor our code to allow for an abstraction that can use both interfaces interchangeably. This would allow us to easily switch between Vendors, effectively overcoming the lock-in.

3. **Performance and Latency**: Latency when using APIs can come for many reasons, and this is something usually not easy to see in advance when exploring APIs. There are some good indicators that give an indication about latency, but that's not all. A search engine for APIs that has latency constraints would be useful here, as it's not that straight forward. If we could see the average and SD for every api and endpoint, it would be much easier to make a sound choice when finding an API. And if you use a good serverless scalable API that is hosted in the same region, potentially even the same data-center, as your back-end, you don't have so much latency, given the implementation of the used API is good.

4. **Customization and Control**: While it's true that there are limitations to every API, that doesn't mean that this is always going to be a problem. Often an API is a fine solution for the direct requirements, and premature optimisation is the root of all evil. If you're afraid that you will spend more time because you need to integrate and then refactor later, solving the 2nd problem (vendor lock-in) will solve this. Furthermore, it can be time-consuming to map your requirements against the features of different APIs. If this process could be automated, and the best API could come forward by just passing your requirements, we would very easily be able to see whether or not an API will limit us. If there is really no combination of API endpoints that serves our needs, we can build one ourselves, and serve this building block to any app, not only our own.

5. **Long-term Cost**: This is certainly true and is usually used as an argument - APIs are more expensive than running code locally. But when making this choice, there is usually no time reserved to determine the difference in cost between developing yourself including maintenance of an extra complexity, and using an API. This tradeoff is very important, and yet the choice is usually made by the PO's or developer's intuition. The cost of development is usually underestimated, especially maintenance is not taken into account. There are entire companies built to solve a problem and providing APIs for them, so holistically speaking it's more efficient to re-use the effort they already did. This should also be cheaper, holistically speaking. The biggest question we should ask ourselves, is probably: 'Is the API cost really to high, or does it actually fit well within the business model of our product?'. If the answer to that is yes, or if you want to get to a POC first and time-to-market is much more important, let's just use that goddamn API!

6. **Reliability and Uptime**: Depending on external services means your system's reliability is tied to theirs. This is something that can become a problem if you can't easily switch and are depending on APIs less reliable than your own. If switching is solved (see '#2'), the only thing we need is an objective measurement of reliability of the used API to ensure we know when to switch. Problem solved.

7. **Integration Complexity**: Sometimes, the effort required to properly integrate and maintain an external system can exceed that of building a simpler in-house solution. This is currently very true because integrations with APIs are time-consuming. But this truth will turn out to become more false the easier we make it to integrate third party APIs. With an API search engine, continous research can be effortless. When we RAG the required API info into our AI SWE, we won't need to integrate it ourselves, and migrating to an alternative in the future also wouldn't take us much time.

8. **Intellectual Property Concerns**: Some companies prefer to keep their core technologies in-house to maintain competitive advantages. While this argument seems plausible, it's kind of easy to argue that this is horse shit. With a very easy way to integrate a multitude of APIs effortlessly, we won't be able to compete with a competitor that can do all of that for free.

9. **Legacy System Compatibility**: Maybe I don't understand this, but I'm sorry. If you don't support making REST API calls in your code, your software is just too outdated. Maybe it's time for an upgrade.

10. **Corporate Culture and Risk Aversion**: To counter this argument, all we need to do is prove that using APIs are less risky than having to build and maintain things ourselves.

All in all, it's still very true that it's a tradeoff, but I hope to have informed you of the opportunity of a potential API search engine and several techniques to make it easier for companies to use third-party APIs. At [@janwilmake](https://github.com/janwilmake) we're building this future, where all systems seamlessly integrate with other systems. In a world where this is possible, there will be lots of efficiency gains, and innovation will explode, as we can stand upon the shoulders of giants much more easily.
