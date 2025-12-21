import React from 'react';
import { Experience } from '@/types';

interface ExperienceSectionProps {
    experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
    return (
        <section id="experience" className="py-20 min-h-screen bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
                Experience
            </h2>
            <div className="space-y-8">
                {/* We map over the experiences, falling back to placeholders if empty/undefined */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                        {experiences[0]?.company || 'Placeholder Company'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {experiences[0]?.title || 'Software Developer Intern'} | {experiences[0]?.years || '2023 - 2024'}
                    </p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {experiences[0]?.description || 'A detailed description of key responsibilities and achievements will go here once the backend is fully connected.'}
                    </p>
                </div>
                {/* Aesthetic timeline line */}
                <div className="h-64 border-l-2 border-indigo-200 dark:border-indigo-700 ml-3"></div>
            </div>
        </section>
    );
};

export default ExperienceSection;