# Objects

Objects are collections of key-value pairs and form the foundation of JavaScript. They allow you to store related data and functionality together.

## Creating Objects

There are several ways to create objects in JavaScript:

### Object Literal

The most common way to create objects:

```javascript
const person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};
```

### Constructor Function

Create objects using a function with the `new` keyword:

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return `Hello, I'm ${this.name}`;
  };
}

const john = new Person('John', 30);
```

### Object.create()

Create objects with a specific prototype:

```javascript
const personProto = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const john = Object.create(personProto);
john.name = 'John';
john.age = 30;
```

### ES6 Classes

A more modern syntax for creating objects:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const john = new Person('John', 30);
```

---

## Working with Objects

### Accessing Properties

```javascript
// Dot notation
console.log(person.name);

// Bracket notation (useful for dynamic keys)
const key = 'name';
console.log(person[key]);
```

### Adding and Modifying Properties

```javascript
// Adding new properties
person.country = 'USA';

// Modifying existing properties
person.age = 31;
```

### Deleting Properties

```javascript
delete person.age;
```

### Checking if a Property Exists

```javascript
// Using in operator
console.log('name' in person); // true

// Using hasOwnProperty (ignores prototype chain)
console.log(person.hasOwnProperty('name')); // true
```

---

## Object Methods and Properties

### Object.keys()

Returns an array of a given object's own enumerable property names:

```javascript
const keys = Object.keys(person); // ['name', 'age', 'country']
```

### Object.values()

Returns an array of a given object's own enumerable property values:

```javascript
const values = Object.values(person); // ['John', 31, 'USA']
```

### Object.entries()

Returns an array of a given object's own enumerable property [key, value] pairs:

```javascript
const entries = Object.entries(person);
// [['name', 'John'], ['age', 31], ['country', 'USA']]
```

### Object.assign()

Copies all enumerable own properties from one or more source objects to a target object:

```javascript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
// result and target are both { a: 1, b: 3, c: 4 }
```

---

## Advanced Object Concepts

### Property Descriptors

Configure property behavior using `Object.defineProperty()`:

```javascript
Object.defineProperty(person, 'id', {
  value: 1,
  writable: false,      // Can't be changed
  enumerable: true,     // Shows up in loops
  configurable: false   // Can't be deleted or reconfigured
});
```

### Getters and Setters

Create computed properties with custom access:

```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
};

console.log(person.fullName); // "John Doe"
person.fullName = 'Jane Smith';
console.log(person.firstName); // "Jane"
```

### Object Destructuring

Extract multiple properties from an object:

```javascript
const { name, age } = person;
console.log(name, age); // "John" 31

// With default values
const { country = 'Unknown' } = person;

// Renaming variables
const { name: personName } = person;
```

### Spread Operator

Create a shallow copy or merge objects:

```javascript
// Copy an object
const personCopy = { ...person };

// Merge objects
const enhanced = { ...person, country: 'USA', age: 32 };
```

---

## Best Practices

1. **Use object literals** for simple objects
2. **Use classes** for complex objects with methods
3. **Avoid modifying built-in prototypes**
4. **Use computed property names** for dynamic keys
5. **Use shorthand syntax** for cleaner code
6. **Prefer dot notation** for better readability
7. **Use destructuring** to extract multiple properties

---

## Summary

- Objects store properties and methods
- Properties can be accessed using dot or bracket notation
- Objects are reference types (passed by reference)
- Modern JavaScript provides powerful methods for working with objects
- Object destructuring and spread syntax simplify common operations
- Properties can be configured using descriptors for fine-grained control 