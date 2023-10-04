import React, { useRef, useEffect } from 'react';

const Map = ({ latitude, longitude, onMarkerDragEnd }) => {
  const mapRef = useRef(null);
  const geocoder = new window.google.maps.Geocoder();

  useEffect(() => {
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    const marker = new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: 'Ubicación del Club',
      draggable: true, // Habilita el marcador para ser arrastrado
    });

    // Manejador de eventos para el final del arrastre del marcador
    marker.addListener('dragend', (e) => {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      
      geocoder.geocode({ location: newPosition }, (results, status) => {
        newPosition.address = results[0].formatted_address;
        onMarkerDragEnd(newPosition);
      });
    });
  }, [latitude, longitude, onMarkerDragEnd]);

  return (
    <>
      <h3 style={{marginBottom: '1rem'}}>Arrastra y suelta el marcador para presisar la ubicación del club </h3>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '400px' }} />
    </>
  )
    ;
};


export default Map;
