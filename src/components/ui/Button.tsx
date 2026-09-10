import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
  disabled?: boolean;
};

const variants = {
  primary: "bg-teal text-white",
  secondary: "bg-light-teal text-dark-teal",
  ghost: "bg-white/10 text-cream border border-white/25",
  danger: "bg-danger text-white",
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-[15px] font-semibold disabled:bg-gray-200 disabled:text-gray-400 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
