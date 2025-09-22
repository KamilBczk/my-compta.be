import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant: "gradient" | "white" | "border";
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function Button({
  children,
  variant,
  href,
  type,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-block px-8 py-3 rounded-md transition-all duration-300 ease-in-out";
  const variantClasses = {
    gradient:
      "bg-gradient-to-tr from-[#02479B] to-[#0188CC] text-white hover:rounded-xl",
    white: "bg-white text-[#025EAC] hover:bg-gray-50",
    border:
      "border-2 border-[#025EAC] text-[#025EAC] bg-transparent hover:bg-[#025EAC] hover:text-white",
  };
  if (type === "submit") {
    return (
      <button
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
