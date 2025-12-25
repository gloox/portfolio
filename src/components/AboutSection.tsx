import React from "react";
import { Section } from "./basic/Section";
import { Text } from "./basic/Text";
import { Mail} from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";
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
        <Text variant="p" className="mb-10 text-(--ai-text)/70">
          Give me a shout! I'm super interested in basically everything so I don't think you'll be disappointed.
        </Text>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`mailto:${personal.email}`}>
            <Button className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Me
            </Button>
          </a>
          <div className="flex gap-4">
            <Button
              href={personal.linkedin}
              target="_blank"
            >
              <SiLinkedin className="w-6 h-6" />
            </Button>
            <Button
              href={personal.github} 
              target="_blank" 
            >
              <SiGithub className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};
