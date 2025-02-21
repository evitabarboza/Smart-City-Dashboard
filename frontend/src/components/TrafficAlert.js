import React, { useEffect, useRef, useState } from "react";

const TrafficAlert = () => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const infoWindowRef = useRef(null);
  
  // Dynamically load Google Maps API
  const loadGoogleMapsAPI = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (!mapLoaded) {
      loadGoogleMapsAPI();
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (mapLoaded && window.google) {
      const { Map, TrafficLayer, DirectionsService, InfoWindow } = window.google.maps;

      // Initialize Map
      const newMap = new Map(mapRef.current, {
        center: { lat: 12.9141, lng: 74.856 }, // Mangalore
        zoom: 13,
      });

      // Add Traffic Layer
      const trafficLayer = new TrafficLayer();
      trafficLayer.setMap(newMap);

      // Create Directions Service and InfoWindow
      const service = new DirectionsService();
      setDirectionsService(service);
      infoWindowRef.current = new InfoWindow();

      // Add Click Listener to Get Traffic Data on Click
      newMap.addListener("click", (event) => {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        console.log("Map Clicked", clickedLocation);
        if (service) {
          checkTrafficCongestion(newMap, clickedLocation, service);
        }
      });
    }
  }, [mapLoaded]);

  // Function to check traffic congestion from clicked location
  const checkTrafficCongestion = (map, origin, service) => {
    if (!service || !infoWindowRef.current) return;

    service.route(
      {
        origin: origin,
        destination: { lat: 12.8951, lng: 74.841 }, // Static Destination (Can be modified)
        travelMode: "DRIVING",
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: "bestguess",
        },
      },
      (result, status) => {
        if (status === "OK") {
          const route = result.routes[0];
          const normalDuration = route.legs[0].duration.value;
          const trafficDuration = route.legs[0].duration_in_traffic.value;
          const trafficFactor = trafficDuration / normalDuration; // Congestion level

          console.log("Traffic Factor:", trafficFactor);

          showTrafficAlert(map, origin, trafficFactor);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  // Function to show traffic alert
  const showTrafficAlert = (map, position, trafficFactor) => {
    if (!infoWindowRef.current) return;
  
    let message = "Smooth Traffic";
    let color = "green";
    let emoji = "🏎️";
  
    if (trafficFactor > 0.9) {
      message = "Heavy Traffic! Expect Delays";
      color = "red";
      emoji = "⚠️";
    } else if (trafficFactor > 0.82) {
      message = "Moderate Traffic";
      color = "orange";
      emoji = "✋";
    }
  
    // Send data to backend
    saveTrafficData(position, trafficFactor);
  
    infoWindowRef.current.setContent(`
      <div style="color: ${color};">
        <b>${emoji} ${message}</b> <br/>
        Traffic Factor: ${trafficFactor.toFixed(2)}
      </div>
    `);
    infoWindowRef.current.setPosition(position);
    infoWindowRef.current.open(map);
  };
  
  // Function to send traffic data to the backend
  const saveTrafficData = async (location, trafficFactor) => {
    try {
      const response = await fetch("http://localhost:5000/save-traffic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, trafficFactor }),
      });
  
      if (response.ok) {
        console.log("Traffic data saved successfully!");
      } else {
        console.error("Failed to save traffic data.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
  return <div id="map" style={{ width: "100%", height: "500px" }} ref={mapRef}></div>;
};

export default TrafficAlert;
