// src/components/IntroSection.tsx
import React from 'react';
import { Personal } from '@/types';
import { Section } from "@/components/basic/Section";
import { Text } from "@/components/basic/Text";
import { Typewriter } from "@/components/basic/TypeWriterAnimation";
import { ThemeGenerator } from "@/components/ThemeGenerator"; // Import it

interface IntroSectionProps {
    personal: Personal;
    onComplete: () => void; // <--- The function from PortfolioPage
}

const IntroSection: React.FC<IntroSectionProps> = ({ personal, onComplete }) => {
    return (
        <Section className="min-h-screen flex flex-col justify-center px-20" id="home">
            <div className="w-full max-w-3xl">
                <Text variant="h1">
                    <Typewriter text={`Hi, this is ${personal.firstName}'s portfolioLM`} />
                </Text>

                <Text variant="h3" className="mt-4">
                    <Typewriter
                        text="Enter what you want this webstite to look like."
                        delay={1}
                    />
                </Text>

                {/* Here is the logic:
                   User types "Cyberpunk" -> Context updates CSS -> ThemeGenerator calls onComplete -> Page switches
                */}
                <ThemeGenerator onSuccess={onComplete} />
            </div>
        </Section>
    );
};

export default IntroSection;