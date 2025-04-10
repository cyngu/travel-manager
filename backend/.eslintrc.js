module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier", "promise"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:promise/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js", "dist/", "node_modules/"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        "ignoreVoid": false,
        "ignoreIIFE": false
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error", 
      { 
        "args": "after-used",
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-misused-promises": [
      "warn",
      {
        "checksVoidReturn": false,
        "checksConditionals": true
      }
    ],
    "@typescript-eslint/promise-function-async": "error",
    "promise/always-return": "error",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "error",
    "promise/no-nesting": "warn",
    "promise/no-promise-in-callback": "warn",
    "promise/no-callback-in-promise": "warn",
    "promise/no-new-statics": "error",
    "prettier/prettier": "error",
  },
};