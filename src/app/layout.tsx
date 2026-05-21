import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Geet's Website",
  description:
    "Computer Science Honours Student & Full-Stack Software Developer based in Winnipeg. Look at my software projects, engineering history, and technical skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
