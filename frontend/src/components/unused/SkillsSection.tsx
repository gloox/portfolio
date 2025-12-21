import React from 'react';

const SkillsSection = () => {
    // This list is static in your original code, but could be passed via props too
    const skills = ['React', 'Next.js', 'Tailwind CSS', 'FastAPI', 'Python', 'TypeScript', 'SQL', 'Cloud Services'];

    return (
        <section id="skills" className="py-20 min-h-screen bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
                Skills
            </h2>
            <div className="flex flex-wrap gap-3">
                {skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-sm font-medium shadow-md">
            {skill}
          </span>
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;