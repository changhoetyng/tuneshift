"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";
import FloatingCard from "@/app/_ui/card/FloatingCard";
import NavigationButton from "@/app/_ui/buttons/NavigationButton";
import Link from "next/link";

export default function PlaylistSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const { canMigrate, updateCanMigrate } = useUIStateStore((state) => ({
    canMigrate: state.canMigrate,
    updateCanMigrate: state.updateCanMigrate,
  }));

  function checkRoute() {
    const VALID_MODE = ["spotify-to-apple-music"];
    if (from === null || !VALID_MODE.includes(from)) router.push("/");
    if (!canMigrate) router.push("/");
  }

  function backToFlow() {
    router.push("/" + from);
  }

  useEffect(() => {
    checkRoute();
  }, []);

  return (
    <div>
      <FloatingCard
        className="pl-14 pr-14 pb-14 pt-8"
        optionsBar={
          <NavigationButton onClick={() => backToFlow()}>
            Back to Flow
          </NavigationButton>
        }
      ></FloatingCard>
    </div>
  );
}
