"use client";
import { useEffect } from "react";
import { Map, useMap } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { middleOfEurope } from "@/lib/constants";
import type { MapLayerMouseEvent } from "maplibre-gl";

type MapContainerProps = {
  userLocation?: [number, number];
};

export default function MapContainer({ userLocation }: MapContainerProps) {
  console.log("USER LOCATIONz", userLocation);

  const handleClick = (event: MapLayerMouseEvent) => {
    console.log("EVENT", event);
    const { lng, lat } = event.lngLat;
    console.log("Clicked at:", { longitude: lng, latitude: lat });
  };

  return (
    <div className="w-full h-full z-50">
      <Map
        initialViewState={{
          longitude: userLocation?.[0] ?? middleOfEurope[0],
          latitude: userLocation?.[1] ?? middleOfEurope[1],
          // zoom: 10,
          zoom: 11,
          bearing: 0,
          pitch: 50,
        }}
        // mapStyle="/styles/dark.json"
        // mapStyle="https://tiles.openfreemap.org/styles/liberty"
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        onClick={handleClick}
      >
        {/* <MapClickHandler /> */}
        {/* <UserPopup /> */}
      </Map>
    </div>
  );
}
