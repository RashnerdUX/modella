import { vercelPreset } from '@vercel/react-router/vite';
import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode enabled (no server-side rendering)
  ssr: false,

  // Tell React Router exactly where your app directory is
  appDirectory: "app",
  // Use the Vercel preset for React Router
  presets: [vercelPreset()],
} satisfies Config;
