# Timers

JavaScript timers control execution timing, enabling delayed operations, animations, and asynchronous programming patterns.

## Core Timer Functions

### setTimeout
Executes code once after a specified delay (in milliseconds).

```javascript
// Basic usage
const timeoutId = setTimeout(() => {
  console.log('Executed after 2 seconds');
}, 2000);

// Clearing a timeout
clearTimeout(timeoutId); // Prevents execution if called before timeout completes
```

### setInterval
Repeatedly executes code at specified intervals.

```javascript
// Basic usage
const intervalId = setInterval(() => {
  console.log('Executes every second');
}, 1000);

// Clearing an interval
clearInterval(intervalId); // Stops the repeating execution
```

### requestAnimationFrame
Optimized for animations, synchronizes with the browser's repaint cycle.

```javascript
function animate(timestamp) {
  // Update animation based on timestamp
  element.style.transform = `translateX(${timestamp / 20 % 100}px)`;
  
  // Request next frame
  requestAnimationFrame(animate);
}

// Start animation
const animationId = requestAnimationFrame(animate);

// Stop animation
cancelAnimationFrame(animationId);
```

## Advanced Patterns

### Recursive setTimeout vs setInterval
```javascript
// setInterval approach - rigid timing
setInterval(callback, 1000);

// setTimeout recursive approach - adaptive timing
function executeWithDelay() {
  setTimeout(() => {
    callback();
    executeWithDelay(); // Schedule next execution after completion
  }, 1000);
}
```

### Debouncing
Delays function execution until after a period of inactivity.

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  fetchSearchResults(query);
}, 300);

searchInput.addEventListener('input', e => debouncedSearch(e.target.value));
```

### Throttling
Limits function execution to a maximum frequency.

```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const throttledScroll = throttle(() => {
  updateScrollIndicator();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

## Interview Focus Points

1. **Event Loop Interaction**: Timers are macrotasks, queued after microtasks (Promises).
   ```javascript
   console.log('Start');
   setTimeout(() => console.log('Timeout'), 0);
   Promise.resolve().then(() => console.log('Promise'));
   console.log('End');
   // Output: Start, End, Promise, Timeout
   ```

2. **Minimum Delay**: Browsers enforce minimum delays (typically 4ms) for nested timeouts.

3. **Timing Precision**: JavaScript timers are not guaranteed to execute exactly on time due to:
   - Single-threaded execution
   - Task queue prioritization
   - Browser throttling (inactive tabs, battery saving)

4. **Memory Management**: Uncancelled timers can cause memory leaks, especially in components that unmount.

## Best Practices

1. **Always store and clear timer IDs** to prevent memory leaks:
```javascript
// React component example
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // Cleanup on unmount
}, []);
```

2. **Use requestAnimationFrame for visual updates** instead of setInterval for smoother animations.

3. **Implement debounce/throttle** for event handlers that trigger expensive operations.

4. **Avoid setTimeout(fn, 0)** for deferring execution; use queueMicrotask or Promise.resolve().then() instead.

5. **Prefer recursive setTimeout over setInterval** for operations that may take variable time.

## Real-World Applications

1. **Polling**: Periodically check for updates from a server.
2. **Animations**: Create smooth transitions and effects.
3. **User Experience**: Delay notifications or tooltips for better UX.
4. **Performance Optimization**: Throttle scroll/resize events.
5. **Auto-save**: Debounce save operations during user input. 