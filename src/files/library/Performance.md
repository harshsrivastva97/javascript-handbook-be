# Performance

JavaScript performance optimization is critical for creating responsive web applications. This guide covers key techniques for identifying and resolving performance bottlenecks.

## Core Performance Concepts

### Critical Rendering Path

The sequence of steps browsers take to convert HTML, CSS, and JavaScript into pixels on the screen:

1. **DOM Construction**: Parse HTML to create Document Object Model
2. **CSSOM Construction**: Parse CSS to create CSS Object Model
3. **Render Tree Construction**: Combine DOM and CSSOM
4. **Layout**: Calculate element positions and sizes
5. **Paint**: Fill in pixels
6. **Composite**: Layer elements correctly

### Performance Metrics

```javascript
// Core Web Vitals and other key metrics
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.startTime.toFixed(0)}ms`);
  }
});

observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

// Custom performance measurements
performance.mark('functionStart');
expensiveFunction();
performance.mark('functionEnd');
performance.measure('functionDuration', 'functionStart', 'functionEnd');

const measures = performance.getEntriesByType('measure');
console.log(`Function took ${measures[0].duration.toFixed(2)}ms`);
```

## JavaScript Optimization Techniques

### 1. Efficient DOM Manipulation

```javascript
// Bad: Causes multiple reflows
for (let i = 0; i < 100; i++) {
  document.getElementById('container').innerHTML += `<div>${i}</div>`;
}

// Good: Batch DOM updates
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  div.textContent = i;
  fragment.appendChild(div);
}
document.getElementById('container').appendChild(fragment);

// Better: Use template and cloneNode for repeated elements
const template = document.createElement('div');
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const clone = template.cloneNode();
  clone.textContent = i;
  fragment.appendChild(clone);
}
document.getElementById('container').appendChild(fragment);
```

### 2. Debouncing and Throttling

```javascript
// Debounce: Execute after pause in events
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle: Execute at maximum frequency
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
const debouncedResize = debounce(() => recalculateLayout(), 250);
window.addEventListener('resize', debouncedResize);

const throttledScroll = throttle(() => updateScrollIndicator(), 100);
window.addEventListener('scroll', throttledScroll);
```

### 3. Memoization

```javascript
// Cache expensive function results
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveCalculation = (n) => {
  console.log('Computing...');
  return n < 2 ? n : expensiveCalculation(n-1) + expensiveCalculation(n-2);
};

const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(40)); // Slow first time
console.log(memoizedCalc(40)); // Instant from cache
```

### 4. Web Workers

```javascript
// Offload heavy computation to background thread
// main.js
const worker = new Worker('worker.js');

worker.addEventListener('message', (e) => {
  console.log('Result:', e.data.result);
  document.getElementById('output').textContent = e.data.result;
});

document.getElementById('calculate').addEventListener('click', () => {
  const data = { numbers: Array.from({length: 10000000}, () => Math.random()) };
  worker.postMessage(data);
});

// worker.js
self.addEventListener('message', (e) => {
  const numbers = e.data.numbers;
  const result = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  self.postMessage({ result });
});
```

### 5. Virtual DOM and List Virtualization

```javascript
// Simple virtual list implementation
class VirtualList {
  constructor(container, itemHeight, totalItems, renderItem) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.totalItems = totalItems;
    this.renderItem = renderItem;
    
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight) + 2;
    this.scrollTop = 0;
    this.startIndex = 0;
    
    this.container.style.position = 'relative';
    this.container.style.height = `${totalItems * itemHeight}px`;
    this.container.style.overflow = 'auto';
    
    this.container.addEventListener('scroll', this.onScroll.bind(this));
    this.renderVisibleItems();
  }
  
  onScroll() {
    this.scrollTop = this.container.scrollTop;
    this.renderVisibleItems();
  }
  
  renderVisibleItems() {
    this.container.innerHTML = '';
    this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
    
    for (let i = 0; i < this.visibleItems; i++) {
      const index = this.startIndex + i;
      if (index >= this.totalItems) break;
      
      const item = this.renderItem(index);
      item.style.position = 'absolute';
      item.style.top = `${index * this.itemHeight}px`;
      item.style.height = `${this.itemHeight}px`;
      item.style.left = 0;
      item.style.right = 0;
      
      this.container.appendChild(item);
    }
  }
}

// Usage
const container = document.getElementById('list-container');
const virtualList = new VirtualList(
  container,
  50, // item height in pixels
  10000, // total items
  (index) => {
    const div = document.createElement('div');
    div.textContent = `Item ${index}`;
    return div;
  }
);
```

## Network Optimization

### 1. Resource Loading

```javascript
// Lazy loading images
document.querySelectorAll('img[data-src]').forEach(img => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        observer.disconnect();
      }
    });
  });
  observer.observe(img);
});

