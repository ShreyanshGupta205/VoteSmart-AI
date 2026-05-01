/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    // Exclude type definitions
    '!src/**/*.d.ts',
    // Exclude Next.js page files (integration-tested via E2E)
    '!src/app/**/page.tsx',
    '!src/app/layout.tsx',
    '!src/app/not-found.tsx',
    '!src/app/manifest.ts',
    // Exclude server-side API routes (require live runtime)
    '!src/app/api/**',
    '!src/proxy.ts',
    '!src/middleware.ts',
    // Exclude Firebase-dependent files (require live credentials)
    '!src/lib/firebase.ts',
    '!src/lib/db.ts',
    '!src/lib/gemini.ts',
    '!src/context/AuthContext.tsx',
    '!src/components/utils/DataSync.tsx',
    // Exclude pure static data files
    '!src/data/problems.ts',
    '!src/data/states.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 62,
      lines: 75,
      statements: 75,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
