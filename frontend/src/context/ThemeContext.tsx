"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Define the shapes
type ThemeColors = {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    background: string;
    text: string;
};

type ThemeConfig = {
    colors: ThemeColors;
    borderRadius: string;
};

// The response from your backend can be one of two things
type ApiResponse =
    | { type: 'theme'; data: ThemeConfig }
    | { type: 'message'; content: string };

interface ThemeContextType {
    theme: ThemeConfig;
    aiMessage: string | null;     // The text response from AI (e.g. "I can't do that")
    isGenerating: boolean;        // Loading state
    generateTheme: (prompt: string) => Promise<void>; // The function to call
}

const defaultTheme: ThemeConfig = {
    colors: {
        primary: "#4F46E5",
        primaryHover: "#4338ca",
        secondary: "#4B5563",
        secondaryHover: "#374151",
        background: "#ffffff",
        text: "#000000",
    },
    borderRadius: "0.5rem"
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
    const [aiMessage, setAiMessage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // 1. The function connected to your Backend
    const generateTheme = async (prompt: string) => {
        setIsGenerating(true);
        setAiMessage(null);

        try {
            // 1. Call the new API route
            const res = await fetch('http://localhost:8000/api/generate-theme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!res.ok) throw new Error("API Request Failed");

            const data: ApiResponse = await res.json();

            // 2. Handle the response types
            if (data.type === 'theme') {
                setTheme(data.data);
            } else {
                // "I can't do that Dave"
                setAiMessage(data.content);
            }

        } catch (error) {
            console.error(error);
            setAiMessage("Something went wrong contacting the AI.");
        } finally {
            setIsGenerating(false);
        }
    };

    // 2. CSS Variable Injection (Same as before)
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--ai-primary', theme.colors.primary);
        root.style.setProperty('--ai-primary-hover', theme.colors.primaryHover);
        root.style.setProperty('--ai-secondary', theme.colors.secondary);
        root.style.setProperty('--ai-secondary-hover', theme.colors.secondaryHover);
        root.style.setProperty('--ai-background', theme.colors.background);
        root.style.setProperty('--ai-text', theme.colors.text);
        root.style.setProperty('--ai-radius', theme.borderRadius);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, aiMessage, isGenerating, generateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};