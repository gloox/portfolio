import React from 'react';
import { Education } from '@/types';
import { Section } from './basic/Section';
import { Text } from './basic/Text';
import { GraduationCap, Award } from 'lucide-react';

export const EducationSection = ({ education }: { education: Education[] }) => {
    return (
        <Section id="education">
            <div className="mb-12">
                <Text variant="h2" className="text-[var(--ai-primary)] mb-2">
                    Education
                </Text>
                <div className="h-1 w-20 bg-[var(--ai-text)]/20 rounded-full" />
            </div>

            <div className="space-y-8">
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="p-8 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[length:var(--ai-border-width)] border-[var(--ai-primary)]/20 shadow-sm"
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <GraduationCap className="w-6 h-6 text-[var(--ai-primary)]" />
                                    <Text variant="h3" className="text-[var(--ai-text)]">
                                        {edu.institution}
                                    </Text>
                                </div>
                                <Text variant="h4" className="text-[var(--ai-primary)] font-medium text-lg">
                                    {edu.degree}
                                </Text>
                            </div>

                            <div className="text-right text-[var(--ai-text)]/70 font-[family-name:var(--ai-font)]">
                                <p className="text-sm font-semibold">{edu.startDate} – {edu.endDate}</p>
                                <p className="text-sm mt-1">GPA: <span className="text-[var(--ai-primary)]">{edu.gpa}</span></p>
                            </div>
                        </div>

                        {/* Highlights / Awards */}
                        <div className="bg-[var(--ai-background)]/50 p-4 rounded-[calc(var(--ai-radius)/2)] border border-[var(--ai-text)]/5">
                            <h4 className="flex items-center gap-2 font-bold text-sm text-[var(--ai-text)]/80 mb-3">
                                <Award className="w-4 h-4" />
                                Honours & Awards
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {edu.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--ai-text)]/70">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--ai-primary)]" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};