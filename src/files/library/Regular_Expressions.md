# Regular Expressions

Regular expressions (regex or regexp) are powerful patterns used to match character combinations in strings. In JavaScript, they are both objects and a language for defining these patterns.

## Creating Regular Expressions

There are two ways to create a regular expression in JavaScript:

### 1. Regular Expression Literal

```javascript
const regex = /pattern/flags;
```

### 2. RegExp Constructor

```javascript
const regex = new RegExp('pattern', 'flags');
```

The constructor method is useful when the pattern might change or is not known at compile time.

## Basic Patterns

### Simple Character Matching

```javascript
const regex = /hello/;
console.log(regex.test('hello world')); // true
console.log(regex.test('hi there')); // false
```

### Character Classes

Match any one of a set of characters:

```javascript
const regex = /[aeiou]/; // Matches any vowel
console.log(regex.test('hello')); // true
console.log(regex.test('rhythm')); // false
```

### Character Ranges

```javascript
const regex = /[a-z]/; // Matches any lowercase letter
console.log(regex.test('Hello')); // true
console.log(regex.test('123')); // false
```

### Negated Character Classes

```javascript
const regex = /[^0-9]/; // Matches any non-digit
console.log(regex.test('abc')); // true
console.log(regex.test('123')); // false
```

## Metacharacters

Special characters with specific meanings:

| Character | Meaning |
|-----------|---------|
| `.` | Matches any character except newline |
| `\d` | Matches any digit (equivalent to `[0-9]`) |
| `\D` | Matches any non-digit (equivalent to `[^0-9]`) |
| `\w` | Matches any alphanumeric character plus underscore (equivalent to `[A-Za-z0-9_]`) |
| `\W` | Matches any non-word character |
| `\s` | Matches any whitespace character (space, tab, newline) |
| `\S` | Matches any non-whitespace character |
| `\b` | Matches a word boundary |
| `\B` | Matches a non-word boundary |

```javascript
const regex = /\d{3}-\d{3}-\d{4}/;
console.log(regex.test('123-456-7890')); // true (phone number format)
```

## Quantifiers

Specify how many instances of a character or group should be matched:

| Quantifier | Meaning |
|------------|---------|
| `*` | 0 or more (greedy) |
| `+` | 1 or more (greedy) |
| `?` | 0 or 1 (greedy) |
| `{n}` | Exactly n occurrences |
| `{n,}` | n or more occurrences |
| `{n,m}` | Between n and m occurrences |
| `*?`, `+?`, `??`, `{n}?`, `{n,}?`, `{n,m}?` | Non-greedy versions |

```javascript
const regex = /\d+/; // Matches one or more digits
console.log(regex.test('123')); // true
console.log(regex.test('abc')); // false

const html = '<div>Content</div>';
const greedyRegex = /<.+>/; // Greedy - matches the entire string
const lazyRegex = /<.+?>/; // Lazy - matches just '<div>'

console.log(html.match(greedyRegex)[0]); // '<div>Content</div>'
console.log(html.match(lazyRegex)[0]); // '<div>'
```

## Anchors

Specify position in the string:

| Anchor | Meaning |
|--------|---------|
| `^` | Start of string or line |
| `$` | End of string or line |

```javascript
const regex = /^hello$/; // Matches exactly 'hello'
console.log(regex.test('hello')); // true
console.log(regex.test('hello world')); // false
```

## Groups and Capturing

Parentheses create capturing groups:

```javascript
const regex = /(\d{3})-(\d{3})-(\d{4})/;
const phone = '123-456-7890';
const match = phone.match(regex);

console.log(match[0]); // '123-456-7890' (full match)
console.log(match[1]); // '123' (first group)
console.log(match[2]); // '456' (second group)
console.log(match[3]); // '7890' (third group)
```

### Named Capturing Groups (ES2018+)

```javascript
const regex = /(?<area>\d{3})-(?<exchange>\d{3})-(?<line>\d{4})/;
const phone = '123-456-7890';
const match = phone.match(regex);

console.log(match.groups.area); // '123'
console.log(match.groups.exchange); // '456'
console.log(match.groups.line); // '7890'
```

