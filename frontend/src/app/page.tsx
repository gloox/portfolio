"use client";

import React, { useEffect, useState } from 'react';
import { PortfolioData } from '@/types';
import IntroSection from '@/components/IntroSection';
import { HomeHeader } from '@/components/HomeHeader';
import { Text } from '@/components/basic/Text';
import { Typewriter } from '@/components/basic/TypeWriterAnimation';
import { Button } from '@/components/basic/Button';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import {EducationSection} from "@/components/EducationSection";
import PopIn from "@/components/basic/PopIn";

// NOTE: Ensure your .env.local file has this defined
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/portfolio`;

const PortfolioPage = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  // Stages: 'intro' | 'transition' | 'home'
  const [stage, setStage] = useState<'intro' | 'transition' | 'home'>('intro');

  // 1. Load Data & Check "Cookie" on Mount
  useEffect(() => {
    const init = async () => {
      // Check if user has already visited
      const hasVisited = localStorage.getItem('portfolio_intro_completed');
      if (hasVisited) {
        setStage('home');
      }

      // Fetch Data
      try {
        const response = await fetch(API_URL);
        const result: PortfolioData = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data", error);
        // Add fallback data handling here if needed
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // 2. Callback when Intro is "Done" (Theme selected)
  const handleIntroComplete = () => {
    // Move to transition stage (The fun text)
    setStage('transition');
  };

  // 3. Callback to finish Transition and go Home
  const finishTransition = () => {
    localStorage.setItem('portfolio_intro_completed', 'true');
    setStage('home');
  };

  if (loading || !data) return <div className="p-20 text-center">Loading...</div>;

  // --- VIEW 1: INTRO ---
  if (stage === 'intro') {
    return (
        <IntroSection
            personal={data.personal}
            onComplete={handleIntroComplete} // Pass this down to IntroSection
        />
    );
  }

  // --- VIEW 2: TRANSITION TEXT ---
  if (stage === 'transition') {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-1000">
          <div className="space-y-6">
            <Text variant="h2">
              <Typewriter
                  text={`Ok, that was fun. Fun fact: this is actually a website to try to get ${data.personal.firstName} hired.`}
                  delay={0.1}
              />
            </Text>
            <Text variant="h2" className="mt-4">
              <Typewriter
                  text="Now, here's another textbox. Ask it any questions about me. It'll answer mostly honestly, but let's be honest, it is AI."
                  delay={3.5} // Wait for first sentence to finish
              />
            </Text>
            <Text variant="h3" className="opacity-60 mt-4">
              <Typewriter
                  text="(And look around this website you've designed!)"
                  delay={8.0}
              />
            </Text>
          </div>


          <PopIn delay={10}>
            <Button onClick={finishTransition} >
              Let's Go
            </Button>
          </PopIn>

        </section>
    );
  }

  // --- VIEW 3: HOME ---
  return (
      <div

          className={`
            /* 1. APPLY THE BACKGROUND & TEXT COLORS HERE */
            bg-[var(--ai-background)] 
            text-[var(--ai-text)]
            
            /* 2. ENSURE IT COVERS THE FULL SCREEN */
            min-h-screen
            
            /* 3. SMOOTH TRANSITION */
            transition-colors duration-500
        `}
      >
        <HomeHeader personal={data.personal} education={data.education}/>

        {/* Pass data to the new sections */}
        {data.education && <EducationSection education={data.education} />}

        <ExperienceSection experiences={data.experience} />
        <ProjectsSection projects={data.projects} />
        <SkillsSection
            skills={data.skills}
            extracurricular={data.extracurricular}
        />
      </div>
  );
};

export default PortfolioPage;