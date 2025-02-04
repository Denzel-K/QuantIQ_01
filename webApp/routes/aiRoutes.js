const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/process", async (req, res) => {
    try {
        // Call Python API to process data
        const response = await axios.get("http://127.0.0.1:5000/process");
        res.json(response.data);  // Send processed data to frontend
    } catch (error) {
        console.error("Error calling AI server:", error);
        res.status(500).json({ error: "AI processing failed" });
    }
});

module.exports = router;
