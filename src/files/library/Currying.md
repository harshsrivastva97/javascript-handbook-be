# Currying

Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. This functional programming technique enables partial application, composition, and specialized function creation.

## Core Concept

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Usage
add(1, 2, 3);           // 6
curriedAdd(1)(2)(3);    // 6
```

## ES6 Arrow Function Syntax

```javascript
// Concise curried function with arrow syntax
const curriedAdd = a => b => c => a + b + c;

// Usage
const add5 = curriedAdd(5);    // Function waiting for two more args
const add5and10 = add5(10);    // Function waiting for one more arg
add5and10(15);                 // 30
```

## Implementing Curry Function

```javascript
// Generic curry function for any arity
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// Usage
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

curriedSum(1)(2)(3);    // 6
curriedSum(1, 2)(3);    // 6
curriedSum(1)(2, 3);    // 6
curriedSum(1, 2, 3);    // 6
```

## Practical Applications

### 1. Partial Application

```javascript
// Create specialized functions from general ones
const multiply = (a, b) => a * b;
const curriedMultiply = a => b => a * b;

const double = curriedMultiply(2);
const triple = curriedMultiply(3);

double(5);  // 10
triple(5);  // 15
```

### 2. Function Composition

```javascript
// Compose functions with currying
const compose = f => g => x => f(g(x));

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double)(addOne);
const doubleThenAddOne = compose(addOne)(double);

addOneThenDouble(3);  // (3 + 1) * 2 = 8
doubleThenAddOne(3);  // (3 * 2) + 1 = 7
```

### 3. Point-Free Programming

```javascript
// Avoid specifying arguments with currying
const map = curry((fn, arr) => arr.map(fn));
const filter = curry((predicate, arr) => arr.filter(predicate));

const getNames = map(user => user.name);
const getAdults = filter(user => user.age >= 18);

// Usage
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
];

getNames(users);    // ['Alice', 'Bob', 'Charlie']
getAdults(users);   // [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]
```

### 4. Event Handling

```javascript
// Create specialized event handlers
const handleEvent = curry((eventType, handler, element) => {
  element.addEventListener(eventType, handler);
  return element;
});

const handleClick = handleEvent('click');
const handleHover = handleEvent('mouseover');

const showAlert = () => alert('Clicked!');
const logHover = () => console.log('Hovering!');

// Apply to multiple elements
const buttons = document.querySelectorAll('button');
buttons.forEach(handleClick(showAlert));
```

## Interview Focus Points

1. **Currying vs. Partial Application**:
   - Currying: Transforms a function of N args into N functions of 1 arg
   - Partial Application: Fixes some arguments, returns function expecting remaining args

2. **Benefits**:
   - Creates specialized functions from general ones
   - Enables function composition
   - Improves code reusability
   - Supports point-free programming style

3. **Limitations**:
   - Can reduce readability for those unfamiliar with functional programming
   - Performance overhead from multiple function calls
   - Not ideal for functions with variable arguments

4. **Implementation Details**:
   - Closure is used to remember previous arguments
   - Recursion often used in generic curry implementations
   - Arity (number of arguments) matters for implementation

## Best Practices

1. **Use meaningful names** for intermediate curried functions.
2. **Document the expected argument order** clearly.
3. **Consider using libraries** like Lodash/Ramda for robust implementations.
4. **Balance readability with functional purity**.
5. **Use arrow functions** for concise curried functions.

## Real-World Examples

### Functional Libraries
```javascript
// Ramda example
import { curry } from 'ramda';

const formatName = curry((prefix, firstName, lastName) => 
  `${prefix}. ${firstName} ${lastName}`);

const formatMr = formatName('Mr');
const formatDr = formatName('Dr');

formatMr('John', 'Doe');     // 'Mr. John Doe'
formatDr('Jane', 'Smith');   // 'Dr. Jane Smith'
```

### React Components
```javascript
// Higher-order component with currying
const withStyles = styles => Component => props => 
  <Component {...props} styles={styles} />;

const withAuthentication = authFn => Component => props =>
  authFn(props) ? <Component {...props} /> : <LoginPage />;

// Compose enhancements
const enhance = compose(
  withStyles({ color: 'blue' }),
  withAuthentication(props => props.isLoggedIn)
);

const EnhancedComponent = enhance(BaseComponent);
```

## Performance Considerations

1. **Function call overhead**: Multiple nested functions can impact performance.
2. **Memoization**: Cache results for pure curried functions.
3. **Debugging complexity**: Stack traces can be harder to interpret.
4. **Bundle size**: Consider the impact of functional libraries. 