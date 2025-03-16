# Modules

Modules are a fundamental concept in JavaScript that allow you to organize code into separate files, making it more maintainable, reusable, and easier to reason about. This guide covers the different module systems in JavaScript and how to use them effectively.

## Why Use Modules?

Modules provide several benefits:

1. **Code Organization**: Split code into logical, manageable pieces
2. **Encapsulation**: Keep variables and functions private within modules
3. **Reusability**: Share code between different parts of an application
4. **Dependency Management**: Clearly define relationships between code components
5. **Namespace Prevention**: Avoid polluting the global namespace

## Module Systems in JavaScript

JavaScript has evolved through several module systems:

1. **IIFE (Immediately Invoked Function Expressions)** - Early pattern for module-like behavior
2. **CommonJS** - Used in Node.js
3. **AMD (Asynchronous Module Definition)** - Used with RequireJS for browser environments
4. **UMD (Universal Module Definition)** - Works in multiple environments
5. **ES Modules** - Native JavaScript modules (ECMAScript 2015+)

## IIFE Pattern

Before formal module systems, developers used IIFEs to create module-like structures:

```javascript
// Module pattern using IIFE
const counterModule = (function() {
  // Private variable
  let count = 0;
  
  // Return public API
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
})();

// Usage
console.log(counterModule.getCount()); // 0
counterModule.increment();
console.log(counterModule.getCount()); // 1
```

## CommonJS Modules

CommonJS is the module system used in Node.js. It uses `require()` to import modules and `module.exports` or `exports` to export functionality.

### Exporting in CommonJS

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Export multiple functions
module.exports = {
  add,
  subtract
};

// Alternative: Export individual functions
// exports.add = add;
// exports.subtract = subtract;

// Export a single function
// module.exports = add;
```

### Importing in CommonJS

```javascript
// app.js
const math = require('./math');
console.log(math.add(5, 3)); // 8

// Destructuring import
const { add, subtract } = require('./math');
console.log(subtract(10, 4)); // 6

// If module.exports was a single function
// const add = require('./math');
// console.log(add(5, 3)); // 8
```

## ES Modules (ESM)

ES Modules are the standard module system in modern JavaScript, supported by browsers and Node.js. They use `import` and `export` statements.

### Exporting in ES Modules

```javascript
// math.js

// Named exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Alternative: Export at the end
// function add(a, b) { return a + b; }
// function subtract(a, b) { return a - b; }
// export { add, subtract };

// Default export
export default function multiply(a, b) {
  return a * b;
}

// Export constants
export const PI = 3.14159;
```

### Importing in ES Modules

```javascript
// app.js

// Import named exports
import { add, subtract } from './math.js';
console.log(add(5, 3)); // 8

// Import default export
import multiply from './math.js';
console.log(multiply(4, 2)); // 8

// Import both default and named exports
import multiply, { add, subtract, PI } from './math.js';

// Import all exports as a namespace
import * as math from './math.js';
console.log(math.add(5, 3)); // 8
console.log(math.PI); // 3.14159
console.log(math.default(4, 2)); // 8 (default export)

// Dynamic import (returns a promise)
import('./math.js').then((math) => {
  console.log(math.add(5, 3)); // 8
});
```

### Key Differences from CommonJS

1. **Static vs. Dynamic**: ES Modules are statically analyzed at parse time, while CommonJS is evaluated at runtime
2. **Asynchronous vs. Synchronous**: ES Modules can load asynchronously, CommonJS loads synchronously
3. **Syntax**: ES Modules use `import`/`export`, CommonJS uses `require`/`module.exports`
4. **Bindings vs. Values**: ES Modules export bindings (live connections), CommonJS exports values (copies)

## Using ES Modules in the Browser

To use ES Modules directly in the browser, add `type="module"` to your script tag:

```html
<script type="module">
  import { add } from './math.js';
  console.log(add(5, 3));
</script>

<!-- Or reference an external module script -->
<script type="module" src="app.js"></script>
```

### Important Browser Considerations

1. ES Modules are always deferred by default
2. Modules use strict mode automatically
3. Modules have their own scope (don't pollute global namespace)
4. Modules require a server (won't work with `file://` protocol)
5. CORS rules apply for cross-origin modules

## Using ES Modules in Node.js

Node.js supports ES Modules in several ways:

### Method 1: Use `.mjs` extension

```javascript
// math.mjs
export function add(a, b) {
  return a + b;
}

// app.mjs
import { add } from './math.mjs';
console.log(add(5, 3));
```

