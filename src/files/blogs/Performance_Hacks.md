# Performance Hacks: Optimizing JS for Speed

*March 23, 2025 | Category: JavaScript*

JavaScript powers the web, but sloppy code can slow it to a crawl. Whether it’s a laggy UI or a bloated app, performance matters. Let’s explore battle-tested hacks—debouncing, memoization, and more—to make your JS fly without breaking a sweat.

---

## 1. Debouncing: Calm the Event Storm
Ever had a search input firing requests on every keystroke? That’s an event storm—expensive and unnecessary. **Debouncing** delays a function until the user stops triggering it.

### How It Works
Wrap a function to wait a set time before running—perfect for inputs or scroll events.

```javascript
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const expensiveSearch = (query) => console.log(`Searching: ${query}`);
const debouncedSearch = debounce(expensiveSearch, 300);

window.addEventListener('input', (e) => debouncedSearch(e.target.value));
// Logs only after 300ms of typing pause
```

**Why It Rocks**: Cuts redundant calls, saves CPU, and keeps APIs happy.

**Use Case**: Search bars, resize listeners, scroll handlers.

## 2. Memoization: Cache the Heavy Lifting
Why recompute the same thing over and over? Memoization caches function results based on inputs—ideal for pricey calculations.

### How It Works
Store results in an object and return the cached value if inputs match.

```javascript
function memoize(fn) {
  const cache = {};
  return (arg) => {
    if (arg in cache) return cache[arg];
    return (cache[arg] = fn(arg));
  };
}

const slowFactorial = (n) => {
  if (n <= 1) return 1;
  return n * slowFactorial(n - 1);
};

const fastFactorial = memoize(slowFactorial);
console.log(fastFactorial(10)); // Computes: 3628800
console.log(fastFactorial(10)); // Cached: 3628800
```

**Why It Rocks**: Speeds up recursive or repetitive tasks—big wins for math or data crunching.

**Use Case**: Fibonacci, API response parsing, React’s useMemo.

## 3. Throttling: Pace Yourself
Similar to debouncing, throttling limits how often a function runs—great for continuous events like scrolling or mouse moves.

### How It Works
Ensure a function fires at most once per interval.

```javascript
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const logScroll = () => console.log('Scrolled!');
const throttledScroll = throttle(logScroll, 200);

window.addEventListener('scroll', throttledScroll);
// Logs max once every 200ms
```

**Why It Rocks**: Balances performance and responsiveness.

**Use Case**: Infinite scroll, animation triggers.

## 4. Avoid Reflows: Batch DOM Updates
DOM operations like reading offsetHeight or writing styles trigger reflows—costly layout recalculations. Batch changes to minimize them.

#### How It Works
Group DOM writes together, avoid interleaving reads and writes.
```javascript
// Slow: Triggers multiple reflows
const list = document.querySelector('ul');
for (let i = 0; i < 100; i++) {
  list.innerHTML += `<li>Item ${i}</li>`;
}

// Fast: One reflow
const items = [];
for (let i = 0; i < 100; i++) {
  items.push(`<li>Item ${i}</li>`);
}
list.innerHTML = items.join('');
```
**Why It Rocks**: Slashes rendering time—crucial for large UIs.

**Use Case**: Dynamic lists, animations.

## Quick Wins
- **Use `requestAnimationFrame`**: Sync animations with the browser’s refresh rate.
- **Array Methods**: Swap `for` loops with `map` or `filter`—optimized under the hood.
- **Object.freeze()**: Prevent accidental mutations in static data.

## Final Thoughts
Speed isn’t just about bragging rights—it’s user experience. Debouncing tames events, memoization cuts compute costs, throttling paces execution, and smart DOM updates keep rendering snappy.