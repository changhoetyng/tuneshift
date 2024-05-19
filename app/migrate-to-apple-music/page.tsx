"use client";

import NavigationButton from "../_ui/buttons/NavigationButton";
import FloatingCard from "../_ui/card/FloatingCard";

export default function MigrateToAppleMusic() {
  return (
    <div>
      <FloatingCard
        optionsBar={
          <NavigationButton className="mt-4">Back to Options</NavigationButton>
        }
      >
        Hello, world!
      </FloatingCard>
    </div>
  );
}
