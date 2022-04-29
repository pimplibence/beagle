import { resolve } from 'path';

export const loadEnvJson = (filename?: string) => {
    const files = [
        filename,
        'env'
    ].filter((item) => !!item);

    const configs = files.map((item) => resolve(process.cwd(), item));

    for (const config of configs) {
        try {
            return require(config);
        } catch (e) {
            continue;
        }
    }

    throw new Error(`MissingJsonConfigFile (${files.join(', ')})`);
};
