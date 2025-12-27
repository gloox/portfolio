import React from "react";
import { Project } from "@/types";
import { Section } from "./basic/Section";
import { Text } from "./basic/Text";
import { Code2 } from "lucide-react";
import { SectionTitle } from "@/components/basic/SectionTitle";
import { Card } from "@/components/basic/Card";
import { Bubble } from "@/components/basic/Bubble";

export const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  return (
    <Section id="projects">
      <SectionTitle>Projects</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-5 h-5 text-(--ai-primary)" />
              <Text variant="h3" className="text-xl">
                {project.name}
              </Text>
            </div>

            <Text
              variant="p"
              className="text-sm text-(--ai-text)/60 mb-4 italic"
            >
              {project.role} • {project.dates}
            </Text>

            <Text variant="p" className="grow text-sm mb-6">
              {project.description}
            </Text>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, i) => (
                <Bubble key={i} className="text-xs">
                  {tech}
                </Bubble>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};
