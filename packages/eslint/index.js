const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@rushstack/eslint-config/profile/web-app"],
  plugins: ["no-relative-import-paths"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
        custom: {
          regex: "^T[A-Z]",
          match: false,
        },
      },
      {
        selector: "typeParameter",
        format: ["PascalCase"],
        custom: {
          regex: "^T[A-Z]",
          match: false,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
