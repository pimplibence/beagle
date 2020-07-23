import { resolve } from 'path';
import * as WorkerThreads from 'worker_threads';
import { Arguments } from 'yargs';
import { Config } from '../libs/config';

export enum ApplicationRunnerError {
    MissingApplication = 'ApplicationRunnerErrorMissingApplication',
    MissingScript = 'ApplicationRunnerErrorMissingScript'
}

export class ApplicationRunner {
    public static readonly EXECUTABLES = {
        start: resolve(__dirname, './executable/start.js'),
        startHeadless: resolve(__dirname, './executable/start-headless.js'),
        script: resolve(__dirname, './executable/run-script.js')
    };

    public config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public async run(): Promise<void> {
        new WorkerThreads.Worker(ApplicationRunner.EXECUTABLES.start, {
            workerData: {
                config: this.config.getCompiledConfig()
            }
        });
    }

    public async runHeadless(): Promise<void> {
        new WorkerThreads.Worker(ApplicationRunner.EXECUTABLES.startHeadless, {
            workerData: {
                config: this.config.getCompiledConfig()
            }
        });
    }

    public async runScript(args: Arguments): Promise<void> {
        const script = args.script;

        if (!script) {
            throw new Error(ApplicationRunnerError.MissingScript);
        }

        new WorkerThreads.Worker(ApplicationRunner.EXECUTABLES.script, {
            workerData: {
                config: this.config.getCompiledConfig(),
                script: script,
                args: args
            }
        });
    }
}
