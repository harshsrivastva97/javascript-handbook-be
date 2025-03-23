# JavaScript Data Types

JavaScript is a dynamically typed language that provides several built-in data types to store and manipulate different kinds of values. Understanding these types is essential for writing effective JavaScript code.

## Primitive Types

### String
Represents textual data enclosed in quotes.

```javascript
// String creation methods
const doubleQuoted = "Hello World";
const singleQuoted = 'JavaScript';
const templateLiteral = `Value: ${doubleQuoted}`;

// Common string operations
const length = doubleQuoted.length;        // 11
const substring = doubleQuoted.slice(0, 5); // "Hello"
const upperCase = doubleQuoted.toUpperCase(); // "HELLO WORLD"
const split = doubleQuoted.split(" ");     // ["Hello", "World"]
```

### Number
Represents numeric values using IEEE 754 standard (64-bit floating-point).

```javascript
// Number formats
const integer = 42;
const float = 3.14159;
const scientific = 5e3;                  // 5000
const hexadecimal = 0xFF;                // 255
const binary = 0b1010;                   // 10
const octal = 0o744;                     // 484

// Special number values
const infinity = Infinity;
const negInfinity = -Infinity;
const notANumber = NaN;

// Number methods
const rounded = (3.14159).toFixed(2);    // "3.14"
const precise = (1234.5678).toPrecision(4); // "1235"
```

### Boolean
Represents logical values: true or false.

```javascript
const isActive = true;
const isComplete = false;

// Boolean operations
const andOperation = isActive && isComplete;  // false
const orOperation = isActive || isComplete;   // true
const notOperation = !isActive;               // false
```

### Null
Represents the intentional absence of any object value.

```javascript
const emptyValue = null;

// Checking for null
const isNull = emptyValue === null;      // true
```

### Undefined
Represents a variable that has been declared but not assigned a value.

```javascript
let notDefined;
const param = (function(a) { return a; })();

// Checking for undefined
const isUndefined = typeof notDefined === 'undefined';  // true
const isParamUndefined = param === undefined;           // true
```

### Symbol
Represents a unique and immutable identifier (introduced in ES6).

```javascript
const uniqueKey = Symbol('description');
const anotherKey = Symbol('description');

// Symbols are always unique
const areEqual = uniqueKey === anotherKey;  // false

// Using symbols as object keys
const obj = {
  [uniqueKey]: 'This property is accessed via symbol'
};
console.log(obj[uniqueKey]);  // "This property is accessed via symbol"
```

### BigInt
Represents integers with arbitrary precision (introduced in ES2020).

```javascript
const bigNumber = BigInt("9007199254740991");

// Operations with BigInt
const sum = bigNumber + 1n;  // 9007199254740992n
const mixed = bigNumber + BigInt(10);  // 9007199254741001n
```

## Reference Types

### Object
Represents a collection of key-value pairs.

```javascript
// Object creation
const person = {
  name: "John",
  age: 30,
  isEmployed: true,
  skills: ["JavaScript", "HTML", "CSS"],
  greet: function() {
    return `Hello, my name is ${this.name}`;
  }
};

// Accessing properties
console.log(person.name);        // "John"
console.log(person["age"]);      // 30
console.log(person.greet());     // "Hello, my name is John"

// Object methods
const keys = Object.keys(person);  // ["name", "age", "isEmployed", "skills", "greet"]
const hasName = person.hasOwnProperty("name");  // true
```

### Array
Represents an ordered list of values.

```javascript
// Array creation
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", { three: 3 }, [4]];

// Array methods
const mapped = numbers.map(n => n * 2);      // [2, 4, 6, 8, 10]
const filtered = numbers.filter(n => n > 2); // [3, 4, 5]
const found = numbers.find(n => n > 3);      // 4
const reduced = numbers.reduce((sum, n) => sum + n, 0); // 15

// Array properties
const length = numbers.length;  // 5
```

### Function
Represents reusable blocks of code.

```javascript
// Function declarations
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expressions
const multiply = function(a, b) {
  return a * b;
};

// Arrow functions
const add = (a, b) => a + b;

// Functions as first-class citizens
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
console.log(operations.add(5, 3));  // 8
```

## Type Checking

```javascript
// Using typeof operator
console.log(typeof "Hello");           // "string"
console.log(typeof 42);                // "number"
console.log(typeof true);              // "boolean"
console.log(typeof undefined);         // "undefined"
console.log(typeof null);              // "object" (historical bug)
console.log(typeof {});                // "object"
console.log(typeof []);                // "object"
console.log(typeof function(){});      // "function"

// Better array checking
console.log(Array.isArray([]));        // true
console.log(Array.isArray({}));        // false

// Precise type checking
console.log(Object.prototype.toString.call([]));  // "[object Array]"
console.log(Object.prototype.toString.call({}));  // "[object Object]"
```

## Type Coercion

JavaScript automatically converts types when operations involve different types.

### Explicit Coercion

```javascript
// Intentional type conversion
const numFromString = Number("42");      // 42
const stringFromNum = String(42);        // "42"
const boolFromValue = Boolean(1);        // true
```

### Implicit Coercion

```javascript
// Automatic type conversion
console.log("2" + 3);                    // "23" (number converted to string)
console.log("2" - 3);                    // -1 (string converted to number)
console.log(true + 1);                   // 2 (boolean converted to number)
console.log(5 == "5");                   // true (loose equality with coercion)
console.log(5 === "5");                  // false (strict equality, no coercion)
```

## Common Pitfalls

### 1. Equality Comparisons

```javascript
// Loose equality can lead to unexpected results
console.log(0 == "");                    // true
console.log(0 == "0");                   // true
console.log(false == "0");               // true

// Strict equality is more predictable
console.log(0 === "");                   // false
console.log(0 === "0");                  // false
console.log(false === "0");              // false
```

### 2. Type Checking Issues

```javascript
// Common type checking mistakes
console.log(typeof null);                // "object" (not "null")
console.log(typeof NaN);                 // "number" (despite meaning "Not a Number")
console.log(typeof []);                  // "object" (not "array")

// Better alternatives
console.log(Object.is(NaN, NaN));        // true
console.log(Array.isArray([]));          // true
console.log(value === null);             // direct null check
```

### 3. Number Precision

```javascript
// Floating point precision issues
console.log(0.1 + 0.2);                  // 0.30000000000000004 (not exactly 0.3)
console.log(0.1 + 0.2 === 0.3);          // false

// Solutions
console.log(Math.round((0.1 + 0.2) * 1000) / 1000); // 0.3
console.log(Number((0.1 + 0.2).toFixed(1)));        // 0.3
```

## Best Practices

1. **Use strict equality operators** (`===` and `!==`) to avoid unexpected type coercion
2. **Explicitly convert types** when needed rather than relying on implicit coercion
3. **Be careful with `typeof`** especially for `null` and arrays
4. **Consider TypeScript** for static type checking in large applications
5. **Use appropriate methods** for type checking (`Array.isArray()`, `Number.isNaN()`)
6. **Understand primitive vs reference types** for proper comparisons and operations
7. **Leverage modern ES6+ features** like template literals and destructuring
8. **Be aware of truthy/falsy values** in conditional statements

## Summary

JavaScript's type system includes:
- 7 primitive types: String, Number, Boolean, Null, Undefined, Symbol, BigInt
- Reference types: Object, Array, Function, Date, RegExp, Map, Set, etc.
- Dynamic typing that allows variables to change types
- Type coercion that automatically converts between types
- Prototype-based inheritance for objects
- First-class functions that can be treated as values 