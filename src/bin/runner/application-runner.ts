import * as tsn from 'ts-node';
import { BaseApplication } from '../../application/base-application';
import { Config } from '../libs/config';

export class ApplicationRunner {
    public static readonly VERSION = '0.0.1';

    public config: Config;
    public headless: boolean;

    constructor(config: Config, headless: boolean) {
        this.config = config;
        this.headless = headless;
    }

    public async run(): Promise<BaseApplication> {
        const tsRuntimeOptions = {
            pretty: true,
            logError: true
        };

        /**
         * Load typescript runtime
         */
        tsn.register({
            ...tsRuntimeOptions,
            project: this.config.getTsConfigPath(),
        });

        /**
         * THIS IS THE MAGIC
         * Load Application
         */
        const source = require(this.config.getEntryPath());
        const application: typeof BaseApplication = source.Application;

        if (!application) {
            throw new Error('ApplicationErrorMissingApplication');
        }

        const instance = new application({
            runnerConfig: this.config,
            runnerVersion: ApplicationRunner.VERSION,
            headless: this.headless
        });

        if (this.headless) {
            await instance.bootHeadless();
        } else {
            await instance.boot();
        }

        return instance;
    }
}
