import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log("Fetching weather data...");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/weather?city=mangalore`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Weather Data:", data); // Debugging log
        setWeather(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };
  
    fetchWeather();
  }, []);
  

  return (
    <div>
      <h3>Weather in Mangalore</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
