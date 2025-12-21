"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// --- Types (Same as before) ---
type ThemeColors = {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    background: string;
    text: string;
    surface: string;
};

type ThemeConfig = {
    colors: ThemeColors;
    borderRadius: string;
    borderWidth: string;
    fontStyle: 'sans' | 'serif' | 'mono';
};

interface ThemeContextType {
    theme: ThemeConfig;
    aiMessage: string | null;
    isGenerating: boolean;
    generateTheme: (prompt: string) => Promise<boolean>;
}

// Default fallback (White/Clean)
const defaultTheme: ThemeConfig = {
    colors: {
        primary: "#4F46E5",
        primaryHover: "#4338ca",
        secondary: "#4B5563",
        secondaryHover: "#374151",
        background: "#ffffff",
        text: "#000000",
        surface: "#f3f4f6"
    },
    borderRadius: "0.5rem",
    borderWidth: "1px",
    fontStyle: "sans"
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_theme_cache";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
    const [aiMessage, setAiMessage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); // To prevent flashing

    // 1. INITIAL LOAD: Read from LocalStorage on mount
    useEffect(() => {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                // Basic validation to ensure shape is correct
                if (parsed.colors && parsed.borderRadius) {
                    setTheme(parsed);
                }
            } catch (e) {
                console.error("Failed to load theme cache", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // 2. INJECT STYLES: Whenever 'theme' changes, update CSS variables
    useEffect(() => {
        if (!isLoaded) return; // Don't inject defaults if we are still checking cache

        const root = document.documentElement;

        // Colors
        root.style.setProperty('--ai-primary', theme.colors.primary);
        root.style.setProperty('--ai-primary-hover', theme.colors.primaryHover);
        root.style.setProperty('--ai-secondary', theme.colors.secondary);
        root.style.setProperty('--ai-secondary-hover', theme.colors.secondaryHover);
        root.style.setProperty('--ai-background', theme.colors.background);
        root.style.setProperty('--ai-text', theme.colors.text);
        root.style.setProperty('--ai-surface', theme.colors.surface);

        // Shape
        root.style.setProperty('--ai-radius', theme.borderRadius);
        root.style.setProperty('--ai-border-width', theme.borderWidth);

        // Fonts
        let fontVar = 'var(--font-sans)';
        if (theme.fontStyle === 'serif') fontVar = 'var(--font-serif)';
        if (theme.fontStyle === 'mono') fontVar = 'var(--font-mono)';
        root.style.setProperty('--ai-font', fontVar);

    }, [theme, isLoaded]);


    // 3. GENERATE: Fetch from API -> Update State -> Save to Cache
    const generateTheme = async (prompt: string): Promise<boolean> => {
        setIsGenerating(true);
        setAiMessage(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generate-theme`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            const data = await res.json();

            if (data.type === 'theme') {
                const newTheme = data.data;

                // Update State
                setTheme(newTheme);

                // Save to Cache (Persistence)
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));

                setIsGenerating(false);
                return true;
            } else {
                setAiMessage(data.content);
                setIsGenerating(false);
                return false;
            }
        } catch (error) {
            console.error(error);
            setAiMessage("Error connecting to server.");
            setIsGenerating(false);
            return false;
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, aiMessage, isGenerating, generateTheme }}>
            {/* Optional: Render nothing until loaded to prevent "White Flash" if user has "Dark Mode" cached */}
            <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};