const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

router.get("/", async (req, res) => {
  const city = req.query.city || "mangalore";

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(weatherUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

module.exports = router;
