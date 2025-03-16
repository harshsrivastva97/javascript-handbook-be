# Variables

JavaScript provides three ways to declare variables, each with distinct characteristics and use cases.

## var

- Function-scoped or globally-scoped
- Can be redeclared and updated
- Hoisted with initial value undefined
- Not block-scoped

## let

- Block-scoped
- Can be updated but not redeclared in same scope
- Hoisted but not initialized (Temporal Dead Zone)
- Introduced in ES6

## const

- Block-scoped
- Cannot be updated or redeclared
- Must be initialized at declaration
- Objects and arrays are still mutable

---

## Examples

```javascript
// var example
var x = 1;
if (true) {
    var x = 2;  // same variable
}
console.log(x);  // 2

// let example
let y = 1;
if (true) {
    let y = 2;  // different variable
    console.log(y);  // 2
}
console.log(y);  // 1

// const example
const obj = { count: 0 };
obj.count = 1;  // OK - object is mutable
console.log(obj.count);  // 1

// This will throw error:
// obj = { count: 2 };  // Error - reassignment not allowed
```

---

## Best Practices

1. **Use `const` by default** for better code stability
2. **Use `let` when variable needs to be reassigned**
3. **Avoid `var` in modern JavaScript**
4. Block scope provides better encapsulation
5. Remember that `const` prevents reassignment but not mutation
6. Be aware of the Temporal Dead Zone with `let` and `const`
7. Understanding scope prevents unexpected behavior

---

## Scope in JavaScript

### Global Scope
Variables declared outside any function or block have global scope and can be accessed from anywhere in the code.

### Function Scope
Variables declared within a function can only be accessed within that function.

```javascript
function example() {
    var functionScoped = "I'm function scoped";
    console.log(functionScoped); // Accessible
}

// console.log(functionScoped); // ReferenceError
```

### Block Scope
Variables declared with `let` and `const` within a block (denoted by curly braces) are only accessible within that block.

```javascript
if (true) {
    let blockScoped = "I'm block scoped";
    const alsoBlockScoped = "Me too";
    console.log(blockScoped); // Accessible
}

// console.log(blockScoped); // ReferenceError
```

---

## Temporal Dead Zone (TDZ)

The TDZ is a behavior that occurs with variables declared using `let` and `const`. It refers to the period between entering a scope and the actual declaration being processed.

```javascript
console.log(varVariable); // undefined (hoisted)
// console.log(letVariable); // ReferenceError (TDZ)

var varVariable = "I'm var";
let letVariable = "I'm let";
```

---

## Summary

- Choose the right variable declaration based on your needs
- Understand the scoping rules to prevent bugs
- Follow modern JavaScript practices by preferring `const` and `let` over `var`
- Remember that block scoping provides better code organization and reduces errors
