import React from 'react';

// You can add a specific interface for Projects later
interface ProjectsSectionProps {
    projects: any[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
    return (
        <section id="projects" className="py-20 min-h-screen bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
                Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Ideally map through props.projects here. Keeping static logic for now per your original code. */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        Project Title 1
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        A brief description of a major computer science project. This will eventually be replaced by dynamic data from your FastAPI backend.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        Project Title 2
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Another project demonstrating skills in a key area, such as machine learning or distributed systems.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;