import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

// Define the Props interface
interface PopInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

const PopIn: React.FC<PopInProps> = ({
  children,
  delay = 0,
  className = "",
  ...props // Spreads any other div props like 'style' or 'id'
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PopIn;
