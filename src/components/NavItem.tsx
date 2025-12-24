// NavItem.jsx
import React from "react";
import clsx from "clsx"; // Optional, but good for separation

// Define Base/Structural Classes once
const BASE_CLASSES = clsx(
  "flex items-center space-x-2 font-medium transition duration-150 p-2 rounded-lg",
);

// Define Aesthetic/Theme Classes once
const THEME_CLASSES = clsx(
  // Base colors
  "text-gray-600 dark:text-gray-300",
  // Hover colors
  "hover:text-indigo-600 dark:hover:text-indigo-400",
);

const NavItem = ({
  name,
  href,
  Icon,
}: {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <a href={href} className={clsx(BASE_CLASSES, THEME_CLASSES)}>
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </a>
  );
};

export default NavItem;
