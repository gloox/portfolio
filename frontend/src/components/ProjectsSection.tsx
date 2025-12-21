import React from 'react';
import { Project } from '@/types';
import { Section } from './basic/Section';
import { Text } from './basic/Text';
import { Code2 } from 'lucide-react';

export const ProjectsSection = ({ projects }: { projects: Project[] }) => {
    return (
        <Section className="py-20 px-6 max-w-6xl mx-auto" id="projects">
            <div className="mb-12">
                <Text variant="h2" className="text-[var(--ai-primary)] mb-2">
                    Projects
                </Text>
                <div className="h-1 w-20 bg-[var(--ai-text)]/20 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="flex flex-col h-full p-6 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[length:var(--ai-border-width)] border-[var(--ai-text)]/10 hover:border-[var(--ai-primary)]/50 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Code2 className="w-5 h-5 text-[var(--ai-primary)]" />
                            <Text variant="h3" className="text-xl">
                                {project.name}
                            </Text>
                        </div>

                        <p className="text-sm text-[var(--ai-text)]/60 mb-4 italic">
                            {project.role} • {project.dates}
                        </p>

                        <Text variant="p" className="flex-grow text-sm mb-6">
                            {project.description}
                        </Text>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-xs font-medium rounded-[calc(var(--ai-radius)/2)] bg-[var(--ai-primary)]/10 text-[var(--ai-primary)] border border-[length:var(--ai-border-width)] border-[var(--ai-primary)]/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};