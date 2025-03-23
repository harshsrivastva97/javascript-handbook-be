# Type Coercion

Type Coercion is JavaScript's automatic conversion of values from one type to another. Understanding coercion is crucial for avoiding unexpected behavior.

## What is Type Coercion?

Type coercion is the process of converting a value from one data type to another. In JavaScript, this happens in two ways:

1. **Implicit Coercion**: Automatic type conversion by JavaScript
2. **Explicit Coercion**: Manual type conversion using functions like `Number()`, `String()`, etc.

## Implicit Coercion

### String Coercion

When the `+` operator is used with a string and another type, the other type is converted to a string:

```javascript
console.log(1 + '2');     // '12' (number to string)
console.log('3' + 4);     // '34' (number to string)
console.log(1 + 2 + '3'); // '33' (left to right: 1+2=3, then 3+'3'='33')
console.log('3' + 2 + 1); // '321' (left to right: '3'+2='32', then '32'+1='321')
```

### Boolean Coercion

In logical contexts (like `if` statements), values are converted to booleans:

```javascript
if ('hello') {
  // 'hello' is coerced to true
  console.log('String is truthy');
}

if (0) {
  // 0 is coerced to false, so this won't run
} else {
  console.log('0 is falsy');
}
```

### Numeric Coercion

In arithmetic operations (except `+` with strings), values are converted to numbers:

```javascript
console.log('5' - 2);     // 3 (string to number)
console.log('5' * 2);     // 10 (string to number)
console.log('5' / 2);     // 2.5 (string to number)
console.log(true + 1);    // 2 (true is coerced to 1)
console.log(false + 1);   // 1 (false is coerced to 0)
```

### Equality Operators

The loose equality operator (`==`) performs type coercion:

```javascript
console.log(5 == '5');    // true (string to number)
console.log(true == 1);   // true (boolean to number)
console.log(null == undefined); // true (special case)
console.log(0 == false);  // true (both coerced to number)
```

The strict equality operator (`===`) does not perform type coercion:

```javascript
console.log(5 === '5');   // false (different types)
console.log(true === 1);  // false (different types)
console.log(null === undefined); // false (different types)
```

## Explicit Coercion

### To String

```javascript
// Using String()
console.log(String(123));      // '123'
console.log(String(true));     // 'true'
console.log(String(null));     // 'null'

// Using toString()
console.log((123).toString());  // '123'
console.log(true.toString());   // 'true'
// console.log(null.toString()); // Error: Cannot read property 'toString' of null

// Using concatenation with empty string
console.log(123 + '');         // '123'
console.log(true + '');        // 'true'
console.log(null + '');        // 'null'
```

### To Number

```javascript
// Using Number()
console.log(Number('123'));    // 123
console.log(Number(''));       // 0
console.log(Number('hello'));  // NaN
console.log(Number(true));     // 1
console.log(Number(false));    // 0
console.log(Number(null));     // 0
console.log(Number(undefined)); // NaN

// Using parseInt() and parseFloat()
console.log(parseInt('123'));  // 123
console.log(parseInt('123.45')); // 123 (integer only)
console.log(parseFloat('123.45')); // 123.45

// Using unary plus operator
console.log(+'123');           // 123
console.log(+'123.45');        // 123.45
console.log(+true);            // 1
console.log(+false);           // 0
```

### To Boolean

```javascript
// Using Boolean()
console.log(Boolean(1));       // true
console.log(Boolean(0));       // false
console.log(Boolean('hello')); // true
console.log(Boolean(''));      // false
console.log(Boolean(null));    // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));     // false

// Using double negation
console.log(!!1);              // true
console.log(!!0);              // false
console.log(!!'hello');        // true
console.log(!!'');             // false
```

## Truthy and Falsy Values

In JavaScript, all values are either "truthy" or "falsy" when coerced to a boolean.

### Falsy Values

There are only six falsy values in JavaScript:

1. `false`
2. `0` (zero)
3. `''` or `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

Everything else is truthy, including:

- `'0'` (string containing zero)
- `'false'` (string containing the word "false")
- `[]` (empty array)
- `{}` (empty object)
- Functions

```javascript
console.log(!!'');        // false
console.log(!!0);         // false
console.log(!!null);      // false
console.log(!!undefined); // false
console.log(!!NaN);       // false
console.log(!!false);     // false

console.log(!!'0');       // true
console.log(!!'false');   // true
console.log(!![]);        // true
console.log(!!{});        // true
console.log(!!function(){}); // true
```

## Object Coercion

When objects are coerced to primitives, JavaScript calls internal methods:

1. `valueOf()`: Called first for numeric operations
2. `toString()`: Called if `valueOf()` doesn't return a primitive, or for string operations

```javascript
const obj = { value: 42 };
console.log(obj + '');  // '[object Object]' (default toString())

// Custom toString
const customObj = {
  toString() {
    return 'Custom String';
  }
};
console.log(customObj + '');  // 'Custom String'

// Custom valueOf
const numObj = {
  valueOf() {
    return 42;
  }
};
console.log(numObj + 1);  // 43
```

## Common Gotchas

### Array Coercion

```javascript
console.log([1, 2, 3] + [4, 5, 6]); // '1,2,34,5,6' (arrays convert to strings)
console.log([] + []);     // '' (empty arrays convert to empty strings)
console.log([] + {});     // '[object Object]' (empty array + object)
console.log({} + []);     // '[object Object]' or 0 (browser dependent)
```

### Object Coercion

```javascript
console.log({} + {});     // '[object Object][object Object]'
console.log({} == {});    // false (different references)
console.log({} === {});   // false (different references)
```

### Numeric Operations

```javascript
console.log(true + true); // 2 (true coerced to 1)
console.log(true + false); // 1 (true -> 1, false -> 0)
console.log('5' - '2');   // 3 (strings coerced to numbers)
console.log('5' + - '2'); // '5-2' (unary minus has higher precedence)
```

### Loose Equality Edge Cases

```javascript
console.log('' == 0);     // true
console.log('0' == 0);    // true
console.log('' == '0');   // false
console.log(false == 0);  // true
console.log(false == ''); // true
console.log(false == '0'); // true
console.log(null == undefined); // true
console.log(null == 0);   // false (special case)
```

## Best Practices

1. **Use strict equality (`===`)** to avoid unexpected type coercion
2. **Be explicit about conversions** using functions like `Number()`, `String()`, etc.
3. **Use explicit conditionals** instead of relying on truthy/falsy values when clarity is important
4. **Be careful with the `+` operator** as it behaves differently with strings
5. **Understand the coercion rules** to avoid bugs
6. **Use linters** that warn about implicit coercion
7. **Consider using TypeScript** for static type checking

## Summary

- JavaScript performs automatic type coercion in many contexts
- Implicit coercion happens in operations with mixed types
- Explicit coercion is more predictable and readable
- Loose equality (`==`) performs type coercion, strict equality (`===`) doesn't
- All values in JavaScript are either truthy or falsy when coerced to boolean
- Understanding coercion is essential for writing bug-free JavaScript code 