const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    files: ["Module5/*.js", "tests/js/**/*.test.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        document: "readonly",
        module: "readonly",
        require: "readonly",
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        Event: "readonly"
      }
    },
    rules: {
      "no-var": "off",
      "prefer-const": "off"
    }
  }
];
