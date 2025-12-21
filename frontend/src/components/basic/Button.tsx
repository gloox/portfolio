"use client"; // <--- Don't forget this! You are using Context/Hooks.

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/context/ThemeContext";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    variant?: ButtonVariant;
};

export const Button = ({
                           children,
                           className,
                           href,
                           variant = "primary",
                           ...props
                       }: ButtonProps) => {
    // We don't need to read the theme here if we use CSS vars,
    // but we keep the hook if you need logic later.
    useTheme();

    // 1. Use Arbitrary Values (Square brackets)
    // tailwind knows "bg-[...]" means "set background color to this value"
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-semibold shadow-lg transition transform hover:scale-105 active:scale-95 rounded-[var(--ai-radius)]";

    const variants = {
        // Direct mapping to the CSS variables we injected
        primary: "bg-[var(--ai-primary)] hover:bg-[var(--ai-primary-hover)] text-[var(--ai-text)]",
        secondary: "bg-[var(--ai-secondary)] hover:bg-[var(--ai-secondary-hover)] text-white",
    };

    const combinedStyles = cn(baseStyles, variants[variant], className);

    if (href) {
        return (
            <a href={href} className={combinedStyles} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </a>
        );
    }

    return (
        <button className={combinedStyles} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
};