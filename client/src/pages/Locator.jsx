import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const Locator = () => {
  const [center, setCenter] = useState({ lat: 20.593683, lng: 78.962883 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [hospitalData,setHospitalData] = useState({});

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.flyTo(center, ZOOM_LEVEL, { animate: true });
    }
    hospitalApi();
  }, [center]);

  const HandleLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const hospitalApi = async () =>{
    const url = 'https://medicine-name-and-details.p.rapidapi.com/?medicineName=prolyte';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8682782d33msh6591e390399b179p1c8e8cjsn61358ee5c4b8',
		'X-RapidAPI-Host': 'medicine-name-and-details.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-1/5 flex-col p-4">
        <h1 className="text-3xl text-center font-semibold my-7">
          See Hospitals near by your location
        </h1>
        <button
          onClick={HandleLocation}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          click to search Hospitals
        </button>
      </div>

      <MapContainer center={center} zoom={5} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=uMW2FWSj3uuXB6Sr7SND"
        />
        <MarkerClusterGroup chunkedLoading>
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Locator;
