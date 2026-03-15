/** @type {import('next').NextConfig} */
const repoName = "Memento-Product-Site";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};

export default nextConfig;