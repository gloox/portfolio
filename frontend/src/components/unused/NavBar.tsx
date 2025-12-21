import React from 'react';
import { Home, Briefcase, Code, Sparkles } from 'lucide-react';
import clsx from 'clsx'; // 👈 You'll need to install this: npm install clsx

// --- Base Styles: These define the structure, positioning, and transitions ---
const BASE_NAV_CLASSES = clsx(
    // Positioning and Z-Index
    'sticky top-0 z-50',

    // Layout and Sizing
    'h-16 flex justify-between items-center',

    // Transitions and Effects (Part of the component's structure)
    'backdrop-blur-sm transition-colors duration-300'
);

// --- Aesthetic Variant Styles: These define the look (colors, shadows, borders) ---
const THEME_VARIANT_CLASSES = clsx(
    // Light Mode Appearance
    'bg-white/95 shadow-xl border-b border-gray-100',

    // Dark Mode Appearance
    'dark:bg-gray-900/95 dark:border-gray-800'
);

// --- Navigation Data (unchanged) ---
const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Skills', href: '#skills', icon: Sparkles },
];

const NavBar = () => {
    return (
        // 1. Combine BASE_NAV_CLASSES and THEME_VARIANT_CLASSES
        <nav className={clsx(BASE_NAV_CLASSES, THEME_VARIANT_CLASSES)}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">

                {/* Branding - Color is still aesthetic, so it stays here for now */}
                {/*<a*/}
                {/*    href="#home"*/}
                {/*    className="text-xl font-extrabold tracking-wide transition transform hover:scale-105 duration-200*/}
                {/*               text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"*/}
                {/*>*/}
                {/*    Home*/}
                {/*</a>*/}

                {/* Navigation Links (Desktop) - Separating base from theme */}
                <div className="hidden sm:flex space-x-6">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-2 font-medium transition duration-150 p-2 rounded-lg
                                       text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button (Placeholder) */}
                <div className="sm:hidden">
                    <button
                        className="p-2 rounded-full transition
                                   text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        {/* Standard Hamburger Icon */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;