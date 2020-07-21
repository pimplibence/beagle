import { resolve } from 'path';
import * as WorkerThreads from 'worker_threads';
import { Arguments } from 'yargs';
import { Config } from '../libs/config';

export enum ApplicationRunnerError {
    MissingApplication = 'ApplicationRunnerErrorMissingApplication'
}

export class ApplicationRunner {
    public config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public async run(): Promise<void> {
        const executable = resolve(__dirname, './executable/start.js');

        const worker = new WorkerThreads.Worker(executable, {
            resourceLimits: this.config.resourceLimits,
            workerData: {
                config: this.config.getCompiledConfig()
            },
        });

        worker.on('error', (error) => this.handleWorkerError(worker, error));
        worker.on('exit', (code) => this.handleWorkerExit(worker, code));
    }

    public async runHeadless(): Promise<void> {
        const executable = resolve(__dirname, './executable/start-headless.js');

        const worker = new WorkerThreads.Worker(executable, {
            resourceLimits: this.config.resourceLimits,
            workerData: {
                config: this.config.getCompiledConfig()
            },
        });

        worker.on('error', (error) => this.handleWorkerError(worker, error));
        worker.on('exit', (code) => this.handleWorkerExit(worker, code));
    }

    public async runScript(args: Arguments): Promise<void> {
        const executable = resolve(__dirname, './executable/run-script.js');

        const script = args.script;

        if (!script) {
            throw new Error('MissingScript');
        }

        const worker = new WorkerThreads.Worker(executable, {
            resourceLimits: this.config.resourceLimits,
            workerData: {
                config: this.config.getCompiledConfig(),
                script: script,
                args: args
            },
        });
    }

    private handleWorkerError(worker: WorkerThreads.Worker, error: Error) {
        worker.removeAllListeners();

        console.log('Error');
    }

    private handleWorkerExit(worker: WorkerThreads.Worker, code: number) {
        worker.removeAllListeners();

        console.log('Exit');
    }

    private handleWorkerMessage(worker: WorkerThreads.Worker, message: any) {
        console.log('Message', message);
    }
}
