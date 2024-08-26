/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Remove console logs only in production, excluding error logs
        //removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false
       // removeConsole: true
      },
     
};

export default nextConfig;
