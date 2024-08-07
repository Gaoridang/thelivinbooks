require('@gaoridang/eslint-config/patch');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: { browser: true, es2020: true },
  extends: ['@gaoridang/eslint-config', '@gaoridang/eslint-config/mixins/react'],
  settings: {
    react: {
      version: '18.3',
    },
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@rushstack/typedef-var': 'off',
  },
};
