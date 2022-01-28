/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['build'],
  moduleNameMapper: {
    'firebase-admin/(.*)': '<rootDir>/node_modules/firebase-admin/lib/$1'
  }
};