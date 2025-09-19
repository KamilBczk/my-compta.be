import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return <div className={`py-[100px] my-[100px] ${className}`}>{children}</div>;
}
