import { Container } from '../container/container';
import { getConfigAll } from './libs/application';

export interface ApplicationRunOptions {
    environment: any;
    debug?: boolean;
}

export interface Provider {
    injectable: Function;
    options?: any;
}

export class Application {
    /**
     * Please use this method to construct a new BaseApplication instead of "new BaseApplication()"
     *  It is important! Only with this static function will the lifecycle work!
     */
    public static run(options?: ApplicationRunOptions) {
        const environment = options?.environment;
        const debug = !!options?.debug;

        this.prototype.environment = environment;
        this.prototype.debug = debug;

        this.prototype.container = new Container({
            debug: debug,
            environment: environment
        });

        const instance: Application = new this();

        return instance.boot();
    }

    public environment: any;
    public initialized: boolean = false;
    public debug: boolean = false;

    public container: Container;
    public providers: Provider[] = [];

    public async terminate(force: boolean = false, exitCode: number = 0): Promise<void> {
        /*
        TODO -> Name: Termination feature

        await this.container.terminate();
         */

        const terminators = getConfigAll(this)?.terminators || [];

        for (const item of terminators) {
            await this[item.key]();
        }

        if (force) {
            process.exit(exitCode);
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
