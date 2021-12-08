"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvJson = void 0;
const path_1 = require("path");
const loadEnvJson = () => {
    const configPath = (0, path_1.resolve)(process.cwd(), 'env');
    return require(configPath);
};
exports.loadEnvJson = loadEnvJson;
