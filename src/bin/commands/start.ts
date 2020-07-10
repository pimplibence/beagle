import { resolve } from 'path';
import * as process from 'process';
import { Arguments } from 'yargs';
import { ApplicationRunner } from '../runner/application-runner';
import { Config } from '../libs/config';

export class Start {
    public static async run(options: Arguments<any>) {
        const instance = new Start();
        await instance.command(options.argv);
    }

    public async command(args: any) {
        /**
         * Collect arguments
         */
        const argConfig = args.config;

        /**
         * Get runtime config
         */
        const cwd = process.cwd();
        const configPath = resolve(cwd, argConfig);

        /**
         * Load Config file | Fail if does not exist
         */
        const config = new Config(require(configPath));

        config.validate();
        config.warn();

        /**
         * Start Application
         */
        ApplicationRunner.run(config);
    }
}
