"use client";

import React, { useEffect, useState } from "react";
import { PortfolioData } from "@/types";
import IntroSection from "@/components/IntroSection";
import { HomeSection } from "@/components/HomeSection";
import { Text } from "@/components/basic/Text";
import { Typewriter } from "@/components/basic/TypeWriterAnimation";
import { Button } from "@/components/basic/Button";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { EducationSection } from "@/components/EducationSection";
import PopIn from "@/components/basic/PopIn";
import { Section } from "@/components/basic/Section";
import NavBar from "@/components/NavBar";
import { PersonalSection } from "@/components/PersonalSection";
import { AboutSection } from "@/components/AboutSection";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/portfolio`;

const PortfolioPage = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<"intro" | "transition" | "home">("intro");

  useEffect(() => {
    const init = async () => {
      const hasVisited = localStorage.getItem("portfolio_intro_completed");
      if (hasVisited) {
        setStage("home");
      } else {
        setLoading(false);
      }

      // Fetch Data
      try {
        const response = await fetch("/api/portfolio");
        const result: PortfolioData = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleIntroComplete = () => {
    setStage("transition");
  };

  const finishTransition = () => {
    localStorage.setItem("portfolio_intro_completed", "true");
    setStage("home");
  };

  if (loading || !data)
    return <div className="p-20 text-center">Loading...</div>;

  if (stage === "intro") {
    return (
      <IntroSection personal={data.personal} onComplete={handleIntroComplete} />
    );
  }

  if (stage === "transition") {
    return (
      <div
        className={`
            bg-[var(--ai-background)]
            transition-colors duration-500
        `}
      >
        <Section className="min-h-screen flex flex-col justify-center items-center px-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-1000">
          <div className="space-y-6">
            <Text variant="h2">
              <Typewriter
                text={`Ok, that was fun. Fun fact: this is actually a website to try to get me hired.`}
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
            <Button onClick={finishTransition}>Let's Go</Button>
          </PopIn>
        </Section>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <div
        className={`
            bg-[var(--ai-background)]
            transition-colors duration-500
        `}
      >


        <HomeSection personal={data.personal} education={data.education} />
        <ProjectsSection projects={data.projects} />
        <PersonalSection interests={data.personal.interests} />
        <ExperienceSection experiences={data.experience} />
        <SkillsSection
            skills={data.skills}
            extracurricular={data.extracurricular}
        />
        <EducationSection education={data.education} />
        <AboutSection personal={data.personal} />
      </div>
    </>
  );
};

export default PortfolioPage;
