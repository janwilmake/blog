---
date: 2024-04
tags: [programming, open-source, nodejs, devops, tools]
description: Details the transition from a 150k LOC monorepo to a decoupled, open-source architecture where each package is its own repository, simplifying distribution and collaboration.
---

# Moving away from my 150k LOC Monorepo

For the last 2.5 years, for my hobby work and startups I've mostly worked from one single giant monorepo written in Node.js, React, Next.js, and Typescript. I think I've written over 300k lines, of which about 150k are still left. A monorepo has proven to be useful to create an integrated repository without much overhead, but hard to distribute, hard for others to reuse, and hard to collaborate with. In the past I've even created my own bundler to be able to share a part of my codebase with others, but it ended up adding more overhead than it removed.

In order to achieve better distribution, let's try moving away from the monorepo, and move to a more simple way of development.

Instead of having a mostly private mega repository, I want to go fully open source and make things as decoupled as possible by default.

My requirements:

- Root of the GitHub repo is also the npm package
- a [Zelda](https://github.com/feross/zelda)-like CLI can link all packages to eachother with ease.
- Require the package-name, the repo-name and the folder-name to be all equal.
- Require the package-name to be available in NPM.
- Require the package-name to be descriptive, but a little flavor in branding is allowed.
- I can be flexible in which frontend-frameworks are used as long as it's react-based to keep all code available.

For making this way of working feasible, I need to make shipping easy. Instead of having one giant Git repo on GitHub, I want to have code decoupled, so one package should be one repo. I will therefore have many GitHub repos, which becomes tiresome to deploy.

Another advantage of a monorepo is that everything is linked and can just be imported, even without adding the package to dependencies. For slowly migrating to this, I need to be able to turn any monorepo package into a standalone repo, without loosing linking ability from the monorepo. It's ok to add it as a dependency, but some sort of `linkall` command should ensure all packages that CAN be linked, ARE linked.

Let's get to work!

First I need to extract a package that I use almost everywhere named `js-util`. This is a good testcase.

- ✅ Rename `js-util` to `from-anywhere` everywhere
- ✅ Rebuild entire monorepo without it crashing
- ✅ Publish `from-anywhere` to npm and github
- ✅ Make a function `addDependencies(packageName)` that adds `[package-name]` to `package.json#dependencies` everywhere it's used (version `*` by default) and runs `npm link [package-name]` in all these new installations.
- ✅ After `from-anywhere` is installed everywhere via NPM, take it out of monorepo and link it with `npm link` and then above command again.
- ✅ Also use `zelda` to link it to other packages in `github` folder.
- ✅ Create a good readme with step-by-step guide on how to use publish a monorepo package onto npm and keep using it.

✅ Now I can rename and publish some more packages using my new link cli. Let's create one big `from-anywhere` package and drop useful utilities in there instead of creating all separate packages, unless it could really become big standalone. I want them in subpackages to tell the environment: node, types, react, next and no suffix for js.

✅ make a `ship` command that publishes all npm packages one version up (npm run pub) and pushes newest changes in all folders to github. This was easy! Just created a file `ship.sh` with this:

```sh
# To run this, simply run `./ship.sh` in this folder. If not possible, run `chmod 777 ./ship.sh`
for d in ./*/ ; do (cd "$d" && npm run pub --if-present && git add . && git commit -m "improvements"; git push); done
```

Great stuff. I ended up putting a lot of other stuff in the `from-anywhere` repo I published too, to make things a bit more connected within the repo. I think that's a fine compromise to make, given that the linking of these things may be a bit more error prone in the beginning.

[Here is the repo](https://github.com/CodeFromAnywhere/from-anywhere). In a later stage, I'll add better documentation to all of this too.
