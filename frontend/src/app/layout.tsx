import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
    title: "Geet's PortfolioLM",
    description: "AI Powered Portfolio",
};

export default function RootLayout({ children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
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