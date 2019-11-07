(module.exports = {
  "env": {
    "node": true,
    "jest": true
  },
  "parser": "@typescript-eslint/parser", // Specifies the ESLint parser
  "plugins": ["@typescript-eslint", "prettierx"],
  "extends": [
    "eslint:recommended",
    "standard-with-typescript", // Uses the standard-js rules, typescript variant
    "plugin:prettierx/standardx", // Uses standard-js formatting
    "plugin:prettierx/@typescript-eslint" // Uses eslint-config-prettier to disable ESLint rules that would conflict with prettier
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    // Override prettier options via .prettierrc.json
    "prettierx/options": ["error", require("./.prettierrc.json")],
    "@typescript-eslint/strict-boolean-expressions": "off"
  },
  "overrides": [
    // Only apply TypeScript-specific rules to *.ts
    {
      "files": ["**/*.ts"],
      "extends": ["plugin:@typescript-eslint/recommended"]
    }
  ]
})
