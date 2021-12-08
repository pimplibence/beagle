"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvDotenv = void 0;
const dotenv = require("dotenv");
const path_1 = require("path");
const loadEnvDotenv = () => {
    const configPath = (0, path_1.resolve)(process.cwd(), '.env');
    const result = dotenv.config({
        path: configPath
    });
    if (result.error) {
        throw result.error;
    }
    return result.parsed || {};
};
exports.loadEnvDotenv = loadEnvDotenv;
