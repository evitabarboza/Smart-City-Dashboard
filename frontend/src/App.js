import React from "react";
import CityMap from "./components/CityMap";
import Weather from "./components/Weather"; // Import Weather component
import TrafficAlert from "./components/TrafficAlert";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Smart City Dashboard</h1>
      <Weather /> {/* Add Weather component */}
     
      <TrafficAlert />
    </div>
  );
}

export default App;
