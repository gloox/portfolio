import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    // Use ElementType to allow any valid HTML tag string
    children: ReactNode;
    className?: string;
}

export const Section = ({children, className, ...props }: SectionProps) => {

    return (
        <section
            className={cn("min-h-[80vh] flexbg-gray-50 ", className)}
            {...props} // Now props matches HTMLElement, which is a safe "catch-all"
        >
            {children}
        </section>
    );
};