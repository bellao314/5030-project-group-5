"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapComponent"), { ssr: false });

export default function MapPage() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 style={{ padding: "1rem" }}>St. Louis County Map</h1>
      <Map />
    </div>
  );
}