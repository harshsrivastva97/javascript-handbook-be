# JavaScript Basics

JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript is a single-threaded, non-blocking, asynchronous, and concurrent language.

## Core Concepts

### Data Types

JavaScript has two main categories of data types:

#### Primitive Types
- **String**: Text data (`"Hello"`, `'World'`)
- **Number**: Numeric data (`42`, `3.14`)
- **Boolean**: Logical data (`true`, `false`)
- **Null**: Intentional absence of value
- **Undefined**: Unassigned value
- **Symbol**: Unique and immutable identifier
- **BigInt**: Large integers (`123n`)

#### Reference Types
- **Object**: Collection of key-value pairs
- **Array**: Ordered collection of values
- **Function**: Reusable block of code

### JavaScript Engine

The JavaScript engine is responsible for executing JavaScript code:
- **V8**: Used in Chrome and Node.js
- **SpiderMonkey**: Used in Firefox
- **JavaScriptCore**: Used in Safari
- **Chakra**: Used in older versions of Edge

### Memory Management

JavaScript manages memory through:
- **Stack**: Stores primitive values and references
- **Heap**: Stores objects and functions
- **Garbage Collection**: Automatically frees memory

### Execution Context

When JavaScript code runs, it creates:
- **Global Execution Context**: Default context
- **Function Execution Context**: Created when a function is called
- **Call Stack**: Tracks execution contexts

---

## Examples

```javascript
// Primitive Data Types
let string = "Hello";
let number = 42;
let boolean = true;
let nullValue = null;
let undefinedValue;
let symbol = Symbol("description");
let bigInt = BigInt(42);

// Reference Types
let object = { key: "value" };
let array = [1, 2, 3];
let function = () => {};

// Type Checking
console.log(typeof string);      // "string"
console.log(typeof number);      // "number"
console.log(typeof boolean);     // "boolean"
console.log(typeof nullValue);   // "object" (known JS quirk)
console.log(typeof undefined);   // "undefined"
console.log(typeof symbol);      // "symbol"
console.log(typeof bigInt);      // "bigint"
```

---

## Key Characteristics

1. **Dynamically Typed**: Variables can change types
   ```javascript
   let x = 10;      // number
   x = "hello";     // string
   ```

2. **Single-Threaded**: Executes one operation at a time
   ```javascript
   console.log("First");
   setTimeout(() => console.log("Third"), 0);
   console.log("Second");
   // Output: First, Second, Third
   ```

3. **Event Loop**: Manages asynchronous operations
   ```javascript
   function main() {
     console.log("A");
     setTimeout(function exec() { console.log("B"); }, 0);
     runWhileLoopForNSeconds(3);
     console.log("C");
   }
   main();
   // Output: A, C, B
   ```

4. **Prototype-Based**: Objects inherit from prototypes
   ```javascript
   const parent = { x: 10 };
   const child = Object.create(parent);
   console.log(child.x); // 10
   ```

---

## Best Practices

- Use strict mode (`'use strict'`) to catch common errors
- Understand type coercion to avoid unexpected behavior
- Learn the event loop to write efficient asynchronous code
- Use modern ES6+ features for cleaner, more maintainable code
- Understand memory management to avoid memory leaks

---

## Summary

JavaScript is a versatile language that:
- Has both primitive and reference types
- Runs in various environments (browser, Node.js)
- Uses JIT (Just-In-Time) compilation
- Is single-threaded with an event loop
- Supports both OOP and functional programming paradigms 