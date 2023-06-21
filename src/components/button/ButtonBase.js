const classButton = {
  background:
    "flex justify-center border border-solid bg-primary rounded py-2 px-6 border-none sm:py-4",
  noBackground:
    "flex justify-center border border-solid bg-white rounded py-2 px-6",
  disabled:
    "flex justify-center border border-solid bg-[#AA77FF] rounded py-2 px-6 border-none",
};

export const buttonType = {
  background: "background",
  noBackground: "noBackground",
  disabled: "disabled",
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
