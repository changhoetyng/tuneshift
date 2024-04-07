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
    <div className={clsx("rounded-lg p-4 h-56 w-56 bg-slate-700", className)}>
      {header && (
        <h2 className={clsx("text-2xl", headerClassName)}>{header}</h2>
      )}
      <div className={clsx("pt-2", contentClassName)}>{children}</div>
    </div>
  );
}
