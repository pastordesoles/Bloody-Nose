import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

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
      <Marker position={center}>
        <Popup>
          Hello Mireia. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default OpenStreetMap;
