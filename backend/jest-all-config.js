const config = require("./jest.config.json");
config.testMatch = ["**/**.specdb.ts", "**/**.test.ts", "**/**.spec.ts"];
module.exports = config;
