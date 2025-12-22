---
date: 2019-03-24
modified_at: 2019-10-25
---

# My Coding Principles

TFTSS = Too Fancy Too Soon Syndrome

Many apps create very fancy solutions to problems that have far more elegant and
basic solutions.

DEP = Dont embrace perfectionism

Perfectionism can be good if you can do it quickly, but it doesn’t always need
to be perfect. Sometimes, perfection takes 80% of the time, where you could have
been done with something that ‘just works’ in 20% of the time. Therefore, it’s
often better to prioritize on something that ‘just works’

RYUOAPA - repeat yourself until obvious abstraction possibilities arise. Don’t
create leaky abstractions (abstractions creating inefficiencies) or abstractions
used completely differently every time. Also, it may be useful to have a few
more repetitions until you know the scope of the abstractions before actually
making the abstraction and having to edit it many times afterwards.

TIN = Type if necessary

Writing Tests vs. Selective Monkey Testing : you can’t write tests for
everything.

CPP - Conventions Patterns Programming: Create conventions and patterns that are
the same over the whole codebase

Abstraction layers should be thick and elegant, and not leaking. Thin layers are
horrible for time to context

Composition over Inheritance: inheritance creates layer upon layer. You can’t
see through those layers easily. Composition ensures there is a great overview,
everything is in one picture. It’s essential to time to context

YAGNI = you ain’t gonna need it

KISS = keep it simple stupid. Don’t overengineer

DOP: Don’t optimize prematurely- Premature optimization is the root of all evil

KTTA - keep the team aligned

Low Learnability principle