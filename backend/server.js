require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const corsOptions = {
  origin: "*", // Allow frontend requests
  methods: "GET",
};

app.use(cors(corsOptions));


// Route to fetch weather data
app.get("/weather", async (req, res) => {
  const city = req.query.city || "mangalore";
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Smart City Dashboard Backend is Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
