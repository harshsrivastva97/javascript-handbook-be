# Memory Management

JavaScript's memory management is largely automatic through garbage collection, but understanding how it works is crucial for writing efficient applications and avoiding memory leaks.

## How JavaScript Memory Works

JavaScript automatically allocates memory when objects are created and frees it when they're no longer used. This process involves three key steps:

1. **Memory Allocation**: Memory is allocated when you create variables, objects, or functions
2. **Memory Use**: Reading from or writing to memory during program execution
3. **Memory Release**: Freeing memory when it's no longer needed (garbage collection)

## Memory Lifecycle

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│     Allocate    │ ──► │       Use       │ ──► │    Release      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Memory Allocation Examples

```javascript
// Allocates memory for a number
let number = 42;

// Allocates memory for a string
let string = 'Hello, world';

// Allocates memory for an object and its properties
let object = {
  name: 'JavaScript',
  year: 1995
};

// Allocates memory for an array and its elements
let array = [1, 2, 3, 4, 5];

// Allocates memory for a function
let func = function(a) {
  return a * 2;
};
```

## Garbage Collection

JavaScript uses automatic garbage collection to reclaim memory that's no longer needed. The two main garbage collection algorithms are:

### 1. Reference Counting

This simple algorithm considers an object as "garbage collectible" when there are zero references pointing to it.

```javascript
let obj = { name: 'Example' }; // Object created, reference count: 1
let reference = obj; // Reference count: 2

obj = null; // Reference count: 1
reference = null; // Reference count: 0, object can be garbage collected
```

**Limitation**: Cannot handle circular references

```javascript
function createCycle() {
  let obj1 = {};
  let obj2 = {};
  
  obj1.ref = obj2; // obj1 references obj2
  obj2.ref = obj1; // obj2 references obj1
  
  return 'Cycle created';
}

createCycle(); // Objects created but never collected due to circular references
```

### 2. Mark and Sweep Algorithm

Modern JavaScript engines use the "Mark and Sweep" algorithm, which addresses the circular reference problem:

1. The garbage collector builds a list of "roots" (global objects)
2. It marks all roots and their children as active (not garbage)
3. It sweeps through the entire memory and removes unmarked objects
4. It compacts the remaining objects to reduce fragmentation (in some implementations)

This algorithm determines whether an object is reachable from the roots, rather than counting references.

## Memory Leaks in JavaScript

Memory leaks occur when memory that is no longer needed is not released. Common causes include:

### 1. Accidental Global Variables

```javascript
function leak() {
  leakyVariable = 'I am leaking'; // Missing 'let', 'const', or 'var'
}

leak();
// leakyVariable is now a global variable and won't be garbage collected
```

### 2. Forgotten Timers and Callbacks

```javascript
function setUpInterval() {
  let largeData = new Array(10000000).fill('potentially large data');
  
  setInterval(() => {
    // Reference to largeData is maintained by this closure
    console.log('Interval that uses largeData');
  }, 1000);
}

setUpInterval();
// largeData will never be garbage collected unless the interval is cleared
```

### 3. Closures Capturing Variables

```javascript
function createLeak() {
  let largeData = new Array(10000000).fill('potentially large data');
  
  return function() {
    // This inner function captures largeData in its closure
    console.log('Length:', largeData.length);
  };
}

const leakyFunction = createLeak();
// largeData is kept in memory as long as leakyFunction exists
```

### 4. Out of DOM References

```javascript
function setupElement() {
  let element = document.getElementById('element');
  
  // Store a reference to the DOM element
  this.elementReference = element;
  
  // Remove the element from the DOM
  element.parentNode.removeChild(element);
  
  // The element is still in memory because of elementReference
}
```

### 5. Event Listeners

```javascript
function addEventListeners() {
  const button = document.getElementById('button');
  
  button.addEventListener('click', function() {
    // This handler might capture variables in its scope
    console.log('Button clicked');
  });
  
  // If the button is removed without removing the event listener,
  // both the handler and any captured variables may leak
}
```

## Detecting Memory Leaks

### Chrome DevTools

1. **Memory Snapshots**:
   - Open DevTools > Memory tab
   - Take a heap snapshot
   - Perform actions that might cause leaks
   - Take another snapshot
   - Compare snapshots to identify retained objects

2. **Memory Allocation Timeline**:
   - Use the "Performance" or "Memory" panel
   - Record memory allocation over time
   - Look for a pattern of increasing memory usage that doesn't decrease

```javascript
// Example of code to test for memory leaks
function potentialLeak() {
  let data = [];
  
  function addData() {
    for (let i = 0; i < 10000; i++) {
      data.push(new Array(1000).fill('x'));
    }
  }
  
  return addData;
}

const leakyFunction = potentialLeak();

// Call this repeatedly and monitor memory usage
function testForLeak() {
  leakyFunction();
}
```

## Preventing Memory Leaks

### 1. Avoid Accidental Globals

```javascript
// Use strict mode to prevent accidental globals
'use strict';

function noLeak() {
  let localVariable = 'I am contained'; // Properly scoped
}
```

### 2. Clear Timers When No Longer Needed

