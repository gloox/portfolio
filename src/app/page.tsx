"use client";

import React, { useEffect, useState } from "react";
import { PortfolioData } from "@/types";
import { Typewriter } from "@/components/TypeWriterAnimation";
import {Link} from "@/components/Link";
import {Section} from "@/components/Section"

const PortfolioPage = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch("/portfolio_data.json");
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
    return (
      <div className="p-20 text-center text-sm text-neutral-400">
        Loading...
      </div>
    );

  return (
    <div className="bg-[#fcfbf9] text-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-[19rem_1fr] gap-10 p-16">
        {/* Name and Contact Info */}
        <div>
          <img
            src="/pfp.JPG"
            alt="Geet Loomba"
            className=" w-32 rounded-full mx-auto"
          />

          <div className="mb-4">
            <h1 className="text-4xl font-black tracking-tighter ">
              <Typewriter text={`GEET`} delay={0.2} />
            </h1>
            <h1 className="text-4xl font-black tracking-tighter">
              <Typewriter text={`LOOMBA`} delay={0.3} />
            </h1>
          </div>

          <div className="text-sm mb-6">
            <p className="tracking-tight text-neutral-600">
              {data.personal.title}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-2 text-sm ">
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            label="Resume"
              />
            <span>/</span>
            <Link
              href="https://www.linkedin.com/in/geet-loomba-a197bb2a1/"
              target="_blank"
              rel="noreferrer"
              label="LinkedIn"
              />
            <span>/</span>
            <Link
              href="https://github.com/gloox"
              target="_blank"
              rel="noreferrer"
              label="GitHub"
            />
            <span>/</span>
            <Link
              href={`mailto:${data.personal.email}`}
              label="Email"
            />
          </nav>
        </div>

        {/*content*/}
        <div className="space-y-16 max-w-3xl">

          <Section header="Projects">
            <div className="space-y-12">
              {data.projects.map((project, i) => (
                  <div
                      key={i}
                      className="border-b border-neutral-200 pb-8 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold tracking-tight">
                        {project.name}
                      </h3>
                      <span className="text-xs text-neutral-400">
                      {project.dates}
                    </span>
                    </div>

                    <div className="text-xs text-neutral-500 mb-3">
                      {project.role}
                    </div>

                    <p className="text-sm text-neutral-600 mb-4">
                      {project.description}
                    </p>

                    <ul className="space-y-2.5 text-sm text-neutral-700 mb-4">
                      {project.bullets.map((bullet, j) => (
                          <li key={j} className="flex">
                            <span className="text-neutral-300 mr-3">→</span>
                            <span>{bullet}</span>
                          </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="text-xs text-neutral-500 font-medium">
                        <span>Tech: {project.technologies.join(", ")}</span>
                      </div>

                      <div className="flex gap-2">
                        {project.name.includes("CO-APP") && (
                            <a
                                href="https://github.com/Co-App-Team"
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs border border-neutral-950 px-2.5 py-1 bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                            >
                              Repository ↗
                            </a>
                        )}
                        {project.name.includes("Crabby Game") && (
                            <a
                                href="https://lukesteski.itch.io/crabby-game"
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs border border-neutral-950 px-2.5 py-1 bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                            >
                              Play Game ↗
                            </a>
                        )}
                      </div>
                    </div>
                  </div>
              ))}

              <div className="pt-4 hidden lg:block">
                <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 ">
                  Playable Games (Very Old)
                </span>
                <div className="flex gap-3">
                  <a
                      href="/goto2048/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs border border-neutral-300 hover:border-neutral-950 px-3 py-1.5 bg-white text-neutral-700 transition-colors"
                  >
                    Launch GOTO 2048 🕹️
                  </a>
                  <a
                      href="/pixelChess/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs border border-neutral-300 hover:border-neutral-950 px-3 py-1.5 bg-white text-neutral-700 transition-colors"
                  >
                    Play Pixel Chess ♟️
                  </a>
                </div>
              </div>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;






{/*<Section header="Overview" className={"pt-2"}>*/}
{/*  <p className="text-sm">{data.personal.summary}</p>*/}
{/*</Section>*/}

{/*<Section header="Experience" >*/}
{/*  <div className="space-y-12">*/}
{/*    {data.experience.map((exp, i) => (*/}
{/*        <div*/}
{/*            key={i}*/}
{/*            className="border-b border-neutral-200 pb-8 last:border-0 last:pb-0"*/}
{/*        >*/}
{/*          <div className="flex justify-between items-baseline mb-1">*/}
{/*            <h3 className="text-base font-bold tracking-tight">*/}
{/*              {exp.company}*/}
{/*            </h3>*/}
{/*            <span className="text-xs text-neutral-400">*/}
{/*            {exp.dates}*/}
{/*          </span>*/}
{/*          </div>*/}

{/*          <div className="flex justify-between text-xs text-neutral-500 mb-4">*/}
{/*          <span className="text-neutral-800 font-medium">*/}
{/*            {exp.role}*/}
{/*          </span>*/}
{/*            <span>{exp.location}</span>*/}
{/*          </div>*/}

{/*          <ul className="space-y-2.5 text-sm text-neutral-700">*/}
{/*            {exp.bullets.map((bullet, j) => (*/}
{/*                <li key={j} className="flex">*/}
{/*                  <span className="text-neutral-300 mr-3">→</span>*/}
{/*                  <span>{bullet}</span>*/}
{/*                </li>*/}
{/*            ))}*/}
{/*          </ul>*/}
{/*        </div>*/}
{/*    ))}*/}
{/*  </div>*/}
{/*</Section>*/}



{/*<Section header="Education">*/}
{/*  <div className="space-y-4">*/}
{/*    {data.education.map((edu, i) => (*/}
{/*        <div key={i} className="space-y-1">*/}
{/*          <div className="flex justify-between items-baseline">*/}
{/*            <h3 className="text-base font-bold tracking-tight">*/}
{/*              {edu.institution}*/}
{/*            </h3>*/}
{/*            <span className="text-xs text-neutral-400">*/}
{/*            {edu.startDate} – {edu.endDate}*/}
{/*          </span>*/}
{/*          </div>*/}
{/*          <div className="text-xs text-neutral-500">*/}
{/*            {edu.degree} •{" "}*/}
{/*            <span className="text-neutral-800 font-bold">*/}
{/*            GPA: {edu.gpa}*/}
{/*          </span>*/}
{/*          </div>*/}
{/*          <div className="pt-1 space-y-1">*/}
{/*            {edu.highlights.map((high, idx) => (*/}
{/*                <div*/}
{/*                    key={idx}*/}
{/*                    className="text-sm text-neutral-600 flex items-start"*/}
{/*                >*/}
{/*              <span className="text-neutral-300 mr-2 select-none">*/}
{/*                •*/}
{/*              </span>*/}
{/*                  <span>{high}</span>*/}
{/*                </div>*/}
{/*            ))}*/}
{/*          </div>*/}
{/*        </div>*/}
{/*    ))}*/}
{/*  </div>*/}
{/*</Section>*/}


{/*<Section header="Toolkit">*/}
{/*  <div className="space-y-3 text-sm text-neutral-800">*/}
{/*    /!* pl-28 matching w-28 with a negative indent keeps overflow text beautifully aligned under the starting text line *!/*/}
{/*    <div className="pl-28 -indent-28">*/}
{/*      <span className="text-neutral-400 inline-block w-28 text-xs font-bold uppercase tracking-wider indent-0">*/}
{/*        Languages*/}
{/*      </span>*/}
{/*      <span>{data.skills.languages.join(", ")}</span>*/}
{/*    </div>*/}
{/*    <div className="pl-28 -indent-28">*/}
{/*      <span className="text-neutral-400 inline-block w-28 text-xs font-bold uppercase tracking-wider indent-0">*/}
{/*        Frameworks*/}
{/*      </span>*/}
{/*      <span>{data.skills.librariesFrameworks.join(", ")}</span>*/}
{/*    </div>*/}
{/*    <div className="pl-28 -indent-28">*/}
{/*      <span className="text-neutral-400 inline-block w-28 text-xs font-bold uppercase tracking-wider indent-0">*/}
{/*        Tools*/}
{/*      </span>*/}
{/*      <span>{data.skills.developmentTools.join(", ")}</span>*/}
{/*    </div>*/}
{/*  </div>*/}
{/*</Section>*/}

{/*<Section header="Interests">*/}
{/*  <div className="grid grid-cols-2 gap-12 text-sm">*/}
{/*    <div>*/}
{/*      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">*/}
{/*        Reading*/}
{/*      </h4>*/}
{/*      <ul className="space-y-1 text-neutral-700">*/}
{/*        {data.personal.interests.books.map((book, idx) => (*/}
{/*            <li key={idx}>— {book}</li>*/}
{/*        ))}*/}
{/*      </ul>*/}
{/*    </div>*/}
{/*    <div>*/}
{/*      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">*/}
{/*        Pursuits*/}
{/*      </h4>*/}
{/*      <p className="text-neutral-700 capitalize">*/}
{/*        {data.personal.interests.hobbies.join(", ")}*/}
{/*      </p>*/}
{/*    </div>*/}
{/*  </div>*/}

{/*</Section>*/}