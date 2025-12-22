import React from 'react';
import { Personal } from '@/types';
import { Section } from "@/components/basic/Section";
import { Text } from "@/components/basic/Text";
import { Typewriter } from "@/components/basic/TypeWriterAnimation";
import { ThemeGenerator } from "@/components/ThemeGenerator";

interface IntroSectionProps {
    personal: Personal;
    onComplete: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ personal, onComplete }) => {
    return (
        <Section className="min-h-screen flex flex-col justify-center px-20 max-w-full" id="home">
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

                <ThemeGenerator onSuccess={onComplete} />
            </div>
        </Section>
    );
};

export default IntroSection;