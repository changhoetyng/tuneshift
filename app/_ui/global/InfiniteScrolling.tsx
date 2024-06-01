import React, { useState, UIEvent } from "react";
import clsx from "clsx"; // Make sure you have clsx installed: npm install clsx

interface InfiniteScrollingProps {
  children: React.ReactNode;
  onScroll: () => Promise<boolean>;
  className?: string;
  [key: string]: any; // For additional props
}

const InfiniteScrolling = ({
  children,
  onScroll,
  className,
  ...rest
}: InfiniteScrollingProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = async (e: UIEvent<HTMLDivElement>) => {
    if (isFetching || isEnd) return;

    const target = e.target as HTMLDivElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setIsFetching(true);
      const result = await onScroll();
      setIsFetching(false);

      if (!result) {
        setIsEnd(true);
      }
    }
  };

  return (
    <div
      className={clsx("overflow-y-auto", className)}
      onScroll={handleScroll}
      {...rest}
    >
      {children}
    </div>
  );
};

export default InfiniteScrolling;
