const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // CORS fixed
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/trafficDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Connection Handlers
mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// Define Schema
const trafficSchema = new mongoose.Schema({
  location: { lat: Number, lng: Number },
  trafficFactor: Number,
  timestamp: { type: Date, default: Date.now },
});

const TrafficData = mongoose.model("TrafficData", trafficSchema);

// Get Average Traffic Factor
app.get("/traffic-average", async (req, res) => {
    try {
      const result = await TrafficData.aggregate([
        { $group: { _id: null, avgTrafficFactor: { $avg: "$trafficFactor" } } },
      ]);
      
      console.log("Traffic Data Fetched:", result); // Debugging line
  
      const avgTrafficFactor = result.length ? result[0].avgTrafficFactor : 0;
      res.json({ avgTrafficFactor });
    } catch (error) {
      console.error("Failed to fetch average traffic factor:", error);
      res.status(500).json({ error: "Failed to fetch average traffic factor" });
    }
  });
  

// Save Traffic Data
app.post("/save-traffic", async (req, res) => {
  try {
    const { location, trafficFactor } = req.body;
    if (!location || trafficFactor == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newTrafficData = new TrafficData({ location, trafficFactor });
    await newTrafficData.save();
    res.status(201).json({ message: "Traffic data saved!" });
  } catch (error) {
    console.error("Error saving traffic data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
