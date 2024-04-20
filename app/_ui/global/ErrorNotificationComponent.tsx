"use client";

import NotificationCard from "@/app/_ui/card/notificationCard";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function ErrorNotificationComponent() {
  const { errorMessage, errorTitle, errorKey } = useUIStateStore((state) => ({
    errorMessage: state.errorMessage,
    errorTitle: state.errorTitle,
    errorKey: state.errorKey,
  }));
  return (
    <NotificationCard
      errorTitle={errorTitle}
      errorDescription={errorMessage}
      triggerError={errorKey}
    />
  );
}
