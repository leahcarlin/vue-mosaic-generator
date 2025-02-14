import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for frontend requests

app.use(
  cors({
    origin: "http://localhost:8080", // Change this when deploying
    methods: ["GET", "POST"], // Allowed methods
    credentials: true, // Allow cookies if needed
  })
);

// Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.get("/photos", async (req, res) => {
  try {
    const { query, color } = req.query;

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query,
        color, // Color filter (black, white, yellow, etc.)
        per_page: 10,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images from Unsplash" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
