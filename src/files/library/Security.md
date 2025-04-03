# Security

JavaScript security is critical for protecting web applications from various attacks. This guide covers essential security concepts, vulnerabilities, and best practices.

## Common Web Security Vulnerabilities

### 1. Cross-Site Scripting (XSS)

XSS attacks occur when untrusted data is included in a web page without proper validation or escaping.

```javascript
// Vulnerable code
document.getElementById('userProfile').innerHTML = 
  `<h1>Welcome, ${userInput}!</h1>`;  // userInput could contain malicious script

// Secure approach - Escape HTML
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (match) => {
    const escape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escape[match];
  });
}

document.getElementById('userProfile').innerHTML = 
  `<h1>Welcome, ${escapeHTML(userInput)}!</h1>`;

// Better approach - Use textContent instead of innerHTML
document.getElementById('userProfile').textContent = `Welcome, ${userInput}!`;
```

#### Types of XSS:

1. **Reflected XSS**: Malicious script is reflected off the web server (e.g., in search results)
2. **Stored XSS**: Malicious script is stored on the server (e.g., in a database)
3. **DOM-based XSS**: Vulnerability exists in client-side code

### 2. Cross-Site Request Forgery (CSRF)

CSRF tricks users into performing actions they didn't intend to perform.

```javascript
// Protection: Include CSRF tokens in forms
const csrfToken = generateSecureToken();
sessionStorage.setItem('csrfToken', csrfToken);

// Add to forms
const form = document.getElementById('transferForm');
const csrfInput = document.createElement('input');
csrfInput.type = 'hidden';
csrfInput.name = 'csrf_token';
csrfInput.value = csrfToken;
form.appendChild(csrfInput);

// Server-side verification (pseudocode)
function handleFormSubmission(req, res) {
  if (req.body.csrf_token !== req.session.csrfToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  // Process the form...
}
```

### 3. Content Security Policy (CSP)

CSP helps prevent XSS and data injection attacks by controlling which resources can be loaded.

```javascript
// Set CSP headers (server-side)
// Example in Express.js
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' https://trusted-cdn.com; " +
    "style-src 'self' https://trusted-cdn.com; " +
    "img-src 'self' data: https://trusted-cdn.com; " +
    "connect-src 'self' https://api.example.com;"
  );
  next();
});

// Report-only mode for testing
res.setHeader(
  'Content-Security-Policy-Report-Only',
  "default-src 'self'; report-uri /csp-violation-report"
);
```

### 4. JSON Web Tokens (JWT) Security

```javascript
// Client-side JWT handling
function login(username, password) {
  return fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      // Store JWT securely
      localStorage.setItem('token', data.token);
      // Better: Use HttpOnly cookies (set by server)
    }
    return data;
  });
}

// Adding JWT to requests
function fetchProtectedResource() {
  const token = localStorage.getItem('token');
  
  return fetch('/api/protected-resource', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return response.json();
  });
}
```

### 5. Secure Cookies

```javascript
// Server-side cookie setting (Express.js example)
app.use(session({
  secret: 'your-secret-key',
  cookie: {
    httpOnly: true,     // Prevents JavaScript access
    secure: true,       // Requires HTTPS
    sameSite: 'strict', // Prevents CSRF
    maxAge: 3600000     // 1 hour expiry
  }
}));
```

## Client-Side Security Best Practices

### 1. Input Validation

```javascript
// Client-side validation
function validateForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address');
    return false;
  }
  
  // Password strength
  if (password.length < 8) {
    showError('Password must be at least 8 characters');
    return false;
  }
  
  // IMPORTANT: Always validate on server-side too!
  return true;
}
```

### 2. Sanitizing User Input

```javascript
// Using DOMPurify library to sanitize HTML
import DOMPurify from 'dompurify';

function displayUserGeneratedContent(content) {
  // Allow some HTML but sanitize it
  const clean = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href', 'target']
  });
  
  document.getElementById('content').innerHTML = clean;
}
```

### 3. Preventing Prototype Pollution

```javascript
// Vulnerable code
function mergeObjects(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object') {
      target[key] = target[key] || {};
      mergeObjects(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Secure version
function mergeObjectsSecure(target, source) {
  for (const key in source) {
    // Prevent __proto__ and constructor pollution
    if (key === '__proto__' || key === 'constructor') {
      continue;
    }
    
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      mergeObjectsSecure(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Even better: Use Object.create(null) for "clean" objects
const cleanObject = Object.create(null);
// cleanObject has no prototype, so no prototype pollution risk
```

