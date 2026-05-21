"use client";

import React, { useEffect, useState} from "react";
import { PortfolioData } from "@/types";
import {Typewriter} from "@/components/basic/TypeWriterAnimation";

const PortfolioPage = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {

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
      <div className="grid grid-cols-[20rem_1fr]">
        <div className="border-r-2 border-gray-300 p-4">
          <img
              src="/pfp.JPG"
              alt="Company Logo"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-6xl font-extrabold tracking-tight">
            <Typewriter text={`Geet`} delay={0.2} />
          </h1>
          <h1 className="text-6xl font-extrabold tracking-tight">
            <Typewriter text={`Loomba`} delay={0.3} />
          </h1>
          <h4 className="text-xl font-extrabold tracking-tight">
            CS student at University of Manitoba
          </h4>
          <div className="flex gap-2">
            <a
                className="text-blue-500 hover:underline"
                href={  `/resume.pdf`} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a
                className="text-blue-500 hover:underline"
                href={`https://www.linkedin.com/in/geet-loomba-a197bb2a1/`}
            >
              LinkedIn
            </a>
            <a
                className="text-blue-500 hover:underline"
                href={`https://github.com/gloox`}
            >
              Github
            </a>

          </div>

          </div>

        <div className=" p-4 max-w-4xl ml-8">
          <div className="mb-8 mt-10">
            <h3 className="mb-2 text-2xl font-semibold tracking-tight">
              About Me
            </h3>
            <p className="text-base">
              {data.personal.summary}
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight ">
              Experience
            </h3>
            <div>
              {data.experience.map((exp, i) => (
                      <div key={i} className="mb-8 border-2 border-gray-200 rounded-2xl p-4">
                        <div className="flex flex-col mb-5">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-extrabold tracking-tight">
                              {exp.company}
                            </h3>
                            <p className="tracking-tight text-sm">
                              {exp.role}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="tracking-tight text-sm">
                              {exp.dates}
                            </p>
                            <p className="tracking-tight text-sm">
                              {exp.location}
                            </p>
                          </div>
                        </div>
                        <ul className="list-disc space-y-2 pl-5">

                        {exp.bullets.map((bullet, j) =>
                        <li key={j} className="">
                          <p className="tracking-tight">
                            {bullet}
                          </p>
                        </li>

                          )
                        }

                      </ul>




            </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default PortfolioPage;
