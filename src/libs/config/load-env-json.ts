import { resolve } from 'path';

export const loadEnvJson = () => {
    const configPath = resolve(process.cwd(), 'env');

    return require(configPath);
};
