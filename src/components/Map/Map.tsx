import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../LocationMarker/LocationMarker";

type OpenStreetMapProps = {
  center: [number, number];
  zoom: number;
  height: number;
  width: number;
};

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

      <LocationMarker />
    </MapContainer>
  );
};

export default OpenStreetMap;
