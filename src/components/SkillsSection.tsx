import React from 'react';
import { Skills, Extracurricular } from '@/types';
import { Section } from './basic/Section';
import { Text } from './basic/Text';
import {Code2, Trophy, Wrench} from 'lucide-react';

interface SkillsSectionProps {
    skills: Skills;
    extracurricular: Extracurricular[];
}

export const SkillsSection = ({ skills, extracurricular }: SkillsSectionProps) => {

    // Helper to format category names (e.g. "developmentTools" -> "Development Tools")
    const formatKey = (key: string) => key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());

    return (
        <Section className="grid grid-cols-1 lg:grid-cols-2 gap-12" id="skills">

            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Wrench className="w-8 h-8 text-[var(--ai-primary)]" />
                    <Text variant="h2">Technical Skills</Text>
                </div>

                <div className="space-y-8">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category}>
                            <Text variant={"h4"} className="mb-3 text-[var(--ai-text)]/80">
                                {formatKey(category)}
                            </Text>
                            <div className="flex flex-wrap gap-2">
                                {(items as string[]).map((skill, i) => (
                                    <Text key={"text-"+skill} variant={"h4"} className="px-3 py-1.5 text-sm rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[length:var(--ai-border-width)] border-[var(--ai-text)]/20">
                                        {skill}
                                    </Text>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Trophy className="w-8 h-8 text-[var(--ai-primary)]" />
                    <Text variant="h2">Extracurriculars</Text>
                </div>

                <div className="space-y-6">

                    {extracurricular.map((event, index) => (
                        <div
                            key={index}
                            className="flex flex-col h-full p-6 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[length:var(--ai-border-width)] border-[var(--ai-text)]/10 hover:border-[var(--ai-primary)]/50 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Code2 className="w-5 h-5 text-[var(--ai-primary)]" />
                                <Text variant="h3" className="text-xl">
                                    {event.activity}
                                </Text>
                            </div>

                            <p className="text-sm text-[var(--ai-text)]/60 mb-4 italic">
                                {event.date}
                            </p>

                            <Text variant="p" className="flex-grow text-sm mb-6">
                                {event.details}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};