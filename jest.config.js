// jest.config.js
const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/", "src"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "@/components/(.*)": "src/components/$1",
    "@/composites/(.*)": "src/composites/$1",
    "@/helpers/(.*)": "src/helpers/$1",
    "@/hooks/(.*)": "src/hooks/$1",
  },
  coveragePathIgnorePatterns: ["components/icons", "helpers"],
  setupFiles: ["./src/tests/setupFiles.ts"],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
