import React, { useState, useEffect, useCallback } from "react";
import "./Weather.css"; // Import the CSS file

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [prevTemp, setPrevTemp] = useState(null);
  const [tempTrend, setTempTrend] = useState("");
  const [averageTraffic] = useState(() => {
    return (Math.random() * (5.0 - 1.0) + 1.0).toFixed(2);
  });
  const [travelNotification, setTravelNotification] = useState("");

  const getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 2 && month <= 5) return "Summer ☀️";
    if (month >= 6 && month <= 9) return "Monsoon 🌧️";
    if (month >= 10 && month <= 11) return "Post-Monsoon 🌤️";
    return "Winter ❄️";
  };

  const analyzeTrend = useCallback((currentTemp) => {
    if (prevTemp !== null) {
      if (currentTemp > prevTemp) {
        setTempTrend("📈 Increasing");
      } else if (currentTemp < prevTemp) {
        setTempTrend("📉 Decreasing");
      } else {
        setTempTrend("➖ Stable");
      }
    }
    setPrevTemp(currentTemp);
  }, [prevTemp]);

  const fetchWeather = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/weather?city=mangalore`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();

      setWeather(data);
      analyzeTrend(data.main.temp);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError("⚠️ Error fetching weather data");
    }
  }, [analyzeTrend]);

  useEffect(() => {
    fetchWeather();
    if (weather) {
      if (weather.weather[0].main.toLowerCase().includes("rain") || weather.weather[0].main.toLowerCase().includes("storm")) {
        setTravelNotification("⚠️ Heavy rain detected! Consider avoiding unnecessary travel.");
      } else if (averageTraffic > 4) {
        setTravelNotification("🚦 High traffic congestion! Plan your journey accordingly.");
      } else {
        setTravelNotification("✅ Roads are clear! Safe to travel.");
      }
    }
  }, [fetchWeather, weather, averageTraffic]);

  return (
    <nav id="weather-dashboard">
      <div className="weather-grid">
        <div id="weather-box-1" className="weather-box">
          <h3>🌤️ Mangalore Weather</h3>
          <p>{getSeason()}</p>
        </div>
        <div id="weather-box-2" className="weather-box">
          <p>🕒 Last Updated</p>
          <p>{lastUpdated}</p>
        </div>
        <div id="weather-box-3" className="weather-box">
          <p>🚦 Traffic Factor</p>
          <p>{averageTraffic}</p>
        </div>
      </div>

      {error ? (
        <p id="weather-error" className="weather-error">{error}</p>
      ) : weather ? (
        <div className="weather-details">
          <div id="weather-box-4" className="weather-box">
            <p>🌡️ Temperature</p>
            <p>{weather.main.temp}°C</p>
          </div>
          <div id="weather-box-5" className="weather-box">
            <p>💧 Humidity</p>
            <p>{weather.main.humidity}%</p>
          </div>
          <div id="weather-box-6" className="weather-box">
            <p>🌥️ Condition</p>
            <p>{weather.weather[0].description}</p>
          </div>
          <div id="weather-box-7" className="weather-box">
            <p>📊 Trend</p>
            <p>{tempTrend}</p>
          </div>
        </div>
      ) : (
        <p id="weather-loading" className="weather-loading">Loading weather...</p>
      )}

      {travelNotification && (
        <div id="weather-notification" className="weather-notification">
          {travelNotification}
        </div>
      )}
    </nav>
  );
};

export default Weather;
