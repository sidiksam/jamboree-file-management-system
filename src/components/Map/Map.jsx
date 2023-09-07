import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ center, zoom }) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCyMYpVyKN-6wvVdQxslEkb1Qa0DvZ9Pa8"
    >
      <GoogleMap
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          width: '100%',
          height: '400px', // Adjust the height as needed
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
