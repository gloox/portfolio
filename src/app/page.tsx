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

  if (loading || !data)
    return <div className="p-20 text-center">Loading...</div>;


  return (
    <>
      <NavBar />

      <div
        className={`
            bg-(--ai-background)
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
