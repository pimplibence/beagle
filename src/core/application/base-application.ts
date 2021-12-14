import { Container } from '../container/container';
import { getConfigAll } from './libs/application';

export interface Provider {
    injectable: Function;
    options?: any;
}

export class BaseApplication {
    public static run(env: any = {}) {
        this.prototype.env = env || {};

        const instance: BaseApplication = new this();

        return instance.boot();
    }

    /**
     * True after container initialized
     */
    public initialized: boolean = false;

    /**
     * Environment from Application Runner
     *
     * This value will be available before this class constructed (init hack in runner)
     */
    public env: any;

    /**
     * Container to initialize
     * - providers
     * - scripts
     */
    public container = new Container();
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

    /**
     * Load all injectables
     * - providers
     * - scripts
     */
    protected async loadInjectables() {
        for (const provider of this.providers) {
            this.container.register(provider.injectable, provider.options);
        }

        await this.container.boot();

        this.initialized = true;
    }
}
