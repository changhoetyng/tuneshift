import HeaderButton from "@/app/_ui/buttons/HeaderButton";
import Image from "next/image";
import Link from "next/link";
import TuneShift from "@/public/TuneShift.svg";
import TuneShiftLogo from "@/public/logo.png";
import GithubLogo from "@/public//github-mark-white.svg";

export default async function NavigationHeader() {
  return (
    <div className="flex flex-row justify-between p-5 fixed w-full top-0 z-50 h-20 bg-background-default">
      <div className="flex flex-row w-32 h-10 items-center mt-2">
        <Image
            src={TuneShiftLogo}
            alt="TuneShift Logo"
            width={50}
            height={200}
            className="w-min h-auto cursor-pointer"
            priority
        />
        <Image
          src={TuneShift}
          alt="TuneShift Logo"
          width={500}
          height={500}
          className="w-full h-auto cursor-pointer"
          priority
        />
      </div>
      <div className="flex flex-row">
        <Link href="/">
          <HeaderButton>Home</HeaderButton>
        </Link>
        <Link href="/migrate">
          <HeaderButton>Migrate</HeaderButton>
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
              className="w-full h-auto cursor-pointer"
              priority
            />
          </a>
        </div>
      </div>
    </div>
  );
}
