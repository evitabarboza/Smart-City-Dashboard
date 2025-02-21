import React, { useState, useEffect, useCallback } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [prevTemp, setPrevTemp] = useState(null);
  const [tempTrend, setTempTrend] = useState("");
  const [averageTraffic, setAverageTraffic] = useState(() => {
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
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-md border-b border-gray-700 text-gray-200 p-6 flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-100">🌤️ Mangalore Weather</h3>
          <p className="text-sm text-gray-400">{getSeason()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">🕒 Last Updated</p>
          <p className="text-lg font-medium">{lastUpdated}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">🚦 Traffic Factor</p>
          <p className="text-lg font-medium">{averageTraffic}</p>
        </div>
      </div>
      {error ? (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      ) : weather ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            <p className="text-sm text-gray-400">🌡️ Temperature</p>
            <p className="text-lg font-medium">{weather.main.temp}°C</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            <p className="text-sm text-gray-400">💧 Humidity</p>
            <p className="text-lg font-medium">{weather.main.humidity}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            <p className="text-sm text-gray-400">🌥️ Condition</p>
            <p className="text-lg font-medium capitalize">{weather.weather[0].description}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            <p className="text-sm text-gray-400">📊 Trend</p>
            <p className="text-lg font-medium">{tempTrend}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm mt-4">Loading weather...</p>
      )}

      {travelNotification && (
        <div className="mt-4 p-3 bg-yellow-600 text-white rounded-lg shadow-lg text-sm w-full max-w-4xl text-center">
          {travelNotification}
        </div>
      )}
    </nav>
  );
};

export default Weather;
