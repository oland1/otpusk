import {clsx} from "clsx"
import "./Button.css";

type Props = {
  type: "button" | "submit" | "reset";
  variant?: "outline" | "primary";
  size?: "sm" | "md" | "lg";
  label: string;
  onClick?: () => void;
  iconName?: string;
  iconSize?: number;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  const {
    type = "button",
    variant = "outline",
    size = "sm",
    label,
    iconName,
    iconSize = 16,
    iconPosition = "left",
    onClick,
    className = "",
    disabled = false
  } = props;

  const buttonClasses = clsx(
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    className
  );

  const iconClasses = clsx("ui-button__icon", {
    "ui-button__icon--right": iconPosition === "right",
    "ui-button__icon--left": iconPosition === "left",
  });

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {iconName && (
        <img
          src={iconName}
          alt=""
          width={iconSize}
          height={iconSize}
          className={iconClasses}
        />
      )}
      <span className="ui-button__label">{label}</span>
    </button>
  );
};