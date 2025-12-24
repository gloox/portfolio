// src/components/ThemeGenerator.tsx
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from './basic/Button';

// 1. Add the prop interface
interface ThemeGeneratorProps {
    onSuccess?: () => void;
}

export const ThemeGenerator: React.FC<ThemeGeneratorProps> = ({ onSuccess }) => {
    const { generateTheme, isGenerating, aiMessage } = useTheme();
    const [input, setInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 2. Wait for the boolean result
        const success = await generateTheme(input);

        // 3. Only trigger the page transition if it worked
        if (success && onSuccess) {
            // Optional: specific small delay so they see the color change first
            setTimeout(() => {
                onSuccess();
            }, 800);
        }
    };

    return (
        <div className="w-full max-w-md mt-8">
            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="(e.g. 'Coffee', 'Valorant', 'Old School')..."
                    disabled={isGenerating}
                    className="flex-1 px-4 py-3 rounded-[var(--ai-radius)] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--ai-primary)] text-black"
                />
                <Button type="submit" disabled={isGenerating}>
                    {isGenerating ? "..." : "Make it"}
                </Button>
            </form>
            {aiMessage && (
                <p className="mt-4 text-red-500 bg-red-100 p-3 rounded-[var(--ai-radius)]">
                    {aiMessage}
                </p>
            )}
        </div>
    );
};