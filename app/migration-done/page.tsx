import NavigationButton from "../_ui/buttons/NavigationButton";
import Link from "next/link";
import FloatingCard from "../_ui/card/FloatingCard";
import Tick from "@/public/tick.svg";
import Image from "next/image";

export default function migrationDone() {
  return (
    <div className="w-full h-full">
      <FloatingCard
        className="relative flex flex-col items-center h-5/6 w-5/6 justify-center"
        parentClassName="h-full w-full flex justify-center items-center"
      >
        <Image src={Tick} alt="Green Tick" height={50} priority />
        <h1 className="text-2xl font-semibold mt-4">
          Successfully Imported Playlist
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
