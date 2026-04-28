import bundleAnalyzer from '@next/bundle-analyzer';
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts", // or your worker file path
  swDest: "public/sw.js",
  // disable: process.env.NODE_ENV === "development", // Recommended: disable in dev
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
