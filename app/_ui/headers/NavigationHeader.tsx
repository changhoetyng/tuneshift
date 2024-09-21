"use client";
import HeaderButton from "@/app/_ui/buttons/HeaderButton";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import HoverComponent from "../global/HoverComponent";
import Image from "next/image";
import Link from "next/link";
import TuneShift from "@/public/TuneShift.svg";
import TuneShiftLogo from "@/public/logo.png";
import GithubLogo from "@/public//github-mark-white.svg";
import ErrorNotificationComponent from "../global/NotificationComponent";
import { SyntheticEvent, useEffect, useState } from "react";
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

  function copyOnClick(e : SyntheticEvent) {
    navigator.clipboard.writeText(e.target.outerText)
  }

  return (
    <div className="inline-grid grid-cols-[auto_auto_auto_auto_auto] sm:grid-cols-[auto_auto_auto] justify-between content-center p-2 pt-5 md:p-5 fixed w-full top-0 z-50 h-20 bg-background ">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-transparent">
          <DialogPanel className="max-w-xl space-y-4 bg-neutral-800/90 p-12 pt-5 h-2/3 overflow-y-auto relative backdrop-blur-sm rounded-lg">
          <div className="flex w-full justify-end align-right items-end">
          <HeaderButton
              onClick={() => setIsOpen(false)}
              className="bg-neutral-700 relative justify-end text-neutral-300"
            >
              Skip
            </HeaderButton>
          </div>

            <DialogTitle id="api-key">
              <span className="font-bold text-2xl" >
              Insert Spotify API Key 
                </span><span className="text-red-500 ml-2">*Required</span>
            </DialogTitle>
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
            <Description>
              Before you can migrate your playlists, you need to insert your
              Spotify API key here to allow the app to perform the migration functions using your Spotify.
              <br></br><br></br>
              Don't worry! You won't be charged by anyone and we don't access your precious private data.
            </Description>
            <Description className="flex flex-col bg-green-900 p-5 rounded-lg">
              <span className="font-bold text-xl">
                1. Go to Spotify Developer Site:
              </span>
              
              <a
                className="underline"
                href="https://developer.spotify.com/"
                target="_blank"
              >
                https://developer.spotify.com/
              </a>
            </Description>
            <Description className="font-bold text-xl bg-neutral-700 p-5 rounded-lg">
              2. Go to Dashboard
              <img src="/Tutorial/Step 2 - Dashboard.webp" className="mt-5 w-100 rounded-sm"></img>
            </Description>
            <Description className="font-bold text-xl bg-neutral-700 p-5 rounded-lg">
              3. Create App and Name it
              <img src="/Tutorial/Step 3 - App Name and Description.webp" className="mt-5 w-100 rounded-sm"></img>
            </Description>
            <Description className="flex flex-col bg-neutral-700 p-5 rounded-lg">
              <span className="font-bold text-xl">
                4. Redirect URIs:
              </span>

              <span className="mt-5">
                Click to copy these links onto the Redirect URIs section.
              </span>

              <img src="/Tutorial/Step 4 - Redirect URI.webp" className="mt-5 w-100 rounded-sm"></img>


                <a className="mt-5 cursor-pointer hover:underline font-semibold" onClick={copyOnClick}>
                  https://changhoetyng.github.io/tuneshift/spotify-authentication-redirection?redirect_link=/spotify-to-apple-music
                  <img src="/copy.svg" width="15px" height="15px" className="absolute inline-block ml-2"></img>
                </a>


              
              <a className="mt-5 cursor-pointer hover:underline font-semibold" onClick={copyOnClick}>
                https://changhoetyng.github.io/tuneshift/spotify-authentication-redirection?redirect_link=/apple-music-to-spotify
                <img src="/copy.svg" width="15px" height="15px" className="absolute inline-block ml-2"></img>
              </a>
              
            </Description>

            <Description className="font-bold text-xl bg-neutral-700 p-5 rounded-lg">
              5. Enable Web API and Save
              <img src="/Tutorial/Step 5 - Web API.webp" className="mt-5 w-100 rounded-sm"></img>
              <img src="/Tutorial/Step 6 - Save.webp" className="mt-5 w-100 rounded-sm"></img>
            </Description>
            <Description className="font-bold text-xl bg-neutral-700 p-5 rounded-lg">
              6. Navigate to Settings and copy the Client ID
              <img src="/Tutorial/Step 7 - Settings.webp" className="mt-5 w-100 rounded-sm"></img>
              <img src="/Tutorial/Step 8 - Copy Client ID.webp" className="mt-5 w-100 rounded-sm"></img>
            </Description>
            <Description className="bg-neutral-700 p-5 rounded-lg">
              <span className="font-bold text-xl">
                7. Insert Spotify Client ID into the field above!
              </span>

              <img src="/Tutorial/Step 9 - Paste and Save.webp" className="mt-5 w-100 rounded-sm"></img>
              <br></br>
              <a href="#api-key" className="bg-purple-500 p-2 rounded-md">Go insert API Key ^ </a>
            </Description>
            <div className="flex w-full justify-end align-right items-end">
          <HeaderButton
              onClick={() => setIsOpen(false)}
              className="bg-neutral-600 relative justify-end text-neutral-100"
            >
              Got It!
            </HeaderButton>
          </div>
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
