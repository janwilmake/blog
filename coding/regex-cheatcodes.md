---
isPublic: true
---

# Global Search/Replace with Regexes in VSCode

VSCode is super powerful but if you know how to properly use regexes within global search/replace commands, it can even become more powerful.

The most important ones are:

- Match everything except newlines `(.*)`
- Match everything including newlines, but don't be greedy (match as few characters as possible): `(.|\n)*?`

It's easy to remember because the icon to turn on regex search is `.*`. We just put parantheces around it because then it becomes a variable.

You can then add `$n` in the replace field, where `n` is the how-manieth match (e.g. `$1`)

For example, if you want to change all react imports from "react" to "reaction", you could do this:

- Search: `import \{ (.*) \} from "react";` (note the backslashes are needed if you turn on regex for some characters)
- Replace: `import { $1 } from "reaction";` (note that the replace field doesn't need backslashes because regex doesn't apply, except for the variables)

If you want to do stuff across newlines, you can use `((.|\n)*?)` so it also selects newlines. The outside `(` and `)` ensure it also becomes a variable.

For example, this will find all while loops, everywhere: `while \((.*)\) \{((.|\n)*?)\}`

Please note that it is lazy and doesn't take into account nested characters with meaning like `{` and `}`. This means it finds what's inside under `$2` but if there is also `}` inside, it will just stop there because that's the end of the regex, no matter what.

I've found these regexes incredibly powerful anyway and I hope you can use it too.
