import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * A custom header button component.
 *
 * @component
 * @param {ButtonProps} props - The button props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {string} props.className - The additional class name for the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - The rest of the button attributes.
 * @returns {JSX.Element} The rendered button component.
 */
export default function HeaderButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
      <button
        {...rest}
        className={clsx(
          "bg-zinc-900 hover:bg-zinc-700 text-white duration-200 font-bold py-2 px-4 rounded",
          className
        )}
      >
        {children}
      </button>
  );
}
