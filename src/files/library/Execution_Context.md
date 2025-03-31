# Execution Context

The Execution Context and Call Stack are fundamental concepts in JavaScript that manage code execution and scope.

## What is Execution Context?

An execution context is an abstract environment where JavaScript code is evaluated and executed. When code is running, it's always running inside an execution context.

## Types of Execution Contexts

### 1. Global Execution Context

- Created when a JavaScript script first starts to run
- Represents the global scope
- There is only one global execution context in a program
- Creates the global object (`window` in browsers, `global` in Node.js)
- Sets `this` to the global object

### 2. Function Execution Context

- Created whenever a function is called
- Each function call gets its own execution context
- Private to the function being executed

### 3. Eval Execution Context

- Created when code is executed inside an `eval()` function
- Rarely used in modern JavaScript

## Components of an Execution Context

Each execution context has three main components:

### 1. Variable Environment

- Contains all variables declared within the current scope
- Function declarations
- Function arguments
- `var` declarations (function-scoped)

### 2. Lexical Environment

- Similar to Variable Environment but also includes:
- `let` and `const` declarations (block-scoped)
- References to outer (parent) environments

### 3. ThisBinding

- The value of the `this` keyword within the current context

## Execution Context Creation and Execution

The creation and execution of contexts happens in two phases:

### Creation Phase

1. Create the Variable Environment
2. Create the Lexical Environment
3. Set up the Scope Chain
4. Determine the value of `this`

### Execution Phase

1. Execute code line by line
2. Assign values to variables
3. Execute function calls (creating new execution contexts)

## The Call Stack

The call stack is a data structure that tracks the execution of functions in JavaScript:

- When a function is called, it's pushed onto the stack
- When a function returns, it's popped off the stack
- The function at the top of the stack is the one currently being executed
- The call stack follows the Last In, First Out (LIFO) principle

```javascript
// Global Execution Context
let globalVar = 'I am global';

function outer() {
  let outerVar = 'I am from outer';
  
  function inner() {
    let innerVar = 'I am from inner';
    console.log(innerVar);    // Local scope
    console.log(outerVar);    // From outer scope
    console.log(globalVar);   // From global scope
  }
  
  inner(); // New execution context created
}

outer(); // New execution context created
```

In this example, the call stack would look like:

1. Global Execution Context (start)
2. Global → outer() (when outer is called)
3. Global → outer() → inner() (when inner is called)
4. Global → outer() (when inner returns)
5. Global (when outer returns)

## Scope Chain

The scope chain is how JavaScript looks up variables:

- First, it looks in the current scope
- If not found, it looks in the outer scope
- This continues until it reaches the global scope
- If still not found, it returns `undefined` or throws a `ReferenceError`

```javascript
let global = 'global';

function outer() {
  let outerVar = 'outer';
  
  function inner() {
    let innerVar = 'inner';
    
    console.log(innerVar); // Looks in inner's scope
    console.log(outerVar); // Not in inner's scope, looks in outer's scope
    console.log(global);   // Not in inner or outer's scope, looks in global scope
    console.log(notDefined); // Not found anywhere, throws ReferenceError
  }
  
  inner();
}
```

## Hoisting in Execution Context

During the creation phase, variable and function declarations are "hoisted" to the top of their scope:

```javascript
console.log(hoistedVar); // undefined (not ReferenceError)
console.log(hoistedFunc); // [Function: hoistedFunc]

var hoistedVar = 'I am hoisted';
function hoistedFunc() {
  return 'I am hoisted too';
}
```

This happens because:

1. During the creation phase, the JavaScript engine allocates memory for variables and functions
2. Function declarations are fully hoisted with their values
3. Variables declared with `var` are hoisted but initialized as `undefined`
4. Variables declared with `let` and `const` are hoisted but not initialized (Temporal Dead Zone)

## Execution Context and Closures

Closures are a direct result of how execution contexts and the scope chain work:

```javascript
function createCounter() {
  let count = 0; // This variable is in createCounter's execution context
  
  return function increment() {
    // When increment is called later, it still has access to count
    // through its scope chain, even though createCounter has finished executing
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

When `createCounter` finishes executing, its execution context would normally be removed from the call stack. However, because the `increment` function maintains a reference to `createCounter`'s variable environment through the scope chain, that environment is preserved.

## Stack Overflow

The call stack has a maximum size. If too many function calls are made without returns (like in infinite recursion), a "stack overflow" error occurs:

```javascript
function recursiveFunction() {
  recursiveFunction(); // Calls itself without a base case
}

recursiveFunction(); // Eventually causes "Maximum call stack size exceeded"
```

## Call Stack Example

```javascript
function first() {
  console.log('Running first');
  second();
  console.log('Finished first');
}

function second() {
  console.log('Running second');
  third();
  console.log('Finished second');
}

function third() {
  console.log('Running third');
  console.log('Finished third');
}

// Call Stack: [first] -> [first, second] -> [first, second, third]
//         -> [first, second] -> [first] -> []
first();

// Output:
// Running first
// Running second
// Running third
// Finished third
// Finished second
// Finished first
```

## Execution Context in Asynchronous JavaScript

Asynchronous operations like callbacks, promises, and async/await interact with the execution context and call stack in special ways:

```javascript
console.log('Start'); // Global execution context

setTimeout(function timer() {
  console.log('Timeout'); // New execution context when callback runs
}, 0);

Promise.resolve().then(function promise() {
  console.log('Promise'); // New execution context when callback runs
});

console.log('End'); // Still in global execution context

// Output:
// Start
// End
// Promise
// Timeout
```

Even though the timeout is set to 0ms, the event loop and task queues determine when these callbacks execute, not the call stack directly.

## Best Practices

1. **Avoid deep nesting** of functions to prevent stack overflow
2. **Be mindful of closures** and their impact on memory
3. **Understand variable scope** to prevent unexpected behavior
4. **Use block-scoped variables** (`let` and `const`) for cleaner code
5. **Keep execution contexts small** by breaking down large functions

## Summary

- Every function call creates a new execution context
- The call stack tracks which function is currently executing
- Each context has its own variable environment
- The scope chain allows access to variables in outer scopes
- Understanding execution context helps debug and write better code
- Closures are a powerful feature enabled by the scope chain
- The call stack has a limited size, so avoid infinite recursion 