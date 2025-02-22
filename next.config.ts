import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IIITT_DOMAIN as string,
        port:'',
        pathname:'/images/**',
        search:''
      },
    ],
  },
  env:{
    OPEN_API_WEATHER:process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY,
    IMAGE:`${process.env.NEXT_PUBLIC_CDN_IIITT}${process.env.NEXT_PUBLIC_IMAGE_URL}`
  }
};

export default nextConfig;
