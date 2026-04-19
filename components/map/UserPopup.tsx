import { useEffect, useState } from "react";
import { Popup, useMap } from "@vis.gl/react-maplibre";
import { getUserLocation } from "../../lib/api";
import { middleOfEurope } from "@/lib/constants";

export default function UserPopup() {
  const [popupLocation, setPopupLocation] = useState(middleOfEurope);
  const { current: map } = useMap();

  console.log("POPUP LOCATION", popupLocation);

  useEffect(() => {
    if (!map) return;
    (async () => {
      const location = await getUserLocation();
      if (location !== middleOfEurope) {
        setPopupLocation(location);
        map.flyTo({ center: location, zoom: 8 });
      }
    })();
  }, [map]);

  if (!map) return null;

  return (
    <Popup longitude={popupLocation[0]} latitude={popupLocation[1]}>
      <h3>You are approximately here!</h3>
    </Popup>
  );
}
