---
isPublic: true
date: 2023-08-11
---

# Tailwind Darkmode Issues

Up until now I always thought my tailwind issues were caused by Next.js but once I moved away from Next.js (to bare React) I still had the issues. The main way it showed itself was in the tailwind darkmode with `dark:`.

I've got a large typescript monorepo and tailwind is done for every package separately by importing a css file from every package.

Somehow class precedence was not the right way. Possibly this happens due to having multiple imports of tailwind css files.

This problem mainly became apparent because of darkmode. Darkmode would only work if I had only a class for darkmode. If there was another class for lightmode in there as well (the regular class) it would take priority, and darkmode simply wouldn't work.

My solution, after lots of searching, was adding a bang (!) before the class (and after the modifier) like this:

`bg-gray-200 dark:!bg-gray-800`

This makes `bg-gray-800` more important than `bg-gray-200` so if they both are applied, `bg-gray-800` will take priority

As a fix I did a global search for `dark:` and turned every `dark:` into `dark:!`. I should probably keep adding this bang for every darkmode to solve this once and for all.

It's probably not the right way to fix it, as it doesn't solve the root cause, but I've also not seen any examples of using tailwind in monorepos and I've never seen anyone talk about this.

For now I'm happy with this little hack.
