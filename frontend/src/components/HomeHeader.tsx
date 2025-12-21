"use client";

import React, { useState } from 'react';
import {Personal, Education} from '@/types';
import { Text } from './basic/Text';
import { Typewriter } from './basic/TypeWriterAnimation';
import { Send } from 'lucide-react';
import clsx from 'clsx';

interface HomeHeaderProps {
    personal: Personal;
    education: Education;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ personal, education}) => {
    const [question, setQuestion] = useState("");
    const [chatReply, setChatReply] = useState("");
    const [isChatting, setIsChatting] = useState(false);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question) return;

        setIsChatting(true);
        setChatReply("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question })
            });
            const data = await res.json();
            setChatReply(data.reply);
        } catch (error) {
            setChatReply("Sorry, I couldn't reach the server.");
        } finally {
            setIsChatting(false);
        }
    };

    return (
        <section  id="home" className="min-h-[85vh] pt-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center gap-10 font-[family-name:var(--ai-font)]">

            {/* 1. Bio Section */}
            <div className="space-y-6">
                <Text variant="h1" className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[var(--ai-text)]">
                    <Typewriter text={`Hi hi, I'm ${personal.firstName}.`} delay={0.1} />
                </Text>
                <Text variant="h3" className="text-xl sm:text-2xl opacity-80 max-w-2xl mx-auto leading-relaxed text-[var(--ai-text)]">
                    {/* Added Fallback for location here */}
                    {personal.title} from {education.institution} {personal.location}. <br/>
                </Text>
            </div>

            {/* 2. Big Q&A Section */}
            <div className="w-full max-w-2xl mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="bg-[var(--ai-surface)]/50 backdrop-blur-md p-1 rounded-[var(--ai-radius)] shadow-xl border border-[var(--ai-text)]/10 ring-4 ring-[var(--ai-text)]/5">
                    <form onSubmit={handleChatSubmit} className="relative flex items-center">
                        <input
                            className="w-full h-16 pl-6 pr-16 rounded-[calc(var(--ai-radius)-4px)] bg-transparent text-xl sm:text-2xl text-[var(--ai-text)] placeholder-[var(--ai-text)]/40 focus:outline-none font-[family-name:var(--ai-font)]"
                            placeholder={`Ask anything about me!`}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={isChatting}
                        />
                        <button
                            type="submit"
                            disabled={isChatting}
                            className={clsx(
                                "absolute right-2 p-3 text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed",
                                "rounded-[var(--ai-radius)]",
                                "bg-[var(--ai-primary)] hover:bg-[var(--ai-primary-hover)]"
                            )}
                        >
                            {isChatting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                // FIX: Removed mix-blend-difference and force white (or background color)
                                // This ensures it contrasts against the primary button color
                                <Send className="w-6 h-6 text-[var(--ai-background)]" />
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-4 text-sm text-[var(--ai-text)]/60">
                    Try asking: "What are his strongest skills?" or "Does he have experience with React?"
                </p>

                {chatReply && (
                    <div className="mt-8 p-6 text-left shadow-lg animate-in zoom-in-95 duration-300 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[var(--ai-primary)]/20">
                        <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--ai-primary)] flex items-center justify-center font-bold text-sm text-[var(--ai-background)]">
                                AI
                            </div>
                            <div className="prose">
                                <Text variant="p" className="text-lg leading-relaxed text-[var(--ai-text)]">
                                    {chatReply}
                                </Text>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};