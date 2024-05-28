"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function ErrorNotificationCard({
  triggerError,
  notificationDescription,
  notificationTitle,
}: {
  triggerError: number;
  notificationDescription: string;
  notificationTitle: string;
}) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 150 ? 150 : prevProgress + (1.4 * (33.3 / 80))
      );
    }, 33.3);

    return () => {
      clearInterval(timer);
    };
  }, [triggerError]);

  function onCloseNotification() {
    setProgress(100);
  }

  return (
    <>
      {progress > 0 && progress < 150 && triggerError != 0 && (
        <Alert
          className={`absolute z-30 bg-background bg-zinc-900 top-22 right-10 w-64 border-none cursor-pointer ${progress <= 100 ? "animate-popIn" : "animate-popOut"}`}
          style={{background: `linear-gradient(${100 + (progress / 2)}deg, rgba(5,5,5,0.5) ${(progress / 4) + 40}%, rgba(40,40,55,1) ${(progress / 3) + 66}%, rgba(20,20,20,0.5) ${(progress / 3) + 80}%)`}}
          onClick={onCloseNotification}
        >
          <AlertTitle>{notificationTitle}</AlertTitle>
          <AlertDescription className ="text-zinc-400">{notificationDescription}</AlertDescription>
          <Progress className="mt-3" value={progress} />
        </Alert>
      )}
    </>
  );
}
