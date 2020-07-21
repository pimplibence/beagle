import { resolve } from 'path';
import * as process from 'process';
import { Arguments } from 'yargs';
import { BaseApplication } from '../../application/base-application';
import { sleep } from '../../libs/sleep';
import { Config } from '../libs/config';
import { ApplicationRunner } from '../runner/application-runner';

export enum StartError {
    MissingScriptName = 'StartErrorMissingScriptName'
}

export class Start {
    public static async run(options: Arguments<any>): Promise<BaseApplication> {
        const instance = new Start();

        return instance.run(options, false);
    }

    public static async runHeadless(options: Arguments<any>): Promise<BaseApplication> {
        const instance = new Start();

        return instance.run(options, true);
    }

    public static async runScript(options: Arguments<any>): Promise<BaseApplication> {
        const scriptName = options.scriptName;

        if (!scriptName) {
            throw new Error(StartError.MissingScriptName);
        }

        const application = await this.runHeadless(options);

        await application.runScript(scriptName, options);

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

        this.registerEvents(config, args, headless);

        config.validate();
        config.warn();

        /**
         * Start Application
         */
        const instance = new ApplicationRunner(config, headless);

        return instance.run();
    }

    private registerEvents(config: Config, args: any, headless: boolean) {
        /**
         * This feature requires even more thinking
         */
        const listener = process.on('uncaughtException', async (e) => {
            listener.removeAllListeners();

            await this.handleError(config, args, headless, e);
        });
    }

    private async handleError(config: Config, args: any, headless: boolean, error: any) {
        const restart = config.restart;
        const restartDelay = config.restartDelay;

        if (error) {
            await this.reportError(config, error);
        }

        if (restart) {
            await sleep(restartDelay);
            await this.run(args, headless);
        }

    }

    private reportError(config: Config, error: any) {
        // const reporter = Reporters.getReporter(config.reporter, config);
        // reporter.reportError(error);
    }
}
