import { resolve } from 'path';
import * as process from 'process';
import { Arguments } from 'yargs';
import { Config } from '../libs/config';
import { ApplicationRunner } from '../runner/application-runner';

export enum StartError {}

export class Start {
    public static async run(args: Arguments<any>): Promise<void> {
        const instance = new Start();

        return instance.run(args);
    }

    public static async runScript(args: Arguments<any>): Promise<void> {
        const instance = new Start();

        return instance.runScript(args);
    }

    public async run(args: Arguments): Promise<void> {
        const config = this.extractConfig(args);

        const instance = new ApplicationRunner(config);

        await instance.run();
    }

    public async runScript(args: Arguments): Promise<void> {
        const config = this.extractConfig(args);

        const instance = new ApplicationRunner(config);

        await instance.runScript(args);
    }

    private extractConfig(args: Arguments<any>): Config {
        /**
         * Get arguments
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
        const config = new Config(require(configPath), args);

        config.validate();

        return config;
    }
}
