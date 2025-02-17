import React, { useEffect, useRef, useState } from 'react';

function CityMap() {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Dynamically load Google Maps API
  const loadGoogleMapsAPI = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true); // Set mapLoaded to true once the API is loaded
    document.head.appendChild(script);
  };

  // Initialize the map
  useEffect(() => {
    if (!mapLoaded) {
      loadGoogleMapsAPI(); // Load Google Maps API if it's not loaded
    }
  }, [mapLoaded]);

  // Once the API is loaded, initialize the map
  useEffect(() => {
    if (mapLoaded) {
      const { Map, TrafficLayer } = window.google.maps;

      const map = new Map(mapRef.current, {
        center: { lat: 12.9141, lng: 74.8560 }, // Mangalore's coordinates
        zoom: 12,
      });

      // Create and display the traffic layer
      const trafficLayer = new TrafficLayer();
      trafficLayer.setMap(map); // Set the traffic layer on the map

    }
  }, [mapLoaded]);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '500px' }}
      ref={mapRef}
    ></div>
  );
}

export default CityMap;
