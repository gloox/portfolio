"use client";

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from './Button'; // Assuming your Button is here
import { Text } from './Text';

export const ThemeGenerator = () => {
    const { generateTheme, isGenerating, aiMessage } = useTheme();
    const [input, setInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        await generateTheme(input);
    };

    return (
        <div className="max-w-xl w-full mt-8">
            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe a vibe (e.g. 'Cyberpunk', 'Banana', 'Minimalist')..."
                    disabled={isGenerating}
                    className="flex-1 px-4 py-3 rounded-[var(--ai-radius)] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--ai-primary)] text-black"
                />
                <Button
                    type="submit"
                    disabled={isGenerating}
                    variant="primary"
                >
                    {isGenerating ? "Generat..." : "Make it"}
                </Button>
            </form>

            {/* Error / Feedback Message area */}
            {aiMessage && (
                <div className="mt-4 p-4 rounded-[var(--ai-radius)] bg-red-100 border border-red-200">
                    <Text variant="p" className="text-red-800">
                        🤖 AI: {aiMessage}
                    </Text>
                </div>
            )}
        </div>
    );
};