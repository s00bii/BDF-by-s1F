console.log("Node.js version:", process.version);
console.log("node-fetch version:", require("node-fetch/package.json").version);
console.log("PM2 environment:", process.env);

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/proxy-image", async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send("Image URL is required");
    }

    try {
        const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
        const response = await fetch(imageUrl);
        const buffer = await response.buffer();
        res.set("Content-Type", "image/jpeg");
        res.send(buffer);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).send("Failed to fetch image");
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
