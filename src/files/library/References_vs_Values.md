# References vs Values

Understanding how JavaScript handles primitive and reference types is crucial for writing bug-free code. Primitive types are passed by value, while objects are passed by reference.

## Primitive vs Reference Types

### Primitive Types
- Number
- String
- Boolean
- Null
- Undefined
- Symbol
- BigInt

### Reference Types
- Object
- Array
- Function
- Date
- RegExp
- Map, Set, WeakMap, WeakSet

## Key Differences

### 1. Memory Allocation

**Primitive Types:**
- Stored directly in the variable's location in memory (stack)
- Fixed size, simple values

**Reference Types:**
- Variable stores a reference (pointer) to the location in memory (heap)
- Dynamic size, complex structures

### 2. Copying Behavior

**Primitive Types (Pass by Value):**
```javascript
// Primitive Types (Pass by Value)
let a = 5;
let b = a;  // Copy of value
b = 10;
console.log(a);  // Still 5
console.log(b);  // 10
```

**Reference Types (Pass by Reference):**
```javascript
// Reference Types (Pass by Reference)
let obj1 = { name: 'John' };
let obj2 = obj1;  // Reference to same object
obj2.name = 'Jane';
console.log(obj1.name);  // 'Jane'
console.log(obj2.name);  // 'Jane'
```

### 3. Comparison Behavior

**Primitive Types:**
- Compared by value

```javascript
console.log(5 === 5);              // true
console.log('hello' === 'hello');  // true
```

**Reference Types:**
- Compared by reference (memory address)

```javascript
console.log({} === {});            // false (different objects)
console.log([] === []);            // false (different arrays)
console.log(obj1 === obj2);        // true (same reference)
```

## Copying Objects

### Shallow Copy

Creates a new object with copies of the top-level properties, but nested objects are still shared references.

```javascript
// Shallow copy using spread operator
const shallow = { ...obj1 };

// Shallow copy using Object.assign()
const shallow2 = Object.assign({}, obj1);

// Shallow copy of arrays
const arr = [1, 2, {a: 1}];
const arrCopy = [...arr];
```

### Deep Copy

Creates a completely independent copy with no shared references.

```javascript
// Deep copy using JSON (with limitations)
const deep = JSON.parse(JSON.stringify(obj1));

// Deep copy using structuredClone (modern browsers)
const deepClone = structuredClone(obj1);

// Deep copy using libraries like lodash
const deepCopy = _.cloneDeep(obj1);
```

## Common Pitfalls

### Function Arguments

```javascript
function updateUser(user) {
  // This modifies the original object
  user.name = 'Updated';
}

const user = { name: 'Original' };
updateUser(user);
console.log(user.name);  // 'Updated'
```

### Array Methods

```javascript
const numbers = [1, 2, 3];

// Mutable methods (modify original)
numbers.push(4);
numbers.splice(0, 1);

// Immutable methods (return new array)
const doubled = numbers.map(n => n * 2);
const filtered = numbers.filter(n => n > 2);
```

### Nested Objects in State

```javascript
// React state example
const [user, setUser] = useState({ name: 'John', settings: { theme: 'dark' } });

// Incorrect update (mutation)
user.settings.theme = 'light';
setUser(user);  // Won't trigger re-render

// Correct update (new reference)
setUser({
  ...user,
  settings: {
    ...user.settings,
    theme: 'light'
  }
});
```

## Best Practices

1. **Treat primitive values as immutable**
2. **Create new objects/arrays instead of mutating existing ones**
3. **Use spread operator or Object.assign() for shallow copies**
4. **Be aware of nested objects when copying**
5. **Use immutable data patterns in frameworks like React**
6. **Consider using immutable.js or immer for complex state**

## Summary

- Primitive types are copied by value
- Reference types are copied by reference
- Understanding this distinction prevents common bugs
- Comparison behavior differs between types
- Creating proper copies requires understanding shallow vs deep copying
- Immutable programming patterns help avoid unexpected side effects 