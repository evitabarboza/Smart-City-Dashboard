require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const TRAFFIC_DATA_FILE = path.join(__dirname, "trafficData.json");

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

// Route to save traffic data to JSON file
app.post("/save-traffic", (req, res) => {
  try {
    const { location, trafficFactor } = req.body;
    if (!location || trafficFactor == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let trafficData = [];
    if (fs.existsSync(TRAFFIC_DATA_FILE)) {
      const rawData = fs.readFileSync(TRAFFIC_DATA_FILE);
      trafficData = JSON.parse(rawData);
    }

    trafficData.push({ location, trafficFactor, timestamp: new Date() });
    fs.writeFileSync(TRAFFIC_DATA_FILE, JSON.stringify(trafficData, null, 2));

    res.status(201).json({ message: "Traffic data saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save traffic data" });
  }
});

// Route to get average traffic factor from JSON file
app.get("/traffic-average", (req, res) => {
  try {
    if (!fs.existsSync(TRAFFIC_DATA_FILE)) {
      return res.json({ avgTrafficFactor: 0 });
    }

    const rawData = fs.readFileSync(TRAFFIC_DATA_FILE);
    const trafficData = JSON.parse(rawData);

    if (trafficData.length === 0) {
      return res.json({ avgTrafficFactor: 0 });
    }

    const avgTrafficFactor =
      trafficData.reduce((sum, entry) => sum + entry.trafficFactor, 0) /
      trafficData.length;

    res.json({ avgTrafficFactor: avgTrafficFactor.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch average traffic factor" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Smart City Dashboard Backend is Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
