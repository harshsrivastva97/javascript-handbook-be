# Error Handling

Error handling is a critical aspect of writing robust JavaScript applications. Proper error handling helps identify, report, and recover from unexpected situations in your code.

## Types of Errors in JavaScript

JavaScript has several built-in error types:

### 1. SyntaxError

Occurs when the code violates JavaScript's syntax rules.

```javascript
// SyntaxError example
function myFunction( {  // Missing closing parenthesis
  return 'Hello';
}
```

### 2. ReferenceError

Occurs when referencing a variable that doesn't exist.

```javascript
// ReferenceError example
console.log(undefinedVariable); // ReferenceError: undefinedVariable is not defined
```

### 3. TypeError

Occurs when an operation is performed on a value of the wrong type.

```javascript
// TypeError example
const str = 'Hello';
str.push('World'); // TypeError: str.push is not a function
```

### 4. RangeError

Occurs when a numeric value is outside the allowable range.

```javascript
// RangeError example
const arr = new Array(-1); // RangeError: Invalid array length
```

### 5. URIError

Occurs when using global URI handling functions incorrectly.

```javascript
// URIError example
decodeURI('%'); // URIError: URI malformed
```

### 6. EvalError

Historically occurred with `eval()` function issues, but rarely used in modern JavaScript.

### 7. AggregateError

A collection of errors wrapped in a single error (introduced in ES2020).

```javascript
// AggregateError example
Promise.any([
  Promise.reject(new Error('Error 1')),
  Promise.reject(new Error('Error 2'))
]).catch(errors => {
  console.log(errors instanceof AggregateError); // true
  console.log(errors.errors); // [Error: Error 1, Error: Error 2]
});
```

## Try...Catch Statement

The `try...catch` statement is the primary mechanism for handling exceptions in JavaScript.

### Basic Syntax

```javascript
try {
  // Code that might throw an error
  const result = riskyOperation();
} catch (error) {
  // Code to handle the error
  console.error('An error occurred:', error.message);
} finally {
  // Code that will run regardless of whether an error occurred
  console.log('Cleanup operations');
}
```

### Error Object Properties

The error object typically contains:

- `name`: The error type (e.g., "TypeError")
- `message`: A human-readable description of the error
- `stack`: A stack trace showing where the error occurred

```javascript
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log(error.name); // "Error"
  console.log(error.message); // "Something went wrong"
  console.log(error.stack); // Stack trace string
}
```

### Selective Catching

You can selectively catch errors based on their type:

```javascript
try {
  // Code that might throw different types of errors
  const value = JSON.parse(invalidJSON);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('Invalid JSON:', error.message);
  } else if (error instanceof TypeError) {
    console.error('Type error:', error.message);
  } else {
    console.error('Unknown error:', error.message);
    throw error; // Re-throw errors you can't handle
  }
}
```

## Throwing Errors

You can throw errors using the `throw` statement:

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

try {
  const result = divide(10, 0);
} catch (error) {
  console.error(error.message); // "Division by zero is not allowed"
}
```

### Custom Error Types

You can create custom error types by extending the built-in `Error` class:

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required', 'name');
  }
  if (!user.email) {
    throw new ValidationError('Email is required', 'email');
  }
}

try {
  validateUser({ name: 'John' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`${error.field}: ${error.message}`);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Asynchronous Error Handling

### Promises

With Promises, you can use `.catch()` to handle errors:

```javascript
fetchData()
  .then(data => processData(data))
  .catch(error => {
    console.error('Error fetching or processing data:', error);
  });
```

### Async/Await

With async/await, you can use try/catch blocks:

```javascript
async function fetchAndProcessData() {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    return processedData;
  } catch (error) {
    console.error('Error in data pipeline:', error);
    // Handle error or re-throw
    throw error;
  }
}
```

### Handling Rejected Promises

Always handle rejected promises to avoid "Unhandled Promise Rejection" warnings:

```javascript
// Bad - unhandled rejection
fetchData().then(data => {
  // Process data
});

