---
createdAt: 1547655021000
updatedAt: 1552257836000
publishedAt: 1551022064000
---

# Seven mistakes I think my software company made building their React Native App

For about 8 months now, I've worked for a software-company that's building a
React Native App for a client. My role is to program features and fix bugs in
React Native. After a while, I started thinking more and more about the whole
picture of their project, and noticed many things (some irreversible) that I
would have a done differently from the start. The biggest problem with the app
now is complexity and messiness, but there are some other important things I
think can be improved. Here is a summary.

1) Too much complexity, too early (19x)
Programming the app began ±1.5 years ago, and the app went live about a year
ago. However, since then, the app has not made any revenue (this is only
possible for a few months) and there are just a few thousand users. I'm not sure
if there's product market fit (more on this later) so I think it's not a good
idea to make the app very complex already. First create a good app for your
ideal customer before expanding to different audiences and perfectionizing
everything. If you make your app too complex without having found PMF, you
become a whale in a bathtub. You wanna be a fish in the ocean. Stay small and
flexible, stay agile.

As is oftenly stated, premature optimization is the root of all evil
[https://stackify.com/premature-optimization-evil/]

Here are some things that make the app overly complex:

 * Internationalization way too early, adding much complexity to the codebase
 * Using way too many native links to open source libraries
 * Using even more self-created native bindings with native code.
 * Perfectionizing UI creating much bigger codebase with many details, not
   sticking to basic react native.
 * Not using Expo, not even ExpoKit. Because of this, you have to rely on
   unstable open source code or create your own. More about this here
   [https://karsens.com/perfections-vs-speed/]
 * Having a default, a @2x and a @3x for all image resources. This costs time to
   make while it doesn't boost performance noticably, since all those images are
   saved locally and very small in size already anyway.
 * Doing many many redesigns. Redesigns don’t make users use the app if the app
   doesn’t fit users needs.
 * Using Wix Navigation instead of React Navigation. More info about this here
   [https://karsens.com/big-reason-to-use-react-navigation-over-wix-navigation/]
 * Creating layers over layers over layers with components. Using too much
   inheritance and passing props through, instead of composing flexible
   components
 * Not using a library like react-native-data-forms
   [https://github.com/EAT-CODE-KITE-REPEAT/react-native-data-forms] to create
   forms (not separating impelementation details and semantics from components
   and data flow)
 * Having very complex backend setup, 64 servers. All can be done with just one
   or two servers. Tools like docker are not even needed yet at this stage.
 * Much unnessecary saga’s and redux usage
 * Abusing GraphQL by having too many nested objects which create unnessesarily
   deep queries that get complex and inefficient
 * Having hidden features in the app, completely unrelated to the main purpose
   of the app.
 * Building many features for edge user cases. Again, it's better to first find
   PMF for your ideal customer, before expanding different kind of customers.
 * Handling things like image/file uploads and firewalls ourselves. Costs a lot
   of time / money, is hard to get to entreprise quality, and can easily be
   outsourced to tools like AWS S3 and Cloudflare.
 * Over usage of recomposing with HOC’s, withProps and withState, creating
   obscure inconvenient components
 * Creating our own font when using vector-icons is much less work and just as
   good. Again, perfection takes 5x as much time.
 * Allowing user to not register with e-mail, making a much more complex
   back-end and front-end necessary.
 * We don't use any library to have a higher order definition of our model and
   queries on the front and back-end. A good tool for this, which can save much
   development time, would be PostGraphile
   [https://github.com/graphile/postgraphile]. We can even create our own if
   this doesn't work with our own stack. This could still save a lot of time in
   the future. I'm also working on my own library for this: GraphQLDefine
   [https://github.com/EAT-CODE-KITE-REPEAT/graphql-define]

2) A Messy Codebase (2x)
 * Having much old bad code in the codebase and leaving it there, not taking the
   time to refactor it, but having to struggle with it very often
 * Having a bad - overly complex - folder structure: * no universal resources
      folder
    * no universal queries
      folder (or file)
    * no universal utils folder
      (or file)
    * no universal routes file
    * no universal types file
    * many different component
      folders across domains, not being able to see the big picture anymore
    * way too many simple
      wrapper components that should be avoided. Again, composition >
      inheritance.
   
   
 * No docs (Needed: a simple readme with gifs or pngs of all components).
 * Not separating legacy to-be-removed code from new components, making it
   unclear which code is here to stay

3) Product Market Fit?
There are about 7300 users now (of which just 1900 are registred). It's not
clear where those users come from (did they see an Ad on our websites, or did
they hear it from a friend?). Because of this, it's not clear if there is any
viral growth.

Furthermore, how many people have seen the ad, and how many of those clicked on
it? And which proportion of users clicking the ad, installs the app? I know
nothing.

Also we have no statistics about active users, user retention and average
features usage per user.

All in all, I think we can't be sure if there is product market fit.

Maybe our client has these statistics, but to make a good app, I think we should
know too, so we can think with them about making the app better.

4) No good user retention and virality (5x)
 * Doing almost nothing about user retention; no e-mails and no news-letter
 * Not having emails of three quarters of app users. Push notifications are
   optional and you have to go to a certain place in the app to turn them on
   first. Many users won't do this
 * Almost no push-notifications
 * No sharability features built-in in the app to hack growth
 * Users aren't asked to rate the app, so we don't get many reviews in the
   stores.

Good user retention and virality can be the difference between having no PMF or
having PMF!

5) No user feedback
There is no direct feedback from users to developers. There is little contact
possible for feedback from users, and there is a middle man in between: The
client we build the app for is in charge of user feedback.

An option would be to allow the user to send a feedback message inside the app,
which the developers and the client will receive. Based on more feedback, we can
steer the product in the right direction quickly. Certainly when we don't have
PMF, this can be a very useful strategy.

6) No web version
There is no web version for the app while there seems to be a clear demand for
this.

7) Feature Ownership
Not giving developers full feature ownership because there is a strong
UI-UX/Frontend/Backend/Testing separation can negatively impact efficiency. Read
more here [https://karsens.com/code-ownership/]. Of course it's not always
possible to let developers have full feature ownership because then you'd need
full-stack developers, but at least there should be a possibility for this,
because it can be way more efficient.

Conclusion
There may be more things, but this is what I came up with in about an hour. I
may not be right, because I am not even able to see the full picture (since I'm
just a front-end developer), but I’m sure there are many things that could have
been done better.

Many refactorizations, simplifications or maybe even a full rewrite will be
needed in order to fix all this. Also, I think we should focus more on the value
proposition using feedback of our users, and if this is good, growth hacking.

I'm afraid that, if we don't take this serious, the app will be discontinued in
the future because profit doesn't cover the high costs of developing it. I'm
very much in doubt if we have really found product market fit already and I
think every developer should be kept in the loop about the status.