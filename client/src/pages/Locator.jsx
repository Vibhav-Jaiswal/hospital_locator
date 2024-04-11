import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Locator = () => {
  const [center, setCenter] = useState({ lat: 20.593683, lng: 78.962883 });
  const [currentLocation, setCurrentLocation] = useState({});
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.flyTo(center, ZOOM_LEVEL, { animate: true });
    }
    handleUserCurrentAddress();
  }, [center]);

  const handleLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUserCurrentAddress = async () => {
    const apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
    const apiKey = import.meta.env.VITE_API_KEY;
    const query = `${center.lat},${center.lng}`;
    const apiUrl = `${apiEndPoint}?key=${apiKey}&q=${query}&pretty=1`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setCurrentLocation(data.results[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-1/5 flex-col p-4">
        <h1 className="text-3xl text-center font-semibold my-7 uppercase">
          Check hospitals nearby your location
        </h1>
        <button
          onClick={handleLocation}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          click to search Hospitals
        </button>
        <div className="flex flex-col p-4 font-bold">
          <span>
            City:{" "}
            {currentLocation.components && currentLocation.components.city}
          </span>
          <span>
            State:{" "}
            {currentLocation.components && currentLocation.components.state}
          </span>
          <span>
            Postcode:{" "}
            {currentLocation.components && currentLocation.components.postcode}
          </span>
          <span>
            Country:{" "}
            {currentLocation.components && currentLocation.components.country}
          </span>
          <span>
            Full Address: {currentLocation && currentLocation.formatted}
          </span>
        </div>
      </div>

      <MapContainer center={center} zoom={5} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=uMW2FWSj3uuXB6Sr7SND"
        />
        <Marker position={center}>
          <Popup>{currentLocation && currentLocation.formatted}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Locator;
