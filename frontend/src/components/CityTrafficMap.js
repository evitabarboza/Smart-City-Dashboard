import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// Mangalore city coordinates
const mangaloreLocation = { lat: 12.9121, lng: 74.8560 };

const CityTrafficMap = () => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const fetchTrafficData = () => {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: 12.9322, lng: 74.8432 }, // Example: Some point in Mangalore
          destination: { lat: 12.8951, lng: 74.8410 }, // Example: Another point
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          drivingOptions: {
            departureTime: new Date(), // Real-time traffic data
            trafficModel: "bestguess",
          },
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    };

    fetchTrafficData();
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={mangaloreLocation} zoom={13}>
        {directions &&
          directions.routes.map((route, index) => (
            <DirectionsRenderer
              key={index}
              directions={{ routes: [route] }}
              options={{
                polylineOptions: {
                  strokeColor: getTrafficColor(route), // Color based on traffic
                  strokeOpacity: 0.8,
                  strokeWeight: 6,
                },
              }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

// Function to decide color based on traffic level
const getTrafficColor = (route) => {
  const trafficScore = route.legs[0]?.traffic_speed_entry?.[0]?.speedCategory || "MODERATE";

  switch (trafficScore) {
    case "HEAVY":
      return "red"; // 🚦 High traffic
    case "MODERATE":
      return "yellow"; // 🚗 Medium traffic
    case "FREE_FLOW":
      return "green"; // 🟢 No traffic
    default:
      return "blue"; // Default
  }
};

export default CityTrafficMap;
