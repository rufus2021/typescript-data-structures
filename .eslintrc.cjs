/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  overrides: [
    {
        files: [
            "**/*.spec.js",
            "**/*.spec.jsx"
        ],
        env: {
           "jest": true
        }
    }]
};