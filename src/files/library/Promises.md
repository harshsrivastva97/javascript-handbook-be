# Promises

Promises are a powerful feature in JavaScript for handling asynchronous operations. They provide a cleaner alternative to callback functions and help manage the complexity of asynchronous code.

## What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation. It serves as a proxy for a value that may not be known when the promise is created. Promises allow you to attach callbacks to handle the success or failure of an asynchronous operation, rather than passing callbacks into a function.

A Promise exists in one of three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

Once a promise is fulfilled or rejected, it is **settled** and cannot change states again.

## Creating Promises

You can create a new Promise using the `Promise` constructor, which takes an executor function with two parameters: `resolve` and `reject`.

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  if (success) {
    resolve('Operation completed successfully!');
  } else {
    reject(new Error('Operation failed!'));
  }
});
```

## Consuming Promises

Promises provide `.then()`, `.catch()`, and `.finally()` methods to handle the results of asynchronous operations.

### .then()

The `.then()` method takes up to two callback functions:
1. A callback for the fulfilled case
2. An optional callback for the rejected case

```javascript
myPromise.then(
  (result) => {
    console.log('Success:', result);
  },
  (error) => {
    console.error('Error:', error);
  }
);
```

### .catch()

The `.catch()` method is a shorthand for `.then(null, errorHandler)` and is used to handle rejected promises.

```javascript
myPromise
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### .finally()

The `.finally()` method executes code regardless of whether the promise was fulfilled or rejected.

```javascript
myPromise
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Promise settled (fulfilled or rejected)');
  });
```

## Chaining Promises

One of the most powerful features of promises is the ability to chain them together for sequential asynchronous operations.

```javascript
fetchUserData(userId)
  .then(userData => {
    return fetchUserPosts(userData.username);
  })
  .then(posts => {
    return fetchPostComments(posts[0].id);
  })
  .then(comments => {
    console.log('Comments:', comments);
  })
  .catch(error => {
    console.error('Error in the promise chain:', error);
  });
```

Each `.then()` can return:
1. A value, which is passed to the next `.then()`
2. Another promise, which the chain will wait for before continuing
3. Throw an error, which will be caught by the next `.catch()`

## Error Handling in Promises

Proper error handling is crucial when working with promises. There are several ways to handle errors:

### Using .catch()

```javascript
fetchData()
  .then(data => processData(data))
  .then(processedData => displayData(processedData))
  .catch(error => {
    console.error('An error occurred:', error);
    displayErrorMessage(error);
  });
```

### Error Propagation

Errors propagate down the promise chain until they encounter a `.catch()` handler.

```javascript
fetchData()
  .then(data => {
    if (!data) throw new Error('Data is empty');
    return processData(data);
  })
  .then(processedData => {
    return displayData(processedData);
  })
  .catch(error => {
    console.error('An error occurred:', error);
    displayErrorMessage(error);
  });
```

## Promise Static Methods

The Promise object provides several static methods for working with promises.

### Promise.resolve()

Creates a promise that is resolved with a given value.

```javascript
const resolvedPromise = Promise.resolve('Already resolved');
resolvedPromise.then(value => console.log(value)); // "Already resolved"
```

### Promise.reject()

Creates a promise that is rejected with a given reason.

```javascript
const rejectedPromise = Promise.reject(new Error('Rejected'));
rejectedPromise.catch(error => console.error(error)); // Error: Rejected
```

### Promise.all()

Takes an iterable of promises and returns a single promise that resolves when all input promises have resolved, or rejects if any input promise rejects.

```javascript
const promise1 = fetchUserProfile();
const promise2 = fetchUserPosts();
const promise3 = fetchUserFriends();

Promise.all([promise1, promise2, promise3])
  .then(([profile, posts, friends]) => {
    // All promises resolved
    displayUserDashboard(profile, posts, friends);
  })
  .catch(error => {
    // At least one promise rejected
    console.error('Failed to load user data:', error);
  });
```

### Promise.race()

Takes an iterable of promises and returns a promise that resolves or rejects as soon as one of the input promises resolves or rejects.

```javascript
const promise1 = fetchDataFromAPI1(); // Might take 2 seconds
const promise2 = fetchDataFromAPI2(); // Might take 1 second

Promise.race([promise1, promise2])
  .then(result => {
    // Will get result from whichever API responds first
    console.log('First response:', result);
  })
  .catch(error => {
    // Will get error from whichever API rejects first
    console.error('First error:', error);
  });
```

