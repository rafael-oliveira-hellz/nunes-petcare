module.exports = {
    bail: 1,
    clearMocks: true,
    verbose: true,
    testEnvironment: "node",
    collectCoverage: true,
    setupFiles: ["dotenv/config"],
    roots: ["<rootDir>/src"],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!**/test/**",
        "!**/index.ts",
        "!**/*test.ts",
        "!**/*spec.ts",
        "!**/*specdb.ts",
    ],
    coverageDirectory: "coverage",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
};