```javascript
function setUpTimerProperly() {
  let data = new Array(10000).fill('some data');
  
  const timerId = setInterval(() => {
    console.log('Using data');
  }, 1000);
  
  // Provide a way to clean up
  return function cleanup() {
    clearInterval(timerId);
    data = null; // Allow data to be garbage collected
  };
}

const cleanup = setUpTimerProperly();
// Later when no longer needed
cleanup();
```

### 3. Be Careful with Closures

```javascript
function createFunction() {
  const smallData = 'I am small and necessary';
  const largeData = new Array(10000).fill('large and unnecessary');
  
  function innerFunction() {
    // Only uses smallData
    return smallData;
  }
  
  // Return a function that doesn't capture largeData
  return innerFunction;
}
```

### 4. Properly Remove DOM References

```javascript
function cleanupElement() {
  let element = document.getElementById('element');
  
  // Do something with element
  
  // Remove references when done
  element = null;
}
```

### 5. Remove Event Listeners

```javascript
function addRemovableEventListener() {
  const button = document.getElementById('button');
  
  const handleClick = function() {
    console.log('Button clicked');
  };
  
  button.addEventListener('click', handleClick);
  
  // Return a cleanup function
  return function() {
    button.removeEventListener('click', handleClick);
  };
}

const removeListener = addRemovableEventListener();
// Later when the listener is no longer needed
removeListener();
```

## Memory Optimization Techniques

### 1. Object Pooling

Reuse objects instead of creating new ones, especially for frequently created objects:

```javascript
class ObjectPool {
  constructor(createFn, initialSize = 10) {
    this.createFn = createFn;
    this.pool = [];
    
    // Initialize pool
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }
  
  get() {
    if (this.pool.length === 0) {
      return this.createFn();
    }
    return this.pool.pop();
  }
  
  release(obj) {
    this.pool.push(obj);
  }
}

// Example usage for particle system
const particlePool = new ObjectPool(() => {
  return { x: 0, y: 0, velocity: { x: 0, y: 0 } };
}, 100);

function createParticle() {
  const particle = particlePool.get();
  // Configure particle
  return particle;
}

function removeParticle(particle) {
  // Reset particle properties
  particlePool.release(particle);
}
```

### 2. Use TypedArrays for Binary Data

```javascript
// Regular array (less memory efficient)
const regularArray = new Array(1000).fill(0);

// TypedArray (more memory efficient)
const typedArray = new Uint8Array(1000);
```

### 3. Avoid Memory-Intensive Closures in Loops

```javascript
// Bad - creates a new function for each item
const items = document.querySelectorAll('.item');
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', function() {
    console.log('Item ' + i + ' clicked');
  });
}

// Better - reuses the same function
function handleClick(e) {
  const index = Array.from(items).indexOf(e.currentTarget);
  console.log('Item ' + index + ' clicked');
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', handleClick);
}
```

### 4. Use WeakMap and WeakSet for Object References

```javascript
// Using WeakMap to store metadata about DOM elements
const elementData = new WeakMap();

function setupElement(element) {
  // Store data related to the element
  elementData.set(element, {
    clickCount: 0,
    lastClicked: null
  });
  
  element.addEventListener('click', function() {
    const data = elementData.get(element);
    data.clickCount++;
    data.lastClicked = new Date();
  });
}

// When the element is removed from the DOM and no longer referenced,
// its entry in the WeakMap can be garbage collected
```

### 5. Dispose Large Objects When No Longer Needed

```javascript
function processLargeData() {
  let largeData = fetchLargeDataSet();
  
  // Process the data
  const result = computeResult(largeData);
  
  // Explicitly clean up
  largeData = null;
  
  return result;
}
```

## Memory Management in Modern JavaScript Frameworks

### React

```jsx
// Using useEffect for cleanup
function Component() {
  useEffect(() => {
    // Set up resources
    const subscription = subscribeToData();
    
    // Return cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return <div>Component content</div>;
}
```

### Vue

```javascript
// Using beforeUnmount for cleanup
export default {
  mounted() {
    this.intervalId = setInterval(() => {
      this.updateData();
    }, 1000);
  },
  beforeUnmount() {
    // Clean up resources
    clearInterval(this.intervalId);
  }
};
```

### Angular

```typescript
// Using ngOnDestroy for cleanup
@Component({
  selector: 'app-example',
  template: '<div>Example</div>'
})
export class ExampleComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  ngOnInit() {
    this.subscription = this.dataService.getData().subscribe(data => {
      this.processData(data);
    });
  }
  
  ngOnDestroy() {
    // Clean up resources
    this.subscription.unsubscribe();
  }
}
```

## Summary

- JavaScript manages memory automatically through garbage collection
- The Mark and Sweep algorithm is used by modern JavaScript engines
- Common causes of memory leaks include global variables, timers, closures, and DOM references
- Tools like Chrome DevTools can help detect memory leaks
- Prevent memory leaks by cleaning up resources, removing event listeners, and being careful with closures
- Optimize memory usage with techniques like object pooling and TypedArrays
- Modern frameworks provide lifecycle hooks for proper resource cleanup

Understanding memory management in JavaScript helps you write more efficient applications and avoid performance issues caused by memory leaks. 