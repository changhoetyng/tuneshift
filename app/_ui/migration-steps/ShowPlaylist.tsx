import LongRoundedButton from "@/app/_ui/buttons/LongRoundedButton";

export default function ShowPlaylist({
  disabled,
  onSelectPlaylist,
}: {
  disabled?: boolean;
  onSelectPlaylist: () => void;
}) {
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
