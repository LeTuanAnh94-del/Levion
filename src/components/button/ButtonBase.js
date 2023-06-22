const classButton = {
  primary:
    "flex flex-row justify-center gap-1 bg-primary rounded text-white transition-all ease-in duration-75 hover:bg-grey_dark",
  secondary:
    "flex flex-row justify-center gap-1 border border-solid border-primary rounded text-primary hover:bg-primary hover:text-white",
  disabled1: "flex flex-row justify-center gap-1 bg-grey_lighter rounded",
  disabled2: "flex flex-row justify-center gap-1 bg-grey_lightest rounded",
};

export const buttonType = {
  primary: "primary",
  secondary: "secondary",
  disabled1: "disabled1",
  disabled2: "disabled2",
};

export default function ButtonBase({
  type = buttonType.body,
  children,
  className,
  onClick,
  disabled,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classButton[type]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
