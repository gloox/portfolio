import React, { HTMLAttributes, ReactNode } from "react";
import {Text} from "@/components/basic/Text";

interface SectionTitleProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => {
    return (
        <div className="mb-12">
            <Text variant="h2" className="text-[var(--ai-primary)] mb-2">
                {children}
            </Text>
            <div className="h-1 w-20 bg-[var(--ai-text)]/20 rounded-full" />
        </div>
    );
};
