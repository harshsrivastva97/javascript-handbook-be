# Prototypes

Prototypes are a fundamental concept in JavaScript that enables objects to inherit properties and methods from other objects. Understanding prototypes is essential for mastering JavaScript's object-oriented programming capabilities.

## What are Prototypes?

In JavaScript, every object has a hidden property called `[[Prototype]]` (also accessible via `__proto__`), which points to another object called its prototype. When you try to access a property or method that doesn't exist on an object, JavaScript automatically looks for it in the object's prototype, then in the prototype's prototype, and so on, forming what's known as the **prototype chain**.

```javascript
const animal = {
  eats: true,
  walk() {
    console.log('Animal walks');
  }
};

const rabbit = {
  jumps: true,
  __proto__: animal // Set animal as the prototype of rabbit
};

console.log(rabbit.eats); // true (inherited from animal)
rabbit.walk(); // "Animal walks" (method inherited from animal)
```

## The Prototype Chain

The prototype chain is a series of linked objects that allows JavaScript to implement inheritance. When you access a property, JavaScript:

1. Checks if the property exists on the current object
2. If not, checks the object's prototype
3. If not found, checks the prototype's prototype
4. Continues until it reaches an object with a `null` prototype (usually `Object.prototype`)
5. Returns `undefined` if the property is not found anywhere in the chain

```javascript
// Prototype chain example
const grandparent = { lastName: 'Smith' };
const parent = { firstName: 'John', __proto__: grandparent };
const child = { age: 5, __proto__: parent };

console.log(child.age); // 5 (own property)
console.log(child.firstName); // "John" (from parent)
console.log(child.lastName); // "Smith" (from grandparent)
console.log(child.address); // undefined (not in the prototype chain)
```

## Constructor Functions and Prototypes

Constructor functions provide a way to create multiple objects with the same structure and behavior. Each constructor function has a `prototype` property, which becomes the `[[Prototype]]` of objects created with that constructor.

```javascript
// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to the prototype
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old`);
};

// Creating instances
const alice = new Person('Alice', 30);
const bob = new Person('Bob', 25);

alice.greet(); // "Hello, my name is Alice and I'm 30 years old"
bob.greet(); // "Hello, my name is Bob and I'm 25 years old"

// Both instances share the same method
console.log(alice.greet === bob.greet); // true
```

## Prototype Methods vs. Instance Methods

There are two common ways to add methods to objects created with constructors:

1. **Instance Methods**: Defined inside the constructor, unique to each instance
2. **Prototype Methods**: Defined on the constructor's prototype, shared by all instances

```javascript
function Dog(name) {
  this.name = name;
  
  // Instance method - each dog gets its own copy
  this.bark = function() {
    console.log(`${this.name} says woof!`);
  };
}

// Prototype method - shared by all dogs
Dog.prototype.wagTail = function() {
  console.log(`${this.name} wags tail`);
};

const fido = new Dog('Fido');
const rex = new Dog('Rex');

fido.bark(); // "Fido says woof!"
rex.bark(); // "Rex says woof!"

fido.wagTail(); // "Fido wags tail"
rex.wagTail(); // "Rex wags tail"

// Instance methods are different for each instance
console.log(fido.bark === rex.bark); // false

// Prototype methods are shared
console.log(fido.wagTail === rex.wagTail); // true
```

## Checking and Modifying Prototypes

JavaScript provides several ways to work with prototypes:

### Checking Prototypes

```javascript
// Check if an object is in another object's prototype chain
console.log(Object.prototype.isPrototypeOf({})); // true
console.log(Array.prototype.isPrototypeOf([])); // true

// Get the prototype of an object
console.log(Object.getPrototypeOf({})); // Object.prototype
console.log(Object.getPrototypeOf([])); // Array.prototype

// Check if a property is an object's own property (not inherited)
const obj = { a: 1 };
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('toString')); // false (inherited)
```

### Setting Prototypes

```javascript
// Create an object with a specific prototype
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(rabbit.eats); // true

// Change an existing object's prototype (not recommended)
const dog = { barks: true };
const puppy = { cute: true };
Object.setPrototypeOf(puppy, dog); // Sets dog as puppy's prototype
console.log(puppy.barks); // true
```

## Prototypal Inheritance Patterns

### Classical Pattern

```javascript
// Parent constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

