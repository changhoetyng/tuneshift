import HeaderButton from "@/app/_ui/buttons/HeaderButton";
import Image from "next/image";
import Link from "next/link";
import TuneShift from "@/public/TuneShift.svg";
import TuneShiftLogo from "@/public/logo.png";
import GithubLogo from "@/public//github-mark-white.svg";

export default async function NavigationHeader() {
  return (
    <div className="inline-grid grid-cols-[auto_auto_auto_auto_auto] sm:grid-cols-[auto_auto_auto] justify-between p-5 fixed w-full top-0 z-50 h-20 bg-background-default">
      <Link href="/" className="w-auto flex flex-row sm:w-32 h-10 items-center col-span-1">
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
          className="w-full h-4 sm:h-auto cursor-pointer sm:flex"
          priority
        />
      </Link>
      <div className="flex flex-row col-start-4 sm:col-start-2">
        <Link href="/" className="hidden sm:flex">
          <HeaderButton>Home</HeaderButton>
        </Link>
        <Link href="/migrate" >
          <HeaderButton className="bg-gray-100/10 sm:bg-gray-100/0">Migrate</HeaderButton>
        </Link>
      </div>
      <div className="flex flex-row items-center col-start-5 sm:col-start-3">
        <HeaderButton className="hidden mr-2 sm:flex">About me</HeaderButton>
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
