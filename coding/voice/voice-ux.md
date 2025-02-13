---
isPublic: true
---

# Making voice UX possible

I've built an operating system now that allows me to do a lot of stuff, from writing, to coding, to managing email, whatsapp and even search things online in a browser. But ultimately I want to work from nature, this is one of my bigger goals. My current UX is still built around screen UX mostly, but this doesn't need to be this way. The UI is, on top of that, also super useful for an AI to manage lots of things. So let's see what needs to be there in order to make the best Voice assistant ever.

Commands that I think would be super useful:

**File commands**

- Search files X
- Open file X
- New file (Name:X)
- Prompt file
- Append to file (starts record)
- Clean file (starts record)
- Cancel recording
- Push recording
- Read file
- Stop reading (Cancel)
- Skip (to next alinea)

**Message commands**

- Open chat X
- Find chat (query:X)
- List recent chats
- Read chat (from/to X | unread)
- Skip (to next message)
- Prompt chat (record)
- Transcribe message (starts record)
- (re)write message (starts record)
- Read written message
- Cancel (anything)
- Send message

❗️ On top of this, I need to be able to listen to music/videos/podcasts/books and other media and I should be able to read aloud articles online or entire discussions e.g. twitter, indie hackers, etc. However, this could ultimately also become different plugins, so it's ok to wait with this.

❗️ Besides, some guiding commands can be useful, but they can also be conversations ultimately, with plugins. So let's wait with this. Things like your calendar, summarize new messages, etc.

❗️ Please note, that above commands are not only useful as frontend-steering commands, most are also quite useful to be used via chat and by AI, as plugin. I should therefore keep this in mind and create a universal api that is usable as AI plugin so it can be used in all different ways.

To start, what I can do:

- use `useVad` (`@ricky0123/vad-react`) to catch sentences and send to server to instant transcribe. (blocked by bun)
- optimise for accuracy and speed of all above commands
- Some commands tie to a certain context that is usually in the hyperlink of the UX. all this state should now be kept somewhere in the backend (`Person.state`?)
- All commands can be turned into AI plugins, some of which work differently for the frontend compared to when the AI would use it in a text interface. Some of which wouldn't be needed for non-frontend.
- All commands can be wrapped by the browser via the API that sends voice and returns an action.
- All actions need to be executed properly by the browser

Once I have this, I should be able to go for a walk and control my entire work with my voice. This is the start of a new way of working!
