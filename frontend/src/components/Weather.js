import React, { useState, useEffect, useCallback } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [prevTemp, setPrevTemp] = useState(null);
  const [tempTrend, setTempTrend] = useState("");

  // Function to determine the season in Mangalore
  const getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 2 && month <= 5) return "Summer ☀️";
    if (month >= 6 && month <= 9) return "Monsoon 🌧️";
    if (month >= 10 && month <= 11) return "Post-Monsoon 🌤️";
    return "Winter ❄️";
  };

  // Memoized function to analyze temperature trend
  const analyzeTrend = useCallback((currentTemp) => {
    if (prevTemp !== null) {
      if (currentTemp > prevTemp) {
        setTempTrend("increasing 📈");
      } else if (currentTemp < prevTemp) {
        setTempTrend("decreasing 📉");
      } else {
        setTempTrend("stable ➖");
      }
    }
    setPrevTemp(currentTemp);
  }, [prevTemp]);

  // Memoized function to fetch weather data
  const fetchWeather = useCallback(async () => {
    try {
      console.log("Fetching weather data...");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/weather?city=mangalore`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Weather Data:", data);

      setWeather(data);
      analyzeTrend(data.main.temp);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching weather data. Please try again later.");
    }
  }, [analyzeTrend]);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [fetchWeather]);

  return (
    <div>
      <h3>Weather in Mangalore</h3>
      <p>Current Season: {getSeason()}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Temperature Trend: {tempTrend}</p>
          <p style={{ fontSize: "14px", color: "gray" }}>Last Updated: {lastUpdated}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