### Promise.allSettled()

Takes an iterable of promises and returns a promise that resolves after all input promises have settled (either resolved or rejected).

```javascript
const promises = [
  fetchUserProfile(),
  fetchUserPosts(),
  fetchUserFriends()
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index} fulfilled with value:`, result.value);
      } else {
        console.log(`Promise ${index} rejected with reason:`, result.reason);
      }
    });
  });
```

### Promise.any()

Takes an iterable of promises and returns a promise that resolves as soon as one of the input promises resolves. If all promises reject, it rejects with an AggregateError.

```javascript
const promises = [
  fetchDataFromAPI1(),
  fetchDataFromAPI2(),
  fetchDataFromAPI3()
];

Promise.any(promises)
  .then(firstResult => {
    console.log('First successful result:', firstResult);
  })
  .catch(error => {
    console.error('All promises rejected:', error);
  });
```

## Common Promise Patterns

### Promisification

Converting callback-based functions to promise-based functions.

```javascript
// Callback-based function
function readFileCallback(path, callback) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(null, data);
    }
  });
}

// Promisified version
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// Usage
readFilePromise('config.json')
  .then(data => console.log('File contents:', data))
  .catch(error => console.error('Error reading file:', error));
```

### Sequential Execution

Running promises in sequence, one after another.

```javascript
const urls = ['/api/data1', '/api/data2', '/api/data3'];

// Sequential execution
urls.reduce((promiseChain, url) => {
  return promiseChain.then(results => {
    return fetch(url)
      .then(response => response.json())
      .then(data => [...results, data]);
  });
}, Promise.resolve([])).then(allResults => {
  console.log('All results in order:', allResults);
});
```

### Timeout Pattern

Adding a timeout to a promise to prevent waiting indefinitely.

```javascript
function promiseWithTimeout(promise, timeoutMs) {
  // Create a promise that rejects after timeoutMs milliseconds
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  
  // Race the original promise against the timeout
  return Promise.race([promise, timeoutPromise]);
}

// Usage
promiseWithTimeout(fetchData(), 5000)
  .then(data => console.log('Data received:', data))
  .catch(error => console.error('Error or timeout:', error));
```

### Retry Pattern

Automatically retrying a failed promise a certain number of times.

```javascript
function retryPromise(promiseFn, maxRetries, delay) {
  return new Promise((resolve, reject) => {
    function attempt(retryCount) {
      promiseFn()
        .then(resolve)
        .catch(error => {
          if (retryCount < maxRetries) {
            console.log(`Attempt ${retryCount + 1} failed, retrying...`);
            setTimeout(() => attempt(retryCount + 1), delay);
          } else {
            reject(error);
          }
        });
    }
    
    attempt(0);
  });
}

// Usage
retryPromise(() => fetchUnstableAPI(), 3, 1000)
  .then(data => console.log('Success after retries:', data))
  .catch(error => console.error('All retries failed:', error));
```

## Promises vs. Callbacks

Promises offer several advantages over traditional callbacks:

1. **Better error handling**: Errors propagate down the chain until caught
2. **Chaining**: Cleaner syntax for sequential asynchronous operations
3. **Composition**: Easier to combine multiple asynchronous operations
4. **Avoiding callback hell**: Flatter code structure
5. **Guarantees**: Callbacks may be called too early, too late, or multiple times; promises resolve exactly once

## Best Practices

1. **Always return promises** from functions that perform asynchronous operations
2. **Always handle rejections** with `.catch()` to prevent unhandled promise rejections
3. **Keep promise chains flat** rather than nesting them
4. **Use async/await** for even cleaner asynchronous code (built on promises)
5. **Avoid creating unnecessary promises** when a value is already available
6. **Use Promise.all()** for concurrent operations that don't depend on each other
7. **Add timeouts** to prevent waiting indefinitely for external resources

## Summary

Promises provide a powerful way to handle asynchronous operations in JavaScript. They offer a cleaner alternative to callbacks, with better error handling and composability. Understanding promises is essential for modern JavaScript development, as they form the foundation for other asynchronous patterns like async/await.

By mastering promises, you can write more maintainable asynchronous code that's easier to reason about and less prone to bugs. 