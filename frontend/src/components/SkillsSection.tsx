import React from 'react';
import { Skills, Extracurricular } from '@/types';
import { Section } from './basic/Section';
import { Text } from './basic/Text';
import { Trophy, Wrench } from 'lucide-react';

interface SkillsSectionProps {
    skills: Skills;
    extracurricular: Extracurricular[];
}

export const SkillsSection = ({ skills, extracurricular }: SkillsSectionProps) => {

    // Helper to format category names (e.g. "developmentTools" -> "Development Tools")
    const formatKey = (key: string) => key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());

    return (
        <Section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12" id="skills">

            {/* COLUMN 1: SKILLS */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Wrench className="w-8 h-8 text-[var(--ai-primary)]" />
                    <Text variant="h2">Technical Skills</Text>
                </div>

                <div className="space-y-8">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category}>
                            <h3 className="text-lg font-bold mb-3 text-[var(--ai-text)]/80">
                                {formatKey(category)}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {(items as string[]).map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 text-sm rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[length:var(--ai-border-width)] border-[var(--ai-text)]/20"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COLUMN 2: EXTRACURRICULAR */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Trophy className="w-8 h-8 text-[var(--ai-primary)]" />
                    <Text variant="h2">Extracurriculars</Text>
                </div>

                <div className="space-y-6">
                    {extracurricular.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-[var(--ai-radius)] bg-[var(--ai-surface)]/50 border border-[length:var(--ai-border-width)] border-[var(--ai-primary)]/30"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-[var(--ai-primary)]">
                                    {item.activity}
                                </h3>
                                <span className="text-xs text-[var(--ai-text)]/60 whitespace-nowrap ml-4">
                                    {item.date}
                                </span>
                            </div>
                            <p className="text-sm font-medium opacity-80 mb-2">{item.organization}</p>
                            <p className="text-sm opacity-70 leading-relaxed">
                                {item.details}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </Section>
    );
};