const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/proxy-image", async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send("Image URL is required");
    }

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const buffer = await response.buffer();
        res.set("Content-Type", "image/jpeg");
        res.send(buffer);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).send("Failed to fetch image");
    }
});

const PORT = 5001; // Ensure this matches the port you're using
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Proxy server running on http://0.0.0.0:${PORT}`);
});
