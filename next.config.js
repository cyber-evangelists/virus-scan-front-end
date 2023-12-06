/** @type {import('next').NextConfig} */

const apiURL = process.env.NEXT_PUBLIC_API_URL;


const nextConfig = {
  rewrites: async () => [
    {
      source: "/api",
      destination: apiURL,
    },
    {
      source: "/api/:endpoint*",
      destination: `${apiURL}/:endpoint*`,
    },
  ],
};

module.exports = nextConfig;
