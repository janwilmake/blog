---
date: 2023-08-11
tags: [programming, javascript, web-development, coding]
description: A tutorial on creating a draggable horizontal resizer in React for dynamic layouts, inspired by VSCode's resizable panels, implemented as a reusable React hook.
---

# Resize your layout with a draggable div in React

I have always wanted to make my layout more dynamic. WhatsApp web doesn't even have this but things like VSCode do, and I think it's super cool. It reminds me of the old days because frames in webpages had default support for it. Nonetheless it's a super useful feature for creating more flexibility for your layout for different preferences and screensizes: I'm talking about introducing a resizer!

I came across [this piece](https://htmldom.dev/create-resizable-split-views/) of a guy that wrote a resizer in pure js; how amazing!

I pieced together his code, and then wrote it into a react hook (because I need it like that). I also improved his code a little bit more because the resize icon wasn't working perfectly.

This is what I ended up with: `useHorizontalDraggableDiv.ts`

![](./resizer.mov)

```js

import { useEffect } from "react";
/**
 * To create a horizontal draggable div, put a div into your code in between two other divs like this:
 *


`<Div className="w-1 bg-green-600" id="horizontalDraggable"></Div>`


Inspired by https://htmldom.dev/create-resizable-split-views/
\*/
export const useHorizontalDraggableDiv = (isEnabled?: boolean) =>
useEffect(() => {
if (!isEnabled) {
return;
}
// Query the element
const resizer = document.getElementById(
"horizontalDraggable"
) as HTMLDivElement | null;
if (!resizer) {
return;
}

    const leftSide = resizer.previousElementSibling as HTMLDivElement | null;
    const rightSide = resizer.nextElementSibling as HTMLDivElement | null;
    if (!leftSide || !rightSide) {
      return;
    }

    // The current position of mouse
    let x = 0;
    let y = 0;

    // Width of left side
    let leftWidth = 0;

    const mouseMoveHandler = function (e: MouseEvent) {
      // How far the mouse has been moved
      const dx = e.clientX - x;
      const dy = e.clientY - y;

      leftSide.style.userSelect = "none";
      leftSide.style.pointerEvents = "none";

      rightSide.style.userSelect = "none";
      rightSide.style.pointerEvents = "none";

      if (!resizer.parentNode) {
        return;
      }

      const newLeftWidth =
        ((leftWidth + dx) * 100) /
        (resizer.parentNode as Element).getBoundingClientRect().width;
      leftSide.style.width = `${newLeftWidth}%`;
    };

    const mouseUpHandler = function () {
      leftSide.style.removeProperty("user-select");
      leftSide.style.removeProperty("pointer-events");

      rightSide.style.removeProperty("user-select");
      rightSide.style.removeProperty("pointer-events");

      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    // Handle the mousedown event
    // that's triggered when user drags the resizer
    const mouseDownHandler = function (e: MouseEvent) {
      // Get the current mouse position
      x = e.clientX;
      y = e.clientY;
      leftWidth = leftSide.getBoundingClientRect().width;

      // Attach the listeners to `document`
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    // Attach the handler
    resizer.addEventListener("mouseenter", () => {
      document.body.style.cursor = "col-resize";
    });
    resizer.addEventListener("mouseleave", () => {
      document.body.style.removeProperty("cursor");
    });

    resizer.addEventListener("mousedown", mouseDownHandler);

}, [isEnabled]);

```

It can be used simply by hooking it into your component and adding your div like described in the doc-comment.

Super easy, super powerful!
