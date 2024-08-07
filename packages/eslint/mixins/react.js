const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  parserOptions: {
    project,
  },
  plugins: ["react", "react-refresh", "jsx-a11y"],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".eslintrc.js",
    "*.cjs",
    "**/*.config.[jt]s",
    "**/*.css",
  ],
  globals: {
    JSX: true,
  },
  settings: {
    react: {
      /**
       * Please specify the React version you are using.
       */
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
    "jsx-a11y": {
      polymorphicPropName: "as",
      components: {
        Image: "img",
      },
    },
  },
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],
  rules: {
    "import/no-default-export": "off",
    "unicorn/filename-case": "off",
    "eslint-comments/require-description": "off",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true, allowBoolean: true },
    ],
    "jsx-a11y/alt-text": [
      "warn",
      {
        elements: ["img"],
      },
    ],
    // 유효한 aria-* 속성만 사용
    "jsx-a11y/aria-props": "warn",
    // 유효한 aria-* 상태/값만 사용
    "jsx-a11y/aria-proptypes": "warn",
    // DOM에서 지원되는 role, ARIA만 사용
    "jsx-a11y/aria-unsupported-elements": "warn",
    // 필수 ARIA 속성이 빠져있는지 체크
    "jsx-a11y/role-has-required-aria-props": "warn",
    // ARIA 속성은 지원되는 role에서만 사용
    "jsx-a11y/role-supports-aria-props": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
        allowExportNames: [
          "metadata",
          "viewport",
          "dynamic",
          "generateMetadata",
          "generateStaticParams",
        ],
      },
    ],
    // DOM에 정의되지 않은 속성을 사용했는지 체크 (Emotion css 속성 등 예외 케이스가 있으므로 기본은 off)
    "react/no-unknown-property": "off",
    "react/prop-types": "off",
  },
};
