import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import * as yaml from 'yaml';

export const loadEnvYaml = () => {
    const configs = [
        resolve(process.cwd(), 'env.yaml'),
        resolve(process.cwd(), 'env.yml')
    ];

    for (const config of configs) {
        const exists = existsSync(config);

        if (!exists) {
            continue;
        }

        const content = readFileSync(config, 'utf8');
        return yaml.parse(content);
    }

    throw new Error('MissingYamlConfigFile (env.yml or env.yaml)');
};
