import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Для Vercel и локальной разработки
  output: undefined, // Используем стандартный SSR режим
  
  // Оптимизация изображений
  images: {
    unoptimized: false,
  },
  
  // Headers для безопасности
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
  
  // Rewrites для API
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "/api/:path*",
        },
      ],
    };
  },
};

export default nextConfig;

