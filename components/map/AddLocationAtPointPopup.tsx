"use client";

import { useEffect, useState } from "react";
import { Popup, useMap } from "@vis.gl/react-maplibre";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AddLocationAtPointPopupProps = {
  lngLat: [number, number] | null;
  onClose: () => void;
};

export default function AddLocationAtPointPopup({
  lngLat,
  onClose,
}: AddLocationAtPointPopupProps) {
  const { current: map } = useMap();
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lngLat) {
      setName("");
      setError(null);
    }
  }, [lngLat]);

  if (!map || !lngLat) return null;

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a name for this location.");
      return;
    }

    setIsSaving(true);
    setError(null);

    const supabase = createClient();
    const [longitude, latitude] = lngLat;

    const { error: insertError } = await supabase.from("locations").insert({
      name: trimmed,
      longitude,
      latitude,
    });

    if (insertError) {
      setError(insertError.message);
      setIsSaving(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("Saved location; user:", {
      id: user?.id,
      email: user?.email,
    });

    onClose();
    setIsSaving(false);
    router.refresh();
  };

  return (
    <Popup longitude={lngLat[0]} latitude={lngLat[1]} closeButton={false}>
      <div
        className="min-w-[220px] space-y-3 p-1"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <h3 className="text-sm font-semibold">Add location</h3>
        <div className="space-y-1.5">
          <Label htmlFor="location-name">Name</Label>
          <Input
            id="location-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Home pool"
            autoComplete="off"
          />
        </div>
        {error ? (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving…" : "Add location"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Popup>
  );
}