// Child constructor
function Bird(name, wingspan) {
  Animal.call(this, name); // Call parent constructor
  this.wingspan = wingspan;
}

// Set up inheritance
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird; // Fix the constructor property

// Add methods to child prototype
Bird.prototype.fly = function() {
  console.log(`${this.name} is flying with wingspan ${this.wingspan}`);
};

const eagle = new Bird('Eagle', '7ft');
eagle.eat(); // "Eagle is eating"
eagle.fly(); // "Eagle is flying with wingspan 7ft"
```

### Object.create Pattern

```javascript
// Base object
const vehiclePrototype = {
  init(name) {
    this.name = name;
  },
  drive() {
    console.log(`${this.name} is driving`);
  }
};

// Create a car object that inherits from vehiclePrototype
const car = Object.create(vehiclePrototype);
car.init('Car');
car.wheels = 4;
car.drive(); // "Car is driving"

// Create a motorcycle that inherits from vehiclePrototype
const motorcycle = Object.create(vehiclePrototype);
motorcycle.init('Motorcycle');
motorcycle.wheels = 2;
motorcycle.drive(); // "Motorcycle is driving"
```

## ES6 Classes and Prototypes

ES6 classes provide a more familiar syntax for creating objects and implementing inheritance, but they still use prototypes under the hood.

```javascript
// ES6 class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise`);
  }
}

// Inheritance with extends
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
  
  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // "Rex barks"
dog.fetch(); // "Rex fetches the ball"

// Under the hood, this is still prototypal inheritance
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
```

## Native Object Prototypes

JavaScript's built-in objects like Array, String, and Object have their own prototypes with useful methods. You can extend these prototypes, but it's generally not recommended (known as "monkey patching").

```javascript
// Using native prototype methods
const arr = [1, 2, 3];
console.log(arr.map(x => x * 2)); // [2, 4, 6]

// Extending native prototypes (not recommended)
Array.prototype.sum = function() {
  return this.reduce((total, num) => total + num, 0);
};

console.log([1, 2, 3].sum()); // 6
```

## Prototype Performance Considerations

Prototypes can improve memory efficiency since methods are shared across instances rather than duplicated:

```javascript
// Without prototypes - each instance gets its own methods
function BadCar(model) {
  this.model = model;
  this.drive = function() { console.log(`Driving ${this.model}`); };
  this.brake = function() { console.log(`Braking ${this.model}`); };
}

// With prototypes - methods are shared
function GoodCar(model) {
  this.model = model;
}
GoodCar.prototype.drive = function() { console.log(`Driving ${this.model}`); };
GoodCar.prototype.brake = function() { console.log(`Braking ${this.model}`); };

// Creating 1000 instances of each
const badCars = Array(1000).fill().map(() => new BadCar('Tesla'));
const goodCars = Array(1000).fill().map(() => new GoodCar('Tesla'));

// The GoodCar approach uses significantly less memory
// because all 1000 instances share the same methods
```

## Common Pitfalls and Best Practices

### Pitfalls

1. **Modifying Object.prototype**: Can cause unexpected behavior in loops and other code
2. **Forgetting to set constructor**: When setting up inheritance, remember to reset the constructor property
3. **Prototype pollution**: Security vulnerability where attackers modify Object.prototype

### Best Practices

1. **Use ES6 classes** for cleaner syntax when possible
2. **Prefer composition over inheritance** for more flexible code
3. **Don't modify built-in prototypes** in production code
4. **Use Object.create(null)** for "pure" dictionaries with no prototype
5. **Understand that class syntax is just syntactic sugar** for prototypal inheritance

## Summary

- Prototypes are JavaScript's mechanism for inheritance
- Every object has a prototype, accessible via `__proto__` or `Object.getPrototypeOf()`
- The prototype chain allows objects to inherit properties and methods
- Constructor functions use their `prototype` property to share methods across instances
- ES6 classes provide a cleaner syntax but still use prototypes under the hood
- Prototypes improve memory efficiency by sharing methods across instances
- Understanding prototypes is essential for mastering JavaScript's object-oriented capabilities 