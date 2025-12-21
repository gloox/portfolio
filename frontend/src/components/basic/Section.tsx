import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    className?: string;
}

export const Section = ({children, className, ...props }: SectionProps) => {
    return (
        <section
            className={cn(
                "min-h-[80vh] w-full transition-colors duration-500",
                "bg-[var(--ai-background)]", // <--- THE KEY CHANGE
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
};