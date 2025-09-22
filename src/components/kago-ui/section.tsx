import React from "react";

interface SectionProps {
  children: React.ReactNode;
  color?: "white" | "gray";
  className?: string;
  withBorder?: boolean;
}

export default function Section({
  children,
  className,
  color = "white",
  withBorder = true,
}: SectionProps) {
  return (
    <div
      className={`py-[200px] ${
        withBorder ? "border-y-[1px] border-[#025EAC]" : ""
      } relative ${className} ${color === "gray" ? "bg-[#F9FAFC]" : ""}`}
    >
      {children}
    </div>
  );
}
