"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "./basic/Button";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export const StyleDropdown = () => {
  const { generateTheme, isGenerating } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const success = await generateTheme(input);
    if (success) {
      setIsOpen(false);
      setInput("");
    }
  };

  return (
    <div
      className="relative font-[family-name:var(--ai-font)]"
      ref={dropdownRef}
    >
      {/* The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "ms-8 flex items-center space-x-2 font-medium transition duration-150 p-2 rounded-[var(--ai-radius)]",
          // Text Colors using AI Variables
          "text-[var(--ai-text)]/70 hover:text-[var(--ai-primary)] hover:bg-[var(--ai-primary)]/10",
          isOpen && "bg-[var(--ai-primary)]/10 text-[var(--ai-primary)]",
        )}
        style={{outline: 'solid'}}
      >
        <Palette className="w-5 h-5" />
        <span>Style</span>
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* The Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 transform px-2 sm:px-0 z-50">
          <div className="overflow-hidden shadow-2xl rounded-[var(--ai-radius)] border-[length:var(--ai-border-width)] border-[var(--ai-text)]/10">
            {/* Dropdown Background:
                            Using 'bg-[var(--ai-surface)]' ensures the menu matches the theme (dark/light/custom)
                        */}
            <div className="relative grid gap-4 bg-[var(--ai-surface)] p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--ai-primary)]" />
                <h3 className="text-sm font-medium text-[var(--ai-text)]">
                  AI Theme Generator
                </h3>
              </div>

              <p className="text-xs text-[var(--ai-text)]/60">
                Describe a new look and the AI will repaint the website.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. 'Coffee', 'Dark Bubblegum'..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isGenerating}
                  className={clsx(
                    "w-full px-3 py-2 text-sm placeholder-[var(--ai-text)]/30 focus:outline-none focus:ring-1",
                    "bg-[var(--ai-background)] text-[var(--ai-text)]", // Input bg matches main page bg
                    "border border-[var(--ai-text)]/20",
                    "rounded-[calc(var(--ai-radius)-2px)]",
                    "focus:border-[var(--ai-primary)] focus:ring-[var(--ai-primary)]",
                  )}
                />
                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-2 text-sm"
                  variant="primary"
                >
                  {isGenerating ? "Generating..." : "Apply Style"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
