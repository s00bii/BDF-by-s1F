const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Add a handler for the root path
app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/proxy-image", async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send("Image URL is required");
    }

    try {
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
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Proxy server running on http://0.0.0.0:${PORT}`);
});