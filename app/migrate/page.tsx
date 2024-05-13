import DestinationSelection from "@/app/migrate/_ui/DestinationSelection";
import SpotifyToAppleImage from "@/public//Spotify-Apple.png";
import AppleToSpotifyImage from "@/public//Apple-Spotify.png";
import RoundedBorderCard from "@/app/_ui/card/RoundedBorderCard";

export default async function Migrate() {
  return (
    <div className="flex flex-col justify-center items-center h-full transition-all ease-in-out animate-fadeInUpFast ">
      <h1 className="text-3xl text-center font-bold p-6">Migrate Playlists</h1>
      <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-2 gap-12 mt-6">
        <DestinationSelection
          logo={AppleToSpotifyImage}
          onClickLink="/migrate-to-apple-music"
          title="Apple Music \n to"
          titleHighlight="Spotify"
        />
        <DestinationSelection
          logo={SpotifyToAppleImage}
          onClickLink="/migrate-to-apple-music"
          title="Spotify \n to"
          titleHighlight="Apple Music"
        />
        {/* <RoundedBorderCard className="flex flex-col justify-center items-center">
          <h1 className="text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            More destinations coming soon!
          </h1>
        </RoundedBorderCard> */}
      </div>
    </div>
  );
}
