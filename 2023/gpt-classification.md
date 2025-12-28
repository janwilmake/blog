---
date: 2023-01
tags: [ai, gpt, programming, coding]
---

# Classification tasks with ChatGPT

Yesterday, I built an AI program that can classify anything in parallel. The best part? It's super fast due to parallelism. For example, it can identify the gender of a list of names within 250ms, even for 10,000 names!

It's ridiculously simple though. It works like this:

```ts
const response = await openai.createChatCompletion({
  messages: [
    {
      role: "system",
      content: `You are a GPT Classifier Function. Reply with one of the following words to the users question: ${possibilities.join(
        ", ",
      )}. NB: Reply just the answer, nothing else.`,
    },
    { role: "user", content: prompt },
  ],
  max_tokens: 3,
});
```

I just prompt ChatGPT to reply with max 1 word, and ask it if it to answer something that is part of the possible answers (the classes of the classifier)

```ts
const chatResponse = response.chatResponse;
if (!chatResponse || !possibilities.includes(chatResponse)) {
  console.log("FAILED CLASSIFICATION", prompt, chatResponse);
  return;
}
```

All in all, you can now use it like this:

```ts
["Johnny", "Lisa", "Maria", "Hank", "Pieter-Jan"].map((name) =>
  gptClassify(
    "YOUR TOKEN",
    `Consider the name "${name}". What is the gender? Guess if unclear.`,
    ["male", "female"],
  ).then(console.log),
);
```

And now you're getting the gender (guessed) for any name.

The possibilities are endless with GPT's, and chat is just one of their use cases.
