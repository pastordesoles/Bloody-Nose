import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LocationMarker from "../LocationMarker/LocationMarker";
import icon from "./fight-svgrepo-com.svg";

type OpenStreetMapProps = {
  center: [number, number];
  zoom: number;
  height: number;
  width: string;
};

export const iconPerson = new L.Icon({
  iconUrl: icon,
  iconSize: new L.Point(30, 30),
});

const sessionsLocations = [
  { lat: 41.377, lng: 2.1488 },
  { lat: 41.378, lng: 2.1577 },
  { lat: 41.379, lng: 2.1628 },
];

export const OpenStreetMap = ({
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
      {sessionsLocations.map((coordinata, index) => (
        <Marker key={index} position={coordinata} icon={iconPerson}>
          <Popup>Session here!</Popup>
        </Marker>
      ))}
      <LocationMarker />
    </MapContainer>
  );
};
