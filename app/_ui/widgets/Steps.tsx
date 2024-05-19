import clsx from "clsx";

interface StepProps {
  children?: React.ReactNode;
  className?: string;
}

export default function steps({ children, className }: StepProps) {
  return (
    <div
      className={clsx(
        "rounded-full bg-green-400 h-6 w-6 text-center z-20",
        className
      )}
    >
      {children}
    </div>
  );
}
