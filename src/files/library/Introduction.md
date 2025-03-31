# Introduction to JavaScript

JavaScript (JS) is a high-level programming language that drives dynamic web experiences. JavaScript is often defined as **asynchronous, single-threaded, non-blocking, event-driven, and interpreted (with JIT compilation)**.

- **How Asynchronous if It’s Single-Threaded?**: Despite one thread, JS uses callbacks, Promises, and `async/await` to handle tasks like data fetching, delegating to **browser APIs**. The event loop (covered later) manages the flow.

- **Single-Threaded**: JS processes one task at a time on a single thread. The event loop queues tasks, ensuring smooth execution without multitasking.

- **Non-Blocking?**: JS avoids delays by offloading slow tasks (e.g., network requests) to Web APIs. The main thread stays free, and the event loop picks up results.

- **Event-Driven?**: JS responds to events (e.g., clicks) via listeners like `addEventListener`. Callbacks are queued and handled by the event loop.

---

## JavaScript Engines: How JS Runs in Browsers

JavaScript engines execute code in browsers by parsing it into an Abstract Syntax Tree (AST), then interpreting or compiling it. Key engines include:

1. **V8 (Chrome, Node.js)**: Google’s JIT-powered engine, fast and open-source, used in Chrome and Node.js.
2. **SpiderMonkey (Firefox)**: Mozilla’s original engine by Eich, optimized with JIT for Firefox.
3. **JavaScriptCore (Safari)**: Apple’s efficient engine (Nitro) for Safari and WebKit browsers.
4. **Chakra (Legacy Edge)**: Microsoft’s retired engine, replaced by V8 in modern Edge.

**Process**: Engines parse JS, compile it with JIT, and use browser APIs (e.g., DOM, fetch) for tasks like rendering.

---

## Compiled AND Interpreted? The Facts

JavaScript bridges two worlds:
- **Interpreted**: Originally run line-by-line for quick execution.
- **Compiled (JIT)**: Modern engines compile to machine code at runtime for speed.

**How It Works**: You write code; the engine interprets some parts and compiles others, balancing flexibility and performance.

---

## History

Created in 1995 by Brendan Eich at Netscape in 10 days, JavaScript started as **Mocha**, became **LiveScript**, then **JavaScript**—a marketing tactic to piggyback on Java’s fame, despite no real link. Netscape and Sun chose the name to position it as a web scripting tool.

---

## JavaScript Libraries vs. Frameworks

JavaScript’s ecosystem offers a wealth of **libraries** and **frameworks**:
- **Library**: Tools you call when needed—you control the structure.
- **Framework**: A blueprint you follow—it shapes your app.

### Key Libraries
1. **jQuery**: Simplifies DOM and AJAX tasks; less common today.
2. **Lodash**: Utility functions for arrays and objects.
3. **TypeScript**: A superset of JS adding static types, enhancing code reliability and tooling.

### Key Frameworks
1. **React**: Facebook’s UI library with components and a virtual DOM.
2. **Angular**: Google’s robust framework for SPAs with two-way binding.
3. **Vue.js**: Flexible and simple, suits all project sizes.
4. **Svelte**: Compiles to vanilla JS, lightweight and fast.

**Difference**: Libraries give you freedom; frameworks provide structure. (Note: TypeScript isn’t a traditional library but enhances JS development.)

---

## Conclusion

JavaScript’s asynchronous, event-driven nature—enabled by the event loop—makes it perfect for web apps. From its Mocha-to-JavaScript rename to engines like V8, it’s evolved smartly. Whether using jQuery or React, JS is your tool to master.