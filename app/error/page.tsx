"use client";
import { useRouter } from "next/navigation";
import NavigationButton from "../_ui/buttons/NavigationButton";
import Link from "next/link";
import FloatingCard from "../_ui/card/FloatingCard";
import Cross from "@/public/cross.svg";
import Image from "next/image";
import { useEffect } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function Error() {
  const router = useRouter();
  const { selectedPlaylists, updateSelectedPlaylists } = useUIStateStore(
    (state) => ({
      // Migrate Context
      selectedPlaylists: state.selectedPlaylists,
      updateSelectedPlaylists: state.updateSelectedPlaylists,
    })
  );

  useEffect(() => {
    if (selectedPlaylists.length <= 0) {
      return router.push("/migrate");
    }

    updateSelectedPlaylists([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full">
      <FloatingCard
        className="relative flex flex-col items-center h-5/6 w-5/6 justify-center"
        parentClassName="h-full w-full flex justify-center items-center"
      >
        <Image src={Cross} alt="Red Cross" height={50} priority />
        <h1 className="text-2xl font-semibold mt-4">
          Error! Something went wrong. It might be rate limiting issue. Please
          try again later.
        </h1>
        <Link href="/migrate">
          <NavigationButton className="mt-6 rounded border-2 border-white">
            Back to Migrate
          </NavigationButton>
        </Link>
      </FloatingCard>
    </div>
  );
}
