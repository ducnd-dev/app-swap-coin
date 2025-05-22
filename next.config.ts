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

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb', // Increase limit if needed
    },
  },
};

export default nextConfig;
