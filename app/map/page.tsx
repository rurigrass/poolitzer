import MapContainer from "@/components/map/MapContainer";
import { getUserLocation } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: locations } = await supabase.from("locations").select();

  console.log("LOCATIONS", locations);

  const userLocation = await getUserLocation();

  return (
    <div className="w-full h-screen">
      <MapContainer userLocation={userLocation} />
    </div>
  );
}