### Non-Capturing Groups

```javascript
const regex = /(?:\d{3})-(\d{3})-(\d{4})/;
const phone = '123-456-7890';
const match = phone.match(regex);

console.log(match[0]); // '123-456-7890' (full match)
console.log(match[1]); // '456' (first captured group)
console.log(match[2]); // '7890' (second captured group)
// No group for '123' since it's non-capturing
```

## Alternation

Match one pattern or another:

```javascript
const regex = /cat|dog/;
console.log(regex.test('I have a cat')); // true
console.log(regex.test('I have a dog')); // true
console.log(regex.test('I have a bird')); // false
```

## Flags

Modify how the pattern is applied:

| Flag | Description |
|------|-------------|
| `g` | Global - find all matches rather than stopping after the first |
| `i` | Case-insensitive matching |
| `m` | Multiline - `^` and `$` match start/end of each line |
| `s` | Dot-all - `.` matches newlines too |
| `u` | Unicode - treat pattern as Unicode |
| `y` | Sticky - match only from lastIndex |

```javascript
const text = 'The quick brown fox jumps over the lazy dog';

// Case-insensitive search
const regexI = /the/i;
console.log(regexI.test(text)); // true

// Global search
const regexG = /the/g;
console.log(text.match(regexG)); // ['the']

// Both global and case-insensitive
const regexGI = /the/gi;
console.log(text.match(regexGI)); // ['The', 'the']
```

## Lookaheads and Lookbehinds

### Positive Lookahead

Matches a pattern only if it's followed by another pattern:

```javascript
const regex = /\d+(?=\s*dollars)/;
console.log('I have 42 dollars'.match(regex)[0]); // '42'
```

### Negative Lookahead

Matches a pattern only if it's NOT followed by another pattern:

```javascript
const regex = /\d+(?!\s*dollars)/;
console.log('I have 42 euros'.match(regex)[0]); // '42'
```

### Positive Lookbehind (ES2018+)

Matches a pattern only if it's preceded by another pattern:

```javascript
const regex = /(?<=\$)\d+/;
console.log('The price is $42'.match(regex)[0]); // '42'
```

### Negative Lookbehind (ES2018+)

Matches a pattern only if it's NOT preceded by another pattern:

```javascript
const regex = /(?<!\$)\d+/;
console.log('Item #42'.match(regex)[0]); // '42'
```

## RegExp Methods

### test()

Tests if a pattern exists in a string:

```javascript
const regex = /hello/;
console.log(regex.test('hello world')); // true
```

### exec()

Executes a search for a match and returns an array of information:

```javascript
const regex = /(\w+)\s(\w+)/;
const result = regex.exec('John Doe');
console.log(result[0]); // 'John Doe'
console.log(result[1]); // 'John'
console.log(result[2]); // 'Doe'
console.log(result.index); // 0 (position of match)
```

## String Methods with RegExp

### match()

Returns an array of matches:

```javascript
const text = 'The rain in Spain falls mainly in the plain';
const regex = /ain/g;
console.log(text.match(regex)); // ['ain', 'ain', 'ain']
```

### matchAll() (ES2020+)

Returns an iterator of all matches:

```javascript
const text = 'The rain in Spain falls mainly in the plain';
const regex = /ain/g;
const matches = [...text.matchAll(regex)];
console.log(matches.map(match => match[0])); // ['ain', 'ain', 'ain']
console.log(matches.map(match => match.index)); // [6, 17, 38]
```

### search()

Returns the index of the first match, or -1 if not found:

```javascript
const text = 'The rain in Spain';
console.log(text.search(/Spain/)); // 12
```

### replace()

Replaces matches with a replacement string:

```javascript
const text = 'The rain in Spain';
console.log(text.replace(/rain/, 'sun')); // 'The sun in Spain'
```

### replaceAll() (ES2021+)

