import LongRoundedButton from "@/app/_ui/buttons/LongRoundedButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ShowPlaylist({
  disabled,
  onSelectPlaylist,
}: {
  disabled?: boolean;
  onSelectPlaylist: () => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log(window.history.state);
  });

  return (
    <div>
      <div>
        <LongRoundedButton onClick={onSelectPlaylist} disabled={disabled}>
          Select Playlists
        </LongRoundedButton>
      </div>
    </div>
  );
}
