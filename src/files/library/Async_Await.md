# Async/Await

Async/Await is a revolutionary syntax in JavaScript that transforms how we write asynchronous code. It builds on top of Promises to provide a more intuitive and synchronous-looking way to handle asynchronous operations.

## Understanding Async Functions

### Declaration

Async functions are created by adding the `async` keyword before a function declaration:

```javascript
// Async function declaration
async function fetchData() {
  // Asynchronous code here
}

// Async function expression
const fetchData = async function() {
  // Asynchronous code here
};

// Async arrow function
const fetchData = async () => {
  // Asynchronous code here
};

// Async method in a class
class DataFetcher {
  async fetchData() {
    // Asynchronous code here
  }
}
```

### Return Behavior

Async functions always return a Promise, even if you return a non-Promise value:

- Return value → `Promise.resolve(value)`
- Thrown error → `Promise.reject(error)`
- Returned promise → Used as-is

```javascript
async function example() {
  return 'Hello'; // Automatically wrapped in Promise.resolve()
}

example().then(result => console.log(result)); // 'Hello'
```

## The Power of Await

The `await` keyword can only be used inside async functions and allows you to wait for a Promise to resolve:

```javascript
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const userData = await response.json();
  return userData;
}
```

### How Await Works

1. Pauses execution of the async function until the Promise settles
2. Unwraps the Promise to return its resolved value
3. Converts Promise rejection into thrown error

## Basic Pattern with Error Handling

```javascript
async function fetchUserProfile(userId) {
  try {
    const user = await fetchUser(userId);
    const preferences = await fetchPreferences(userId);
    return { ...user, ...preferences };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('Profile fetch failed');
  }
}
```

## Optimized Parallel Execution

When operations don't depend on each other, you can run them in parallel:

```javascript
async function loadDashboardData(userId) {
  try {
    // Start all fetches simultaneously
    const [
      userPromise,
      postsPromise,
      notificationsPromise
    ] = [
      fetchUser(userId),
      fetchUserPosts(userId),
      fetchNotifications(userId)
    ];

    // Await results together
    const [user, posts, notifications] = await Promise.all([
      userPromise,
      postsPromise,
      notificationsPromise
    ]);

    return { user, posts, notifications };
  } catch (error) {
    throw new Error('Dashboard data load failed');
  }
}
```

## Advanced Error Handling with Retries

```javascript
async function robustFetch(url, options = {}) {
  const MAX_RETRIES = 3;
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        timeout: 5000
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} attempts: ${lastError.message}`);
}
```

## Conditional Async Operations

```javascript
async function smartFetch(urls, options = {}) {
  const results = [];
  const errors = [];

  for (const url of urls) {
    if (!options.skipValidation) {
      try {
        await validateUrl(url);
      } catch (error) {
        errors.push({ url, error: 'Validation failed' });
        continue;
      }
    }

    try {
      const data = await robustFetch(url);
      results.push({ url, data });
    } catch (error) {
      errors.push({ url, error: error.message });
    }
  }

  return { results, errors };
}
```

## Execution Flow

Async functions execute synchronously until the first `await`, then yield control back to the calling context. Execution resumes when the awaited Promise settles.

```javascript
async function demo() {
  console.log('1. Start');
  
  // This runs synchronously until the first await
  console.log('2. Before await');
  
  // Control is yielded back here
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This runs after the Promise resolves
  console.log('3. After await');
  
  return 'Done';
}

console.log('A. Before calling async function');
demo().then(result => console.log(`4. Result: ${result}`));
console.log('B. After calling async function');

// Output:
// A. Before calling async function
// 1. Start
// 2. Before await
// B. After calling async function
// (1 second later)
// 3. After await
// 4. Result: Done
```

## Sequential vs Parallel Execution

### Sequential (One After Another)

```javascript
async function sequential() {
  const start = Date.now();
  
  const result1 = await slowOperation(1000);
  const result2 = await slowOperation(1000);
  const result3 = await slowOperation(1000);
  
  console.log(`Took ${Date.now() - start}ms`); // ~3000ms
  return [result1, result2, result3];
}
```

### Parallel (All at Once)

```javascript
async function parallel() {
  const start = Date.now();
  
  const results = await Promise.all([
    slowOperation(1000),
    slowOperation(1000),
    slowOperation(1000)
  ]);
  
  console.log(`Took ${Date.now() - start}ms`); // ~1000ms
  return results;
}
```

## Common Pitfalls

### 1. Forgetting to await

```javascript
// Incorrect - doesn't wait for the promise to resolve
async function incorrect() {
  const data = fetchData(); // Missing await!
  console.log(data); // Logs a Promise, not the data
}

// Correct
async function correct() {
  const data = await fetchData();
  console.log(data); // Logs the resolved data
}
```

### 2. Error Handling

```javascript
// Incorrect - errors in fetchData will not be caught
async function incorrect() {
  const data = await fetchData();
  return process(data);
}

// Correct
async function correct() {
  try {
    const data = await fetchData();
    return process(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw or handle appropriately
  }
}
```

### 3. Unnecessary Sequential Awaits

```javascript
// Inefficient - sequential awaits for independent operations
async function inefficient() {
  const users = await fetchUsers();
  const products = await fetchProducts();
  return { users, products };
}

// Efficient - parallel execution
async function efficient() {
  const [users, products] = await Promise.all([
    fetchUsers(),
    fetchProducts()
  ]);
  return { users, products };
}
```

## Best Practices

1. **Always await Promises** - Never forget to await a Promise
2. **Use try/catch blocks** for proper error handling
3. **Run independent operations in parallel** with Promise.all()
4. **Keep async functions focused** on a single responsibility
5. **Return early** from async functions when possible
6. **Avoid mixing callbacks and async/await**
7. **Use meaningful variable names** for awaited values
8. **Consider timeout mechanisms** for long-running operations

## Async/Await vs Promises vs Callbacks

### Callbacks (Old Style)

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, 'Data');
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});
```

### Promises (ES6)

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data');
    }, 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Async/Await (Modern)

```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

## Summary

- Async functions automatically wrap returns in Promises
- Await pauses execution while maintaining program responsiveness
- Enables linear code flow for asynchronous operations
- Supports both sequential and parallel execution patterns
- Provides natural error handling with try/catch
- Simplifies complex asynchronous workflows
- Improves code readability and maintenance
- Integrates seamlessly with existing Promise-based code
- Allows for better error tracking and debugging
- Supports advanced patterns like retries and timeouts 