Replaces all matches with a replacement string:

```javascript
const text = 'The rain in Spain falls mainly in the plain';
console.log(text.replaceAll(/ain/g, 'ane')); // 'The rane in Spane falls manely in the plane'
```

### split()

Splits a string into an array of substrings based on a separator pattern:

```javascript
const text = 'The rain in Spain';
console.log(text.split(/\s/)); // ['The', 'rain', 'in', 'Spain']
```

## Backreferences

Reference a captured group within the pattern:

```javascript
const regex = /(\w+)\s\1/;
console.log(regex.test('hello hello')); // true (repeated word)
console.log(regex.test('hello world')); // false (different words)
```

## Common Regex Patterns

### Email Validation

```javascript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test('user@example.com')); // true
console.log(emailRegex.test('invalid-email')); // false
```

### URL Validation

```javascript
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
console.log(urlRegex.test('https://www.example.com')); // true
console.log(urlRegex.test('invalid-url')); // false
```

### Password Strength

```javascript
// At least 8 characters, one uppercase, one lowercase, one number, one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
console.log(passwordRegex.test('Passw0rd!')); // true
console.log(passwordRegex.test('weakpwd')); // false
```

### Date Format (MM/DD/YYYY)

```javascript
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
console.log(dateRegex.test('12/25/2023')); // true
console.log(dateRegex.test('13/25/2023')); // false (invalid month)
```

### IP Address

```javascript
const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
console.log(ipRegex.test('192.168.1.1')); // true
console.log(ipRegex.test('256.0.0.1')); // false (invalid octet)
```

## Performance Considerations

### Avoid Catastrophic Backtracking

Some patterns can cause exponential backtracking:

```javascript
// Bad - can cause catastrophic backtracking
const badRegex = /^(a+)+$/;

// Better - more efficient
const betterRegex = /^a+$/;
```

### Use Non-Capturing Groups When Possible

```javascript
// Capturing groups (slower if you don't need the captures)
const capturingRegex = /(a|b|c)+(d|e|f)+/;

// Non-capturing groups (faster)
const nonCapturingRegex = /(?:a|b|c)+(?:d|e|f)+/;
```

### Limit Use of Lookaheads/Lookbehinds

These can be computationally expensive, especially in complex patterns.

### Be Specific

More specific patterns are generally more efficient:

```javascript
// Less efficient
const looseRegex = /.*foo.*/;

// More efficient
const specificRegex = /foo/;
```

## RegExp in Modern JavaScript

### Unicode Property Escapes (ES2018+)

Match characters based on Unicode properties:

```javascript
const regex = /\p{Script=Greek}/u;
console.log(regex.test('α')); // true
console.log(regex.test('a')); // false
```

### Named Capture Groups (ES2018+)

```javascript
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = '2023-01-15'.match(regex);
console.log(match.groups.year); // '2023'
console.log(match.groups.month); // '01'
console.log(match.groups.day); // '15'
```

### Lookbehind Assertions (ES2018+)

```javascript
const regex = /(?<=\$)\d+(\.\d*)?/;
console.log('Price: $24.99'.match(regex)[0]); // '24.99'
```

### s (dotAll) Flag (ES2018+)

Makes `.` match newlines too:

```javascript
const regex = /hello.world/s;
console.log(regex.test('hello\nworld')); // true
```

## Summary

- Regular expressions are patterns used to match character combinations in strings
- They can be created using literals (`/pattern/`) or the RegExp constructor
- Basic patterns include character classes, metacharacters, and quantifiers
- Capturing groups allow you to extract parts of the matched text
- Lookaheads and lookbehinds provide advanced pattern matching capabilities
- JavaScript provides methods like `test()`, `exec()`, `match()`, and `replace()` for working with regular expressions
- Modern JavaScript has added features like named capture groups and Unicode property escapes
- Performance considerations include avoiding catastrophic backtracking and using non-capturing groups when possible

Regular expressions are a powerful tool for text processing, validation, and extraction in JavaScript applications. 