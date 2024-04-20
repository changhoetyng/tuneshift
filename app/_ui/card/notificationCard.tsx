"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function ErrorNotificationCard({
  triggerError,
  errorDescription,
  errorTitle,
}: {
  triggerError: number;
  errorDescription: string;
  errorTitle: string;
}) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1.4
      );
    }, 80);

    return () => {
      clearInterval(timer);
    };
  }, [triggerError]);

  function onCloseNotification() {
    setProgress(100);
  }

  return (
    <>
      {progress > 0 && progress < 100 && triggerError != 0 && (
        <Alert
          className="absolute z-30 bg-background bg-zinc-900 top-22 right-10 w-64 cursor-pointer"
          onClick={onCloseNotification}
        >
          <AlertTitle>{errorTitle}</AlertTitle>
          <AlertDescription>{errorDescription}</AlertDescription>
          <Progress value={progress} />
        </Alert>
      )}
    </>
  );
}
