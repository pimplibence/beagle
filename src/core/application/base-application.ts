import { CompiledConfig } from '../../bin/libs/config';
import { Container } from '../container/container';
import { BaseScript } from './base-script';
import { getConfigAll } from './libs/application';

export interface BaseApplicationOptions {
    runnerConfig: CompiledConfig;
    environment: any;
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
        const initializers = getConfigAll(this).initializers;
        const configurators = getConfigAll(this).configurators;

        for (const item of initializers) {
            switch (item.mode) {
                case this.config.runnerConfig.mode:
                    await this[item.key]();
                    break;
                case '*':
                    await this[item.key]();
                    break;
                default:
                // Silence is golden
            }
        }

        await this.loadInjectables();

        for (const item of configurators) {
            switch (item.mode) {
                case this.config.runnerConfig.mode:
                    await this[item.key]();
                    break;
                case '*':
                    await this[item.key]();
                    break;
                default:
                // Silence is golden
            }
        }

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
