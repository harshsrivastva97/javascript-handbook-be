# Classes

JavaScript classes, introduced in ECMAScript 2015 (ES6), provide a cleaner and more intuitive syntax for creating objects and implementing inheritance. Under the hood, they still use JavaScript's prototype-based inheritance model.

## Class Basics

### Class Declaration

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

const alice = new Person('Alice', 28);
console.log(alice.greet()); // "Hello, my name is Alice and I am 28 years old."
```

### Class Expression

Classes can also be defined using expressions:

```javascript
// Unnamed class expression
const Person = class {
  constructor(name) {
    this.name = name;
  }
};

// Named class expression
const Employee = class EmployeeClass {
  constructor(name) {
    this.name = name;
  }
};
```

## Class Features

### Constructor Method

The `constructor` method is a special method that:
- Is called automatically when a new instance is created
- Initializes the object's properties
- Can accept arguments to set initial values

```javascript
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false; // Default value
  }
}
```

### Instance Methods

Instance methods are defined on the class prototype and are shared by all instances:

```javascript
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.isRunning = false;
  }
  
  start() {
    this.isRunning = true;
    return `${this.make} ${this.model} started`;
  }
  
  stop() {
    this.isRunning = false;
    return `${this.make} ${this.model} stopped`;
  }
}

const myCar = new Car('Toyota', 'Corolla');
console.log(myCar.start()); // "Toyota Corolla started"
```

### Static Methods

Static methods are called on the class itself, not on instances:

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
}

console.log(MathUtils.add(5, 3)); // 8
// This won't work: const math = new MathUtils(); math.add(5, 3);
```

### Getters and Setters

Getters and setters allow you to control access to properties:

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius; // Convention: underscore for "private" properties
  }
  
  // Getter
  get radius() {
    return this._radius;
  }
  
  // Setter
  set radius(value) {
    if (value <= 0) {
      throw new Error('Radius must be positive');
    }
    this._radius = value;
  }
  
  // Getter that calculates a value
  get area() {
    return Math.PI * this._radius * this._radius;
  }
}

const circle = new Circle(5);
console.log(circle.radius); // 5
console.log(circle.area); // 78.54...

circle.radius = 10;
console.log(circle.area); // 314.16...

// This will throw an error
// circle.radius = -5;
```

## Inheritance

### Extending Classes

The `extends` keyword creates a subclass that inherits from a parent class:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call the parent constructor
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks!`;
  }
  
  fetch() {
    return `${this.name} fetches the ball.`;
  }
}

const dog = new Dog('Rex', 'German Shepherd');
console.log(dog.name); // "Rex"
console.log(dog.breed); // "German Shepherd"
console.log(dog.speak()); // "Rex barks!"
console.log(dog.fetch()); // "Rex fetches the ball."
```

### The super Keyword

The `super` keyword is used to:
1. Call the parent class constructor: `super()`
2. Call parent class methods: `super.methodName()`

```javascript
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  
  getInfo() {
    return `${this.make} ${this.model}`;
  }
}

class ElectricVehicle extends Vehicle {
  constructor(make, model, batteryCapacity) {
    super(make, model); // Call parent constructor
    this.batteryCapacity = batteryCapacity;
  }
  
  getInfo() {
    // Call parent method and extend its functionality
    return `${super.getInfo()} - Battery: ${this.batteryCapacity} kWh`;
  }
}

const tesla = new ElectricVehicle('Tesla', 'Model 3', 75);
console.log(tesla.getInfo()); // "Tesla Model 3 - Battery: 75 kWh"
```

## Advanced Class Patterns

### Mixins

Mixins allow you to compose functionality from multiple sources:

```javascript
// Mixin for adding event handling capabilities
const EventMixin = {
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
    this._eventHandlers[eventName].push(handler);
  },
  
  off(eventName, handler) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) return;
    this._eventHandlers[eventName] = this._eventHandlers[eventName]
      .filter(h => h !== handler);
  },
  
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) return;
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};

// Apply mixin to a class
class User {
  constructor(name) {
    this.name = name;
  }
}

// Copy methods from mixin to class prototype
Object.assign(User.prototype, EventMixin);

