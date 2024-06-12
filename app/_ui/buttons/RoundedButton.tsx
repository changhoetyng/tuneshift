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
export default function RoundedButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "bg-gradient-to-br from-indigo-400/20 via-purple-500/40 to-pink-500/70 transition-all hover:brightness-110 hover:contrast-200 font-bold py-2 px-4 rounded-lg",
        className
      )}
    >
      {children}
    </button>
  );
}
