"use client";
import { motion, Variants, stagger } from "framer-motion"; // 1. Import stagger

interface TypewriterProps {
    text: string;
    delay?: number;
}

export const Typewriter = ({ text, delay = 0 }: TypewriterProps) => {
    const letters = Array.from(text);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: stagger(0.02, { startDelay: delay }),
            },
        },
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            display: "inline-block",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            display: "none",
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};