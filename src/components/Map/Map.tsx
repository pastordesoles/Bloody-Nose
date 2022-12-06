import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LocationMarker from "../LocationMarker/LocationMarker";

type OpenStreetMapProps = {
  center: [number, number];
  zoom: number;
  height: number;
  width: string;
};

const sessionsLocations = [
  { lat: 41.377, lng: 2.1488 },
  { lat: 41.378, lng: 2.1577 },
  { lat: 41.379, lng: 2.1628 },
];

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
      {sessionsLocations.map((coordinata, index) => (
        <Marker key={index} position={coordinata}>
          <Popup>Session here!</Popup>
        </Marker>
      ))}
      <LocationMarker />
    </MapContainer>
  );
};

export default OpenStreetMap;
