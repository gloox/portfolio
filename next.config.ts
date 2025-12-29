import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Rewrites forward API calls to Python locally
    rewrites: async () => {
        return process.env.NODE_ENV === "development"
            ? [
                {
                    source: "/api/:path*",
                    destination: "http://127.0.0.1:8000/api/:path*",
                },
            ]
            : [];
    },
    // Headers ensure SharedArrayBuffer works for CheerpJ
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;