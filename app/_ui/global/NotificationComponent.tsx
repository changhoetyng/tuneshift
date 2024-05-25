"use client";

import NotificationCard from "@/app/_ui/card/notificationCard";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function ErrorNotificationComponent() {
  const { notificationMessage, notificationTitle, notificationKey } =
    useUIStateStore((state) => ({
      notificationMessage: state.notificationMessage,
      notificationTitle: state.notificationTitle,
      notificationKey: state.notificationKey,
    }));
  return (
    <NotificationCard
      notificationTitle={notificationTitle}
      notificationDescription={notificationMessage}
      triggerError={notificationKey}
    />
  );
}