### 4. Secure Communication

```javascript
// Enforce HTTPS
if (window.location.protocol === 'http:' && 
    window.location.hostname !== 'localhost') {
  window.location.href = window.location.href.replace('http:', 'https:');
}

// Use Fetch with credentials
fetch('https://api.example.com/data', {
  credentials: 'include', // Sends cookies with cross-origin requests
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 5. Subresource Integrity (SRI)

```html
<!-- Ensure external scripts haven't been tampered with -->
<script 
  src="https://cdn.example.com/library.js" 
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC" 
  crossorigin="anonymous">
</script>
```

```javascript
// Dynamically adding script with SRI
function loadScriptWithIntegrity(url, integrity) {
  const script = document.createElement('script');
  script.src = url;
  script.integrity = integrity;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  
  return new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
  });
}
```

## Advanced Security Concepts

### 1. Same-Origin Policy and CORS

```javascript
// Server-side CORS configuration (Express.js)
const cors = require('cors');

// Allow specific origins
app.use(cors({
  origin: ['https://trusted-app.com', 'https://admin.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
}));

// Client-side handling CORS with credentials
fetch('https://api.example.com/data', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 2. Clickjacking Protection

```javascript
// Server-side X-Frame-Options header (Express.js)
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Client-side frame busting (fallback)
if (window !== window.top) {
  window.top.location = window.location;
}
```

### 3. Secure Authentication Patterns

```javascript
// Password hashing (server-side Node.js example)
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Implementing rate limiting (Express.js example)
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later'
});

app.post('/api/login', loginLimiter, (req, res) => {
  // Login logic
});
```

### 4. Secure Local Storage

```javascript
// Encrypting sensitive data before storing
import CryptoJS from 'crypto-js';

const secureStorage = {
  setItem(key, value, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value), 
      secretKey
    ).toString();
    localStorage.setItem(key, encrypted);
  },
  
  getItem(key, secretKey) {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    try {
      const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.error('Decryption failed:', e);
      return null;
    }
  },
  
  removeItem(key) {
    localStorage.removeItem(key);
  }
};

// Usage
const userSecret = generateSecureKey(); // User-specific key
secureStorage.setItem('userData', { id: 123, role: 'user' }, userSecret);
```

## Interview Focus Points

1. **XSS Prevention**:
   - Always sanitize user input
   - Use textContent instead of innerHTML when possible
   - Implement Content Security Policy
   - Understand the different types of XSS attacks

2. **Authentication Security**:
   - Never store passwords in plaintext
   - Implement proper session management
   - Use secure cookies (HttpOnly, Secure, SameSite)
   - Understand JWT security considerations

3. **CSRF Protection**:
   - Implement anti-CSRF tokens
   - Use SameSite cookies
   - Validate the origin of requests

4. **API Security**:
   - Implement proper authentication and authorization
   - Use HTTPS for all communications
   - Validate and sanitize all inputs
   - Implement rate limiting

5. **Common Security Headers**:
   - Content-Security-Policy
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - Strict-Transport-Security (HSTS)
   - X-XSS-Protection: 1; mode=block

## Best Practices

1. **Defense in Depth**: Implement multiple layers of security controls.

2. **Least Privilege**: Give components only the access permissions they need.

3. **Input Validation**: Validate all inputs on both client and server sides.

4. **Output Encoding**: Encode data before displaying it to prevent XSS.

5. **Keep Dependencies Updated**: Regularly update libraries to patch security vulnerabilities.

6. **Security Testing**: Implement automated security testing in your CI/CD pipeline.

7. **Error Handling**: Don't expose sensitive information in error messages.

8. **HTTPS Everywhere**: Use HTTPS for all communications, even internal ones.

9. **Security Headers**: Implement all relevant security headers.

10. **Regular Security Audits**: Conduct regular security reviews of your codebase.

## Security Testing Tools

1. **Static Analysis**: ESLint security plugins, SonarQube
2. **Dynamic Analysis**: OWASP ZAP, Burp Suite
3. **Dependency Scanning**: npm audit, Snyk, Dependabot
4. **Penetration Testing**: Manual testing by security professionals

## Real-World Security Scenarios

1. **Single-Page Application Security**:
   - Secure token storage
   - Protection against XSS in client-side templates
   - Proper CORS configuration

2. **API Security**:
   - Authentication with JWTs or OAuth
   - Rate limiting to prevent abuse
   - Input validation for all parameters

3. **Third-Party Integrations**:
   - Validate and sanitize third-party data
   - Use SRI for external scripts
   - Implement proper CSP directives 