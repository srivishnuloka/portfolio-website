const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 443;  // HTTPS port

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Load SSL/TLS certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem')),
  ca: fs.readFileSync(path.join(__dirname, 'certs/ca.pem'))
};

// Create an HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log('HTTPS Server running on port 443');
});