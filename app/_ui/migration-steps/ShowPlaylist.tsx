import LongRoundedButton from "@/app/_ui/buttons/LongRoundedButton";

export default function ShowPlaylist({ disabled }: { disabled?: boolean }) {
  return (
    <div>
      <div>
        <LongRoundedButton disabled={disabled}>
          Show Playlists
        </LongRoundedButton>
      </div>
    </div>
  );
}
