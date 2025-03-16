# Async/Defer

Script loading attributes `async` and `defer` optimize page performance by controlling how and when external JavaScript files load and execute.

## Core Concepts

### Default Script Loading
Without special attributes, scripts block HTML parsing until downloaded and executed.

```html
<script src="script.js"></script>
```

**Behavior:**
1. HTML parsing pauses
2. Script downloads
3. Script executes
4. HTML parsing resumes

**Impact:** Slow page rendering, especially with large scripts or slow connections.

### Async Attribute
Scripts load asynchronously while HTML parsing continues, but execute immediately when downloaded.

```html
<script async src="script.js"></script>
```

**Behavior:**
1. HTML parsing continues during download
2. Script executes as soon as it's downloaded (parsing pauses during execution)
3. HTML parsing resumes after execution

**Use Cases:**
- Analytics scripts
- Ads
- Independent functionality not requiring specific DOM elements
- Scripts that don't depend on other scripts

### Defer Attribute
Scripts load asynchronously while HTML parsing continues, but execution is deferred until parsing completes.

```html
<script defer src="script.js"></script>
```

**Behavior:**
1. HTML parsing continues during download
2. Script execution waits until HTML parsing completes
3. Deferred scripts execute in order before DOMContentLoaded event

**Use Cases:**
- Scripts that manipulate DOM elements
- Scripts with dependencies on other scripts
- Core functionality that should load in a specific order

## Visual Comparison

```
┌───────────────────────────────────────────────────┐
│ Regular: Parse HTML ─ Download ─ Execute ─ Parse  │
├───────────────────────────────────────────────────┤
│ Async:   Parse HTML ──────────┐                   │
│                 Download ─ Execute ─ Parse HTML   │
├───────────────────────────────────────────────────┤
│ Defer:   Parse HTML ──────────────────────┐       │
│                 Download ─────────────────┘Execute│
└───────────────────────────────────────────────────┘
```

## Module Scripts

Modern JavaScript modules have different loading behavior.

```html
<script type="module" src="module.js"></script>
```

**Behavior:**
- Modules are deferred by default (similar to `defer`)
- Can add `async` to override default deferred behavior
- Always execute in strict mode
- Have their own scope
- Use CORS for cross-origin requests

## Interview Focus Points

1. **Execution Order**:
   - Regular scripts: Execute in order of appearance
   - Async scripts: Execute in order of download completion (race condition)
   - Defer scripts: Execute in order of appearance after HTML parsing

2. **Event Timing**:
   - Async: May execute before or after DOMContentLoaded
   - Defer: Always execute before DOMContentLoaded
   - Both: Execute before load event

3. **Browser Support**:
   - Both attributes are widely supported in modern browsers
   - Older browsers may ignore these attributes

4. **Inline Scripts**:
   - Async and defer only work with external scripts (src attribute)
   - Inline scripts always block parsing

## Best Practices

1. **Use defer for most scripts** that interact with the DOM or have dependencies.

2. **Use async for independent scripts** like analytics, where execution order doesn't matter.

3. **Place critical scripts inline** at the end of the body for fastest execution.

4. **Combine with other optimization techniques**:
   - Minification
   - HTTP/2 multiplexing
   - Browser caching
   - Script preloading: `<link rel="preload" href="script.js" as="script">`

5. **Consider dynamic script loading** for conditional scripts:
   ```javascript
   function loadScript(src) {
     const script = document.createElement('script');
     script.src = src;
     script.async = true;
     document.head.appendChild(script);
   }
   ```

## Real-World Impact

1. **Performance Metrics**:
   - First Contentful Paint (FCP): Improved by both async and defer
   - Time to Interactive (TTI): Improved by defer
   - Largest Contentful Paint (LCP): Improved by both

2. **User Experience**:
   - Faster perceived loading time
   - Reduced layout shifts
   - Earlier interactivity

3. **SEO Benefits**:
   - Page speed is a ranking factor
   - Better Core Web Vitals scores

## Common Pitfalls

1. **Script Dependencies**: Async scripts may execute out of order, breaking dependencies.

2. **DOM Manipulation**: Async scripts may execute before DOM is ready.

3. **Race Conditions**: Multiple async scripts can create unpredictable behavior.

4. **Event Listeners**: Deferred scripts that add event listeners may miss early user interactions. 