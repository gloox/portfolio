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
                "   p-8 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] ",
                "border border-[length:var(--ai-border-width)] border-[var(--ai-primary)]/20 ",
                "transition-all duration-300 ",
               " hover:border-[var(--ai-primary)]/50 hover:-translate-y-1 shadow-sm",
                "bg-[var(--ai-surface)]",
                className,
              )}

      {...props}
    >
      {children}
        </div>
    );
};