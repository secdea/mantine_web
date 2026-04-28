import bundleAnalyzer from '@next/bundle-analyzer';
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development", // Recommended: disable in dev
  additionalPrecacheEntries: [{ url: "/~offline", revision: "1" }], // Example offline fallback
  exclude: [
    ({ asset }) => {
      // Exclude source maps
      if (asset.name.endsWith(".map")) return true;
      
      // Exclude server-side code
      if (asset.name.startsWith("server/")) return true;
      
      // Exclude web.config
      if (asset.name.includes("web.config")) return true;
      
      // Exclude JSON files in root
      if (/^[^/]*\.json$/.test(asset.name)) return true;
      
      // Add more exclusions as needed:
      // if (asset.name.includes("specific-file")) return true;
      
      return false;
    }
  ],
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // productionBrowserSourceMaps: true // set this for debugging in prod. This ensures Chrome can map your .ts / .tsx source back to the original files.
};

export default withBundleAnalyzer(withSerwist(nextConfig));
