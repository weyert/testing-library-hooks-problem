/* eslint-env es6 */
const jest = require('kcd-scripts/jest')

/* TODO: find out why babel-jest makes the babel macros work with TypeScript? */
const actualConfig = {
  ...jest,
  transform: {
    ...jest.transform,
    '\\.(ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  collectCoverageFrom: [
    '!src/**/index.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85,
    },
  },
  coverageReporters: ['text'],
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './coverage',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
}

module.exports = actualConfig
