import { resolve } from 'path';
import * as process from 'process';
import { Arguments } from 'yargs';
import { BaseApplication } from '../../application/base-application';
import { Config } from '../libs/config';
import { ApplicationRunner } from '../runner/application-runner';

export enum StartError {
    MissingScriptName = 'StartErrorMissingScriptName'
}

export class Start {
    public static async run(options: Arguments<any>): Promise<BaseApplication> {
        const instance = new Start();

        return instance.run(options.argv, false);
    }

    public static async runHeadless(options: Arguments<any>): Promise<BaseApplication> {
        const instance = new Start();

        return instance.run(options.argv, true);
    }

    public static async runScript(options: Arguments<any>): Promise<BaseApplication> {
        const scriptName = options.argv.scriptName;

        if (!scriptName) {
            throw new Error(StartError.MissingScriptName);
        }

        const application = await this.runHeadless(options);

        await application.runScript(scriptName, options.argv);

        return application;
    }

    public async run(args: any, headless: boolean): Promise<BaseApplication> {
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
        const instance = new ApplicationRunner(config, headless);

        return instance.run();
    }
}
