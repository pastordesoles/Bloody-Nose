import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

type OpenStreetMapProps = {
  center: [number, number];
  zoom: number;
  height: number;
  width: number;
};

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (event) {
      setPosition(event.latlng);
      map.flyTo(event.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

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
      <Marker position={center}>
        <Popup>
          Hello Mireia. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default OpenStreetMap;
