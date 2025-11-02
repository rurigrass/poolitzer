import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: locations } = await supabase.from("locations").select();

  return <div>{JSON.stringify(locations, null, 2)}</div>;
}
