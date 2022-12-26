module.exports = {
    bail: 1,
    verbose: true,
    testEnvironment: "node",
    collectCoverage: true,
    setupFiles: ["dotenv/config"],
    roots: ["<rootDir>/src"],
    collectCoverageFrom: ["<rootDir>/src/**/*.{ts}"],
    coverageDirectory: "coverage",
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
};
