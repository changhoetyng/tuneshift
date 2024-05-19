import React, { ReactNode } from "react";
import clsx from "clsx";

interface RoundedBorderCardProps {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
}

export default function RoundedBorderCard({
  header,
  children,
  className,
  contentClassName,
  headerClassName,
}: RoundedBorderCardProps) {
  return (
    <div
      className={clsx(
        "justify-between flex-nowrap rounded-lg bg-white/15 p-5 h-64 w-56 border-x border-y border-white/50 hover:border-purple-400/70 hover:bg-purple-400/20 transition-all duration-300 ease-out ",
        className
      )}
    >
      {header && (
        <h2 className={clsx("text-2xl", headerClassName)}>{header}</h2>
      )}
      <div
        className={clsx(
          "flex flex-col justify-between h-full pt-2",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
