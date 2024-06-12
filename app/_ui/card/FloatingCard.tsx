import clsx from "clsx";

interface FloatingCardProps {
  optionsBar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  parentClassName?: string;
}

export default function FloatingCard({
  optionsBar,
  children,
  className,
  parentClassName,
  ...rest
}: FloatingCardProps) {
  return (
    <div
      className={clsx(
        "inset-x-0 flex items-center justify-center flex-col",
        parentClassName
      )}
    >
      <div className={clsx("w-full sm:max-w-fit" , parentClassName)}>
        {optionsBar && <div className="self-start mb-3">{optionsBar}</div>}
        <div className={clsx("w-full bg-neutral-800 rounded-2xl", className)} {...rest}>
          {children}
        </div>
      </div>
    </div>
  );
}
