import React from "react";
import Weather from "./components/Weather"; 
import TrafficAlert from "./components/TrafficAlert";
import "./App.css"; // Import CSS for layout

function App() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Smart City Dashboard</h1>
      <Weather />
      <TrafficAlert />
    </div>
  );
}

export default App;
