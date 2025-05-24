import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  {
    // Define ignores first, so they apply to all configurations
    ignores: [
      "app/generated/**",
      "app/generated/prisma/**/*",
      "**/node_modules/**",
      ".next/**",
      "node_modules/**",
      ".eslintrc.js",
      ".eslintrc.json",
      "dist/**",
      "build/**",
      "coverage/**",
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
