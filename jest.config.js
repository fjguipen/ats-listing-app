module.exports = {
  verbose: true,
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/jest/__mocks__/styles.js'
  },
  testEnvironment: 'jsdom'
};
