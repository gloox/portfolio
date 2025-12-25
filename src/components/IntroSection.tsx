import React from "react";
import { Section } from "@/components/basic/Section";
import { Text } from "@/components/basic/Text";
import { Typewriter } from "@/components/basic/TypeWriterAnimation";
import { ThemeGenerator } from "@/components/ThemeGenerator";

interface IntroSectionProps {
  onComplete: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  onComplete,
}) => {
  return (
    <Section
      className="min-h-screen flex flex-col justify-center px-20 max-w-full"
      id="home"
    >
      <div className="w-full max-w-3xl">
        <Text variant="h1">
          <Typewriter
            text={`Hi, this is Geet's portfolioLM`}
          />
        </Text>

        <Text variant="h3" className="mt-8">
          <Typewriter
            text="Describe a vibe or aesthetic you want this website to have:"
            delay={1}
          />
        </Text>

        <ThemeGenerator onSuccess={onComplete} />
      </div>
    </Section>
  );
};

export default IntroSection;
