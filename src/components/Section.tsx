import React from "react";


interface SectionProps {
    header: string;
    children: React.ReactNode;
    className?: string;
}

export function Section({header, children, className}: SectionProps){

    return (
        <section className={`grid grid-cols-[6.5rem_1fr] gap-8 ${className}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {header}
            </h2>
            <div>
                {children}
            </div>
        </section>
    )
}
