---
date: 2023-09
---

# Multi Domain Locale Hack NextJS

A single project in next.js can usually not generate static pages for multiple domain names. If you search the internet, this is what you'll find: https://multi-domain-first.vercel.app

This makes your website noticeably slower, so that's not nice.

But we can misuse the locale feature to still generate different pages for different domains. All I need to do is ensure there's a JSON file in my src folder with all my domains. I can then use that in my `next.config.js`. It goes like this:

```js
const fs = require("fs");
const path = require("path");
const domainsString = fs.readFileSync(
  path.join(__dirname, "src", "managed-domains.json"),
  "utf8",
);
const domainsJson = JSON.parse(domainsString);
const domains = domainsJson.items.map((item) => item.domain);
const i18n = {
  localeDetection: false,
  // These are all the locales you want to support in
  // your application
  locales: domains,
  // This is the default locale you want to be used when visiting
  // a non-locale prefixed path e.g. `/hello`
  defaultLocale: domains[0],
  // This is a list of locale domains and the default locale they
  // should handle (these are only required when setting up domain routing)
  // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  domains: domains
    .map((item) => [
      {
        domain: item,
        defaultLocale: item,
        locales: [item],
      },
      // please note I'm assuming the domain is without www in my json
      {
        domain: `www.${item}`,
        defaultLocale: item,
        locales: [item],
      },
    ])
    .flat(),
};

console.log({ domains, i18n });
module.exports = {
  // this can be used to allow me to receive the domain in getStaticProps
  i18n,
};
```

Now, we can pass the host domain name to each page via `getStaticProps` like this:

```ts
export const developmentDomain = "domain-you-want-to-test-in-dev.com";

/* utilizing a hack of the locale, we can still know the domain in the getStaticProps */
export const hostGetStaticProps: GetStaticProps = (context) => {
  const domain = context.locale;

  const isDev = process.env.NODE_ENV === "development";
  console.log({ domain, isDev });

  return {
    props: {
      host: isDev ? developmentDomain : domain,
    },
  };
};
```

On any page we can now do different stuff depending on which domain the user is on, like this:

```tsx
//1) import your array of domains from the json file
import domains from "../managed-domains.json";
//2) set static props to pass the host
export const getStaticProps = hostGetStaticProps;
//3) make a hook to get the domain info from the json based on the host
const useDomain = (props: { host?: string }) => {
  if (!props?.host) {
    return;
  }

  const managedDomain = domains.items.find((x) => x.domain === props.host);

  if (!managedDomain) {
    return;
  }

  // we have a domain

  return managedDomain;
};

// 4) now you can do something custom based on the domain on any page, even on first render, even statically!
export default function Home(props: ServerSideProps) {
  const domain = useDomain(props);

  return <p>{domain.header}</p>;
}
```

When you build your website now, it will generate the static site for each locale (see https://nextjs.org/docs/pages/building-your-application/routing/internationalization#dynamic-routes-and-getstaticprops-pages). Hope you found this little hack useful!

# Multi domain markdown setup

I'm quite proud of my multi-domain frontend setup that I've built recently. My goal was to build a frontend with a very quick first contentful paint. I quickly learnt that I shouldn't import many libraries at the frontend, rather at the backend, to reduce bundle size per page.

I learned that if I'd use react-markdown, for example, my bundle-size would already triple. If I would parse with showdown it would cause a big slowdown in building time. So performance and size both mattered. Especially since I hope to make this incredible scalable (potentially to tens of thousands of pages).

The result can be seen on this website, and I'm quite happy with it. It works because of some quite nifty tricks:

1. I've done a [NextJS locale hack](./multi-domain-locale-hack-nextjs.md) to support multiple domains.

2. server-side NextJS looks in `public/domains/[domain]/**/*.md` to know which files to statically build with `getStaticPaths`. It then uses `getStaticProps` to parse the markdown files into html

3. To parse thousands of markdown files, I've used [markdown-wasm](https://github.com/rsms/markdown-wasm) and [html-rewriter-wasm](https://github.com/cloudflare/html-rewriter-wasm). This allows for incredible performance.

4. When I embed code extensions (ts, js, etc.) or a `.md` using `![]()` syntax, it will turn it into code syntax for codeblocks or replace the embed with the actual markdown, parsed. This works recursively!

5. Embedding zip files also works because I add this to the public folder at buildtime. This way I can add any files as long as they're available in the github repo.

6. I've added support for embedding JSON, CSV, Audio and Video in the same way you would normally embed an image in markdown (using `![]()` syntax).

7. For syntax highlighting in code-blocks I'll use [syntect wasm](https://github.com/Menci/syntect-js) or simply [highlight.js](https://highlightjs.org) on the server. This reduces the need for a frontend highlighting library as it's already styled HTML when it reaches the frontend.

The code of the result can be found [here](~/packages/user-facing/os-web/src.zip). Please note you may need some libraries!
