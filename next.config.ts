import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    disableStaticImages: true,
  },
  allowedDevOrigins: ["127.0.0.1"],
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv|jpg|jpeg|png|gif|webp|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[hash][ext][query]",
      },
    });
    return config;
  },
};

export default nextConfig;