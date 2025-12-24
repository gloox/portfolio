import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote";
  children: ReactNode;
  className?: string;
}

export const Text = ({
  variant = "p",
  children,
  className,
  ...props
}: TextProps) => {
  // We add 'font-[family-name:var(--ai-font)]' to everything
  // We also use 'text-[var(--ai-text)]' to ensure color consistency
  const baseClass =
    "font-[family-name:var(--ai-font)] text-[var(--ai-text)] transition-colors duration-500";

  const variants = {
    h1: "text-6xl font-extrabold tracking-tight",
    h2: "text-4xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-bold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic border-[var(--ai-primary)]",
  };

  const Component = variant as ElementType;

  return (
    <Component
      className={cn(baseClass, variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
