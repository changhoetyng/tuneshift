import React, { ReactNode } from "react";
import Image from "next/image";
import Tick from "@/public/tick.svg";
import Logout from "@/public/logout.svg";
import Cross from "@/public/cross.svg";

interface RectangleCardProps {
  musicStreamingServiceName?: string;
  onLogout?: () => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
}

export default function SessionRectangleCard({
  musicStreamingServiceName,
  onLogout,
  onLogin,
  isLoggedIn,
}: RectangleCardProps) {
  return (
    <div className="border-2 border-fuchsia-500 h-14 flex justify-around items-center">
      {isLoggedIn ? (
        <span className="flex flex-row">
          <h1 className="text-fuchsia-500 text-xl font-bold ml-6">
            Logged In To {musicStreamingServiceName}
          </h1>
          <div className="flex flex-row ml-8 mr-5">
            <Image src={Tick} alt="Green Tick" height={25} priority />
            <Image
              src={Logout}
              alt="Logout"
              height={25}
              className="ml-2 cursor-pointer"
              priority
              onClick={onLogout}
            />
          </div>
        </span>
      ) : (
        <span className="flex flex-row">
          <h1
            className="text-fuchsia-500 text-xl font-bold ml-6 cursor-pointer"
            onClick={onLogin}
          >
            Login to {musicStreamingServiceName}
          </h1>
          <div className="flex ml-8 mr-5">
            <Image
              src={Cross}
              alt="Red Cross"
              width={25}
              height={25}
              priority
            />
          </div>
        </span>
      )}
    </div>
  );
}
