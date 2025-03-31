# Operators

JavaScript operators enable value manipulation through arithmetic, comparison, logical operations, and modern syntax shortcuts.

## Core Operators

### Arithmetic
```javascript
let sum = 5 + 3;    // 8
let diff = 10 - 4;  // 6
let product = 3 * 4; // 12
let quotient = 8 / 2; // 4
let remainder = 9 % 2; // 1 (modulus)
let power = 2 ** 3;  // 8 (exponentiation)
```

### Assignment
```javascript
let x = 5;
x += 3;  // x = 8 (same as x = x + 3)
x -= 2;  // x = 6
x *= 2;  // x = 12
x /= 3;  // x = 4
x %= 3;  // x = 1
x **= 2; // x = 1
```

### Comparison
```javascript
5 == '5';   // true (loose equality, coerces types)
5 === '5';  // false (strict equality, checks types)
5 != '6';   // true
5 !== '5';  // true
5 > 3;      // true
5 >= 5;     // true
3 < 5;      // true
3 <= 3;     // true
```

### Logical
```javascript
true && false;  // false (AND)
true || false;  // true (OR)
!true;          // false (NOT)
```

### Unary
```javascript
let x = 5;
++x;  // 6 (pre-increment)
x++;  // 6, then x becomes 7 (post-increment)
--x;  // 6 (pre-decrement)
x--;  // 6, then x becomes 5 (post-decrement)
+x;   // converts to number
-x;   // negates value
```

## Modern Operators (ES6+)

### Spread/Rest
```javascript
// Spread (expands arrays/objects)
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];  // [1, 2, 3, 4, 5]
const obj = { name: 'John' };
const newObj = { ...obj, age: 30 };  // { name: 'John', age: 30 }

// Rest (collects values into array)
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10
```

### Nullish Coalescing (??)
Returns right operand when left is `null` or `undefined` (not other falsy values).
```javascript
const value = null ?? 'default';  // 'default'
const zero = 0 ?? 42;             // 0 (preserves 0, unlike ||)
const empty = '' ?? 'default';    // '' (preserves empty string)
```

### Optional Chaining (?.)
Safely accesses nested properties without throwing errors.
```javascript
const user = { 
  profile: { 
    address: null 
  } 
};
const city = user?.profile?.address?.city;  // undefined (no error)
const zip = user?.profile?.address?.zip ?? 'No zip';  // 'No zip'
```

### Logical Assignment
```javascript
// Nullish assignment (??=)
let x = null;
x ??= 42;  // x = 42

// Logical OR assignment (||=)
let y = 0;
y ||= 42;  // y = 42 (assigns when falsy)

// Logical AND assignment (&&=)
let z = 1;
z &&= 42;  // z = 42 (assigns when truthy)
```

## Interview Focus Points

1. **Operator Precedence**: Multiplication/division before addition/subtraction; parentheses override.
2. **Short-Circuit Evaluation**: `&&` and `||` evaluate only what's necessary.
   ```javascript
   false && expensiveOperation();  // expensiveOperation never runs
   true || expensiveOperation();   // expensiveOperation never runs
   ```
3. **Type Coercion**: Operators can trigger implicit type conversion.
   ```javascript
   '5' + 3;  // '53' (string concatenation)
   '5' - 3;  // 2 (numeric subtraction)
   ```
4. **Destructuring**: Special syntax using assignment operators.
   ```javascript
   const [first, second] = [1, 2];
   const { name, age } = { name: 'Alice', age: 30 };
   ```

## Best Practices

1. Use `===` instead of `==` to avoid unexpected type coercion.
2. Prefer `??` over `||` when 0 or empty string are valid values.
3. Use optional chaining for potentially undefined properties.
4. Leverage destructuring for cleaner code.
5. Use parentheses to clarify complex expressions.

## Performance Considerations

1. Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`) are fastest for integer operations.
2. Short-circuit evaluation can optimize performance.
3. Complex destructuring can impact performance in critical loops. 