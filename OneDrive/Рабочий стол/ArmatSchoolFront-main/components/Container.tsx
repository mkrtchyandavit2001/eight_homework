import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-8 sm:px-10 lg:px-[180px] ${className}`}>
      {children}
    </div>
  );
}