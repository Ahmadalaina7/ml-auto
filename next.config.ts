import type { NextConfig } from "next";

const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : "standalone",
  poweredByHeader: false,
  images: { unoptimized: true },
  trailingSlash: isStatic,
};

export default nextConfig;
