import { cn } from "@/utils/cn";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "   p-8 rounded-(--ai-radius) bg-(--ai-surface) ",
        "border border-(length:--ai-border-width) border-(--ai-secondary)/20 ",
        "transition-all duration-300 ",
        " hover:border-(--ai-secondary)/50 hover:-translate-y-1 shadow-sm",
        "bg-(--ai-surface)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
