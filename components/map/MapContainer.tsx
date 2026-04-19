"use client";
import { useState } from "react";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { middleOfEurope } from "@/lib/constants";
import type { MapLayerMouseEvent } from "maplibre-gl";
import AddLocationAtPointPopup from "./AddLocationAtPointPopup";
import UserPopup from "./UserPopup";

type MapContainerProps = {
  userLocation?: [number, number];
};

export default function MapContainer({ userLocation }: MapContainerProps) {
  const [clickLngLat, setClickLngLat] = useState<[number, number] | null>(null);

  const handleClick = (event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setClickLngLat([lng, lat]);
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
        <UserPopup userLocation={userLocation} />
        <AddLocationAtPointPopup
          lngLat={clickLngLat}
          onClose={() => setClickLngLat(null)}
        />
      </Map>
    </div>
  );
}
