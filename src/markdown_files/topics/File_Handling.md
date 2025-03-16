# File Handling

JavaScript provides several APIs for client-side file operations, enabling web applications to read, create, and manipulate files without server interaction.

## Core File APIs

### File and Blob Objects

```javascript
// File object from input element
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  
  console.log('File properties:');
  console.log('- Name:', file.name);
  console.log('- Size:', file.size, 'bytes');
  console.log('- Type:', file.type);
  console.log('- Last modified:', new Date(file.lastModified));
});

// Creating a Blob
const textBlob = new Blob(['Hello, world!'], { type: 'text/plain' });
const jsonBlob = new Blob([JSON.stringify({ name: 'John' })], { type: 'application/json' });
const imageBlob = await fetch('image.jpg').then(r => r.blob());
```

### FileReader API

```javascript
const reader = new FileReader();

// Read as text (for text files, CSV, JSON, etc.)
reader.addEventListener('load', (e) => {
  const text = e.target.result;
  console.log('File content:', text);
});
reader.readAsText(file);

// Read as data URL (for images, to display inline)
reader.addEventListener('load', (e) => {
  const dataUrl = e.target.result;
  document.getElementById('preview').src = dataUrl;
});
reader.readAsDataURL(file);

// Read as ArrayBuffer (for binary processing)
reader.addEventListener('load', (e) => {
  const arrayBuffer = e.target.result;
  const view = new Uint8Array(arrayBuffer);
  console.log('First byte:', view[0]);
});
reader.readAsArrayBuffer(file);

// Handle errors
reader.addEventListener('error', () => {
  console.error('File reading failed');
});
```

### URL API

```javascript
// Create object URL for direct linking
const objectUrl = URL.createObjectURL(file);
document.getElementById('preview').src = objectUrl;

// Always revoke URLs when done to free memory
URL.revokeObjectURL(objectUrl);
```

## Modern File APIs

### File System Access API

```javascript
// Open file picker and get file handle
async function getFileHandle() {
  try {
    const [handle] = await window.showOpenFilePicker();
    return handle;
  } catch (err) {
    console.error('File picker error:', err);
  }
}

// Read file content
async function readFile(fileHandle) {
  const file = await fileHandle.getFile();
  const text = await file.text();
  return text;
}

// Write to file
async function writeFile(fileHandle, content) {
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

// Usage
async function editFile() {
  const handle = await getFileHandle();
  const content = await readFile(handle);
  const modified = content + '\nEdited: ' + new Date();
  await writeFile(handle, modified);
}
```

### Drag and Drop

```javascript
const dropZone = document.getElementById('drop-zone');

// Prevent default to allow drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, preventDefaults);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Highlight drop zone when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, highlight);
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, unhighlight);
});

function highlight() {
  dropZone.classList.add('highlight');
}

function unhighlight() {
  dropZone.classList.remove('highlight');
}

// Handle dropped files
dropZone.addEventListener('drop', handleDrop);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  [...files].forEach(processFile);
}
```

## Advanced Techniques

### File Slicing

```javascript
// Process large files in chunks
function processLargeFile(file) {
  const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
  const chunks = Math.ceil(file.size / CHUNK_SIZE);
  
  for (let i = 0; i < chunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);
    
    // Process each chunk
    processChunk(chunk, i, chunks);
  }
}

function processChunk(blob, index, total) {
  const reader = new FileReader();
  reader.onload = (e) => {
    console.log(`Processing chunk ${index + 1}/${total}`);
    // Process chunk data
  };
  reader.readAsArrayBuffer(blob);
}
```

### File Download

```javascript
// Create and download a file
function downloadFile(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

// Usage examples
downloadFile('Hello, world!', 'hello.txt', 'text/plain');
downloadFile(JSON.stringify({ data: 'value' }, null, 2), 'data.json', 'application/json');
downloadFile(csvContent, 'export.csv', 'text/csv');
```

### Progress Monitoring

```javascript
// Track upload progress
function uploadWithProgress(file, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('file', file);
    
    xhr.open('POST', url);
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        updateProgressBar(percentComplete);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    });
    
    xhr.addEventListener('error', () => reject(new Error('Network error')));
    xhr.send(formData);
  });
}

function updateProgressBar(percent) {
  const progressBar = document.getElementById('progress');
  progressBar.style.width = `${percent}%`;
  progressBar.textContent = `${percent}%`;
}
```

## Interview Focus Points

1. **Security Considerations**:
   - File API is same-origin only
   - User interaction is required to access files
   - File System Access API requires explicit permission

2. **Performance Optimization**:
   - Use `URL.createObjectURL()` for large files instead of data URLs
   - Process large files in chunks
   - Always revoke object URLs when done
   - Use Web Workers for heavy processing

3. **Browser Compatibility**:
   - Basic File API is widely supported
   - File System Access API has limited support (Chromium-based browsers)
   - Consider polyfills or fallbacks for critical functionality

4. **Common Challenges**:
   - Handling different file types appropriately
   - Validating file content beyond MIME type
   - Managing memory for large file operations
   - Providing good UX for file operations

## Best Practices

1. **Always validate files** by type, size, and content when security matters.
   ```javascript
   function validateFile(file) {
     // Check file type
     const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
     if (!validTypes.includes(file.type)) {
       throw new Error('Invalid file type');
     }
     
     // Check file size (5MB limit)
     const maxSize = 5 * 1024 * 1024;
     if (file.size > maxSize) {
       throw new Error('File too large');
     }
     
     return true;
   }
   ```

2. **Provide clear feedback** during file operations.
   ```javascript
   function updateStatus(message, isError = false) {
     const status = document.getElementById('status');
     status.textContent = message;
     status.className = isError ? 'error' : 'success';
   }
   ```

3. **Handle errors gracefully** with user-friendly messages.
   ```javascript
   async function safelyReadFile(file) {
     try {
       const text = await readFileAsText(file);
       return text;
     } catch (error) {
       console.error('File reading error:', error);
       updateStatus('Could not read file. Please try again.', true);
       return null;
     }
   }
   ```

4. **Clean up resources** to prevent memory leaks.
   ```javascript
   function cleanupFileResources() {
     // Revoke any object URLs
     objectUrls.forEach(url => URL.revokeObjectURL(url));
     objectUrls = [];
     
     // Remove event listeners
     fileInput.removeEventListener('change', handleFileSelect);
   }
   ```

5. **Use appropriate file reading methods** based on file type.
   ```javascript
   function readFileAppropriately(file) {
     if (file.type.startsWith('image/')) {
       return readAsDataURL(file); // For images
     } else if (file.type === 'application/json') {
       return readAsJSON(file);    // For JSON
     } else if (file.type.startsWith('text/')) {
       return readAsText(file);    // For text
     } else {
       return readAsBinary(file);  // For other files
     }
   }
   ``` 