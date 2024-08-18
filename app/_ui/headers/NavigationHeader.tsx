"use client";
import HeaderButton from "@/app/_ui/buttons/HeaderButton";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import TuneShift from "@/public/TuneShift.svg";
import TuneShiftLogo from "@/public/logo.png";
import GithubLogo from "@/public//github-mark-white.svg";
import { useState } from "react";
import { useCredentialsPersistantStore } from "@/stores/credentialsStore";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function NavigationHeader() {
  const [apiKey, setAPIKey] = useState("");

  const { setSpotifyAPIKey } = useCredentialsPersistantStore((state) => ({
    setSpotifyAPIKey: state.setSpotifyAPIKey,
  }));

  const {
    updateNotificationMessage,
    updateNotificationTitle,
    updateNotificationRendererKey,
  } = useUIStateStore((state) => ({
    updateNotificationMessage: state.updateNotificationMessage,
    updateNotificationTitle: state.updateNotificationTitle,
    updateNotificationRendererKey: state.updateNotificationRendererKey,
  }));

  function onSaveAPIKey() {
    // Save API Key
    setSpotifyAPIKey(apiKey);
    updateNotificationRendererKey();
    updateNotificationTitle("Updated Spotify API Key");
    updateNotificationMessage("API Key has been updated.");
  }

  return (
    <div className="inline-grid grid-cols-[auto_auto_auto_auto_auto] sm:grid-cols-[auto_auto_auto] justify-between content-center p-2 pt-5 md:p-5 fixed w-full top-0 z-50 h-20 bg-background">
      <Link
        href="/"
        className="w-auto flex flex-row sm:w-32 h-10 items-center col-span-1"
      >
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
        <Link href="/migrate" className="content-center">
          <HeaderButton className="bg-gray-100/10 sm:bg-gray-100/0">
            Migrate
          </HeaderButton>
        </Link>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <div>
              <HeaderButton className="hidden mr-2 sm:flex">
                Insert Spotify API Key
              </HeaderButton>
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <div className="bg-white/15 p-6 flex flex-row items-center justify-center">
              <h1 className="font-semibold mr-4">Spotify API Key</h1>
              <input
                value={apiKey}
                onChange={(e) => setAPIKey(e.target.value)}
                className="text-black px-2"
              />
              <HeaderButton
                onClick={onSaveAPIKey}
                className="bg-zinc-700 hover:bg-green-400 ml-3"
              >
                Save
              </HeaderButton>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div className="flex flex-row items-center col-start-5 sm:col-start-3 pl-10">
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
