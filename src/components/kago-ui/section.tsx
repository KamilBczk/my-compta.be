import React from "react";

interface SectionProps {
  children: React.ReactNode;
  color?: "white" | "gray";
  className?: string;
}

export default function Section({
  children,
  className,
  color = "white",
}: SectionProps) {
  return (
    <div
      className={`py-[200px] ${className} ${
        color === "gray" ? "bg-[#F9FAFC]" : ""
      }`}
    >
      {children}
    </div>
  );
}
