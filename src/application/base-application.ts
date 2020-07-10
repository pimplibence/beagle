import { Config } from '../bin/libs/config';
import { Container } from '../container/container';

export interface Provider {
    injectable: Function,
    config?: any;
}

export abstract class BaseApplication {
    protected config: Config;
    protected container = new Container();
    protected providers: Provider[] = [];

    constructor(config: Config) {
        this.config = config;
    }

    public async boot() {
        for (const provider of this.providers) {
            this.container.register(provider.injectable, provider.config);
        }

        await this.container.boot();
    }
}
