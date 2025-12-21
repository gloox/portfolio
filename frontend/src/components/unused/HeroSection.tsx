import React from 'react';
import { Personal } from '@/types';

interface HeroSectionProps {
    personal: Personal;
}

const HeroSection: React.FC<HeroSectionProps> = ({ personal }) => {
    return (
        <section id="home" className="py-20 min-h-[80vh] flex items-center bg-gray-50 dark:bg-gray-950">
            <div className="w-full">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                    Hello, I'm {personal.firstName || 'Geet Loomba'}
                </h1>
                <p className="text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400 font-light mb-8">
                    {personal.title || 'Computer Science Honours Student'}
                </p>
                <div className="flex space-x-4">
                    <a href="#projects" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition transform hover:scale-105">
                        View Projects
                    </a>
                    <a href="#experience" className="px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition transform hover:scale-105">
                        My Experience
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;