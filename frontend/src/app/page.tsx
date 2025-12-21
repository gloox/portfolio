"use client";

import React, { useEffect, useState } from 'react';
import { PortfolioData } from '@/types';
import IntroSection from '@/components/IntroSection';
import ExperienceSection from '@/components/unused/ExperienceSection';
import ProjectsSection from '@/components/unused/ProjectsSection';
import SkillsSection from '@/components/unused/SkillsSection';

// NOTE: Ensure your .env.local file has this defined
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/portfolio`;

const PortfolioPage = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from:", API_URL);
        const response = await fetch(API_URL);

        if (!response.ok) {
          // Optional: handle HTTP errors specific logic
        }

        const result: PortfolioData = await response.json();
        setData(result);

        console.log(result)
      } catch (error) {
        console.error("Error fetching data. Is the FastAPI backend running on port 8000?", error);

        // Set placeholder data on error so the UI still renders
        setData({
          error: "Failed to load data. Please ensure the backend server is running.",
          personal: { firstName: '', title: '', email: '', phone: '' },
          experience: [],
          projects: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasError = data && data.error;

  // 1. Loading State
  if (loading) return (
      <div className="p-16 text-center text-xl text-indigo-500 font-semibold bg-white dark:bg-gray-950">
        Loading portfolio data...
      </div>
  );

  // 2. Error State (Backend Down)
  if (hasError) return (
      <div className="p-16 text-center text-xl text-red-600 font-bold bg-white dark:bg-gray-950">
        {data.error}
      </div>
  );

  // 3. Safety check
  if (!data) return null;

  return (
      // className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      <main >
        <IntroSection personal={data.personal} />
        {/*<HeaderSection experiences={data.personal} />*/}
        {/*<ExperienceSection experiences={data.experience} />*/}
        {/*<ProjectsSection projects={data.projects} />*/}
        {/*<SkillsSection />*/}
      </main>
  );
};

export default PortfolioPage;