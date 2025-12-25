"use client";

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
  };

export const Button = ({
  children,
  className,
  href,
  ...props
}: ButtonProps) => {

  const combinedStyles = cn(
      "inline-flex items-center justify-center px-6 py-3 font-semibold shadow-lg transition transform hover:scale-105 active:scale-95 rounded-[var(--ai-radius)] border-[length:var(--ai-border-width)] font-[family-name:var(--ai-font)]",
      "bg-[var(--ai-primary)] hover:bg-[var(--ai-primary-hover)] text-[var(--ai-background)] border-transparent",
      className);

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedStyles}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
