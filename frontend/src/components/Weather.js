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
    <div>
      {/* Google Fonts Link */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Caudex:ital,wght@0,400;0,700;1,400;1,700&family=Permanent+Marker&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      />
      <nav id="weather-dashboard">
        <div className="dashboard-container">
          <div className="mangalore-weather">
            <h1 className="weather-title">🌤️ Mangalore Weather</h1>
            <p className="season-info">
              <span className="label">Current dealing with </span> 
              <span className="weather-value">{getSeason()}</span>
            </p>
          </div>
          <div className="weather-grid">
            <div className="weather-box1">
              <p>🚦 Traffic Factor</p>
              <p>{averageTraffic}</p>
            </div>
            <div className="weather-box2">
              <p>🌡️ Temperature</p>
              <p>{weather?.main.temp}°C</p>
            </div>
            <div className="weather-box3">
              <p>💧 Humidity</p>
              <p>{weather?.main.humidity}%</p>
            </div>
            <div className="weather-box4">
              <p>🌥️ Condition</p>
              <p>{weather?.weather[0].description}</p>
            </div>
            <div className="weather-box5">
              <p>📊 Trend</p>
              <p>{tempTrend}</p>
            </div>
          </div>
        </div>
        {travelNotification && <div className="weather-notification">{travelNotification}</div>}
        <p className="last-updated">🕒 Last Updated: {lastUpdated}</p>
      </nav>
    </div>
  );
};

export default Weather;
