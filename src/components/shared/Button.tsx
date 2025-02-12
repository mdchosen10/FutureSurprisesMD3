import React from "react";

interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "transparent";
  size?: "small" | "medium" | "large"; // Button sizes
  disabled?: boolean; // Disabled state
  className?: string; // Additional custom styles
}

const Button: React.FC<ButtonProps> = ({
  id,
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
}) => {
  // Define styles for different variants
  const baseStyles =
    "rounded focus:outline-none focus:ring transition-all duration-150 font-poppins border-0";
  const variantStyles = {
    primary:
      "bg-primary text-white dark:text-white hover:shadow-md focus:ring-0 hover:opacity-[0.9]",
    secondary:
      "bg-secondary text-white dark:text-white hover:shadow-md focus:ring-0",
    danger:
      "bg-red-500 text-white dark:text-white hover:bg-red-600 focus:ring-0",
    transparent:
      "bg-transparent hover:bg-transparent focus:ring-0",
  };
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        sizeStyles[size]
      } ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
