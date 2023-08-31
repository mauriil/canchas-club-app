import React, { useRef, useEffect } from 'react';

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: 'Ubicación del Club',
    });
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
