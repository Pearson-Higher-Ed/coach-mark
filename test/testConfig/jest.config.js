module.exports = {
  "rootDir": "../../",
  "setupTestFrameworkScriptFile": "<rootDir>/test/testConfig/enzymeConfig.js",
  "moduleFileExtensions": [
    "jsx",
    "js",
    "json"
  ],
  "moduleNameMapper": {
    "^.+\\.(css|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
    "^.+\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js"
  },
  "collectCoverageFrom": [
    "**/src/js/*.{js,jsx}"
  ],
  "coverageThreshold": {
    "global": {
      "lines": 80
    }
  },
  "testPathIgnorePatterns": [
    "<rootDir>/(build|node_modules|demo|coverage)/"
  ],
  "verbose": true
}