// Good - handled rejection
fetchData()
  .then(data => {
    // Process data
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## Global Error Handling

### Window.onerror

For browser environments, you can set a global error handler:

```javascript
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error handler:', message);
  // Send error to your analytics or logging service
  sendErrorToAnalytics(message, source, lineno, colno, error);
  return true; // Prevents the default browser error handling
};
```

### Process.on('uncaughtException')

For Node.js environments:

```javascript
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Log the error and exit gracefully
  logErrorToService(error).then(() => {
    process.exit(1);
  });
});
```

### Unhandled Promise Rejections

```javascript
// Browser
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Node.js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
```

## Error Handling Patterns

### Error Boundaries (React)

In React applications, you can create error boundaries to catch errors in components:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Retry Pattern

Automatically retry operations that might fail temporarily:

```javascript
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
    return await fetch(url, options);
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, backoff));
    return fetchWithRetry(url, options, retries - 1, backoff * 2);
  }
}
```

### Circuit Breaker Pattern

Prevent cascading failures by failing fast when a service is unavailable:

```javascript
class CircuitBreaker {
  constructor(request, options = {}) {
    this.request = request;
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttempt = Date.now();
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 5000;
    this.successThreshold = options.successThreshold || 2;
  }

  async fire(...args) {
    if (this.state === 'OPEN') {
      if (this.nextAttempt <= Date.now()) {
        this.state = 'HALF-OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const response = await this.request(...args);
      
      if (this.state === 'HALF-OPEN') {
        this.successCount++;
        if (this.successCount >= this.successThreshold) {
          this.reset();
        }
      }
      
      return response;
    } catch (error) {
      this.failureCount++;
      if (this.failureCount >= this.failureThreshold || this.state === 'HALF-OPEN') {
        this.state = 'OPEN';
        this.nextAttempt = Date.now() + this.resetTimeout;
      }
      throw error;
    }
  }

  reset() {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
  }
}

// Usage
const breaker = new CircuitBreaker(fetchData);
try {
  const data = await breaker.fire('https://api.example.com/data');
} catch (error) {
  console.error('Service unavailable or error:', error);
}
```

## Debugging Techniques

### Console Methods

```javascript
// Basic logging
console.log('Regular log message');
console.info('Informational message');
console.warn('Warning message');
console.error('Error message');

// Structured data
console.table([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);

// Grouping
console.group('User Details');
console.log('Name: John');
console.log('Role: Admin');
console.groupEnd();

// Timing
console.time('Operation');
// ... some operation
console.timeEnd('Operation');

// Stack trace
console.trace('Trace message');
```

### Debugger Statement

The `debugger` statement pauses execution and opens the browser's debugging tools:

```javascript
function buggyFunction() {
  let x = 5;
  debugger; // Execution will pause here when dev tools are open
  x = x * 2;
  return x;
}
```

## Best Practices

1. **Be specific with error messages**: Include details about what went wrong and why.

2. **Use try/catch only where errors are expected**: Don't wrap entire functions in try/catch blocks unnecessarily.

3. **Handle errors at the appropriate level**: Catch errors where you can actually handle them.

4. **Log errors with context**: Include relevant information like user ID, request parameters, etc.

5. **Don't swallow errors**: Always log or handle errors appropriately.

```javascript
// Bad - swallowing errors
try {
  riskyOperation();
} catch (error) {
  // Empty catch block
}

// Good - handling errors
try {
  riskyOperation();
} catch (error) {
  console.error('Error during risky operation:', error);
  notifyUser('Something went wrong. Please try again later.');
}
```

6. **Fail fast**: Validate inputs early to prevent deeper errors.

```javascript
function processUserData(user) {
  // Validate early
  if (!user) {
    throw new Error('User data is required');
  }
  if (!user.id) {
    throw new Error('User ID is required');
  }
  
  // Process data knowing it's valid
  // ...
}
```

7. **Use error codes**: Consider using error codes for programmatic error handling.

```javascript
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

// Usage
throw new AppError('User not found', 'USER_NOT_FOUND');
```

8. **Centralize error handling**: Create a central error handling service for consistent error processing.

```javascript
// errorService.js
export const errorService = {
  handleError(error, context = {}) {
    const timestamp = new Date().toISOString();
    const errorId = generateUniqueId();
    
    const errorInfo = {
      id: errorId,
      timestamp,
      name: error.name,
      message: error.message,
      stack: error.stack,
      context
    };
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', errorInfo);
    }
    
    // Send to logging service in production
    if (process.env.NODE_ENV === 'production') {
      sendToLoggingService(errorInfo);
    }
    
    return errorId;
  }
};
```

## Summary

- JavaScript has several built-in error types for different error scenarios
- The try/catch statement is the primary mechanism for handling exceptions
- Custom error types can be created by extending the Error class
- Asynchronous code requires special error handling with promises or async/await
- Global error handlers can catch unhandled exceptions
- Error handling patterns like retry and circuit breaker improve application resilience
- Proper error handling improves user experience and makes debugging easier
- Following best practices helps create more robust and maintainable applications 