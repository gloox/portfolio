import type { Metadata } from "next";
import { Inter, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/context/ThemeContext";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const mono = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
    title: "PortfolioLM",
    description: "AI Powered Portfolio",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`
            ${sans.variable} ${serif.variable} ${mono.variable} antialiased
            /* 1. APPLY THE BACKGROUND & TEXT COLORS HERE */
            bg-[var(--ai-background)] 
            text-[var(--ai-text)]
            
            /* 2. ENSURE IT COVERS THE FULL SCREEN */
            min-h-screen
            
            /* 3. SMOOTH TRANSITION */
            transition-colors duration-500
        `}>
        <ThemeProvider>
            <NavBar />
            <main>
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}