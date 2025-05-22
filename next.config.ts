import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Ensure Prisma-generated files are properly handled
  webpack: (config, { isServer }) => {
    // This helps with Prisma binary compatibility issues
    if (isServer) {
      config.externals = [...(config.externals || []), "@prisma/client", "prisma"];
    }
    
    return config;
  },
  
  // Make sure environment variables are available
  env: {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb', // Increase limit if needed
    },
  },
};

export default nextConfig;
