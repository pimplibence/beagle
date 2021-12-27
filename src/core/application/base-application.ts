import { Container } from '../container/container';
import { getConfigAll } from './libs/application';

export interface BaseApplicationRunOptions {
    env: any;
    debug?: boolean;
}

export interface Provider {
    injectable: Function;
    options?: any;
}

export class BaseApplication {
    /**
     * Please use this method to construct a new BaseApplication instead of "new BaseApplication()"
     *  It is important! Only with this static function will the lifecycle work!
     */
    public static run(options?: BaseApplicationRunOptions) {
        const env = options?.env;
        const debug = !!options?.debug;

        this.prototype.env = env;
        this.prototype.debug = debug;

        this.prototype.container = new Container({
            debug: debug
        });

        const instance: BaseApplication = new this();

        return instance.boot();
    }

    public env: any;
    public initialized: boolean = false;
    public debug: boolean = false;

    public container: Container;
    public providers: Provider[] = [];

    public async boot(): Promise<BaseApplication> {
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
