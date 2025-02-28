import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Weather from "./components/Weather";
import TrafficAlert from "./components/TrafficAlert";
import "./App.css"; // Import CSS for layout

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div>
      {/* Import Google Fonts directly inside JSX */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap" rel="stylesheet" />
      
      <div className="app-container">
        <AnimatePresence mode="wait">
          {!showDashboard ? (
            <motion.div
              key="opening-page"
              className="opening-page"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h1 className="app-title">
                Welcome to <span className="track-title">T R A C K</span>
              </h1>
              <h3 className="full-form">
                <em>Transport Routing, Alerts, and Congestion Knowledge</em>
              </h3>
              <p className="tagline">
                A Smart City Dashboard for <strong>Mangalore</strong>, powered by <br />
                <span className="api-highlight">Google Maps API</span> & <span className="api-highlight">OpenWeather API</span>.
              </p>
              <button onClick={() => setShowDashboard(true)} className="continue-button">
                Continue
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              className="dashboard"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h1 className="dashboard-title">Smart City Dashboard</h1>
              <Weather />
              <TrafficAlert />

              {/* Footer */}
              <footer className="weather-footer">
                <div className="footer-content">
                  <p>© {new Date().getFullYear()} TRACK. All Rights Reserved.</p>
                  <p>Developed with ❤️ by Pookie & Potato</p>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
