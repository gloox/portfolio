import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                // If we are in development, go to localhost:8000.
                // If in production (Vercel), go to the same domain (relative path).
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/api/:path*"
                        : "/api/:path*",
            },
        ];
    },
};

export default nextConfig;