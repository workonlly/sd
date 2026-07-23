import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

// FEAT-019: Sentry wrapping — only active when SENTRY_DSN is set
const sentryWebpackPluginOptions = {
  // Suppress source map upload logs in build output
  silent: true,
  // Upload source maps only in production builds
  disableServerWebpackPlugin: !process.env.NEXT_PUBLIC_SENTRY_DSN,
  disableClientWebpackPlugin: !process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