// Preloading critical resources
function preloadCriticalAssets() {
  const preloadLinks = [
    { href: 'critical.css', as: 'style' },
    { href: 'main.js', as: 'script' },
    { href: 'hero.jpg', as: 'image' }
  ];
  
  preloadLinks.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });
}
```

### 2. Code Splitting and Bundling

```javascript
// Dynamic imports for route-based code splitting
const loadProfilePage = async () => {
  try {
    const module = await import('./profile.js');
    module.initProfilePage();
  } catch (error) {
    console.error('Failed to load profile module:', error);
  }
};

document.getElementById('profile-link').addEventListener('click', (e) => {
  e.preventDefault();
  loadProfilePage();
});
```

## Memory Management

### 1. Identifying Memory Leaks

```javascript
// Common memory leak: Forgotten event listeners
function setupModal() {
  const modal = document.createElement('div');
  document.body.appendChild(modal);
  
  const closeButton = document.createElement('button');
  modal.appendChild(closeButton);
  
  // Leak: Event listener keeps reference to modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
  
  // Fix: Store and remove listener
  const keyHandler = function(e) {
    if (e.key === 'Escape') modal.style.display = 'none';
  };
  document.addEventListener('keydown', keyHandler);
  
  return {
    destroy: function() {
      document.removeEventListener('keydown', keyHandler);
      document.body.removeChild(modal);
    }
  };
}

// Usage
const modal = setupModal();
// Later when done
modal.destroy();
```

### 2. Memory-Efficient Data Structures

```javascript
// Use typed arrays for binary data
function processImageData(width, height) {
  // Instead of regular array
  // const pixels = new Array(width * height * 4);
  
  // Use typed array for better performance and memory usage
  const pixels = new Uint8ClampedArray(width * height * 4);
  
  // Fill with data
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255;    // R
    pixels[i+1] = 0;    // G
    pixels[i+2] = 0;    // B
    pixels[i+3] = 255;  // A
  }
  
  return new ImageData(pixels, width, height);
}
```

## Interview Focus Points

1. **Rendering Performance**:
   - Minimize layout thrashing (read layout properties, then batch DOM updates)
   - Use CSS transforms/opacity for animations (triggers compositing only)
   - Avoid forced synchronous layouts (e.g., reading offsetHeight after changing styles)

2. **JavaScript Execution**:
   - Long tasks block the main thread (aim for <50ms chunks)
   - Use requestAnimationFrame for visual updates
   - Defer non-critical JavaScript
   - Break up large computations with setTimeout or requestIdleCallback

3. **Memory Management**:
   - Closures can cause memory leaks if they reference large objects
   - Always clean up event listeners, timers, and observers
   - Watch for accidental global variables
   - Use Chrome DevTools Memory panel to identify leaks

4. **Network Optimization**:
   - Minimize request counts (bundling, sprites, data URIs)
   - Reduce payload sizes (compression, minification)
   - Implement proper caching strategies
   - Use HTTP/2 or HTTP/3 for multiplexing

## Best Practices

1. **Measure First**: Use Performance API, Lighthouse, and Chrome DevTools to identify actual bottlenecks.

2. **Optimize Critical Rendering Path**:
   - Inline critical CSS
   - Defer non-critical JavaScript
   - Minimize render-blocking resources

3. **Implement Progressive Enhancement**:
   - Core functionality works without JavaScript
   - Enhanced experience with JavaScript
   - Graceful degradation for older browsers

4. **Adopt Modern Techniques**:
   - Intersection Observer for lazy loading
   - ResizeObserver for responsive elements
   - Web Workers for CPU-intensive tasks
   - Service Workers for offline capabilities

5. **Follow the RAIL Model**:
   - **Response**: Process events in under 50ms
   - **Animation**: Produce frames in 10ms (60fps)
   - **Idle**: Maximize idle time
   - **Load**: Deliver content in under 1 second

## Performance Audit Checklist

1. **JavaScript**:
   - Minimize parse/compile time
   - Avoid layout thrashing
   - Optimize event listeners
   - Use appropriate data structures

2. **Rendering**:
   - Reduce DOM size and depth
   - Minimize style calculations
   - Avoid forced synchronous layouts
   - Optimize animations

3. **Loading**:
   - Implement code splitting
   - Optimize critical rendering path
   - Use resource hints (preload, prefetch)
   - Implement lazy loading

4. **Memory**:
   - Clean up event listeners
   - Avoid memory leaks
   - Use appropriate data structures
   - Monitor memory usage 