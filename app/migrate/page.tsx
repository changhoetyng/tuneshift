import DestinationSelection from "@/app/migrate/_ui/DestinationSelection";
import AppleMusicLogo from "@/public/Apple_Music_logo.svg";
import RoundedBorderCard from "@/app/_ui/card/RoundedBorderCard";

export default async function Migrate() {
  return (
    <div className="flex flex-col items-center transition-all ease-in-out animate-fadeInUpFast ">
      <h1 className="text-4xl text-center">Destination</h1>
      <div className="grid grid-cols-4 gap-12 mt-6">
        <DestinationSelection
          logo={AppleMusicLogo}
          onClickLink="/migrate-to-apple-music"
        />
        <RoundedBorderCard className="flex flex-col justify-center items-center">
          <h1 className="text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            More destinations coming soon!
          </h1>
        </RoundedBorderCard>
      </div>
    </div>
  );
}
