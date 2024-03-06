const {defaults: tsjPreset} = require('ts-jest/presets');
module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  coverageProvider: 'v8',
  maxWorkers: 2,
  workerIdleMemoryLimit: 8192,
  transformIgnorePatterns: [
    '/node_modules/(?!@react-native|react-native|@gluestack-ui/themed|@expo|@legendapp|@react-navigation|react-native-snackbar|react-native-gesture-handler|@gluestack-style|@gluestack-ui|@gluestack-ui/config|react-native-snackbar)',
  ],
  verbose: true,
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@assets/images/(.*)$': '<rootDir>/assets/image/profile/change1.png',
  },
};
