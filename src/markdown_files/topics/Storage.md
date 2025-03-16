# Storage

Web Storage APIs provide mechanisms to store data in the browser. The main storage types are localStorage, sessionStorage, and cookies, each with its own use cases and limitations.

## Storage Types

### localStorage

Persistent storage that remains until explicitly deleted:

```javascript
// Setting data
localStorage.setItem('user', 'John');

// Getting data
const user = localStorage.getItem('user'); // 'John'

// Removing specific item
localStorage.removeItem('user');

// Clearing all data
localStorage.clear();
```

Key characteristics:
- No expiration date
- Data persists even after browser is closed
- Shared across all tabs/windows with same origin
- Approximately 5-10MB storage limit (varies by browser)
- Synchronous API (can block the main thread)

### sessionStorage

Temporary storage that lasts for the duration of the page session:

```javascript
// Setting data
sessionStorage.setItem('token', '123456');

// Getting data
const token = sessionStorage.getItem('token'); // '123456'

// Removing specific item
sessionStorage.removeItem('token');

// Clearing all data
sessionStorage.clear();
```

Key characteristics:
- Data cleared when page session ends (tab is closed)
- Not shared between tabs (even with same origin)
- Approximately 5-10MB storage limit (varies by browser)
- Synchronous API (can block the main thread)

### Cookies

Small text files stored by the browser with configurable expiration:

```javascript
// Setting a cookie
document.cookie = "username=John; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";

// Setting a cookie with more options
document.cookie = "preferences=dark; max-age=31536000; secure; samesite=strict";

// Reading cookies
const cookies = document.cookie; // Returns all cookies as a single string

// Deleting a cookie (set expiration in the past)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

Key characteristics:
- Sent with every HTTP request to the same domain
- Size limit of about 4KB
- Can set expiration date/time
- Can be made secure (HTTPS only)
- Can be restricted to specific paths
- Can be set as HTTP-only (inaccessible to JavaScript)

## Working with Complex Data

Since all web storage options only store strings, you need to serialize/deserialize objects:

```javascript
// Storing objects
const data = { name: 'John', age: 30 };
localStorage.setItem('userData', JSON.stringify(data));

// Retrieving objects
const stored = JSON.parse(localStorage.getItem('userData'));
console.log(stored.name); // 'John'
```

## Storage Events

The `storage` event fires when localStorage is modified (in other tabs/windows):

```javascript
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', e.key, e.newValue);
});
```

This event only fires in other tabs/windows, not in the one that made the change.

## Storage Utility Class

A practical wrapper for working with storage:

```javascript
class StorageUtil {
  constructor(storageType = localStorage) {
    this.storage = storageType;
  }

  set(key, value, expiryInSeconds = null) {
    const item = {
      value: value,
      timestamp: new Date().getTime()
    };
    
    if (expiryInSeconds) {
      item.expiry = expiryInSeconds * 1000;
    }
    
    this.storage.setItem(key, JSON.stringify(item));
    return true;
  }

  get(key) {
    const itemStr = this.storage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    
    // Check if item is expired
    if (item.expiry && new Date().getTime() > item.timestamp + item.expiry) {
      this.storage.removeItem(key);
      return null;
    }
    
    return item.value;
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

// Usage
const storage = new StorageUtil();
storage.set('user', { name: 'John' }, 3600); // Expires in 1 hour
const user = storage.get('user');
```

## IndexedDB

For more complex storage needs, browsers provide IndexedDB:

```javascript
// Opening a database
const request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('users', { keyPath: 'id' });
  store.createIndex('name', 'name', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  
  // Adding data
  const transaction = db.transaction(['users'], 'readwrite');
  const store = transaction.objectStore('users');
  store.add({ id: 1, name: 'John', age: 30 });
  
  // Getting data
  const getRequest = store.get(1);
  getRequest.onsuccess = () => {
    console.log(getRequest.result);
  };
};
```

Key characteristics:
- Asynchronous API (doesn't block the main thread)
- Much larger storage capacity (generally 50-100MB or more)
- Complex querying capabilities
- Supports transactions
- Steeper learning curve

## Security Considerations

1. **Never store sensitive data** in client-side storage
2. **Set appropriate cookie flags**:
   - `Secure` - HTTPS only
   - `HttpOnly` - Inaccessible to JavaScript
   - `SameSite` - Controls cross-origin requests
3. **Validate data** when retrieving from storage
4. **Be aware of XSS vulnerabilities** that could expose stored data

## Browser Support and Limitations

- All modern browsers support Web Storage APIs
- Storage limits vary by browser (typically 5-10MB)
- Private/incognito mode may have different behavior
- Mobile browsers may clear storage more aggressively
- Some users may disable storage in their browser settings

## Best Practices

1. **Check for availability** before using storage APIs
2. **Handle errors** when storage limits are exceeded
3. **Use appropriate storage type** for your use case
4. **Implement a fallback mechanism** when storage is unavailable
5. **Clear unnecessary data** to avoid hitting storage limits
6. **Consider user privacy** when storing data

## Summary

- localStorage persists across browser sessions
- sessionStorage clears when tab is closed
- Cookies can be set with expiration and security flags
- All web storage is limited by browser quotas
- Only strings can be stored (use JSON for objects)
- IndexedDB provides more advanced storage capabilities
- Storage events enable cross-tab communication 