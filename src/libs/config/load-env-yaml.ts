import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import * as yaml from 'yaml';

export const loadEnvYaml = (filename?: string) => {
    const files = [
        filename,
        'env.yml',
        'env.yaml'
    ].filter((item) => !!item);

    const configs = files.map((item) => resolve(process.cwd(), item));

    for (const config of configs) {
        const exists = existsSync(config);

        if (!exists) {
            continue;
        }

        const content = readFileSync(config, 'utf8');
        return yaml.parse(content);
    }

    throw new Error(`MissingYamlConfigFile (${files.join(', ')})`);
};
