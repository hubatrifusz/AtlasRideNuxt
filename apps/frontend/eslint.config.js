import { config as sharedConfig } from "@repo/eslint-config";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  ...sharedConfig,
  {
    ignores: ["node_modules/**", ".output/**", ".nuxt/**"],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "vue/no-unused-vars": "error",
    },
  },
];
