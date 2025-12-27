import React from "react";
import { Skills, Extracurricular } from "@/types";
import { Section } from "./basic/Section";
import { Text } from "./basic/Text";
import { Code2 } from "lucide-react";
import { SectionTitle } from "@/components/basic/SectionTitle";
import { Card } from "@/components/basic/Card";
import { Bubble } from "./basic/Bubble";

interface SkillsSectionProps {
  skills: Skills;
  extracurricular: Extracurricular[];
}

export const SkillsSection = ({
  skills,
  extracurricular,
}: SkillsSectionProps) => {
  // Helper to format category names (e.g. "developmentTools" -> "Development Tools")
  const formatKey = (key: string) =>
    key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <Section className="grid grid-cols-1 lg:grid-cols-2 gap-12" id="skills">
      <div>
        <SectionTitle>Skills</SectionTitle>

        <div className="space-y-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <Text variant={"h4"} className="mb-3 text-(--ai-text)/80">
                {formatKey(category)}
              </Text>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map((skill, i) => (
                  <Bubble className="text-sm">{skill}</Bubble>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Extracurriculars</SectionTitle>

        <div className="space-y-6">
          {extracurricular.map((event, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-5 h-5 text-(--ai-primary)" />
                <Text variant="h3" className="text-xl">
                  {event.activity}
                </Text>
              </div>

              <Text
                variant="p"
                className="text-sm text-(--ai-text)/60 mb-4 italic"
              >
                {event.date}
              </Text>

              <Text variant="p" className="grow text-sm mb-6">
                {event.details}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};
