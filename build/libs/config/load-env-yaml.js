"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvYaml = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const yaml = require("yaml");
const loadEnvYaml = () => {
    const configs = [
        (0, path_1.resolve)(process.cwd(), 'env.yaml'),
        (0, path_1.resolve)(process.cwd(), 'env.yml')
    ];
    for (const config of configs) {
        const exists = (0, fs_1.existsSync)(config);
        if (!exists) {
            continue;
        }
        const content = (0, fs_1.readFileSync)(config, 'utf8');
        return yaml.parse(content);
    }
    throw new Error('MissingYamlConfigFile (env.yml or env.yaml)');
};
exports.loadEnvYaml = loadEnvYaml;
