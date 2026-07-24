"use client";
import { motion, useAnimate, stagger } from "framer-motion";
import { useEffect } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
}

export const Typewriter = ({ text, delay = 0 }: TypewriterProps) => {
  const [scope, animate] = useAnimate();
  const letters = Array.from(text);

  useEffect(() => {
    animate(
      ".letter",
      { opacity: 1, display: "inline-block" },
      {
        duration: 0.2,
        delay: stagger(0.03, { startDelay: delay }),
      },
    );
  }, [text, delay, animate]);

  return (
    <span ref={scope}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${index}-${letter}`}
          className="letter"
          initial={{ opacity: 0, display: "none" }}
          style={{ position: "relative" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};
