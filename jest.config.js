module.exports = {
    testEnvironment: 'node',
    coverageDirectory: './coverage',
    collectCoverageFrom: [
      '**/*.js',
      '!src/**/node_modules/**',
      '!src/**/*.spec.js'
    ],
  };
  
