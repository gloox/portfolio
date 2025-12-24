import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We only need the rewrite for LOCAL development now.
  // In production, vercel.json handles it.
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
};

export default nextConfig;
