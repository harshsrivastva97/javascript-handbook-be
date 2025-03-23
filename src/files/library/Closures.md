# Closures

A **closure** is a feature in JavaScript where an inner function has access to variables from its outer (enclosing) function scope, even after the outer function has executed.

Simply put:

- Closures allow functions to access and manipulate variables defined in their lexical scope.
- They help with encapsulation and state management.

---

## Example

```javascript
function outerFunction() {
    let message = "Hello, Closure!";

    function innerFunction() {
        console.log(message); // Accesses outer function's variable
    }

    return innerFunction;
}

const myClosure = outerFunction();
myClosure(); // Output: Hello, Closure!
```

In the above code:

- `innerFunction` retains access to `message`, even after `outerFunction` has finished executing.
---
### Most asked
```javascript
function counter() {
    let count = 0;

    return function increment() {
        count++;
        return count;
    }
}

const myCounter = counter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2
```
---
### 1. What are the advantages of closures?

- **Data privacy**: Variables are encapsulated and can't be accessed from outside directly.
- **State maintenance**: They can maintain the state between executions.

### 2. What is a closure scope chain?

The closure scope chain defines how JavaScript searches for a variable:

- It starts with its own scope.
- Moves outward to its parent scopes.
- Reaches the global scope if needed.

---

## Practical Use Cases of Closures

### 1. Function Factories

Closures allow creating specialized functions dynamically:

```javascript
function multiplyBy(factor) {
    return function(num) {
        return num * factor;
    }
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 2. Private Variables

Implement encapsulation by making variables private:

```javascript
function createPerson(name) {
    let age = 0;

    return {
        getName: function() {
            return name;
        },
        incrementAge: function() {
            age++;
            return age;
        }
    };
}

const person = createPerson('Alice');
console.log(person.getName()); // Alice
console.log(person.incrementAge()); // 1
```

### 3. Memoization (Caching)

Optimization technique using closures:

```javascript
function memoizedAdd() {
    const cache = {};

    return function(a, b) {
        const key = `${a},${b}`;

        if (cache[key]) {
            return cache[key];
        }

        const result = a + b;
        cache[key] = result;
        return result;
    }
}

const add = memoizedAdd();
console.log(add(3, 5)); // 8
console.log(add(3, 5)); // Cached: 8
```

---

## Important Interview Concepts

### 1. Closure & Loop Problem

Common pitfall:

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// Outputs: 3, 3, 3
```

**Fix using closures:**

```javascript
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, 1000);
    })(i);
}
// Outputs: 0, 1, 2
```

Alternatively, use `let`:

```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// Outputs: 0, 1, 2
```

### 2. Garbage Collection and Closures

Closures keep outer variables alive (preventing garbage collection), until they are no longer referenced.

---

## Summary: Key Points

- A closure is created every time a function is defined within another function.
- Closures help in encapsulation, privacy, and maintaining state.
- Common use cases include function factories, private variables, and caching.

Understanding closures deeply boosts JavaScript coding skills and is essential for establishing a strong base for the language.