// Usage
const user = new User('John');
user.on('login', () => console.log('User logged in'));
user.trigger('login'); // "User logged in"
```

### Factory Pattern with Classes

```javascript
class UserFactory {
  static createAdmin(name) {
    const user = new User(name);
    user.role = 'admin';
    user.permissions = ['read', 'write', 'delete'];
    return user;
  }
  
  static createGuest(name) {
    const user = new User(name);
    user.role = 'guest';
    user.permissions = ['read'];
    return user;
  }
}

class User {
  constructor(name) {
    this.name = name;
  }
  
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}

const admin = UserFactory.createAdmin('Alice');
console.log(admin.hasPermission('delete')); // true

const guest = UserFactory.createGuest('Bob');
console.log(guest.hasPermission('delete')); // false
```

### Singleton Pattern

```javascript
class Database {
  constructor(uri) {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.uri = uri;
    this.connected = false;
    Database.instance = this;
  }
  
  connect() {
    this.connected = true;
    console.log(`Connected to database at ${this.uri}`);
  }
  
  query(sql) {
    if (!this.connected) {
      throw new Error('Not connected to database');
    }
    console.log(`Executing query: ${sql}`);
  }
}

// Both variables reference the same instance
const db1 = new Database('mongodb://localhost:27017');
const db2 = new Database('another-uri'); // Ignored, returns existing instance

db1.connect();
db2.query('SELECT * FROM users'); // Works because db1 and db2 are the same instance
```

## Private Class Features

### Private Fields (ES2022)

Modern JavaScript supports truly private class fields using the `#` prefix:

```javascript
class BankAccount {
  #balance = 0; // Private field
  
  constructor(initialBalance) {
    if (initialBalance > 0) {
      this.#balance = initialBalance;
    }
  }
  
  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    if (amount > this.#balance) throw new Error('Insufficient funds');
    
    this.#balance -= amount;
    return this.#balance;
  }
  
  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount(100);
console.log(account.balance); // 100
account.deposit(50);
console.log(account.balance); // 150

// This will throw an error - private field is not accessible
// console.log(account.#balance);
```

### Private Methods (ES2022)

```javascript
class PaymentProcessor {
  #apiKey;
  
  constructor(apiKey) {
    this.#apiKey = apiKey;
  }
  
  processPayment(amount, currency) {
    const payload = this.#createPayload(amount, currency);
    return this.#sendRequest(payload);
  }
  
  // Private method
  #createPayload(amount, currency) {
    return {
      amount,
      currency,
      timestamp: Date.now()
    };
  }
  
  // Private method
  #sendRequest(payload) {
    console.log(`Sending payment request with API key: ${this.#apiKey}`);
    // Implementation details...
    return { success: true, id: 'payment_123' };
  }
}

const processor = new PaymentProcessor('secret_key_123');
processor.processPayment(100, 'USD');

// This will throw an error - private method is not accessible
// processor.#sendRequest({ amount: 100 });
```

## Classes vs. Constructor Functions

Classes are syntactic sugar over JavaScript's prototype-based inheritance:

```javascript
// Class syntax
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

// Equivalent constructor function
function PersonConstructor(name) {
  this.name = name;
}

PersonConstructor.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};
```

Key differences:
1. Classes are not hoisted (must be defined before use)
2. Class methods are non-enumerable by default
3. Class constructors must be called with `new`
4. Classes have better syntax for inheritance

## Best Practices

1. **Use PascalCase for class names**: `class UserProfile {}`
2. **Keep classes focused**: Follow the Single Responsibility Principle
3. **Prefer composition over inheritance**: Favor object composition for complex behaviors
4. **Use private fields for encapsulation**: Hide implementation details
5. **Initialize all properties in the constructor**: Makes the class structure clear
6. **Document class interfaces**: Use JSDoc comments to describe the class API
7. **Consider immutability**: Make objects immutable when possible
8. **Validate constructor inputs**: Ensure objects start in a valid state

## Summary

- Classes provide a cleaner syntax for object-oriented programming in JavaScript
- They support features like constructors, instance methods, static methods, and inheritance
- Modern JavaScript includes private fields and methods for better encapsulation
- Under the hood, classes use JavaScript's prototype-based inheritance
- Advanced patterns like mixins, factories, and singletons can be implemented with classes
- Best practices include proper naming, focused responsibilities, and good encapsulation 