---
date: 2018-03-13
modified_at: 2018-03-13
---

# React Native App Structure: Fat-, pure-, wrapper- or screen-components?

Today (13th of March, 2018) I felt like I needed some more structure in my
codebase.
I've already been naming the files based on their type (screen or component),
but this is not the best way to structure them in my opinion. I've done this for
a long time, and it's great, but from today onwards I will try a new structure
and here is my motivation.....

The app is getting big. Or is it? It's approaching 10k lines (excluding old
code). I guessed it would be more! I also had 5k lines after a week. Seems I
spent way more time on figuring out and changing things I wrote earlier. Maybe
because I end up searching for code a lot?

MORE STRUCTURE?
In my opinion, you shouldn't structure it unless there is a clear advantage in
finding files and pieces in files. In the beginning, it costs more time because
you're moving around files all the time. Later it may become useful because it's
kind of an extra description for your files. You will be able to find what you
need more easily, and it makes more sense.

So since today, I divided my client-side react-native code into a few different
folders: fat, pure, screens, universal, wrappers, and old.

P.S. this post
[https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0] 
inspired me to do it, and is also good reading material.

Fat components
Whut? Components that include data from React-Apollo (Using GraphQL).

Motivation: It's good to know if you include a component if it already includes
data. Otherwise, you have to open the component to check whether it does.

Pure components:
Whut? "People say that a component is pure if it is guaranteed to return the
same result given the same props and state." - Dan Abramov
[https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0]

Motivation: It's good to know if a component doesn't contain any GraphQL Data
(yet). Pure components don't. However, sometimes (more often than not) they need
data or props. Make sure to specify this by typing the props using Typescript,
or having a 'prop'-er (🤪 haha I'm so fanny) comment/description above the
component. This way you never have to look into the component anymore, which
saves a lot of time and brain capacity. 😃

Screen Components:
Whut?: Screen components are included directly at the navigation and are a full
screen.

Motivation: It's good to know if something is a whole screen. The biggest reason
is that you know what kind of props it will get because this is the same on
every screen.

Universal Components:
Whut?: These are just pure components that I intend to open source.

Motivation: It's good to know your plans because the way you program depends on
it. This gives me more incentive to create open source code that can be shared!
😊

Wrapper Components
Whut: Wrappers are pure components that take the same name as an existing
component, but wrap around it to sometimes change it a little.

Motivation: For example, I can add some props to a button, or create a different
source for any button in the whole app if the library I used for buttons breaks.
Wrappers are also pure components as they don't add data from Apollo. But it's
good to make this distinction because you know it's an extension (or the exact
same) as a common component.