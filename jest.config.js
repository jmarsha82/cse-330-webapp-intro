module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/tests/js/**/*.test.js"],
  collectCoverageFrom: [
    "Module5/calculate.js",
    "Module5/calendar_helper.js"
  ],
  coverageThreshold: {
    global: {
      lines: 90
    }
  }
};
