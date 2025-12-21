import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TextProps extends HTMLAttributes<HTMLElement> {
    // Use ElementType to allow any valid HTML tag string
    variant?: "h1" | "h2" | "h3" | "p" | "blockquote";
    children: ReactNode;
    className?: string;
}

export const Text = ({ variant = "p", children, className, ...props }: TextProps) => {
    const variants = {
        h1: "scroll-m-20 text-6xl font-extrabold tracking-tight",
        h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        blockquote: "mt-6 border-l-2 pl-6 italic",
    };

    // 1. Cast the variant string to ElementType so React treats it as a valid Tag
    const Component = variant as ElementType;

    return (
        <Component
            className={cn(variants[variant], className)}
            {...props} // Now props matches HTMLElement, which is a safe "catch-all"
        >
            {children}
        </Component>
    );
};