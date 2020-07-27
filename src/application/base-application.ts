import { Register } from 'ts-node';
import { CompiledConfig } from '../bin/libs/config';
import { Container } from '../container/container';
import { BaseScript } from './base-script';

export interface BaseApplicationOptions {
    runnerConfig: CompiledConfig;
    environment: any;
    headless: boolean;
    libs: any;
}

export interface Provider {
    injectable: Function;
    options?: any;
}

export interface Script {
    injectable: typeof BaseScript;
    options?: any;
    name: string;
}

export class BaseApplication {
    /**
     * Configuration from Application Runner
     *
     * This value will be available before this class constructed (init hack in runner)
     */
    protected config: BaseApplicationOptions;

    /**
     * Container to initialize
     * - providers
     * - scripts
     */
    protected container = new Container();

    protected providers: Provider[] = [];
    protected scripts: Script[] = [];

    constructor(config: BaseApplicationOptions) {
        this.config = config;
    }

    public async boot(): Promise<BaseApplication> {
        await this.loadInjectables();
        await this.configure();

        return this;
    }

    public async bootHeadless(): Promise<BaseApplication> {
        await this.loadInjectables();
        await this.configureHeadless();

        return this;
    }

    public runScript(name: string, args: any): Promise<void> {
        const script = this.scripts.find((s) => (s.name === name));

        if (!script) {
            throw new Error('UnknownScript');
        }

        const instance: BaseScript = this.container.resolve(script.injectable);

        return instance.run(args);
    }

    /**
     * Configure application
     * - this method will be called after start application by default
     * - in this step you can define runtime behaviuors, like "start http server", "run jobs". etc...
     */
    protected async configure(): Promise<void> {
        //
    }

    /**
     * Configure application headless
     * - this method will be called after start headless application
     * - this method will be called if you triggered a script running for example
     * - IMPORTANT! In this step DO NOT start http servers or other jobs, because they will conflict with the normally started application
     */
    protected async configureHeadless(): Promise<void> {
        //
    }

    /**
     * Load all injectables
     * - providers
     * - scripts
     */
    protected async loadInjectables() {
        for (const provider of this.providers) {
            this.container.register(provider.injectable, provider.options);
        }

        for (const script of this.scripts) {
            this.container.register(script.injectable, script.options);
        }

        await this.container.boot();
    }
}
