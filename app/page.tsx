export const dynamic = "force-dynamic"; // This disables SSG and ISR

import ProjectInfoCard from "./info-card/page";
import MapWrapper from "./map/MapWrapper";

export default async function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Map - Full screen background */}
      <div className="absolute inset-0 z-0">
        <MapWrapper />
      </div>
      {/* Content floating on top of the map */}
      <div className="relative z-10 min-h-screen flex flex-row items-left py-24 px-8">
        <ProjectInfoCard location={"63103"} fedFunds={1000000} avgPropertyValue={500000}/>
      </div>
    </div>
  );
}