### Method 2: Set `"type": "module"` in package.json

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module"
}
```

Then use regular `.js` files with ES Module syntax.

## Module Bundlers

Module bundlers like Webpack, Rollup, and Parcel compile modules into optimized bundles for production:

```javascript
// With a bundler, you can import modules regardless of the environment
import React from 'react';
import { add } from './math';
import styles from './styles.css';
import data from './data.json';
```

Bundlers provide benefits like:
- Code splitting
- Tree shaking (dead code elimination)
- Asset handling (CSS, images, etc.)
- Development servers with hot reloading

## Dynamic Imports

Dynamic imports allow loading modules on demand:

```javascript
// Load a module when needed
button.addEventListener('click', async () => {
  const { default: Chart } = await import('./chart.js');
  const chart = new Chart();
  chart.render('#container');
});
```

This is useful for:
- Code splitting
- Lazy loading
- Conditional loading based on user actions

## Module Design Patterns

### Revealing Module Pattern

```javascript
// userService.js
export const userService = (() => {
  // Private variables and functions
  const apiUrl = 'https://api.example.com/users';
  const apiKey = 'private_key_123';
  
  async function fetchFromApi(endpoint) {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    return response.json();
  }
  
  // Public API
  return {
    getUser: (id) => fetchFromApi(`${id}`),
    getUsers: () => fetchFromApi(''),
    createUser: (userData) => {
      // Implementation
    }
  };
})();
```

### Facade Pattern

```javascript
// api.js - Simplify complex subsystems
import { authService } from './authService';
import { httpClient } from './httpClient';
import { cacheService } from './cacheService';

export const api = {
  async get(url) {
    const token = authService.getToken();
    const cachedData = cacheService.get(url);
    
    if (cachedData) return cachedData;
    
    const data = await httpClient.get(url, { token });
    cacheService.set(url, data);
    return data;
  },
  // Other simplified methods
};
```

### Factory Pattern

```javascript
// loggerFactory.js
export function createLogger(name, options = {}) {
  const { level = 'info', timestamp = true } = options;
  
  return {
    info(message) {
      if (level === 'none') return;
      console.log(
        `${timestamp ? new Date().toISOString() : ''} [${name}] INFO: ${message}`
      );
    },
    error(message) {
      if (level === 'none') return;
      console.error(
        `${timestamp ? new Date().toISOString() : ''} [${name}] ERROR: ${message}`
      );
    }
  };
}

// Usage
import { createLogger } from './loggerFactory';
const logger = createLogger('UserService', { level: 'info' });
logger.info('User logged in');
```

## Best Practices

### Module Organization

1. **Single Responsibility**: Each module should focus on one piece of functionality
2. **Explicit Dependencies**: Clearly import what you need
3. **Avoid Circular Dependencies**: They can cause issues and indicate poor design
4. **Consistent Naming**: Use a consistent convention for module files
5. **Index Files**: Use index files to simplify imports from directories

```javascript
// features/user/index.js
export { default as UserProfile } from './UserProfile';
export { default as UserSettings } from './UserSettings';
export { userService } from './userService';

// Elsewhere in the app
import { UserProfile, userService } from './features/user';
```

### Export Best Practices

1. **Named vs. Default Exports**:
   - Use named exports for multiple functions/values
   - Use default exports for main components/classes
   - Be consistent within your codebase

2. **Avoid Side Effects**: Modules should generally not execute side effects when imported

3. **Export Public API Only**: Don't export internal implementation details

4. **Consider Re-exports**: Use them to create a clean public API

```javascript
// api/index.js
export { userApi } from './userApi';
export { productApi } from './productApi';
export { orderApi } from './orderApi';

// This creates a clean import for consumers
import { userApi, productApi } from './api';
```

## Debugging Modules

1. **Source Maps**: Enable source maps in your bundler for better debugging
2. **Named Exports**: Named exports are easier to track in stack traces
3. **Module Graphs**: Use tools like Webpack Bundle Analyzer to visualize dependencies

## Summary

- Modules help organize code into reusable, maintainable pieces
- ES Modules are the modern standard, using `import` and `export` syntax
- CommonJS is used in Node.js with `require` and `module.exports`
- Module bundlers like Webpack optimize modules for production
- Dynamic imports enable code splitting and lazy loading
- Follow best practices like single responsibility and explicit dependencies
- Choose appropriate design patterns for your module architecture

Understanding JavaScript modules is essential for building scalable applications and working with modern JavaScript frameworks and libraries. 