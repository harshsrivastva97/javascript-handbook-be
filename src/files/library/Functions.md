# Functions

Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code that performs a specific task.

## Types of Functions

### Function Declaration

The most common way to define a function:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

- Hoisted (can be called before declaration)
- Creates a named function
- Has a function name that can be used for recursion

### Function Expression

Assigning a function to a variable:

```javascript
const sayHello = function(name) {
  return `Hello, ${name}!`;
};
```

- Not hoisted (can only be called after definition)
- Can be anonymous or named
- Often used for callbacks and higher-order functions

### Arrow Function

A more concise syntax introduced in ES6:

```javascript
const greetPerson = (name) => `Hello, ${name}!`;
```

- More compact syntax
- No `this` binding (inherits from parent scope)
- No `arguments` object
- Cannot be used as constructors
- Implicit return when no curly braces are used

### IIFE (Immediately Invoked Function Expression)

A function that runs as soon as it is defined:

```javascript
(function() {
  console.log('I run immediately!');
})();
```

- Executes immediately after creation
- Creates a private scope
- Avoids polluting the global namespace
- Useful for initialization code

---

## Function Parameters

### Default Parameters

Set default values for parameters:

```javascript
const greetWithDefault = (name = 'Guest') => `Hello, ${name}!`;
console.log(greetWithDefault());  // "Hello, Guest!"
```

### Rest Parameters

Collect multiple arguments into an array:

```javascript
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4));  // 10
```

### Parameter Destructuring

Extract properties from objects or arrays passed as parameters:

```javascript
function displayPerson({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

displayPerson({ name: 'Alice', age: 30 });  // "Alice is 30 years old"
```

---

## Advanced Function Concepts

### Higher-Order Functions

Functions that take other functions as arguments or return functions:

```javascript
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
console.log(double(5));  // 10
```

### Function Methods

Functions have built-in methods like `call`, `apply`, and `bind`:

```javascript
const person = {
  name: 'John',
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const anotherPerson = { name: 'Jane' };
console.log(person.greet.call(anotherPerson));  // "Hello, I'm Jane"
```

### Pure Functions

Functions that always return the same output for the same input and have no side effects:

```javascript
// Pure function
function add(a, b) {
  return a + b;
}

// Impure function (has side effect)
let total = 0;
function addToTotal(value) {
  total += value;
  return total;
}
```

---

## Best Practices

1. **Keep functions small and focused** on a single task
2. **Use descriptive function names** that explain what they do
3. **Limit the number of parameters** (ideally 3 or fewer)
4. **Return early** to avoid deep nesting
5. **Use arrow functions** for short, simple operations
6. **Avoid modifying parameters** within the function
7. **Prefer pure functions** when possible

---

## Summary

- Functions are first-class citizens in JavaScript
- They can be assigned to variables and passed as arguments
- JavaScript supports various function types with different characteristics
- Modern JavaScript features like arrow functions, default parameters, and rest parameters make functions more powerful and flexible
- Understanding function scope and closure is essential for advanced JavaScript programming 