import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep the OpenAI Agents packages as true Node.js externals on the server so
  // they never get bundled server-side (they use native Node APIs).
  serverExternalPackages: [
    "@openai/agents",
    "@openai/agents-core",
    "@openai/agents-realtime",
  ],

  webpack(config, { isServer }) {
    if (!isServer) {
      // @openai/agents-core imports `async_hooks` / `node:async_hooks` for its
      // internal AsyncLocalStorage-based tracing context. Those Node.js built-ins
      // don't exist in the browser. We alias them to a no-op polyfill so that
      // the browser bundle of @openai/agents-realtime loads without crashing.
      const polyfill = path.resolve(
        __dirname,
        "src/lib/asyncHooksPolyfill.ts"
      );
      config.resolve.alias = {
        ...(config.resolve.alias as Record<string, string>),
        async_hooks: polyfill,
        "node:async_hooks": polyfill,
      };
    }
    return config;
  },
};

export default nextConfig;
