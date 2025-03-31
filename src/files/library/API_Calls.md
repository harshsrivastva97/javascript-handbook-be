# API Calls

JavaScript offers multiple methods for making API calls, each with distinct advantages for different scenarios.

## Core API Request Methods

### Fetch API
Native browser API with Promise-based interface.

```javascript
// Basic GET request
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

// POST request with options
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### XMLHttpRequest (Legacy)
Older API, still used in some codebases.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.responseType = 'json';

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(xhr.response);
  } else {
    console.error('Request failed:', xhr.statusText);
  }
};

xhr.onerror = function() {
  console.error('Network error');
};

xhr.send();
```

### Axios
Popular third-party library with enhanced features.

```javascript
// GET request
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));

// POST request
axios.post('https://api.example.com/users', {
  name: 'John',
  email: 'john@example.com'
}, {
  headers: { 'Authorization': 'Bearer token123' }
})
  .then(response => console.log(response.data));

// Request configuration
axios({
  method: 'put',
  url: 'https://api.example.com/users/1',
  data: { name: 'Updated Name' },
  timeout: 5000
});
```

## Modern Approaches with Async/Await

```javascript
// Using fetch
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw for caller handling
  }
}

// Using axios
async function fetchWithAxios() {
  try {
    const response = await axios.get('https://api.example.com/data');
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
}
```

## Advanced Patterns

### Request Cancellation

```javascript
// Fetch with AbortController
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data));

// Cancel the request
setTimeout(() => controller.abort(), 5000); // Abort after 5 seconds

// Axios with CancelToken
const source = axios.CancelToken.source();

axios.get('https://api.example.com/data', {
  cancelToken: source.token
});

// Cancel the request
source.cancel('Operation canceled by the user');
```

### Retry Logic

```javascript
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
    return await fetch(url, options).then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    });
  } catch (error) {
    if (retries <= 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, backoff));
    return fetchWithRetry(url, options, retries - 1, backoff * 2);
  }
}
```

### Request Batching/Debouncing

```javascript
// Debounced API calls
const debouncedSearch = debounce(async (term) => {
  const results = await fetch(`/api/search?q=${term}`).then(r => r.json());
  updateSearchResults(results);
}, 300);

// Batch multiple requests
async function fetchAllData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}
```

## Interview Focus Points

1. **Fetch vs Axios Differences**:
   - Fetch is native, Axios is a library
   - Fetch requires manual error handling for HTTP error statuses
   - Axios automatically transforms JSON data
   - Axios has built-in request cancellation
   - Fetch requires polyfills for older browsers

2. **CORS (Cross-Origin Resource Sharing)**:
   - Security feature restricting cross-origin HTTP requests
   - Requires proper headers from the server
   - Options for handling: JSONP, proxy servers, proper CORS headers

3. **Authentication Methods**:
   - Bearer tokens: `Authorization: Bearer <token>`
   - API keys: Query parameters or headers
   - OAuth: Token-based authorization flow
   - JWT: Encoded tokens with claims

4. **Error Handling Strategies**:
   - HTTP status codes (4xx, 5xx)
   - Retry mechanisms for transient failures
   - Graceful degradation for API unavailability
   - User feedback for persistent errors

## Best Practices

1. **Always handle errors** and provide user feedback.
2. **Implement request timeouts** to prevent hanging operations.
3. **Use request cancellation** for searches and abandoned operations.
4. **Cache responses** when appropriate to reduce server load.
5. **Implement loading states** to improve user experience.
6. **Centralize API logic** in services/hooks for reusability.
7. **Add request/response interceptors** for consistent handling.
8. **Use environment variables** for API endpoints.

## Performance Considerations

1. **Minimize payload size** using compression and selective fields.
2. **Implement pagination** for large data sets.
3. **Use connection pooling** for multiple requests to the same host.
4. **Consider data prefetching** for anticipated user actions.
5. **Implement proper caching strategies** (HTTP caching, local storage). 