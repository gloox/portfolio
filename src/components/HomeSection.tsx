"use client";

import React, { useState } from "react";
import { Personal, Education } from "@/types";
import { Text } from "./basic/Text";
import { Typewriter } from "./basic/TypeWriterAnimation";
import { Send } from "lucide-react";
import clsx from "clsx";
import { Section } from "@/components/basic/Section";
import { Button } from "@/components/basic/Button";

interface HomeHeaderProps {
  personal: Personal;
  education: Education;
}

export const HomeSection: React.FC<HomeHeaderProps> = ({
  personal,
  education,
}) => {
  const [question, setQuestion] = useState("");
  const [chatReply, setChatReply] = useState("");
  const [isChatting, setIsChatting] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    setIsChatting(true);
    setChatReply("");

    try {
      const res = await fetch(`/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
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
    <Section
      id="home"
      className="pt-20 flex flex-col justify-center items-center text-center gap-10"
    >
      <div className="space-y-6">
        <Text variant="h1">
          <Typewriter
            text={`Hi hi, I'm Geet Loomba.`}
            delay={0.1}
          />
        </Text>
        <Text variant="h3" className="opacity-80 max-w-2xl">
          {personal.title} from {education.institution} {personal.location}.{" "}
          <br />
        </Text>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <div className="bg-[var(--ai-surface)]/50 backdrop-blur-md p-1 rounded-[var(--ai-radius)] shadow-xl border border-[var(--ai-text)]/10 ring-4 ring-[var(--ai-text)]/5">
          <form
            onSubmit={handleChatSubmit}
            className="relative flex items-center"
          >
            <input
              className="w-full h-16 pl-6 pr-16 rounded-[calc(var(--ai-radius)-4px)] bg-transparent text-xl sm:text-2xl text-[var(--ai-text)] placeholder-[var(--ai-text)]/40 focus:outline-none font-[family-name:var(--ai-font)]"
              placeholder={`Ask anything about me!`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isChatting}
            />
            <Button
              type="submit"
              disabled={isChatting}
              className={clsx("absolute right-2 p-3 disabled:opacity-50")}
            >
              {isChatting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-6 h-6 text-[var(--ai-background)]" />
              )}
            </Button>
          </form>
        </div>

        <p className="mt-4 text-sm text-[var(--ai-text)]/60">
          Try asking: "What are his strongest skills?" or "Does he have
          experience with React?"
        </p>

        {chatReply && (
          <div className="mt-8 p-6 text-left shadow-lg animate-in zoom-in-95 duration-300 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[var(--ai-primary)]/20">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--ai-primary)] flex items-center justify-center font-bold text-sm text-[var(--ai-background)]">
                AI
              </div>
              <div className="prose">
                <Text
                  variant="p"
                  className="text-lg leading-relaxed text-[var(--ai-text)]"
                >
                  {chatReply}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};
