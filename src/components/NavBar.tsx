"use client";

import React, { useState } from "react";
import {
  Home,
  Briefcase,
  Code,
  Sparkles,
  Menu,
  X,
  GraduationCap, BookImage, Wrench,
} from "lucide-react";
import clsx from "clsx";
import { StyleDropdown } from "./StyleDropdown";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Personal", href: "#personal", icon: BookImage },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Wrench },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Contact", href: "#about", icon: Briefcase },
];

const NavBar = () => {
  // 1. Hook into theme for re-renders
  useTheme();

  // 2. State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Classes
  const navClasses = clsx(
    "sticky top-0 z-50 h-16 transition-all duration-500",
    "backdrop-blur-md",
    "bg-[var(--ai-surface)]/90",
    "border-b-[length:var(--ai-border-width)] border-[var(--ai-primary)]/20",
    "shadow-sm",
  );

  const linkClasses = clsx(
    "flex items-center space-x-2 font-medium transition duration-200 p-2 rounded-[var(--ai-radius)]",
    "text-[var(--ai-text)]/70",
    "hover:text-[var(--ai-primary)] hover:bg-[var(--ai-primary)]/10",
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-center items-center w-full">
        {/* Logo / Brand Area (Empty for now but preserves layout) */}
        <div className="flex-shrink-0 font-[family-name:var(--ai-font)] font-bold text-[var(--ai-text)]"></div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden sm:flex items-center space-x-6 font-[family-name:var(--ai-font)]">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className={linkClasses}>
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          ))}

          {/* Divider */}
          <div className="h-6 w-[length:var(--ai-border-width)] bg-[var(--ai-text)]/20 mx-2"></div>

          <StyleDropdown />
        </div>

        {/* MOBILE NAVIGATION BUTTON */}
        <div className="sm:hidden flex items-center gap-4">
          <StyleDropdown />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--ai-text)] hover:bg-[var(--ai-primary)]/10 rounded-[var(--ai-radius)] transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-[var(--ai-surface)] border-b-[length:var(--ai-border-width)] border-[var(--ai-primary)]/20 p-4 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2 font-[family-name:var(--ai-font)]">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={linkClasses}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
