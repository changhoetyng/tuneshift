"use client";
import HeaderButton from "@/app/_ui/buttons/HeaderButton";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import TuneShift from "@/public/TuneShift.svg";
import TuneShiftLogo from "@/public/logo.png";
import GithubLogo from "@/public//github-mark-white.svg";
import { useEffect, useState } from "react";
import { useCredentialsPersistantStore } from "@/stores/credentialsStore";
import { useUIStateStore } from "@/stores/UIStateStore";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { usePathname } from "next/navigation";

export default function NavigationHeader() {
  const [apiKey, setAPIKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { setSpotifyAPIKey } = useCredentialsPersistantStore((state) => ({
    setSpotifyAPIKey: state.setSpotifyAPIKey,
  }));

  useEffect(() => {
    if (pathname === "/migrate") {
      setIsOpen(true);
    }
  }, [pathname]);

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
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-background p-12 h-2/3 overflow-y-auto relative">
            <DialogTitle className="font-bold text-2xl">
              Insert Spotify API Key
            </DialogTitle>
            <Description>
              Before you can migrate your playlists, you need to insert your
              Spotify API key on the top menu.
            </Description>
            <Description className="font-bold text-xl">
              1. Go to Spotify Developer Site:
            </Description>
            <Description>
              <a
                className="underline"
                href="https://developer.spotify.com/"
                target="_blank"
              >
                https://developer.spotify.com/
              </a>
            </Description>
            <Description className="font-bold text-xl">
              2. Go to Dashboard
            </Description>
            <Description className="font-bold text-xl">
              3. Create App
            </Description>
            <Description className="font-bold text-xl">
              4. Create App
            </Description>
            <Description className="font-bold text-xl">
              5. Redirection Link:
            </Description>
            <br />
            <Description>
              Copy these links onto the redirect link section.
            </Description>
            <br />
            <Description className="underline">
              https://changhoetyng.github.io/tuneshift/spotify-authentication-redirection?redirect_link=/spotify-to-apple-music
            </Description>
            <br />
            <Description className="underline">
              https://changhoetyng.github.io/tuneshift/spotify-authentication-redirection?redirect_link=/apple-music-to-spotify
            </Description>
            <Description className="font-bold text-xl">
              6. Enable Web API
            </Description>
            <Description className="font-bold text-xl">
              7. Copy Client ID
            </Description>
            <Description className="font-bold text-xl">
              8. Insert Spotify Client ID
            </Description>
            <div className="flex flex-row">
              <input
                value={apiKey}
                onChange={(e) => setAPIKey(e.target.value)}
                className="text-black px-2"
              />
              <HeaderButton
                onClick={onSaveAPIKey}
                className="bg-zinc-700 hover:bg-green-400 ml-3  border border-white"
              >
                Save
              </HeaderButton>
            </div>
            <HeaderButton
              onClick={() => setIsOpen(false)}
              className="bg-gray-100/10 sm:bg-gray-100/0 border border-white absolute right-5"
            >
              Got it!
            </HeaderButton>
          </DialogPanel>
        </div>
      </Dialog>
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
        <div>
          <HeaderButton
            className="hidden mr-2 sm:flex"
            onClick={() => setIsOpen(true)}
          >
            Insert Spotify API Key
          </HeaderButton>
        </div>
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
