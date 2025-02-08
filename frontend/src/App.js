import React from "react";
import CityMap from "./components/CityMap";
import Weather from "./components/Weather"; // Import Weather component

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Smart City Dashboard</h1>
      <Weather /> {/* Add Weather component */}
      <CityMap />
    </div>
  );
}

export default App;
