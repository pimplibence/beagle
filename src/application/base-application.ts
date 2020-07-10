import { Config } from '../bin/libs/config';
import { Container } from '../container/container';
import { Progress } from '../libs/progress';
import { BaseScript } from './libs/script/base-script';

export interface BaseApplicationOptions {
    runnerConfig: Config,
    runnerVersion: string,
    headless: boolean
}

export interface Provider {
    injectable: Function;
    config?: any;
}

export interface Script {
    injectable: typeof BaseScript;
    config?: any;
    name: string;
}

export class BaseApplication {
    protected config: BaseApplicationOptions;
    protected container = new Container();
    protected providers: Provider[] = [];
    protected scripts: Script[] = [];

    private progress = new Progress('Start Application');

    constructor(config: BaseApplicationOptions) {
        this.config = config;

        this.progress.addProgress(.1, 'Initializing Application');
    }

    public async boot(): Promise<BaseApplication> {
        this.progress.addProgress(.1, 'Booting Application');

        await this.loadInjectables();

        this.progress.interpolate(1, .95, 'Configure Application');

        await this.configure();

        this.progress.setProgress(1, 'Done');

        return this;
    }

    public async bootHeadless(): Promise<BaseApplication> {
        this.progress.addProgress(.1, 'Booting Application Headless');

        await this.loadInjectables();

        this.progress.interpolate(1, .95, 'Configure Application Headless');

        await this.configureHeadless();

        this.progress.setProgress(1, 'Done');

        return this;
    }

    public runScript(name: string, options: any): Promise<void> {
        const script = this.scripts.find((s) => (s.name === name));

        if (!script) {
            throw new Error('UnknownScript');
        }

        const instance: BaseScript = this.container.resolve(script.injectable);

        return instance.run();
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
            this.container.register(provider.injectable, provider.config);
        }

        for (const script of this.scripts) {
            this.container.register(script.injectable, script.config);
        }

        const subscription = this.container.booting$.subscribe((v) => {
            const targetPercentage = .9;
            const percentage = v.initialized / (v.injectables ?? 0);
            const message = `container ${v.activity} ${v.record?.config?.name ?? ''}`;

            this.progress.interpolate(percentage, targetPercentage, message);
        });

        await this.container.boot();

        subscription.unsubscribe();
    }
}
