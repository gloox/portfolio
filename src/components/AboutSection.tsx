import React from "react";
import { Section } from "./basic/Section";
import { Text } from "./basic/Text";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "./basic/Button";

interface AboutSectionProps {
  personal: {
    firstName: string;
    email: string;
    linkedin: string;
    github: string;
  };
}

export const AboutSection = ({ personal }: AboutSectionProps) => {
  return (
    <Section id="about" className="py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <Text variant="h2" className="mb-6">Talk to me!</Text>
        <Text variant="p" className="mb-10 text-[var(--ai-text)]/70">
          I'm always open to discussing new projects, ideas, and opportunities. Just give me a shout!
        </Text>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`mailto:${personal.email}`}>
            <Button className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Me
            </Button>
          </a>
          <div className="flex gap-4">
            <a 
              href={personal.linkedin} 
              target="_blank" 
              className="p-3 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[var(--ai-text)]/10 hover:text-[var(--ai-primary)] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href={personal.github} 
              target="_blank" 
              className="p-3 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[var(--ai-text)]/10 hover:text-[var(--ai-primary)] transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};
