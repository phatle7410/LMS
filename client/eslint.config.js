import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import postcssSyntax from "postcss-syntax"; // Import postcss-syntax

export default [
  // Base configuration for JavaScript/TypeScript and React files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      // Add React specific rules here if you're using 'eslint-plugin-react'
      // For example, if you have 'eslint-plugin-react' installed:
      // ...pluginReact.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  // Configuration specifically for CSS files
  {
    files: ["**/*.css"],
    languageOptions: {
      // Use postcss-syntax as the parser for CSS files
      parser: postcssSyntax,
    },
    // No specific rules are typically needed here just to resolve the @tailwind error.
    // If you later want to lint your CSS with Stylelint, you would integrate it here.
  },
];
