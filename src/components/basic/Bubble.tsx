import { cn } from "@/utils/cn";
import React from "react";

interface BubbleProps {
    children: React.ReactNode;
    className?: string;
}

export const Bubble = ({ children, className, ...props }: BubbleProps) => {
    return (
        <span

              className={cn(
                  "px-3 py-1 rounded-[calc(var(--ai-radius)/2)] bg-(--ai-primary)/10 text-(--ai-primary) border border-(length:--ai-border-width) border-(--ai-primary)/20",
                  className,
              )}

      {...props}
    >
      {children}
        </span>
    );
};