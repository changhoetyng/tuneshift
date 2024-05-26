"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function PlaylistSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const { canMigrate, updateCanMigrate } = useUIStateStore((state) => ({
    canMigrate: state.canMigrate,
    updateCanMigrate: state.updateCanMigrate,
  }));

  function checkRoute() {
    const VALID_MODE = ["apple-music-to-spotify"];
    if (from === null || !VALID_MODE.includes(from)) router.push("/");
    if (!canMigrate) router.push("/");
    updateCanMigrate(false);
  }

  useEffect(() => {
    checkRoute();
  }, []);

  return (
    <div>
      <h1>Playlist Selection</h1>
    </div>
  );
}
