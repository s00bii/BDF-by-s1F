const express = require("express");
const fs = require("fs");
const http = require("http");
const path = require("path");

const app = express();

// Serve static files (e.g., favicon.ico, images, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Use the EC2 assigned port or default to 5001
const PORT = process.env.PORT || 5001;

// Create an HTTP server (for now, skipping HTTPS setup)
http.createServer(app).listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Example route
app.get("/", (req, res) => {
    res.send("Hello, World! This is now running on HTTP.");
});

// Catch-all route for debugging (optional)
app.get('*', (req, res) => {
    res.send(`Requested URL: ${req.url}`);
});
