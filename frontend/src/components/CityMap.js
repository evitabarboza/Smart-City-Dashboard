import React from "react";
import { GoogleMap, LoadScript, TrafficLayer, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// Mangalore city coordinates
const mangaloreLocation = { lat: 12.9121, lng: 74.8560 };

const CityMap = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={mangaloreLocation} zoom={13}>
        {/* Live Traffic Layer */}
        <TrafficLayer />
        
        {/* Marker for Mangalore City */}
        <Marker position={mangaloreLocation} title="Mangalore City Center" />
      </GoogleMap>
    </LoadScript>
  );
};

export default CityMap;
