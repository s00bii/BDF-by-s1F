const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");

const app = express();

// Remove this HTTP listen on port 80
// http.createServer((req, res) => {
//     res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//     res.end();
// }).listen(80);

// HTTPS server options
const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/s1ckfit.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/s1ckfit.com/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/s1ckfit.com/chain.pem"),
};

// Start HTTPS server (for secure traffic)
https.createServer(options, app).listen(443, () => {
    console.log("Server running on https://s1ckfit.com");
});

const PORT = 5001; // Node.js should listen on this port
app.listen(PORT, () => {
    console.log(`Node.js server running on port ${PORT}`);
});

// Example route
app.get("/", (req, res) => {
    res.send("Hello, World! This is now secured with HTTPS.");
});
