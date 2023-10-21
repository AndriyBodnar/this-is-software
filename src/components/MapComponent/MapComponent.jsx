import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapComponent({ lat, lon, urlImg }) {
  const customMarkerIcon = {
    url: urlImg,
  };
  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  const defaultCenter = {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
  };
  const mapOptions = {
    zoomControl: false,
    fullscreenControl: false,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={defaultCenter}
        zoom={10}
        options={mapOptions}
      >
        <Marker
          className="rounded-xl"
          position={defaultCenter}
          icon={customMarkerIcon}
        />
      </GoogleMap>
    </LoadScript>
  );
}
