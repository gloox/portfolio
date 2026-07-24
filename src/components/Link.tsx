import React from 'react';


interface linkProps extends React.ComponentPropsWithoutRef<'a'>{
    label: string;
}


export function Link({label, href, ...rest }: linkProps) {
return (
    <a
        className="text-red-800 underline decoration-red-800/30 hover:decoration-red-800"
        href={href}
    >
        {label}
    </a>
)
}