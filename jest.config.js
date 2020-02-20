module.exports = {
  globals: {
    headless: process.env.CI == "true"
  },
  testPathIgnorePatterns: [
    "<rootDir>/src/", 
    "<rootDir>/node_modules/"
  ],
  reporters: [
    "default",
    [
      "jest-junit", {
        "suiteName": "SharePoint SPFx Testing",
        "outputDirectory": "./reports/",
        "outputName": "./junit.xml",
        "usePathForSuiteName": "true",
        "includeConsoleOutput": "true"
      }
    ],
    [
      "jest-html-reporters", {
        "publicPath": "./reports/",
        "filename": "report.html",
        "expand": true
      }
    ]
  ],
  setupFilesAfterEnv: ["./config/jest.setup.js"],
  verbose: !!process.env.VERBOSE
};