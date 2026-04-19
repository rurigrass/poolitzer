"use client";

import { useEffect } from "react";
import { Popup, useMap } from "@vis.gl/react-maplibre";
import { middleOfEurope } from "@/lib/constants";

type UserPopupProps = {
  userLocation?: [number, number];
};

function isFallbackLocation(loc: [number, number]): boolean {
  return loc[0] === middleOfEurope[0] && loc[1] === middleOfEurope[1];
}

export default function UserPopup({ userLocation }: UserPopupProps) {
  const { current: map } = useMap();
  const coords = userLocation ?? middleOfEurope;

  useEffect(() => {
    if (!map || !userLocation || isFallbackLocation(userLocation)) return;
    map.flyTo({ center: userLocation, zoom: 8 });
  }, [map, userLocation]);

  if (!map) return null;

  return (
    <Popup longitude={coords[0]} latitude={coords[1]}>
      <h3>You are approximately here!</h3>
    </Popup>
  );
}
