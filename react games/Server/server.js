const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/api/games", async (req, res) => {
  try {
    const response = await axios.get("https://www.freetogame.com/api/games");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching FreeToGame API:", error.message);
    res.status(500).json({ error: "Failed to fetch games from FreeToGame API" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
