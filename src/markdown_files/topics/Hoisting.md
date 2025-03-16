# Hoisting

Hoisting is JavaScript's default behavior of moving declarations to the top of the scope during the compilation phase.

## What is Hoisting?

In JavaScript, before code execution, the JavaScript engine goes through the code and:
1. Allocates memory for variables and functions
2. Moves declarations to the top of their scope

This behavior is known as "hoisting" - it's as if declarations are physically moved to the top, although they aren't actually moved in the code.

## Variable Hoisting

### var Variables

Variables declared with `var` are hoisted and initialized with `undefined`:

```javascript
console.log(myVar); // undefined
var myVar = 'Hoisted';
console.log(myVar); // 'Hoisted'

// The above code behaves as if written:
var myVar = undefined; // Hoisted declaration
console.log(myVar); // undefined
myVar = 'Hoisted';  // Assignment stays in place
console.log(myVar); // 'Hoisted'
```

### let and const Variables

Variables declared with `let` and `const` are hoisted but not initialized - they remain in the "Temporal Dead Zone" until their declaration:

```javascript
// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 'Not accessible';

// console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
const myConst = 'Not accessible';
```

## Function Hoisting

### Function Declarations

Function declarations are fully hoisted - both the declaration and definition:

```javascript
console.log(myFunc()); // "Hoisted function"

function myFunc() {
  return 'Hoisted function';
}
```

### Function Expressions

Function expressions are not hoisted (or only the variable declaration is hoisted, not the function assignment):

```javascript
// console.log(myFuncExpression()); // TypeError: myFuncExpression is not a function

var myFuncExpression = function() {
  return 'Not hoisted';
};

// With let/const, you get a ReferenceError instead
// console.log(myArrowFunc()); // ReferenceError: Cannot access 'myArrowFunc' before initialization

const myArrowFunc = () => 'Not hoisted';
```

## Class Hoisting

Similar to `let` and `const`, class declarations are hoisted but remain uninitialized:

```javascript
// const p = new Person(); // ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor() {
    this.name = 'John';
  }
}
```

## Practical Implications

### 1. Order of Code

Hoisting can lead to unexpected behavior if you're not aware of it:

```javascript
var x = 1;

function example() {
  console.log(x); // undefined, not 1
  var x = 2;
  console.log(x); // 2
}

example();
```

### 2. Best Practices

To avoid confusion:

- Always declare variables at the top of their scope
- Use `let` and `const` instead of `var` to make temporal dead zone errors explicit
- Declare functions before using them
- Be consistent with function declaration styles

## The Temporal Dead Zone (TDZ)

The TDZ is the period between entering scope and the actual declaration being processed:

```javascript
{
  // TDZ starts for x
  const y = 20;
  console.log(y); // 20
  
  // console.log(x); // ReferenceError: Cannot access 'x' before initialization
  
  const x = 10; // TDZ ends for x
  console.log(x); // 10
}
```

## Common Interview Questions

### 1. What will be logged?

```javascript
console.log(x);
var x = 5;
```
Answer: `undefined` (var is hoisted but initialized as undefined)

### 2. What will be logged?

```javascript
foo();
function foo() {
  console.log('Hello');
}
```
Answer: `'Hello'` (function declarations are fully hoisted)

### 3. What will be logged?

```javascript
var x = 10;
function test() {
  console.log(x);
  var x = 20;
}
test();
```
Answer: `undefined` (local x is hoisted within the function scope)

## Summary

- Function declarations are fully hoisted
- Variables declared with `var` are hoisted and initialized as `undefined`
- Variables declared with `let` and `const` are hoisted but not initialized (TDZ)
- Understanding hoisting helps prevent bugs and write more predictable code
- Modern JavaScript practice favors `let` and `const` over `var` to make hoisting behavior more explicit 