import * as dotenv from 'dotenv';
import { resolve } from 'path';

export const loadEnvDotenv = () => {
    const configPath = resolve(process.cwd(), '.env');
    const result = dotenv.config({
        path: configPath
    });

    if (result.error) {
        throw result.error;
    }

    return result.parsed || {};
};
