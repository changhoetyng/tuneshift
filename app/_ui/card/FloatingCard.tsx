import clsx from "clsx";

interface FloatingCardProps {
  optionsBar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function FloatingCard({
  optionsBar,
  children,
  className,
  ...rest
}: FloatingCardProps) {
  return (
    <div
      className={clsx(
        "fixed inset-x-0 flex items-center justify-center flex-col"
      )}
    >
      <div>
        <div className="self-start mb-3">{optionsBar}</div>
        <div className={clsx("bg-card", className)} {...rest}>
          {children}
        </div>
      </div>
    </div>
  );
}
