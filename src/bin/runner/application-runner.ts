import * as tsn from 'ts-node';
import { Config } from '../libs/config';

export class ApplicationRunner {
    public static VERSION = '0.0.1';

    public static run(config: Config) {
        return new ApplicationRunner(config);
    }

    constructor(config: Config) {
        const tsRuntimeOptions = {
            pretty: true,
            logError: true
        };

        /**
         * Load typescript runtime
         */
        tsn.register({
            ...tsRuntimeOptions,
            project: config.getTsConfigPath(),
        });

        /**
         * THIS IS THE MAGIC
         * Load Application
         */
        const source = require(config.getEntryPath());

        if (!source.Application) {
            throw new Error('ApplicationErrorMissingApplication');
        }

        const instance = new source.Application({
            runnerConfig: config,
            runnerVersion: ApplicationRunner.VERSION
        });

        instance.boot();
    }
}
