import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { iconPerson } from "../Map/Map";

const LocationMarker = (): JSX.Element | null => {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (event) {
      setPosition(event.latlng as any);
      map.flyTo(event.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={iconPerson}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
