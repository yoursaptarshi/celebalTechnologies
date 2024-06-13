const http = require('http');
const fs = require('fs');
const path = require('path');

// Directory where files will be stored
const filesDirectory = path.join(__dirname, 'files');

// Ensure the files directory exists
if (!fs.existsSync(filesDirectory)) {
  fs.mkdirSync(filesDirectory);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.headers['content-type'].includes('multipart/form-data')) {
    if (req.url === '/upload') {
      handleFileUpload(req, res);
    } else if (req.url === '/read') {
      handleFileRead(req, res);
    } else if (req.url === '/delete') {
      handleFileDelete(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

function handleFileUpload(req, res) {
    const boundary = '--' + req.headers['content-type'].split('boundary=')[1];
  
    let rawData = '';
    req.setEncoding('binary');
  
    req.on('data', chunk => {
      rawData += chunk;
    });
  
    req.on('end', () => {
      const parts = rawData.split(boundary).filter(part => part.trim() !== '' && part !== '--');
  
      parts.forEach(part => {
        const contentDispositionMatch = part.match(/Content-Disposition: form-data; name="(.+?)"; filename="(.+?)"/);
        
        if (contentDispositionMatch) {
          const fieldName = contentDispositionMatch[1];
          const fileName = contentDispositionMatch[2]; // Ensure filename with extension is correctly extracted
          const fileDataMatch = part.match(/\r\n\r\n([\s\S]*?)\r\n$/);
          
          if (fileDataMatch) {
            const fileData = fileDataMatch[1];
            const filePath = path.join(filesDirectory, fileName); // Use the extracted filename
  
            fs.writeFile(filePath, fileData, 'binary', err => {
              if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('File upload failed');
                return;
              }
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.end('File uploaded successfully');
            });
          }
        }
      });
    });
  
    req.on('error', err => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error processing request');
    });
  }
  

  function handleFileRead(req, res) {
    const boundary = '--' + req.headers['content-type'].split('boundary=')[1];
  
    let rawData = '';
    req.setEncoding('binary');
  
    req.on('data', chunk => {
      rawData += chunk;
    });
  
    req.on('end', () => {
      const parts = rawData.split(boundary).filter(part => part.trim() !== '' && part !== '--');
  
      parts.forEach(part => {
        const contentDispositionMatch = part.match(/Content-Disposition: form-data; name="(.+?)"; filename="(.+?)"/);
        
        if (contentDispositionMatch) {
          const fieldName = contentDispositionMatch[1];
          const fileName = contentDispositionMatch[2]; // Ensure filename with extension is correctly extracted
  
          const filePath = path.join(filesDirectory, fileName);
  
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('File not found');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
          });
        }
      });
    });
  
    req.on('error', err => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error processing request');
    });
  }
  

  function handleFileDelete(req, res) {
    const boundary = '--' + req.headers['content-type'].split('boundary=')[1];
  
    let rawData = '';
    req.setEncoding('binary');
  
    req.on('data', chunk => {
      rawData += chunk;
    });
  
    req.on('end', () => {
      const parts = rawData.split(boundary).filter(part => part.trim() !== '' && part !== '--');
  
      parts.forEach(part => {
        const contentDispositionMatch = part.match(/Content-Disposition: form-data; name="(.+?)"; filename="(.+?)"/);
        
        if (contentDispositionMatch) {
          const fieldName = contentDispositionMatch[1];
          const fileName = contentDispositionMatch[2]; // Ensure filename with extension is correctly extracted
          const filePath = path.join(filesDirectory, fileName);
  
          fs.unlink(filePath, err => {
            if (err) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('File not found');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted successfully');
          });
        }
      });
    });
  
    req.on('error', err => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error processing request');
    });
  }
  