import TuneShift from "@/public/tuneshift.svg";
import GithubLogo from "@/public/github-mark-white.svg";
import Image from "next/image";
import HeaderButton from "../buttons/HeaderButton";
import Link from "next/link";

export default async function NavigationHeader() {
  return (
    <div className="flex flex-row justify-between p-5">
      <div className="w-32 h-10 items-center mt-2">
        <Image
          src={TuneShift}
          alt="TuneShift Logo"
          width={500}
          height={500}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="flex flex-row">
        <Link href="/">
          <HeaderButton>Home</HeaderButton>
        </Link>
        <Link href="/spotify-to-apple-music">
          <HeaderButton>Migrate to Apple Music</HeaderButton>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <HeaderButton className="mr-2">About me</HeaderButton>
        <div className="w-8 h-8 items-center">
          <a
            href="https://github.com/changhoetyng/tuneshift"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={GithubLogo}
              alt="Github Logo"
              width={500}
              height={500}
              className="cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
