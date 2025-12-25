import React from "react";
import { Experience } from "@/types";
import { Section } from "./basic/Section";
import { Text } from "./basic/Text";
import { Calendar, MapPin } from "lucide-react";
import {SectionTitle} from "@/components/basic/SectionTitle";

export const ExperienceSection = ({
  experiences,
}: {
  experiences: Experience[];
}) => {
  return (
    <Section id="experience">
        <SectionTitle>Experience</SectionTitle>

      <div className="space-y-8">
        {experiences.map((job, index) => (
          <div
            key={index}
            className="p-8 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[var(--ai-primary)]/20 transition-transform hover:border-[var(--ai-primary)]/50  hover:-translate-y-1 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <Text variant="h3" className="text-[var(--ai-text)]">
                  {job.role}
                </Text>
                <Text
                  variant="h4"
                  className="text-[var(--ai-primary)] font-medium"
                >
                  {job.company}
                </Text>
              </div>

              <div className="flex flex-col gap-1 text-sm text-[var(--ai-text)]/60 font-[family-name:var(--ai-font)]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{job.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>

            <Text variant="p" className="mb-4 opacity-90">
              {job.description}
            </Text>

            <ul className="list-disc pl-5 space-y-2 marker:text-[var(--ai-primary)]">
              {job.bullets.map(
                (bullet, i) =>
                  bullet && (
                    <li
                      key={i}
                      className="text-[var(--ai-text)]/80 text-sm leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};
