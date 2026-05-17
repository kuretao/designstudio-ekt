import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/DesignStudio-EKT" : "";

const nextConfig: NextConfig = {
  output: isProd && isGithubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: { unoptimized: true },
  compiler: {
    styledComponents: true,
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
