const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure storage for uploaded files
const upload = multer({dest:'uploads/'})




// Serve static files from the "public" directory
app.use(express.static('public'));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
