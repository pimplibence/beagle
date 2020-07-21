import { resolve } from 'path';
import { Subject } from 'rxjs';
import * as WorkerThreads from 'worker_threads';
import { Arguments } from 'yargs';
import { Config } from '../libs/config';

interface WorkerEventError {
    error: Error;
    command: string;
    worker: WorkerThreads.Worker;
}

interface WorkerEventExit {
    code: number;
    command: string;
    worker: WorkerThreads.Worker;
}

interface WorkerEventMessage {
    message: any;
    command: string;
    worker: WorkerThreads.Worker;
}

export enum ApplicationRunnerError {
    MissingApplication = 'ApplicationRunnerErrorMissingApplication'
}

export class ApplicationRunner {
    public static readonly EXECUTABLES = {
        start: resolve(__dirname, './executable/start.js'),
        startHeadless: resolve(__dirname, './executable/start-headless.js'),
        script: resolve(__dirname, './executable/run-script.js')
    };

    /**
     * Listeners
     */
    public message$ = new Subject<WorkerEventMessage>();
    public error$ = new Subject<WorkerEventError>();
    public exit$ = new Subject<WorkerEventExit>();

    public config: Config;

    constructor(config: Config) {
        this.config = config;

        this.error$.subscribe((value) => console.log('Error has been reported'));
        this.exit$.subscribe((value) => console.log('Application has been exit'));
    }

    public async run(): Promise<void> {
        const worker = new WorkerThreads.Worker(ApplicationRunner.EXECUTABLES.start, {
            workerData: {
                config: this.config.getCompiledConfig()
            }
        });

        worker.once('error', (error) => this.error$.next({
            worker: worker,
            error: error,
            command: 'run'
        }));

        worker.once('exit', (code) => this.exit$.next({
            worker: worker,
            code: code,
            command: 'run'
        }));

        worker.on('message', (value) => this.message$.next({
            worker: worker,
            message: value,
            command: 'run'
        }));
    }

    public async runHeadless(): Promise<void> {
        const worker = new WorkerThreads.Worker(ApplicationRunner.EXECUTABLES.startHeadless, {
            workerData: {
                config: this.config.getCompiledConfig()
            }
        });

        worker.once('error', (error) => this.error$.next({
            worker: worker,
            error: error,
            command: 'runHeadless'
        }));

        worker.once('exit', (code) => this.exit$.next({
            worker: worker,
            code: code,
            command: 'runHeadless'
        }));

        worker.on('message', (value) => this.message$.next({
            worker: worker,
            message: value,
            command: 'runHeadless'
        }));
    }

    public async runScript(args: Arguments): Promise<void> {
        const script = args.script;

        if (!script) {
            throw new Error('MissingScript');
        }

        const worker = new WorkerThreads.Worker(ApplicationRunner.EXECUTABLES.script, {
            workerData: {
                config: this.config.getCompiledConfig(),
                script: script,
                args: args
            }
        });

        worker.once('error', (error) => this.error$.next({
            worker: worker,
            error: error,
            command: 'runScript'
        }));

        worker.once('exit', (code) => this.exit$.next({
            worker: worker,
            code: code,
            command: 'runScript'
        }));

        worker.on('message', (value) => this.message$.next({
            worker: worker,
            message: value,
            command: 'runScript'
        }));
    }
}
