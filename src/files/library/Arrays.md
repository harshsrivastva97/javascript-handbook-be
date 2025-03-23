# Arrays

Arrays are ordered collections of values and one of JavaScript's most versatile data structures. They provide powerful methods for data manipulation, iteration, and transformation.

## Creating Arrays

There are several ways to create arrays in JavaScript:

```javascript
// Array literal (most common)
const fruits = ['apple', 'banana', 'orange'];

// Array constructor
const numbers = new Array(1, 2, 3, 4);

// Array.of() method
const items = Array.of('a', 'b', 'c');

// Array.from() method (creates from array-like or iterable objects)
const characters = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
```

## Basic Array Operations

### Accessing Elements

```javascript
const fruits = ['apple', 'banana', 'orange'];

// Access by index (zero-based)
console.log(fruits[0]); // 'apple'

// Get the last element
console.log(fruits[fruits.length - 1]); // 'orange'
// Or using at() method (ES2022)
console.log(fruits.at(-1)); // 'orange'
```

### Adding and Removing Elements

```javascript
const arr = [1, 2, 3];

// Add to end
arr.push(4);           // [1, 2, 3, 4]

// Add to beginning
arr.unshift(0);        // [0, 1, 2, 3, 4]

// Remove from end
const last = arr.pop();     // [0, 1, 2, 3], last = 4

// Remove from beginning
const first = arr.shift();  // [1, 2, 3], first = 0

// Add/remove at specific position
arr.splice(1, 1);      // [1, 3] (removed 1 element at index 1)
arr.splice(1, 0, 2);   // [1, 2, 3] (added 2 at index 1)
```

## Array Methods

### Transformation Methods

These methods create new arrays without modifying the original:

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(x => x * 2);        // [2, 4, 6, 8, 10]

// filter - keep elements that pass a test
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]

// reduce - accumulate values
const sum = numbers.reduce((total, current) => total + current, 0); // 15

// flat - flatten nested arrays
const nested = [1, [2, 3], [4, [5]]];
const flattened = nested.flat(2);  // [1, 2, 3, 4, 5]

// flatMap - map then flatten
const pairs = [1, 2, 3];
const pairsAndDoubles = pairs.flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
```

### Search and Comparison Methods

```javascript
const fruits = ['apple', 'banana', 'orange', 'apple'];

// indexOf - find first index of an element
console.log(fruits.indexOf('apple'));      // 0

// lastIndexOf - find last index of an element
console.log(fruits.lastIndexOf('apple'));  // 3

// includes - check if array contains an element
console.log(fruits.includes('banana'));    // true

// find - get first element that passes a test
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(x => x > 10);   // 12

// findIndex - get index of first element that passes a test
const index = numbers.findIndex(x => x > 10); // 1

// some - check if at least one element passes a test
const hasLargeNumber = numbers.some(x => x > 100); // true

// every - check if all elements pass a test
const allPositive = numbers.every(x => x > 0);     // true
```

### Sorting and Reversing

```javascript
const fruits = ['banana', 'apple', 'orange'];

// sort - sorts elements in place
fruits.sort();  // ['apple', 'banana', 'orange']

// reverse - reverses order in place
fruits.reverse(); // ['orange', 'banana', 'apple']

// Custom sort (numbers)
const numbers = [40, 1, 5, 200];
numbers.sort((a, b) => a - b);  // [1, 5, 40, 200]
```

## Modern Array Features

### Array Destructuring

Extract values into variables:

```javascript
const rgb = [255, 100, 50];
const [red, green, blue] = rgb;
console.log(red, green, blue);  // 255 100 50

// Skip elements
const [first, , third] = rgb;   // first = 255, third = 50

// Rest pattern
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);  // 1 [2, 3, 4]
```

### Spread Operator

Expand arrays into individual elements:

```javascript
// Combine arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4]

// Copy arrays
const copy = [...arr1];  // [1, 2]

// Convert iterable to array
const str = "hello";
const chars = [...str];  // ['h', 'e', 'l', 'l', 'o']
```

### Array.from() and Array.of()

Create arrays from various sources:

```javascript
// From array-like objects
const divs = document.querySelectorAll('div');
const divsArray = Array.from(divs);

// With mapping function
const numbers = Array.from({length: 5}, (_, i) => i + 1);  // [1, 2, 3, 4, 5]

// Array.of creates array with exact arguments
const arr = Array.of(5);  // [5] (not an array of length 5)
```

## Iteration Methods

```javascript
const items = ['a', 'b', 'c'];

// forEach - execute function for each element
items.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});

// for...of - iterate over values
for (const item of items) {
  console.log(item);
}

// entries() - iterate over [index, value] pairs
for (const [index, value] of items.entries()) {
  console.log(`${index}: ${value}`);
}
```

## Best Practices

1. **Use array methods** instead of loops when possible
2. **Chain methods** for complex operations
3. **Prefer immutable methods** (map, filter, reduce) for predictable code
4. **Be careful with sort()** as it converts elements to strings by default
5. **Use destructuring and spread** for cleaner code
6. **Consider performance** for large arrays (avoid unnecessary iterations)
7. **Use typed arrays** for binary data and performance-critical operations

## Summary

- Arrays in JavaScript are versatile and powerful
- Modern array methods can be chained for complex operations
- Many methods return new arrays (immutable operations)
- Some methods modify the original array (mutable operations)
- Arrays have dynamic length and can store any type of data
- ES6+ features like destructuring and spread make array manipulation easier 