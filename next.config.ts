/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  domains: [
    "fakestoreapi.com",
    "images.unsplash.com",
    "plus.unsplash.com"
  ],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "fakestoreapi.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "plus.unsplash.com",
      pathname: "/**",
    },
  ],
},
};

module.exports = nextConfig;