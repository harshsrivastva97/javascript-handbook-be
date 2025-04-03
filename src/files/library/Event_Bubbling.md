# Event Bubbling

Event bubbling is a key event propagation mechanism in the DOM where events triggered on a nested element "bubble up" through its ancestors in the DOM tree.

## Core Concepts

### Event Propagation Phases

DOM events flow through three phases:

1. **Capture Phase**: Event travels from `window` down to the target element
2. **Target Phase**: Event reaches the target element
3. **Bubbling Phase**: Event bubbles up from the target back to `window`

```
          │ CAPTURE │
          ▼         │
┌─────────────────────┐
│        window       │
├─────────────────────┤
│       document      │
├─────────────────────┤
│         html        │
├─────────────────────┤
│         body        │
├─────────────────────┤
│        parent       │
├─────────────────────┤
│    target element   │ ◄── Event target
├─────────────────────┤
│         child       │
└─────────────────────┘
          │         ▲
          │ BUBBLING│
```

### Basic Example

```html
<div id="outer">
  <div id="inner">
    <button id="button">Click Me</button>
  </div>
</div>
```

```javascript
// These handlers will all trigger on button click
document.getElementById('button').addEventListener('click', e => {
  console.log('Button clicked');
});

document.getElementById('inner').addEventListener('click', e => {
  console.log('Inner div clicked');
});

document.getElementById('outer').addEventListener('click', e => {
  console.log('Outer div clicked');
});

document.body.addEventListener('click', e => {
  console.log('Body clicked');
});

// Output when button is clicked:
// "Button clicked"
// "Inner div clicked"
// "Outer div clicked"
// "Body clicked"
```

## Controlling Event Propagation

### Stopping Propagation

```javascript
document.getElementById('button').addEventListener('click', e => {
  console.log('Button clicked');
  e.stopPropagation(); // Prevents bubbling to parent elements
});

// Only "Button clicked" will be logged
```

### Immediate Propagation

```javascript
document.getElementById('button').addEventListener('click', e => {
  console.log('Button handler 1');
  e.stopImmediatePropagation(); // Stops other handlers on same element
});

document.getElementById('button').addEventListener('click', e => {
  console.log('Button handler 2'); // This won't execute
});
```

### Capture Phase Listening

By default, event listeners respond during the bubbling phase. Set the third parameter to `true` to listen during the capture phase:

```javascript
document.getElementById('outer').addEventListener('click', e => {
  console.log('Outer div - capture phase');
}, true); // true enables capture phase

document.getElementById('button').addEventListener('click', e => {
  console.log('Button clicked - bubbling phase');
});

// Output when button is clicked:
// "Outer div - capture phase"
// "Button clicked - bubbling phase"
```

## Event Delegation

Event delegation leverages bubbling to handle events for multiple elements with a single listener on a common ancestor.

### Without Event Delegation

```javascript
// Inefficient approach for many items
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleItemClick);
});
```

### With Event Delegation

```javascript
// Efficient approach using a single listener
document.getElementById('items-container').addEventListener('click', e => {
  if (e.target.matches('.item')) {
    handleItemClick(e);
  }
});
```

### Benefits of Event Delegation

1. **Memory efficiency**: Fewer event listeners
2. **Dynamic elements**: Works for elements added after page load
3. **Less code**: Simplified event binding
4. **Performance**: Reduced initialization time

## Custom Events

Custom events also participate in the bubbling process.

```javascript
// Create and dispatch a custom event
const customEvent = new CustomEvent('itemSelected', {
  bubbles: true, // Enable bubbling
  detail: { id: 123 } // Custom data
});

document.getElementById('item').dispatchEvent(customEvent);

// Listen for the custom event
document.getElementById('items-container').addEventListener('itemSelected', e => {
  console.log('Item selected:', e.detail.id);
});
```

## Interview Focus Points

1. **Event Object Properties**:
   - `e.target`: The element that triggered the event
   - `e.currentTarget`: The element with the attached listener
   - `e.eventPhase`: Current phase (1=capture, 2=target, 3=bubbling)

2. **Not All Events Bubble**:
   Events like `focus`, `blur`, `load`, `unload`, and `resize` don't bubble.

3. **Event Delegation Limitations**:
   - Doesn't work for non-bubbling events
   - May require complex matching logic for deeply nested structures

4. **Performance Implications**:
   - Excessive stopping of propagation can impact developer tools
   - Event delegation is more efficient for large numbers of elements

## Best Practices

1. **Use event delegation** for collections of similar elements.

2. **Avoid stopping propagation** unless absolutely necessary.

3. **Be specific with event selectors** in delegated handlers:
   ```javascript
   // Better approach with more specific matching
   if (e.target.matches('.item:not(.disabled)')) {
     // Handle only non-disabled items
   }
   ```

4. **Consider event origin** when handling events:
   ```javascript
   document.addEventListener('click', e => {
     // Check if click was inside or outside an element
     if (!myElement.contains(e.target)) {
       closeMyElement();
     }
   });
   ```

5. **Clean up listeners** to prevent memory leaks:
   ```javascript
   function addListener() {
     document.addEventListener('click', handleClick);
   }
   
   function removeListener() {
     document.removeEventListener('click', handleClick);
   }
   ```

## Common Patterns

### Modal Close on Outside Click
```javascript
document.addEventListener('click', e => {
  if (modal.classList.contains('open') && !modal.contains(e.target)) {
    closeModal();
  }
});
```

### Efficient Table Row Handling
```javascript
document.getElementById('data-table').addEventListener('click', e => {
  const row = e.target.closest('tr');
  if (!row) return;
  
  if (e.target.matches('.edit-btn')) {
    editRow(row);
  } else if (e.target.matches('.delete-btn')) {
    deleteRow(row);
  } else {
    selectRow(row);
  }
});
```

### Form Validation
```javascript
document.getElementById('signup-form').addEventListener('input', e => {
  if (e.target.matches('input[type="email"]')) {
    validateEmail(e.target);
  } else if (e.target.matches('input[type="password"]')) {
    validatePassword(e.target);
  }
});
``` 