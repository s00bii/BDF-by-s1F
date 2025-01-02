const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");

const app = express();

// Serve static files (e.g., favicon.ico, images, CSS)
app.use(express.static(path.join(__dirname, 'public'))); // Assuming your static files are in a 'public' folder

// Explicitly handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico')); // Adjust path if needed
});

// HTTPS server options
const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/s1ckfit.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/s1ckfit.com/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/s1ckfit.com/chain.pem"),
};

// Start HTTPS server (for secure traffic) and listen on port 5001
https.createServer(options, app).listen(5001, '0.0.0.0', () => {
    console.log("Server running on https://s1ckfit.com:5001");
});

// Example route
app.get("/", (req, res) => {
    res.send("Hello, World! This is now secured with HTTPS.");
});

// Catch-all route for debugging (optional, can be removed later)
app.get('*', (req, res) => {
    res.send(`Requested URL: ${req.url}`); // For debugging to catch any unhandled routes
});
