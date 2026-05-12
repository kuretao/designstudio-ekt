import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  basePath: isGithubPages ? "/DesignStudio-EKT" : "",
  assetPrefix: isGithubPages ? "/DesignStudio-EKT/" : "",
  images: { unoptimized: true },
  compiler: {
    styledComponents: true,
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
