import classnames from "classnames";
export interface ButtonProps {
  size: "sm" | "lg";
  type?: "button" | "reset" | "submit";
  bgColor: string;
  textColor: string;
  children: React.ReactNode;
  handleClick?: () => void;
  disabled?: boolean;
}
const Button = ({
  size,
  bgColor,
  textColor,
  children,
  handleClick,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      className={classnames(
        `bg-${bgColor} text-${textColor} font-bold py-2 px-4 rounded`,
        {
          "text-xs": size === "sm",
          "text-xl": size === "lg",
          green: "bg-green-500",
        }
      )}
      onClick={() => handleClick?.()}
      disabled={Boolean(disabled)}
    >
      {children}
    </button>
  );
};

export { Button };
