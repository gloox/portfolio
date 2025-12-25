import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <section
      className={cn(
        "py-20 px-6  max-w-5xl mx-auto min-h-[80vh] transition-colors duration-500",
        "bg-(--ai-background)",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
