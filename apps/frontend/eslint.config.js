import { config as sharedConfig } from "@repo/eslint-config";

export default [
  ...sharedConfig,
  {
    ignores: ["node_modules/**", ".output/**", ".nuxt/**"],
  },
];
