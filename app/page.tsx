export const dynamic = "force-dynamic"; // This disables SSG and ISR

import prisma from "@/lib/prisma";
import InfoCard from "./info-card/page";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-row items-left py-24 px-8">
      <InfoCard location={"63103"} fedFunds={1000000} avgPropertyValue={500000}/>
    </div>
  );
}
