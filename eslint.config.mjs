import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  // JavaScript configuration
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Include recommended JS rules
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  // Vue configuration
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: "vue-eslint-parser",
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      ...pluginVue.configs.essential.rules, // Include essential Vue rules
      "vue/html-indent": ["error", 2],
    },
  },
];