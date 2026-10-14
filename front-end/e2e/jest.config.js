const path = require("path");

// `jest` here is the Jest 27 that ships with react-scripts 5. Two adjustments
// let it run the Puppeteer 23 tests:
// - Each test launches its own browser, so a plain Node environment plus
//   expect-puppeteer's matchers is all that's needed (the jest-puppeteer
//   preset's environment requires Jest 29).
// - Jest 27 doesn't understand package "exports" maps, so Puppeteer's
//   "puppeteer-core/internal/..." imports are mapped to their real files.
const puppeteerCoreDir = path.dirname(
  require.resolve("puppeteer-core/package.json")
);

module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: [require.resolve("expect-puppeteer")],
  moduleNameMapper: {
    "^puppeteer-core/internal/(.*)$": path.join(
      puppeteerCoreDir,
      "lib/cjs/puppeteer/$1"
    ),
  },
  testTimeout: 12000,
};
