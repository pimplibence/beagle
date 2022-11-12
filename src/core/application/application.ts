import { Container } from '../container/container';
import { getConfigAll } from './libs/application';

export interface ApplicationRunOptions {
    environment: any;
}

export interface Provider {
    injectable: Function;
    options?: any;
}

export interface TerminateOptions {
    signal?: NodeJS.Signals;
    exit?: boolean;
    code?: number;
}

export class Application {
    /**
     * Please use this method to construct a new BaseApplication instead of "new BaseApplication()"
     *  It is important! Only with this static function will the lifecycle work!
     */
    public static run(options?: ApplicationRunOptions) {
        const environment = options?.environment;

        this.prototype.environment = environment;

        this.prototype.container = new Container({
            environment: environment
        });

        const instance: Application = new this();

        return instance.boot();
    }

    public environment: any;
    public initialized: boolean = false;

    public container: Container;
    public providers: Provider[] = [];

    public async terminate(options?: TerminateOptions): Promise<void> {
        const terminators = getConfigAll(this)?.terminators || [];

        for (const item of terminators) {
            await this[item.key](options);
        }

        if (options?.exit) {
            process.exit(options?.code || 0);
        }
    }

    public async boot(): Promise<Application> {
        const initializers = getConfigAll(this)?.initializers || [];
        const configurators = getConfigAll(this)?.configurators || [];

        for (const item of initializers) {
            await this[item.key]();
        }

        await this.loadInjectables();

        for (const item of configurators) {
            await this[item.key]();
        }

        return this;
    }

    protected async loadInjectables() {
        for (const provider of this.providers) {
            this.container.register(provider.injectable, provider.options);
        }

        await this.container.boot();

        this.initialized = true;
    }
}
