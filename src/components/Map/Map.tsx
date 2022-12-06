import { useEffect } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import LocationMarker from "../LocationMarker/LocationMarker";
import { Geocoder, geocoders } from "leaflet-control-geocoder";

type OpenStreetMapProps = {
  center: [number, number];
  zoom: number;
  height: number;
  width: number;
};

// const GetCoordinates = () => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;
//     new Geocoder({
//       geocoder: new geocoders.Nominatim(),
//       position: "topleft",
//     }).addTo(map);
//   }, [map]);

//   return null;
// };

const OpenStreetMap = ({
  center,
  zoom,
  height,
  width,
}: OpenStreetMapProps): JSX.Element => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height, width }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <GetCoordinates /> */}
      <LocationMarker />
    </MapContainer>
  );
};

export default OpenStreetMap;
